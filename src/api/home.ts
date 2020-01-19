import { ajax, request_json } from "@/utils/http";
// import Taro from "@tarojs/taro";

export const getCategoryList = (data) => {
  return ajax({
    url: "/api/resource/category/list",
    data,
    method: "get",
  });
};

export const getTrackingList = (data?) => {
  return ajax({
    url: "/api/tracking/list",
    data,
    method: "get",
  });
};
export const getTrackingOldList = (data?) => {
  return ajax({
    url: "/api/tracking/news/list",
    data,
    method: "get",
  });
};

export const getThemeList = (data?) => {
  return ajax({
    url: "/api/theme/list",
    data,
    method: "get",
  });
};

export const getBannerList = () => {
  return ajax({
    url: "/api/common/banner",
    method: "get",
  });
};

//vigorous
export const getVigorousList = () => {
  return ajax({
    url: "/api/vigorous/list",
    method: "get",
  });
};

// 话题发布
export const releaseDiscussPublish = (data) => {
  return request_json({
    url: "/api/theme/discuss/publish",
    data,
    method: "post",
  });
};

// 报名参加活动

export const joinTracking = (data) => {
  return request_json({
    url: "/api/tracking/join",
    data,
    method: "post",
  });
};
