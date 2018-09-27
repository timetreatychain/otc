<template>
  <div class="changenum">
    <!-- 修改手机号码 -->
    <div class="xgsjh" v-show="xghm == 1">
      <p class="title1">修改手机号</p>
      <div class="xgsjh_con">
        <p v-if="!initinfo.phoneNum">为了保障您的账号安全，会先给你的邮箱发送一封验证邮件</p>
        <p v-if="initinfo.phoneNum">为了保障您的账号安全，变更信息前需验证身份</p>
        <p v-if="initinfo.phoneNum">验证码将发送至原绑定手机{{initinfo.phoneNum}}</p>
        <p v-if="initinfo.phoneNum" class="inpinfo"><input type="text" v-model="input3" placeholder="请输入手机验证码">
          <span id="gettelcode" @click="telcode">获取验证码</span>
        </p>
        <p v-if="initinfo.phoneNum" class="sub" @click="checkorgphone">确定</p>
        <p v-if="!initinfo.phoneNum" class="inpinfo"><input type="text" placeholder="请输入邮箱验证码" v-model="email11">
          <span id="gettelcode11" @click="getemailcode11">获取验证码</span>
        </p>
        <p v-if="!initinfo.phoneNum" class="sub" @click="checkorgemail11">确定</p>
      </div>
    </div>
    <div class="xgsjh" v-show="xghm == 2">
      <p class="title1">修改手机号</p>
      <div class="xgsjh_con1">
        <p>
          <el-select v-model="value" placeholder="中国+86">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </p>
        <p>
          <el-input v-model="input1" placeholder="请输入新手机号码"></el-input>
        </p>
        <p class="inpinfo">
          <el-input v-model="input4" placeholder="请输入手机验证码"></el-input>
          <span id="gettelcode2" @click="getcode">获取验证码</span>
        </p>
        <p class="sub" @click="savephone">确定</p>
      </div>
    </div>
    <!-- 修改手机号码 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // input3: "",
      code_tel11: true,
      email11: "",
      code_tel10: true,
      email3: "",
      code_tel5: true,
      newemail1: "",
      newemail: "",
      newemailnum: "",
      input4: "",
      input3: "",
      code_tel1: true,
      code_tel: true,
      secondinfo: "",
      initinfo: {},
      susess1: 0,
      options: [
        {
          value: "选项1",
          label: "中国+86"
        }
      ],
      code_tel4: true,
      value: "",
      susess: 0,
      input1: "",
      input2: "",
      index0: 0,
      index1: 0,
      xghm: "",
      index2info: "",
      psd1: "",
      psd2: "",
      psd3: "",
      acounttype: ""
    };
  },
  watch: {
    initinfo(val) {
      if (val && val.account.indexOf("@") != -1) {
        this.acounttype = "eamil";
      } else {
        console.log("00000");
        this.acounttype = "qkid";
      }
    }
  },
  mounted() {
    console.log(this.initinfo);
    this.getinit();
  },
  methods: {
    getinit() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/user/getUserData",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.coinlang || "zh",
          token: localStorage.otc_token
        },
        success(res) {
          if (res.state.code == 20000) {
            vm.initinfo = res.data;
            if (vm.initinfo.account.indexOf("@") == -1) {
              vm.acounttype = "qkid";
              console.log(vm.acounttype);
              console.log(vm.initinfo.phoneNum);
            }
            console.log(vm.acounttype);
            if (!vm.initinfo.phoneNum && vm.acounttype == "qkid") {
              vm.xghm = 2;
              return;
            }
            vm.xghm = 1;
            // if(vm.initinfo.phoneNum) {
            //   vm.xghm = 1;
            // }else {
            //   vm.xghm = 2;
            // }
          }
        }
      });
    },
    // 确认原手机是否正确
    checkorgphone() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/common/affirmPhone",
        async: true,
        dataType: "json",
        data: {
          token: localStorage.otc_token,
          code: vm.input3
        },
        success(res) {
          if (res.state.code == 20000) {
            vm.sub();
          } else if (res.state.code == 20002) {
            mui.alert(res.state.msg);
          }
        }
      });
    },
    sub() {
      this.index0 = 1;
      this.index1 = 1;
      this.xghm = 2;
    },
    checkorgemail11() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/common/affirmPhone",
        async: true,
        dataType: "json",
        data: {
          token: localStorage.otc_token,
          // project: 0,
          // languageType: "zh",
          code: vm.email11
        },
        success(res) {
          if (res.state.code == 20000) {
            vm.sub();
          }
        }
      });
    },

    // 确认原邮箱是否正确
    checkorgemail() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath1 + "/api/reg/address/updateEmailcodeConfirm",
        async: true,
        dataType: "json",
        data: {
          token: localStorage.time_token,
          project: 0,
          languageType: "zh",
          code: vm.email3
        },
        success(res) {
          if (res.state.code == 20000) {
            vm.sub2();
          }
        }
      });
    },

    // 确认旧邮箱验证码
    //手机验证码
    getemailcode() {
      let vm = this;
      // if($('#tel').val().length<11){
      // 	mui.alert('您输入的手机号码有误！')
      // }else
      if (vm.code_tel5) {
        vm.code_tel5 = false;
        $.ajax({
          type: "post",
          url: contextPath1 + "/api/reg/address/updateEmailCode",
          async: true,
          dataType: "json",
          data: {
            languageType: localStorage.language || "zh",
            project: 0,
            token: localStorage.time_token
          },
          success(res) {
            $("#gettelcode5").html("已发送");
            var count7 = 60;
            var time = setInterval(() => {
              if (count7 > 0) {
                $("#gettelcode5").html(count7 + "S");
              } else {
                clearInterval(time);
                vm.code_tel5 = true;
                $("#gettelcode5").html("点击获取");
              }
              count7--;
            }, 1000);
          }
        });
      } else {
        mui.alert("60秒内请勿重复点击！");
      }
    },

    // 绑定新手机号码
    savephone() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/common/updatePhone",
        async: true,
        dataType: "json",
        data: {
          // languageType: localStorage.language || "zh",
          // project: 0,
          token: localStorage.otc_token,
          account: vm.input1,
          code: vm.input4
        },
        success(res) {
          if (res.state.code == 20000) {
            // vm.sub1();
            vm.getinit();
            // vm.getsecond();
            vm.$emit("hideBox", false);
            location.reload();
          } else if (res.state.code == 20002) {
            mui.alert(res.state.msg);
          }
        }
      });
      // }else{
      // 	mui.alert('60秒内请勿重复点击！')
      // }
    },

    getsecond() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/certification/getSafetyById",
        async: true,
        dataType: "json",
        data: {
          token: localStorage.otc_token
          // project: 0,
          // languageType: "zh"
        },
        success(res) {
          // vm.initinfo = res.data
          vm.secondinfo = res.data;
        }
      });
    },
    sub1() {
      let timer = "";
      clearInterval(timer);
      this.index0 = 1;
      this.index1 = 0;
      this.xghm = 0;
      this.susess = 1;
      timer = setTimeout(() => {
        this.susess = 0;
      }, 2000);
    },

    // 获取新手机验证码
    //手机验证码
    getcode() {
      let vm = this;
      if (this.input1.length < 11) {
        mui.alert("您输入的手机号码有误！");
      } else if (vm.code_tel1) {
        vm.code_tel1 = false;
        $.ajax({
          type: "post",
          url: contextPath + "/api/push/common/updatePhoneCode",
          async: true,
          dataType: "json",
          data: {
            // languageType: localStorage.language || "zh",
            token: localStorage.otc_token,
            account: vm.input1
          },
          success(res) {
            if (res.state.code == 20000) {
              clearInterval(time1);
              $("#gettelcode2").html("已发送");
              var count1 = 60;
              var time1 = setInterval(() => {
                if (count1 > 0) {
                  $("#gettelcode2").html(count1 + "S");
                } else {
                  clearInterval(time1);
                  vm.code_tel1 = true;
                  $("#gettelcode2").html("点击获取");
                }
                count1--;
              }, 1000);
            }
          },
          error () {
            vm.code_tel1 = true;
          }
        });
      } else {
        mui.alert("60秒内请勿重复点击！");
      }
    },

    getemailcode11() {
      let vm = this;
      // if($('#tel').val().length<11){
      // 	mui.alert('您输入的手机号码有误！')
      // }else
      if (vm.code_tel11) {
        vm.code_tel11 = false;
        $.ajax({
          type: "post",
          url: contextPath + "/api/push/common/verificationPhone",
          async: true,
          dataType: "json",
          data: {
            // languageType: localStorage.language || "zh",
            // project: 0,
            token: localStorage.otc_token
          },
          success(res) {
            $("#gettelcode11").html("已发送");
            var count7 = 60;
            var time = setInterval(() => {
              if (count7 > 0) {
                $("#gettelcode11").html(count7 + "S");
              } else {
                clearInterval(time);
                vm.code_tel11 = true;
                $("#gettelcode11").html("点击获取");
              }
              count7--;
            }, 1000);
          }
        });
      } else {
        mui.alert("60秒内请勿重复点击！");
      }
    },

    //手机验证码
    telcode() {
      let vm = this;
      // if($('#tel').val().length<11){
      // 	mui.alert('您输入的手机号码有误！')
      // }else
      if (vm.code_tel) {
        vm.code_tel = false;
        $.ajax({
          type: "post",
          url: contextPath + "/api/push/common/verificationPhone",
          async: true,
          dataType: "json",
          data: {
            // languageType: localStorage.language || "zh",
            // project: 0,
            token: localStorage.otc_token
          },
          success(res) {
            clearInterval(time);
            $("#gettelcode").html("已发送");
            var count = 60;
            var time = setInterval(() => {
              if (count > 0) {
                $("#gettelcode").html(count + "S");
              } else {
                clearInterval(time);
                vm.code_tel = true;
                $("#gettelcode").html("点击获取");
              }
              count--;
            }, 1000);
            if (res.state.code == 20002) {
              mui.alert(res.state.msg);
            }
          }
        });
      } else {
        mui.alert("60秒内请勿重复点击！");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.changenum {
  .title {
    line-height: 0.82rem;
    text-align: left;
    font-size: 0.26rem;
    font-weight: 300;
    padding-left: 0.2rem;
    border-bottom: 0.01rem solid #e3e3e3;
  }
  .lastphone {
    font-size: 0.24rem;
    margin-top: 0.2rem;
  }
  .xgsjh {
    font-size: 0.24rem;
    .title1 {
      font-size: 0.3rem;
      padding-left: 0.4rem;
      height: 0.84rem;
      line-height: 0.84rem;
      text-align: left;
      border-bottom: 0.01rem solid #e3e3e3;
    }
    .xgsjh_con1 {
      width: 4rem;
      margin: 0 auto;
      margin-top: 0.4rem;
      .mima1 {
        display: block;
        font-size: 0.24rem;
        margin-bottom: 0.2rem;
        // margin-top: 0.2rem;
      }
      p {
        // height: 0.6rem;
        margin-bottom: 0.3rem;
        & /deep/ .el-input {
          width: 4rem;
          display: inline-block;
        }
        & /deep/ .el-input .el-input__inner {
          padding: 0 0.1rem;
        }
        &.sub {
          cursor: pointer;
          border-radius: 0.1rem;
          margin-top: 0.3rem;
          width: 4rem;
          background: #ffd022;
          height: 38px;
          text-align: center;
          line-height: 38px;
          font-size: 0.2rem;
          margin-bottom: 0.4rem;
        }
        &.inpinfo {
          span {
            cursor: pointer;
            border-radius: 0.1rem;
            height: 38px;
            text-align: center;
            line-height: 38px;
            float: right;
            width: 1.6rem;
            font-size: 0.18rem;
            background: #e6e6e6;
          }
        }
        &.inpinfo /deep/ .el-input {
          width: 2.2rem;
        }
      }
    }
    .xgsjh_con {
      width: 7rem;
      margin: 0 auto;
      margin-top: 0.4rem;
      p {
        text-align: left;
        line-height: 0.6rem;
        &.inpinfo {
          width: 5rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          input {
            display: block;
            // box-sizing: border-box;
            width: 3rem;
            height: 0.5rem;
            background: #f4f4f4;
            border: 0.01rem solid #e6e6e6;
            color: #999;
            border: none;
            padding-left: 0.2rem;
          }
          span {
            cursor: pointer;
            display: block;
            height: 0.5rem;
            width: 1.4rem;
            background: #e6e6e6;
            line-height: 0.5rem;
            font-size: 0.18rem;
            border: 0.01rem solid #e6e6e6;
            text-align: center;
          }
        }
        &.sub {
          cursor: pointer;
          margin-top: 0.2rem;
          width: 5rem;
          background: #ffd022;
          height: 0.5rem;
          text-align: center;
          line-height: 0.5rem;
          font-size: 0.2rem;
          margin-bottom: 0.4rem;
        }
      }
    }
  }
}
</style>