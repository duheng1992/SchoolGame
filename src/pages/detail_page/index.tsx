/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import DetailCard from "./components/DetailCard/index"
import "./index.scss";
import { data } from "./static"
import { getDetailData } from "@/api/detail";
import { getStore, setStore } from "@/utils/utils";

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
    detail_list: data,
    categoryId: null,
    detail_info: null
  };

  componentWillMount() {
    console.log(this.$router.params)
    const { categoryId } = this.$router.params;
    const detail = getStore('teachDetail')
    console.log('teachDetail', detail)
    this.setState({ categoryId, detail_info: detail })
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {
    const { categoryId } = this.state;
    getDetailData({ categoryId }).then(res => {
      console.log('res', res)
      const list = res.data.list.length > 0 ? res.data.list : data
      this.setState({ detail_list: list })
    })


  }

  componentWillReact() { }

  tapCard = item => {
    Taro.navigateTo({
      url: `/pages/detail_item_page/index?resourceId=${item.id}`,
    })
  }

  render() {
    const { detail_list, detail_info } = this.state
    return (
      <View className="detail_page" id="page">

        <View className="detail_head">
          <Image className="banner_image" mode="aspectFill" src={detail_info.bannerImage} />
          <View className='detail_info'>
            <View className='detail_subhead'>{detail_info.subhead}</View>
            <View className='detail_title'>教学资源·{detail_info.title}</View>
          </View>

        </View>
        <View className="detail_wrap">
          <View className='intro'>{detail_info.intro}</View>

          <View className="firstTitle">{detail_info.firstTitle}</View>
          <View className='firstTitleIntro'>{detail_info.firstTitleIntro}</View>
          <View className="detail_list">
            {detail_list.map(item => (
              <View onClick={() => this.tapCard(item)}>
                <DetailCard data={item}></DetailCard>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

export default _page;
