from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from app.db import db
import os

# ───────────────────────────────
# Config
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# ───────────────────────────────
# Setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer_scheme = HTTPBearer(auto_error=False)

# ───────────────────────────────
# User helpers
async def get_user_by_email(email: str):
    return await db.users.find_one({"email": email})

async def create_user(email: str, password: str, role: str):
    existing = await get_user_by_email(email)
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = pwd_context.hash(password)
    await db.users.insert_one({
        "email": email,
        "password": hashed_password,
        "role": role
    })

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# ───────────────────────────────
# JWT helpers
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ───────────────────────────────
# Auth dependencies

# ✅ Requires login
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token payload")
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = await get_user_by_email(email)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# ✅ Optional auth (returns None if not logged in)
async def get_current_user_optional(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    if not credentials:
        return None
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            return None
        user = await get_user_by_email(email)
        return user
    except JWTError:
        return None
