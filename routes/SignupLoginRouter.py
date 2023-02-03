from schemas.__init__ import User
from fastapi_jwt_auth import AuthJWT
from fastapi import APIRouter, Depends
from controllers.__init__ import SignupLoginController


SignupLoginRouter = APIRouter()

@SignupLoginRouter.post("/api/signup", tags=["Authentication"])
async def SignUp(user: User,Authorize: AuthJWT = Depends()):
    return await SignupLoginController.SignUp(user, Authorize)


@SignupLoginRouter.post('/api/login', tags=["Authentication"])
async def Login(email: str, password: str, Authorize: AuthJWT = Depends()):
    return await SignupLoginController.LogIn(email, password,Authorize)


@SignupLoginRouter.post('/api/logout', tags=["Authentication"])
async def Logout(Authorize: AuthJWT =Depends()):
    return await SignupLoginController.Logout(Authorize)

