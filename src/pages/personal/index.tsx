import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import GetUserInfo from "@/components/GetUserInfo";
import { getUserInfo, wx_login, setUserInfo } from "@/api/login";
import { clearUserInfo, setStore, getStore } from "@/utils/utils";
import { getUserBaseInfo } from "@/api/personal";
import { AtList, AtListItem, AtAvatar, AtToast, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtButton } from "taro-ui";
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
import defaultAvatar from "@/images/card/default_user.png";

@inject("tabBarStore")
@observer
class _page extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {
    userInfo: {
      nickName: null,
      avatarUrl: defaultAvatar,

    },
    isToastOpened: false,
    toastText: "请先登录",
    isFocusPublic: false,
  };

  componentWillMount() { }

  componentDidMount() {
    const _this = this;
    const token = getStore("userToken");
    if (token) {
      const userInfo = getStore("userInfo");
      this.setState({ userInfo });

    }
  }

  componentDidShow() {
    const { tabBarStore } = this.props;
    tabBarStore.setIndex(1);

  }

  componentWillReact() { }


  goToEdit = () => {
    const { userInfo } = this.state;
    if (userInfo) {
      Taro.navigateTo({
        url: "/pages/edit_userinfo/index",
      });
    }
  };

  goToNav = (url: string) => {
    // const { userInfo } = this.state;
    // const token = getStore("userToken");
    Taro.navigateTo({
      url,
    });
    // if (token) {
    //   Taro.navigateTo({
    //     url: url,
    //   });
    // } else {
    //   this.setState({ isToastOpened: true })
    // }

  }


  getUserInfo = (e) => {
    //每次操作记录一次时间点
    const _this = this;
    const nowTime = new Date().getTime();
    setStore("getUserInfo_time", nowTime);
    if (e.detail.userInfo) {
      wx_login(e).then(() => {
        console.log("wxuser", e.detail.userInfo);
        const { avatarUrl, gender, nickName } = e.detail.userInfo;
        this.setState({
          userInfo: {
            avatarUrl,
            nickName,
          },
        }, () => {
          setStore("userInfo", this.state.userInfo);
        });

      });
    } else {
      clearUserInfo();

    }
  };

  Toast = () => {
    Taro.showToast({
      title: "功能暂未开放",
      icon: "none",
    });

  }

  userInfo = () => {
    const token = getStore("userToken");
    if (token) {
      Taro.navigateTo({
        url: "/pages/personal/userinfo",
      });
    } else {
      Taro.showToast({
        title: "请登录",
        icon: "none",
      });
    }

  }

  dynamic = () => {
    Taro.navigateTo({
      url: "/pages/dynamic_page/index",
    });
  }

  focus = () => {
    Taro.navigateTo({
      url: "/pages/focus_page/index",
    });
  }

  entered = () => {
    Taro.navigateTo({
      url: "/pages/entered_page/index",
    });
  }


  render() {
    const { userInfo, isToastOpened, toastText, isFocusPublic } = this.state;
    const { avatarUrl, nickName } = userInfo;
    console.log("userInfo", userInfo);
    // if (userInfo) {
    //   //
    // } else {
    //   return "";
    // }

    return (
      <View>
        <ScrollView scrollY scrollTop={0} className="personalPage">
          <View className="userDeatil">

            <GetUserInfo
              getUserInfo={(e) => {
                return this.getUserInfo(e);
              }}
              my-class="loginBtnBox"
            >

              <AtAvatar circle size="large" image={avatarUrl}></AtAvatar>
              <View className="goEditData" >
                {nickName ? `${nickName}` : "立即登录"}
              </View>
            </GetUserInfo>

          </View>
          <View className="listPadding">
            <AtList hasBorder={false}>
              <AtListItem hasBorder={false} title="我的动态" onClick={() => {
                return this.dynamic();
              }} arrow="right"
              />
              <AtListItem hasBorder={false} title="我的关注" onClick={() => {
                return this.focus();
              }} arrow="right"
              />
              <AtListItem hasBorder={false} title="已报活动" onClick={() => {
                return this.entered();
              }} arrow="right"
              />
            </AtList>
          </View>
          <View className="listPadding">
            <AtList hasBorder={false}>
              <AtListItem hasBorder={false} title="信息档案" onClick={() => {
                return this.userInfo();
              }} arrow="right"
              />
              <AtListItem hasBorder={false} title="发布直播" onClick={() => {
                return this.Toast();
              }} arrow="right"
              />
            </AtList>
          </View>
          <View className="listPadding">
            <AtList hasBorder={false}>
              <AtListItem hasBorder={false} title="关注服务号，接受活动提醒" onClick={() => {
                return this.setState({ isFocusPublic: true });
              }} arrow="right"
              />
              <AtListItem hasBorder={false} onClick={() => {
                return this.goToNav("/pages/personal/about/index");
              }} title="关于活力校园" arrow="right"
              />
            </AtList>

          </View>
          {/* <AtToast isOpened={isToastOpened} text={toastText} duration={2000} icon="close"></AtToast> */}
          <AtModal isOpened={isFocusPublic}>
            <AtModalHeader>关注公众号，获取更多消息提醒</AtModalHeader>
            <AtModalContent>
              <View className="toastContent">
                关注<View className="fontColor">[ 活力校园ActiveSchools ]</View>公众号，可获取更多关于活动的通知消息。点击关注按钮后回复<View className="fontColor">[ 1 ]</View>，获取公众号二维码，长按关注

              </View>
            </AtModalContent>
            <AtModalAction> <AtButton circle openType="contact" className="btn_style">关注</AtButton></AtModalAction>
          </AtModal>
        </ScrollView>
      </View>


    );
  }
}

export default _page;
