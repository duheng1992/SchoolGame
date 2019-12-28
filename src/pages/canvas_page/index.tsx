import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Button, Canvas} from "@tarojs/components";


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
    imgUrl:'https://mmbiz.qpic.cn/mmbiz_png/rFWVXwibLGtxGTfnZibzWjLk1GjpyTwPA0umnTazHqIoicoibUB3JomFBwTBz7kE1ypburIa9M4Mb4Z2DyKl6Q1Aiag/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
    qrcodeUrl:'https://upload-images.jianshu.io/upload_images/3091895-f0b4b900390aec73.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/258/format/webp.jpg'
  };

  componentWillMount() { }

  componentDidMount() { 


  }

  componentDidShow() {
    this.drawImage()
  }

  async drawImage (){
     // 创建canvas对象
     let ctx = Taro.createCanvasContext('cardCanvas')
    
     // 填充背景色
     let grd = ctx.createLinearGradient(0, 0, 1, 600)
     grd.addColorStop(0, '#fff')
     grd.addColorStop(0.5, '#FFF')
     ctx.setFillStyle(grd)
     ctx.fillRect(0, 0, 500, 600)
 
     // // 绘制圆形用户头像
     const { imgUrl,qrcodeUrl } = this.state
     let res = await Taro.downloadFile({
       url: imgUrl
     })
     console.log('res',res);
     
     ctx.save()
     ctx.beginPath()
     // ctx.arc(160, 86, 66, 0, Math.PI * 2, false)
    //  ctx.arc(160, 88, 66, 0, Math.PI * 2)
    //  ctx.closePath()
    //  ctx.clip()
    //  ctx.stroke()
    //  ctx.translate(160, 88)
     ctx.drawImage(res.tempFilePath, 0, 0, 320, 320)
     ctx.restore()
 
     // 绘制文字
     ctx.save()
     ctx.setFontSize(20)
     ctx.setFillStyle('#FFF')
     ctx.setFontSize(16)
     ctx.setFillStyle('black')
     ctx.fillText('已在胡哥有话说公众号打卡20天', 50, 340)
     ctx.restore()
 
     // 绘制二维码
     let qrcode = await Taro.downloadFile({
       url:qrcodeUrl
     })
     console.log('qrcode',qrcode);
     
     
     ctx.drawImage(qrcode.tempFilePath, 70, 360, 180, 180)
 
     // 将以上绘画操作进行渲染
     ctx.draw()
  }

   saveCard= async()=> {
    // 将Canvas图片内容导出指定大小的图片
    let res = await Taro.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 400,
      height: 600,
      destWidth: 360,
      destHeight: 550,
      canvasId: 'cardCanvas',
      fileType: 'png'
    })
    let saveRes = await Taro.saveImageToPhotosAlbum({
      filePath: res.tempFilePath
    })
    if (saveRes.errMsg === 'saveImageToPhotosAlbum:ok') {
      Taro.showModal({
        title: '图片保存成功',
        content: '图片成功保存到相册了，快去发朋友圈吧~',
        showCancel: false,
        confirmText: '确认'
      })
    } else {
        Taro.showModal({
        title: '图片保存失败',
        content: '请重新尝试!',
        showCancel: false,
        confirmText: '确认'
      })
    }
  }

  componentWillReact() { }

  config: Config = {
    navigationBarBackgroundColor: "#FFFFFF",
  };



  render() {

    return (
      <View className='canvas-wrap'>
        <Canvas id='card-canvas'
        style="width: 320px; height: 600px"
        canvasId='cardCanvas'></Canvas>
        <Button className='btn-save' onClick={()=>this.saveCard()}>保存图片</Button>
      </View>

    );
  }
}

export default _page;
