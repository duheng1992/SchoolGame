import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";

import { getStore } from "@/utils/utils";

import { AtList, AtListItem,AtAvatar  } from "taro-ui";
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

import { observer, inject } from "@tarojs/mobx";

@inject("tabBarStore")
@observer
class _page extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {
  };

  componentWillMount() {}

  componentDidMount() {}

  componentDidShow() {
    const { tabBarStore } = this.props;
    tabBarStore.setIndex(1);
    const _this = this;
    const token = getStore("userToken");
  }
  componentWillReact() {}

  config: Config = {
    navigationBarBackgroundColor: "#FFFFFF",
  };



  render() {

    return (
      <View>
        <View>
          <AtAvatar circle image='https://jdc.jd.com/img/200'></AtAvatar>
        </View>
        <View>
             <AtList>
            <AtListItem title="123" arrow='right' />
            <AtListItem title="123" arrow='right' />
            <AtListItem title="123" arrow='right' />
            <AtListItem title="123" arrow='right' />
            <AtListItem title='标题文字' arrow='right' />
          </AtList>
        </View>
       
      </View>
    );
  }
}

export default _page;
