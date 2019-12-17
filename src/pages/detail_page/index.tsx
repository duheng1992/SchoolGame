/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { getDetailData } from "@/api/detail"
// import "./index.scss";

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
    categoryId: null
  };

  componentWillMount() {
    console.log(this.$router.params)
    const { categoryId } = this.$router.params;
    this.setState({ categoryId })
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {
    const { categoryId } = this.state
    getDetailData({ categoryId }).then(res => {
      console.log('res', res)
    })
  }

  componentWillReact() { }

  render() {

    return (
      <View className="page" id="page">
        <View>
          {/* <Image src={}></Image> */}
        </View>
      </View>
    );
  }
}

export default _page;
