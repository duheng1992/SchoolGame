/* eslint-disable react/no-unused-state */
import Taro, { Component, Config, getStorage } from "@tarojs/taro";
import { View, ScrollView, Image, Swiper, SwiperItem } from "@tarojs/components";
import { getStore, setStore } from "@/utils/utils";
import SearchBar from "@/components/SearchBar";
import { getResourceData } from "@/api/detail"
import "./index.scss";
import { AtTabs, AtTabsPane, AtSegmentedControl } from "taro-ui";

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
      currentSegment: 0
    }
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
    // const list = getStore('groupList')
    // console.log('list', list)
    // getResourceData().then(res => {
    //   console.log('getResourceData', res)
    // })
    // this.setState({
    //   list
    // })

  }

  componentWillReact() { }

  onSearchBar = () => {

  }
  handleClick(value) {
    this.setState({
      current: value
    })
  }
  handleSegmentClick(value) {
    this.setState({
      currentSegment: value
    })
  }

  // toDeatilByCategoryId = (detail) => {
  //   setStore('teachDetail', detail)
  //   Taro.navigateTo({
  //     url: `/pages/detail_page/index?categoryId=${detail.id}`,
  //   });
  // }

  render() {
    const { list } = this.state
    return (
      <View className="group_page" id="page">
        <SearchBar onTapSearchBar={() => this.onSearchBar()}></SearchBar>
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
              <AtSegmentedControl
                onClick={this.handleSegmentClick.bind(this)}
                selectedColor='#FF4949'
                fontSize='30'
                current={this.state.currentSegment}
                values={['正在进行', '往期回顾']}
              />
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View>
              <AtSegmentedControl
                onClick={this.handleSegmentClick.bind(this)}
                selectedColor='#FF4949'
                fontSize='30'
                current={this.state.currentSegment}
                values={['正在进行', '往期回顾']}
              />
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

export default _page;
