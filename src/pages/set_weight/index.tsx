import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "./index.scss";
import Ruler_range from "@/components/Ruler_range";
import { rule_opt_icon } from "@/images/load";

import { filter_rule } from "@/assets/data/filter";

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
    opt_active: "jz",
    optList: [
      {
        name: "jz",
        cover: rule_opt_icon.jz,
        cover_active: rule_opt_icon.jz_active,
      },
      {
        name: "ph",
        cover: rule_opt_icon.ph,
        cover_active: rule_opt_icon.ph_active,
      },
      {
        name: "zj",
        cover: rule_opt_icon.zj,
        cover_active: rule_opt_icon.zj_active,
      },
    ],
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {}

  componentWillReact() {}

  config: Config = {
    navigationBarBackgroundColor: "#F0E8DF",
  };

  goToNext = () => {
    Taro.navigateTo({
      url: "/pages/xxx/xxxx",
    });
  };

  opt_change = (item) => {
    this.setState({
      opt_active: item.name,
    });
  };

  render() {
    const { optList, opt_active } = this.state;
    return (
      <View className="page">
        <View className="header">
          <View className="title">请选择目标</View>
          <View className="des">根据你的身高体重 建议你可以尝试增肌</View>
          <View className="optList">
            {optList.map((item) => {
              return (
                <View
                  className="opt-item"
                  key={item.name}
                  onClick={() => {
                    this.opt_change(item);
                  }}
                >
                  <Image
                    className="op-icon"
                    mode="widthFix"
                    src={
                      item.name === opt_active ? item.cover_active : item.cover
                    }
                  />
                </View>
              );
            })}
          </View>
        </View>
        <View className="contentBox">
          <View className="title">设置{filter_rule(opt_active)}目标</View>
          <View className="cont">
            <Ruler_range type={opt_active} />
          </View>
          <View className="footer">
            <AtButton className="" type="primary">
              确定
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}

export default _page;
