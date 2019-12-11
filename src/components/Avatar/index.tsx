/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { user_img } from "@/images/load";

import "./index.scss";

import { AtAvatar } from "taro-ui";
import { getStore } from "@/utils/utils";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  size?: "large" | "normal" | "small";
  src?: string;
};

interface Avatar {
  props: ComponentsProps;
  state: StateType;
}

class Avatar extends Component {
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

  render() {
    const { size, src } = this.props;
    let userIcon = src;
    if (userIcon) {
      //
    } else {
      const { avatarUrl } = getStore("userInfo");
      userIcon = avatarUrl;
    }
    if (userIcon) {
      //
    } else {
      userIcon = user_img;
    }
    return (
      <View className="wrapper">
        <AtAvatar size={size} circle image={userIcon} />
      </View>
    );
  }
}

export default Avatar;
