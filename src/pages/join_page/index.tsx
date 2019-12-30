/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton, AtForm, AtInput } from "taro-ui";
import { joinTracking } from '@/api/home'
import "./index.scss";
import logo from '@/images/card/logo.png'


type StateType = {
  [propName: string]: any;
};

interface _page {
  state: StateType;
}

class _page extends Component {
  constructor(props) {
    super(props);
    // const token = getStore('userToken');
  }

  state: StateType = {
    // token,
    userInfo: {
      email: '',
      mobile: "", // 1:男,2:女
      name: "",
      trackingId: "",
    },
    title_en: '',
    title: ''
  };

  componentWillMount() {
    console.log(this.$router.params)
    const { trackingId, title_en, title } = this.$router.params
    const user = { ...this.state.userInfo }
    user.trackingId = Number(trackingId)
    this.setState({
      userInfo: user,
      title_en,
      title
    })
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {

  }

  componentWillReact() { }


  onSubmit = () => {
    const { userInfo } = this.state
    console.log('userinfo', userInfo);
    if (userInfo.email == '' || userInfo.mobile == '' || userInfo.name == '') {
      Taro.showToast({
        title: '清填写完整',
        icon: 'none',
      })
      return
    }
    joinTracking(userInfo).then((res: any) => {
      if (res.code == 'OK') {
        console.log('res', res);
        Taro.showToast({
          title: res.message,
          icon: 'success',
        }).then(() => {
          setTimeout(() => {
            Taro.navigateBack({ delta: 1 })
          }, 3000)
        })

      }
    })

  }

  handleNameChange = (val) => {
    const { userInfo } = this.state
    userInfo.name = val
    this.setState({ userInfo })
  }

  handleMobileChange = (val) => {
    const { userInfo } = this.state
    userInfo.mobile = val
    this.setState({ userInfo })
  }
  handleEmailChange = (val) => {
    const { userInfo } = this.state
    userInfo.email = val
    this.setState({ userInfo })
  }

  render() {
    const { userInfo, title_en, title } = this.state;

    return (
      <View className="page">
        <View className='head'>
          <Image className='logo' src={logo}></Image>
          <View className='title_info'>
            <View className='title'>{title}</View>
            <View className='title_en'>{title_en}</View>
          </View>
        </View>
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
        >
          <AtInput
            name='name'
            type='text'
            placeholder='姓名 (必填)'
            placeholderStyle='color:#999'
            value={userInfo.name}
            onChange={this.handleNameChange.bind(this)}
          />
          <AtInput
            name='mobile'
            type='phone'
            placeholderStyle='color:#999'
            placeholder='手机号码 (必填)'
            value={userInfo.mobile}
            onChange={this.handleMobileChange.bind(this)}
          />
          <AtInput
            name='email'
            type='text'
            placeholderStyle='color:#999'
            placeholder='邮箱 (必填)'
            value={userInfo.email}
            onChange={this.handleEmailChange.bind(this)}
          />
          <AtButton className='submit_btn' formType='submit'>提交</AtButton>
        </AtForm>
      </View>
    );
  }
}

export default _page;
