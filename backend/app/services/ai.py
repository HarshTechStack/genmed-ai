import os
import logging
import aiofiles
import httpx
import json
from dotenv import load_dotenv
from openai import OpenAI

# Configure logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# Load .env file
load_dotenv()

# Validate environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    logger.error("GROQ_API_KEY is not set. Please set it in the .env file or environment.")
    raise RuntimeError("GROQ_API_KEY is not set in environment!")

DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")
if not DEEPGRAM_API_KEY:
    logger.error("DEEPGRAM_API_KEY is not set. Please set it in the .env file or environment.")
    raise RuntimeError("DEEPGRAM_API_KEY is not set in environment!")

# Bridge GROQ_API_KEY to what OpenAI SDK expects
os.environ["OPENAI_API_KEY"] = GROQ_API_KEY  # Needed for OpenAI SDK compatibility

# Set up client
client = OpenAI(
    api_key=GROQ_API_KEY,
    base_url="https://api.groq.com/openai/v1"
)

# ─────────────────────────────────────────────────────────────
# Transcribe audio using Deepgram
async def transcribe_audio(file_path: str, language: str = "hi") -> str:
    url = "https://api.deepgram.com/v1/listen"
    headers = {
        "Authorization": f"Token {DEEPGRAM_API_KEY}",
        "Content-Type": "audio/wav",
    }

    try:
        async with aiofiles.open(file_path, 'rb') as f:
            audio_data = await f.read()

        async with httpx.AsyncClient() as http_client:
            response = await http_client.post(
                url,
                content=audio_data,
                headers=headers,
                params={"language": language}
            )

        if response.status_code != 200:
            logger.error(f"Deepgram API failed: {response.text}")
            raise Exception(f"Deepgram transcription failed with status {response.status_code}")

        result = response.json()
        transcript = result['results']['channels'][0]['alternatives'][0]['transcript']
        if not transcript:
            logger.warning("Deepgram returned empty transcript")
            return ""
        return transcript

    except Exception as e:
        logger.error(f"Error in transcribe_audio: {str(e)}")
        raise

# ─────────────────────────────────────────────────────────────
# Detect critical/emergency symptoms
async def check_critical_symptoms(text: str) -> bool:
    critical_keywords = [
        "chest pain", "difficulty breathing", "unconscious",
        "severe bleeding", "stroke", "seizure",
        "बेहोश", "सांस लेने में दिक्कत"
    ]
    return any(kw.lower() in text.lower() for kw in critical_keywords)

# ─────────────────────────────────────────────────────────────
# Generate structured medical note
async def generate_note(transcription: str, language: str = "en", patient_name: str = "Patient") -> dict:
    prompt = f"""
You are an experienced rural healthcare assistant. Based on the following patient description (in {language}), generate a detailed and structured medical note in the same language.

Respond only with a valid JSON object in this format:

{{
  "patient_name": "{patient_name}",
  "note": {{
    "chief_complaint": "...",
    "history": "...",
    "symptoms": ["...", "..."],
    "observations": {{
      "temperature": "...",
      "heart_rate": "...",
      "blood_pressure": "...",
      "general_condition": "..."
    }},
    "assessment": "...",
    "plan": {{
      "medications": "...",
      "first_aid": "...",
      "referral": "...",
      "follow_up": "..."
    }}
  }}
}}

PATIENT DESCRIPTION:
\"{transcription}\"

Respond only in {language}. Output valid JSON.
"""

    try:
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {"role": "system", "content": "You are a rural-friendly medical assistant. Respond only in valid JSON as instructed."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=700
        )

        raw = response.choices[0].message.content.strip()

        try:
            return json.loads(raw)
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse note JSON: {raw}, Error: {str(e)}")
            return {
                "patient_name": patient_name,
                "note": {
                    "error": "Unable to generate structured note due to invalid JSON response."
                }
            }

    except Exception as e:
        logger.error(f"Error in generate_note: {str(e)}")
        return {
            "patient_name": patient_name,
            "note": {
                "error": f"Failed to generate note: {str(e)}"
            }
        }

# ─────────────────────────────────────────────────────────────
# Wrapper: generate note + check for criticality
async def generate_medical_note(transcription: str, language: str = "en", patient_name: str = "Patient") -> dict:
    try:
        note_data = await generate_note(transcription, language, patient_name)
        is_critical = await check_critical_symptoms(transcription)

        if "patient_name" not in note_data:
            note_data["patient_name"] = patient_name

        return {
            "patient_name": note_data.get("patient_name", patient_name),
            "note": note_data.get("note", {}),
            "is_critical": is_critical
        }

    except Exception as e:
        logger.error(f"Error in generate_medical_note: {str(e)}")
        return {
            "patient_name": patient_name,
            "note": {
                "error": f"Failed to generate medical note: {str(e)}"
            },
            "is_critical": False
        }

# ─────────────────────────────────────────────────────────────
# Generate prescription from diagnosis
async def generate_prescription_text(diagnosis: str, language: str = "en") -> str:
    guidelines = {
        "first_line": "Paracetamol 500mg",
        "advice": "Rest, drink fluids, and monitor symptoms",
        "follow_up": "Visit doctor in 3 days or if symptoms worsen"
    }

    prompt = f"""
Create a prescription in {language} for the following:

- Diagnosis: {diagnosis}
- Guidelines: {guidelines}

Format:
1. Patient Details
2. Medications with dosage
3. Advice
4. Follow-up Instructions

Keep it simple and clear.
"""

    try:
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {"role": "system", "content": "Create clear medical prescriptions in local language."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2,
            max_tokens=300
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        logger.error(f"Error in generate_prescription_text: {str(e)}")
        return f"Error generating prescription: {str(e)}"

# ─────────────────────────────────────────────────────────────
# Free-form Q&A
async def ask_medical_question(question: str, language: str = "en") -> str:
    prompt = f"""
Answer the following medical question for a rural Indian audience in {language}. Be clear, simple, and culturally appropriate.

QUESTION:
{question}
"""

    try:
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {"role": "system", "content": "You are a rural-friendly medical assistant who explains things simply."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=400
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        logger.error(f"Error in ask_medical_question: {str(e)}")
        return f"Error answering question: {str(e)}"

# ─────────────────────────────────────────────────────────────
# Generate Discharge Summary
async def generate_discharge_summary(diagnosis: str, treatment: str, follow_up: str, language: str = "en") -> str:
    prompt = f"""
Generate a discharge summary in {language} using the following:

- Diagnosis: {diagnosis}
- Treatment: {treatment}
- Follow-Up Instructions: {follow_up}

Format:
1. Diagnosis
2. Treatment Given
3. Follow-Up Instructions
4. Advice

Keep it simple, structured, and clear.
"""

    try:
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {"role": "system", "content": "You are a medical assistant generating discharge summaries."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=400
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        logger.error(f"Error in generate_discharge_summary: {str(e)}")
        return f"Error generating discharge summary: {str(e)}"

# ─────────────────────────────────────────────────────────────
# Generate Referral Letter
async def generate_referral_letter(symptoms: str, specialist_type: str, reason: str, language: str = "en") -> str:
    prompt = f"""
Write a medical referral letter in {language} for the following:

- Symptoms: {symptoms}
- Referred To: {specialist_type}
- Reason for Referral: {reason}

Format:
1. Patient Summary
2. Reason for Referral
3. Suggested Specialist
4. Additional Notes

Be polite, clear, and medically accurate.
"""

    try:
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {"role": "system", "content": "You write formal medical referral letters."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=400
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        logger.error(f"Error in generate_referral_letter: {str(e)}")
        return f"Error generating referral letter: {str(e)}"

# ─────────────────────────────────────────────────────────────
# Test API connectivity (for debugging)
async def test_grok_api():
    try:
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[{"role": "user", "content": "Test message"}],
            temperature=0.5,
            max_tokens=50
        )
        logger.info(f"API Test Response: {response.choices[0].message.content}")
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"API Test Failed: {str(e)}")
        raise

if __name__ == "__main__":
    import asyncio
    asyncio.run(test_grok_api())