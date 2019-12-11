import Taro, { Component } from "@tarojs/taro";
import * as echarts from "@/components/ec-canvas/echarts";
import { View } from "@tarojs/components";
import { log } from "util";

function setChartData({ that, chart, data }) {
  const xAxis = data.xAxis;
  const series = data.series;

  that.props.onChange({
    time: xAxis[xAxis.length - 1],
    value: series[series.length - 1],
  });
  let timer = null;
  const option = {
    color: ["#ffffff"],
    showContent: false,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
      showContent: true,
      hideDelay: 0,
      triggerOn: "mousemove",
      backgroundColor: "rgba(0,0,0,0)",
      position: [0, 0],
      formatter: (e) => {
        //在这里绑定事件
        clearTimeout(timer);
        timer = setTimeout(() => {
          const obj = e[0];
          that.props.onChange({
            time: obj.name,
            value: obj.value,
          });
        }, 200);
        return "";
      },
    },
    xAxis: [
      {
        type: "category",
        data: xAxis,
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
        data: series,
        type: "line",
        smooth: true,
      },
    ],
  };
  chart.setOption(option);
}

export default class LineChart extends Component {
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

  refresh(data) {
    if (data) {
      setTimeout(() => {
        this.init_echarts(data);
      }, 200);
    }
  }

  init_echarts = (data) => {
    const _this = this;
    this.Chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width,
        height,
      });
      setChartData({
        that: _this,
        chart,
        data,
      });
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
