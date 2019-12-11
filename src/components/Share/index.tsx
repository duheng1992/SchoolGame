/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "./index.scss";

import { share } from "@/images/load";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  size?: "large" | "normal" | "small";
};

interface Share {
  props: ComponentsProps;
  state: StateType;
}

class Share extends Component {
  static defaultProps: ComponentsProps = {
    size: "normal",
  };

  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {}

  componentWillReact() {}

  goNext = (e) => {
    const { url } = e.currentTarget.dataset;
    Taro.navigateTo({
      url,
    });
  };

  render() {
    return (
      <View className="wrapper">
        <Image
          data-url="/pages/sheep/index"
          className="icon"
          onClick={this.goNext}
          mode="widthFix"
          src={share.sheep}
        />
        <Image
          data-url="/pages/share_my/index"
          className="icon"
          onClick={this.goNext}
          mode="widthFix"
          src={share.share}
        />
      </View>
    );
  }
}

export default Share;
