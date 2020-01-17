import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { getUserInfo } from "@/api/login";

import { getStore } from "@/utils/utils";

import { AtList, AtListItem, AtAvatar } from "taro-ui";
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

import { observer, inject } from "@tarojs/mobx";

@inject("tabBarStore")
@observer
class _page extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  state: StateType = {};

  componentWillMount() {}

  componentDidMount() {}

  componentDidShow() {}

  componentWillReact() {}

  preview() {
    Taro.previewImage({
      current: "http://file.photomoments.club/ewm.jpg?v=1",
      urls: ["http://file.photomoments.club/ewm.jpg?v=1"],
    });
  }

  render() {
    return (
      <View className="Page">
        <View className="about">
          <View>
            “活力校园”的朋友们，你们好。这里是耐克“活力校园”项目全新的微信小程序平台，我们期待您的关注。\n\n\n
          </View>
          <View className="h6">什么是“活力校园”\n \n</View>
          <View>
            对于中国青少年运动的支持和帮助是耐克公司一直不变的宗旨。耐克和教育部自2013年开始合作，并于2016年续约，达成长期战略合作，正式开启“活力校园”项目。该项目致力于在学校培育运动文化，开展体育教育创新。2016年至2019年，“活力校园”计划在全国培训超过7000名体育教师，同时，“活力校园”在北京、上海各选出百所左右小学，通过送教上门、教师培训、教材开发等方式，推动学校体育运动的开展，运动类型包括跑步、足球和篮球等。
          </View>
          <View className="mt36">
            <Image
              className="img"
              src="https://image.photomoments.club/gy1.jpg"
              mode="widthFix"
            />
            <Image
              className="img"
              src="https://image.photomoments.club/gy2.jpg"
              mode="widthFix"
            />
          </View>
          <View className="h6">
            全国小学体育活力校园优秀案例征集评选活动\n\n
          </View>
          <View>
            2017年起，在教育部体卫艺司的指导下，由耐克公司与中国教育发展基金会联合发起全国小学体育活力校园优秀案例征集评选活动，推出“活力校园创新奖”，旨在激发学校和体育教师的积极性和创造性，更有效地开展校园体育。\n
          </View>
          <View>
            截至目前，全国小学体育活力校园优秀案例征集评选活动已成功举办了两届。“活力校园创新奖”颁奖典礼分别在2017年7月与2018年7月在北京水立方举行。包括CCTV,
            新华社、人民日报、中新社、中国日报、环球时报等在内的多家全国重点媒体现场报道了颁奖，引起了良好的社会反响，在全社会推动了“当体育老师光荣”的氛围。两次颁奖典礼嘉宾由教育部体卫艺司司长王登峰、著名运动员李娜、刘翔担任，此外，著名运动员姚明受邀担任第二届活动颁奖嘉宾。同时，国际足球运动员克里斯蒂亚诺•罗纳尔多也先后两次参与到活动进程中来。
          </View>
          <View className="mt36">
            <Image
              className="img"
              src="https://image.photomoments.club/gy3.jpg"
              mode="widthFix"
            />
          </View>
          <View>
            “活力校园”获奖案例也受到了广泛的传播观看。首届活动的获奖案例中，甘肃河口小学语文老师吕少武自发当孩子的体育老师，教孩子练习足球的视频故事，通过央视微博的传播，吸引了600多万人次点击观看。C罗也在颁奖礼上为吕少武老师亲自颁奖并赠送足球战靴。第二届活动的获奖案例中，福建省永春县蓬壶仙岭小学的林美珍老师利用废旧自行车胎开展丰富的体育活动、创造性地解决偏远地区物资不足的故事，通过央视新闻微博的传播，吸引了500多万人次点击观看。
          </View>
          <View className="mt36">
            <Image
              className="img"
              src="https://image.photomoments.club/gy4.jpg"
              mode="widthFix"
            />
          </View>
          <View>
            除此之外，部分教师还特别获得了由耐克公司体育公益部提供的赴美访问访问交流培训的活动机会。
          </View>
          <View className="mt36">
            <Image
              className="img"
              src="https://image.photomoments.club/gy5.jpg"
              mode="widthFix"
            />
            <Image
              className="img"
              src="https://image.photomoments.club/gy6.jpg"
              mode="widthFix"
            />
          </View>
          <View>
            2019年全国小学体育活力校园优秀案例征集评选活动也已经启动。这个夏天，第三届“活力校园创新奖”颁奖典礼将如期举办，敬请期待。\n\n\n
          </View>
          <View className="h6">“活力校园”小程序平台\n\n</View>
          <text>
            为了更好地服务参与“活力校园”项目的众多体育教师，总结和交流小学体育教学中创新性的经验、做法和成果，我们在2019年2月推出了“活力校园”小程序平台。这里将成为一个独属于众多体育教师的社区。在这里，您可以看到来自耐克体育公益部和全国各地的精品体育课件，和成千上万名体育教师交流经验、分享心得，共同促进小学阶段体育教育教学的发展。\n\n
          </text>

          <text>
            我们也将在这里发布与“活力校园”项目相关的最新资讯。一年一度的全国小学体育活力校园优秀案例征集评选活动，亦将通过这个小程序发布最新消息。\n\n
          </text>

          <text>
            我们诚挚地邀请您通过这款小程序继续关注“活力校园”，分享您的教学心得，和我们一起为推动中国体育教育事业的改革和进步做出贡献。\n\n
          </text>

          <View className="z">
            注：您可以通过关注下方的公众号自动开启“活力校园”活动的通知消息。
          </View>

          <View className="ewm">
            <Image
              className="img"
              onClick={() => {
                return this.preview();
              }}
              src="http://file.photomoments.club/ewm.jpg?v=1"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default _page;
