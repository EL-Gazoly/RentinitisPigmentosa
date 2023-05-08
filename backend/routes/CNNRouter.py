from typing import List
# from fastapi_jwt_auth import AuthJWT
from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
import os
import shutil
import pickle
from tfModel.classification_for_web import SingleImage_Test

CNNRouter = APIRouter()

@CNNRouter.post('/api/uploadImg', tags=['Upload images'])
async def UploadImg(files: List[UploadFile] = File(...)):
    
    try:
        for file in files:
            file_path = os.path.join(os.getcwd(), "uploads", file.filename)
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
                
            print(file_path)
        return SingleImage_Test(file_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail='An internal error occuered')
 