from dotenv import load_dotenv
import os

load_dotenv()


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('URI')
    SECRET_KEY = os.environ.get('SECRET_KEY')


config = Config
