import { ajax, request_json } from "@/utils/http";

export const getUserBaseInfo = () => {
  return ajax({
    url: `/api/userInfo/baseInfo`,
    method: "get",
  });
};