import numpy as np
import cv2
from keras.models import load_model
import matplotlib.pyplot as plt
from skimage import io, transform

def Segment(file):
    image = cv2.imread(file)
    image = cv2.resize(image, (400, 300))
    image = image/255
    pred_mask = model.predict(image.reshape(1, 300, 400, 3))
    pred_mask = (pred_mask >= 0.5)*1
    plt.gray()
    plt.imsave('Output_image.png', pred_mask.reshape(300, 400))
    # Resizing by interpolation
    image = io.imread('/home/elgazoly/Projects/RentinitisPigmentosa/backend/Output_image.png') # put the path of the image saved in the prev step
    resized_image = transform.resize(image, (1440, 2160), order=3, mode='reflect', anti_aliasing=True)
    io.imsave('/home/elgazoly/Projects/RentinitisPigmentosa/frontend/src/assets/Output_image.png', resized_image)

model = load_model('/home/elgazoly/Projects/RentinitisPigmentosa/backend/tfModel/segmentation/Fold3_model.h5') #put the path of .h5 file