from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class User(BaseModel):
    email: EmailStr
    password: str
    role: str  # 'asha', 'doctor'

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserInDB(User):
    hashed_password: str

class Note(BaseModel):
    patient_name: Optional[str]
    transcription: str
    note: str
    language: str = "en"
    is_critical: bool = False
    diagnosis: Optional[str] = None
    prescription: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    user_email: Optional[EmailStr] = None

# ✅ Required for POST /notes/generate
class TextRequest(BaseModel):
    transcription: str
    language: str = "en"
    patient_name: Optional[str] = None

# ✅ Required for POST /notes/generate-prescription
class PrescriptionRequest(BaseModel):
    diagnosis: str
    language: str = "en"
