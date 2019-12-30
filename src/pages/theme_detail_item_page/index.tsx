import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import Avatar from '@/components/Avactar/index'
import { getThemeDetailDiscussDetailByDiscussId } from "@/api/detail";
import praise from '@/images/card/card_praise.png'
import eye from '@/images/card/card_eye.png'

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
import { AtButton } from "taro-ui";

@inject("tabBarStore")
@observer
class _page extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    state: StateType = {
        // token,
        discussId: [],
        list: {}

    };

    componentWillMount() {
        console.log(this.$router.params)
        const { discussId } = this.$router.params
        this.setState({
            discussId: Number(discussId),
        })
    }

    componentDidMount() {


    }

    componentDidShow() {
        const { discussId } = this.state
        getThemeDetailDiscussDetailByDiscussId({ discussId }).then(res => {
            console.log('res', res);
            const list = res.data
            list.commentImage = res.data ? JSON.parse(res.data.commentImage) : []
            this.setState({
                list
            })

        })
    }


    componentWillReact() { }




    render() {
        const { list } = this.state
        return (
            <View className='wrap'>
                <ScrollView scrollY style={{ height: '100vh' }}>
                    <Avatar subTitle={list.createTime} title={list.nickName} avatar={list.avatar} type='discuss'></Avatar>
                    <View>
                        {list.content}
                    </View>
                    <View className='comment_image_list'>
                        {
                            list.commentImage && list.commentImage.map(item => (<Image className='comment_image' src={item.file}></Image>))
                        }
                    </View>
                    <View>
                        <View className='list_butten_group'>
                            <AtButton className='list_btn save_btn'>保存图片</AtButton>
                            <AtButton className='list_btn' openType='share'>分享至微信</AtButton>
                            <AtButton className='list_btn'>复制链接</AtButton>
                        </View>
                        <View className='theme_commit_wrap'>
                            <View className='commit_wrap'>
                                <Image className='icon' src={praise}></Image>
                                <View className='num'>{list.praiseNum}</View>
                            </View>
                            <View className='commit_wrap'>
                                <Image className='icon' src={eye}></Image>
                                <View className='num'>{list.viewNum}</View>
                            </View>

                        </View>
                    </View>

                </ScrollView>


            </View>

        );
    }
}

export default _page;
