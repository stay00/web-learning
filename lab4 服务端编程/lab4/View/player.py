from flask import render_template, redirect, request, url_for
from flask import Blueprint
from flask import session
from extensions import db
from models import Video

player_bp = Blueprint('player', __name__)


@player_bp.route('/index')
def index():
    if 'logged in' in session:
        username = session['username']
        videos = Video.query.all()
        return render_template('index.html', user=username, videos=videos)
    else:
        return redirect(url_for('auth.login'))
