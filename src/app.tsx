import Taro, { Component, Config } from "@tarojs/taro";
import { Provider } from "@tarojs/mobx";
import Index from "./pages/login";

import counterStore from "./store/counter";
import tabBarStore from "./store/tabBarStore";

import "@tarojs/async-await";

import "@/assets/style/reset.scss";

import "./app.scss";

import { clearUserInfo, getStore, setStore } from "@/utils/utils";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore,
  tabBarStore,
};

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  componentWillMount() {
    // const nowTime = new Date().getTime();
    // const getUserInfo_time = getStore("getUserInfo_time");
    // // 如果不存在时间点,则去login页面
    // if (getUserInfo_time) {
    //   //如果7天没操作就清空用户存储
    //   const day7 = 24 * 60 * 60 * 1000 * 7;
    //   if (nowTime - getUserInfo_time - day7 > 0) {
    //     clearUserInfo();
    //   }
    // } else {
    //   Taro.navigateTo({
    //     url: "/pages/login/index",
    //   });
    // }
  }

  config: Config = {
    pages: [
      "pages/home/index", //首页

      "pages/custom_form_record_page/index", // 自定义表单结果页
      "pages/custom_form_answer_page/index", // 自定义表单答题页

      "pages/binding/index", // 绑定设备
      "pages/personal/index", //个人中心
      "pages/personal/userinfo", //信息档案
      "pages/register/index", // 注册
      "pages/login/index", // 登录
      "pages/search_page/index", // 搜索
      "pages/join_page/index", // 搜索

      "pages/theme_detail_page/index", //话题详情页
      "pages/theme_detail_item_page/index", //话题讨论详情页
      "pages/release_page/index", //话题发布页
      "pages/track_detail_page/index", //活动追踪详情页
      "pages/track_old_detail_page/index", //活动追踪往期回顾详情页
      "pages/detail_page/index", //分类详情列表页面
      "pages/detail_item_page/index", //详情页面
      "pages/group_page/index", //教学分类页面
      "pages/theme_group_page/index", //热门分类页面
      "pages/track_group_page/index", //活动追踪分类页面
      "pages/personal/about/index", //关于活力校园
      "pages/dynamic_page/index", //我的动态
      "pages/focus_page/index", //我的动态
      "pages/entered_page/index", //我的已报活动

      // "pages/detail/index", //详情页面
      "pages/cheng_set/index", // 称的设置
      "pages/manage/index", // 管理称

      //demo
      // "pages/demo/mobxDemo/index",
      // "pages/demo/module_test_page/index",
      // "pages/demo/pageDemo/index",
      // "pages/demo/pageDemo_js/index",
    ],
    usingComponents: {},


    requiredBackgroundModes: ["audio"],
    window: {
      navigationBarBackgroundColor: "#ffffff",
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/home/index",
          // iconPath: "pages/images/tab_bar/home.png",
          // selectedIconPath: "pages/images/tab_bar/home-active.png",
          text: "",
        },
        {
          pagePath: "pages/personal/index",
          // iconPath: "pages/images/tab_bar/personal.png",
          // selectedIconPath: "pages/images/tab_bar/personal-active.png",
          text: "",
        },
      ],
      custom: true,
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
