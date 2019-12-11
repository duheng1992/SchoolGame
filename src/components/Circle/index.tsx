import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  status: 0 | 1 | 2; // 0进行中  ; 1 成功 ;  2 失败
};

interface Arrow {
  props: ComponentsProps;
  state: StateType;
}

class Arrow extends Component {
  static defaultProps: ComponentsProps = {
    status: 2,
  };

  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,
  };

  render() {
    const { status } = this.props;
    return <View className={`circleWrapper status_${status}`}></View>;
  }
}

export default Arrow;
