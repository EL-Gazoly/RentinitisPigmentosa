import ssl
import smtplib
import os
from config.db import conn
from models.__init__ import users
from schemas.__init__ import User
from fastapi import HTTPException
from auth.__init__ import Hasher
from email.message import EmailMessage



async def get_all_users():
    try:
        return conn.execute(users.select()).fetchall()
    except Exception as e:
        HTTPException(status_code=500, detail='An Internal error')

async def get_user_with_id(id: str):
    try:
        return conn.execute(users.select().where(users.c.id == id)).fetchall()
    except Exception as e:
        HTTPException(status_code=400, detail='Well, this is not quite what we had in mind.But no worries, we have got this!')


async def update_user(id : str, user : User):
    try:
        res= conn.execute(users.update().values(
            first_name = user.first_name,
            last_name = user.last_name,
            email = user.email,
            password = Hasher.get_password_hash(user.password)
        ).where(users.c.id == id))
        if res.rowcount == 0:
            raise HTTPException(status_code=400, detail='Oops, it seems we have hit a glitch in the matrix.But no worries, we have got this!')
        

        return await get_user_with_id(id)
    except Exception as e:
        raise HTTPException(status_code=500, detail='Oops, it seems we have hit a glitch in the matrix.But no worries, we have got this!')


async def delete_user(id: str):
    try:
        conn.execute(users.delete().where(users.c.id == id))
    
        return {'message': 'Good bye :('}
    except:
        raise HTTPException(status_code=500, detail='Well, this is not quite what we had in mind.But no worries, we have got this!')
    

async def contact_us(request):
    sender_email = request.email
    sender_name = request.name
    contact_us_email = os.getenv('CONTACT_US_EMAIL')
    contact_us_password = os.getenv('CONTACT_US_PASSWORD')
    reciever_email = os.getenv('MYEMAIL')
    sender_message = request.message

    message = f"""Subject: Message from RP Website User\n\nName: {sender_name}\nEmail: {sender_email}\nMessage: {sender_message}"""

    em = EmailMessage()
    em['From'] = contact_us_email
    em['To'] = reciever_email
    em['Subject'] = 'Message from RP Website User' 
    em.set_content(message)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=ssl.create_default_context()) as smtp:
        smtp.login(contact_us_email, contact_us_password)
        smtp.sendmail(contact_us_email, reciever_email, em.as_string())
    
    return {'message': 'Thank you for contacting us!'}

    