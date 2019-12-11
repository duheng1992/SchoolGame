import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { cheng, black_bg, cheng_ce } from "@/images/load";
import { AtButton } from "taro-ui";
import Circle from "@/components/Circle";

import "./public.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  onRebinding: Function;
};

interface BindFall {
  props: ComponentsProps;
  state: StateType;
}

class BindFall extends Component {
  static defaultProps = {};

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

  rebinding = () => {
    this.props.onRebinding();
  };

  render() {
    return (
      <View
        className="wrapper BindFall"
        style={{ backgroundImage: `url(${black_bg})` }}
      >
        <Image className="cheng" mode="widthFix" src={cheng} />;
        <View className="footer">
          <View className="loding">
            <Circle status={2} />
          </View>
          <View className="statusStr">
            <View className="title-label">Oops</View>
            <View className="title-val">未发现随心秤</View>
          </View>
          <Image className="cheng_ce" mode="widthFix" src={cheng_ce} />
          <AtButton type="primary" className="nextBtn" onClick={this.rebinding}>
            重新绑定
          </AtButton>
        </View>
      </View>
    );
  }
}

export default BindFall;
