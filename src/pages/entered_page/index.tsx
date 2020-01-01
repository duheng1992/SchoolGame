/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { getUserJoinList } from "@/api/personal";
import "./index.scss";

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
  };

  componentWillMount() {
    console.log(this.$router.params);
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {
    getUserJoinList().then((res: any) => {
      if (res.code == 'OK') {
        const list = res.data
        this.setState({ list })
      }
    })
  }

  componentWillReact() { }










  render() {
    const { list } = this.state;
    return (
      <View className="page" >
        {list.length > 0 && list.map(item => (
          <View>
            <Image src=''></Image>
          </View>
        ))}
      </View>
    );
  }
}

export default _page;
