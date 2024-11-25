// 设备使用状况饼图
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".water .chart"));
    // 2.指定配置项和数据
    var option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          textStyle:{
            color:"rgba(255,255,255,0.5)"
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '57%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 30, name: '尚未使用' },
              { value: 100, name: '正在使用' }
            ]
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 年龄分布图
(function(){
    // // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar1 .chart"));
    // 2.指定配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        // 修改图表的大小
        grid: {
            left: '0%',
            top:"10px",
            right: '0%',
            bottom: '4%',
            containLabel: true
        },
        xAxis: {
          type: 'category',
          name: "次/分",
          nameTextStyle: {
             color: "rgba(255,255,255,0.1)",
             nameLocation:"ceenter",
             show:true
          },
          data: ['65-75', '75-85', '85-95', '95-105'],
          axisLabel:{
            color:"rgba(255,255,255,0.5)",
            fontSize:'10'
          }
        },
        yAxis: {
          type: 'value',
          name: "人",
          nameTextStyle: {
             color: "#aaa",
             nameLocation: "start",
          },
          // y轴分割线
          splitLine:{
            lineStyle:{
                color:"rgba(255,255,255,0.1)"
            }
        }
        },
        series: [
          {
            data: [
              10,
              30,
              35,
              33,
              1
            ],
            type: 'bar'
          }
        ]
      };

    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 心跳频率条形图
(function(){
    // // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar2 .chart"));
    // 2.指定配置项和数据
    var option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        textStyle:{
          color:"rgba(255,255,255,0.5)",
          fontSize:"10"
        },
        orient: 'vertical',
        left: 'left'
    },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '80%',
          center:['50%','45%'],
          data: [
            { value: 55, name: '男' },
            { value: 45, name: '女' }
          ],
          label:{
            color:"rgba(255,255,255,0.5)"
          }
        }
      ]
    };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第一个人的呼吸
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line1 .breathchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line',
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第一个人的心跳
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line1 .heartchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            show:false,
            color:"rgb(255,255,255,0.1)"  //文本颜色
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line'
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第二个人的呼吸
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line2 .breathchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line',
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第二个人的心跳
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line2 .heartchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            show:false,
            color:"rgb(255,255,255,0.1)"  //文本颜色
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line'
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第三个人的呼吸
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line3 .breathchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line',
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第三个人的心跳
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line3 .heartchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            show:false,
            color:"rgb(255,255,255,0.1)"  //文本颜色
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line'
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第四个人的呼吸
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line4 .breathchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line',
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第四个人的心跳
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line4 .heartchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            show:false,
            color:"rgb(255,255,255,0.1)"  //文本颜色
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line'
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第五个人的呼吸
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line5 .breathchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line',
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第五个人的心跳
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line5 .heartchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            show:false,
            color:"rgb(255,255,255,0.1)"  //文本颜色
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line'
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第六个人的呼吸
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line6 .breathchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line',
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第六个人的心跳
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line6 .heartchart"));
    // 2.指定配置项和数据
    var option = {
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            show:false,
            color:"rgb(255,255,255,0.1)"  //文本颜色
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 120],
            type: 'line'
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第十一个人的呼吸
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line11 .breathchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line',
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第十一个人的心跳
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line11 .heartchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            show:false,
            color:"rgb(255,255,255,0.1)"  //文本颜色
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line'
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第十六个人的呼吸
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line16 .breathchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line',
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();
// 第十六个人的心跳
(function(){
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line16 .heartchart"));
    // 2.指定配置项和数据
    var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,  //去除轴线内间距
          axisLabel:{
            show:false,
            color:"rgb(255,255,255,0.1)"  //文本颜色
          },
          axisLine:{
            show:false //去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:"rgb(255,255,255,0.1)",  //文本颜色
            show:false
          },
          axisLine:{
            show:false //去除轴线
          },
          splitLine:{
            lineStyle:{
                color:"rgb(255,255,255,0.1)"  //分割线颜色
            }
          }
        },
        series: [
          {
            data: [30, 60, 25, 70, 30, 90, 40],
            type: 'line'
          }
        ]
      };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图标跟随屏幕自动的去适应
    window.addEventListener("resize",function(){
        myChart.resize();
    })
})();