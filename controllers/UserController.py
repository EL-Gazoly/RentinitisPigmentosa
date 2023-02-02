from config.db import conn
from models.__init__ import users
from schemas.__init__ import User
from fastapi import HTTPException
from controllers.__init__ import Hasher


async def get_all_users():
    try:
        return conn.execute(users.select()).fetchall()
    except Exception as e:
        HTTPException(status_code=500, detail='An Internal error')

async def get_user_with_id(id: str):
    try:
        return conn.execute(users.select().where(users.c.id == id)).fetchall()
    except Exception as e:
        HTTPException(status_code=400, detail='Well, this is not quite what we had in mind.But no worries, we have got this!')


async def update_user(id : str, user : User):
    try:
        res= conn.execute(users.update().values(
            first_name = user.first_name,
            last_name = user.last_name,
            email = user.email,
            password = Hasher.get_password_hash(user.password)
        ).where(users.c.id == id))
        if res.rowcount == 0:
            raise HTTPException(status_code=400, detail='Oops, it seems we have hit a glitch in the matrix.But no worries, we have got this!')
        

        return await get_user_with_id(id)
    except Exception as e:
        raise HTTPException(status_code=500, detail='Oops, it seems we have hit a glitch in the matrix.But no worries, we have got this!')


async def delete_user(id: str):
    try:
        conn.execute(users.delete().where(users.c.id == id))
    
        return {'message': 'Good bye :('}
    except:
        raise HTTPException(status_code=500, detail='Well, this is not quite what we had in mind.But no worries, we have got this!')