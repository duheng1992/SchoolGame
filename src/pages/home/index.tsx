import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";

import { getStore, setStore, toDetailByCategory } from "@/utils/utils";


import { getCategoryList, getTrackingList, getThemeList, getBannerList, getVigorousList } from "@/api/home";

import "./index.scss";

import ItemView from "@/components/ItemView";
import SearchBar from "@/components/SearchBar";


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
    track: [],
    theme: [],
    banner: [],
    vigorous: []
  };

  componentWillMount() { }

  componentDidMount() { }

  componentDidShow() {
    const { tabBarStore } = this.props;
    tabBarStore.setIndex(0);
    const _this = this;
    const token = getStore("userToken");
    // 教学资料分类列表
    getCategoryList().then((res) => {
      console.log('res', res)
      this.setState({
        teach: res.data
      })
    });
    // 活动追踪列表
    getTrackingList().then((res) => {
      console.log('res', res)
      this.setState({
        track: res.data.list
      })
    });
    //热门话题列表
    getThemeList().then(res => {
      console.log('theme', res)
      this.setState({
        theme: res.data.list
      })
    })

    // 获取banner
    getBannerList().then(res => {
      console.log('banner', res)
      let list = res.data && res.data.length > 0 ? JSON.parse(JSON.stringify(res.data)) : []
      list.forEach(item => {
        item.bannerImage = JSON.parse(item.bannerImage)
      })
      console.log('list', list)
      this.setState({
        banner: list
      })
    })
    // 活力校园
    getVigorousList().then(res => {
      console.log('vigorous', res.data)
      this.setState({
        vigorous: res.data
      })
    })

  }


  componentWillReact() { }


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

  goToDetailByCategoryId = categoryId => {
    const { teach } = this.state;
    const teachDetail = teach.filter(item => item.id === categoryId)
    console.log('teachDetail', teachDetail)
    setStore('teachDetail', teachDetail[0])
    Taro.navigateTo({
      url: `/pages/detail_page/index?categoryId=${categoryId}`,
    });

  }

  goToDetailByThemeId = themeId => {
    const { theme } = this.state;
    const themeDetail = theme.filter(item => item.id === themeId)
    console.log('themeDetail', themeDetail)
    setStore('themeDetail', themeDetail[0])
    Taro.navigateTo({
      url: `/pages/theme_detail_page/index?themeId=${themeId}`,
    });
  }
  goToDetailByTrackId = teackId => {
    const { track } = this.state;
    const trackDetail = track.filter(item => item.id === teackId)
    console.log('trackDetail', trackDetail)
    setStore('trackDetail', trackDetail[0])
    Taro.navigateTo({
      url: `/pages/track_detail_page/index?trackId=${teackId}`,
    });
  }

  goToCategoryGroup = (item, name) => {
    setStore(`${name}GroupList`, item)
    Taro.navigateTo({
      url: `/pages/${name}_group_page/index`,
    })
  }
  onSearchBar = () => {
    console.log('onSearchBar')
    Taro.navigateTo({
      url: `/pages/search_page/index`,
    });
  }

  goToGroup = (teach) => {
    setStore('groupList', teach)
    Taro.navigateTo({
      url: "/pages/group_page/index",
    })
  }
  onBannerTap = item => {
    toDetailByCategory(item)
  }

  render() {
    const { teach, track, theme, banner, vigorous } = this.state
    return (
      <View>
        <ScrollView scrollY scrollTop={0} className="verticalBox">
          <View>
            <SearchBar onTapSearchBar={() => this.onSearchBar()}></SearchBar>
            <ScrollView scrollX className="horizontalBox" scrollLeft={0} scrollWithAnimation>
              <View>
                {
                  banner.length > 0 && banner.map(item => (<Image className='img_item' key={item.id} style='height:488rpx' onClick={() => this.onBannerTap(item)} src={item.bannerImage.file}></Image>))
                }
              </View>
            </ScrollView>


            <ItemView title="教学资源" note='查找你需要的课堂教学内容' list={teach} type='icon' onClick={(e) => this.goToDetailByCategoryId(e)} onTapGrunp={() => this.goToGroup(teach)} />
            <ItemView title="热门话题" note='体育老师都在讨论什么' list={theme} onTapGrunp={() => this.goToCategoryGroup(theme, 'theme')} onClick={(e) => this.goToDetailByThemeId(e)} />
            <ItemView title="活动追踪" note='活力校园相关资讯' list={track} onTapGrunp={() => this.goToCategoryGroup(track, 'track')} onClick={(e) => this.goToDetailByTrackId(e)} />
            <ItemView title="活力校园项目展示" note='活力校园相关资讯' list={vigorous} />

          </View>
        </ScrollView>
      </View>

    );
  }
}

export default _page;
