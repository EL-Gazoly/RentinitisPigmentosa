import random 
import os
from email.message import EmailMessage
import ssl
import smtplib


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




