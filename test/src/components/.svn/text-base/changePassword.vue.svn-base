<template>
  <div class="changepassword">
    <h4 class="title1">修改密码</h4>
    <div class="inner">
      <!-- <p class="title">请输入新密码</p> -->

      <p class="psd">
        <i>输入原密码</i><input type="password" v-model.trim="num1"></p>
      <p class="psd">
        <i>输入新密码</i><input type="password" v-model.trim="num2"></p>
      <p class="psd">
        <i>确认新密码</i><input type="password" v-model.trim="num3"></p>
      <p class="sub" @click="sub">确定</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num1: "",
      num2: "",
      num3: ""
    };
  },
  methods: {
    sub() {
      if(!this.num1 || !this.num2 || !this.num3) {
        mui.alert("密码输入不能为空");
        return;
      }
      if (this.num2 && this.num2 != this.num3) {
        mui.alert("两次输入密码不一致");
        return;
      }
      this.savephone();
    },
    savephone() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/common/updatePwd",
        async: true,
        dataType: "json",
        data: {
          token: localStorage.otc_token,
          oldPwd: vm.num1,
          newPwd: vm.num2
        },
        success(res) {
          if (res.state.code == 20000) {
            // vm.getinit();
            vm.$emit("hideBox", false);
          } else if (res.state.code == 20002) {
            mui.alert(res.state.msg);
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.changepassword {
  // border-radius: 0.2rem;
  .title1 {
    font-size: 0.26rem;
    padding-left: 0.4rem;
    height: 0.84rem;
    line-height: 0.84rem;
    text-align: left;
    font-weight: 350;
    border-bottom: 0.01rem solid #e3e3e3;
  }
  .inner {
    width: 6rem;
    margin: 0 auto;
    margin-top: 0.5rem;
    p {
      font-size: 0.2rem;
      margin-bottom: 0.2rem;
      &.title {
        font-size: 0.25rem;
        text-align: left;
      }
      input {
        height: 0.4rem;
        width: 3rem;
        border-radius: 0.1rem;
        border: none;
        border: 0.01rem solid #dcdcdc;
        float: left;
        padding-left: 0.1rem;
        box-sizing: border-box;
      }
      &.psd {
        overflow: hidden;
        i {
          display: block;
          float: left;
          font-style: normal;
          width: 1.5rem;
          text-align: left;
          line-height: 0.4rem;
        }
      }
      &.sub {
        width: 1rem;
        margin: 0 auto;
        color: #fff;
        border-radius: 0.1rem;
        cursor: pointer;
        margin-top: 0.2rem;
        margin-bottom: 0.3rem;
        height: 0.4rem;
        line-height: 0.4rem;
        background: rgb(0, 132, 255);
      }
    }
  }
}
</style>