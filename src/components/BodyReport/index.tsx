/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, Image, Progress } from "@tarojs/components";
import { homeData_filter } from "@/assets/data/filter";
import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  data: {};
  click?: Function;
};

interface BodyReport {
  props: ComponentsProps;
  state: StateType;
}

class BodyReport extends Component {
  static defaultProps = {};

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

  goToDetail = (item) => {
    const { click } = this.props;
    if (click) {
      click(item);
    }
  };

  render() {
    const { data } = this.props;
    const list = homeData_filter(data);

    return (
      <View className="wrapper">
        <View className="listBox">
          {list.map((item, index) => {
            return (
              <View
                className="item"
                key={index}
                onClick={() => {
                  this.goToDetail(item);
                }}
              >
                <View className="icon">
                  <Image className="img" mode="widthFix" src={item.icon} />
                </View>
                <View className="label">{item.label}</View>
                <View className="value">
                  {item.value}
                  {item.unit}
                </View>
                {index % 2 ? (
                  <View>
                    <View className="range green">
                      <Progress
                        percent={item.ratio}
                        border-radius="100"
                        activeColor="#97AB9F"
                      />
                    </View>
                    <View className="rangeStr green">{item.str}</View>
                  </View>
                ) : (
                  <View>
                    <View className="range red">
                      <Progress
                        percent={item.ratio}
                        border-radius="100"
                        activeColor="#D5A59E"
                      />
                    </View>
                    <View className="rangeStr red">{item.str}</View>
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

export default BodyReport;
