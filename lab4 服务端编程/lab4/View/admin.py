import json

from flask import render_template, redirect, url_for
from flask import Blueprint
from flask import request, session
from extensions import video_path, db, video_src
from models import Video
import os

admin_bp = Blueprint('admin', __name__)


# @login_required()
@admin_bp.route('/panel', methods=['GET'])
def panel():
    if 'logged in' in session and session['admin']:
        videos = Video.query.all()
        return render_template('admin.html', videos=videos, user=session['username'])
    else:
        return redirect(url_for('auth.login'))
    # if request.method == 'POST':
    #     file = request.files['videos']
    #     path = video_path + '{0}/'.format(session['username'])
    #     if not os.path.exists(path):
    #         os.mkdir(path)
    #     path += file.filename
    #     file.save(path)
    #     video = Video(name=file.filename, src=path, uid=session['username'])
    #     db.session.add(video)
    #     db.session.commit()


@admin_bp.route('/remove', methods=['POST'])
def remove():
    selected = request.json
    selected = selected.keys()
    for vid in selected:
        video = Video.query.get(vid)
        db.session.delete(video)
        db.session.commit()
        name = video.name
        path = video_path + '{0}/'.format(session['username']) + name
        os.remove(path)
    return redirect(url_for('admin.panel'))


@admin_bp.route('/upload', methods=['POST'])
def upload():
    file = request.files['videos']
    path = video_path + '{0}/'.format(session['username'])
    src = video_src + '{0}/'.format(session['username'])
    if not os.path.exists(path):
        os.mkdir(path)
    path += file.filename
    src += file.filename
    file.save(path)
    video = Video(name=file.filename, src=src, uid=session['username'])
    db.session.add(video)
    db.session.commit()
    return redirect(url_for('admin.panel'))
