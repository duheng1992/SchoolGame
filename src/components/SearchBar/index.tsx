import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "./index.scss";

import { tab_bar } from "@/images/load";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  path: string;
  onTapSearchBar(): void
};

interface SearchBar {
  props: ComponentsProps;
  state: StateType;
}

class SearchBar extends Component {
  static defaultProps: ComponentsProps = {
    path: "",
    onTapSearchBar: () => { }
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  state: StateType = {};

  render() {
    const { onTapSearchBar } = this.props
    return (
      <View className="SearchBar-wrapper" >
        <View className="SearchBar" onClick={() => onTapSearchBar()}>
          搜索精彩内容
        </View>
      </View>
    );
  }
}

export default SearchBar;
