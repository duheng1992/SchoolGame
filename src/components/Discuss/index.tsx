import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import Avatar from "@/components/Avactar/index";
import praise from "@/images/card/card_praise.png";
import eye from "@/images/card/card_eye.png";
import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  detail: any;
  title: string;
  onClick: Function;
  onTapPraise: Function;
  type: string;
};

interface _page {
  props: ComponentsProps;
  state: StateType;
}

import { observer, inject } from "@tarojs/mobx";

@inject("tabBarStore")
@observer
class _page extends Component {
  static defaultProps: ComponentsProps = {
    detail: {
      commentImage: "",
    },
    title: "",
    onClick: () => {},
    type: "default",
  };

  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,
  };

  componentWillMount() {}

  componentDidMount() {}

  componentDidShow() {}

  componentWillReact() {}

  config: Config = {
    navigationBarBackgroundColor: "#FFFFFF",
  };

  render() {
    const { detail, title, onClick, type, onTapPraise } = this.props;
    const commentImage =
      detail.commentImage && detail.commentImage !== ""
        ? JSON.parse(detail.commentImage)
        : [];
    return (
      <View className="discuss_wrap">
        <Avatar
          subTitle={detail.createTime}
          title={detail.nickName}
          avatar={detail.avatar}
          type="discuss"
        ></Avatar>
        <View>
          <View
            onClick={() => {
              return onClick();
            }}
          >
            <View className="discuss_content">
              {title !== "" && <View className="theme_word">#{title}#</View>}

              {detail.content}
            </View>
            <View className="commit_image">
              {commentImage.map((item, index) => {
                if (index < 3) {
                  return (
                    <Image className="commit_img_url" src={item.url}></Image>
                  );
                }
              })}
            </View>
          </View>
          {type == "default" && (
            <View className="theme_commit_wrap">
              <View className="commit_wrap">
                <Image className="icon" src={eye}></Image>
                <View className="num">{detail.viewNum}</View>
              </View>
              <View
                className="commit_wrap"
                onClick={() => {
                  return onTapPraise();
                }}
              >
                <Image className="icon" src={praise}></Image>
                <View className="num">{detail.praiseNum}</View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default _page;
