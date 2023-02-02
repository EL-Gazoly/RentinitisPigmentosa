from fastapi import APIRouter, Response
from schemas.__init__ import User
from controllers.__init__ import SignupLoginController

SignupLoginRouter = APIRouter()

@SignupLoginRouter.post("/api/signup", tags=["Authentication"])
async def SignUp(user: User):
    return await SignupLoginController.SignUp(user)


@SignupLoginRouter.post('/api/login', tags=["Authentication"])
async def Login(email: str, password: str):
    return await SignupLoginController.LogIn(email, password)


@SignupLoginRouter.post('/api/logout', tags=["Authentication"])
async def Logout(response: Response):
    return await SignupLoginController.Logout(response)