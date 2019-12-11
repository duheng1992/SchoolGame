/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";

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
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {}

  componentWillReact() {}

  config: Config = {
    navigationBarBackgroundColor: "#F0E8DF",
  };

  goToNext = () => {
    Taro.navigateTo({
      url: "/pages/xxx/xxxx",
    });
  };

  render() {
    return (
      <View className="page">
        <View>这里是demo</View>
      </View>
    );
  }
}

export default _page;
