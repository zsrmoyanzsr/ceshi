/**
 * Created by 30947 on 2018/7/20.
 */
$(function(){
    getHt();
    table();

})
//获取div的高度
function getHt(){
   var all_height=$(window).height();
   var div_height=all_height-80;
    $("#car_control").css("height",div_height+"px");


}
//表格部分
function table(){
    var para = document.location.search;
    $('#table').bootstrapTable({
        method: "get",
        url: "/get_table_admin" + para,
        striped: true,
        singleSelect: false,
        dataType: "json",
        pagination: true, //分页
        pageSize: 10,
        pageNumber: 1,
        search: false, //显示搜索框
        contentType: "application/x-www-form-urlencoded",
        queryParams: null,
        //sidePagination: "server", //服务端请求
        columns: [
            {
                title: "",
                field: 'id',
                align: 'center',
                width:'30px',
                valign: 'middle',
                formatter:function(val,row){
                    return '<div class="cliclRed"></div>';
                }

            }
            ,
            {
                title: "事项名称",
                field: 'type1',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '违章人',
                field: 'name',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '车辆类型',
                field: 'chetype',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '驾驶证编号',
                field: 'driversnumber',
                align: 'center',
                valign: 'middle'
            },
             {
                title: '车牌号',
                field: 'platenumber',
                align: 'center',
                valign: 'middle'
            },

            {
                title: '操作',
                field: 'opear',
                width:'250px',
                align: 'center',
                formatter: function (value, row) {
                    var e = '<a  href="javascript:void(0)" class="table_edit" title="咨询" onclick="edit(\'' + row.id + '\')">编辑</a> ';
                    var c = '<a  href="javascript:void(0)"   class="table_del" title="删除" onclick="dt(\'' + row.id + '\')">删除</a> ';


                    return e+c ;
                }
            }
        ]
    });


}
 function add(){
     layer.open({
         type: 2,
         skin: 'demo-class',

         title: '详情页面',
         fix: true,
         shadeClose: true,

         area: ['1000px', '500px'],
         content: '/add_project',

     });
     //加载层-默认风格
     layer.load(1);
//此处演示关闭
    setTimeout(function(){
        layer.closeAll('loading');
    }, 2000);
 }
function edit(id){

    layer.open({
        type: 2,
        skin: 'layui-layer-lan',

        title: '详情页面',
        fix: true,
        shadeClose: true,

        area: ['1100px', '600px'],
        content: '/up_project?id='+id,

    });
    //加载层-默认风格
    layer.load(1);
//此处演示关闭
     setTimeout(function(){
         layer.closeAll('loading');
    }, 2000);
}
function openList(){
    $(".find_expend").show();
    $("#open").hide();
}
function closeList(){
    $(".find_expend").hide();
    $("#open").show();
}
function dt(id){
    var url = '/delete_project?id=' + id;
    window.location.href = url
}