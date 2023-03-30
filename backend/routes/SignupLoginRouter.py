from schemas.__init__ import User, LoginUser, ForgetPassword ,ResetCode
from fastapi_jwt_auth import AuthJWT
from fastapi import APIRouter, Depends
from controllers.__init__ import SignupLoginController


SignupLoginRouter = APIRouter()

@SignupLoginRouter.post("/api/signup", tags=["Authentication"])
async def SignUp(user: User,Authorize: AuthJWT = Depends()):
    return await SignupLoginController.SignUp(user, Authorize)


@SignupLoginRouter.post('/api/login', tags=["Authentication"])
async def Login(user: LoginUser, Authorize: AuthJWT = Depends()):
    return await SignupLoginController.LogIn(user, Authorize)

@SignupLoginRouter.post('/api/forget_password', tags=["Authentication"])
async def ForgetPassword(request: ForgetPassword, Authorize: AuthJWT = Depends()):
    return await SignupLoginController.ForgetPassword(request, Authorize)

@SignupLoginRouter.post('/api/reset_password', tags=["Authentication"])
async def ResetPassword(request: ResetCode, Authorize: AuthJWT = Depends()):
    return await SignupLoginController.reset_password(request, Authorize)
@SignupLoginRouter.post('/api/logout', tags=["Authentication"])
async def Logout(Authorize: AuthJWT =Depends()):
    return await SignupLoginController.Logout(Authorize)

