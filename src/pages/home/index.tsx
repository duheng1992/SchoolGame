import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import Weight from "@/components/Weight";
import BodyReport from "@/components/BodyReport";

import { getStore } from "@/utils/utils";

import { homeBg } from "@/images/load";

import { getUserInfo } from "@/api/login";

import { getEquipmentList } from "@/api/equipment";

import Arrow from "@/components/Arrow";

import "./index.scss";

import Share from "@/components/Share";

import { getHomeData } from "@/api/detail";

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
    // token,
    userInfo: "",
    isShow: false,
    titleBoxH: 420,
    pageBoxH: 724,
    equipmentList: [],
    homeData: "",
    equipmentId: "2",
  };

  componentWillMount() {}

  componentDidMount() {}

  componentDidShow() {
    const { tabBarStore } = this.props;
    tabBarStore.setIndex(0);
    const _this = this;
    const token = getStore("userToken");
    if (token) {
      getUserInfo().then((res) => {
        _this.setState(
          {
            userInfo: res.data,
          },
          () => {
            _this.setStyle();
            _this.getEquipmentList();
            _this.getHomeData();
          },
        );
      });
    } else {
      _this.setStyle();
    }
  }

  getHomeData = () => {
    const _this = this;
    const { equipmentId } = this.state;
    getHomeData({ equipmentId }).then((res) => {
      if (res.data) {
        _this.setState({
          homeData: res.data,
        });
      }
    });
  };

  getEquipmentList = () => {
    const _this = this;
    getEquipmentList().then((res: any) => {
      if (res.code === "OK") {
        _this.setState({
          equipmentList: res.data,
        });
      }
    });
  };

  setStyle = () => {
    const _this = this;
    setTimeout(() => {
      const titleBox = Taro.createSelectorQuery();
      titleBox.select("#titleBox").boundingClientRect();
      titleBox.selectViewport().scrollOffset();
      titleBox.exec(function(res) {
        _this.setState({
          titleBoxH: Math.ceil(res[0].height),
        });
      });
      const pageBox = Taro.createSelectorQuery();
      pageBox.select("#pageBox").boundingClientRect();
      pageBox.selectViewport().scrollOffset();
      pageBox.exec(function(res) {
        _this.setState({
          pageBoxH: Math.ceil(res[0].height),
        });
      });
    }, 200);
  };

  componentWillReact() {}

  config: Config = {
    navigationBarBackgroundColor: "#627D6B",
  };

  unfold = () => {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow,
    });
  };

  goToLogin = () => {
    Taro.navigateTo({
      url: "/pages/login/index",
    });
  };

  goToBind = () => {
    Taro.reLaunch({
      url: "/pages/binding/index",
    });
  };

  goToDetail = (item) => {
    const { homeData } = this.state;
    const token = getStore("userToken");
    if (token) {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${homeData.id}&fie=${item.name}`,
      });
    } else {
      this.goToLogin();
    }
  };

  rend_style = () => {
    const { isShow, pageBoxH, titleBoxH } = this.state;
    let style = {};
    if (isShow) {
      style = {
        height: "90vh",
        top: "10vh",
      };
    } else {
      if (pageBoxH && titleBoxH) {
        style = {
          height: `${pageBoxH - titleBoxH}px`,
          top: `${titleBoxH + 40}px`,
        };
      } else {
        style = {
          height: "304px",
          top: "460px",
        };
      }
    }
    return style;
  };

  goToSet = () => {
    console.log("去设置目标");
  };

  render() {
    const { userInfo, equipmentList, homeData } = this.state;

    const style = this.rend_style();

    return (
      <View>
        <Image className="pageBg" mode="widthFix" src={homeBg} />
        <View className="pageBox" id="pageBox">
          <View className="titleBox" id="titleBox">
            <Weight num={49} />
            <View className="strBox">
              {!userInfo && (
                <View className="more" onClick={this.goToLogin}>
                  登录后，查看更多精彩 <Arrow color="white" />
                </View>
              )}
              {!equipmentList.length && userInfo && (
                <View className="more" onClick={this.goToBind}>
                  绑定你的随心秤 <Arrow color="white" />
                </View>
              )}
              {!homeData.targetWeight && equipmentList.length && (
                <View className="more" onClick={this.goToSet}>
                  来设定一个目标吧 <Arrow color="white" />
                </View>
              )}
              {/* <View className="data">
                <View className="str1">还需增肌</View>
                <View className="str2">3KG</View>
                <View className="str3">以达到你的目标体重48KG</View>
              </View> */}
            </View>
          </View>
          <View className="contentBox" style={style}>
            <View className="topContent">
              <View className="lineBox" onClick={this.unfold}>
                <View className="line"></View>
              </View>
              {userInfo && (
                <View className="userName">{userInfo.nickName}</View>
              )}
            </View>
            <ScrollView className="scrollBox" scrollY>
              <BodyReport data={homeData} click={this.goToDetail} />
            </ScrollView>
          </View>

          <Share />
        </View>
      </View>
    );
  }
}

export default _page;
