import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Button, Canvas, RichText, ScrollView } from "@tarojs/components";
import { getTrackDetailByTrackId, favoriteNew } from "@/api/detail";
import { getStore } from "@/utils/utils";
import share from '@/images/card/tab_share.png'
import collect from '@/images/card/tab_collect.png'
import collected from '@/images/card/card_collect_active.png'


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
        trackId: null

    };

    componentWillMount() {
        console.log(this.$router.params)
        const { trackId } = this.$router.params
        const detail = getStore('trackDetail')
        this.setState({
            trackId: Number(trackId),
            detail_info: detail
        })
    }

    componentDidMount() {


    }

    componentDidShow() {
        const { trackId } = this.state
        getTrackDetailByTrackId({ trackId }).then((res: any) => {
            console.log('tracklist', res)
            if (res.code == 'OK') {
                this.setState({ detail_info: res.data })
            }

        })
    }


    componentWillReact() { }


    join = () => {
        const { trackId, detail_info } = this.state
        Taro.navigateTo({
            url: `/pages/join_page/index?trackingId=${trackId}&title=${detail_info.title}&title_en=${detail_info.titleEn}`,
        });

    }

    doCollect = () => {
        const { detail_info } = this.state
        const newsId = detail_info.id
        favoriteNew({ newsId }).then(res => {
            if (res.code == 'OK') {
                const data = detail_info
                data.isFavorite = !data.isFavorite
                this.setState({ detail_info: data })
                Taro.showToast({
                    title: res.message,
                    icon: 'success'
                })
            }
        })
    }

    render() {
        const { detail_info } = this.state
        return (
            <View className='theme-wrap'>
                <ScrollView scrollY style={{ height: 'calc(100vh - 130rpx)' }}>
                    <View className='banner_warp'>
                        <Image className='banner_image' src={detail_info.bannerImage}></Image>
                    </View>
                    <View className='theme_body_wrap'>
                        <View className='theme_body_title'>
                            <View>{detail_info.title}</View>
                            <View className='title_en'>{detail_info.titleEn}</View>
                        </View>
                        <View className='favorite_wrap'>
                            <View className='favorite_item border'>
                                <View className='num'>{detail_info.viewNum}</View>
                                <View>浏览</View>
                            </View>
                            <View className='favorite_item border'>
                                <View className='num'>{detail_info.favoriteNum}</View>
                                <View>收藏</View>
                            </View>
                            <View className='favorite_item'>
                                <View className='num'>{detail_info.joinNum}</View>
                                <View>已报名</View>
                            </View>
                        </View>
                        <View className='theme_intro_wrap'>
                            <View className='theme_subTitle'>时间地点</View>
                            <View className='body_time'>{detail_info.startTime} ~ {detail_info.endTime}</View>
                            <View className='body_address'>{detail_info.address}</View>
                        </View>
                        <View>
                            <View className='theme_subTitle'>活动详情</View>
                            <RichText nodes={detail_info.content}></RichText>
                        </View>

                    </View>

                    <View className='fixButtom'>
                        <View className='fix_btn_group' onClick={() => this.doCollect()}>
                            <Image className='fix_btn_img' src={detail_info.isFavorite ? collected : collect}></Image>
                            <View>收藏</View>
                        </View>
                        <View className='fix_btn_group'>
                            <Image className='fix_btn_img' src={share}></Image>
                            <Button className='fix_btn_share' openType='share'>分享</Button>
                        </View>
                        <View className='fix_btn' onClick={() => { this.join() }}>立即报名</View>
                    </View>
                </ScrollView>


            </View>

        );
    }
}

export default _page;
