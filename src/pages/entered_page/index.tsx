/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { getUserJoinList } from "@/api/personal";
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
    form: {
      pageIndex: 1,
      pageSize: 15
    },
    showMore: '加载更多',
    list: [],
    endPage: false,
    loading: false
  };

  componentWillMount() {
    console.log(this.$router.params);
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {
    const { form } = this.state
    this.getJoinList(form, [])
  }

  getJoinList = (params, list) => {
    getUserJoinList(params).then((res: any) => {
      let newList = JSON.parse(JSON.stringify(list))
      if (res.code == 'OK') {
        newList = newList.concat(res.data.list);
        if (!res.data.hasNextPage) {
          this.setState({ endPage: true })
        }
        this.setState({ loading: false, list: newList })
      }
    })
  }
  showMore = () => {
    let data = this.state.form
    data.pageIndex = data.pageIndex + 1
    this.setState({ loading: true })
    this.getJoinList(data, this.state.list)
  }

  componentWillReact() { }


  goToDetail = id => {
    Taro.navigateTo({
      url: `/pages/track_detail_page/index?trackId=${id}`,
    });
  }







  render() {
    const { list, endPage, loading, showMore } = this.state;
    return (
      <View className="page" >
        {list.length > 0 && list.map(item => (
          <View className='item'>
            <View className='bannerImage'>
              <Image className='img' src={item.bannerImage}></Image>
              <View className='title'>{item.title}</View>
            </View>
            <View className='address'>{item.address}</View>
            <View className='time'>{item.startTime}~{item.endTime}</View>
            <View className='control'>
              <View className='join'>已报名{item.joinNum}人</View>
              <View className='handle' onClick={() => this.goToDetail(item.id)}>查看详情 ></View>
            </View>
          </View>

        ))}
        {
          endPage && (
            <View className='showMore'>没有更多数据了</View>
          )
        }
        {
          (!endPage && list.length > 0) && (<View className='showMore' onClick={() => this.showMore()}>{loading ? '。。加载中。。' : showMore}</View>)
        }
      </View>
    );
  }
}

export default _page;
