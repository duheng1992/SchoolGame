import Taro, { Component } from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import { cheng, black_bg } from "@/images/load";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";
import "./public.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  [propName: string]: any;
};

interface Bluetooth {
  props: ComponentsProps;
  state: StateType;
}

class Bluetooth extends Component {
  static defaultProps: ComponentsProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {
    isOpened: false,
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {}

  componentWillReact() {}

  gotoHome = () => {
    Taro.reLaunch({
      url: "/pages/home/index",
    });
  };

  openBluetooth = () => {
    this.setState({
      isOpened: true,
    });
  };

  closeModal = () => {
    this.setState({
      isOpened: false,
    });
  };

  render() {
    const { isOpened } = this.state;
    return (
      <View
        className="wrapper Bluetooth"
        style={{ backgroundImage: `url(${black_bg})` }}
      >
        <View className="title">绑定小卷随心秤S1</View>
        <Image className="cheng" mode="widthFix" src={cheng} />;
        <View className="footer">
          <View className="statusStr">
            <View className="title-label">检测到你的手机</View>
            <View className="title-val">尚未开启蓝牙</View>
          </View>
          <View className="BtnBox">
            <View className="btn black" onClick={this.gotoHome}>
              放弃绑定
            </View>
            <View className="btn green" onClick={this.openBluetooth}>
              立即开启
            </View>
          </View>
        </View>
        <AtModal isOpened={isOpened}>
          <AtModalHeader>连接</AtModalHeader>
          <AtModalContent>
            要连接 小卷随心秤S1，请确保您的手机已打开蓝牙。
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.closeModal}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    );
  }
}

export default Bluetooth;
