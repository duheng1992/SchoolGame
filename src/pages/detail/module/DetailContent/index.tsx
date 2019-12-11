/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Ruler from "@/components/Ruler";
import "./index.scss";
import { reference_filter } from "@/assets/data/filter";
import { wipeYear } from "@/utils/utils";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  data: any;
  dic: any;
  [propName: string]: any;
};

interface Arrow {
  props: ComponentsProps;
  state: StateType;
}

class Arrow extends Component {
  constructor(props) {
    super(props);
  }

  state: StateType = {};

  render() {
    const { data, dic } = this.props;
    let valueColor = "";
    if (data && dic) {
      if (dic.name !== "weight") {
        valueColor = "#B0AFAF";
      }
    } else {
      return "";
    }

    const { weightElement = {} } = data;
    const reference = reference_filter(data);
    return (
      <View className="wrapper">
        {dic.name === "weight" && (
          <View className="box weightBox">这里是体重对比量</View>
        )}
        <View className="box rulerBox">
          <View className="title">标准{dic.des}参考</View>
          <View className="sesc">{weightElement.eleDescribe}</View>
          <Ruler dic={dic} reference={reference} valueColor={valueColor} />
        </View>
        <View className="box contentBox">
          {data && data.prevRes && data.prevRes.value && (
            <View className="contrastBox">
              <View className="title">
                对比上次测量 <View className="value">+0.5%</View>
              </View>
              <View className="contrast">
                <View className="valuebox">
                  <View className="left">
                    {data.prevRes.value}
                    {dic.unit}
                  </View>
                  <View
                    className="value"
                    style={{
                      color: dic.name === "weight" ? "#B0AFAF" : "#fff",
                    }}
                  >
                    {wipeYear(data.prevRes.time)}测量
                  </View>
                </View>
                <View className="valuebox">
                  <View className="right">
                    {data.value}
                    {dic.unit}
                  </View>
                  <View
                    className="value"
                    style={{
                      color: dic.name === "weight" ? "#B0AFAF" : "#fff",
                    }}
                  >
                    {wipeYear(data.createTime)}测量
                  </View>
                </View>
              </View>
            </View>
          )}

          {weightElement.measureName && (
            <View className="elementBox">
              <View className="title">{weightElement.measureName}</View>
              <View className="cont">{weightElement.eleDescribe}</View>
            </View>
          )}
          <View
            className="warning"
            style={{
              color: dic.name === "weight" ? "#B0AFAF" : "#fff",
            }}
          >
            注：以上数据均是参考值，不建议作为医学数据
          </View>
        </View>
      </View>
    );
  }
}

export default Arrow;
