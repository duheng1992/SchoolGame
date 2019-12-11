/* eslint-disable no-unused-expressions */
import Taro, { Component } from "@tarojs/taro";
import * as echarts from "../ec-canvas/echarts";

function setChartData(chart, data) {
  const option = {
    animation: false,
    xAxis: [
      {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        show: false,
      },
    ],
    yAxis: [
      {
        type: "value",
        show: false,
      },
    ],
    series: [
      {
        type: "line",
        name: "访问来源",
        smooth: true,
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        itemStyle: {
          normal: {
            color: "#769082",
          },
        },
        markPoint: {
          symbol: "pin",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "red", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "blue", // 100% 处的颜色
                },
              ],
            },
          },

          label: {
            color: "#627D6B",
          },
          data: [
            {
              value: "13%",
              xAxis: "周一",
              yAxis: 820,
            },
            {
              value: "13%",
              xAxis: "周二",
              yAxis: 932,
            },
            {
              value: "13%",
              xAxis: "周三",
              yAxis: 901,
            },
            {
              value: "13%",
              xAxis: "周四",
              yAxis: 934,
            },
          ],
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#dfe5e2",
              },
              {
                offset: 1,
                color: "#ffffff",
              },
            ]),
          },
        },
      },
      {
        type: "line",
        data: [],
        itemStyle: {
          normal: {
            color: "#41403F",
          },
        },
        markPoint: {
          data: [
            {
              value: "13%",
              xAxis: "周日",
              yAxis: 1320,
            },
          ],
        },
      },
    ],
  };

  chart.setOption(option);
}

export default class FatLine extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    ec: {
      lazyLoad: true,
    },
  };

  config = {
    usingComponents: {
      "ec-canvas": "../ec-canvas/ec-canvas",
    },
  };

  Chart;

  refresh(data) {
    setTimeout(() => {
      this.init_echarts(data);
    }, 200);
  }

  init_echarts = (data) => {
    const _this = this;
    this.Chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width,
        height,
      });
      setChartData(chart, data);
      return chart;
    });
  };

  render() {
    return (
      <ec-canvas
        ref={(node) => {
          this.Chart = node;
        }}
        canvas-id="mychart-area"
        ec={this.state.ec}
      />
    );
  }
}
