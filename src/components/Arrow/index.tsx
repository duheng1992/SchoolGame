/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { Image } from "@tarojs/components";
import { arrow } from "@/images/load";

import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  color: "black" | "gary" | "red" | "white";
  [propName: string]: any;
};

interface Arrow {
  props: ComponentsProps;
  state: StateType;
}

class Arrow extends Component {
  static defaultProps: ComponentsProps = {
    color: "black",
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
    const { color } = this.props;
    return <Image className="wrapper" mode="widthFix" src={arrow[color]} />;
  }
}

export default Arrow;
