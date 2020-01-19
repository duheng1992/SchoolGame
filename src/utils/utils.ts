import Taro from "@tarojs/taro";
import { baseUrl } from "../config/baseUrl";
import logo from "@/images/card/logo_title.png";
import logo_title from "@/images/card/logo_title_bg.png";

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

export const toDetailByCategory = (item, type = "banner") => {
  const { moduleType, domainId, id } = item;
  // 1:教学资源,2:热门话题,3:专家答疑,4:专家直播,5:活动,6:活动追踪,7:校园活力展
  let itemId = domainId;
  if (type !== "banner") {
    itemId = id;
  }
  switch (moduleType) {
    case 1:
      Taro.navigateTo({
        url: `/pages/detail_page/index?categoryId=${itemId}`,
      });
      break;
    case 2:
      Taro.navigateTo({
        url: `/pages/theme_detail_page/index?themeId=${itemId}`,
      });
      break;
    case 5:
      Taro.navigateTo({
        url: `/pages/track_detail_page/index?trackId=${itemId}`,
      });
      break;
    case 6:
      Taro.navigateTo({
        url: `/pages/track_detail_page/index?trackId=${itemId}`,
      });
      break;

    case 6:
      Taro.showToast({
        title: "活力校园无数据",
        icon: "none",
      });
      break;

    default:
      break;
  }
};

export const drawImage = async (item_info, qrcode) => {
  // 创建canvas对象
  const ctx = Taro.createCanvasContext("cardCanvas");

  // 填充背景色
  const grd = ctx.createLinearGradient(0, 0, 1, 600);
  grd.addColorStop(0, "#FC4514");
  // grd.addColorStop(0.5, '#FFF')
  ctx.setFillStyle(grd);
  ctx.fillRect(0, 0, 500, 540);

  // 填充背景色
  const grd_in = ctx.createLinearGradient(0, 0, 1, 600);
  grd_in.addColorStop(0, "#fff");
  // grd.addColorStop(0.5, '#FFF')
  ctx.setFillStyle(grd_in);
  ctx.fillRect(15, 80, 292, 448);

  ctx.drawImage(logo_title, 0, 0, 332, 100);

  // // 绘制圆形用户头像
  const res = await Taro.downloadFile({
    url: item_info.bannerImage,
  });
  console.log("res", res);

  ctx.save();
  ctx.beginPath();
  ctx.drawImage(res.tempFilePath, 15, 80, 292, 180);
  ctx.restore();

  // 绘制文字
  ctx.save();
  ctx.setFontSize(18);
  ctx.setFillStyle("black");
  ctx.fillText(item_info.title, 30, 300);
  ctx.restore();
  const pdfInfo = item_info.pdfPageNum
    ? ` · ${item_info.pdfPageNum}页 · 已有${item_info.viewNum}人查看`
    : "";
  // 绘制文字
  ctx.save();
  ctx.setFontSize(14);
  ctx.setFillStyle("#999");
  ctx.fillText(`${item_info.title}${pdfInfo}`, 30, 325);
  ctx.restore();

  // 绘制二维码
  // let qrcodeUrl = await Taro.downloadFile({
  //   url: qrcode
  // })
  // console.log('qrcode', qrcode);

  ctx.drawImage(qrcode, 110, 350, 108, 108);
  // 绘制文字
  ctx.save();
  ctx.setFontSize(16);
  ctx.setFillStyle("black");
  ctx.fillText("长按小程序二维码", 100, 480);
  ctx.restore();

  // 绘制文字
  ctx.save();
  ctx.setFontSize(16);
  ctx.setFillStyle("black");
  ctx.fillText("进入查看更多信息", 100, 505);
  ctx.restore();

  // 将以上绘画操作进行渲染
  ctx.draw();
};

export const saveCard = async () => {
  // 将Canvas图片内容导出指定大小的图片
  const res = await Taro.canvasToTempFilePath({
    x: 0,
    y: 0,
    width: 330,
    height: 580,
    destWidth: 330,
    destHeight: 600,
    canvasId: "cardCanvas",
    fileType: "png",
  });
  const saveRes = await Taro.saveImageToPhotosAlbum({
    filePath: res.tempFilePath,
  });
  if (saveRes.errMsg === "saveImageToPhotosAlbum:ok") {
    Taro.showModal({
      title: "图片保存成功",
      content: "图片成功保存到相册了，快去发朋友圈吧~",
      showCancel: false,
      confirmText: "确认",
    });
  } else {
    Taro.showModal({
      title: "图片保存失败",
      content: "请重新尝试!",
      showCancel: false,
      confirmText: "确认",
    });
  }
};
