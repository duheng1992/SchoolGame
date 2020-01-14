import { ajax, request_json } from "@/utils/http";

export const getFromById = (data) => {
  return ajax({
    url: `/api/questionnaire/get/detail`,
    data,
    method: "get",
  });
};
