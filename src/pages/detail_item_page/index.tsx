/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image, Video } from "@tarojs/components";
import "./index.scss";
import { getResourceInfoData, getCommentListByResourceId } from "@/api/detail";
import PdfButten from "@/components/PdfButten/index"
import { AtList, AtListItem, AtButton, AtModal, AtModalContent } from "taro-ui";

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
    showPdfModel: false
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
    this.setState({
      showPdfModel: true
    })
  }

  render() {
    //coursewareType {1:pdf,2:video,3:pdf+vedio}
    const { item_info, showPdfModel } = this.state
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
            <View>课程简介</View>
            <View></View>
            <AtList>
              <AtListItem className='list_item' title='了解更多 请查看课件' arrow='right' />
            </AtList>
            <View className='list_butten_group'>
              <AtButton className='list_btn save_btn'>保存图片</AtButton>
              <AtButton className='list_btn'>分享至微信</AtButton>
              <AtButton className='list_btn'>复制链接</AtButton>
            </View>
          </View>
        </View>

        <AtModal isOpened={showPdfModel}>
          <AtModalContent>
            <View>下载文档</View>
            <View>直接获取下载链接；复制链接到浏览器，然后下载文件。</View>
            <AtButton>获 取 链 接</AtButton>
            <View>也可以点击获取邮件到绑定邮箱，登陆邮箱下载。</View>
            <AtButton>获 取 邮 件</AtButton>
          </AtModalContent>
        </AtModal>
      </View>
    );
  }
}

export default _page;
