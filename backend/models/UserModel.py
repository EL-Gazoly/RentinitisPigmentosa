from config.db import meta
from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import String


users= Table(
    'users', meta,
    Column('id', String(36), primary_key=True),
    Column('first_name', String(255), nullable=False),
    Column('last_name', String(255), nullable=False),
    Column('email', String(255), unique=True, nullable=False),
    Column('password', String(255), nullable=False),
    Column('doctor', String(255), nullable=False),
)

code = Table(
    'code', meta,
    Column('email', String(255), nullable=False),
    Column('code', String(255), nullable=False),

)