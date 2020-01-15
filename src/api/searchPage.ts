import { ajax, request_json } from "@/utils/http";
// import Taro from "@tarojs/taro";

export const getCommonSearchList = (data) => {
  return ajax({
    url: "/api/common/search",
    data,
    method: "get",
  });
};


export const uploadImage = (data) => {
  return request_json({
    url: "http://ip-29-nikeschoolyard-admin.coralcodes.com/api/ueditor?action=uploadimage",
    data,
    method: "post",
  });
};