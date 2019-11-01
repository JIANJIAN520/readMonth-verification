/**
 * 项目全部 API 接口定义，每个接口需要描述清楚作用，方便查找
 *
 */
/*
async aaaaaaaaaa() {
      this.$toast.loading("loading...");
      const resData = await api.aaaaaaaa();
      if (resData.status === 200) {
        this.$toast.clear();
        if (resData.body.errno === 0) {
        } else {
          this.$toast.fail(resData.body.errstr);
        }
      } else {
        this.$toast.clear();
        this.$toast.fail(resData.status + resData.statusText);
      }
    },
*/
import http from "zl-fetch";
import config from "@/config";

export default {
  /**
   * @desc 核销员登录
   * @param params 账号: username	必填
   * @param params 密码: password	必填
   */
  login(params) {
    return http.post(config.baseURL + "/admin/Verification/login", {
      body: params
    });
  },
  /**
   * @desc 查看报名信息
   * @param params 参与活动的id: activity_join_id	必填
   */
  getVerificationData(params) {
    return http.post(config.baseURL + "/admin/Verification/index", {
      body: params,
      headers: {
        token: localStorage.getItem("TOKEN") || ""
      }
    });
  },
  /**
   * @desc 核销
   * @param params 参与活动的id: activity_join_id	必填
   */
  verify(params) {
    return http.post(config.baseURL + "/admin/Verification/verify", {
      body: params,
      headers: {
        token: localStorage.getItem("TOKEN") || ""
      }
    });
  }
};
