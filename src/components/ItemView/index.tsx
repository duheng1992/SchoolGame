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

  onClick(id: string): void;
  list: any;
  title: string;
  note: string;
  onTapGrunp(): void;
};

interface ItemView {
  props: ComponentsProps;
  state: StateType;
}

class ItemView extends Component {
  static defaultProps: ComponentsProps = {
    list: [],
    title: '',
    note: '',
    onTapGrunp: () => { },
    onClick: () => { }
  }

  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,

  };

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() { }

  componentWillReact() { }
  goToDetail = (e) => {
    const { onClick } = this.props
    onClick(e.name)
  }

  render() {
    const { title, list, note, onTapGrunp } = this.props;
    return <View className='itemView-wrapper'>

      <View className='card'>
        <View className='card-info' onClick={() => onTapGrunp()}>
          <View className="title">{title}</View>
          <View className="extra">查看全部</View>
        </View>
        <View className="note">{note}</View>
      </View>
      <View>
        <ScrollView scrollX className="horizontalBox" scrollLeft={0} scrollWithAnimation>
          {
            list.map((item, index) => (
              <View key={index} className="img_item" onClick={() => this.goToDetail(item)}>
                <Image src={item.url} style='height:253px' />
                <Text>{item.name}</Text>

              </View>
            ))
          }

        </ScrollView>
      </View>
    </View>;
  }
}

export default ItemView;
