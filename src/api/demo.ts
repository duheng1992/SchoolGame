import { ajax, baseUrl } from "@/utils/http";

export const getCommentListByDomainId = (data) => {
  /**
   * @description: 课程评论 - 课程详情
   * @param {
   * domainId, 课程id
   * type, 评论类型，1-课程，2-话题,可用值:1,2
   * page, 页码
   * size, 每页数量
   * }
   * @return:
   */
  return ajax({
    url: "/api/comment/list",
    data,
    method: "get",
  });
};

export const getOderDetail = (data) => {
  /**
   * @description: 负责接口需要进行数据map的
   */
  return new Promise(function(resolve, reject) {
    function filter(res) {
      const returnData = res.data;
      //数据处理函数
      const venuesHomeImage = returnData.venuesHomeImage;
      const cover_HomeImage = baseUrl + JSON.parse(venuesHomeImage)[0].file;
      returnData.cover_HomeImage = cover_HomeImage;

      return returnData;
    }

    ajax({
      url: "/u/order/blockDetail",
      data,
      method: "get",
    })
      .then((res) => {
        const asyncData = filter(res);
        resolve(asyncData);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
