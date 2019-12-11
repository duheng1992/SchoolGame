import Taro, { Component, Config } from "@tarojs/taro";
import { View, Input } from "@tarojs/components";
import Avatar from "@/components/Avatar";
import "./index.scss";
import { AtButton } from "taro-ui";
import { getUserInfo, setUserInfo } from "@/api/login";
import SelectBox from "@/components/SelectBox";
import BirthdayPicker from "@/components/BirthdayPicker";
import ListPicker from "@/components/ListPicker";

type StateType = {
  userInfo: {
    nickName: string;
    gender: "" | 1 | 2;
    birthday: string;
    height: string;
    avatarImage: string;
  };
  [propName: string]: any;
};

type ComponentsProps = {
  [propName: string]: any;
};

interface _page {
  props: ComponentsProps;
  state: StateType;
}
import { genderList, heightList } from "@/assets/data/pickerData";

class _page extends Component {
  constructor(props) {
    super(props);
  }

  state: StateType = {
    userInfo: {
      nickName: "",
      height: "",
      gender: "",
      birthday: "",
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
      const genderVal = gender.value;
      _this.setState(
        {
          userInfo: {
            avatarImage,
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

  goToNext = () => {
    Taro.navigateBack({
      delta: 1,
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

  inputChange = (e) => {
    const value = e.target.value;
    const { userInfo } = this.state;
    userInfo.nickName = value;
    this.setState({
      userInfo,
    });
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
        <View className="contentBox">
          <View className="item">
            <View className="left">头像</View>
            <View className="right">
              <Avatar />
            </View>
          </View>
          <View className="item">
            <View className="left">昵称</View>
            <Input
              name="nickName"
              value={userInfo.nickName}
              onInput={this.inputChange}
              maxLength={16}
              className="right"
            />
          </View>
          <View className="item" onClick={this.showGenderPicker}>
            <View className="left">性别</View>
            <View className="right">{this.genderView(userInfo.gender)}</View>
          </View>
          <View className="item" onClick={this.showDatePicker}>
            <View className="left">出生年月</View>
            <View className="right">{userInfo.birthday}</View>
          </View>
          <View className="item" onClick={this.showHeightPicker}>
            <View className="left">身高</View>
            <View className="right">{userInfo.height}cm</View>
          </View>
        </View>
        <View className="footer">
          <AtButton
            type="primary"
            disabled={!isSubmit}
            className="submit"
            onClick={this.submit}
          >
            保存
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
