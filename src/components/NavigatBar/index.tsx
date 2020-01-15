/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { AtIcon } from 'taro-ui'

import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  onClick(): void;
};

interface NavigatBar {
  props: ComponentsProps;
  state: StateType;
}

class NavigatBar extends Component {
  static defaultProps: ComponentsProps = {
    onClick: () => { }
  }

  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,

  };

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() { }

  componentWillReact() { }

  render() {
    const { onClick } = this.props
    return (
      <View className='chevron' onClick={() => onClick()}>
        <AtIcon value='chevron-left' size='30' color='#FFF'></AtIcon>
      </View>
    )
  }
}

export default NavigatBar;
