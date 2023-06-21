from typing import List
# from fastapi_jwt_auth import AuthJWT
from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
import os
import shutil
import pickle
from tfModel.classification_for_web import SingleImage_Test
from tfModel.segmentation.segmentation import Segment

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
 
@CNNRouter.post('/api/segmentation', tags=['Upload images'])
async def segmentation(files: List[UploadFile] = File(...)):
        
        try:
            for file in files:
                file_path = os.path.join(os.getcwd(), "uploads", file.filename)
                with open(file_path, "wb") as buffer:
                    shutil.copyfileobj(file.file, buffer)
                    
                print(file_path)
                Segment(file_path)
                return FileResponse("/home/elgazoly/Projects/RentinitisPigmentosa/backend/Output_image.png", media_type="image/png")
        except Exception as e:
            raise HTTPException(status_code=500, detail='An internal error occuered')