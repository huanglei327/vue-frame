<template>
    <div id="myChart" :style="{width:'100%', height: '300px'}"></div>
</template>

<script> 
export default {
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    mounted() {
        this.drawLine();
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            // myChart.setOption({
            //     title: { text: '在Vue中使用echarts' },
            //     tooltip: {},
            //     xAxis: {
            //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            //     },
            //     yAxis: {},
            //     series: [{
            //         name: '销量',
            //         type: 'bar',
            //         data: [5, 20, 36, 10, 10, 20]
            //     }]
            // });
            myChart.setOption({
                title: {
                    text: '多雷达图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'center',
                    data: ['某软件', '某主食手机', '某水果手机', '降水量', '蒸发量']
                },
                radar: [
                    {
                        indicator: [
                            { text: '品牌', max: 100 },
                            { text: '内容', max: 100 },
                            { text: '可用性', max: 100 },
                            { text: '功能', max: 100 },
                            { text: '屏幕', max: 100 },
                        ],
                        radius: 100,
                        startAngle: 90,
                        splitNumber: 4,
                        name: {
                            formatter: '【{value}】',
                            textStyle: {
                                color: '#72ACD1'
                            }
                        },
                        splitArea: {
                            areaStyle: {
                                color: ['rgba(114, 172, 209, 0.3)',
                                    'rgba(114, 172, 209, 0.3)', 'rgba(114, 172, 209, 0.3)',
                                    'rgba(114, 172, 209, 0.3)', 'rgba(114, 172, 209, 0.3)'],
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 10
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.5)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.8)'
                            }
                        }
                    },
                ],
                series: [
                    {
                        type: 'radar',
                        tooltip: {
                            trigger: 'item'
                        },
                        itemStyle:
                            {
                                normal:
                                    {

                                    }
                            },
                        data: [
                            {
                                value: [60, 73, 85, 40, 70],
                                name: '张三',
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: function (params) {
                                            return params.value;
                                        }
                                    }
                                }
                            }
                        ]
                    },
                ]
            })
        }
    }
}
</script>
<style lang="less">
</style>

