import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { cheng, tarn_bg, cheng_ce } from "@/images/load";
import { AtButton } from "taro-ui";
import "./public.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  onStartBind: Function;
};

interface StepView {
  props: ComponentsProps;
  state: StateType;
}

class StepView extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {
    step: 1,
    btnStr: "我知道了，下一条",
    loading: false,
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {}

  componentWillReact() {}

  //下一步
  next = () => {
    const { step } = this.state;
    if (step === 1) {
      this.setState({
        step: 2,
        btnStr: "开始绑定并测量",
      });
    } else {
      this.start();
    }
  };

  start = () => {
    this.props.onStartBind();
    this.setState({
      loading: true,
    });
  };

  render() {
    const { step, btnStr, loading } = this.state;

    return (
      <View
        className="wrapper StepView"
        style={{ backgroundImage: `url(${tarn_bg})` }}
      >
        <Image className="cheng" mode="widthFix" src={cheng} />

        <View className="footer">
          <View className={`swper ${step === 2 ? "step2" : ""}`}>
            <View className="swper-item">
              <View className="stepStr">1/2</View>
              <View className="statusStr">
                <View className="title-label">为避免测量产生误差</View>
                <View className="title-val">请将秤放在平坦的地面上</View>
              </View>
            </View>
            <View className="swper-item">
              <View className="stepStr">2/2</View>
              <View className="statusStr">
                <View className="title-label">
                  请确保电池电量充足并安装正确
                </View>
                <View className="title-val">并站到秤上开始测量</View>
              </View>
            </View>
          </View>

          <Image className="cheng_ce" mode="widthFix" src={cheng_ce} />
          <AtButton
            type="primary"
            className="nextBtn"
            onClick={this.next}
            loading={loading}
          >
            {btnStr}
          </AtButton>
        </View>
      </View>
    );
  }
}

export default StepView;
