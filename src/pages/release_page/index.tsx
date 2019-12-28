/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { AtTextarea, AtImagePicker } from 'taro-ui'
import { releaseDiscussPublish } from '@/api/home'
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
    content: '',
    files: [],
    themeId: null
  };

  componentWillMount() {
    console.log(this.$router.params)
    const { themeId } = this.$router.params
    this.setState({ themeId })
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {

  }

  componentWillReact() { }

  handleChange(event) {
    this.setState({
      content: event.target.value
    })
  }
  onChange(files) {
    this.setState({
      files
    })
  }

  publish = () => {
    const { content, files, themeId } = this.state
    let filesData: any = []
    files.forEach(item => {
      const obj = {
        file: item.file.path,
        size: item.file.size
      }
      filesData.push(obj)
    })
    const data = {
      commentImage: filesData,
      content,
      themeId: Number(themeId)
    }
    console.log('content', data)
    releaseDiscussPublish(data).then(res => {
      console.log('res', res)
      if (res.code == 'OK') {
        Taro.showToast({
          title: res.message,
          icon: 'success',
          duration: 2000
        }).then(() => {
          Taro.navigateBack({
            delta: 1
          })
        });
      }
    })
  }

  render() {
    const { content, files } = this.state
    return (
      <View className="release_page">
        <AtTextarea
          value={content}
          onChange={this.handleChange.bind(this)}
          maxLength={400}
          placeholder='请描述你的话题～'
        />
        <AtImagePicker
          files={files}
          onChange={this.onChange.bind(this)}
        />
        <View className="publish_btn" onClick={() => this.publish()}>发表</View>
      </View>
    );
  }
}

export default _page;
