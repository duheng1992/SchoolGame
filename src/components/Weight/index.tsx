/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { weight_img } from "@/images/load";

import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  num?: number;
  [propName: string]: any;
};

interface Weight {
  props: ComponentsProps;
  state: StateType;
}

class Weight extends Component {
  static defaultProps: ComponentsProps = {
    // num: 0,
  };

  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {}

  componentWillReact() {}

  viewFun = () => {
    const num = this.props.num;
    const returnObj = {
      num1: "",
      num2: "",
      num3: "",
      num4: "",
      num5: "",
    };

    if ((num || num === 0) && 999 - num > 0) {
      const str = num.toFixed(1);
      const Arr = str.split("");
      const val = Arr.reverse();
      for (let index = 0; index < 5; index++) {
        if (val[index]) {
          //
        } else {
          val.push("");
        }
      }
      for (let index = 0; index < val.length; index++) {
        const el = val[index];
        returnObj[`num${5 - index}`] = el;
      }
    }
    return returnObj;
  };

  render() {
    const { num1, num2, num3, num4, num5 } = this.viewFun();

    return (
      <View className="wrapper">
        <Image className="bg" mode="widthFix" src={weight_img.num_box} />
        {num1 && (
          <Image className="num num1" mode="widthFix" src={weight_img[num1]} />
        )}
        {num2 && (
          <Image className="num num2" mode="widthFix" src={weight_img[num2]} />
        )}
        {num3 && (
          <Image className="num num3" mode="widthFix" src={weight_img[num3]} />
        )}
        {num4 && <View className="dot" />}
        {num5 && (
          <Image className="num num5" mode="widthFix" src={weight_img[num5]} />
        )}
      </View>
    );
  }
}

export default Weight;
