import Taro, { Component, Config } from "@tarojs/taro";
import { View, Picker, Text } from "@tarojs/components";
import { AtFloatLayout } from "taro-ui";
import CircleLoding from "@/components/CircleLoding";
import "./index.scss";

import WeightLine from "@/components/Echart/WeightLine";
import FatLine from "@/components/Echart/FatLine";

type StateType = {
  [propName: string]: any;
};

interface _page {
  state: StateType;
}

class _page extends Component {
  constructor(props) {
    super(props);
    // const token = getStore('userToken');
  }

  state: StateType = {
    // token,
    isOpened: false,
    num: 0,
    dateSel: "2018-04-22",
  };

  componentWillMount() {}

  componentDidMount() {
    const chartData = {};
    if (this.refWeightLine) {
      this.refWeightLine.refresh(chartData);
    }
    if (this.refFatLine) {
      this.refFatLine.refresh(chartData);
    }
  }

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {
    const { num } = this.state;
    let count = num;
    let a = true;
    function add() {
      count += 1;
      if (count > 99) {
        a = !a;
      }
    }

    function pdd() {
      count -= 1;
      if (count < 1) {
        a = !a;
      }
    }
    setInterval(() => {
      if (a) {
        add();
      } else {
        pdd();
      }

      this.setState({
        num: count,
      });
    }, 100);
  }

  config: Config = {
    navigationBarBackgroundColor: "#F0E8DF",
  };

  handleClose = () => {};

  showMoudle = (e) => {
    this.setState({
      isOpened: true,
    });
  };

  refWeightLine;

  refFatLine;

  onDateChange = (e) => {
    this.setState({
      dateSel: e.detail.value,
    });
  };

  render() {
    const { num } = this.state;
    // console.log(num);
    return (
      <View className="page">
        <View>环形进度条</View>
        <CircleLoding num={num} />
        <View onClick={this.showMoudle}>展示浮动弹层</View>
        <AtFloatLayout
          className="FloatLayout"
          isOpened={this.state.isOpened}
          onClose={this.handleClose.bind(this)}
        >
          这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
        </AtFloatLayout>
        <View>体重曲线</View>
        <View className="line-chart">
          <WeightLine
            ref={(node) => {
              this.refWeightLine = node;
            }}
          />
        </View>
        <View>体脂概率</View>
        <View className="line-chart2">
          <FatLine
            ref={(node) => {
              this.refFatLine = node;
            }}
          />
        </View>
      </View>
    );
  }
}

export default _page;
