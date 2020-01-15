/* eslint-disable consistent-return */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import Taro, { Component } from "@tarojs/taro";
import { View, Image, Picker, Radio, RadioGroup, CheckboxGroup, Checkbox } from "@tarojs/components";
import { AtImagePicker } from "taro-ui";
import { baseUrl } from "../../../config/baseUrl";
import "./Record.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  [propName: string]: any;
  item: any;
  valueData: any;
  formIndex: number;
  showQuestion: Function;
};

interface Record {
  props: ComponentsProps;
  state: StateType;
}

class Record extends Component {
  static defaultProps: ComponentsProps = {
    item: {},
    valueData: {},
    formIndex: 0,
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
            {valueData[questionIndex]}
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
                      {valueData[questionIndex][index]}
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
            <CheckboxGroup>
              {optionRadioArray.map((radioObj, index) => {
                return (
                  <View key={`${radioObj.text}-${index}`}>
                    <Checkbox
                      className="checkbox-list__checkbox"
                      value={radioObj.text}
                      disabled
                      checked={valueData[questionIndex].includes(radioObj.text)}
                    >
                      {radioObj.text}
                    </Checkbox>
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
            {valueData[questionIndex] || "未选择"}
          </View>
        );
        break;
      }
      case "select-radio": {
        optionTemplate = (
          <View className="select-radio-wrapper">

            <RadioGroup>
              {optionRadioArray.map((radioObj, index) => {
                return (
                  <View key={`${radioObj.text}-${index}`}>
                    <Radio
                      className="radio-list__radio"
                      value={radioObj.text}
                      disabled
                      checked={valueData[questionIndex] === (radioObj.text)}
                    >
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
            {valueData[questionIndex] || "未选择"}
          </View>
        );
        break;
      }
      case "picker-date": {
        optionTemplate = (
          <View className="picker-date-wrapper">
            {valueData[questionIndex] || "未选择"}
          </View>
        );
        break;
      }
      case "upload-image": {
        optionTemplate = (
          <View className="upload-image-wrapper">
            {
              valueData[questionIndex].map(imgObj => (
                <View className="img-wrapper">
                  <Image src={imgObj.url} />
                </View>
              ))
            }
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

export default Record;
