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
    const list = getStore('trackGroupList')
    console.log('list', list)
    this.setState({
      list
    })

  }

  getDataList = (parmas) => {
    getTrackingList(parmas).then(res => {
      console.log('list', res)
      const list = res.data.list
      this.setState({ list })
    })
  }

  getDataOldList = (parmas) => {
    getTrackingOldList(parmas).then(res => {
      console.log('list', res)
      const list = res.data.list
      this.setState({ list })
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
      const { entity } = this.state
      if (value) {
        this.getDataOldList(entity)
      } else {
        this.getDataList(entity)
      }
    })
  }

  handleLiveSegmentClick(value) {
    this.setState({ currentSegment: value })
  }

  onTapHotRank = ishot => {
    let data = this.state.entity
    data.hotRank = ishot
    this.setState({ entity: data }, () => {
      const { entity, old } = this.state
      if (old) {
        this.getDataOldList(entity)
      } else {
        this.getDataList(entity)
      }

    })
  }

  showMore = () => {
    console.log('showMore')
  }

  goToDetailPage = detail => {
    setStore('themeDetail', detail)
    Taro.navigateTo({
      url: `/pages/track_detail_page/index?themeId=${detail.id}`,
    });
  }



  render() {
    const { list, showMore, entity, old } = this.state
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
                <View className='list_warp' onClick={() => this.goToDetailPage(item)}>
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


      </View>
    );
  }
}

export default _page;
