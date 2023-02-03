from config.db import conn
from schemas.__init__ import User
from models.__init__ import users
from fastapi import HTTPException
from fastapi_jwt_auth import AuthJWT
from controllers.__init__ import Hasher
from fastapi.responses import JSONResponse

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
        accsess_token = Authorize.create_access_token(subject=user.email)
        Authorize.set_access_cookies(accsess_token)
        response = JSONResponse( content={"accsess_token" : accsess_token } )
        response.set_cookie(key='ID', value= user.id)
        response.set_cookie(key='User_name', value=user.first_name+' '+user.last_name)
        response.set_cookie(key='Email', value=user.email)

        return accsess_token 
    


async def LogIn(email: str, password: str , Authorize: AuthJWT):
    try:
        res = conn.execute(users.select().where(users.c.email == email))
        if res.rowcount == 0:
            raise HTTPException(status_code=400, detail= 'Email does not exist')

        user = res.fetchone()
        if(not Hasher.verify_password(password, user[4])):
            raise HTTPException(status_code=400, detail= 'Login credentials are not valid')
        print(user.email)
        accsess_token = Authorize.create_access_token(subject=email)
        Authorize.set_access_cookies(accsess_token)
        response = JSONResponse( content={"accsess_token" : accsess_token } )
        response.set_cookie(key='ID', value= user.id)
        response.set_cookie(key='User_name', value=user.first_name+' '+user.last_name)
        response.set_cookie(key='Email', value=user.email)
        return response, accsess_token
    except Exception as e:
        raise HTTPException(status_code=500, detail='Oops, it seems we have hit a glitch in the matrix.But no worries, we have got this!')
    

async def Logout(Authorize: AuthJWT):
    Authorize.jwt_required()

    Authorize.unset_access_cookies()    
    return {'msg' : 'Successfully logout'}

def create_cookies(email : str,user: User, Authorize: AuthJWT):
    accsess_token = Authorize.create_access_token(subject=email)
    Authorize.set_access_cookies(accsess_token)
    response = JSONResponse( content={"accsess_token" : accsess_token } )
    response.set_cookie(key='ID', value= user.id)
    response.set_cookie(key='User_name', value=user.first_name+' '+user.last_name)
    response.set_cookie(key='Email', value=user.email)
    return accsess_token
    

