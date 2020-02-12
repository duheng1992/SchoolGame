/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { getStore, setStore } from "@/utils/utils";
import { getVigorousList } from "@/api/home"
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
    this.state = {
      current: 0,
      currentSegment: 0,
      showMore: '加载更多',
      list: [],
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
    navigationBarTitleText: "校园活力项目展示",
  };


  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {
    const list = getStore('vigorousGroupList')
    console.log('list', list)
    this.setState({
      list
    })

  }

  getDataList = (parmas, list) => {
    getVigorousList(parmas).then((res: any) => {
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

  componentWillReact() { }

  handleClick(value) {
    this.setState({
      current: value
    })
  }

  showMore = () => {
    const { list } = this.state
    let data = this.state.entity
    data.pageIndex = data.pageIndex + 1
    this.setState({ loading: true })
    this.getDataList(data, list)

  }

  onTapHotRank = ishot => {
    let data = this.state.entity
    data.hotRank = ishot
    data.pageIndex = 1
    this.setState({ entity: data }, () => {
      const { entity } = this.state
      this.getDataList(entity, [])
    })
  }


  goToDetailPage = detail => {
    console.log('deatil', detail)
    Taro.navigateTo({
      url: `/pages/vigorous_detail_page/index?vigorousId=${detail.id}`,
    });


  }



  render() {
    const { list, showMore, entity, endPage, loading } = this.state
    return (
      <View className="theme_group_page">
        <View>

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
