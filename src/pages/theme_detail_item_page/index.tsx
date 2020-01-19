import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, ScrollView, Canvas, Button } from "@tarojs/components";
import Avatar from "@/components/Avactar/index";
import {
  getThemeDetailDiscussDetailByDiscussId,
  favoriteCommit,
  praiseCommit,
  focusUser,
} from "@/api/detail";
import praise from "@/images/card/comment_praise.png";
import collect from "@/images/card/card_collect.png";

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
import { AtButton } from "taro-ui";
import { drawImage, saveCard } from "@/utils/utils";
import qrcode from "@/images/card/qrcode.jpeg";

@inject("tabBarStore")
@observer
class _page extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,
    discussId: [],
    list: {},
    showCanvasPage: false,
    themeId: null,
  };

  componentWillMount() {
    console.log(this.$router.params);
    const { discussId, themeId, bannerImage, title } = this.$router.params;
    this.setState({
      discussId: Number(discussId),
      themeId: Number(themeId),
      bannerImage,
      title,
    });
  }

  componentDidMount() {}

  componentDidShow() {
    const { discussId } = this.state;
    getThemeDetailDiscussDetailByDiscussId({ discussId }).then((res) => {
      console.log("res", res);
      const list = res.data;
      list.commentImage = res.data ? JSON.parse(res.data.commentImage) : [];
      this.setState({
        list,
      });
    });
  }

  componentWillReact() {}

  saveImage = () => {
    this.setState({ showCanvasPage: true });
    const { pdfPageNum, viewNum, bannerImage, title, list } = this.state;
    const item_info = {
      pdfPageNum,
      viewNum,
      bannerImage,
      title: list.content,
    };
    drawImage(item_info, qrcode);
  };

  favoriteCommit = () => {
    const { themeId, list } = this.state;
    const data = list;
    favoriteCommit({ themeId }).then((res) => {
      if (res.code == "OK") {
        data.isFavorite = !data.isFavorite;
        data.isFavorite ? (data.favoriteNum += 1) : (data.favoriteNum -= 1);
        this.setState({ list: data });
        Taro.showToast({
          title: res.message,
          icon: "success",
        });
      }
    });
  };

  praiseCommit = () => {
    const { list } = this.state;
    praiseCommit({ newsId: list.id }).then((res) => {
      if (res.code == "OK") {
        const data = list;
        data.isPraise = !data.isPraise;
        if (data.isPraise) {
          data.praiseNum += 1;
        } else {
          data.praiseNum -= 1;
        }
        this.setState({ list: data });
        Taro.showToast({
          title: res.message,
          icon: "success",
        });
      }
    });
  };

  focusClick = (item) => {
    const { id } = item;
    const { list } = this.state;
    focusUser({ discussId: id }).then((res: any) => {
      if (res.code == "OK") {
        const data = list;
        data.isFollow = !data.isFollow;
        this.setState({ list: data });
        Taro.showToast({
          title: res.message,
          icon: "success",
        });
      }
    });
  };

  render() {
    const { list, showCanvasPage } = this.state;
    return (
      <View>
        <View className="wrap">
          <Avatar
            subTitle={list.createTime}
            title={list.nickName}
            isfocus={list.isFollow}
            focus
            focusClick={() => {
              this.focusClick(list);
            }}
            avatar={list.avatar}
            type="discuss"
          ></Avatar>
          <View className="comment_content">
            <View className="theme_word">#{list.themeTitle}#</View>
            <View>{list.content}</View>
          </View>
          <View className="comment_image_list">
            {list.commentImage &&
              list.commentImage.map((item) => {
                return (
                  <Image
                    mode="aspectFit"
                    className="comment_image"
                    src={item.url}
                  ></Image>
                );
              })}
          </View>
          <View>
            <View className="list_butten_group">
              <AtButton
                className="list_btn save_btn"
                onClick={() => {
                  return this.saveImage();
                }}
              >
                保存图片
              </AtButton>
              <AtButton className="list_btn" openType="share">
                分享至微信
              </AtButton>
              {/* <AtButton className='list_btn'>复制链接</AtButton> */}
            </View>
            <View className="theme_commit_wrap">
              <View
                className="commit_wrap"
                onClick={() => {
                  return this.favoriteCommit();
                }}
              >
                <Image className="icon" src={collect}></Image>
                <View className="num">{list.favoriteNum}</View>
              </View>
              <View
                className="commit_wrap"
                onClick={() => {
                  return this.praiseCommit();
                }}
              >
                <Image className="icon" src={praise}></Image>
                <View className="num">{list.praiseNum}</View>
              </View>
            </View>
          </View>
        </View>

        {showCanvasPage && (
          <View className="canvas-wrap">
            <Canvas
              id="card-canvas"
              style="width: 320px; height: 600px"
              canvasId="cardCanvas"
            ></Canvas>
            <View className="btn_group">
              <Button
                className="btn-save"
                onClick={() => {
                  return saveCard();
                }}
              >
                保存图片
              </Button>
              <Button
                className="btn-close"
                onClick={() => {
                  return this.setState({ showCanvasPage: false });
                }}
              >
                关 闭
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default _page;
