/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { AtTextarea, AtImagePicker } from "taro-ui";
import { releaseDiscussPublish } from "@/api/home";
import { uploadImage } from "@/api/searchPage";
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

class _page extends Component {
  constructor(props) {
    super(props);
  }

  state: StateType = {
    content: "",
    files: [],
    themeId: null,
    imgList: [],
  };

  config: Config = {
    navigationBarTitleText: "发布",
  };

  componentWillMount() {
    console.log(this.$router.params);
    const { themeId } = this.$router.params;
    this.setState({ themeId });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {}

  componentWillReact() {}

  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  onChange(files) {
    console.log("files", files);
    Taro.showLoading({
      title: "图片上传中",
    });
    const filesList = this.state.imgList;
    Taro.uploadFile({
      url:
        " http://ip-29-nikeschoolyard-admin.coralcodes.com/api/ueditor?action=uploadimage",
      filePath: files[0].url,
      name: "upfile",
      success: (res) => {
        console.log("res", res);
        const data = JSON.parse(res.data);
        const url = data.url;
        filesList.push(url);
        this.setState({ imgList: filesList });
      },
      complete: () => {
        Taro.hideLoading();
      },
    });
    this.setState({
      files,
    });
  }

  publish = () => {
    const { content, imgList, themeId } = this.state;
    const filesData: any = [];
    imgList.forEach((item) => {
      const obj = {
        url: item,
      };
      filesData.push(obj);
    });
    const data = {
      commentImage: filesData,
      content,
      themeId: Number(themeId),
    };
    console.log("content", data);
    releaseDiscussPublish(data).then((res) => {
      console.log("res", res);
      if (res.code == "OK") {
        Taro.showToast({
          title: res.message,
          icon: "success",
          duration: 2000,
        }).then(() => {
          Taro.navigateBack({
            delta: 1,
          });
        });
      }
    });
  };

  render() {
    const { content, files } = this.state;
    return (
      <View className="release_page">
        <AtTextarea
          value={content}
          onChange={this.handleChange.bind(this)}
          maxLength={400}
          placeholder="请描述你的话题～"
        />
        <AtImagePicker files={files} onChange={this.onChange.bind(this)} />
        <View
          className="publish_btn"
          onClick={() => {
            return this.publish();
          }}
        >
          发表
        </View>
      </View>
    );
  }
}

export default _page;
