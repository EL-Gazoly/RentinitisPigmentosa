from typing import List
from fastapi_jwt_auth import AuthJWT
from fastapi import APIRouter, File, UploadFile, HTTPException, Depends

CNNRouter = APIRouter()

@CNNRouter.post('/api/uploadImg', tags=['Upload images'])
async def UploadImg(Authorize: AuthJWT= Depends(),files: List[UploadFile] = File(...)):
    Authorize.jwt_required()
    try:
        for file in files:
            print(file.filename)
        return {'message': 'Files uploaded'}
    except Exception as e:
        raise HTTPException(status_code=500, detail='An internal error occuered')
