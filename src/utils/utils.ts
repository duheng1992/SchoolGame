import Taro from "@tarojs/taro";
import { baseUrl } from "../config/baseUrl";

export const getUrlParam = () => {
  /**
   * @description:获取当前页面的路由参数
   * @param null
   * @return: {*}
   */
  const pages = Taro.getCurrentPages();
  if (pages.length) {
    const param = pages[pages.length - 1].options;
    return param;
  }
  return {};
};

export const getStore = (key) => {
  /**
   * @description: 获取本地存储的值
   * @param: String
   * @return: value
   */
  const storage = Taro.getStorageSync(key);
  return storage;
};

export const setStore = (key, data) => {
  /**
   * @description: 设置本地存储
   * @param: (key,value)
   * @return: null
   */
  const storage = Taro.setStorageSync(key, data);
  return storage;
};

export const removeStore = (key) => {
  /**
   * @description: 删除本地存储
   * @param: String
   * @return: null
   */
  const storage = Taro.removeStorageSync(key);
  return storage;
};

export const clearStore = () => {
  /**
   * @description: 清空本地存储
   * @param: null
   * @return: null
   */
  const storage = Taro.clearStorageSync();
  return storage;
};

export const filterImageUrl = (param) => {
  /**
   * @description: 图片链接过滤器
   * @param
              "[{"title":"1556601754","file":"/upxxx ||
              utl
   * @return:  url
  */
  let returnUrl = "";
  if (param.indexOf("[{") > -1) {
    const obj = JSON.parse(param);
    returnUrl = obj[0].file;
  } else {
    returnUrl = param;
  }
  if (returnUrl.includes("http")) {
    return returnUrl;
  } else {
    if (returnUrl) {
      returnUrl = baseUrl + returnUrl;
    } else {
      return "";
    }
  }
  return returnUrl;
};

export const formatDate = (timeUnix) => {
  /**
   * @description: 时间戳格式化
   * @param {type}
   * @return:
   */
  const now = new Date(timeUnix);
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();

  return `${year}-${month}-${date}   ${hour}:${minute}`;
};

export const fs_overflow = (str, num) => {
  /**
   * @description:  文字超出个数点点点
   * @str  //需要裁切的文字
   * @num   //裁切个数
   * @return: string
   */
  if (str) {
    if (str.length > num) {
      return `${str.slice(0, num)}...`;
    } else {
      return str;
    }
  } else {
    return "";
  }
};

export const pureData = (data) => {
  return JSON.parse(JSON.stringify(data));
};

export const clearUserInfo = () => {
  const nowTime = new Date().getTime();
  console.info("清除了用户存储");
  removeStore("userInfo");
  removeStore("userToken");
  setStore("getUserInfo_time", nowTime);
};

//设置顶栏的颜色
export const setTopColor = (color) => {
  Taro.setNavigationBarColor({
    frontColor: "#ffffff",
    backgroundColor: color,
    animation: {
      duration: 300,
    },
  });
};

//去除年份
export const wipeYear = (date) => {
  const date_split = date.split(" ");
  const day = date_split[0];
  const sec = date_split[1];
  const day_split = day.split("-");
  const sec_split = sec.split(":");

  return `${day_split[1]}月${day_split[2]}日 ${sec_split[0]}:${sec_split[1]}`;
};


export const toDetailByCategory = item => {
  const { moduleType, id } = item
  // 1:教学资源,2:热门话题,3:专家答疑,4:专家直播,5:活动,6:活动追踪,7:校园活力展
  switch (moduleType) {
    case 1:
      Taro.navigateTo({
        url: `/pages/detail_page/index?categoryId=${id}`,
      });
      break;
    case 2:
      Taro.navigateTo({
        url: `/pages/theme_detail_page/index?themeId=${id}`,
      });
      break;
    case 5:
      Taro.navigateTo({
        url: `/pages/theme_detail_page/index?themeId=${id}`,
      });
      break;
    case 6:
      Taro.showToast({
        title: '活力校园无数据',
        icon: 'none'
      })
      // Taro.navigateTo({
      //   url: `/pages/theme_detail_page/index?themeId=${id}`,
      // });
      break;

    default:
      break;
  }
}

