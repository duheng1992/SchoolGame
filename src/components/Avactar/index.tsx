import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Button, Canvas, Text, ScrollView } from "@tarojs/components";
import { AtFab } from 'taro-ui'
import "./index.scss";


type StateType = {
    [propName: string]: any;
};

type ComponentsProps = {
    title?:string;
    subTitle?:string;
    type?:string;
    avatar?:string;
};

interface _page {
    props: ComponentsProps;
    state: StateType;
}

import { observer, inject } from "@tarojs/mobx";

@inject("tabBarStore")
@observer
class _page extends Component {
    static defaultProps:ComponentsProps = {
        title: 'Nike 官方',
        subTitle: '发起了话题讨论',
        type:'default',
        avatar:''
    };

    constructor(props) {
        super(props);
    }

    state: StateType = {
        // token,
    };

    componentWillMount() { }

    componentDidMount() {


    }

    componentDidShow() {
    }


    componentWillReact() { }

    config: Config = {
        navigationBarBackgroundColor: "#FFFFFF",
    };



    render() {
        const { title,subTitle ,type,avatar} = this.props
        const avatar_img:any= type==='default'?'':avatar
        return (

            <View className='theme_avatar_wrap'>
                <Image className='theme_avatar' src={avatar_img}></Image>
                <View className='theme_title_wrap'>
                    <View className='theme_title_wrap'>{title}</View>
                    <View className='theme_start'>{subTitle}</View>
                </View>
            </View>

        );
    }
}

export default _page;
