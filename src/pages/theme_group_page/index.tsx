/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { getStore, setStore } from "@/utils/utils";
import { getThemeList } from "@/api/home"
import "./index.scss";
import { AtTabs, AtTabsPane, AtSegmentedControl, AtSearchBar } from "taro-ui";

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
    this.state = {
      current: 0,
      currentSegment: 0,
      showMore: '加载更多',
      list: [],
      entity: {
        keyword: '',
        old: 0,
        hotRank: 0,
      }
    }
  }

  state: StateType = {

  };

  componentWillMount() {
    console.log(this.$router.params)
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {
    const list = getStore('themeGroupList')
    console.log('list', list)
    // getResourceData().then(res => {
    //   console.log('getResourceData', res)
    // })
    this.setState({
      list
    })

  }

  getThemeList = (parmas) => {
    getThemeList(parmas).then(res => {
      console.log('list', res)
      const list = res.data.list
      this.setState({ list })
    })
  }

  componentWillReact() { }

  onActionSearch = () => {

    const { entity } = this.state

    this.getThemeList(entity)
  }
  searchBarChange = val => {
    let data = this.state.entity
    data.keyword = val
    this.setState({ entity: data })
  }

  onClearSearch = () => {
    let data = this.state.entity
    data.keyword = ''
    this.setState({ entity: data }, () => {
      this.getThemeList(data)
    })
  }
  handleClick(value) {
    this.setState({
      current: value
    })
  }
  handleSegmentClick(value) {
    let data = this.state.entity
    data.old = value
    this.setState({ entity: data }, () => {
      this.getThemeList(data)
    })
  }

  handleLiveSegmentClick(value) {
    this.setState({ currentSegment: value })
  }

  onTapHotRank = ishot => {
    let data = this.state.entity
    data.hotRank = ishot
    this.setState({ entity: data }, () => {
      this.getThemeList(data)
    })
  }

  showMore = () => {
    console.log('showMore')
  }

  goToThemeDetailPage = detail => {
    Taro.navigateTo({
      url: `/pages/theme_detail_page/index?themeId=${detail.id}`,
    });
  }

  onTapLiveHotRank = num => {
    console.log(num)
  }


  // toDeatilByCategoryId = (detail) => {
  //   setStore('teachDetail', detail)
  //   Taro.navigateTo({
  //     url: `/pages/detail_page/index?categoryId=${detail.id}`,
  //   });
  // }

  render() {
    const { list, showMore, entity } = this.state
    return (
      <View className="theme_group_page">
        <AtSearchBar
          value={entity.keyword}
          onChange={this.searchBarChange}
          onActionClick={this.onActionSearch}
          onClear={this.onClearSearch}
        />
        <AtTabs
          animated={false}
          current={this.state.current}
          tabList={[
            { title: '话题讨论' },
            { title: '专家答疑' },
            { title: '专家直播' }
          ]}
          onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View>
              <View className='segment_bar'>
                <AtSegmentedControl
                  onClick={this.handleSegmentClick.bind(this)}
                  selectedColor='#fff'
                  color='#f5f5f5'
                  fontSize={30}
                  current={entity.old}
                  values={['正在进行', '往期回顾']}
                />
                <View className='hot_rank'>
                  <View className={!entity.hotRank ? 'hot_rank_active' : ''} onClick={() => this.onTapHotRank(0)}>最新</View>
                  <View>·</View>
                  <View className={entity.hotRank ? 'hot_rank_active' : ''} onClick={() => this.onTapHotRank(1)}>最热</View>
                </View>
              </View>

              <ScrollView scrollY>
                {
                  list.length > 0 && list.map(item => (
                    <View className='list_warp' onClick={() => this.goToThemeDetailPage(item)}>
                      <Image className="list_img" mode="aspectFill" src={item.bannerImage}></Image>
                      <View className='list_info'>
                        <View className="list_title">{item.title}</View>
                        {
                          item.startTime && (
                            <View className="list_create_time">{item.startTime}</View>

                          )
                        }
                      </View>

                    </View>
                  ))
                }
                <View className='showMore' onClick={() => this.showMore()}>{showMore}</View>
              </ScrollView>
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View>敬请期待</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View>
              <View className='segment_bar'>
                <AtSegmentedControl
                  onClick={this.handleLiveSegmentClick.bind(this)}
                  selectedColor='#fff'
                  color='#f5f5f5'
                  fontSize={30}
                  current={this.state.currentSegment}
                  values={['正在进行', '往期回顾']}
                />
                <View className='hot_rank'>
                  <View className={!entity.hotRank ? 'hot_rank_active' : ''} onClick={() => this.onTapLiveHotRank(0)}>最新</View>
                  <View>·</View>
                  <View className={entity.hotRank ? 'hot_rank_active' : ''} onClick={() => this.onTapLiveHotRank(1)}>最热</View>
                </View>
              </View>
            </View>
            <View>敬请期待</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

export default _page;
