import Taro, { Component } from "@tarojs/taro";
import { View, Canvas } from "@tarojs/components";
import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  [propName: string]: any;
  param: {
    w: number;
    h: number;
    weight: number;
    bg_color: string;
    start_color: string;
    end_color: string;
  };
  num: number;
};

interface CircleLoding {
  props: ComponentsProps;
  state: StateType;
}

class CircleLoding extends Component {
  static defaultProps = {
    param: {
      w: 110, // 宽
      h: 110, // 高
      weight: 10, // 粗细
      bg_color: "#D6DBDF",
      start_color: "#b1bcba",
      end_color: "#627c6b",
    },
    num: 70,
  };

  constructor(props) {
    super(props);
  }

  state: StateType = {};

  componentWillMount() {}

  componentDidMount() {
    this.drawProgressbg();
  }

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidShow() {}

  componentWillReact() {}

  drawCircle = () => {
    const { param, num } = this.props;
    if (num === 0) {
      return;
    }

    const { w, h, start_color, end_color, weight } = param;

    const context = Taro.createCanvasContext("canvasProgress", this);
    // 设置渐变
    const gradient = context.createLinearGradient(200, 100, 100, 200);
    if (num > 99) {
      gradient.addColorStop(0, end_color);
    } else {
      gradient.addColorStop(0, start_color);
    }
    gradient.addColorStop(1.0, end_color);
    context.setLineWidth(weight);
    context.setStrokeStyle(gradient);
    context.setLineCap("round");
    context.beginPath();
    const ppp1 = (num / 100) * 2 * Math.PI;
    const ppp2 = Math.PI / 2;
    context.arc(
      w / 2,
      h / 2,
      (w - weight) / 2,
      -(Math.PI / 2),
      ppp1 - ppp2,
      false,
    );
    context.stroke();
    context.draw();
  };

  drawProgressbg = () => {
    const { param } = this.props;
    const { w, h, weight } = param;
    // 使用 wx.createContext 获取绘图上下文 context
    const ctx = Taro.createCanvasContext("canvasProgressbg", this);
    ctx.setLineWidth(weight); // 设置圆环的宽度
    ctx.setStrokeStyle("#D6DBDF"); // 设置圆环的颜色
    ctx.setLineCap("round"); // 设置圆环端点的形状
    ctx.beginPath(); //开始一个新的路径
    ctx.arc(w / 2, h / 2, (w - weight) / 2, 0, 2 * Math.PI, false);
    //设置一个原点(110,110)，半径为100的圆的路径到当前路径
    ctx.stroke(); //对当前路径进行描边
    ctx.draw();
  };

  render() {
    const { param } = this.props;
    this.drawCircle();
    const { w, h, weight } = param;
    const cont_w = w - weight * 2;
    const cont_h = h - weight * 2;
    return (
      <View
        className="wrapper"
        style={{
          width: `${w}px`,
          height: `${h}px`,
        }}
      >
        <Canvas className="canvas_bg" canvasId="canvasProgressbg" />
        <Canvas className="canvas_loding" canvasId="canvasProgress" />
        <View className="contentBox">
          <View
            className="content"
            style={{
              width: `${cont_w}px`,
              height: `${cont_h}px`,
            }}
          >
            {this.props.children}
          </View>
        </View>
      </View>
    );
  }
}

export default CircleLoding;
