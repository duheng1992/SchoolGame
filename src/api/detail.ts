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
    url: `/api/resource/info/list`,
    data,
    method: "get",
  });
};

export const getResourceData = () => {
  return ajax({
    url: `/api/resource/banner/list`,
    method: "get",
  });
};

export const getResourceInfoData = (resourceId) => {
  return ajax({
    url: `/api/resource/info/${resourceId}`,
    method: "get",
  });
};

export const getCommentListByResourceId = (resourceId) => {
  return ajax({
    url: `/api/resource/comment/${resourceId}`,
    method: "get",
  });
};

export const delDetailData = (data) => {
  return ajax({
    url: `/api/u/weight/delete/${data.recordId}`,
    data,
    method: "post",
  });
};
