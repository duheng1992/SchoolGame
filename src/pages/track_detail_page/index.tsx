import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Button, Canvas, Text, ScrollView } from "@tarojs/components";
import Avatar from '@/components/Avactar/index'
import Discuss from '@/components/Discuss/index'
import { getThemeDetailByThemeId, getThemeDetailDiscussByThemeId } from "@/api/detail";
import { getStore } from "@/utils/utils";
import Favorite from '@/images/tab_bar/home.png'
import Favorited from '@/images/tab_bar/home-active.png'

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

import { observer, inject } from "@tarojs/mobx";

@inject("tabBarStore")
@observer
class _page extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    state: StateType = {
        // token,
        detail_info: {},
        discuss: []

    };

    componentWillMount() {
        console.log(this.$router.params)
        const { themeId } = this.$router.params
        const detail = getStore('themeDetail')
        this.setState({
            themeId: Number(themeId),
            detail_info: detail
        })
    }

    componentDidMount() {


    }

    componentDidShow() {
        const { themeId } = this.state
        getThemeDetailByThemeId({ themeId }).then(res => {
            console.log('res', res);

        })
        getThemeDetailDiscussByThemeId({ themeId }).then(res => {
            console.log('discuss', res)
            const data = [{
                "commentImage": "",
                "content": "最近天气阴雨绵绵，室外体育课已经最近天气阴雨绵绵，室外体育课已经成为主要…",
                "createTime": "2019.10.23",
                "favoriteNum": 0,
                "id": 0,
                "isFavorite": false,
                "isFollow": false,
                "isPraise": false,
                "praiseNum": 0,
                "themeId": 0,
                "themeTitle": "",
                "userId": 0,
                "viewNum": 0
            }]
            this.setState({ discuss: data })
        })
    }


    componentWillReact() { }

    config: Config = {
        navigationBarBackgroundColor: "#FFFFFF",
    };

    onTapFab = () => {
        console.log('fab');

    }

    render() {
        const { detail_info, discuss } = this.state
        return (
            <View className='theme-wrap'>
                <ScrollView scrollY style={{ height: '100vh' }}>
                    <View className='banner_warp'>
                        <Image className='banner_image' src={detail_info.bannerImage}></Image>
                        <View className='theme_title_warp'>
                            <View className='theme_title'>{detail_info.title}</View>
                            <View className='theme_joinNum'>{detail_info.joinNum}人参与·热门</View>
                        </View>
                    </View>
                    <View className='theme_body_wrap'>
                        <Avatar></Avatar>
                        <View className='theme_body_title'>
                            <View>{detail_info.title}</View>
                            <View className='favorite'>
                                <Image className='favorite_img' src={detail_info.isFavorite ? Favorited : Favorite}></Image>
                            </View>
                        </View>
                        <View className='theme_intro_wrap'>
                            <View className='theme_subTitle'>话题简介</View>
                            <View className='body_info'>{detail_info.intro}</View>
                        </View>
                        <View>
                            <View className='theme_subTitle'>话题时间</View>
                            <View className='body_info'>{detail_info.startTime}至{detail_info.endTime}</View>
                        </View>

                    </View>
                    <View className='discuss_wrap'>
                        {
                            discuss.length > 0 && discuss.map(item => (
                                <Discuss detail={item} title={detail_info.title}></Discuss>
                            ))
                        }

                    </View>
                    <View onClick={() => this.onTapFab()} className='fab_btn'>发布</View>
                </ScrollView>


            </View>

        );
    }
}

export default _page;
