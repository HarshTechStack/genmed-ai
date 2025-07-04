
# 🧠 GenMed-AI: AI-Powered Medical Assistant for Rural India 🇮🇳

GenMed-AI is an AI-based healthcare assistant designed to support medical professionals and patients in rural regions of India. It bridges the gap between modern healthcare technologies and underserved communities using a powerful combination of **FastAPI**, **React**, **LLMs**, and **voice AI** technologies.

---

## 📌 Features

✅ Patient Authentication & Role-based Dashboards  
✅ Voice-enabled Medical History Logging  
✅ AI-assisted Diagnosis using LLMs  
✅ Doctor-Patient Interface with Notes Sync  
✅ Real-time Data Flow (FastAPI + REST API)  
✅ Fully Responsive UI with TailwindCSS  
✅ Clean Architecture – Frontend + Backend Separation

---

## 🧪 Tech Stack

### 🧩 Frontend
- [React.js](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

### ⚙️ Backend
- [FastAPI](https://fastapi.tiangolo.com/)
- [Pydantic](https://docs.pydantic.dev/)
- [Uvicorn](https://www.uvicorn.org/)
- [Deepgram API](https://developers.deepgram.com/) — for voice transcription
- [OpenAI](https://openai.com/) / LLM integration — for diagnosis suggestions

---

## 📁 Folder Structure

```

genmed-ai/
├── frontend/         # React + TS frontend app
│   ├── src/
│   ├── public/
│   └── ...
│
├── backend/          # FastAPI backend app
│   ├── app/
│   ├── requirements.txt
│   └── ...
│
└── README.md         # You're reading it :)

````

---

## 🚀 Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/HarshTechStack/genmed-ai.git
cd genmed-ai
````

---

### 2️⃣ Setup Backend

```bash
cd backend
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt

# Start FastAPI server
uvicorn app.main:app --reload
```

> 🔐 Add your API keys (e.g., Deepgram, OpenAI) to `.env` file in the backend folder.

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

> ⚠ Make sure the backend is running on `localhost:8000` or update the base API URL accordingly.

---

## 🔧 .env File Example (Backend)

```env
DEEPGRAM_API_KEY=your_deepgram_api_key
OPENAI_API_KEY=your_openai_api_key
```

---

## 📦 Dependencies Overview

* **Frontend**: React, TailwindCSS, Axios, Vite
* **Backend**: FastAPI, Uvicorn, Pydantic, Deepgram SDK, OpenAI SDK

---

## 🎯 Future Scope

* Integrate **Hindi Voice Support**
* Add **EHR Database Storage**
* Deploy on **Render (backend)** and **Vercel (frontend)**
* Enable **Chat-based Patient Queries**

---

## 🤝 Contributing

Pull requests are welcome!
Please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT License © 2025 [Vivek Harsh](https://www.vivekharsh.in)

---

## 📬 Contact

* 💼 Portfolio: [vivekharsh.in](https://www.vivekharsh.in)
* 📧 Email: [vivekharsh.work@gmail.com](mailto:vivekharsh.work@gmail.com)
* 🧑‍💻 GitHub: [@HarshTechStack](https://github.com/HarshTechStack)

```
```
