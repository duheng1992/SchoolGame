import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, ScrollView, Canvas, Button } from "@tarojs/components";
import Avatar from '@/components/Avactar/index'
import { getThemeDetailDiscussDetailByDiscussId, favoriteCommit, praiseCommit, focusUser } from "@/api/detail";
import praise from '@/images/card/comment_praise.png'
import collect from '@/images/card/card_collect.png'

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
        list: {},
        showCanvasPage: false,
        themeId: null

    };

    componentWillMount() {
        console.log(this.$router.params)
        const { discussId, themeId } = this.$router.params
        this.setState({
            discussId: Number(discussId),
            themeId: Number(themeId)
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

    async drawImage() {
        // 创建canvas对象
        let ctx = Taro.createCanvasContext('cardCanvas')

        // 填充背景色
        let grd = ctx.createLinearGradient(0, 0, 1, 600)
        grd.addColorStop(0, '#FC4514')
        // grd.addColorStop(0.5, '#FFF')
        ctx.setFillStyle(grd)
        ctx.fillRect(0, 0, 500, 600)

        // 填充背景色
        let grd_in = ctx.createLinearGradient(0, 0, 1, 600)
        grd_in.addColorStop(0, '#fff')
        // grd.addColorStop(0.5, '#FFF')
        ctx.setFillStyle(grd_in)
        ctx.fillRect(15, 80, 292, 508)

        // // 绘制圆形用户头像
        const { item_info } = this.state
        let res = await Taro.downloadFile({
            url: item_info.bannerImage
        })
        console.log('res', res);


        ctx.save()
        ctx.beginPath()
        ctx.drawImage(res.tempFilePath, 15, 80, 292, 180)
        ctx.restore()

        // 绘制文字
        ctx.save()
        ctx.setFontSize(18)
        ctx.setFillStyle('black')
        ctx.fillText(item_info.title, 30, 300)
        ctx.restore()

        // 绘制文字
        ctx.save()
        ctx.setFontSize(14)
        ctx.setFillStyle('#999')
        ctx.fillText(`${item_info.title} · ${item_info.pdfPageNum}页 · 已有${item_info.viewNum}人查看`, 30, 325)
        ctx.restore()

        ctx.lineTo(30, 292)
        ctx.moveTo(30, 345)
        ctx.setStrokeStyle('#red')
        ctx.stroke()

        // 绘制文字
        ctx.save()
        ctx.setFontSize(18)
        ctx.setFillStyle('black')
        ctx.fillText('课程简介', 30, 300)
        ctx.restore()

        // 绘制文字
        ctx.save()
        ctx.setFontSize(14)
        ctx.setFillStyle('#999')
        ctx.fillText(`${item_info.title} · ${item_info.pdfPageNum}页 · 已有${item_info.viewNum}人查看`, 30, 325)
        ctx.restore()

        // 绘制二维码
        // let qrcode = await Taro.downloadFile({
        //   url: qrcodeUrl
        // })
        // console.log('qrcode', qrcode);


        // ctx.drawImage(qrcode.tempFilePath, 70, 360, 180, 180)

        // 将以上绘画操作进行渲染
        ctx.draw()
    }

    saveImage = () => {
        this.setState({ showCanvasPage: true })
        this.drawImage()
    }

    favoriteCommit = () => {
        const { themeId } = this.state
        favoriteCommit({ themeId }).then(res => {
            if (res.code == 'OK') {
                Taro.showToast({
                    title: res.message,
                    icon: 'success'
                })
            }
        })
    }

    praiseCommit = () => {
        const { list } = this.state
        praiseCommit({ newsId: list.id }).then(res => {
            if (res.code == 'OK') {
                Taro.showToast({
                    title: res.message,
                    icon: 'success'
                })
            }
        })
    }

    focusClick = item => {
        const { themeId } = item
        focusUser({ themeId }).then((res: any) => {
            if (res.code == 'OK') {
                Taro.showToast({
                    title: res.message,
                    icon: 'success'
                })
            }
        })
    }

    render() {
        const { list, showCanvasPage } = this.state
        return (
            <View className='wrap'>
                <ScrollView scrollY style={{ height: '100vh' }}>
                    <Avatar subTitle={list.createTime} title={list.nickName} focus={true} focusClick={() => { this.focusClick(list) }} avatar={list.avatar} type='discuss'></Avatar>
                    <View className='comment_content'>
                        <View className='theme_word'>#{list.themeTitle}#</View>
                        <View>{list.content}</View>
                    </View>
                    <View className='comment_image_list'>
                        {
                            list.commentImage && list.commentImage.map(item => (<Image className='comment_image' src={item.file}></Image>))
                        }
                    </View>
                    <View>
                        <View className='list_butten_group'>
                            <AtButton className='list_btn save_btn' onClick={() => this.saveImage()}>保存图片</AtButton>
                            <AtButton className='list_btn' openType='share'>分享至微信</AtButton>
                            {/* <AtButton className='list_btn'>复制链接</AtButton> */}
                        </View>
                        <View className='theme_commit_wrap'>
                            <View className='commit_wrap' onClick={() => this.favoriteCommit()}>
                                <Image className='icon' src={collect}></Image>
                                <View className='num'>{list.favoriteNum}</View>
                            </View>
                            <View className='commit_wrap' onClick={() => this.praiseCommit()}>
                                <Image className='icon' src={praise}></Image>
                                <View className='num'>{list.praiseNum}</View>
                            </View>


                        </View>
                    </View>

                </ScrollView>
                {
                    showCanvasPage && (
                        <View className='canvas-wrap'>
                            <Canvas id='card-canvas'
                                style="width: 320px; height: 600px"
                                canvasId='cardCanvas'></Canvas>
                            <Button className='btn-save' onClick={() => this.saveCard()}>保存图片</Button>
                        </View>
                    )}

            </View>

        );
    }
}

export default _page;
