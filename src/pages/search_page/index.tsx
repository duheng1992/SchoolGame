/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { AtSearchBar } from 'taro-ui'
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
    value: ''
  };

  componentWillMount() {
    console.log(this.$router.params)
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {

  }

  componentWillReact() { }
  onInputChange = val => {
    console.log('val', val)
  }
  onActionClick = () => {
    console.log('开始搜索')
  }

  render() {

    return (
      <View className="page" id="page">
        <AtSearchBar
          value={this.state.value}
          onChange={(e) => this.onInputChange(e)}
          onActionClick={() => this.onActionClick()}
        />
      </View>
    );
  }
}

export default _page;
