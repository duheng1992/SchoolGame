import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import Avatar from "@/components/Avactar/index";
import Discuss from "@/components/Discuss/index";
import {
  getThemeDetailByThemeId,
  getThemeDetailDiscussByThemeId,
  FavoriteTheme,
  praiseCommit,
} from "@/api/detail";
import { getStore } from "@/utils/utils";
import Favorite from "@/images/card/tab_collect.png";
import Favorited from "@/images/card/card_collect_active.png";
import add from "@/images/card/add_photo.png";
import NavigatBar from "@/components/NavigatBar/index";

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

import { observer, inject } from "@tarojs/mobx";

@inject("tabBarStore")
@observer
class _page extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,
    detail_info: {},
    discuss: [],
  };

  config: Config = {
    navigationStyle: "custom",
  };

  componentWillMount() {
    console.log(this.$router.params);
    const { themeId } = this.$router.params;
    this.setState({
      themeId: Number(themeId),
    });
  }

  componentDidMount() {}

  componentDidShow() {
    const { themeId } = this.state;
    getThemeDetailByThemeId({ themeId }).then((res: any) => {
      console.log("res", res);
      if (res.code == "OK") {
        this.setState({ detail_info: res.data });
      }
    });
    getThemeDetailDiscussByThemeId({ themeId }).then((res: any) => {
      console.log("discuss", res);
      if (res.code == "OK") {
        const list = res.data.list;
        this.setState({ discuss: list });
      }
    });
  }

  componentWillReact() {}

  onTapFab = () => {
    const { themeId } = this.state;
    Taro.navigateTo({
      url: `/pages/release_page/index?themeId=${themeId}`,
    });
  };

  goToDetail = (item) => {
    console.log("item", item);
    const discussId = item.id;
    const { themeId, detail_info } = this.state;
    console.log("detail_info", detail_info);
    Taro.navigateTo({
      url: `/pages/theme_detail_item_page/index?discussId=${discussId}&themeId=${themeId}&bannerImage=${detail_info.bannerImage}&title=${detail_info.title}`,
    });
  };

  onFavorite = (themeId) => {
    FavoriteTheme({ themeId }).then((res: any) => {
      if (res.code == "OK") {
        const item = this.state.detail_info;
        item.isFavorite = !item.isFavorite;
        this.setState({ detail_info: item });
        Taro.showToast({
          title: res.message,
          icon: "success",
        });
      }
    });
  };

  navigatBack = () => {
    Taro.navigateBack();
  };

  praiseCommit = (id, index) => {
    const { discuss } = this.state;
    praiseCommit({ newsId: id }).then((res) => {
      if (res.code == "OK") {
        const data = discuss;
        console.log("data", data);
        const listItem = data[index];
        console.log("listItem", listItem);
        listItem.isPraise = !listItem.isPraise;
        if (listItem.isPraise) {
          listItem.praiseNum += 1;
        } else {
          listItem.praiseNum -= 1;
        }
        data[index] = listItem;
        this.setState({ discuss: data });
        Taro.showToast({
          title: res.message,
          icon: "success",
        });
      }
    });
  };

  render() {
    const { detail_info, discuss } = this.state;
    return (
      <View className="theme-wrap">
        <NavigatBar
          onClick={() => {
            this.navigatBack();
          }}
        ></NavigatBar>
        <ScrollView scrollY style={{ height: "100vh" }}>
          <View className="banner_warp">
            <Image
              className="banner_image"
              src={detail_info.bannerImage}
            ></Image>
            <View className="theme_title_warp">
              <View className="theme_title">{detail_info.title}</View>
              <View className="theme_joinNum">
                {detail_info.joinNum ? detail_info.joinNum : 0}人参与·热门
              </View>
            </View>
          </View>
          <View className="theme_body_wrap">
            <Avatar></Avatar>
            <View className="theme_body_title">
              <View>{detail_info.title}</View>
              <View
                className="favorite"
                onClick={() => {
                  return this.onFavorite(detail_info.id);
                }}
              >
                <Image
                  className="favorite_img"
                  src={detail_info.isFavorite ? Favorited : Favorite}
                ></Image>
              </View>
            </View>
            <View className="theme_intro_wrap">
              <View className="theme_subTitle">话题简介</View>
              <View className="body_info">{detail_info.intro}</View>
            </View>
            <View>
              <View className="theme_subTitle">话题时间</View>
              <View className="body_info">
                {detail_info.startTime}至{detail_info.endTime}
              </View>
            </View>
          </View>

          {discuss.length > 0 && (
            <View className="discuss_wrap">
              {discuss.length > 0 &&
                discuss.map((item, index) => {
                  return (
                    <Discuss
                      key={item.id}
                      detail={item}
                      title={detail_info.title}
                      onClick={() => {
                        return this.goToDetail(item);
                      }}
                      onTapPraise={() => {
                        return this.praiseCommit(item.id, index);
                      }}
                    ></Discuss>
                  );
                })}
            </View>
          )}

          <View
            onClick={() => {
              return this.onTapFab();
            }}
            className="fab_btn"
          >
            {" "}
            <Image className="add_img" src={add}></Image>发布
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default _page;
