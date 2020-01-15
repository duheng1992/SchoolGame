import { ajax, request_json } from "@/utils/http";

export const getHomeData = (data: { equipmentId }) => {
  return ajax({
    url: `/api/u/weight/record/home/${data.equipmentId}`,
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

export const getResourceBannerData = () => {
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
export const createResourceComment = (data?) => {
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

// 活动往期回顾详情
export const getTrackingOldDetailByNewsId = (data) => {
  return request_json({
    url: `/api/tracking/news/info/${data.newsId}`,
    method: "get",
  });
}

// 活动往期回顾评论列表
export const getTrackingOldDetailCommitByNewsId = (data) => {
  return request_json({
    url: `/api/tracking/news/comment/${data.newsId}`,
    method: "get",
  });
}

// 活动追踪收藏
export const favoriteNew = (data) => {
  return request_json({
    url: `/api/tracking/favorite/tracking/${data.newsId}`,
    data,
    method: "post",
  });
}

// 热门话题点赞
export const favoriteCommit = (data) => {
  return request_json({
    url: `/api/theme/favorite/${data.themeId}`,
    data,
    method: "post",
  });
}
// 热门话题点赞
export const praiseCommit = (data) => {
  return request_json({
    url: `/api/theme/discuss/praise/${data.newsId}`,
    data,
    method: "post",
  });
}

// 关注用户

export const focusUser = (data) => {
  return request_json({
    url: `/api/theme/discuss/follow/${data.discussId}`,
    data,
    method: "post",
  });
}

// 收藏话题

export const FavoriteTheme = (data) => {
  return request_json({
    url: `/api/theme/favorite/${data.themeId}`,
    data,
    method: "post",
  });
}