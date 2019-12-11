import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { tarn_bg, cheng_ce } from "@/images/load";
import Weight from "@/components/Weight";
import Circle from "@/components/Circle";

import "./public.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  weight: number;
};

interface Succeed {
  props: ComponentsProps;
  state: StateType;
}

class Succeed extends Component {
  static defaultProps = {
    weight: 0,
  };

  constructor(props) {
    super(props);
  }

  state: StateType = {};

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {}

  componentWillReact() {}

  goHome = () => {
    Taro.reLaunch({
      url: "/pages/home/index",
    });
  };

  render() {
    const { weight } = this.props;
    return (
      <View
        className="wrapper Succeed"
        style={{ backgroundImage: `url(${tarn_bg})` }}
      >
        <Weight num={weight} />
        <View className="footer">
          <View className="loding">
            <Circle status={1} />
          </View>
          <View className="statusStr">
            <View className="title-label">测量成功</View>
            <View className="title-val">已生成身体成分数据报告</View>
          </View>
          <Image className="cheng_ce" mode="widthFix" src={cheng_ce} />
          <View className="goHomeBtn" onClick={this.goHome}>
            去查看
          </View>
        </View>
      </View>
    );
  }
}

export default Succeed;
