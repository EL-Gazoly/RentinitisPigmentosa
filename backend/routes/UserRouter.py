from config.db import conn
from models.__init__ import users
from schemas.__init__ import User
from fastapi_jwt_auth import AuthJWT
from fastapi.responses import JSONResponse
from fastapi import APIRouter, Depends, Request
from controllers.__init__ import UserController

UserRouter = APIRouter()

@UserRouter.get("/api/get_users", tags=["Edit Users"])
async def getUsers(Authorize: AuthJWT = Depends()):
    return await UserController.get_all_users()
    
@UserRouter.get("/api/get_user/{id}", tags=["Edit Users"])
async def getUserWithID(id: str, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    return await UserController.get_user_with_id(id)

@UserRouter.put("/api/update_user/{id}", tags=["Edit Users"])
async def UpdateUser(id : str, user : User, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    return await UserController.update_user(id, user)

@UserRouter.delete("/api/delete_user/{id}", tags=["Edit Users"])
async def delete_data(id : str, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    return await UserController.delete_user(id)

@UserRouter.get('/api/get_current_user_data', tags=["Edit Users"])
async def getCurrentUserdat(request: Request, Authorize: AuthJWT = Depends()):
    
    Authorize.jwt_required()
    current_user = conn.execute(users.select().where(users.c.email == Authorize.get_jwt_subject())).fetchone()
    response = JSONResponse(content={'current_user' : Authorize.get_jwt_subject()})
    response.set_cookie(key='UserID', value=current_user.id)
    response.set_cookie(key='UserName', value=current_user.first_name+ ' ' + current_user.last_name)
    response.set_cookie(key='UserEmail', value=current_user.email)
    return response