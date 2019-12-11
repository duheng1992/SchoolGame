/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "./index.scss";
import { getUserInfo } from "@/api/login";

import { cheng } from "@/images/load";

import Arrow from "@/components/Arrow";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  [propName: string]: any;
};

interface _page {
  props: ComponentsProps;
  state: StateType;
}

class _page extends Component {
  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,
    userInfo: {},
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {
    const _this = this;
    getUserInfo().then((res) => {
      const userInfo = res.data;
      _this.setState(userInfo);
    });
  }

  componentWillReact() {}

  config: Config = {
    navigationBarBackgroundColor: "#d6dbdf",
  };

  bindingFun = () => {
    Taro.reLaunch({
      url: "/pages/binding/index",
    });
  };

  noDataFun = () => {
    Taro.reLaunch({
      url: "/pages/home/index",
    });
  };

  render() {
    return (
      <View className="page">
        <View className="titleBox">
          <View>Hello, NONO</View>
          <View className="blod">请绑定羊哎科技智能设备</View>
        </View>
        <View className="content">
          <View className="title">小卷随心秤S1</View>
          <Image className="icon" mode="widthFix" src={cheng} />
          <View className="foot" onClick={this.bindingFun}>
            尚未绑定，立即绑定
          </View>
        </View>
        <View className="footer shadow">
          <View className="noData" onClick={this.noDataFun}>
            尚未拥有羊哎科技智能设备
            <Arrow color="black" />
          </View>
        </View>
      </View>
    );
  }
}

export default _page;
