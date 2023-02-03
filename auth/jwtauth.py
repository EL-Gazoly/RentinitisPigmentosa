from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi import Request
from fastapi.responses import JSONResponse
from decouple import config
from pydantic import BaseModel
JWT_SECRET = config("SECRET_KEY")

class Settings(BaseModel):
    authjwt_secret_key = JWT_SECRET

    authjwt_token_location = {"cookies"}

    authjwt_cookie_csrf_protect: bool = False

    authjwt_cookie_name: str = "JWT_COOKIE"


@AuthJWT.load_config
def get_config():
    return Settings()   

def authjwt_exception_handler(app):
    @app.exception_handler(AuthJWTException)
    def exception_handler(request: Request, exc: AuthJWTException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.message}
        )
    exception_handler