/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtSearchBar } from "taro-ui";
import { getCommonSearchList } from "@/api/searchPage";
import GoodItem from "./components/card";
import { toDetailByCategory } from "@/utils/utils";
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
      pageSize: 5,
    },
    showMore: "加载更多",
    list: [],
    endPage: false,
    loading: false,
  };

  config: Config = {
    navigationBarTitleText: "搜索",
  };

  componentWillMount() {
    console.log(this.$router.params);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {}

  componentWillReact() {}

  onInputChange = (val) => {
    const data = { ...this.state.form };
    data.keyword = val;
    this.setState({ form: data });
    console.log("val", val);
  };

  onActionClick = () => {
    const { form } = this.state;
    const data = form;
    data.pageIndex = 1;
    this.getCommonSearchList(data, []);
  };

  getCommonSearchList = (params, list) => {
    getCommonSearchList(params).then((res: any) => {
      let newList = JSON.parse(JSON.stringify(list));
      if (res.code == "OK") {
        newList = newList.concat(res.data.list);
        if (!res.data.hasNextPage) {
          this.setState({ endPage: true });
        }
        this.setState({ loading: false, list: newList });
      }
    });
  };

  onTapItem = (item) => {
    toDetailByCategory(item, "search");
  };

  showMore = () => {
    const data = this.state.form;
    data.pageIndex += 1;
    this.setState({ loading: true });
    console.log("showMore", data);
    this.getCommonSearchList(data, this.state.list);
  };

  render() {
    const { form, list, endPage, loading, showMore } = this.state;
    return (
      <View className="search_page">
        <AtSearchBar
          value={form.keyword}
          onChange={(e) => {
            return this.onInputChange(e);
          }}
          onActionClick={() => {
            return this.onActionClick();
          }}
        />
        {list &&
          list.map((item) => {
            return (
              <GoodItem
                data={item}
                onTapCard={() => {
                  return this.onTapItem(item);
                }}
              ></GoodItem>
            );
          })}
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
