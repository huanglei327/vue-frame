<template>
    <div>
        <div id="myChart" :style="{width:'100%', height: '350px'}"></div>
        <div id="myChartx" :style="{width:'100%', height: '350px'}"></div>
    </div>
</template>

<script>
import { getLDTInfoApi } from "@/utils/httpUtils/api.js";
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      list: []
    };
  },
  mounted() {
    const that = this;

    that.init().then(() => {
      return that.drawLine();
    });
  },
  methods: {
    init() {
      return new Promise((resolve, reject) => {
        const that = this;
        const c = res => {
          if (res.errCode === 0) {
            that.list = res.data;
          }
          resolve();
        };
        const param = {
          userName: that.$common.getUserInfo("userName")
        };
        getLDTInfoApi(param).then(c);
      });
    },
    drawLine() {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myChartx = this.$echarts.init(document.getElementById("myChartx"));
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

      //   myChart.setOption({
      //     title: {
      //       text: "我的评审"
      //     },
      //     tooltip: {
      //       trigger: "axis"
      //     },
      //     legend: {
      //       x: "center"
      //     },
      //     radar: [
      //       {
      //         indicator: [
      //           { name: "探索学习能力", max: 100 },
      //           { name: "积极人格\n与价值观", max: 100 },
      //           { name: "沟通合作\n能力", max: 100 },
      //           { name: "科技实践能力", max: 100 },
      //           { name: "创意革新能力", max: 100 },
      //           { name: "思考与问题\n解决能力", max: 100 }
      //         ],
      //         center: ["50%", "30%"],
      //         radius: 90,
      //         startAngle: 90,
      //         splitNumber: 4,
      //         name: {
      //           formatter: "{value}",
      //           textStyle: {
      //             color: "#72ACD1",
      //             fontSize: "10"
      //           }
      //         },
      //         splitArea: {
      //           areaStyle: {
      //             color: [
      //               "rgba(114, 172, 209, 0.3)",
      //               "rgba(114, 172, 209, 0.3)",
      //               "rgba(114, 172, 209, 0.3)",
      //               "rgba(114, 172, 209, 0.3)",
      //               "rgba(114, 172, 209, 0.3)"
      //             ],
      //             shadowColor: "rgba(0, 0, 0, 0.3)",
      //             shadowBlur: 10
      //           }
      //         },
      //         axisLine: {
      //           lineStyle: {
      //             color: "rgba(255, 255, 255, 0.5)"
      //           }
      //         },
      //         splitLine: {
      //           lineStyle: {
      //             color: "rgba(255, 255, 255, 0.8)"
      //           }
      //         }
      //       },
      //       {
      //         indicator: [
      //           { name: "探索学习能力", max: 100 },
      //           { name: "积极人格\n与价值观", max: 100 },
      //           { name: "沟通合作\n能力", max: 100 },
      //           { name: "科技实践能力", max: 100 },
      //           { name: "创意革新能力", max: 100 },
      //           { name: "思考与问题\n解决能力", max: 100 }
      //         ],
      //         center: ["50%", "80%"],
      //         radius: 90,
      //         startAngle: 90,
      //         splitNumber: 4,
      //         name: {
      //           formatter: "{value}",
      //           textStyle: {
      //             color: "#72ACD1",
      //             fontSize: "10"
      //           }
      //         },
      //         splitArea: {
      //           areaStyle: {
      //             color: [
      //               "rgba(114, 172, 209, 0.3)",
      //               "rgba(114, 172, 209, 0.3)",
      //               "rgba(114, 172, 209, 0.3)",
      //               "rgba(114, 172, 209, 0.3)",
      //               "rgba(114, 172, 209, 0.3)"
      //             ],
      //             shadowColor: "rgba(0, 0, 0, 0.3)",
      //             shadowBlur: 10
      //           }
      //         },
      //         axisLine: {
      //           lineStyle: {
      //             color: "rgba(255, 255, 255, 0.5)"
      //           }
      //         },
      //         splitLine: {
      //           lineStyle: {
      //             color: "rgba(255, 255, 255, 0.8)"
      //           }
      //         }
      //       }
      //     ],
      //     series: [
      //       {
      //         type: "radar",
      //         tooltip: {
      //           trigger: "item"
      //         },
      //         itemStyle: {
      //           normal: {}
      //         },
      //         data: [
      //           {
      //             value: [60, 73, 85, 40, 70, 60],
      //             label: {
      //               normal: {
      //                 show: true,
      //                 formatter: function(params) {
      //                   return params.value;
      //                 }
      //               }
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         type: "radar",
      //         tooltip: {
      //           trigger: "item"
      //         },
      //         itemStyle: {
      //           normal: {}
      //         },
      //         data: [
      //           {
      //             value: [60, 73, 85, 40, 70, 60],
      //             label: {
      //               normal: {
      //                 show: true,
      //                 formatter: function(params) {
      //                   return params.value;
      //                 }
      //               }
      //             }
      //           }
      //         ]
      //       }
      //     ]
      //   });
      // {
      //               "infoId": 1010,
      //               "infoName": "信息化建设"
      //           },
      //           {
      //               "infoId": 1020,
      //               "infoName": "精益生产"
      //           },
      //           {
      //               "infoId":1030,
      //               "infoName": "财务一体化"
      //           },
      //           {
      //               "infoId": 1040,
      //               "infoName": "数字化运营"
      //           },
      //           {
      //               "infoId": 1050,
      //               "infoName": "精准营销"
      //           }
      myChartx.setOption({
        title: {
          text: "提案可信度"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          x: "center"
        },
        radar: [
          {
            indicator: [
              { name: "信息化建设", max: 10 },
              { name: "精益生产", max: 10 },
              { name: "财务一体化", max: 10 },
              { name: "数字化运营", max: 10 },
              { name: "精准营销", max: 10 },
            ],

            radius: 90,
            startAngle: 90,
            splitNumber: 4,
            name: {
              formatter: "{value}",
              textStyle: {
                color: "#72ACD1",
                fontSize: "10"
              }
            },
            splitArea: {
              areaStyle: {
                color: [
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)"
                ],
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.5)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.8)"
              }
            }
          },
          {
           
            radius: 90,
            startAngle: 90,
            splitNumber: 4,
            name: {
              formatter: "{value}",
              textStyle: {
                color: "#72ACD1",
                fontSize: "10"
              }
            },
            splitArea: {
              areaStyle: {
                color: [
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)"
                ],
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.5)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.8)"
              }
            }
          }
        ],
        series: [
          {
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            itemStyle: {
              normal: {
                //areaStyle: { type: "default" }
              }
            },
            data: [
              {
                //value: [60, 73, 85, 40, 70, 60],
                value: that.list,
                label: {
                  normal: {
                    show: true,
                    formatter: function(params) {
                      return params.value;
                    }
                  }
                }
              }
            ]
          },
          {
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            itemStyle: {
              normal: {}
            },
            data: [
              {
                value: [60, 73, 85, 40, 70, 60],

                label: {
                  normal: {
                    show: true,
                    formatter: function(params) {
                      return params.value;
                    }
                  }
                }
              }
            ]
          }
        ]
      });
      myChart.setOption({
        title: {
          text: "评审可信度"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          x: "center"
        },
        radar: [
          {
            indicator: [
             { name: "信息化建设", max: 10 },
              { name: "精益生产", max: 10 },
              { name: "财务一体化", max: 10 },
              { name: "数字化运营", max: 10 },
              { name: "精准营销", max: 10 },
            ],

            radius: 90,
            startAngle: 90,
            splitNumber: 4,
            name: {
              formatter: "{value}",
              textStyle: {
                color: "#72ACD1",
                fontSize: "10"
              }
            },
            splitArea: {
              areaStyle: {
                color: [
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)"
                ],
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.5)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.8)"
              }
            }
          },
          {
            // indicator: [
            //   { name: "探索学习能力", max: 10 },
            //   { name: "积极人格\n与价值观", max: 10 },
            //   { name: "沟通合作\n能力", max: 10 },
            //   { name: "科技实践能力", max: 10 },
            //   { name: "创意革新能力", max: 10 },
            //   { name: "思考与问题\n解决能力", max: 10 }
            // ],

            radius: 90,
            startAngle: 90,
            splitNumber: 4,
            name: {
              formatter: "{value}",
              textStyle: {
                color: "#72ACD1",
                fontSize: "10"
              }
            },
            splitArea: {
              areaStyle: {
                color: [
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)",
                  "rgba(114, 172, 209, 0.3)"
                ],
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.5)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.8)"
              }
            }
          }
        ],
        series: [
          {
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            itemStyle: {
              normal: {}
            },
            data: [
              {
                value: that.list,

                label: {
                  normal: {
                    show: true,
                    formatter: function(params) {
                      return params.value;
                    }
                  }
                }
              }
            ]
          },
          {
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            itemStyle: {
              normal: {}
            },
            data: [
              {
                value: [60, 73, 85, 40, 70, 60],

                label: {
                  normal: {
                    show: true,
                    formatter: function(params) {
                      return params.value;
                    }
                  }
                }
              }
            ]
          }
        ]
      });
    }
  }
};
</script>
<style lang="less">
</style>

