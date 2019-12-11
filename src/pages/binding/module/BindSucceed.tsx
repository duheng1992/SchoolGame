import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { cheng, tarn_bg, cheng_ce } from "@/images/load";
import { AtButton } from "taro-ui";
import Circle from "@/components/Circle";

import "./public.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  measureStatus: 0 | 1 | 2; //0 : 正在测量  1 :成功  ; 2: 失败
  onResetMeasure: Function;
};

interface BindSucceed {
  props: ComponentsProps;
  state: StateType;
}

class BindSucceed extends Component {
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

  reMeasure = () => {
    this.props.onResetMeasure();
  };

  render() {
    const { measureStatus } = this.props;
    let btnStr = "正在测量";
    let title = "请勿关闭此页面";
    let titleVal = "绑定成功，测量中...";

    if (measureStatus === 1) {
      btnStr = "测量成功...";
    } else if (measureStatus === 2) {
      btnStr = "测量失败，请重新测量";
      title = "Oops";
      titleVal = "好像发生了一点问题";
    }

    return (
      <View
        className="wrapper BindSucceed"
        style={{ backgroundImage: `url(${tarn_bg})` }}
      >
        <View className="chengBox">
          <Image className="cheng" mode="widthFix" src={cheng} />;
        </View>
        <View className="footer">
          <View className="loding">
            <Circle status={0} />
          </View>
          <View className="statusStr">
            <View className="title-label">{title}</View>
            <View className="title-val">{titleVal}</View>
          </View>
          <Image className="cheng_ce" mode="widthFix" src={cheng_ce} />
          <AtButton
            type="primary"
            className="nextBtn"
            disabled={measureStatus === 0}
            onClick={this.reMeasure}
          >
            {btnStr}
          </AtButton>
        </View>
      </View>
    );
  }
}

export default BindSucceed;
