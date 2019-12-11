/* eslint-disable react/no-unused-state */
import Taro from "@tarojs/taro";
import { View, PickerView, PickerViewColumn } from "@tarojs/components";
import "./index.scss";

type listObj = {
  value: number | string;
  label: number | string;
};

type ComponentsProps = {
  onChange: Function;
  list: Array<listObj>;
};

type StateType = {
  [propsName: string]: any;
};

interface MyPicker {
  props: ComponentsProps;
  state: StateType;
}

class MyPicker extends Taro.Component {
  static externalClasses = ["my-class"];

  constructor(props) {
    super(props);
    const { list } = props;
    if (list && list.length) {
      const number = Math.floor(list.length / 3);
      this.state = {
        value: [number],
      };
    }
  }

  onChange = (e) => {
    const value = e.target.value;
    this.setState({ value }, () => {
      this.props.onChange(this.props.list[value[0]]);
    });
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
            {this.props.list.map((item) => {
              return <View key={item.value}>{item.label}</View>;
            })}
          </PickerViewColumn>
        </PickerView>
      </View>
    );
  }
}
export default MyPicker;
