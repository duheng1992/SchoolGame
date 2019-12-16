import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "./index.scss";

import { tab_bar } from "@/images/load";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  tabBarStore: any;
};

interface TabBar {
  props: ComponentsProps;
  state: StateType;
}

import { observer, inject } from "@tarojs/mobx";
@inject("tabBarStore")
@observer
class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          pagePath: "/pages/home/index",
          // iconPath: "../images/tab_bar/home.png",
          // selectedIconPath: "../images/tab_bar/home-active.png",
          iconPath: tab_bar[0].iconPath,
          selectedIconPath: tab_bar[0].selectedIconPath,
          index: 0,
        },
        {
          pagePath: "/pages/personal/index",
          // iconPath: "../images/tab_bar/personal.png",
          // selectedIconPath: "../images/tab_bar/personal-active.png",
          iconPath: tab_bar[1].iconPath,
          selectedIconPath: tab_bar[1].selectedIconPath,
          index: 1,
        },
      ],
    };
  }

  state: StateType = {};

  switchTab = (e) => {
    const { item } = e.currentTarget.dataset;
    const url = item.pagePath;
    Taro.switchTab({ url });
  };

  render() {
    const { list } = this.state;
    const { tabBarStore } = this.props;
    const { tabIndex } = tabBarStore;

    return (
      <View className="wrapper">
        <View className="tabList">
          {list.map((item, index) => {
            return (
              <Image
                onClick={this.switchTab}
                className="tabTn"
                key={index}
                data-item={item}
                mode="widthFix"
                src={
                  item.index === tabIndex
                    ? item.selectedIconPath
                    : item.iconPath
                }
              />
            );
          })}
        </View>
      </View>
    );
  }
}

export default TabBar;
