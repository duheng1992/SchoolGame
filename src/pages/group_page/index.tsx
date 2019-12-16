/* eslint-disable react/no-unused-state */
import Taro, { Component, Config, getStorage } from "@tarojs/taro";
import { View, ScrollView, Image, Swiper, SwiperItem } from "@tarojs/components";
import { getStore } from "@/utils/utils";
import SearchBar from "@/components/SearchBar";
import "./index.scss";

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
    list: []
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
    this.setState({
      list
    })

  }

  componentWillReact() { }

  onSearchBar = () => {

  }

  render() {
    const { list } = this.state
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
            <SwiperItem>
              <View className='demo-text-1'>1</View>
            </SwiperItem>
            <SwiperItem>
              <View className='demo-text-2'>2</View>
            </SwiperItem>
            <SwiperItem>
              <View className='demo-text-3'>3</View>
            </SwiperItem>
          </Swiper>
        </View>
        <View>
          <View>教学资源</View>
          {
            list.map(item => (
              <View className='list_warp'>
                <Image src={item.bannerImage}></Image>
                <View className='list_info'>
                  <View>{item.subhead}</View>
                  <View>{item.title}</View>
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
