/* eslint-disable react/no-unused-state */
import Taro, { Component, Config, getStorage } from "@tarojs/taro";
import { View, ScrollView, Image, Swiper, SwiperItem } from "@tarojs/components";
import { getStore, setStore } from "@/utils/utils";
import SearchBar from "@/components/SearchBar";
import { getResourceBannerData } from "@/api/detail"
import "./index.scss";
import { getBannerList } from "@/api/home";

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

class _page extends Component {
  constructor(props) {
    super(props);
  }

  state: StateType = {
    list: [],
    bannerList: []
  };

  componentWillMount() {
    console.log(this.$router.params)
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {
    const list = getStore('groupList')
    console.log('list', list)
    getResourceBannerData().then((res: any) => {
      console.log('getResourceData', res)
      if (res.code == 'OK') {
        const banner = res.data
        banner.forEach(item => {
          if (typeof item.bannerImage == 'string') {
            item.bannerImage = JSON.parse(item.bannerImage)
          }
        })
        this.setState({ bannerList: banner })
      }
    })
    this.setState({
      list
    })

  }

  componentWillReact() { }

  onSearchBar = () => {

  }

  toDeatilByCategoryId = (detail) => {
    Taro.navigateTo({
      url: `/pages/detail_page/index?categoryId=${detail.id}`,
    });
  }

  render() {
    const { list, bannerList } = this.state
    return (
      <View className="group_page" id="page">
        <SearchBar onTapSearchBar={() => this.onSearchBar()}></SearchBar>
        <View>
          <View>热门推荐</View>
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            indicatorDots
            autoplay>
            {
              bannerList.length > 0 && bannerList.map(item => (<SwiperItem>
                <Image className='img_item' key={item.id} style='height:334rpx;width: 100%;' src={item.bannerImage.file}></Image>
              </SwiperItem>))
            }
          </Swiper>
        </View>
        <View>
          <View className='sub_title'>教学资源</View>
          {
            list.map(item => (
              <View className='list_warp' onClick={() => this.toDeatilByCategoryId(item)}>
                <Image className="list_img" mode="aspectFill" src={item.bannerImage}></Image>
                <View className='list_info'>
                  <View>{item.subhead}</View>
                  <View className="list_title">{item.title}</View>
                </View>

              </View>
            ))
          }
        </View>
      </View>
    );
  }
}

export default _page;
