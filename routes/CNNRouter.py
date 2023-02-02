from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from auth.jwtBarer import jwtBearer
from auth.jwtHandler import get_current_user

from typing import List
CNNRouter = APIRouter()

@CNNRouter.post('/api/uploadImg', dependencies=[Depends(get_current_user)], tags=['Upload images'])
async def UploadImg(files: List[UploadFile] = File(...)):
    try:
        for file in files:
            print(file.filename)
        return {'message': 'Files uploaded'}
    except Exception as e:
        raise HTTPException(status_code=500, detail='An internal error occuered')
