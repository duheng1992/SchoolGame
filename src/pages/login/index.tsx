import { getUserInfo, wx_login, setUserInfo } from "@/api/login";
import GetUserInfo from "@/components/GetUserInfo";
import { logo } from "@/images/load";
import { clearUserInfo, setStore } from "@/utils/utils";
import { Image, View, Video } from "@tarojs/components";
import Taro, { Component, Config } from "@tarojs/taro";
import { AtButton } from "taro-ui";
import "./index.scss";
import { loginVideo } from "@/config/baseUrl";

class _page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // token,
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {}

  componentWillReact() {}

  config: Config = {
    navigationStyle: "custom",
    navigationBarBackgroundColor: "#41403F",
  };

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
              _this.goToNext(false);
            } else {
              _this.goToNext(true);
            }
          }
        });
      });
    } else {
      clearUserInfo();
      _this.goToNext(false);
    }
  };

  goToNext = (status) => {
    if (status) {
      Taro.reLaunch({
        url: "/pages/register/index",
      });
    } else {
      Taro.reLaunch({
        url: "/pages/home/index",
      });
    }
  };

  render() {
    console.log(logo);

    return (
      <View className="page">
        <Video
          className="bgVideo"
          loop
          show-fullscreen-btn={false}
          show-play-btn={false}
          show-center-play-btn={false}
          autoplay
          object-fit="fill"
          controls={false}
          src={loginVideo}
        />
        <View className="content">
          <Image className="logo" mode="widthFix" src={logo} />
          <GetUserInfo
            getUserInfo={(e) => {
              return this.getUserInfo(e);
            }}
            my-class="loginBtnBox"
          >
            <AtButton type="primary" className="loginBtn">
              登录
            </AtButton>
          </GetUserInfo>
        </View>
      </View>
    );
  }
}

export default _page;
