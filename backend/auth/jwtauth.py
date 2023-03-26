from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi import Request
from fastapi.responses import JSONResponse
from schemas.__init__ import Settings


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