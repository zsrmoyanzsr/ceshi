/**
 * Created by 30947 on 2018/7/18.
 */
$(function(){

    char1();
    char2();
    char3();
    //char4();
    rightBottomCharts();

var int=self.setInterval("doclock()",1500);

})

function random(min, max) {
 
  return Math.floor(Math.random() * (max - min)) + min;
 
}

var aa = [[11,12,13,14,15],[22,23,24,25,26],[35,36,37,38,39],[42,43,44,45,46],[55,56,57,58,59]];
var cc = [[4,5,6,7,8],[6,7,8,9,10],[7,8,9,10,11],[10,11,12,13,14],[15,16,17,18,19]];
var gg = [[40,48,34,35,38],[38,24,26,36,19],[39,48,47,37,28],[56,34,35,47,48],[57,48,49,30,46]];
var kk = [[14543,16763,16583,17862,18839],[24089,24985,25431,26784,27798],[35643,36423,36789,38752,39921],[50001,54653,56798,59865,50863],[73245,78904,75683,76487,78934],[95643,95498,97832,97893,99874]];

//定时器
function doclock()
{
var n= random(0, 4);
var m= random(0, 4);
var q= random(0, 4);
var l= random(0, 4);
var bb=aa[n];
var dd=cc[m];
var hh=gg[q];
var vv=kk[l];

var d=new Date();
var t=d.toLocaleTimeString();
var txt1=parseInt($(".text01_div").eq(0).find("p").eq(1).text())+ random(1, 3);
var txt2=parseInt($(".text01_div").eq(1).find("p").eq(1).text())+ random(1, 3);
var txt3=parseInt($(".text01_div").eq(2).find("p").eq(1).text())+ random(1, 3);
var txt4=parseInt($(".text01_div").eq(3).find("p").eq(1).text())+ random(1, 3);
var txt5=parseInt($(".text01_div").eq(4).find("p").eq(1).text())+ random(1, 3);
var txt6=parseInt($(".text01_div").eq(5).find("p").eq(1).text())+ random(1, 3);

$(".text01_div").eq(0).find("p").eq(1).text(txt1);
$(".text01_div").eq(1).find("p").eq(1).text(txt2);
$(".text01_div").eq(2).find("p").eq(1).text(txt3);
$(".text01_div").eq(3).find("p").eq(1).text(txt4);
$(".text01_div").eq(4).find("p").eq(1).text(txt5);
$(".text01_div").eq(5).find("p").eq(1).text(txt6);

$(".table_p").eq(0).find("tbody").find("tr").eq(0).find("td").eq(2).text(bb[0]);
$(".table_p").eq(0).find("tbody").find("tr").eq(1).find("td").eq(2).text(bb[1]);
$(".table_p").eq(0).find("tbody").find("tr").eq(2).find("td").eq(2).text(bb[2]);
$(".table_p").eq(0).find("tbody").find("tr").eq(3).find("td").eq(2).text(bb[3]);
$(".table_p").eq(0).find("tbody").find("tr").eq(4).find("td").eq(2).text(bb[4]);

$(".table_p").eq(2).find("tbody").find("tr").eq(0).find("td").eq(1).text(dd[0]);
$(".table_p").eq(2).find("tbody").find("tr").eq(1).find("td").eq(1).text(dd[1]);
$(".table_p").eq(2).find("tbody").find("tr").eq(2).find("td").eq(1).text(dd[2]);
$(".table_p").eq(2).find("tbody").find("tr").eq(3).find("td").eq(1).text(dd[3]);
$(".table_p").eq(2).find("tbody").find("tr").eq(4).find("td").eq(1).text(dd[4]);

$(".table_p").eq(2).find("tbody").find("tr").eq(0).find("td").eq(2).text(hh[0]);
$(".table_p").eq(2).find("tbody").find("tr").eq(1).find("td").eq(2).text(hh[1]);
$(".table_p").eq(2).find("tbody").find("tr").eq(2).find("td").eq(2).text(hh[2]);
$(".table_p").eq(2).find("tbody").find("tr").eq(3).find("td").eq(2).text(hh[3]);
$(".table_p").eq(2).find("tbody").find("tr").eq(4).find("td").eq(2).text(hh[4]);


$(".table_p").eq(1).find("tbody").find("tr").eq(0).find("td").eq(2).text(vv[0]);
$(".table_p").eq(1).find("tbody").find("tr").eq(1).find("td").eq(2).text(vv[1]);
$(".table_p").eq(1).find("tbody").find("tr").eq(2).find("td").eq(2).text(vv[2]);
$(".table_p").eq(1).find("tbody").find("tr").eq(3).find("td").eq(2).text(vv[3]);
$(".table_p").eq(1).find("tbody").find("tr").eq(4).find("td").eq(2).text(vv[4]);


}



function rightBottomCharts() {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('char4'));
    var xData = function () {
        var data = [];
        for (var i = 2; i < 8; i++) {
            data.push(i + "月");
        }
        return data;
    }();



    var option = {
        backgroundColor:'rgba(011, 023, 059)',
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(list) {
                var msg = "";
                for (let i in list) {
                    if (i == 0) {
                        msg += list[i].name + "<br>";
                    }
                    msg += list[i].seriesName + "：" + list[i].data + "数量<br>";
                    if (i > 0 && list[i].seriesName == "预计拥堵" && list[i - 1].seriesName == "实时监测") {
                        msg += "总数量" + "：" + (list[i].data + list[i - 1].data) + "数量<br>";
                    }
                    if (i > 0 && list[i].seriesName == "疏散" && list[i - 1].seriesName == "汇入") {
                        msg += "缓解数" + "：" + (list[i - 1].data - list[i].data) + "数量<br>";
                    }
                }
                return msg;
            }
        },
        legend: {
            textStyle: {
                color: '#fff',
            },
            data: ['预计拥堵', '实时监测', '疏散', '汇入']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#808eb7',
                    width: 2
                }
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: '#808eb7',
                    width: 2
                }
            },
            splitLine: { //分割线配置
                lineStyle: {
                    color: "#AAAAAA56",
                }
            },
        },
        series: [{
                name: '预计拥堵',
                type: 'bar',
                stack: '数量',
                barMaxWidth: 30,
                data: [120, 132, 101, 134, 90, 230, 210],
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 1,
                                color: "#00ffff" // 0% 处的颜色
                            },
                            {
                                offset: 0,
                                color: "#3893e5" // 100% 处的颜色
                            }
                        ], false),
                    },
                },
            },
            {
                name: '实时监测',
                type: 'bar',
                stack: '数量',
                barMaxWidth: 30,
                data: [220, 182, 191, 234, 290, 330, 310],
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 1,
                                color: "#bab3bd69" // 0% 处的颜色
                            },
                            {
                                offset: 0,
                                color: "#bab3bd69" // 100% 处的颜色
                            }
                        ], false),
                    },
                },
            },
            {
                name: '疏散',
                data: [220, 453, 301, 354, 290, 330, 320],
                type: 'line',
                itemStyle: {
                    normal: {
                        color: "#0088D4",
                    },
                },
            },
            {
                name: '汇入',
                data: [213, 356, 123, 225, 78, 123, 354],
                type: 'line',
                itemStyle: {
                    normal: {
                        color: "#DB3233",
                    },
                },
            },
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

//统计分析图
function char1() {

    var myChart1 = echarts.init($("#char1")[0]);

    option1 = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'right',
            textStyle : {
                color : '#ffffff',

            },
            data:['小型汽车','中型汽车','大型卡车','学生校车']
        },

        calculable : false,
        series : [
            {
                name:'车类型',
                type:'pie',
                zlevel:1, //所有图形的 zlevel 值。zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
                  startAngle:90, //默认90，起始角度，支持范围[0, 360]
                  radius:['60%','80%'], //数组的第一项是内半径，第二项是外半径 -- 圆环
                  label:{show:false}, //文本标签，可用于说明图形的一些数据信息
                  labelLine:{show:false}, //标签的视觉引导线配置
                itemStyle : {
                    normal : {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '20',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                data:[
                    {value:335, name:'小型汽车'},
                    {value:310, name:'中型汽车'},
                    {value:234, name:'大型卡车'},
                    {value:135, name:'学生校车'}

                ]
            }
        ]
    };

    myChart1.setOption(option1);
    window.addEventListener('resize', function () {myChart1.resize();})
    function f() {

        option1.series[0].startAngle = option1.series[0].startAngle - 5;
        myChart1.setOption(option1);
    }
    setInterval(function() {
        //用setInterval做动画感觉有问题
        f()
        }, 200);
}

function char2() {

    var myChart = echarts.init($("#char2")[0]);

    option = {
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '超速', max: 6500 },
              { name: '闯红灯', max: 16000 },
              { name: '压线', max: 30000 },
              { name: '不礼让行人', max: 38000 },
              { name: '错误使用灯光', max: 52000 },
              { name: '非机动车道行驶', max: 25000 }
            ]
          },
          series: [
            {
              type: 'radar',
              data: [
                {
                  value: [4200, 3000, 20000, 35000, 50000, 18000],
                  name: '小车'
                },
                {
                  value: [5000, 14000, 28000, 26000, 42000, 21000],
                  name: '货车'
                }
              ]
            }
          ]
        };

    myChart.setOption(option);
    window.addEventListener('resize', function () {myChart.resize();})

}
function char3() {

    var myChart1 = echarts.init($("#char3")[0]);

    var option1 = {
          series: [
            {
              type: 'gauge',
              progress: {
                show: true,
                width: 18
              },
              axisLine: {
                lineStyle: {
                  width: 18
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                length: 15,
                lineStyle: {
                  width: 2,
                  color: '#999'
                }
              },
              axisLabel: {
                distance: 25,
                color: '#999',
                fontSize: 20
              },
              anchor: {
                show: true,
                showAbove: true,
                size: 25,
                itemStyle: {
                  borderWidth: 10
                }
              },
              title: {
                show: false
              },
              detail: {
                valueAnimation: true,
                fontSize: 80,
                offsetCenter: [0, '70%']
              },
              data: [
                {
                  value: 70
                }
              ]
            }
          ]
        };

    myChart1.setOption(option1);
    window.addEventListener('resize', function () {myChart1.resize();})

        function f() {
        option1.series[0].data[0].value =  option1.series[0].data[0].value - random(-3,2);
        myChart1.setOption(option1);
    }
    setInterval(function() {
        //用setInterval做动画感觉有问题
        f()
        }, 1000);

}
function char4() {

    var myChart = echarts.init($("#char4")[0]);

    option = {
        grid: {show:'true',borderWidth:'0'},
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },

            formatter: function (params) {
                var tar = params[0];
                return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
            }
        },

        xAxis : [
            {
                type : 'category',
                splitLine: {show:false},
                data : ['小型汽车','中型汽车','大型卡车','学生校车'],
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                }

            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {show:false},
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        ],
        series : [

            {
                name:'报警数量',
                type:'bar',
                stack: '总量',
                itemStyle : { normal: {label : {show: true, position: 'inside'}}},
                data:[2900, 1200, 300, 200, 900, 300]
            }
        ]
    };

    myChart.setOption(option);
    window.addEventListener('resize', function () {myChart.resize();})

}
