from config.db import conn
from models.__init__ import users
from schemas.__init__ import User
from fastapi_jwt_auth import AuthJWT
from fastapi import APIRouter, Depends, Request
from controllers.__init__ import UserController

UserRouter = APIRouter()

@UserRouter.get("/api/get_users", tags=["Edit Users"])
async def getUsers(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
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
    response = {
        "ID":request.cookies.get('ID',None),
        "UserName": request.cookies.get('User_name',None),
        "Email":request.cookies.get('Email', None),
        "token": request.cookies.get("accsess_token", None)
    }
    return response