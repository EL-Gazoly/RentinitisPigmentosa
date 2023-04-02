from config.db import conn
from sqlalchemy import and_
from schemas.__init__ import User, LoginUser, ForgetPassword , VerifyOTP, ResetPassword
from models.__init__ import users, code
from fastapi_jwt_auth import AuthJWT
from fastapi import HTTPException
from auth.__init__ import Hasher, generateOTP , sentVerficationcode
 

async def SignUp(user:User, Authorize: AuthJWT):
        
        existing_user = conn.execute(users.select().where(users.c.email== user.email))
        if existing_user.rowcount > 0:
            raise HTTPException(status_code=400,detail='Email already in use')

        conn.execute(users.insert().values(
        first_name = user.first_name,
        last_name = user.last_name,
        email = user.email,
        password = Hasher.get_password_hash(user.password)
    ))

        return create_auth_token(user.email, Authorize) 
    


async def LogIn(user:LoginUser , Authorize: AuthJWT):
   
        res = conn.execute(users.select().where(users.c.email == user.email))
        if res.rowcount == 0:
            raise HTTPException(status_code=400, detail= 'Email does not exist')

        existing_user = res.fetchone()
        if(not Hasher.verify_password(user.password, existing_user.password)):
            raise HTTPException(status_code=400, detail= 'Login credentials are not valid')
    

        return create_auth_token(user.email, Authorize)
    

async def Logout(Authorize: AuthJWT):
    Authorize.jwt_required()

    Authorize.unset_access_cookies()    
    return {'msg' : 'Successfully logout'}

def create_auth_token(email: str, Authorize: AuthJWT):
     accsess_token = Authorize.create_access_token(subject=email)
     Authorize.set_access_cookies(accsess_token)
     
     return accsess_token


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
    

     