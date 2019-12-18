/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { AtCard } from "taro-ui"
import { View, ScrollView, Image, Text } from "@tarojs/components";
import eye from "@/images/card/card_eye.png"
import comment from "@/images/card/card_comment.png"
import praise from "@/images/card/card_praise.png"

import "./index.scss";

type StateType = {
    [propName: string]: any;
};

type ComponentsProps = {
    data: any;
};

interface DetailCard {
    props: ComponentsProps;
    state: StateType;
}

class DetailCard extends Component {
    static defaultProps: ComponentsProps = {
        data: {}
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
        const { data } = this.props;
        return <View className="detail_card">
            <Image mode="center" className="detail_img" src={data.bannerImage}></Image>
            <View className='card_title'>{data.title}</View>
            <View className="card_nums">
                <View className="card_num"><Image className='card_icon' src={eye}></Image>{data.viewNum}</View>
                <View className="card_num"><Image className='card_icon' src={comment}></Image>{data.praiseNum}</View>
                <View className="card_num"><Image className='card_icon' src={praise}></Image>{data.favoriteNum}</View>
            </View>
        </View>;
    }
}

export default DetailCard;
