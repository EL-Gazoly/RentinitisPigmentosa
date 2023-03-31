import re
from typing import Optional
from uuid import UUID, uuid4
from pydantic import BaseModel, EmailStr, validator
class User(BaseModel):
    id: Optional[UUID] = uuid4()    
    first_name: str     
    last_name: str
    email: EmailStr
    password: str

    @validator("first_name")
    def first_name_validator(cls, value):
        if len(value) < 3:
            raise ValueError("first_name must be at least 3 characters long")
        return value

    @validator("last_name")
    def last_name_validator(cls, value):
        if len(value) < 3:
            raise ValueError("last_name must be at least 3 characters long")
        return value


    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not re.search(r'\d', v):
            raise ValueError("Password must contain at least one digit")
        if not re.search(r'[A-Z]', v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r'[a-z]', v):
            raise ValueError("Password must contain at least one lowercase letter")
        return v

class LoginUser(BaseModel):
    email: EmailStr
    password: str

    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not re.search(r'\d', v):
            raise ValueError("Password must contain at least one digit")
        if not re.search(r'[A-Z]', v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r'[a-z]', v):
            raise ValueError("Password must contain at least one lowercase letter")
        return v

class ForgetPassword(BaseModel):
    email: EmailStr
    
    @validator('email')
    def validate_email(cls, v):
        if not re.search(r'[^@]+@[^@]+\.[^@]+', v):
            raise ValueError("Email must be valid")
        return v

class ResetCode(BaseModel):
    email : EmailStr
    code : str
    newPassword : str


class ContactUS(BaseModel):
    name : str
    email : EmailStr
    message : str

    @validator('email')
    def validate_email(cls, v):
        if not re.search(r'[^@]+@[^@]+\.[^@]+', v):
            raise ValueError("Email must be valid")
        return v

    @validator('message')
    def validate_message(cls, v):
        if len(v) < 10:
            raise ValueError("Message must be at least 10 characters long")
        return v