<template>
  <div class="index">
    <van-nav-bar title="核销" right-text="登录" @click-right="onClickRight" />
    <van-skeleton title :row="3" :loading="skeletonLoading">
      <van-cell-group>
        <van-cell title="姓名" :value="data.name" />
        <van-cell title="手机号" :value="data.phone" />
        <van-cell title="活动ID" :value="data.id" />
        <van-cell
          title="活动状态"
          :value="data.join_status === 1 ? '已报名' : data.join_status === 2 ? '已核销' : ''"
        />
        <!-- <van-cell title="报名时间" :value="new Date(data.createtime * 1000)" /> -->
        <van-cell title="活动标题" :label="data.activity_title" />
      </van-cell-group>
      <div class="confirm" v-if="data.join_status === 1">
        <van-button type="primary" :loading="confirmLoading" size="large" @click="confirm">核销</van-button>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import { NavBar, Button, Skeleton, Cell, CellGroup } from "vant";
import api from "@/api";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Skeleton.name]: Skeleton,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      data: {},
      skeletonLoading: true,
      confirmLoading: false
    };
  },
  mounted() {
    if (!localStorage.getItem("TOKEN")) {
      this.$router.push({ path: "/login" });
      this.$toast.fail("账号未登录");
      return false;
    }
    this.getVerificationData();
  },
  methods: {
    onClickRight() {
      this.$router.push({ path: "/login" });
    },
    async getVerificationData() {
      const resData = await api.getVerificationData({
        activity_join_id: this.$route.query.id
      });
      if (resData.status === 200) {
        this.skeletonLoading = false;
        if (resData.body.errno === 0) {
          this.data = resData.body.data;
        } else {
          this.$toast.fail(resData.body.errstr);
        }
      } else {
        this.skeletonLoading = false;
        this.$toast.fail(resData.status + resData.statusText);
      }
    },
    async confirm() {
      this.confirmLoading = true;
      const resData = await api.verify({
        activity_join_id: this.data.id
      });
      if (resData.status === 200) {
        this.confirmLoading = false;
        if (resData.body.errno === 0) {
          this.getVerificationData();
          this.$toast.success("核消成功");
        } else {
          this.$toast.fail(resData.body.errstr);
        }
      } else {
        this.confirmLoading = false;
        this.$toast.fail(resData.status + resData.statusText);
      }
    }
  }
};
</script>

<style scoped>
.confirm {
  padding: 30px 15px;
}
</style>