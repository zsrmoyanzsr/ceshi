from flask_admin import Admin, AdminIndexView
from main import app
from flask_admin.contrib.sqla import ModelView
from flask import current_app, redirect, url_for, request
from models import db, Case_item,Che,GaoSu,ShuJu,User,Role
from flask_ckeditor import CKEditor, CKEditorField
from flask_security import current_user


ckeditor = CKEditor(app)  # 初始化扩展



class MyModelView(ModelView):
    def is_accessible(self):
        if current_user.is_anonymous:
            return False
        for resu in User.query.get(current_user.get_id()).roles:
            if resu.name == 'admin':
                return True
        return False

    def inaccessible_callback(self, name, **kwargs):
        # redirect to login page if user doesn't have access
        return redirect(url_for('index'))



class MyCase_item(MyModelView):
    column_labels = dict(
        title = '标题',
        type = '类型',
        examine = '是否审核',
        files = '文件地址',
        conten = '内容',
    )
    column_searchable_list = ('title', 'type')
    form_overrides = dict(content=CKEditorField)  # 重写表单字段，将 text 字段设为 CKEditorField
    create_template = 'admin/edit.html'  # 指定创建记录的模板
    edit_template = 'admin/edit.html'  # 指定编辑记录的模板

class MyChe(MyModelView):
    column_labels = dict(
        status = '车辆状态',
        chesu = '车速',
        type = '车辆类型',
    )
    column_searchable_list = ('status', 'type')

class MyGaoSu(MyModelView):
    column_labels = dict(
        name='路口名称',
        liuliang = '车流量',
        hongdeng = '红灯时间',
        lvdeng = '绿灯时间',
        city = '城市'
    )
    column_searchable_list = ('name',)

class MyShuJu(MyModelView):
    column_labels = dict(
        name='姓名',
        nameid = '身份证',
        types = '类型',
        gjc = '关键词',
        fanshi = '选择方式',
        chetype = '车辆类型',
        driversnumber = '驾驶证编号',
        platenumber = '车牌号',
        Truckpass = '货车通行码',
    )
    column_searchable_list = ('name',)

admin = Admin(app=app, name='后台管理系统', template_mode='bootstrap3', base_template='admin/mybase.html',
              index_view=AdminIndexView(
                  name='导航栏',
                  template='admin/welcome.html',
                  url='/admin'
              ))
admin.add_view(MyCase_item(Case_item, db.session, name='录入数据管理'))
admin.add_view(MyChe(Che, db.session, name='车辆数据管理'))
admin.add_view(MyGaoSu(GaoSu, db.session, name='高速数据管理'))
admin.add_view(MyShuJu(ShuJu, db.session, name='违章数据管理'))
admin.add_view(MyModelView(User, db.session,name='用户管理'))
admin.add_view(MyModelView(Role, db.session,name='权限管理'))

if __name__ == '__main__':
    app.run(debug=True)

