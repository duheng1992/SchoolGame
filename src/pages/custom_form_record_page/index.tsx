/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { getAnswerByRecordId } from "@/api/customForm";
import Preview from "./module/Record"; // 蓝牙未开启
import { View } from "@tarojs/components";

import "./index.scss";

type StateType = {
  [propName: string]: any;
  valueData: any;
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
    // token,
    recordId: "",
    title: "",
    subTitle: "",
    formData: [],
    valueData: {},
    // previewImageVisible: false, // 预览图片弹窗
    // previewImage: "", // 预览图片地址
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {
    const { recordId } = this.$router.params; // custom form id
    if (recordId && recordId !== "null") {
      this.setState({ recordId });
      getAnswerByRecordId({
        id: recordId,
      }).then((res: any) => {
        const { code, data } = res;
        if (code === "OK") {
          this.setState({
            title: data.questionnaireTitle,
            subTitle: data.questionnaireSubTitle,
            formData: JSON.parse(data.questionnaireData),
            valueData: JSON.parse(data.answerData),
          });
        }
      });
    } else {
      Taro.showToast({
        title: "出错了",
        icon: "none",
        duration: 2000,
      }).then(() => {
        setTimeout(() => {
          Taro.redirectTo({
            url: "/pages/home/index",
          });
        }, 2000);
      });
    }
  }

  componentWillReact() {}

  config: Config = {
    // navigationBarBackgroundColor: "#F0E8DF",
  };

  showQuestion = (item) => {
    const { logicRelationArray, logicRelationOperator } = item;
    const { valueData } = this.state;
    let isShow = true;
    if (logicRelationArray && logicRelationArray.length) {
      // 判断显示条件
      let func;
      if (logicRelationOperator === "and") {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        func = Array.prototype.every;
      }
      if (logicRelationOperator === "or") {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        func = Array.prototype.some;
      }
      isShow = func.call(logicRelationArray, (relation) => {
        if (Array.isArray(valueData[relation["questionIndex"]])) {
          // 多选 答案是数组
          const matchOptions = valueData[relation["questionIndex"]].filter(
            (value) => {
              return relation.values.includes(value);
            },
          );
          return Boolean(matchOptions.length);
        } else {
          // 单选 答案是字符串
          return relation.values.includes(valueData[relation["questionIndex"]]);
        }
      });
    }
    return isShow;
  };

  render() {
    const { title, subTitle, formData, valueData } = this.state;
    return (
      <View className="page">
        <View className="main">
          {/* 右侧文档 */}
          <View className="content">
            <View className="top">
              <View className="title">{title}</View>
              {subTitle && <View className="subTitle">{subTitle}</View>}
            </View>
            <View className="formContent">
              {formData.map((item, formIndex) => {
                return (
                  <View key={`${item.questionTitle}-${formIndex}`}>
                    <Preview
                      item={item}
                      formIndex={formIndex}
                      valueData={valueData}
                      showQuestion={this.showQuestion}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default _page;
