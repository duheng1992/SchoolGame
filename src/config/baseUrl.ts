// let url = 'https://xcx.joywaygym.com'; //生产服
// const url = "http://ip-29-zhinengchen-app.coralcodes.com"; //测试服
const url = 'https://huolixiaoyuan.photomoments.club'

export const baseUrl = url;

const H5_url = "http://localhost:3002"; //内嵌H5页面的域名

export const WebView_domain = H5_url;

// let image_url = 'https://image.xxxxx.com'; //小程序内引用图片的路径
const image_url = "http://file.o-sheepps.com"; //小程序内引用图片的路径
export const image_domain = image_url;
export const loginVideo = "http://file.o-sheepps.com/login_video.mp4?id=1";

// 版本信息管理
const versionList = [
  {
    code: "0.0.7 ",
    describe: "未登录的调整",
    user: "Mark",
  },
  {
    code: "0.0.6 ",
    describe: "调整",
    user: "Mark",
  },
  {
    code: "0.0.4 ",
    describe: "Home动画修改",
    user: "Mark",
  },
  {
    code: "0.2.0",
    describe: "支持编译sass",
    user: "Mark",
  },
  {
    code: "0.1.0",
    describe: "Public_Taro_weapp",
    user: "Mark",
  },
];

export const printVersion = () => {
  const version = versionList[0];
  console.groupCollapsed(
    `%c version -- ${version.code}`,
    "font-size:10;color:green;font-weight:bold;",
  );
  console.info(
    `%c describe -- ${version.describe}`,
    "font-size:10;color:green;font-weight:bold;",
  );
  console.info(
    `%c user -- ${version.user}`,
    "font-size:10;color:green;font-weight:bold;",
  );
  console.groupEnd();
};
