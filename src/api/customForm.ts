import { ajax, request_json } from "@/utils/http";

export const getFromById = (data) => {
  return ajax({
    url: "/api/questionnaire/get/detail",
    data,
    method: "get",
  });
};
export const saveAnswer = (data) => {
  return request_json({
    url: "/api/questionnaire/save/answer",
    data,
    method: "post",
  });
};
export const getAnswerByRecordId = (data) => {
  return ajax({
    url: "/api/questionnaire/answer/detail",
    data,
    method: "get",
  });
};
