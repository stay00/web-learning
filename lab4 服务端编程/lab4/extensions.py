from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

db = SQLAlchemy()
load_dotenv()
video_path = os.getcwd() + os.environ.get('VIDEO_PATH')
video_src = ".." + os.environ.get('VIDEO_PATH')
