/* eslint-disable consistent-return */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import Taro, { Component } from "@tarojs/taro";
import { View, Input, Picker, Radio, RadioGroup, CheckboxGroup, Checkbox } from "@tarojs/components";
import { AtImagePicker } from "taro-ui";
import { baseUrl } from "../../../config/baseUrl";
import "./Answer.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  [propName: string]: any;
  item: any;
  errorData: any;
  valueData: any;
  formIndex: number;
  handleValueDataChange: Function;
  showQuestion: Function;
};

interface Answer {
  props: ComponentsProps;
  state: StateType;
}

class Answer extends Component {
  static defaultProps: ComponentsProps = {
    item: {},
    errorData: {},
    valueData: {},
    formIndex: 0,
    handleValueDataChange: () => { },
    showQuestion: () => { },
  };

  constructor(props) {
    super(props);
  }

  state: StateType = {
  };

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() { }

  componentWillReact() { }


  render() {
    const { valueData, errorData, formIndex, item, handleValueDataChange, showQuestion } = this.props;
    const {
      category,
      questionTitle,
      questionDescription,
      questionIndex,
      questionRequired,
      optionPlaceholder,
      optionInputMatrixText,
      optionRadioArray,
      optionUploadImageMaxLength,
    } = item;
    let optionTemplate: any = null;
    if (!showQuestion(item)) {
      return <View> </View>;
    }
    switch (category) {
      case "input-text": {
        optionTemplate = (
          <View className="input-text-wrapper">
            <Input
              placeholder={optionPlaceholder}
              onInput={(e: any) => {
                return handleValueDataChange(questionIndex, e.target.value);
              }}
            />
          </View>
        );
        break;
      }
      case "input-matrix": {
        optionTemplate = (
          <View className="input-matrix-wrapper">
            {optionInputMatrixText
              .trim()
              .split("\n")
              .map((text, index) => {
                return (
                  <View
                    className="input-matrix"
                    key={`${text}-${index}`}
                  >
                    <View className="matrix-label">{text}:</View>
                    <View className="matrix-input">
                      <Input
                        placeholder={optionPlaceholder}
                        onInput={(e: any) => {
                          let newMatrixData;
                          if (Array.isArray(valueData[questionIndex])) {
                            newMatrixData = valueData[questionIndex].slice();
                          } else {
                            newMatrixData = [];
                          }
                          newMatrixData[index] = e.target.value;
                          handleValueDataChange(questionIndex, newMatrixData);
                        }}
                      />
                    </View>
                  </View>
                );
              })}
          </View>
        );
        break;
      }
      case "select-checkbox": {
        optionTemplate = (
          <View className="select-checkbox-wrapper">
            <CheckboxGroup
              onChange={(e) => {
                handleValueDataChange(questionIndex, e.detail.value);
              }}
            >
              {optionRadioArray.map((radioObj, index) => {
                return (
                  <View key={`${radioObj.text}-${index}`}>
                    <Checkbox className="checkbox-list__checkbox" value={radioObj.text} >{radioObj.text}</Checkbox>
                  </View>
                );
              })
              }
            </CheckboxGroup >
          </View>
        );
        break;
      }
      case "select-dropdown": {
        optionTemplate = (
          <View className="select-dropdown-wrapper">

            <Picker
              value={optionRadioArray.findIndex(o => o.text === valueData[questionIndex])}
              mode="selector"
              range={optionRadioArray.map((radioObj) => {
                return radioObj.text;
              })}
              onChange={(e: any) => {
                const value = optionRadioArray[e.target.value].text;
                handleValueDataChange(questionIndex, value);
              }}
            >
              <View className="picker">
                {valueData[questionIndex] || "点击此处选择"}
              </View>
            </Picker >
          </View>
        );
        break;
      }
      case "select-radio": {
        optionTemplate = (
          <View className="select-radio-wrapper">

            <RadioGroup onChange={(e: any) => {
              handleValueDataChange(questionIndex, e.target.value);
            }}
            >
              {optionRadioArray.map((radioObj, index) => {
                return (
                  <View key={`${radioObj.text}-${index}`}>
                    <Radio className="radio-list__radio" value={radioObj.text} >
                      {radioObj.text}
                    </Radio>
                  </View>
                );
              })}
            </RadioGroup>
          </View>
        );
        break;
      }
      case "picker-address": {
        optionTemplate = (
          <View className="picker-address-wrapper">
            <Picker
              value={valueData[questionIndex] || []}
              mode="region"
              onChange={(e) => {
                handleValueDataChange(questionIndex, e.detail.value);
              }}
            >
              <View className="picker">
                {valueData[questionIndex] || "点击此处选择"}
              </View>
            </Picker>
          </View>
        );
        break;
      }
      case "picker-date": {
        optionTemplate = (
          <View className="picker-date-wrapper">
            <Picker
              value={valueData[questionIndex]}
              mode="date"
              onChange={(e: any) => {
                return handleValueDataChange(questionIndex, e.target.value);
              }
              }
            >
              <View className="picker">
                {valueData[questionIndex] || "点击此处选择"}
              </View>
            </Picker >
          </View>
        );
        break;
      }
      case "upload-image": {
        optionTemplate = (
          <View className="upload-image-wrapper">
            <AtImagePicker
              length={optionUploadImageMaxLength}
              files={valueData[questionIndex] || []}
              onChange={(files: any, operationType, index) => {
                const newArray = valueData[questionIndex]
                  ? valueData[questionIndex].slice()
                  : [];
                // 添加文件
                if (operationType === "add") {
                  Taro.uploadFile({
                    url: `${baseUrl}/api/ueditor?action=uploadimage`, //仅为示例，非真实的接口地址
                    filePath: files[files.length - 1].url,
                    name: "upfile",
                    success(res) {
                      const data = res.data;
                      newArray.push(JSON.parse(data));
                      handleValueDataChange(questionIndex, newArray);

                    },
                    fail(err) {
                      // eslint-disable-next-line no-console
                      console.log("err!", err);
                    },
                  });
                }
                // 删除文件
                if (operationType === "remove") {
                  newArray.splice(index, 1);
                  handleValueDataChange(questionIndex, newArray);
                }
              }}
              // onImageClick={this.onImageClick.bind(this)}
              onFail={(err) => {
                console.error("上传失败", err);
              }}

            />
          </View>
        );
        break;
      }
      default: {
        break;
      }
    }


    return (
      <View className="previewWrapper" >
        <View className="previewContent">
          <View className="previewTitle">
            {questionRequired && <View className="previewTitle_required">*</View>}
            <View className="previewTitle_index">{Number(formIndex) + 1}.</View>
            <View className="previewTitle_title">{questionTitle}</View>
          </View>
          {questionDescription && (
            <View className="previewDescription">{questionDescription}</View>
          )}
          <View className="previewOption">
            {optionTemplate}
            <View className="errorTip">{errorData[questionIndex]}</View>
          </View>
        </View>
      </View>
    );
  }
}

export default Answer;
