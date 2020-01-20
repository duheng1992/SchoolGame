/* eslint-disable react/no-unused-state */
import Taro, { Component, Config, getStorage } from "@tarojs/taro";
import {
  View,
  ScrollView,
  Image,
  Swiper,
  SwiperItem,
} from "@tarojs/components";
import { getStore, setStore } from "@/utils/utils";
import SearchBar from "@/components/SearchBar";
import { getResourceBannerData } from "@/api/detail";
import { getCategoryList, getBannerList } from "@/api/home";
import "./index.scss";

import { AtSearchBar } from "taro-ui";

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
    list: [],
    bannerList: [],
    form: {
      keyword: "",
      pageIndex: 1,
      pageSize: 20,
    },
  };

  config: Config = {
    navigationBarTitleText: "教学资源",
  };

  componentWillMount() {
    console.log(this.$router.params);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {
    const { form } = this.state;
    getResourceBannerData().then((res: any) => {
      console.log("getResourceData", res);
      if (res.code == "OK") {
        const banner = res.data;
        banner.forEach((item) => {
          if (typeof item.bannerImage === "string") {
            item.bannerImage = JSON.parse(item.bannerImage);
          }
        });
        this.setState({ bannerList: banner });
      }
    });

    this.getCategoryList(form, []);
  }

  getCategoryList = (params, list) => {
    getCategoryList(params).then((res: any) => {
      let newList = JSON.parse(JSON.stringify(list));
      if (res.code == "OK") {
        newList = newList.concat(res.data);
        if (!res.data.hasNextPage) {
          this.setState({ endPage: true });
        }
        this.setState({ loading: false, list: newList });
      }
    });
  };

  componentWillReact() {}

  toDeatilByCategoryId = (detail) => {
    setStore("teachDetail", detail);
    Taro.navigateTo({
      url: `/pages/detail_page/index?categoryId=${detail.id}`,
    });
  };

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
    this.getCategoryList(form, []);
  };

  render() {
    const { list, bannerList, form } = this.state;
    return (
      <View className="group_page" id="page">
        <AtSearchBar
          value={form.keyword}
          onChange={(e) => {
            return this.onInputChange(e);
          }}
          onActionClick={() => {
            return this.onActionClick();
          }}
        />
        <View>
          <View className="sub_title">热门推荐</View>
          <Swiper
            className="test-h"
            indicatorColor="#999"
            indicatorActiveColor="#333"
            indicatorDots
            autoplay
          >
            {bannerList.length > 0 &&
              bannerList.map((item) => {
                return (
                  <SwiperItem>
                    <Image
                      className="img_item"
                      key={item.id}
                      style="height:334rpx;width: 100%;"
                      src={item.bannerImage.file}
                    ></Image>
                  </SwiperItem>
                );
              })}
          </Swiper>
        </View>
        <View>
          <View className="sub_title">教学资源</View>
          {list.map((item) => {
            return (
              <View
                className="list_warp"
                onClick={() => {
                  return this.toDeatilByCategoryId(item);
                }}
              >
                <Image
                  className="list_img"
                  mode="aspectFill"
                  src={item.bannerImage}
                ></Image>
                <View className="list_info">
                  <View>{item.subhead}</View>
                  <View className="list_title">{item.title}</View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default _page;
