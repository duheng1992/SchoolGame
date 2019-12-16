import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import Weight from "@/components/Weight";
import BodyReport from "@/components/BodyReport";

import { getStore, setStore } from "@/utils/utils";

import { homeBg } from "@/images/load";

import { getUserInfo } from "@/api/login";

import { getCategoryList, getTrackingList } from "@/api/home";

import "./index.scss";

import ItemView from "@/components/ItemView";
import SearchBar from "@/components/SearchBar";

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
    teach: [],
    hot: [],
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

    getCategoryList().then((res) => {
      console.log('res', res)
      this.setState({
        teach: res.data
      })
    });

    getTrackingList().then((res) => {
      console.log('res', res)
      this.setState({
        hot: res.data
      })
    });

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

  // goToDetail = (item) => {
  //   const { homeData } = this.state;
  //   const token = getStore("userToken");
  //   if (token) {
  //     Taro.navigateTo({
  //       url: `/pages/detail/index?id=${homeData.id}&fie=${item.name}`,
  //     });
  //   } else {
  //     this.goToLogin();
  //   }
  // };


  goToSet = () => {
    console.log("去设置目标");
  };

  goToDetailById = id => {
    console.log('id', id)
    Taro.navigateTo({
      url: `/pages/detail_page/index?id=${id}`,
    });

  }
  onSearchBar = () => {
    console.log('onSearchBar')
    Taro.navigateTo({
      url: `/pages/search_page/index`,
    });
  }

  goToGroup = categoryId => {
    Taro.navigateTo({
      url: `/pages/group_page/index?categoryId=${categoryId}`,
    })
  }

  render() {
    const { one, teach, hot } = this.state
    return (
      <View>
        <ScrollView scrollY scrollTop={0} className="verticalBox">
          <View>
            <SearchBar onTapSearchBar={() => this.onSearchBar()}></SearchBar>
            <ScrollView scrollX className="horizontalBox" scrollLeft={0} scrollWithAnimation>
              <View>
                <Image className="img_item" src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg' style='height:200px' />
                <Image className="img_item" src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg' style='height:200px' />
                <Image className="img_item" src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg' style='height:200px' />
                <Image className="img_item" src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg' style='height:200px' />

              </View>
            </ScrollView>


            <ItemView title="教学资源" note='查找你需要的课堂教学内容' list={teach} type='icon' onClick={(e) => this.goToDetailById(e)} onTapGrunp={() => this.goToGroup(teach)} />
            <ItemView title="热门话题" note='体育老师都在讨论什么' list={hot} />
            <ItemView title="活动追踪" note='活力校园相关资讯' list={one} />
            <ItemView title="活力校园项目展示" note='活力校园相关资讯' list={one} />

          </View>
        </ScrollView>
      </View>

    );
  }
}

export default _page;
