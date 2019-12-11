import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button, Image, Text } from "@tarojs/components";
import { getUrlParam } from "@/utils/utils";
import { WebView_domain, baseUrl, image_domain } from "@/config/baseUrl";
//image
import { tusiji } from "@/images/load";
//image

import "./index.scss";

class _page extends Component {
  constructor(props) {
    super(props);
    // const token = getStore('userToken');
    this.state = {
      // token,
      id: "",
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {
    console.log("离开页面");
  }

  componentDidHide() {}

  componentDidShow() {
    let { id } = getUrlParam();
    if (!id) {
      Taro.showToast({
        title: "缺少参数,这里将参数设置为默认",
        icon: "none",
      });
      id = id || "3";
    }
    const _this = this;
    console.log(id);
    _this.setState({
      id,
    });
  }

  componentWillReact() {}

  config: Config = {
    navigationBarTitleText: "PageDemo",
    navigationBarBackgroundColor: "#62A8FA",
  };

  render() {
    const { id }: any = this.state;
    return (
      <View className="page">
        这里是demo页面
        <Button>这里是demo页面 Button {id}</Button>
        <Text className="text">这里是demo页面 Text</Text>
        <Image mode="widthFix" src={tusiji} />
        <View className="base_router">
          <View className="text">
            <Text className="name">image_domain :</Text>
            {image_domain}
          </View>
          <View className="text">
            <Text className="name">WebView_domain :</Text> {WebView_domain}
          </View>
          <View className="text">
            <Text className="name">baseUrl : </Text>
            {baseUrl}
          </View>
        </View>
      </View>
    );
  }
}

export default _page;
