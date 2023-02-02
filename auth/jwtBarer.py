from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .jwtHandler import decodeJWT
class jwtBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(jwtBearer, self).__init__(auto_error = auto_error)
    
    async def __call__(self, request: Request):
        
        credentials: HTTPAuthorizationCredentials = await super(jwtBearer, self).__call__(request)

        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid or Expired Token")
            
            if not self.validateToken(credentials.credentials):
                raise HTTPException(status_code=403, detail='Invalid or Expired Token')
        else:
            raise HTTPException(status_code= 403, detail="Invalid or Expired Token")
        
    def validateToken(self, jwtoken: str) -> bool:
        isTokenValid : bool = False
        payload = decodeJWT(jwtoken)
        if payload:
            isTokenValid = True
        return isTokenValid