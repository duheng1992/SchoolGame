/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { getFromById } from "@/api/customForm";
import Preview from "./module/Preview"; // 蓝牙未开启
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";


import "./index.scss";


function isEmpty(param) {
  if (param === null || typeof param === "undefined") {
    return true;
  }
  if (param.constructor === RegExp) {
    return false;
  }
  const paramString = JSON.stringify(param);
  if (paramString === "" || paramString === "{}" || paramString === "[]") {
    return true;
  }
  return false;
}
function isMatch(regString: string, value: string) {
  if (!regString || !value) {
    return false;
  }
  const regStringArray = regString.split("/");
  const regexp = new RegExp(regStringArray[1], regStringArray[2]); // eslint-disable-line
  return regexp.test(value);
}

type StateType = {
  [propName: string]: any;
  valueData: any;
  errorData: any;
}

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
    id: 4,
    title: "",
    subTitle: "",
    formData: [],
    valueData: {},
    errorData: {},
    previewImageVisible: false, // 预览图片弹窗
    previewImage: "", // 预览图片地址
  };

  componentWillMount() {
    // console.log(this.$router.params)
    // const { id } = this.$router.params; // custom form id
    // this.setState({ id })

  }

  componentDidMount() {
  }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {

    const { id } = this.state;
    getFromById({
      id,
    }).then((res: any) => {
      console.log("res", res);
      const { code, data } = res;
      if (code === "OK") {
        const formData = JSON.parse(data.formData);
        this.setState({
          title: data.title,
          subTitle: data.subTitle,
          formData,
        });
      }
    });
    // const dataString = getStore("data");
    // const dataObj = JSON.parse(dataString);
    // this.setState({
    //   title: dataObj.title,
    //   subTitle: dataObj.subTitle,
    //   formData: dataObj.formData,
    // });
  }

  componentWillReact() { }

  config: Config = {
    // navigationBarBackgroundColor: "#F0E8DF",
  };

  handleValueDataChange = (attr, value) => {
    this.setState((prevState: any) => {
      return {
        valueData: {
          ...prevState.valueData,
          [attr]: value,
        },
        errorData: {
          ...prevState.errorData,
          [attr]: "",
        },
      };
    });
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
          const matchOptions = valueData[relation["questionIndex"]].filter((value) => {
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

  hasError = () => {
    const { valueData, formData } = this.state;
    let hasError = false;
    const errorData = {};
    formData.forEach((formItem) => {
      const attr = formItem.questionIndex;
      const value = valueData[attr];
      errorData[attr] = "";
      if (formData[attr]) {
        if (
          value &&
          formData[attr].optionInputTextPattern &&
          !isMatch(formData[attr].optionInputTextPattern, value)
        ) {
          errorData[attr] = "格式错误";
          hasError = true;
        }
        if (this.showQuestion(formData[attr]) && formData[attr].questionRequired && isEmpty(value)) {
          errorData[attr] = "请填写该字段";
          hasError = true;
        }
      }
    });
    this.setState({
      errorData,
    });
    return hasError;
  };

  // 提交问卷
  handleSubmit = () => {
    const { valueData } = this.state;
    console.log("submit", valueData);
    if (this.hasError()) {
      Taro.showToast({
        title: "请修改标红题目后提交",
        icon: "none",
        duration: 2000,
      });
    } else {
      Taro.showToast({
        title: "提交成功",
        icon: "success",
        duration: 2000,
      });
      console.log('submit', valueData); // eslint-disable-line
    }
  };


  goToNext = () => {
    Taro.navigateTo({
      url: "/pages/xxx/xxxx",
    });
  };

  render() {
    const {
      title,
      subTitle,
      formData,
      errorData,
      valueData,
    } = this.state;
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
                    {/* {this.renderPreview(item, formIndex)} */}
                    <Preview
                      item={item}
                      formIndex={formIndex}
                      valueData={valueData}
                      errorData={errorData}
                      handleValueDataChange={this.handleValueDataChange}
                      showQuestion={this.showQuestion}
                    />
                  </View>
                );
              })}
            </View>
            <View className="bottom">
              <AtButton
                type="primary"
                className="submit"
                onClick={this.handleSubmit}
              >
                提交
              </AtButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default _page;
