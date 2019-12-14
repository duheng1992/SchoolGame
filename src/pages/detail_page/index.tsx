/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
// import "./index.scss";

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
  };

  componentWillMount() {
    console.log(this.$router.params)
  }

  componentDidMount() {

  }

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {
   
  }

  componentWillReact() {}

  render() {

    return (
      <View className="page" id="page">
          xiangqing
</View>
    );
  }
}

export default _page;
