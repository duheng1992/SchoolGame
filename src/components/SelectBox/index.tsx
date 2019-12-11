import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";
import { AtFloatLayout } from "taro-ui";

type ComponentsProps = {
  children: any;
  onCancel?: Function;
  onOk?: Function;
  isShow: boolean;
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

  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  cancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  ok = () => {
    if (this.props.onOk) {
      this.props.onOk();
    }
  };

  handleClose = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  render() {
    const { isShow } = this.props;
    return (
      <AtFloatLayout
        isOpened={isShow}
        className="FloatLayout"
        onClose={this.handleClose.bind(this)}
      >
        <View className="SelectBox">
          <View className="btnBox">
            <View className="cancel" onClick={this.cancel}>
              取消
            </View>
            <View className="ok" onClick={this.ok}>
              确定
            </View>
          </View>
          {this.props.children}
        </View>
      </AtFloatLayout>
    );
  }
}
export default MyPicker;
