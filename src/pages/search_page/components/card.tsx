/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { AtCard } from "taro-ui"
import { View, ScrollView, Image, Text } from "@tarojs/components";
import eye from "@/images/card/card_eye.png"
import comment from "@/images/card/card_comment.png"
import praise from "@/images/card/card_praise.png"

import "./card.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  data: any;
  onTapCard: Function
};

interface DetailCard {
  props: ComponentsProps;
  state: StateType;
}

class DetailCard extends Component {
  static defaultProps: ComponentsProps = {
    data: {},
    onTapCard: () => { }
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

  render() {
    const { data, onTapCard } = this.props;
    return <View className="detail_card" onClick={() => onTapCard()}>
      <Image mode="center" className="detail_img" src={data.bannerImage}></Image>
      <View className='card_title'>{data.title}</View>
    </View>;
  }
}

export default DetailCard;
