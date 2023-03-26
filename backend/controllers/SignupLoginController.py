from config.db import conn
from schemas.__init__ import User, LoginUser
from models.__init__ import users
from fastapi_jwt_auth import AuthJWT
from fastapi import HTTPException
from auth.__init__ import Hasher
 

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