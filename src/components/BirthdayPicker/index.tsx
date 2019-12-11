/* eslint-disable react/no-unused-state */
import Taro from "@tarojs/taro";
import { View, PickerView, PickerViewColumn } from "@tarojs/components";
import "./index.scss";

type ComponentsProps = {
  onChange: Function;
};

type StateType = {
  [propsName: string]: any;
};

interface MyPicker {
  props: ComponentsProps;
  state: StateType;
}

class MyPicker extends Taro.Component {
  constructor() {
    super();
    const date = new Date();
    const years: Array<number> = [];
    const months: Array<number> = [];
    const days: Array<number> = [];

    for (let i = 1940; i <= date.getFullYear(); i++) {
      years.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    this.state = {
      year: 1990,
      month: 1,
      day: 1,
      years,
      months,
      days,
      value: [50, 8, 8],
    };
  }

  static externalClasses = ["my-class"];

  onChange = (e) => {
    const val = e.detail.value;

    const year = this.state.years[val[0]];
    const month = this.state.months[val[1]];
    const day = this.state.days[val[2]];

    // const date = `${year}-${month}-${day}`;

    // const newDate = new Date(date).getDate();

    // const num = 31 - (newDate - 1 - val[2]) - 31;
    // if (num !== 0) {
    //   val[2] = num - 1;
    //   day = num;
    // }

    this.setState(
      {
        year,
        month,
        day,
        value: val,
      },
      () => {
        this.props.onChange(`${year}-${month}-${day}`);
      },
    );
  };

  render() {
    return (
      <View className="wrapper">
        <PickerView
          className="PickerView"
          value={this.state.value}
          onChange={this.onChange}
        >
          <PickerViewColumn>
            {this.state.years.map((item, index) => {
              return <View key={index}>{item}年</View>;
            })}
          </PickerViewColumn>
          <PickerViewColumn>
            {this.state.months.map((item, index) => {
              return <View key={index}>{item}月</View>;
            })}
          </PickerViewColumn>
          <PickerViewColumn>
            {this.state.days.map((item, index) => {
              return <View key={index}>{item}日</View>;
            })}
          </PickerViewColumn>
        </PickerView>
      </View>
    );
  }
}
export default MyPicker;
