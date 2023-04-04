from config.db import conn
from sqlalchemy import and_
from schemas.__init__ import User, LoginUser, ForgetPassword , VerifyOTP, ResetPassword
from models.__init__ import users, code
# from fastapi_jwt_auth import AuthJWT
from fastapi import HTTPException , Depends, status
from auth.__init__ import Hasher, generateOTP , sentVerficationcode
from decouple import config
from datetime import datetime, timedelta

from jose import JWTError, jwt
 
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

JWT_SECRET = config("SECRET_KEY")
JWT_ALGORITHM = config("ALGORITHM")

async def SignUp(user:User):
        
        existing_user = conn.execute(users.select().where(users.c.email== user.email))
        if existing_user.rowcount > 0:
            raise HTTPException(status_code=400,detail='Email already in use')

        conn.execute(users.insert().values(
        first_name = user.first_name,
        last_name = user.last_name,
        email = user.email,
        password = Hasher.get_password_hash(user.password)
    ))
        access_token = await create_access_token(data={"sub": user.email})
        return {"access_token": access_token, "token_type": "bearer"}
    


async def LogIn(user:LoginUser ):
   
        res = conn.execute(users.select().where(users.c.email == user.email))
        if res.rowcount == 0:
            raise HTTPException(status_code=400, detail= 'Email does not exist')

        existing_user = res.fetchone()
        if(not Hasher.verify_password(user.password, existing_user.password)):
            raise HTTPException(status_code=400, detail= 'Login credentials are not valid')

        access_token = await create_access_token(data={"sub": user.email})
        return {"access_token": access_token, "token_type": "bearer"}
    



async def create_access_token(data: dict, expires_delta: int = 120):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")

    res = conn.execute(users.select().where(users.c.email == email))
    existing_user = res.fetchone()
    if existing_user is None:
        raise HTTPException(status_code=400, detail="Email does not exist")
    return existing_user

                 
         
async def Logout():
    
    
    return {'msg' : 'Successfully logout'}


def updatePassword(new_password, email):
    conn.execute(users.update().values(
        password=Hasher.get_password_hash(new_password)
    ).where(users.c.email == email))

async def forget_Password(request: ForgetPassword):
    user_email = request.email
    existing_user = conn.execute(users.select().where(users.c.email == user_email))
    if existing_user.rowcount == 0:                                                
        raise HTTPException(status_code=400, detail='Email does not exist')
    
    user_code = generateOTP()

    code_already_sent = conn.execute(code.select().where(code.c.email == user_email))
    if code_already_sent.rowcount > 0:
        conn.execute(code.delete().where(code.c.email == user_email))

    conn.execute(code.insert().values(
        email = user_email,
        code = user_code
    ))
    sentVerficationcode(user_email, user_code)

    return {'msg' : 'Code sent to your email'}

async def verifyOTP(request: VerifyOTP):
    user_email = request.email
    user_code = request.code

    existing_code = conn.execute(
        code.select().where(and_(code.c.email == user_email, code.c.code == user_code))
    ).fetchone()


    if not existing_code:
        raise HTTPException(status_code=400, detail='Invalid OTP')

   

    conn.execute(code.delete().where(code.c.email == user_email))

    return {'msg': 'OTP verified successfully'}
   

async def resetPassword(request: ResetPassword):
    user_email = request.email
    user_password = request.password

    existing_user = conn.execute(users.select().where(users.c.email == user_email))
    if existing_user.rowcount == 0:
        raise HTTPException(status_code=400, detail='Email does not exist')

    updatePassword(user_password, user_email)
    return {'msg': 'Password updated successfully'}
    

     