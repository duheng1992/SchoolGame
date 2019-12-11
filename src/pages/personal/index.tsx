import Taro, { Component, Config } from "@tarojs/taro";
import { View, Navigator } from "@tarojs/components";

import Avatar from "@/components/Avatar";
import Arrow from "@/components/Arrow";
import { getUserInfo } from "@/api/login";
import { getStore } from "@/utils/utils";

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
  constructor(props) {
    super(props);
  }

  state: StateType = {};

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {
    const { tabBarStore } = this.props;
    tabBarStore.setIndex(1);
    const _this = this;
    const token = getStore("userToken");
    if (token) {
      getUserInfo().then((res) => {
        _this.setState({
          userInfo: res.data,
        });
      });
    }
  }

  componentWillReact() {}

  config: Config = {
    navigationBarBackgroundColor: "#F0E8DF",
  };

  goToEdit = () => {
    const { userInfo } = this.state;
    if (userInfo) {
      Taro.navigateTo({
        url: "/pages/edit_userinfo/index",
      });
    } else {
      Taro.navigateTo({
        url: "/pages/login/index",
      });
    }
  };

  goToSet = () => {
    const { userInfo } = this.state;
    if (userInfo) {
      Taro.navigateTo({
        url: "/pages/manage/index",
      });
    } else {
      Taro.navigateTo({
        url: "/pages/login/index",
      });
    }
  };

  equipment = () => {
    // 连接到客户的下单页面 , 具体是什么问韩婉瑶
    console.info("了解设备");
  };

  render() {
    const { userInfo } = this.state;
    if (userInfo) {
      //
    } else {
      return "";
    }

    const { nickName = "" } = userInfo;

    return (
      <View className="page">
        <View className="userDeatil">
          <View className="userStr">
            <View className="userName">
              Hello{nickName ? `,${nickName}` : nickName}
            </View>
            <View className="goEditData" onClick={this.goToEdit}>
              {userInfo ? "个人资料修改" : "立即登录"}
              <Arrow color="red" />
            </View>
          </View>
          <Avatar />
        </View>

        <View className="contentWrapper">
          <View className="block">
            <View className="title">我的荣誉勋章</View>
          </View>
          <View className="block">
            <View className="title">体重目标</View>
          </View>
        </View>

        <View className="linkList">
          <View className="item item_1">
            <Navigator url="/pages/sheep/index" className="cont">
              数羊助眠
              <Arrow color="black" />
            </Navigator>
          </View>
          <View className="item item_2">
            <View className="cont" onClick={this.equipment}>
              了解设备
              <Arrow color="black" />
            </View>
          </View>
          <View className="item item_3">
            <View className="cont" onClick={this.goToSet}>
              设置
              <Arrow color="black" />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default _page;
