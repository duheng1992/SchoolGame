import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import Weight from "@/components/Weight";
import BodyReport from "@/components/BodyReport";

import { getStore } from "@/utils/utils";

import { homeBg } from "@/images/load";

import { getUserInfo } from "@/api/login";

import { getEquipmentList } from "@/api/equipment";

import "./index.scss";

import ItemView from "@/components/ItemView";

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
    one: [
      {
        name: '1',
        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg'
      },
      {
        name: '2',
        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg'
      },
      {
        name: '3',
        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg'
      }
    ]
  };

  componentWillMount() { }

  componentDidMount() { }

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
   
        );
      });
    } 
  }


  componentWillReact() { }

  config: Config = {
    navigationBarBackgroundColor: "#FFFFFF",
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


  goToSet = () => {
    console.log("去设置目标");
  };

  goToDetailById = id=>{
    console.log('id',id)
    Taro.navigateTo({
      url: `/pages/detail_page/index?id=${id}`,
    });

  }

  render() {
    const {one,two} = this.state
    return (
      <View>
        <ScrollView scrollY scrollTop={0} className="verticalBox">
          <View>

            <ScrollView scrollX className="horizontalBox" scrollLeft={0} scrollWithAnimation>
              <View>
                <Image className="img_item" src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg' style='height:200px' />
                <Image className="img_item" src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg' style='height:200px' />
                <Image className="img_item" src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg' style='height:200px' />
                <Image className="img_item" src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg' style='height:200px' />

              </View>
            </ScrollView>

            <ItemView title="123" list={one} onClick={(e)=>this.goToDetailById(e)}/>
            <ItemView title="456" list={one}  />
            <ItemView title="678" list={one}  />

          </View>
        </ScrollView>
      </View>

    );
  }
}

export default _page;
