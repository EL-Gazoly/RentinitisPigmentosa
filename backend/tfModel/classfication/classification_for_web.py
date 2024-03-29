# -*- coding: utf-8 -*-
"""Classification_For_Web

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1MrN-lwnCuZE3uDaMMp3PK3Xl3X5jyhYn
"""

import cv2
import os
import numpy as np
from PIL import Image
import tensorflow as tf



ImgSize = [224, 224] # Model
Classes = ["NORMAL", "RP"]

def Load_Models():
  LeNet = tf.keras.models.load_model("/home/elgazoly/Projects/RentinitisPigmentosa/backend/tfModel/classfication/Modals/LeNet.h5") # replace with the directory for LeNet model
  LeNet.load_weights("/home/elgazoly/Projects/RentinitisPigmentosa/backend/tfModel/classfication/Weights/LeNet_Weights.h5")
  LeNet.compile(optimizer='adamax',loss = 'binary_crossentropy',metrics = ['Recall','Precision','AUC', 'accuracy', tf.keras.metrics.FalseNegatives()])

  ResNet = tf.keras.models.load_model("/home/elgazoly/Projects/RentinitisPigmentosa/backend/tfModel/classfication/Modals/ResNet.h5") # replace with the directory for ResNet model
  ResNet.load_weights("/home/elgazoly/Projects/RentinitisPigmentosa/backend/tfModel/classfication/Weights/ResNet_Weights.h5")
  ResNet.compile(optimizer='adamax',loss=tf.keras.losses.BinaryCrossentropy(label_smoothing=0.1),metrics = ['Recall','Precision','AUC', 'accuracy', tf.keras.metrics.FalseNegatives()])

  Xception = tf.keras.models.load_model("/home/elgazoly/Projects/RentinitisPigmentosa/backend/tfModel/classfication/Modals/Xception.h5") # replace with the directory for Xception model
  Xception.load_weights("/home/elgazoly/Projects/RentinitisPigmentosa/backend/tfModel/classfication/Weights/Xception_weights.h5")
  Xception.compile(optimizer='adamax',loss=tf.keras.losses.BinaryCrossentropy(label_smoothing=0.1),metrics = ['Recall','Precision','AUC', 'accuracy', tf.keras.metrics.FalseNegatives()])

  Vgg = tf.keras.models.load_model("/home/elgazoly/Projects/RentinitisPigmentosa/backend/tfModel/classfication/Modals/VGG16.h5") # replace with the directory for VGG16 model
  Vgg.load_weights("/home/elgazoly/Projects/RentinitisPigmentosa/backend/tfModel/classfication/Weights/VGG16_weights.h5")
  Vgg.compile(optimizer='adamax',loss=tf.keras.losses.BinaryCrossentropy(label_smoothing=0.1),metrics = ['Recall','Precision','AUC', 'accuracy', tf.keras.metrics.FalseNegatives()])


  IV3 = tf.keras.models.load_model("/home/elgazoly/Projects/RentinitisPigmentosa/backend/tfModel/classfication/Modals/InceptionV3.h5") # replace with the directory for Inception v3 model
  IV3.load_weights("/home/elgazoly/Projects/RentinitisPigmentosa/backend/tfModel/classfication/Weights/InceptionV3_weights.h5")
  IV3.compile(optimizer='adamax',loss=tf.keras.losses.BinaryCrossentropy(label_smoothing=0.1),metrics = ['Recall','Precision','AUC', 'accuracy', tf.keras.metrics.FalseNegatives()])


  return LeNet, ResNet, Xception, Vgg, IV3

def ConvertJPG(Path):
    Format = Path.split('.')[-1]
    ImageName = Path.split('/')[-1].split('.')[0]
    root = Path.split(ImageName)[0]
    if Format != "jpg":
        converted = Image.open(Path).convert('RGB')
        newPath = os.path.join(root, ImageName + ".jpg")
        converted.save(newPath)
        os.remove(Path)  # To remove png file
        return newPath
    else:
        return Path

def ImagePreparation(path):
    image = ConvertJPG(path)
    image = np.asarray(cv2.imread(path,cv2.IMREAD_COLOR))
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (ImgSize[0], ImgSize[1]), interpolation=cv2.INTER_NEAREST)
    image = image[0:224, 29:200]
    image = cv2.resize(image, (ImgSize[0], ImgSize[1]), interpolation=cv2.INTER_NEAREST)
    image = cv2.fastNlMeansDenoising(image, None, 20, 7, 21)
    image = cv2.normalize(image, None, 0, 1, cv2.NORM_MINMAX, dtype = cv2.CV_32F)
    img_array = np.array(image)
    return img_array

import numpy as np

def Majority_Predicted(LeNet_pred, IV3_pred, ResNet_pred, VGG_pred, XC_pred):

    Combine = np.vstack((LeNet_pred, IV3_pred, ResNet_pred, VGG_pred, XC_pred)).T
    majority_pred = np.apply_along_axis(lambda x: np.argmax(np.bincount(x)), axis=1, arr= Combine)

    return majority_pred

def SingleImage_Test(path):
    image = ImagePreparation(path).reshape(224,224,3)

  

    LeNet_pred = LeNet.predict(np.expand_dims(image, axis=0))
    ResNet_pred = ResNet.predict(np.expand_dims(image, axis=0))
    IV3_pred = InceptionV3.predict(np.expand_dims(image, axis=0))
    Xc_pred = Xception.predict(np.expand_dims(image, axis=0))
    VGG16_pred = Vgg.predict(np.expand_dims(image, axis=0))

    LeNet_pred = np.argmax(LeNet_pred)
    ResNet_pred = np.argmax(ResNet_pred)
    IV3_pred = np.argmax(IV3_pred)
    Xc_pred = np.argmax(Xc_pred)
    VGG16_pred = np.argmax(VGG16_pred)

    majority_pred = Majority_Predicted(LeNet_pred, IV3_pred, ResNet_pred, VGG16_pred, Xc_pred) 
    print("Predicted label: " + Classes[int(majority_pred)])
    return Classes[int(majority_pred)]

LeNet, ResNet, Xception, Vgg, InceptionV3 = Load_Models()
