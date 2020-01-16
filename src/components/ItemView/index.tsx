/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";

import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  onClick(id: string): void;
  list: any;
  title: string;
  note: string;
  type: string;
  onTapGrunp(): void;
};

interface ItemView {
  props: ComponentsProps;
  state: StateType;
}

class ItemView extends Component {
  static defaultProps: ComponentsProps = {
    list: [],
    title: "",
    note: "",
    type: "image",
    onTapGrunp: () => { },
    onClick: () => { },
  };

  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,
  };

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() { }

  componentWillReact() { }

  goToDetail = (e) => {
    const { onClick } = this.props;
    onClick(e.id);
  };

  render() {
    const { title, list, note, onTapGrunp, type } = this.props;
    const icon = "icon";
    const image = "image";
    return (
      <View className="itemView-wrapper">
        <View className="card">
          <View
            className="card-info"
            onClick={() => {
              return onTapGrunp();
            }}
          >
            <View className="title">{title}</View>
            <View className="extra">查看全部</View>
          </View>
          <View className="note">{note}</View>
        </View>
        <View>
          <ScrollView
            scrollX
            className="horizontalBox"
            scrollLeft={0}
            scrollWithAnimation
          >
            {
              {
                icon:
                  list.length > 0 &&
                  list.map((item) => {
                    return (
                      <View
                        key={item.id}
                        className="icon_item"
                        onClick={() => {
                          return this.goToDetail(item);
                        }}
                      >
                        <View className="icon_wrap">
                          <View>
                            <View className="title">{item.title}</View>
                            <View className="note">
                              {item.id ? item.subhead : ""}
                            </View>
                          </View>

                          <Image className="icon" src={item.iconImage} />
                        </View>
                      </View>
                    );
                  }),
                image:
                  list.length > 0 &&
                  list.map((item) => {
                    return (
                      <View
                        key={item.id}
                        className="img_item"
                        onClick={() => {
                          return this.goToDetail(item);
                        }}
                      >
                        <View className="image_wrap">
                          <Image
                            className="image"
                            mode="aspectFill"
                            src={item.bannerImage}
                          />
                          <View className="title">{item.title}</View>
                        </View>
                      </View>
                    );
                  }),
              }[type]
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ItemView;
