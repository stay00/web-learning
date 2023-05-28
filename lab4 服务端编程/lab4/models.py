from extensions import db


class User(db.Model):
    id = db.Column(db.String(10), primary_key=True)
    password = db.Column(db.String(6))
    admin = db.Column(db.Boolean)
    videos = db.relationship("Video", backref='user')

    def __repr__(self):
        return '<User> id:{}'.format(self.id)


class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100))
    src = db.Column(db.String(200))
    uid = db.Column(db.String(10), db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Videos> id:{}'.format(self.id)
