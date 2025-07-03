from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from datetime import datetime
from app.models import TextRequest, PrescriptionRequest
from app.services.ai import (
    generate_medical_note,
    transcribe_audio,
    generate_prescription_text,
    check_critical_symptoms,
    ask_medical_question,
     generate_discharge_summary,     # ✅ ADD THIS LINE
    generate_referral_letter     
)
from app.auth import get_current_user_optional
from app.db import db
import uuid
import aiofiles
import os

router = APIRouter(prefix="/notes", tags=["Notes"])

# ─────────────────────────────────────────────────────────────
# TEXT-BASED NOTE GENERATION
@router.post("/generate")
async def generate_note(request: TextRequest, user=Depends(get_current_user_optional)):
    result = await generate_medical_note(
        transcription=request.transcription,
        language=request.language,
        patient_name=request.patient_name
    )

    # Save only if user is logged in
    if user:
        note_doc = {
            "user_email": user["email"],
            "patient_name": result["patient_name"],
            "transcription": request.transcription,
            "note": result["note"],
            "language": request.language,
            "is_critical": result["is_critical"],
            "timestamp": datetime.utcnow().isoformat()
        }
        await db.notes.insert_one(note_doc)

    return result

# ─────────────────────────────────────────────────────────────
# AUDIO-BASED NOTE GENERATION
@router.post("/upload-audio")
async def upload_audio(
    file: UploadFile = File(...),
    language: str = "en",
    patient_name: str = None,
    user=Depends(get_current_user_optional)
):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in [".mp3", ".wav", ".m4a", ".aac"]:
        raise HTTPException(status_code=400, detail="Unsupported file format")

    file_id = str(uuid.uuid4())
    temp_path = f"temp_{file_id}{ext}"

    async with aiofiles.open(temp_path, 'wb') as f:
        content = await file.read()
        await f.write(content)

    transcription = await transcribe_audio(temp_path, language=language)
    os.remove(temp_path)

    request = TextRequest(transcription=transcription, language=language, patient_name=patient_name)
    return await generate_note(request, user)

# ─────────────────────────────────────────────────────────────
# PRESCRIPTION GENERATION FROM LAST NOTE
@router.post("/generate-prescription")
async def generate_prescription(request: PrescriptionRequest, user=Depends(get_current_user_optional)):
    prescription_text = await generate_prescription_text(request.diagnosis, request.language)

    # Save only if user is logged in
    if user:
        last_note = await db.notes.find_one(
            {"user_email": user["email"]},
            sort=[("timestamp", -1)]
        )
        if last_note:
            await db.notes.update_one(
                {"_id": last_note["_id"]},
                {"$set": {"prescription": prescription_text}}
            )

    return {"prescription": prescription_text}

# ─────────────────────────────────────────────────────────────
# VIEW SAVED NOTE HISTORY (only own data)
@router.get("/history")
async def get_history(user=Depends(get_current_user_optional)):
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required to view history")

    notes = await db.notes.find({"user_email": user["email"]}).to_list(50)
    return {"history": notes}

# ─────────────────────────────────────────────────────────────
# MEDICAL QUESTION ASKING (free-form AI Q&A)
@router.post("/ask")
async def ask_medical_question_route(request: TextRequest):
    answer = await ask_medical_question(request.transcription, request.language)
    return {"answer": answer}
from pydantic import BaseModel

class DischargeSummaryRequest(BaseModel):
    diagnosis: str
    treatment: str
    follow_up: str
    language: str = "en"

@router.post("/generate-discharge-summary")
async def generate_discharge(request: DischargeSummaryRequest):
    summary = await generate_discharge_summary(
        request.diagnosis, request.treatment, request.follow_up, request.language
    )
    return {"discharge_summary": summary}

class ReferralRequest(BaseModel):
    symptoms: str
    specialist_type: str
    reason: str
    language: str = "en"

@router.post("/generate-referral-letter")
async def generate_referral(request: ReferralRequest):
    letter = await generate_referral_letter(
        request.symptoms, request.specialist_type, request.reason, request.language
    )
    return {"referral_letter": letter}
