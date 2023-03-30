import random 
import os
from config.db import conn
from dotenv import load_dotenv
from models.__init__ import users, code
from schemas.__init__ import ForgetPassword, ResetCode
from fastapi_mail import FastMail, MessageSchema,ConnectionConfig

load_dotenv()

def generateOTP() : 
   return str(random.randint(10000, 99999))

def forgetPassword(request:ForgetPassword):
    user_email = request.email
    if not user_email:
        return {'msg' : 'Email is required'}
    
    existing_user = conn.execute(users.select().where(users.c.email== user_email))

    if existing_user.rowcount == 0:
        return {'msg' : 'Email does not exist'}
    
    verfication_code = generateOTP()

    conn.execute(code.insert().values(
        email = user_email,
        code = generateOTP()
    ))

    sentVerficationcode(user_email, verfication_code)

    return {'msg' : 'Code sent to your email'}


def sentVerficationcode(email, verficationcode):

    mail_conf = ConnectionConfig(
        MAIL_USERNAME = os.getenv('MYEMAIL'),
        MAIL_PASSWORD = os.getenv('MYPASSWORD'),
        MAIL_FROM = os.getenv('MYEMAIL'),
        MAIL_PORT = os.getenv('EMAILPORT'),
        MAIL_SERVER = os.getenv('EMAILSERVER'),
        MAIL_TLS = True,
        MAIL_SSL = False,
        USE_CREDENTIALS = True,
    )
    
    message = MessageSchema(
        subject = 'Reset Password',
        recipients = [email],
        body = f'Your verification code is {verficationcode}',
    )

    fm = FastMail(mail_conf)
    fm.send_message(message, template_name="forget_password")
    

   