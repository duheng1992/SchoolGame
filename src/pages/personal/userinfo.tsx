import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { getUserBaseInfo } from '@/api/personal'
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

@inject("tabBarStore")
@observer
class _page extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {
    userinfo: {}
  };

  componentWillMount() { }

  componentDidMount() {
  }

  componentDidShow() {
    this.getUserInfo()
  }
  componentWillReact() { }


  getUserInfo = () => {
    getUserBaseInfo().then((res: any) => {
      console.log('user', res);
      if (res.code == 'OK') {
        this.setState({ userinfo: res.data })
      }

    })
  }





  render() {
    const { userinfo } = this.state
    return (
      <View className='wrap'>

        <View className='list'>
          <View className='title'>所属地区</View>
          <View className='info'>{userinfo.schoolProvince}{userinfo.schoolCity}</View>
        </View>
        <View className='list'>
          <View className='title'>联系邮箱</View>
          <View className='info'>{userinfo.email}</View>
        </View>
        <View className='list'>
          <View className='title'>申报人姓名</View>
          <View className='info'>{userinfo.userName}</View>
        </View>
        <View className='list'>
          <View className='title'>身份证号</View>
          <View className='info'>{userinfo.identity}</View>
        </View>
        <View className='list'>
          <View className='title'>联系电话</View>
          <View className='info'>{userinfo.phone}</View>
        </View>
        <View className='list'>
          <View className='title'>在校职务</View>
          <View className='info'>{userinfo.position}</View>
        </View>
        <View className='list'>
          <View className='title'>从事体育教育年限</View>
          <View className='info'>{userinfo.workingYears}</View>
        </View>
        <View className='list'>
          <View className='title'>是否拥有有效护照</View>
          <View className='info'>{userinfo.passportFlag ? '是' : '否'}</View>
        </View>
        <View className='list'>
          <View className='title'>是否办理过美国签证</View>
          <View className='info'>{userinfo.visaFlag ? '是' : '否'}</View>
        </View>
      </View>



    );
  }
}

export default _page;
