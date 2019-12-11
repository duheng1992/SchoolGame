import { ajax } from "@/utils/http";
// import Taro from "@tarojs/taro";

export const getEquipmentList = () => {
  return ajax({
    url: "/api/u/equipment/list",
    method: "get",
  });
};

export const bindEquipment = (data) => {
  return ajax({
    url: "/api/u/equipment/bind",
    data,
    method: "post",
  });
};
