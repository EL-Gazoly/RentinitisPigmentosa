from typing import List
# from fastapi_jwt_auth import AuthJWT
from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
import os
import shutil
import pickle
from PIL import Image  
from tfModel.classfication.classification_for_web import SingleImage_Test
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
            image = Image.open(file_path)
            image.save('/home/elgazoly/Projects/RentinitisPigmentosa/frontend/src/assets/Input_image.png')      
            print(file_path)
            Segment(file_path)
            return file_path
        except Exception as e:
            raise HTTPException(status_code=500, detail='An internal error occuered')