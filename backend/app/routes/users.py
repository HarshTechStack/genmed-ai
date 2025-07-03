from fastapi import APIRouter, HTTPException
from app.models import User, UserLogin
from app.auth import get_password_hash, verify_password, create_access_token
from app.db import db

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register")
async def register_user(user: User):
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = get_password_hash(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_pw
    await db.users.insert_one(user_dict)
    return {"message": "User registered successfully"}

@router.post("/login")
async def login_user(user: UserLogin):
    existing_user = await db.users.find_one({"email": user.email})
    if not existing_user or not verify_password(user.password, existing_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": existing_user["email"]})
    return {"access_token": token, "token_type": "bearer"}
