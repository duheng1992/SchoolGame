/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image, Video, RichText, Canvas, Button } from "@tarojs/components";
import "./index.scss";
import { getResourceInfoData, getCommentListByResourceId, createResourceComment } from "@/api/detail";
import PdfButten from "@/components/PdfButten/index"
import { AtList, AtListItem, AtButton, AtModal, AtModalContent, AtInput } from "taro-ui";
import collect from '@/images/card/card_collect.png'
import replay from '@/images/card/tab_replay.png'
import praise from '@/images/card/comment_praise.png'

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
    resourceId: null,
    item_info: {
      coursewareType: null
    },
    showPdfModel: false,
    showInputModel: false,
    content: '',
    showCanvasPage: false
  };

  componentWillMount() {
    console.log(this.$router.params)
    const { resourceId } = this.$router.params;
    // const itemData = getStore('DetailItem')
    this.setState({ resourceId })
  }

  componentDidMount() {

  }


  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {
    const { resourceId } = this.state
    getResourceInfoData(resourceId).then(res => {
      console.log('resourceinfo', res)
      const { code, data } = res
      if (code == 'OK') {
        const dataInfo = JSON.parse(JSON.stringify(data))
        dataInfo.videoFileUrl = data.coursewareType !== 1 ? JSON.parse(dataInfo.videoFileUrl) : '';
        this.setState({ item_info: dataInfo })
      }
    })

    getCommentListByResourceId(resourceId).then(res => {
      console.log('CommentList', res)
    })

  }

  componentWillReact() { }

  videoUrl = (videoFileUrl) => {
    const fileUrl = JSON.parse(videoFileUrl)
    console.log('videoFileUrl', fileUrl)
    return fileUrl.url
  }

  onShowPdfModel = () => {
    console.log('true', 'pdfmodal')
    this.setState({
      showPdfModel: true
    })
  }

  onInputCommit = () => {
    this.setState({
      showInputModel: true
    })
  }
  onInputCommitChange = val => {
    this.setState({ content: val })
  }
  onInputComfirm = () => {
    console.log('e')
    const { content, resourceId } = this.state
    const data = {
      content,
      domainId: resourceId
    }
    createResourceComment(data).then(res => {
      console.log('res', res);

    })
    this.setState({ showInputModel: false })
  }

  getPdfUrl = () => {
    const { item_info: { pdfFile } } = this.state
    Taro.setClipboardData({
      data: pdfFile
    })
  }
  closePdfModal = () => {
    console.log('close', this.state.showPdfModel);
    this.setState({ showPdfModel: false })

  }

  preViewPdf = () => {
    const { item_info: { pdfFile } } = this.state
    Taro.downloadFile({
      url: pdfFile,
      success: function (res) {
        console.log(res)
        var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
        Taro.openDocument({
          filePath: Path,
          fileType: 'pdf',
          success: function (res) {
            console.log('res', res)
            console.log('打开文档成功')
          }
        })
      }
    })
  }

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

  render() {
    //coursewareType {1:pdf,2:video,3:pdf+vedio}
    const { item_info, showPdfModel, showInputModel, content, showCanvasPage } = this.state
    console.log('item_info', item_info)
    const { coursewareType } = item_info
    return (
      <View className="detail_item_page">

        <View className="item_head">
          {
            coursewareType == 1 && <Image className="item_banner" mode="aspectFill" src={item_info.bannerImage} />
          }
          {
            (coursewareType == 2 || coursewareType == 3) &&
            <Video className="item_banner" src={item_info.videoFileUrl[0].url}></Video>
          }
        </View>

        <View className="item_wrap">
          <View className='item_info'>
            <View className='item_title'>{item_info.title}·{item_info.categoryTitle}</View>
            <View className='item_subhead'>{item_info.createTime}·{item_info.pdfPageNum ? item_info.pdfPageNum : 0}页·已有{item_info.viewNum}人观看</View>
          </View>
          {
            coursewareType !== 2 &&
            <View className="item_pdf_btn">
              <PdfButten pdfFileUrl='' showPDfModel={() => this.onShowPdfModel()}></PdfButten>
            </View>
          }

          <View className='introduction'>
            <View className='item_title'>课程简介</View>
            <View>
              <RichText nodes={item_info.intro}></RichText>
            </View>
            <AtList>
              <AtListItem className='list_item' title='了解更多 请查看课件' arrow='right' onClick={() => this.preViewPdf()} />
            </AtList>
            <View className='list_butten_group'>
              <AtButton className='list_btn save_btn' onClick={() => this.saveImage()}>保存图片</AtButton>
              <AtButton className='list_btn' openType="share">分享至微信</AtButton>
              <AtButton className='list_btn'>复制链接</AtButton>
            </View>
          </View>
          <View>
            <View>评论</View>
            <View className='commit_wrap'>
              <View className='commit_item'>
                <Image className='icon' src={collect}></Image>
                <View className='num'>0</View>
              </View>
              <View className='commit_item' onClick={() => this.onInputCommit()}>
                <Image className='icon' src={replay}></Image>
                <View className='num'>1</View>
              </View>
              <View className='commit_item' >
                <Image className='icon' src={praise}></Image>
                <View className='num'>2</View>
              </View>
            </View>

          </View>
        </View>

        <AtModal isOpened={showPdfModel} onClose={() => this.closePdfModal()}>
          <AtModalContent>
            <View className='model_wrap'>
              <View className='model_title'>下载文档</View>
              <View className='model_info'>直接获取下载链接；复制链接到浏览器，然后下载文件。</View>
              <AtButton className='url_btn btn' onClick={() => this.getPdfUrl()}>获 取 链 接</AtButton>
              <View className='model_info'>也可以点击获取邮件到绑定邮箱，登陆邮箱下载。</View>
              <AtButton className='btn'>获 取 邮 件</AtButton>
            </View>

          </AtModalContent>
        </AtModal>
        {showInputModel && <AtInput name='value'
          type='text'
          value={content}
          onChange={this.onInputCommitChange}
          autoFocus
          className='commit_input'>
          <View className='commit_btn' onClick={() => this.onInputComfirm()}>确定</View></AtInput>}

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
