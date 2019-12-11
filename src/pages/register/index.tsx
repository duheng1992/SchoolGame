/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import SelectBox from "@/components/SelectBox";
import BirthdayPicker from "@/components/BirthdayPicker";
import ListPicker from "@/components/ListPicker";
import Avatar from "@/components/Avatar";

import { AtButton } from "taro-ui";
import "./index.scss";
import { getUserInfo, setUserInfo } from "@/api/login";

type StateType = {
  userInfo: {
    nickName: string;
    gender: "" | 1 | 2;
    birthday: string;
    height: string;
    avatarImage: string;
  };
  datePickerStatus: boolean;
  heightPickerStatus: boolean;
  genderPickerStatus: boolean;
  [propName: string]: any;
};

interface _page {
  state: StateType;
}

import { genderList, heightList } from "@/assets/data/pickerData";

class _page extends Component {
  constructor(props) {
    super(props);
    // const token = getStore('userToken');
  }

  state: StateType = {
    // token,
    userInfo: {
      nickName: "",
      gender: "", // 1:男,2:女
      birthday: "",
      height: "",
      avatarImage: "",
    },
    pickerData: {
      gender: "",
      birthday: "",
      height: "",
    },
    datePickerStatus: false,
    heightPickerStatus: false,
    genderPickerStatus: false,
    isSubmit: false,
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {
    const _this = this;
    getUserInfo().then((res) => {
      const { avatarImage, birthday, gender, height, nickName } = res.data;
      const userIconUrl = avatarImage;
      const genderVal = gender.value;
      _this.setState(
        {
          userInfo: {
            avatarImage: userIconUrl ? userIconUrl : "",
            nickName: nickName ? nickName : "",
            gender: genderVal ? genderVal : "",
            birthday: birthday ? birthday : "",
            height: height ? height : "",
          },
        },
        () => {
          _this.setIsSubmit();
        },
      );
    });
  }

  componentWillReact() {}

  config: Config = {
    navigationBarBackgroundColor: "#F0E8DF",
  };

  updateStore = () => {};

  onHide = () => {
    this.setState(
      {
        datePickerStatus: false,
        heightPickerStatus: false,
        genderPickerStatus: false,
      },
      () => {
        this.setIsSubmit();
      },
    );
  };

  clearPickerDate = () => {
    this.setState({
      pickerData: {
        gender: "",
        birthday: "",
        height: "",
      },
    });
  };

  //生日确认
  dataPacker_fun = () => {
    const { pickerData, userInfo } = this.state;
    const { birthday } = pickerData;
    if (birthday) {
      userInfo.birthday = birthday;
      this.setState({
        userInfo,
      });
      this.onHide();
      this.clearPickerDate();
    }
  };

  //身高确认
  heightPacker_fun = () => {
    const { pickerData, userInfo } = this.state;
    const { height } = pickerData;
    if (height) {
      userInfo.height = height;
      this.setState({
        userInfo,
      });
      this.onHide();
      this.clearPickerDate();
    }
  };

  //性别确认
  genderPacker_fun = () => {
    const { pickerData, userInfo } = this.state;
    const { gender } = pickerData;
    if (gender) {
      userInfo.gender = gender;
      this.setState({
        userInfo,
      });
      this.onHide();
      this.clearPickerDate();
    }
  };

  //显示系列
  showHeightPicker = () => {
    this.setState({
      heightPickerStatus: true,
    });
  };

  showDatePicker = () => {
    this.setState({
      datePickerStatus: true,
    });
  };

  showGenderPicker = () => {
    this.setState({
      genderPickerStatus: true,
    });
  };

  //生日选择结果
  birthdayChange = (e) => {
    const { pickerData } = this.state;
    pickerData.birthday = e;
    this.setState({
      pickerData,
    });
  };

  //性别选择结果
  genderChange = (e) => {
    const { pickerData } = this.state;
    pickerData.gender = e.value;
    this.setState({
      pickerData,
    });
  };

  heightChange = (e) => {
    const { pickerData } = this.state;
    pickerData.height = e.label;
    this.setState({
      pickerData,
    });
  };

  //提交

  submit = () => {
    const { userInfo } = this.state;
    const _this = this;
    const param = {
      ...userInfo,
      avatarImage: {
        title: userInfo.nickName,
        url: userInfo.avatarImage,
      },
    };
    setUserInfo(param).then((res: any) => {
      if (res.code === "OK") {
        _this.goToNext();
      }
    });
  };

  goToNext = () => {
    Taro.redirectTo({
      url: "/pages/manage/index",
    });
  };

  setIsSubmit = () => {
    const { userInfo } = this.state;
    let isSubmit = true;

    for (const key in userInfo) {
      if (userInfo.hasOwnProperty(key)) {
        const el = userInfo[key];
        if (el) {
          //
        } else {
          isSubmit = false;
        }
      }
    }
    this.setState({
      isSubmit,
    });
  };

  genderView = (gender) => {
    if (gender - 1 === 0) {
      return "男";
    } else if (gender - 2 === 0) {
      return "女";
    } else {
      return "";
    }
  };

  render() {
    const { userInfo, isSubmit } = this.state;

    return (
      <View className="page">
        <View className="header">
          <View className="h1">填写个人信息</View>
          <View className="h3">以便获取更准确的分析</View>
        </View>
        <View className="content">
          <View className="avatarBox">
            <Avatar size="large" />
          </View>
          <View className="cont-box">
            <View className="userName">{userInfo.nickName}</View>
            <View className="inputBox" onClick={this.showGenderPicker}>
              <View className="name">性别</View>
              <View className="value">{this.genderView(userInfo.gender)}</View>
            </View>
            <View className="inputBox" onClick={this.showDatePicker}>
              <View className="name">生日</View>
              <View className="value">{userInfo.birthday}</View>
            </View>
            <View className="inputBox" onClick={this.showHeightPicker}>
              <View className="name">身高</View>
              <View className="value">{userInfo.height}cm</View>
            </View>
          </View>
        </View>
        <View className="bottom">
          <AtButton type="primary" disabled={!isSubmit} onClick={this.submit}>
            确定
          </AtButton>
        </View>
        <SelectBox
          onCancel={this.onHide}
          onOk={this.dataPacker_fun}
          isShow={this.state.datePickerStatus}
        >
          <BirthdayPicker onChange={this.birthdayChange} />
        </SelectBox>
        <SelectBox
          onCancel={this.onHide}
          onOk={this.heightPacker_fun}
          isShow={this.state.heightPickerStatus}
        >
          <ListPicker list={heightList} onChange={this.heightChange} />
        </SelectBox>
        <SelectBox
          onCancel={this.onHide}
          onOk={this.genderPacker_fun}
          isShow={this.state.genderPickerStatus}
        >
          <ListPicker list={genderList} onChange={this.genderChange} />
        </SelectBox>
      </View>
    );
  }
}

export default _page;
