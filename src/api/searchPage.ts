import { ajax } from "@/utils/http";
// import Taro from "@tarojs/taro";

export const getCommonSearchList = (data) => {
  return ajax({
    url: "/api/common/search",
    data,
    method: "get",
  });
};
