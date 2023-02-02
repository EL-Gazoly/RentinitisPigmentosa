import time
import jwt
from decouple import config
from fastapi import HTTPException, Depends, Header, Request
JWT_SECRET = config("SECRET_KEY")
JWT_ALGORITHM = config("ALGORITHM")


def token_response(token : str):

    return {
        "accsess token": token
    }
   
def raiseUnauthorized():
    raise HTTPException(status_code=401, detail="Unauthorized") 


def createAccessToken(userEmail: str):
    payload = {
        "userEmail" :  userEmail,
        "expiry" : time.time() + 600
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm= JWT_ALGORITHM)
    return token_response(token)

def decodeJWT(token: str) -> dict:
    try:
        payload =  jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGORITHM)
        return payload if payload['expiry'] >= time.time() else None
    except Exception as e:
        raise HTTPException(status_code=500, detail='Oops, it seems we have hit a glitch in the matrix.But no worries, we have got this!')

def getToken(request : Request):
    Authorization = request.cookies.get("Authorization", None)
    if Authorization:
        bearer = request.headers['Authorization']
        parts = bearer.split(" ")
        if len(parts) == 2:
            token = parts[1]
            return token
    raiseUnauthorized()
    

def get_current_user(request: Request):
    token = request.cookies.get("Authorization")
    if not token:
        raise HTTPException(status_code=403, detail="Not authenticated")
    return True