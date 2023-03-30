from config.db import conn
from schemas.__init__ import User, LoginUser, ForgetPassword ,ResetCode
from models.__init__ import users, code
from fastapi_jwt_auth import AuthJWT
from fastapi import HTTPException
from auth.__init__ import Hasher, forgetPassword, sentVerficationcode
 

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
        password = Hasher.get_password_hash(new_password)
    ).where(users.c.email == email))
     

def forget_Password(request:ForgetPassword):
     forgetPassword(request)

async def reset_password(request :ResetCode, Authorize: AuthJWT): 
    
   user_email = request.email
   user_code = request.code
   user_password = request.password

   
   existing_code = conn.execute(code.select().where(code.c.email== user_email  and code.c.code == user_code ))
   if existing_code.rowcount == 0:
       raise HTTPException(status_code=400, detail= 'Code does not exist')
   
   conn.execute(code.delete().where(code.c.email == user_email))
       
   updatePassword(user_password, user_email)
   return {'msg' : 'Password updated successfully'}

   


    

     