/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { AtCard } from "taro-ui"
import { View, ScrollView, Image, Text } from "@tarojs/components";
import { arrow } from "@/images/load";

import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  [propName: string]: any;
};

interface ItemView {
  props: ComponentsProps;
  state: StateType;
}

class ItemView extends Component {
  static defaultProps: ComponentsProps = {
    title: "",
  };

  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,
    list: [
      {
        name: '1',
        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg'
      },
      {
        name: '2',
        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg'
      },
      {
        name: '3',
        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg'
      }
    ]
  };

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() { }

  componentWillReact() { }

  render() {
    const { title } = this.props;
    const { list } = this.state
    return <View >
      <AtCard title={title} extra='查看全部' isFull>
        <View>
          <ScrollView scrollX className="horizontalBox" scrollLeft={0} scrollWithAnimation>
            {
              list.map((item, index) => (
                <View key={index} className="img_item">
                  <Image src={item.url} style='height:200px' />
                  <Text>{item.name}</Text>

                </View>
              ))
            }

          </ScrollView>
        </View>
      </AtCard>
    </View>;
  }
}

export default ItemView;
