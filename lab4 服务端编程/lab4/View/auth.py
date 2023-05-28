from flask import render_template, redirect, request, url_for
from flask import Blueprint
from flask import session
from wtforms import Form, StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError
from models import User
from extensions import db

auth_bp = Blueprint('auth', __name__)


class LoginForm(Form):
    username = StringField('username', validators=[DataRequired(message="用户名不应为空")])
    password = PasswordField('password', validators=[DataRequired(message="密码不应为空")])
    submit = SubmitField('Log in')


class SignupForm(Form):
    username = StringField('username', validators=[DataRequired(message="用户名为必填项"),
                                                   Length(min=1, max=10, message="用户名最大长度为 10")])
    password = PasswordField('password', validators=[DataRequired("密码为必填项"),
                                                     Length(min=6, max=6,
                                                            message="密码应为 6 位")])
    password2 = PasswordField('password2', validators=[DataRequired("确认密码为必填项"),
                                                       Length(min=6, max=6,
                                                              message="密码应为 6 位")])
    submit = SubmitField('Log in')

    def validate_username(form, field):
        user = User.query.get(field.data)
        if user is not None:
            raise ValidationError('用户名已存在')
        else:
            pass

    def validate_password2(form, field):
        if form.password is not None and field.data is not None:
            if form.password.data != field.data:
                raise ValidationError('两次密码不同')


@auth_bp.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        form = LoginForm(request.form)
        if form.validate():
            userid = form.username.data
            password = form.password.data
            user = User.query.get(userid)
            if user is None or user.password != password:
                return render_template('login.html', form=LoginForm(), match="密码错误")
            elif user.admin:
                session['logged in'] = True
                session['username'] = userid
                session['admin'] = True
                return redirect(url_for('admin.panel'))
            else:
                session['logged in'] = True
                session['username'] = userid
                session['admin'] = False
                return redirect(url_for('player.index'))
        else:
            return render_template('login.html', form=form)

    else:
        return render_template('login.html', form=LoginForm())


@auth_bp.route("/signup", methods=['POST', 'GET'])
def signup():
    if request.method == 'POST':
        form = SignupForm(request.form)
        if form.validate():
            user = User(id=form.username.data, password=form.password.data, admin=False)
            db.session.add(user)
            db.session.commit()
            session['logged in'] = True
            session['username'] = user.id
            session['admin'] = False
            return redirect(url_for("player.index"))
        else:
            print(form.errors)
            return render_template('signup.html', form=form)
    else:
        return render_template('signup.html', form=SignupForm())


@auth_bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for('auth.login'))


