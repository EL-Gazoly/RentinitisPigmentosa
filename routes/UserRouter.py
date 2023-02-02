from fastapi import APIRouter, Depends, Request
from config.db import conn
from models.__init__ import users
from schemas.__init__ import User
from auth.jwtBarer import jwtBearer
from controllers.__init__ import UserController

UserRouter = APIRouter()

@UserRouter.get("/api/get_users", dependencies=[Depends(jwtBearer())], tags=["Edit Users"])
async def getUsers():
    return await UserController.get_all_users()
    
@UserRouter.get("/api/get_user/{id}", dependencies=[Depends(jwtBearer())], tags=["Edit Users"])
async def getUserWithID(id: str ):
    return await UserController.get_user_with_id(id)

@UserRouter.put("/api/update_user/{id}", dependencies=[Depends(jwtBearer())], tags=["Edit Users"])
async def UpdateUser(id : str, user : User ):
    return await UserController.update_user(id, user)

@UserRouter.delete("/api/delete_user/{id}", dependencies=[Depends(jwtBearer())], tags=["Edit Users"])
async def delete_data(id : str):
    return await UserController.delete_user(id)

@UserRouter.get('/api/get_current_user_data',dependencies=[Depends(jwtBearer())], tags=["Edit Users"])
async def getCurrentUserdat(request: Request):
    response = {
        "ID":request.cookies.get('ID',None),
        "UserName": request.cookies.get('User_name',None),
        "Email":request.cookies.get('Email'),
        "token": request.cookies.get("Authorization", None)
    }
    return response