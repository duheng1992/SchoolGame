import Taro, { Component, Config } from "@tarojs/taro";
import {
  View,
  RichText,
  ScrollView,
} from "@tarojs/components";
import { getVigorousDetailByVigorousId, favoriteNew } from "@/api/detail";
import { getStore } from "@/utils/utils";

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
    vigorousId: null,
  };

  componentWillMount() {
    console.log(this.$router.params);
    const { vigorousId } = this.$router.params;
    const detail = getStore("vigorousDetail");
    this.setState({
      vigorousId: Number(vigorousId),
      detail_info: detail,
    });
  }


  config: Config = {
    navigationBarTitleText: ' ',
  };

  componentDidMount() { }

  componentDidShow() {
    const { vigorousId } = this.state;
    getVigorousDetailByVigorousId({ vigorousId }).then((res: any) => {
      console.log("vigorouslist", res);
      if (res.code == "OK") {
        const data = res.data;
        data.content = data.content.replace(
          "<img ",
          '<img style="max-width:100%;height:auto"',
        );
        this.setState({ detail_info: data });
      }
    });
  }

  componentWillReact() { }


  render() {
    const { detail_info } = this.state;
    return (
      <View className="theme-wrap">
        <ScrollView scrollY style={{ height: "calc(100vh - 130rpx)" }}>

          <View className="theme_body_wrap">
            <View className="theme_body_title">
              <View>{detail_info.title}</View>
              <View className="title_en">{detail_info.titleEn}</View>
            </View>

            <View>
              <RichText nodes={detail_info.content}></RichText>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default _page;
