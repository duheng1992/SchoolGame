/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { getStore, setStore } from "@/utils/utils";
import { getThemeList } from "@/api/home";
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
      showMore: "加载更多",
      list: [],
      entity: {
        keyword: "",
        old: 0,
        hotRank: 0,
        pageIndex: 1,
        pageSize: 15,
      },
      loading: false,
      endPage: false,
    };
  }

  state: StateType = {};

  config: Config = {
    navigationBarTitleText: "热门话题",
  };

  componentWillMount() {
    console.log(this.$router.params);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {
    const list = getStore("themeGroupList");
    console.log("list", list);
    const { entity } = this.state;
    this.getThemeList(entity, []);
  }

  getThemeList = (parmas, list) => {
    getThemeList(parmas).then((res: any) => {
      console.log("list", res);
      let themeList = JSON.parse(JSON.stringify(list));
      if (res.code == "OK") {
        themeList = themeList.concat(res.data.list);
        if (!res.data.hasNextPage) {
          this.setState({ endPage: true });
        }
        this.setState({ loading: false, list: themeList });
      }
    });
  };

  componentWillReact() {}

  onActionSearch = () => {
    const { entity } = this.state;
    const data = entity;
    data.pageIndex = 1;
    this.getThemeList(data, []);
  };

  searchBarChange = (val) => {
    const data = this.state.entity;
    data.keyword = val;
    data.pageIndex = 1;
    this.setState({ entity: data });
  };

  onClearSearch = () => {
    const data = this.state.entity;
    data.keyword = "";
    data.pageIndex = 1;
    this.setState({ entity: data, endPage: false }, () => {
      this.getThemeList(data, []);
    });
  };

  handleClick(value) {
    this.setState({
      current: value,
    });
  }

  handleSegmentClick(value) {
    const data = this.state.entity;
    data.old = value;
    this.setState({ entity: data }, () => {
      this.getThemeList(data, []);
    });
  }

  handleLiveSegmentClick(value) {
    this.setState({ currentSegment: value });
  }

  onTapHotRank = (ishot) => {
    const data = this.state.entity;
    data.hotRank = ishot;
    this.setState({ entity: data }, () => {
      this.getThemeList(data, []);
    });
  };

  showMore = () => {
    const data = this.state.entity;
    data.pageIndex += 1;
    this.setState({ loading: true });
    console.log("showMore", data);
    this.getThemeList(data, this.state.list);
  };

  goToThemeDetailPage = (detail) => {
    Taro.navigateTo({
      url: `/pages/theme_detail_page/index?themeId=${detail.id}`,
    });
  };

  onTapLiveHotRank = (num) => {
    console.log(num);
  };

  // toDeatilByCategoryId = (detail) => {
  //   setStore('teachDetail', detail)
  //   Taro.navigateTo({
  //     url: `/pages/detail_page/index?categoryId=${detail.id}`,
  //   });
  // }

  render() {
    const { list, showMore, entity, loading, endPage } = this.state;
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
            { title: "话题讨论" },
            { title: "专家答疑" },
            { title: "专家直播" },
          ]}
          onClick={this.handleClick.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <View>
              <View className="segment_bar">
                <AtSegmentedControl
                  onClick={this.handleSegmentClick.bind(this)}
                  selectedColor="#fff"
                  color="#f5f5f5"
                  fontSize={30}
                  current={entity.old}
                  values={["正在进行", "往期回顾"]}
                />
                <View className="hot_rank">
                  <View
                    className={!entity.hotRank ? "hot_rank_active" : ""}
                    onClick={() => {
                      return this.onTapHotRank(0);
                    }}
                  >
                    最新
                  </View>
                  <View>·</View>
                  <View
                    className={entity.hotRank ? "hot_rank_active" : ""}
                    onClick={() => {
                      return this.onTapHotRank(1);
                    }}
                  >
                    最热
                  </View>
                </View>
              </View>

              <ScrollView scrollY>
                {list.length > 0 &&
                  list.map((item) => {
                    return (
                      <View
                        className="list_warp"
                        key={item.id}
                        onClick={() => {
                          return this.goToThemeDetailPage(item);
                        }}
                      >
                        <Image
                          className="list_img"
                          mode="aspectFill"
                          src={item.bannerImage}
                        ></Image>
                        <View className="list_info">
                          <View className="list_title">{item.title}</View>
                          {item.startTime && (
                            <View className="list_create_time">
                              {item.startTime}
                            </View>
                          )}
                        </View>
                      </View>
                    );
                  })}
                {endPage && <View className="showMore">没有更多数据了</View>}
                {!endPage && (
                  <View
                    className="showMore"
                    onClick={() => {
                      return this.showMore();
                    }}
                  >
                    {loading ? "。。加载中。。" : showMore}
                  </View>
                )}
              </ScrollView>
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View>敬请期待</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            {/* <View>
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
            </View> */}
            <View>敬请期待</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

export default _page;
