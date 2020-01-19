/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import {
  View,
  ScrollView,
  Image,
  Video,
  RichText,
  Canvas,
  Button,
  Icon,
} from "@tarojs/components";
import "./index.scss";
import {
  getResourceInfoData,
  getCommentListByResourceId,
  createResourceComment,
} from "@/api/detail";
import { getUserBaseInfo, postFavorite, postPraise } from "@/api/personal";
import PdfButten from "@/components/PdfButten/index";
import Avatar from "@/components/Avactar";
import {
  AtList,
  AtListItem,
  AtButton,
  AtModal,
  AtModalContent,
  AtInput,
} from "taro-ui";
import collect from "@/images/card/card_collect.png";
import collect_active from "@/images/card/card_collect_active.png";
import replay from "@/images/card/tab_replay.png";
import praise from "@/images/card/comment_praise.png";
import praise_active from "@/images/card/comment_praise_select.png";
import qrcode from "@/images/card/qrcode.jpeg";
import logo from "@/images/card/logo_title.png";
import close from "@/images/card/card_close.png";
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
    resourceId: null,
    item_info: {
      coursewareType: null,
    },
    showPdfModel: false,
    showInputModel: false,
    content: "",
    showCanvasPage: false,
    discuss: [],
  };

  componentWillMount() {
    console.log(this.$router.params);
    const { resourceId } = this.$router.params;
    // const itemData = getStore('DetailItem')
    this.setState({ resourceId });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {
    const { resourceId } = this.state;
    getResourceInfoData(resourceId).then((res: any) => {
      console.log("resourceinfo", res);
      const { code, data } = res;
      if (code === "OK") {
        const dataInfo = JSON.parse(JSON.stringify(data));
        dataInfo.videoFileUrl =
          data.coursewareType !== 1 ? JSON.parse(dataInfo.videoFileUrl) : "";
        dataInfo.intro = dataInfo.intro.replace(
          "<img ",
          '<img style="max-width:100%;height:auto"',
        );
        this.setState({ item_info: dataInfo });
      }
    });
    this.getCommentList(resourceId);
  }

  getCommentList = (resourceId) => {
    getCommentListByResourceId(resourceId).then((res: any) => {
      console.log("CommentList", res);
      const { code, data } = res;
      if (code === "OK") {
        this.setState({ discuss: data.list });
      }
    });
  };

  componentWillReact() {}

  videoUrl = (videoFileUrl) => {
    const fileUrl = JSON.parse(videoFileUrl);
    console.log("videoFileUrl", fileUrl);
    return fileUrl.url;
  };

  onShowPdfModel = () => {
    console.log("true", "pdfmodal");
    this.setState({
      showPdfModel: true,
    });
  };

  onInputCommit = () => {
    this.setState({
      showInputModel: true,
    });
  };

  onInputCommitChange = (val) => {
    this.setState({ content: val });
  };

  onInputComfirm = () => {
    console.log("e");
    const { content, resourceId } = this.state;
    const data = {
      content,
      domainId: resourceId,
    };
    createResourceComment(data).then((res: any) => {
      console.log("res", res);
      const { resourceId } = this.state;
      if (res.code === "OK") {
        this.setState({ content: "" });
        Taro.showToast({
          title: "成功",
          icon: "success",
        }).then(() => {
          this.getCommentList(resourceId);
        });
      }
    });
    this.setState({ showInputModel: false });
  };

  getPdfUrl = () => {
    const {
      item_info: { pdfFile },
    } = this.state;
    Taro.setClipboardData({
      data: pdfFile,
    });
  };

  closePdfModal = () => {
    console.log("close", this.state.showPdfModel);
    this.setState({ showPdfModel: false });
  };

  preViewPdf = () => {
    const {
      item_info: { pdfFile },
    } = this.state;
    Taro.downloadFile({
      url: pdfFile,
      success(res) {
        console.log(res);
        const Path = res.tempFilePath; //返回的文件临时地址，用于后面打开本地预览所用
        Taro.openDocument({
          filePath: Path,
          fileType: "pdf",
          success(res) {
            console.log("res", res);
            console.log("打开文档成功");
          },
        });
      },
    });
  };

  saveImage = () => {
    this.setState({ showCanvasPage: true });
    const { item_info } = this.state;
    drawImage(item_info, qrcode);
  };

  getEmail = () => {
    getUserBaseInfo().then((res: any) => {
      if (res.code == "OK") {
        this.setState({ userinfo: res.data });
        const { email } = res.data;
        if (email && email !== "") {
          Taro.setClipboardData({
            data: email,
          });
        } else {
          Taro.showToast({
            title: "邮箱地址为空，请去信息档案完善",
            icon: "none",
          });
        }
      }
    });
  };

  onTapPraise = () => {
    const resourceId = this.state.item_info.id;
    postPraise({ resourceId }).then((res) => {
      console.log("res", res);
      Taro.showToast({
        title: res.message,
        icon: res.code === "OK" ? "success" : "none",
      });
      if (res.code === "OK") {
        const item = this.state.item_info;
        item.isPraise = !item.isPraise;

        item.praiseNum = item.isPraise
          ? item.praiseNum + 1
          : item.praiseNum - 1;
        this.setState({
          item_info: item,
        });
      }
    });
  };

  onTapFavorite = () => {
    const resourceId = this.state.item_info.id;
    postFavorite({ resourceId }).then((res) => {
      console.log("res", res);
      Taro.showToast({
        title: res.message,
        icon: res.code === "OK" ? "success" : "none",
      });
      if (res.code === "OK") {
        const item = this.state.item_info;
        item.isFavorite = !item.isFavorite;
        item.favoriteNum = item.isFavorite
          ? item.favoriteNum + 1
          : item.favoriteNum - 1;
        this.setState({
          item_info: item,
        });
      }
    });
  };

  render() {
    //coursewareType {1:pdf,2:video,3:pdf+vedio}
    const {
      item_info,
      showPdfModel,
      showInputModel,
      content,
      showCanvasPage,
      discuss,
    } = this.state;
    console.log("item_info", item_info);
    const { coursewareType } = item_info;
    return (
      <View className="detail_item_page">
        <View className="item_head">
          {coursewareType == 1 && (
            <Image
              className="item_banner"
              mode="aspectFill"
              src={item_info.bannerImage}
            />
          )}
          {(coursewareType == 2 || coursewareType == 3) && (
            <Video
              className="item_banner"
              src={item_info.videoFileUrl[0].url}
            ></Video>
          )}
        </View>

        <View className="item_wrap">
          <View className="item_info">
            <View className="item_title">
              {item_info.title}·{item_info.categoryTitle}
            </View>
            <View className="item_subhead">
              {item_info.createTime}·
              {item_info.pdfPageNum ? item_info.pdfPageNum : 0}页·已有
              {item_info.viewNum}人观看
            </View>
          </View>
          {coursewareType !== 2 && (
            <View className="item_pdf_btn">
              <PdfButten
                pdfFileUrl=""
                showPDfModel={() => {
                  return this.onShowPdfModel();
                }}
              ></PdfButten>
            </View>
          )}

          <View className="introduction">
            <View className="item_title">课程简介</View>
            <View>
              <RichText nodes={item_info.intro}></RichText>
            </View>
            {(coursewareType == 1 || coursewareType == 3) && (
              <AtList>
                <AtListItem
                  className="list_item"
                  title="了解更多 请查看课件"
                  arrow="right"
                  onClick={() => {
                    return this.preViewPdf();
                  }}
                />
              </AtList>
            )}

            <View className="list_butten_group">
              <AtButton
                className="list_btn save_btn"
                onClick={() => {
                  return this.saveImage();
                }}
              >
                保存图片
              </AtButton>
              <AtButton className="list_btn" openType="share">
                分享至微信
              </AtButton>
              {/* <AtButton className='list_btn'>复制链接</AtButton> */}
            </View>
          </View>
          <View className="br"></View>
          <View>
            {discuss.length > 0 && (
              <View className="discuss_wrap">
                <View className="discuss_head">评论{item_info.commentNum}</View>
                {discuss.length > 0 &&
                  discuss.map((item) => {
                    return (
                      <View>
                        <View className="discuss_item">
                          <View className="discuss_avatar">
                            <Image className="avatar" src={item.avatar}></Image>
                          </View>
                          <View>
                            <View className="discuss_nickName">
                              {item.nickName}
                            </View>
                            <View className="discuss_content">
                              <View className="theme_word">{item.content}</View>
                            </View>
                          </View>
                        </View>
                        <View className="theme_time">{item.createTime}</View>
                      </View>
                    );
                  })}
              </View>
            )}
          </View>
          <View className="commit_fix">
            <View className="commit_wrap">
              <View
                className="commit_item"
                onClick={() => {
                  return this.onTapFavorite();
                }}
              >
                <Image
                  className="icon"
                  src={item_info.isFavorite ? collect_active : collect}
                ></Image>
                <View className="num">{item_info.favoriteNum}</View>
              </View>
              <View
                className="commit_item"
                onClick={() => {
                  return this.onInputCommit();
                }}
              >
                <Image className="icon" src={replay}></Image>
                <View className="num">{item_info.commentNum}</View>
              </View>
              <View
                className="commit_item"
                onClick={() => {
                  return this.onTapPraise();
                }}
              >
                <Image
                  className="icon"
                  src={item_info.isPraise ? praise_active : praise}
                ></Image>
                <View className="num">{item_info.praiseNum}</View>
              </View>
            </View>
          </View>
        </View>

        <AtModal
          isOpened={showPdfModel}
          onClose={() => {
            return this.closePdfModal();
          }}
        >
          <AtModalContent>
            <View className="model_wrap">
              <View className="model_title">下载文档</View>
              <View className="model_info">
                直接获取下载链接；复制链接到浏览器，然后下载文件。
              </View>
              <AtButton
                className="url_btn btn"
                onClick={() => {
                  return this.getPdfUrl();
                }}
              >
                获 取 链 接
              </AtButton>
              <View className="model_info">
                也可以点击获取邮件到绑定邮箱，登陆邮箱下载。
              </View>
              <AtButton
                className="btn"
                onClick={() => {
                  return this.getEmail();
                }}
              >
                获 取 邮 件
              </AtButton>
            </View>
          </AtModalContent>
        </AtModal>
        {showInputModel && (
          <AtInput
            name="value"
            type="text"
            value={content}
            onChange={this.onInputCommitChange}
            autoFocus
            className="commit_input"
          >
            <View
              className="commit_btn"
              onClick={() => {
                return this.onInputComfirm();
              }}
            >
              确定
            </View>
          </AtInput>
        )}

        {showCanvasPage && (
          <View className="canvas-wrap">
            {/* <View className='logo_wrap'>
                <Image className='logo_title' src={logo}></Image>
                <Image className='logo_close' src={close} onClick={() => this.setState({ showCanvasPage: false })}></Image>
              </View> */}
            <Canvas
              id="card-canvas"
              style="width: 320px; height: 600px"
              canvasId="cardCanvas"
            ></Canvas>
            <View className="btn_group">
              <Button
                className="btn-save"
                onClick={() => {
                  return saveCard();
                }}
              >
                保存图片
              </Button>
              <Button
                className="btn-close"
                onClick={() => {
                  return this.setState({ showCanvasPage: false });
                }}
              >
                关 闭
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default _page;
