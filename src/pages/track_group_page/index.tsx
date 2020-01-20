/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { getStore, setStore } from "@/utils/utils";
import { getTrackingList, getTrackingOldList } from "@/api/home"
import "./index.scss";
import { AtSegmentedControl } from "taro-ui";

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
      old: 0,
      entity: {
        hotRank: 0,
        pageIndex: 1,
        pageSize: 15
      },
      loading: false,
      endPage: false
    }
  }

  state: StateType = {

  };

  componentWillMount() {
    console.log(this.$router.params)
  }

  componentDidMount() {

  }
  config: Config = {
    navigationBarTitleText: "活动追踪",
  };


  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {
    const list = getStore('trackGroupList')
    console.log('list', list)
    this.setState({
      list
    })

  }

  getDataList = (parmas, list) => {
    getTrackingList(parmas).then((res: any) => {
      console.log('list', res)
      let themeList = list.length > 0 ? JSON.parse(JSON.stringify(list)) : []
      if (res.code == 'OK') {
        themeList = themeList.concat(res.data.list);
        if (!res.data.hasNextPage) {
          this.setState({ endPage: true })
        }
        this.setState({ loading: false, list: themeList })
      }
    })
  }

  getDataOldList = (parmas, list) => {
    getTrackingOldList(parmas).then((res: any) => {
      console.log('list', res)
      let themeList = list.length > 0 ? JSON.parse(JSON.stringify(list)) : []
      if (res.code == 'OK') {
        themeList = themeList.concat(res.data.list);
        if (!res.data.hasNextPage) {
          this.setState({ endPage: true })
        }
        // themeList.forEach(item => {
        //   console.log('lisitem', item)
        //   item.bannerImage = typeof item.bannerImage === 'string' ? JSON.parse(item.bannerImage).file : ''
        // })
        this.setState({ loading: false, list: themeList })
      }
    })
  }

  componentWillReact() { }

  handleClick(value) {
    this.setState({
      current: value
    })
  }
  handleSegmentClick(value) {
    this.setState({ old: value }, () => {
      let data = this.state.entity
      data.pageIndex = 1
      if (value) {
        this.getDataOldList(data, [])
      } else {
        this.getDataList(data, [])
      }
    })
  }

  showMore = () => {
    const { old, list } = this.state
    let data = this.state.entity
    data.pageIndex = data.pageIndex + 1
    this.setState({ loading: true })
    if (old) {
      this.getDataOldList(data, list)
    } else {
      this.getDataList(data, list)
    }
  }

  handleLiveSegmentClick(value) {
    this.setState({ currentSegment: value })
  }

  onTapHotRank = ishot => {
    let data = this.state.entity
    data.hotRank = ishot
    data.pageIndex = 1
    this.setState({ entity: data }, () => {
      const { entity, old } = this.state
      if (old) {
        this.getDataOldList(entity, [])
      } else {
        this.getDataList(entity, [])
      }

    })
  }


  goToDetailPage = detail => {
    console.log('dratil', detail)
    const { old } = this.state
    if (old) {
      Taro.navigateTo({
        url: `/pages/track_old_detail_page/index?newsId=${detail.id}`,
      });
    } else {
      Taro.navigateTo({
        url: `/pages/track_detail_page/index?trackId=${detail.id}`,
      });
    }

  }



  render() {
    const { list, showMore, entity, old, endPage, loading } = this.state
    return (
      <View className="theme_group_page">
        <View>
          <View className='segment_bar'>
            <AtSegmentedControl
              onClick={this.handleSegmentClick.bind(this)}
              selectedColor='#fff'
              color='#f5f5f5'
              fontSize={30}
              current={old}
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
                <View className='list_warp' key={item.id} onClick={() => this.goToDetailPage(item)}>
                  <Image className="list_img" mode="aspectFill" src={item.bannerImage}></Image>
                  <View className='list_info'>
                    <View className="list_title">{item.title}</View>
                    {
                      item.startTime && (
                        <View className="list_create_time">{item.startTime}~{item.endTime}</View>

                      )
                    }
                  </View>

                </View>
              ))
            }
            {
              endPage && (
                <View className='showMore'>没有更多数据了</View>
              )
            }
            {
              !endPage && (<View className='showMore' onClick={() => this.showMore()}>{loading ? '。。加载中。。' : showMore}</View>)
            }
          </ScrollView>
        </View>


      </View>
    );
  }
}

export default _page;
