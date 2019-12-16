import { ajax } from "@/utils/http";

export const getHomeData = (data: { equipmentId }) => {
  return ajax({
    url: `/api/u/weight/record/home/${data.equipmentId}`,
    data,
    method: "get",
  });
};

// export const getDetailData = (data) => {
//   return ajax({
//     url: `/api/u/weight/record/detail/${data.id}/${data.field}`,
//     data,
//     method: "get",
//   });
// };

export const getDetailData = (data) => {
  return ajax({
    url: `/api/resource/category/list`,
    data,
    method: "post",
  });
};

export const delDetailData = (data) => {
  return ajax({
    url: `/api/u/weight/delete/${data.recordId}`,
    data,
    method: "post",
  });
};
