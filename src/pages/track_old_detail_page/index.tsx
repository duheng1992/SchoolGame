/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image, Video, RichText, Canvas, Button } from "@tarojs/components";
import "./index.scss";
import { getTrackingOldDetailByNewsId, getTrackingOldDetailCommitByNewsId } from "@/api/detail";
import Discuss from '@/components/Discuss'
import collect from '@/images/card/card_collect.png'
import replay from '@/images/card/tab_replay.png'
import praise from '@/images/card/comment_praise.png'
import qrcode from '@/images/card/qrcode.jpeg'
import logo from '@/images/card/logo_title.png'
import close from '@/images/card/card_close.png'
import { AtButton, AtInput } from "taro-ui";
import { drawImage, saveCard } from "@/utils/utils";

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
    newsId: null,
    item_info: {
      coursewareType: null
    },
    discuss: [],
    showCanvasPage: false,
    showInputModel: false,
    content: ''
  };

  config: Config = {
    navigationBarTitleText: "活动追踪",
  };

  componentWillMount() {
    console.log(this.$router.params)
    const { newsId } = this.$router.params;
    // const itemData = getStore('DetailItem')
    this.setState({ newsId })
  }

  componentDidMount() {

  }


  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {
    const { newsId } = this.state
    getTrackingOldDetailByNewsId({ newsId }).then(res => {
      console.log('resourceinfo', res)
      const { code, data } = res
      if (code == 'OK') {
        this.setState({ item_info: data })
      }
    })

    getTrackingOldDetailCommitByNewsId({ newsId }).then(res => {
      console.log('CommentList', res)
      if (res.code == 'OK') {
        this.setState({ discuss: res.data })
      }

    })

  }

  componentWillReact() { }

  saveImage = () => {
    this.setState({ showCanvasPage: true })
    const { item_info } = this.state
    drawImage(item_info, qrcode)
  }

  onInputCommit = () => {
    // this.setState({
    //   showInputModel: true
    // })
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
    // createResourceComment(data).then(res => {
    //   console.log('res', res);
    // })
    this.setState({ showInputModel: false })
  }


  render() {
    //coursewareType {1:pdf,2:video,3:pdf+vedio}
    const { item_info, content, showInputModel, discuss, showCanvasPage } = this.state
    return (
      <View className="detail_item_page">

        <View className="item_wrap">
          <View className='item_info'>
            <View className='item_title'>{item_info.title}</View>
            <View className='item_subhead'>{item_info.startTime}</View>
          </View>

          <View className='introduction'>
            <View>
              <RichText nodes={item_info.content}></RichText>
            </View>

            <View className='list_butten_group'>
              <AtButton className='list_btn save_btn' onClick={() => this.saveImage()}>保存图片</AtButton>
              <AtButton className='list_btn' openType="share">分享至微信</AtButton>
              {/* <AtButton className='list_btn'>复制链接</AtButton> */}
            </View>
          </View>
          {
            discuss.length > 0 && (
              <View className='discuss_wrap'>
                <View>评论</View>
                {
                  discuss.length > 0 && discuss.map(item => (
                    <Discuss detail={item}></Discuss>
                  ))
                }

              </View>
            )
          }
          <View>
            <View className='commit_wrap'>
              <View className='commit_item'>
                <Image className='icon' src={collect}></Image>
                <View className='num'>{item_info.favoriteNum}</View>
              </View>
              <View className='commit_item' onClick={() => this.onInputCommit()}>
                <Image className='icon' src={replay}></Image>
                <View className='num'>{item_info.commentNum}</View>
              </View>
              <View className='commit_item' >
                <Image className='icon' src={praise}></Image>
                <View className='num'>{item_info.praiseNum}</View>
              </View>
            </View>

          </View>
        </View>
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
              <View className="btn_group">
                <Button className='btn-save' onClick={() => saveCard()}>保存图片</Button>
                <Button className='btn-close' onClick={() => this.setState({ showCanvasPage: false })}>关 闭</Button>
              </View>
            </View>
          )}
      </View>
    );
  }
}

export default _page;
