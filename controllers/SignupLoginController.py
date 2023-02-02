from config.db import conn
from schemas.__init__ import User
from models.__init__ import users
from controllers.__init__ import Hasher
from fastapi import HTTPException, Response
from fastapi.responses import JSONResponse
from auth.jwtHandler import createAccessToken
async def SignUp(user:User):
    try:
        
        existing_user = conn.execute(users.select().where(users.c.email== user.email))
        if existing_user.rowcount > 0:
            raise HTTPException(status_code=400,detail='Email already in use')

        conn.execute(users.insert().values(
        first_name = user.first_name,
        last_name = user.last_name,
        email = user.email,
        password = Hasher.get_password_hash(user.password)
    ))
        accsess_token = createAccessToken({"sub": user.email})
        response = JSONResponse( content={"accsess_token" : accsess_token } )
        response.set_cookie(key='ID', value= user.id)
        response.set_cookie(key='User_name', value=user.first_name+' '+user.last_name)
        response.set_cookie(key='Email', value=user.email)
        response.set_cookie(key="Authorization", value= f"Bearer {accsess_token}")

        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail='Well, this is not quite what we had in mind.But no worries, we have got this!')


async def LogIn(email: str, password: str):
    try:
        res = conn.execute(users.select().where(users.c.email == email))
        if res.rowcount == 0:
            raise HTTPException(status_code=400, detail= 'Email does not exist')

        user = res.fetchone()
        if(not Hasher.verify_password(password, user[4])):
            raise HTTPException(status_code=400, detail= 'Login credentials are not valid')
        
        accsess_token = createAccessToken({"sub": email})
        response = JSONResponse( content={"accsess token" : accsess_token } )
        response.set_cookie(key="Authorization", value= f"Bearer {accsess_token}")

        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail='Oops, it seems we have hit a glitch in the matrix.But no worries, we have got this!')
    

async def Logout(response: Response):
    response.delete_cookie('Authorization')
    return {"message": "Successfully logged out "}
