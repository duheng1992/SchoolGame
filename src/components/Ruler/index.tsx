import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  dic: any;
  reference: {
    list: Array<any>;
    value: Number;
    value_ra: Number;
  };
  valueColor?: any;
  [propName: string]: any;
};

interface Ruler {
  props: ComponentsProps;
  state: StateType;
}

class Ruler extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,
  };

  render() {
    const { dic, reference, valueColor } = this.props;
    if (reference && reference.list) {
      //
    } else {
      return <View></View>;
    }
    const { list, value, value_ra } = reference;

    return (
      <View className="wrapper">
        <View className="numBox" style={{ left: `${value_ra}%` }}>
          {value}
          {dic.unit}
          <View className="triangleBox">
            <View className="triangle"></View>
          </View>
        </View>
        <View className="ruler">
          {list.map((item, index) => {
            return (
              <View
                key={index}
                className="item"
                style={{ backgroundColor: item.bgColor }}
              >
                {item.des}
                {index > 0 && (
                  <View
                    className="value"
                    style={{
                      color: valueColor || "#fff",
                    }}
                  >
                    {item.min}
                    {dic.unit}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default Ruler;
