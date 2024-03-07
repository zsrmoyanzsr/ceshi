import flask
from flask_sqlalchemy import SQLAlchemy
import datetime
import os
from sqlalchemy import or_,and_
from flask_babelex import Babel
from flask_security import Security, SQLAlchemySessionUserDatastore, \
    UserMixin, RoleMixin, login_required, auth_token_required, http_auth_required


app = flask.Flask(__name__)
abel = Babel(app)
app.config['BABEL_DEFAULT_LOCALE'] = 'zh_CN'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
SQLALCHEMY_TRACK_MODIFICATIONS = True
app.config['SQLALCHEMY_ECHO'] = False
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False
app.config['SECRET_KEY'] = 'kyes'


app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL', 'sqlite:///' + os.path.join(app.root_path, 'shuju.db'))
app.config['SECURITY_PASSWORD_SALT'] = '123456789'
app.config['SECURITY_PASSWORD_HASH'] = 'sha512_crypt'


db = SQLAlchemy(app)

# 创建模型
class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
    role_id = db.Column('role_id', db.Integer, db.ForeignKey('role.id'))

    def __repr__(self):
        return "<{} 用户 {} 权限>".format(self.user_id,self.role_id)

class Role(db.Model, RoleMixin):
    __tablename__ = 'role'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

    def __repr__(self):
        return "<{} 权限>".format(self.name)




class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, unique=True, primary_key=True)
    username  = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    last_login_at = db.Column(db.DateTime())
    current_login_at = db.Column(db.DateTime())
    last_login_ip = db.Column(db.String(100))
    current_login_ip = db.Column(db.String(100))
    login_count = db.Column(db.Integer)
    active = db.Column(db.Boolean())
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary='roles_users',
                         backref=db.backref('user', lazy='dynamic'))


    def __repr__(self):
        return "<{} 用户>".format(self.username)


class Case_item(db.Model):
    __tablename__ = 'Case_item'

    id = db.Column(db.Integer, unique=True, primary_key=True)
    title = db.Column(db.String(124),name='标题')
    type = db.Column(db.String(124),name='类型')
    examine = db.Column(db.String(124),name='是否审核')
    files = db.Column(db.String(224),name='文件地址')
    conten = db.Column(db.TEXT,name='内容')


    def __repr__(self):
        return "<{} 信息>".format(self.zhiwei)

    def to_dict(self):
        return {
            "id" : self.id,
            "title": self.title,
            "type": self.type,
            "examine": self.examine,
            "files": self.files,
            "conten": self.conten,
        }


class Che(db.Model):
    __tablename__ = 'Che'
    id = db.Column(db.Integer, unique=True, primary_key=True)
    status = db.Column(db.String(124), name='车辆状态')
    chesu = db.Column(db.Float, name='车速')
    type = db.Column(db.String(124), name='车辆类型')


class GaoSu(db.Model):
    __tablename__ = 'GaoSu'
    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String(124), name='路口名称')
    liuliang = db.Column(db.Float, name='车流量')
    hongdeng = db.Column(db.String(124), name='红灯时间')
    lvdeng = db.Column(db.String(124), name='绿灯时间')
    city = db.Column(db.String(124), name='城市')


class ShuJu(db.Model):
    __tablename__ = 'shuju'
    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String(124), name='姓名')
    nameid = db.Column(db.String(124), name='身份证')
    types = db.Column(db.String(124), name='类型')
    gjc = db.Column(db.String(124), name='关键词')
    fanshi = db.Column(db.String(124), name='选择方式')
    chetype = db.Column(db.String(124), name='车辆类型')
    driversnumber = db.Column(db.String(124), name='驾驶证编号')
    platenumber = db.Column(db.String(124), name='车牌号')
    Truckpass = db.Column(db.String(124), name='货车通行码')

    def __repr__(self):
        return "<{} 数据>".format(self.name)


if __name__ == '__main__':
    db.drop_all()#清除表
    db.create_all()#创建表


    # 设置flask-security
    user_datastore = SQLAlchemySessionUserDatastore(db.session, User, Role)
    security = Security(app, user_datastore)
    user_datastore.create_role(name='admin',description='管理员')#注册管理员权限
    user_datastore.create_role(name='User', description='普通用户')#注册用户权限
    db.session.commit()
    new_user = user_datastore.create_user(username='admin', password='root123456',email='123@qq.com',active=True)#注册管理员
    normal_role = user_datastore.find_role('admin')
    db.session.add(new_user)
    user_datastore.add_role_to_user(new_user, normal_role)
    db.session.commit()