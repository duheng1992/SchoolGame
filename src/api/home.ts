import { ajax } from "@/utils/http";
// import Taro from "@tarojs/taro";

export const getCategoryList = () => {
  return ajax({
    url: "/api/resource/category/list",
    method: "get",
  });
};

export const getTrackingList = () => {
  return ajax({
    url: "/api/tracking/list",
    method: "get",
  });
};

