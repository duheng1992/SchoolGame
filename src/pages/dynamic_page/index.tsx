/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtSearchBar, AtTabs, AtTabsPane } from "taro-ui";
import {
  getUserCommentList,
  getUserDiscussList,
  getUserHistoryList,
} from "@/api/personal";
import { toDetailByCategory } from "@/utils/utils";
import GoodItem from "@/pages/search_page/components/card";
import Discuss from "@/components/Discuss/index";
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
      keyword: "",
      pageIndex: 1,
      pageSize: 15,
    },
    tabIndex: 0,
    showMore: "加载更多",
    list: [],
    endPage: false,
    loading: false,
    historyList: [],
    commintList: [],
    discussList: [],
  };

  componentWillMount() {
    console.log(this.$router.params);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {
    const { tabIndex, form } = this.state;
    this.fetchList(tabIndex, form);
  }

  componentWillReact() {}

  setDataList = (res) => {
    console.log("list", res);
    let themeList = [];
    if (res.code == "OK") {
      themeList = themeList.concat(res.data.list);
      if (!res.data.hasNextPage) {
        this.setState({ endPage: true });
      }
      // themeList.forEach(item => {
      //   console.log('item', item)
      //   if (typeof item.bannerImage == 'string' && item.bannerImage) {
      //     item.bannerImage = item.bannerImage ? JSON.parse(item.bannerImage) : []
      //   }
      // })
      return themeList;
    }
  };

  onInputChange = (val) => {
    const data = { ...this.state.form };
    data.keyword = val;
    this.setState({ form: data });
    console.log("val", val);
  };

  onActionClick = () => {
    const { form, tabIndex } = this.state;
    const data = form;
    data.pageIndex = 1;
    // tabIndex 0 我的发布 1我的评论 2浏览历史
    this.fetchList(tabIndex, data);
  };

  fetchList = (tabIndex, form) => {
    switch (tabIndex) {
      case 0:
        getUserDiscussList(form).then((res: any) => {
          const list = this.setDataList(res);
          this.setState({
            loading: false,
            discussList: list,
          });
        });

        break;
      case 1:
        getUserCommentList(form).then((res: any) => {
          const list = this.setDataList(res);
          this.setState({
            loading: false,
            commintList: list,
          });
        });
        break;
      case 2:
        getUserHistoryList(form).then((res: any) => {
          const list = this.setDataList(res);

          this.setState({
            loading: false,
            historyList: list,
          });
        });
        break;
    }
  };

  onClearSearch = () => {
    const data = this.state.form;
    data.keyword = "";
    data.pageIndex = 1;
    this.setState({ form: data, endPage: false }, () => {
      this.fetchList(data, []);
    });
  };

  showMore = () => {
    const data = this.state.form;
    data.pageIndex += 1;
    this.setState({ loading: true });
    console.log("showMore", data);
    this.fetchList(this.state.tabIndex, data);
  };

  handleTabClick = (val) => {
    this.setState(
      {
        tabIndex: val,
        keyword: "",
      },
      () => {
        this.fetchList(this.state.tabIndex, this.state.form);
      },
    );
  };

  goToDetail = (item, type) => {
    console.log("detailitem", item);
    console.log("type", type);
    switch (type) {
      case "commit":
        Taro.navigateTo({
          url: `/pages/theme_detail_page/index?themeId=${item.id}`,
        });
        break;
      case "discuss":
        Taro.navigateTo({
          url: `/pages/theme_detail_item_page/index?discussId=${item.id}&themeId=${item.themeId}`,
        });
        break;
      case "history":
        const data = {
          moduleType: item.type,
          domainId: item.domainId,
          id: item.id,
        };
        toDetailByCategory(data);
        break;

      default:
        break;
    }
  };

  render() {
    const {
      form,
      list,
      endPage,
      loading,
      showMore,
      tabIndex,
      commintList,
      discussList,
      historyList,
    } = this.state;
    return (
      <View className="dynamic_page">
        <AtSearchBar
          value={form.keyword}
          onChange={(e) => {
            return this.onInputChange(e);
          }}
          onActionClick={() => {
            return this.onActionClick();
          }}
          onClear={this.onClearSearch}
        />

        <AtTabs
          current={tabIndex}
          tabList={[
            { title: "我的发布" },
            { title: "我的评论" },
            { title: "浏览历史" },
          ]}
          onClick={this.handleTabClick.bind(this)}
        >
          <AtTabsPane current={tabIndex} index={0}>
            {discussList.length > 0 && (
              <View className="discuss_wrap">
                {discussList.length > 0 &&
                  discussList.map((item) => {
                    return (
                      <Discuss
                        title={item.themeTitle}
                        key={item.id}
                        detail={item}
                        onClick={() => {
                          return this.goToDetail(item, "discuss");
                        }}
                      ></Discuss>
                    );
                  })}
              </View>
            )}
          </AtTabsPane>
          <AtTabsPane current={tabIndex} index={1}>
            {commintList.length > 0 && (
              <View className="discuss_wrap">
                {commintList.length > 0 &&
                  commintList.map((item) => {
                    return (
                      <Discuss
                        key={item.id}
                        detail={item}
                        type="discuss"
                        onClick={() => {
                          return this.goToDetail(item, "commit");
                        }}
                      ></Discuss>
                    );
                  })}
              </View>
            )}
          </AtTabsPane>
          <AtTabsPane current={tabIndex} index={2}>
            {historyList.length > 0 &&
              historyList.map((item) => {
                return (
                  <GoodItem
                    data={item}
                    onTapCard={() => {
                      return this.goToDetail(item, "history");
                    }}
                  ></GoodItem>
                );
              })}
          </AtTabsPane>
        </AtTabs>
        {endPage && <View className="showMore">没有更多数据了</View>}
        {!endPage && list.length > 0 && (
          <View
            className="showMore"
            onClick={() => {
              return this.showMore();
            }}
          >
            {loading ? "。。加载中。。" : showMore}
          </View>
        )}
      </View>
    );
  }
}

export default _page;
