from schemas.__init__ import User, LoginUser, ForgetPassword ,VerifyOTP, ResetPassword
# from fastapi_jwt_auth import AuthJWT
from fastapi import APIRouter, Depends
from controllers.__init__ import SignupLoginController




SignupLoginRouter = APIRouter()

@SignupLoginRouter.post("/api/signup", tags=["Authentication"])
async def SignUp(user: User):
    return await SignupLoginController.SignUp(user)


@SignupLoginRouter.post('/api/login', tags=["Authentication"])
async def Login(user: LoginUser):
    return await SignupLoginController.LogIn(user)

@SignupLoginRouter.post('/api/forget_password', tags=["Authentication"])
async def ForgetPassword(request : ForgetPassword):
    return await SignupLoginController.forget_Password(request)

@SignupLoginRouter.post('/api/verify_otp', tags=["Authentication"])
async def VerifyOTP(request: VerifyOTP):
    return await SignupLoginController.verifyOTP(request)

@SignupLoginRouter.post('/api/reset_password', tags=["Authentication"])
async def ResetPassword(request: ResetPassword):
    return await SignupLoginController.resetPassword(request)


@SignupLoginRouter.post('/api/logout', tags=["Authentication"])
async def Logout(current_user: str = Depends(SignupLoginController.get_current_user)): 
    return await SignupLoginController.Logout()

@SignupLoginRouter.post('/api/current_user_role', tags=["Authentication"])
async def current_user_role(current_user: str = Depends(SignupLoginController.get_current_user_role)):
    return await SignupLoginController.current_user_role(current_user)

