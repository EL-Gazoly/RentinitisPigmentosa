import random 
import os
from config.db import conn
from dotenv import load_dotenv
from models.__init__ import users, code
from schemas.__init__ import ForgetPassword, ResetCode
from fastapi_mail import FastMail, MessageSchema,ConnectionConfig, MessageType
from pydantic import  EmailStr
import yagmail
from email.message import EmailMessage
import ssl
import smtplib

load_dotenv()



def generateOTP() : 
   return str(random.randint(10000, 99999))

def sentVerficationcode(email, verficationcode):
   email_sender = os.getenv('MYEMAIL')
   email_password = os.getenv('MYPASSWORD')
   email_receiver = email
   subject = 'ResetPassword!'
   body = f"""
   Your verification code is {verficationcode}
   """

   em = EmailMessage()
   em['From'] = email_sender
   em['To'] = email_receiver
   em['Subject'] = subject
   em.set_content(body)

   # Add SSL (layer of security)
   context = ssl.create_default_context()

   # Log in and send the email
   with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
      smtp.login(email_sender, email_password)
      smtp.sendmail(email_sender, email_receiver, em.as_string())




