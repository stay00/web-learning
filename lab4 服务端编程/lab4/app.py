import click
from flask import Flask, redirect, url_for, cli
from config import config
from extensions import db
from View import auth, player, admin
from flask_migrate import Migrate


def create_app():
    flask_app = Flask(__name__)
    flask_app.config.from_object(config)
    register_blueprint(flask_app)
    register_app_route(flask_app)
    db.init_app(flask_app)
    # initdb(flask_app)
    # with flask_app.app_context():
    #     db.drop_all()
    #     db.create_all()
    #     from models import User, Video
    #     db.session.add(User(id='root', password='123456', admin=True))
    #     db.session.add(User(id='ruoy', password='123456', admin=False))
    #     db.session.commit()
    migrate = Migrate(flask_app, db)
    return flask_app


def initdb(app):
    @app.cli.command()
    @click.option('--drop', is_flag=True, help='Create after drop')
    def init(drop):
        if drop:
            click.confirm('this operation will delete the database, continue?', abort=True)
            db.drop_all()
            click.echo('Drop tables.')
        db.create_all()
        click.echo('Initialized database')


def register_blueprint(app):
    app.register_blueprint(auth.auth_bp)
    app.register_blueprint(player.player_bp)
    app.register_blueprint(admin.admin_bp)


def register_app_route(app):
    @app.route('/')
    def root():
        return redirect(url_for('auth.login'))
