from pydantic import BaseModel
from decouple import config

JWT_SECRET = config("SECRET_KEY")

class Settings(BaseModel):
    authjwt_secret_key = JWT_SECRET

    authjwt_token_location = {"cookies"}

    authjwt_cookie_csrf_protect: bool = False

    authjwt_cookie_name: str = "JWT_COOKIE"
