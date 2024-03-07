from flask import session,redirect,request,render_template,url_for,Flask,jsonify
from models import app
import models
from flask_security import Security, SQLAlchemySessionUserDatastore, \
    UserMixin, RoleMixin, login_required, auth_token_required, http_auth_required,current_user
from sqlalchemy import and_

user_datastore = SQLAlchemySessionUserDatastore(models.db.session, models.User, models.Role)
security = Security(app, user_datastore)


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def home():
    stu_id = current_user.is_anonymous
    if request.method == 'GET':
        return render_template('index.html', **locals())


@app.route('/carContrl', methods=['GET', 'POST'])
def carContrl():
    stu_id = current_user.is_anonymous
    if request.method == 'GET':
        return render_template('carContrl.html', **locals())

@app.route('/map', methods=['GET', 'POST'])
def map():
    stu_id = current_user.is_anonymous
    if request.method == 'GET':
        return render_template('map.html', **locals())


@app.route('/static1', methods=['GET', 'POST'])
def static1():
    stu_id = current_user.is_anonymous
    if request.method == 'GET':
        return render_template('static.html', **locals())

import os
from werkzeug.utils import secure_filename
@app.route('/message', methods=['GET', 'POST'])
def message():
    stu_id = current_user.is_anonymous
    if stu_id:
        return redirect(url_for('logins'))
    if request.method == 'GET':
        return render_template('message.html', **locals())
    elif request.method == 'POST':
        title = request.form.get('title')
        type1 = request.form.get('type')
        ref = request.form.get('ref')
        file = request.files.get('file')
        print(file)
        user_input = request.form.get("name")

        basepath = os.path.dirname(__file__)  # 当前文件所在路径

        upload_path = os.path.join(basepath, 'static/file', secure_filename(file.filename))  # 注意：没有的文件夹一定要先创建，不然会提示没有该路径
        # upload_path = os.path.join(basepath, 'static/images','test.jpg')  #注意：没有的文件夹一定要先创建，不然会提示没有该路径
        file.save(upload_path)

        content = request.form.get('content')

        models.db.session.add(
            models.Case_item(
                title = title,
                type = type1,
                examine = ref,
                files = upload_path,
                conten = content
            )
        )
        models.db.session.commit()
        return redirect('/index')



@app.route('/table1', methods=['GET', 'POST'])
def table1():
    stu_id = current_user.is_anonymous
    if stu_id:
        return redirect(url_for('logins'))
    if request.method == 'GET':
        results = models.ShuJu.query.all()
        return render_template('table1.html', **locals())

@app.route('/add_project', methods=['GET', 'POST'])
def add_project():
    if request.method == 'GET':
        return render_template('add_project.html', **locals())
    elif request.method == 'POST':
        name = request.form.get('name')
        nameid = request.form.get('nameid')
        types = request.form.get('types')
        gjc = request.form.get('gjc')
        fanshi = request.form.get('fanshi')
        chetype = request.form.get('chetype')
        driversnumber = request.form.get('driversnumber')
        platenumber = request.form.get('platenumber')
        Truckpass = request.form.get('Truckpass')
        models.db.session.add(
            models.ShuJu(
                name = name,
                nameid = nameid,
                types = types,
                gjc = gjc,
                fanshi = fanshi,
                chetype = chetype,
                driversnumber = driversnumber,
                platenumber = platenumber,
                Truckpass = Truckpass
            )
        )
        models.db.session.commit()
        return u'新增成功'


@app.route('/up_project', methods=['GET', 'POST'])
def up_project():
    if request.method == 'GET':
        id = request.args.get('id')
        data = models.ShuJu.query.get(id)
        return render_template('update_project.html', **locals())
    elif request.method == 'POST':
        id = request.args.get('id')
        print(id)
        print(request.form)
        name = request.form.get('name')
        nameid = request.form.get('nameid')
        types = request.form.get('types')
        gjc = request.form.get('gjc')
        fanshi = request.form.get('fanshi')
        chetype = request.form.get('chetype')
        driversnumber = request.form.get('driversnumber')
        platenumber = request.form.get('platenumber')
        Truckpass = request.form.get('Truckpass')

        data = models.ShuJu.query.get(id)
        print(data)
        data.name = name
        data.nameid = nameid
        data.types = types
        data.gjc = gjc
        data.fanshi = fanshi
        data.chetype = chetype
        data.driversnumber = driversnumber
        data.platenumber = platenumber
        data.Truckpass = Truckpass
        models.db.session.commit()
        return u'更新成功'



@app.route('/tail_more', methods=['GET', 'POST'])
def tail_more():
    if request.method == 'GET':
        results = models.Case_item.query.all()
        return render_template('tail_more.html', **locals())

@app.route('/delete_project', methods=['GET', 'POST'])
def delete_project():
    if request.method == 'GET':
        id = request.args.get('id')
        data = models.ShuJu.query.get(id)
        models.db.session.delete(data)
        models.db.session.commit()
        return redirect('/table1')


@app.route('/get_table_admin', methods=['GET', 'POST'])
def get_table_admin():
    if request.method == 'GET':
        name = request.args.get('name')
        nameid = request.args.get('nameid')
        type1 = request.args.get('type1')
        chetype = request.args.get('chetype')
        driversnumber = request.args.get('driversnumber')
        platenumber = request.args.get('platenumber')
        results = models.ShuJu.query
        if name:
            results = results.filter(models.ShuJu.name.like('%{}%'.format(name)))
        if nameid:
            results = results.filter(models.ShuJu.nameid==nameid)
        if type1:
            results = results.filter(models.ShuJu.types == type1)
        if chetype:
            results = results.filter(models.ShuJu.chetype == chetype)
        if driversnumber:
            results = results.filter(models.ShuJu.driversnumber == driversnumber)
        if platenumber:
            results = results.filter(models.ShuJu.platenumber == platenumber)

        results = results.all()

        info_list = []
        for item in results:
            info_list.append({"id":item.id,'name':item.name,"type1":item.types,
                              "chetype":item.chetype,"driversnumber":item.driversnumber,
                              "platenumber":item.platenumber

                              })
        return jsonify(info_list)

@app.route('/signups', methods=['GET', 'POST'])
def signup():
    uuid = current_user.is_anonymous
    print(uuid)

    if request.method == 'GET':
        return render_template('account/register.html')
    elif request.method == 'POST':
        user = request.form.get('user')
        email = request.form.get('email')
        password = request.form.get('password')
        if models.User.query.filter(models.User.username == user).all():
            return render_template('account/register.html', error='账号名已被注册')
        elif user == '' or password == '' or email == '':
            return render_template('account/register.html', error='输入不能为空')
        else:
            new_user = user_datastore.create_user(username=user,email=email, password=password)
            normal_role = user_datastore.find_role('User')
            models.db.session.add(new_user)
            user_datastore.add_role_to_user(new_user, normal_role)
            models.db.session.commit()
            login_user(new_user, remember=True)

            return redirect(url_for('index'))


from flask_security.utils import login_user, logout_user
@app.route('/logins', methods=['GET', 'POST'])
def logins():
    uuid = current_user.is_anonymous
    if not uuid:
        return redirect(url_for('index'))
    if request.method=='GET':
        return render_template('account/index.html')
    elif request.method=='POST':
        user = request.form.get('user')
        password = request.form.get('password')
        data = models.User.query.filter(and_(models.User.username==user,models.User.password==password)).first()
        if not data:
            return render_template('account/index.html',error='账号密码错误')
        else:
            login_user(data, remember=True)
            if data.is_authenticated:
                return redirect('/admin')
            else:
                return redirect(url_for('index'))



@app.route('/loginsout', methods=['GET'])
def loginsout():
    if request.method=='GET':
        logout_user()
        return redirect(url_for('logins'))


