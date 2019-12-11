/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import "./index.scss";
import { getStore, getUrlParam } from "@/utils/utils";
import { getDetailData, delDetailData } from "@/api/detail";
import WeightLine from "@/components/Echart/WeightLine";
import { weightLine_filter, dictionaries } from "@/assets/data/filter";
import { back_icon, share } from "@/images/load";
import DetailContent from "./module/DetailContent";

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
    const userToken = getStore("userToken");
    this.setState({
      userToken,
    });
  }

  state: StateType = {
    // token,
    isShow: false,
    chartData: {},
    data: {},
    id: "1",
    field: "weight",
    weightLineBackData: {
      time: "",
      value: "",
    },
    dic: dictionaries["weight"],
    statusBarHeight: 44,
    pageBoxH: 800,
  };

  componentWillMount() {}

  componentDidMount() {
    const { id, fie } = getUrlParam();
    const _this = this;
    if (id && fie) {
      this.setState(
        {
          id,
          field: fie,
          dic: dictionaries[fie],
        },
        () => {
          _this.getDetailData();
        },
      );
    } else {
      _this.getDetailData(); // del
      Taro.showToast({
        title: "缺少参数",
        icon: "none",
      });
    }
  }

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {
    const _this = this;
    const statusBarHeight = Taro.getSystemInfoSync().statusBarHeight;
    this.setState({
      statusBarHeight,
    });
    const pageBox = Taro.createSelectorQuery();
    pageBox.select("#page").boundingClientRect();
    pageBox.selectViewport().scrollOffset();
    pageBox.exec(function(res) {
      _this.setState({
        pageBoxH: Math.ceil(res[0].height),
      });
    });
  }

  componentWillReact() {}

  getDetailData = () => {
    const { id, field } = this.state;
    const _this = this;
    getDetailData({
      id,
      field,
    }).then((res) => {
      _this.setState(
        {
          data: res.data,
        },
        () => {
          _this.drawing();
        },
      );
    });
  };

  drawing = () => {
    const { data } = this.state;
    if (this.refWeightLine) {
      this.refWeightLine.refresh(weightLine_filter(data));
    }
  };

  config: Config = {
    navigationBarBackgroundColor: "#627D6B",
    navigationStyle: "custom",
  };

  unfold = () => {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow,
    });
  };

  rend_style = () => {
    const { isShow, statusBarHeight, pageBoxH, field } = this.state;
    let style: any = {};

    if (isShow) {
      style = {
        top: "20vh",
        height: "80vh",
      };
    } else {
      style = {
        top: `${220 + 44 + statusBarHeight}px`,
        height: `${pageBoxH - 220 - 44 - statusBarHeight}px`,
      };
    }
    if (field === "weight") {
      style.backgroundColor = "#F0E8DF";
    }
    return style;
  };

  refWeightLine;

  weightLineChange = (item) => {
    this.setState({
      weightLineBackData: item,
    });
  };

  goBack = () => {
    Taro.navigateBack({
      delta: 1,
    });
  };

  gotoShare = () => {
    Taro.showToast({
      title: "等待开放",
      icon: "none",
    });
  };

  delFun = () => {
    const _this = this;
    const { id } = this.state;
    delDetailData({
      recordId: id,
    }).then((res: any) => {
      if (res.code === "OK") {
        Taro.showToast({
          title: res.message,
          icon: "none",
        });
        _this.goBack();
      }
    });
  };

  showDelMudle = () => {
    const _this = this;
    Taro.showModal({
      title: "删除体重数据",
      content:
        "删除的同时也会将对应测量的其他身体成分数据进行删除，是否确定删除？",
      success(res) {
        if (res.confirm) {
          _this.delFun();
        } else if (res.cancel) {
          //
        }
      },
    });
  };

  render() {
    const { weightLineBackData, dic, statusBarHeight, data } = this.state;
    const style = this.rend_style();
    return (
      <View className="page" id="page">
        <View className="topBar">
          <View style={{ height: `${statusBarHeight}px` }}></View>
          <View className="titleBar">
            <View className="left">
              <Image
                className="backIcon"
                onClick={this.goBack}
                mode="widthFix"
                src={back_icon}
              />
              {dic.label}
            </View>
            <View className="center">
              <View className="str">{data.valueDesc}</View>
            </View>
            <View className="right">
              {dic.label}
              <Image className="backIcon" mode="widthFix" src={back_icon} />
            </View>
          </View>
        </View>
        <View className="topBox">
          <View className="topBox-title">
            {weightLineBackData.value}
            {dic.unit}
          </View>
          <View className="chartBox">
            <WeightLine
              ref={(node) => {
                this.refWeightLine = node;
              }}
              onChange={this.weightLineChange}
            />
          </View>
          <View className="topBox-detail">{weightLineBackData.time}</View>
        </View>
        <View className="contentBox" style={style}>
          <View className="topContent">
            <View className="lineBox" onClick={this.unfold}>
              <View className="line"></View>
            </View>
          </View>
          <ScrollView className="scrollBox" scrollY>
            <DetailContent data={data} dic={dic} />
          </ScrollView>
        </View>
        <View className="footer">
          <Image
            className="icon del"
            mode="widthFix"
            onClick={this.showDelMudle}
            src={share.del}
          />
          <Image
            className="icon share"
            mode="widthFix"
            onClick={this.gotoShare}
            src={share.share}
          />
        </View>
      </View>
    );
  }
}

export default _page;
