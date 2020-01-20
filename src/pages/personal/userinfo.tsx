import Taro, { Component, Config } from "@tarojs/taro";
import {
  View,
  ScrollView,
  Image,
  Input,
  Picker,
  Button,
} from "@tarojs/components";
import { getUserBaseInfo, updateUserBaseInfo } from "@/api/personal";
import "./userinfo.scss";

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
import { AtButton } from "taro-ui";

@inject("tabBarStore")
@observer
class _page extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {
    userinfo: {},
    passportFlag: ["否", "是"],
    visaFlag: ["否", "是"],
  };

  componentWillMount() {}

  componentDidMount() {}

  componentDidShow() {
    this.getUserInfo();
  }

  componentWillReact() {}

  getUserInfo = () => {
    getUserBaseInfo().then((res: any) => {
      console.log("user", res);
      if (res.code == "OK") {
        this.setState({ userinfo: res.data });
      }
    });
  };

  onFlagChange = (e) => {
    console.log(e);

    // this.setState({
    //   passportFlag: this.state.passportFlag[e.detail.value]
    // })
  };

  onVisaChange = (e) => {
    console.log(e);

    // this.setState({
    //   visaFlag: this.state.passportFlag[e.detail.value]
    // })
  };

  goBack = () => {
    Taro.navigateBack({
      delta: 1,
    });
  };

  saveUserInfo = () => {
    const { userinfo } = this.state;
    const reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
    const phoneReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
    const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!reg.test(userinfo.identity) && userinfo.identity !== "") {
      Taro.showToast({
        title: "身份证格式错误",
        icon: "none",
      });
      return;
    }
    // if (!phoneReg.test(userinfo.phone) && userinfo.phone !== "") {
    //   Taro.showToast({
    //     title: "手机格式错误",
    //     icon: "none",
    //   });
    //   return;
    // }
    if (!emailReg.test(userinfo.email) && userinfo.email !== "") {
      Taro.showToast({
        title: "邮箱格式错误",
        icon: "none",
      });
      return;
    }

    const info = {
      province: userinfo.schoolProvince,
      city: userinfo.schoolCity,
      email: userinfo.email,
      name: userinfo.userName,
      identity: userinfo.identity,
      mobile: userinfo.phone,
      position: userinfo.position,
      workingYears: userinfo.workingYears,
      passportFlag: userinfo.passportFlag,
      visaFlag: userinfo.visaFlag,
    };
    console.log("info", info);
    updateUserBaseInfo(info).then((res) => {
      if (res.code === "OK") {
        Taro.showToast({
          title: res.message,
          icon: "success",
          duration: 2000,
        }).then(() => {
          setTimeout(() => {
            this.goBack();
          }, 1800);
        });
      }
    });
  };

  inputChange = (e, name) => {
    const info = this.state.userinfo;
    info[name] = e.currentTarget.value;
    this.setState({ userinfo: info });
  };

  render() {
    const { userinfo } = this.state;
    return (
      <View className="wrap">
        <View className="list">
          <View className="title">省份</View>
          <View className="info">
            <Input
              value={userinfo.schoolProvince}
              onInput={(e) => {
                return this.inputChange(e, "schoolProvince");
              }}
            ></Input>
          </View>
        </View>
        <View className="list">
          <View className="title">市</View>
          <View className="info">
            <Input
              value={userinfo.schoolCity}
              onInput={(e) => {
                return this.inputChange(e, "schoolCity");
              }}
            ></Input>
          </View>
        </View>
        <View className="list">
          <View className="title">联系邮箱</View>
          <View className="info">
            <Input
              value={userinfo.email}
              onInput={(e) => {
                return this.inputChange(e, "email");
              }}
            />
          </View>
        </View>
        <View className="list">
          <View className="title">申报人姓名</View>
          <View className="info">
            <Input
              value={userinfo.userName}
              onInput={(e) => {
                return this.inputChange(e, "userName");
              }}
            />
          </View>
        </View>
        <View className="list">
          <View className="title">身份证号</View>
          <View className="info">
            <Input
              value={userinfo.identity}
              onInput={(e) => {
                return this.inputChange(e, "identity");
              }}
            />
          </View>
        </View>
        <View className="list">
          <View className="title">联系电话</View>
          <View className="info">
            <Input
              value={userinfo.phone}
              onInput={(e) => {
                return this.inputChange(e, "phone");
              }}
            />
          </View>
        </View>
        <View className="list">
          <View className="title">在校职务</View>
          <View className="info">
            <Input
              value={userinfo.position}
              onInput={(e) => {
                return this.inputChange(e, "position");
              }}
            />
          </View>
        </View>
        <View className="list">
          <View className="title">从事体育教育年限</View>
          <View className="info">
            <Input
              value={userinfo.workingYears}
              onInput={(e) => {
                return this.inputChange(e, "workingYears");
              }}
            />
          </View>
        </View>

        <Picker
          mode="selector"
          value={userinfo.passportFlag}
          range={this.state.passportFlag}
          onChange={(e) => {
            return this.inputChange(e, "passportFlag");
          }}
        >
          <View className="list">
            <View className="title">是否拥有有效护照</View>
            <View className="info">
              {userinfo.passportFlag === "1" ? "是" : "否"}
            </View>
          </View>
        </Picker>

        <Picker
          mode="selector"
          value={userinfo.visaFlag}
          range={this.state.visaFlag}
          onChange={(e) => {
            return this.inputChange(e, "visaFlag");
          }}
        >
          <View className="list">
            <View className="title">是否办理过美国签证</View>
            <View className="info">
              {userinfo.visaFlag === "1" ? "是" : "否"}
            </View>
          </View>
        </Picker>
        <View>
          <AtButton
            className="save_btn"
            onClick={() => {
              return this.saveUserInfo();
            }}
          >
            保存
          </AtButton>
        </View>
      </View>
    );
  }
}

export default _page;
