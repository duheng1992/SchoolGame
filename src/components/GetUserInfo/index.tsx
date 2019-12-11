import Taro from "@tarojs/taro";
import { Button } from "@tarojs/components";
import "./index.scss";

interface Props {
  getUserInfo: Function;
}

class Components_demo extends Taro.Component<Props> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentWillReact() {}

  componentDidHide() {}

  static externalClasses = ["my-class"];

  onAuthConfirmClick = (e) => {
    const { getUserInfo } = this.props;
    getUserInfo(e);
  };

  render() {
    return (
      <Button
        className="buttonClear my-class"
        openType="getUserInfo"
        onGetUserInfo={this.onAuthConfirmClick}
      >
        {this.props.children}
      </Button>
    );
  }
}
export default Components_demo;
