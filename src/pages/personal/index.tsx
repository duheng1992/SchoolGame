import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import GetUserInfo from "@/components/GetUserInfo";
import { getUserInfo, wx_login, setUserInfo } from "@/api/login";
import { clearUserInfo, setStore, getStore } from "@/utils/utils";

import { AtList, AtListItem, AtAvatar, AtToast } from "taro-ui";
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
    userInfo: {
      nickName: '',

    },
    isToastOpened: false,
    toastText: '请先登录'
  };

  componentWillMount() { }

  componentDidMount() { }

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
  componentWillReact() { }

  config: Config = {
    navigationBarBackgroundColor: "#FFFFFF",
  };

  goToEdit = () => {
    const { userInfo } = this.state;
    if (userInfo) {
      Taro.navigateTo({
        url: "/pages/edit_userinfo/index",
      });
    } else {

    }
  };
  goToNav = (url: string) => {
    const { userInfo } = this.state;
    if (userInfo.id) {
      Taro.navigateTo({
        url: url,
      });
    } else {
      this.setState({ isToastOpened: true })
    }

  }


  getUserInfo = (e) => {
    //每次操作记录一次时间点
    const _this = this;
    const nowTime = new Date().getTime();
    setStore("getUserInfo_time", nowTime);
    if (e.detail.userInfo) {
      wx_login(e).then(() => {
        const { avatarUrl, gender, nickName } = e.detail.userInfo;
        setUserInfo({
          avatarImage: {
            title: nickName,
            url: avatarUrl,
          },
          gender,
          nickName,
        });
        getUserInfo().then((res: any) => {
          if (res.code === "OK") {
            const data = res.data;
            if (data.birthday && data.gender && data.height) {

            } else {

            }
          }
        });
      });
    } else {
      clearUserInfo();

    }
  };



  render() {
    const { userInfo, isToastOpened, toastText } = this.state;
    // if (userInfo) {
    //   //
    // } else {
    //   return "";
    // }

    const { nickName } = userInfo;

    return (
      <View className="personalPage">
        <View className="userDeatil">

          <GetUserInfo
            getUserInfo={(e) => {
              return this.getUserInfo(e);
            }}
            my-class="loginBtnBox"
          >
            <AtAvatar circle size='large' image='https://jdc.jd.com/img/200'></AtAvatar>
          </GetUserInfo>
          {/* <View className="userStr">
            <View className="userName">
              {nickName ? `,${nickName}` : nickName}
            </View>
            <View className="goEditData" onClick={this.goToEdit}>
              {userInfo.nickName !== '' ? "个人资料修改" : "立即登录"}
            </View>
           
          </View> */}

        </View>
        <View className="listPadding">
          <AtList hasBorder={false}>
            <AtListItem hasBorder={false} title="我的动态" arrow='right' />
            <AtListItem hasBorder={false} title="我的关注" arrow='right' />
            <AtListItem hasBorder={false} title="已报活动" arrow='right' />
          </AtList>
        </View>
        <View className="listPadding">
          <AtList hasBorder={false}>
            <AtListItem hasBorder={false} title='信息档案' arrow='right' />
            <AtListItem hasBorder={false} title='发布直播' arrow='right' />
          </AtList>
        </View>
        <View className="listPadding">
          <AtList hasBorder={false}>
            <AtListItem hasBorder={false} title='关注服务号，接受活动提醒' arrow='right' />
            <AtListItem hasBorder={false} onClick={() => this.goToNav('/pages/personal/about/index')} title='关于活力校园' arrow='right' />
          </AtList>

        </View>
        <AtToast isOpened={isToastOpened} text={toastText} duration={2000} icon="close"></AtToast>
      </View>
    );
  }
}

export default _page;
