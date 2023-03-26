from sqlalchemy import create_engine, MetaData
from dotenv import load_dotenv
from decouple import config


load_dotenv()
engine = create_engine( config( 'DATABASE_URL' ) )

meta = MetaData()

conn = engine.connect()