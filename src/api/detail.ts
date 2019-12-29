import { ajax, request_json } from "@/utils/http";

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

// 话题详情themeID
export const getThemeDetailByThemeId = (data) => {
  return ajax({
    url: `/api/theme/info/${data.themeId}`,
    method: "get",
  });
}

// 话题详情讨论themeID

export const getThemeDetailDiscussByThemeId = (data) => {
  return ajax({
    url: `/api/theme/discuss/list/${data.themeId}`,
    method: "get",
  });
}
// 话题讨论详情discussId
export const getThemeDetailDiscussDetailByDiscussId = (data) => {
  return ajax({
    url: `/api/theme/discuss/info/${data.discussId}`,
    method: "get",
  });
}

// 添加评论
export const createResourceComment = (data) => {
  return request_json({
    url: `/api/resource/create/comment`,
    data,
    method: "post",
  });
}

// 话题讨论详情discussId
export const getTrackDetailByTrackId = (data) => {
  return ajax({
    url: `/api/tracking/info/${data.trackId}`,
    method: "get",
  });
}