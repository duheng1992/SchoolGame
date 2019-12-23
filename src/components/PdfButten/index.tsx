/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import card_pdf from "@/images/card/card_pdf.png"

import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  showPDfModel: Function;
  pdfFileUrl: string;
};

interface PdfButten {
  props: ComponentsProps;
  state: StateType;
}

class PdfButten extends Component {
  static defaultProps: ComponentsProps = {
    pdfFileUrl: '',
    showPDfModel: () => { }
  }

  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,

  };

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() { }

  componentWillReact() { }
  render() {
    const { showPDfModel } = this.props
    return <View className="item_pdf_btn" onClick={() => showPDfModel()}>
      <Image className="pdf_img" src={card_pdf}></Image>
      PDF课件下载
    </View>
  }
}

export default PdfButten;
