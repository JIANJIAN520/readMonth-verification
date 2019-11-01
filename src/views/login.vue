<template>
  <div class="login">
    <van-field v-model="user" placeholder="请输入用户名" />
    <van-field v-model="pwd" type="password" placeholder="请输入密码" />
    <van-button type="primary" size="large" :loading="loginLoading" @click="login">确认</van-button>
  </div>
</template>

<script>
import { Field, Button } from "vant";
import api from "@/api";
export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button
  },
  data() {
    return {
      user: "",
      pwd: "",
      loginLoading: false
    };
  },
  methods: {
    /**
     * @desc:提交表单
     */
    async login() {
      if (!this.user || !this.pwd) {
        this.$toast.fail("请输入用户名与密码");
        return false;
      }
      this.loginLoading = true;
      const resData = await api.login({
        username: this.user,
        password: this.pwd
      });
      if (resData.status === 200) {
        this.loginLoading = false;
        if (resData.body.errno === 0) {
          localStorage.setItem("TOKEN", resData.body.data.token);
          this.$router.back();
          this.$toast.success("登录成功");
        } else {
          this.$toast.fail(resData.body.errstr);
        }
      } else {
        this.loginLoading = false;
        this.$toast.fail(resData.status + resData.statusText);
      }
    }
  }
};
</script>

<style scoped>
.login {
  padding: 20px 15px;
  color: #333;
}
</style>