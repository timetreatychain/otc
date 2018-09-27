<template>
  <div class="buy">
    <div class="title_div">
      <div class="text">个人中心</div>
    </div>
    <div class="main">
      <div class="info">
        <div class="info_l">
          <img :src="initinfo.picUrl" alt="">
          <div class="info_l_r">
            <p>{{$t("app.usercenter.nc")}}：
              <i>{{initinfo.name}}</i>
            </p>
            <p>{{$t("app.usercenter.zh")}}： {{initinfo.account}}</p>
            <p>{{$t("app.usercenter.scdl")}}： {{initinfo.lastLoginLog}}</p>
          </div>
        </div>
        <ul class="info_r">
          <li>
            <i>{{initinfo.cashDeposit}}<small>bidt</small></i>
            <!--<span></span>-->
            <!--<p>{{$t("app.usercenter.hprs")}}</p>-->
            <p>保证金</p>
          </li>
          <li>
            <i>{{initinfo.payCount}}<small>笔</small></i>
            <!--<span></span>
            <p>{{$t("app.usercenter.cprs")}}</p>-->
            <p>成交量</p>
          </li>
          <li>
            <i>{{initinfo.successRat}}%</i>
            <!--<span></span>
            <p>{{$t("app.usercenter.jycs")}}</p>-->
            <p>成交率</p>
          </li>
        </ul>
      </div>
      <div class="setting">
        <ul class="setting_l">
          <li @click="showaqjz" :class="[index1 == 1 ? 'active':'' ]">{{$t("app.usercenter.aqsz")}}</li>
          <li @click="showaqbzj" :class="[index1 == 2 ? 'active':'' ]">{{$t("app.usercenter.bzj")}}</li>
          <li @click="showsksz" :class="[index1 == 3 ? 'active':'' ]">{{$t("app.usercenter.sksz")}}</li>
        </ul>
        <div class="setting_r">
          <!-- <fadepane> -->
          <ul class="safesetting" v-if="showaj">
            <li>{{$t("app.usercenter.aqsz")}}</li>
            <li v-if="initinfo.phoneNum">{{$t("app.usercenter.bdsj")}}
              <span class="sec secs">{{initinfo.phoneNum}}</span>
              <!-- <span class="third">{{$t("app.usercenter.bd")}}</span> -->
              <span class="third" @click="xgsjh">{{$t("app.usercenter.xg")}}</span>
            </li>
            <li v-if="!initinfo.phoneNum">{{$t("app.usercenter.bdsj")}}
              <!-- <span class="sec"><input type="text" v-model="phone1" class="sjhm"></span> -->
              <!-- <input type="text"> -->
              <!-- <span class="third">{{$t("app.usercenter.bd")}}</span> -->
              <span v-if="initinfo.phoneNum" class="third">{{$t("app.usercenter.xg")}}</span>
              <!-- <span v-if="!initinfo.phoneNum" class="third" @click="bcsjh">保存</span> -->
              <span v-if="!initinfo.phoneNum && initinfo.account" class="third" @click="xgsjh">修改</span>
              <!-- <span v-if="!initinfo.phoneNum && !initinfo.account" class="third" @click="changePhonenum">修改1</span> -->
            </li>
            <!-- <li>{{$t("app.usercenter.bdyx")}}
              <span class="sec">996105570@qq.com</span>
              <span class="third">{{$t("app.usercenter.xg")}}</span>
            </li> -->
            <li v-if="acounttype != 'qkid'">
              {{$t("app.usercenter.dlmm")}}
              <span class="third" @click="xgmm">{{$t("app.usercenter.xg")}}</span>
            </li>
            <li>{{$t("app.usercenter.bdqkdd")}}
              <span class="sec secs">{{initinfo.id}}</span>
            </li>
          </ul>
          <!-- 修改手机号 -->
          <div class="changePhoneNum" v-show="index1 == 4">
           <changenum @hideBox="hidechangenum" :initinfo = "initinfo"></changenum>
          </div>

          <!-- 修改面膜 -->
          <div class="changePhoneNum" v-show="index1 == 5">
           <changpassword @hideBox ="hidechangenum"></changpassword>
          </div>


          <div v-if="showbz" class="jlbzj">
            <ul class="safesetting">
              <li>{{$t("app.usercenter.bzj")}}</li>
              <li v-if="bzjsta.status == 3">未缴
                <span class="third" @click="showjn">缴纳</span>
              </li>
              <li v-if="bzjsta.status == 2">被驳回，请重新缴纳
                <span class="third" @click="showjn">缴纳</span>
              </li>
              <li v-if="bzjsta.status == 4">缴纳保证金状态
                <span class="third">审核中</span>
              </li>
              <li v-if="bzjsta.status == 1">
                <span class="sec secnum">已缴纳{{bzjnum}}BIDT <br><i class="sec_tip2">可发布出售或者购买等值{{bzjnum * 0.8}}BIDT的交易广告</i></span>
                <!-- <span class="third">{{$t("app.usercenter.bd")}}</span> -->
                <span class="third backmoney">
                  <el-button type="text" @click="open4">退保</el-button>
                </span>
                <!-- <span class="third">已缴</span> -->
              </li>
            </ul>
            <!-- <p>发布交易广告需缴纳一定数量的BIDT作为保证金，保证金可退。</p> -->
            <p>发布交易广告需缴纳不少于交易货币1.25倍等值的BIDT作为保证金，保证金可退</p>
            <p>例：10000BIDT保证金，可发布不超过等值8000BIDT的交易广告</p>
          </div>
          <div v-if="showbz2" class="jlbzj2">
            <ul class="safesetting">
              <li>{{$t("app.usercenter.bzj")}} <i class="tips">仅支持钱包转入，暂不支持平台提币到此地址</i></li>
              <li>
                <p class="bzjzr">
                  <span>请把保证金转入：</span>
                  <i>{{this.message}}</i>
                  <em v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</em>
                </p>
              </li>
            </ul>

            <div class="tb">
              <ul>
                <li>
                  <span>转账地址：</span> <input v-model="address" type="text"> </li>
                <li>
                  <span>TxHash编号：</span> <input v-model="num1" type="text"> </li>
                <li>
                  <span>转账金额：</span> <input v-model="price1" type="tel"> </li>
              </ul>
              <p class="sub" @click="sub">提交</p>
            </div>
          </div>

          <div v-if="showsksz1" class="jlbzj4">
            <ul class="safesetting">
              <li>收款设置</li>
              <li>
                <em>银行卡</em>
                <span class="sec"><input type="text" v-model="getmoney" placeholder="填写收款人全名"></span>
                <span class="sec"><input type="text" v-model="bankname" placeholder="填写银行全称"></span>
                <span class="sec"><input type="text" v-model="bankh" placeholder="填写您的银行卡号"></span>
                <span class="third" v-if="!initadress.cnyaddress" @click="saveaddress">保存</span>
                <span class="third" v-if="initadress.cnyaddress" @click="saveaddress">修改</span>
              </li>
              <li>
                <em>BIDT地址</em>
                <span class="sec"><input v-model="bidiadress" type="text" placeholder="输入您收取数字货币的区块地址"></span>
                <span class="third" v-if="!initadress.bidtaddress" @click="saveaddress">保存</span>
                <span class="third" v-if="initadress.bidtaddress" @click="saveaddress">修改</span>
              </li>
              <li>
                <em>BTC地址</em>
                <span class="sec"><input v-model="btcadress" type="text" placeholder="输入您收取数字货币的区块地址"></span>
                <span class="third" v-if="!initadress.btcaddress" @click="saveaddress">保存</span>
                <span class="third" v-if="initadress.btcaddress" @click="saveaddress">修改</span>
              </li>
              <li>
                <em>ETH地址</em>
                <span class="sec"><input v-model="ethadress" type="text" placeholder="输入您收取数字货币的区块地址"></span>
                <span class="third" v-if="!initadress.ethaddress" @click="saveaddress">保存</span>
                <span class="third" v-if="initadress.ethaddress" @click="saveaddress">修改</span>
              </li>
              <li>
                <em>USDT地址</em>
                <span class="sec"><input v-model="usdtadress" type="text" placeholder="输入您收取数字货币的区块地址"></span>
                <span class="third" v-if="!initadress.usdtaddress" @click="saveaddress">保存</span>
                <span class="third" v-if="initadress.usdtaddress" @click="saveaddress">修改</span>
              </li>
            </ul>
          </div>

          <!-- </fadepane> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fadepane from "./fadeAnimation";
import changenum from './changenum';
import changpassword from './changePassword'
export default {
  data() {
    return {
      usdtadress:"",
      index1 : 1,
      getmoney: "",
      bankname: "",
      bankh: "",
      bidiadress: "",
      btcadress: "",
      ethadress: "",
      phone1: "",
      message: "0x321CBC744dfEebDa36Cf6AC0226B0b016C25521F",
      address: "",
      num1: "",
      price1: "",
      phons: false,
      phone: "",
      textphone: false,
      toCode: true,
      showaj: true,
      showbz: false,
      showbz2: false,
      wjn: true,
      yj: false,
      showsksz1: false,
      bzjsta: {},
      bzjnum: "",
      initinfo: {},
      initadress: "",
      acounttype:""
    };
  },
  components: {
    fadepane,
    changenum,
    changpassword
    
  },
  mounted() {
    // this.isPhone();
    
    this.getinit();
    // this.getinfkonw();
    this.checktype();
    // this.getblock()
  },
  watch : {
    initinfo (val) {
      if(val && val.account.indexOf("@") != -1) {
        this.acounttype = 'eamil';
      }else if(val.account.length != 11){
        this.acounttype = 'qkid';
      }
    }    
  },
  methods: {
  	//区块地址
  	getblock(){
  		let vm=this;
  		$.ajax({
  			type:"post",
  			url:contextPath1+"/api/certification/getBlockId",
  			async:true,
  			dataType:'json',
  			data:{
  				account:localStorage.otc_account,
  				token:localStorage.otc_token,
  				project:2
  			},
  			success(res){
  				if(res.state.code==='20000'){
  					vm.blockadress=res.data||''
  				}
  			}
  		});
  	},
    checktype () {
      if(this.$route.query && this.$route.query.type == 3) {
        this.showsksz();
      }else if(this.$route.query && this.$route.query.type == 2){
        this.showaqbzj();
      }
    },
    hidechangenum () {
      this.index1 = 1;
      this.showaj = true;
      this.getinit();
    },
    open(val) {
      this.$alert(val, "提示", {
        confirmButtonText: "确定",
        callback: action => {
          // this.$message({
          //   type: 'info',
          //   message: `action: ${ action }`
          // });
        }
      });
    },
    getinfkonw() {
      if (!localStorage.otc_token) {
        this.$router.push("/login");
        return;
      }
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/user/judgeCashDeposit",
        async: true,
        dataType: "json",
        data: {
          token: localStorage.otc_token
        },
        success(res) {
          console.log(res);
          if (res.data == 0) {
            vm.showaqbzj();
            // mui.alert("您还未缴纳保证金，请先缴纳保证金");
            // vm.open("发布交易广告需缴纳不少于交易货币1.25倍等值的BIDT作为保证金，保证金可退。");
            // vm.$router.push("/usercenter");
          }
        }
      });
    },
    showaddress() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/user/getUserAddress",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.otc_lang || "zh",
          token: localStorage.otc_token
          // ETHAddress:vm.ethadress,
          // BTCAddress:vm.btcadress,
          // CNYAddress:vm.bankh,
          // CNYuserName:vm.getmoney,
          // bankName:vm.bankname,
          // BIDTAddress:vm.bidiadress,
        },
        success(res) {
          if (res.state.code == 20000) {
            vm.initadress = res.data;
            vm.getmoney = res.data.cnyuserName;
            vm.bankname = res.data.bankName;
            vm.bankh = res.data.cnyaddress;
            vm.bidiadress = res.data.bidtaddress;
            vm.btcadress = res.data.btcaddress;
            vm.ethadress = res.data.ethaddress;
            vm.usdtadress = res.data.usdtaddress;
            // vm.getinit()
            // mui.alert("手机绑定成功");
          }
        }
      });
    },

    saveaddress() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/user/saveUserAddress",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.otc_lang || "zh",
          token: localStorage.otc_token,
          ETHAddress: vm.ethadress,
          BTCAddress: vm.btcadress,
          CNYAddress: vm.bankh,
          CNYuserName: vm.getmoney,
          bankName: vm.bankname,
          BIDTAddress: vm.bidiadress,
          USDTAddress:vm.usdtadress,
        },
        success(res) {
          if (res.state.code == 20000) {
            vm.initadress = res.data;
            // mui.alert("操作成功");
            vm.open("操作成功");
            // vm.getinit()
            // mui.alert("手机绑定成功");
          }
        }
      });
    },
    xgsjh() {
      // this.initinfo.phoneNum = "";
      this.index1 = 4;
      this.showaj = false;
    },

    
    bcsjh() {
      // let vm = this;
      // var telReg = !!this.phone1.match(
      //   /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      // );
      // if (telReg == false) {
      //   mui.alert("请输入正确的手机号码");
      //   return;
      // }
      // $.ajax({
      //   type: "post",
      //   url: contextPath + "/api/user/updatePhone",
      //   async: true,
      //   dataType: "json",
      //   data: {
      //     languageType: localStorage.coinlang || "zh",
      //     token: localStorage.otc_token,
      //     phone: vm.phone1
      //   },
      //   success(res) {
      //     if (res.state.code == 20000) {
      //       vm.getinit();
      //       mui.alert("手机绑定成功");
      //     }
      //   }
      // });
    },
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
          }
        }
      });
    },
    checkbzj() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/common/getBalance",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.coinlang || "zh",
          token: localStorage.otc_token
        },
        success(res) {
          if (res.state.code == 20000) {
            vm.bzjnum = res.data;
          }
        }
      });
    },
    backbzj() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/common/depositRefund",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.coinlang || "zh",
          token: localStorage.otc_token,
          cashDeposit: vm.bzjnum
        },
        success(res) {
          if (res.state.code == 20000) {
            mui.alert("退保成功，待审核");
          }
        }
      });
    },
    paybzj() {
      if(isNaN(this.price1)) {
        mui.alert("输入的保证金为数字类型");
        return;
      }
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/common/payTheDeposit",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.coinlang || "zh",
          token: localStorage.otc_token,
          cashDeposit: vm.price1,
          TxHashNum: vm.num1,
          ethSite: vm.address
        },
        success(res) {
          if (res.state.code == 20000) {
            // vm.bzjsta = res.data
            mui.alert("保证金缴纳成功，待审核");
          }
        }
      });
    },

    getbsjstatus() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/common/getBalanceStatus",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.coinlang || "zh",
          token: localStorage.otc_token
        },
        success(res) {
          if (res.state.code == 20000) {
            vm.bzjsta = res.data;
            if (vm.bzjsta.status == 1) {
              vm.checkbzj();
            }
          }
        }
      });
    },
    showsksz() {
      this.index1 = 3;
      this.showbz2 = false;
      this.showbz = false;
      this.showaj = false;
      // this.wjn = false;
      this.yj = false;
      this.showsksz1 = true;
      this.showaddress();
    },
    open4() {
      const h = this.$createElement;
      this.$msgbox({
        title: "提示",
        message: h("p", null, [
          h(
            "span",
            null,
            "保证金将退回至您原转出地址，您确定现在要退出保证金吗？"
          )
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            // instance.confirmButtonLoading = true;
            // instance.confirmButtonText = "执行中...";
            this.backbzj();
            done();
            // setTimeout(() => {
            //   done();
            //   setTimeout(() => {
            //     instance.confirmButtonLoading = false;
            //   }, 300);
            // }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: "info",
          message: "action: " + action
        });
      });
    },
    sub() {
      this.showbz2 = false;
      this.showbz = true;
      this.showaj = false;
      this.wjn = false;
      this.showsksz1 = false;
      this.paybzj();
    },
    onCopy: function(e) {
      mui.alert("已复制到剪切板！");
    },
    onError: function(e) {
      mui.alert("复制失败！");
    },
    showaqjz() {
      this.index1 = 1;
      this.showbz = false;
      this.showaj = true;
      this.showsksz1 = false;
    },
    showaqbzj() {
      this.index1 = 2;
      this.showaj = false;
      this.showbz = true;
      this.showbz2 = false;
      this.showsksz1 = false;
      this.getbsjstatus();
    },
    xgmm() {
      //this.$router.push("/findpassword");
      this.index1 = 5;
      this.showaj = false;
    },
    showjn() {
      this.showaj = false;
      this.showbz = false;
      this.showbz2 = true;
    },
    isPhone() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/common/isPhone",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.coinlang || "zh",
          token: localStorage.otc_token
        },
        success(res) {
          vm.phone = res.data;
          if (res.data === "0") {
            vm.phons = true;
            vm.textphone = false;
          } else if (res.data != "1") {
            vm.phons = false;
            vm.textphone = true;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.buy {
  width: 100%;
  box-sizing: border-box;
  padding: 0.64rem 1.5rem 1rem 1.5rem;
  background: #fafafa;
  min-height: 10rem;
  .title_div {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 0.32rem;
    .text {
      font-size: 0.34rem;
      color: rgba(40, 40, 40, 1);
    }
  }
  .main {
    width: 100%;
    margin-top: 0.59rem;
    .info {
      height: 1.48rem;
      box-sizing: border-box;
      padding: 0.2rem 0.5rem;
      background: #fff;
      border-radius: 0.1rem;
      box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3rem);
      .info_l {
        float: left;
        margin-top: 0.1rem;
        img {
          float: left;
          width: 0.84rem;
          height: 0.86rem;
          overflow: hidden;
          margin-right: 0.1rem;
          border-radius: 50%;
        }
        .info_l_r {
          // clear: both;
          float: left;
          p {
            text-align: left;
            font-size: 0.18rem;
            i {
              font-style: normal;
            }
          }
        }
      }
      .info_r {
        float: right;
        li {
          // width: 2.3rem;
          text-align: center;
          float: left;
          margin-left: 0.4rem;
          i {
          	margin-top: 0.2rem;
            font-style: normal;
            display: block;
            height: 0.3rem;
            // font-size: 0.2rem;
            text-align: center;
            color: #3399ff;
            font-size: 0.28rem;
            margin-bottom: 0.1rem;
            small{
            	font-size: 0.12rem;
            	color: black;
            	margin-left: 5px;
            }
          }
          /*span {
            display: block;
            width: 0.36rem;
            background: url("../../static/usercenter/zan.png") no-repeat center;
            background-size: 100%;
            height: 0.4rem;
            margin: 0 auto;
          }*/
          p {
            height: 0.3rem;
            margin-top: 0.05rem;
            text-align: center;
            line-height: 0.3rem;
            color: #939393;
            font-size: 0.18rem;
          }

          &:nth-of-type(2) {
            span {
              display: block;
              width: 0.36rem;
              background: url("../../static/usercenter/bs.png") no-repeat center;
              background-size: 100%;
              height: 0.4rem;
              margin: 0 auto;
            }
          }
          &:nth-of-type(3) {
            span {
              display: block;
              width: 0.36rem;
              background: url("../../static/usercenter/jy.png") no-repeat center;
              background-size: 100%;
              height: 0.4rem;
              margin: 0 auto;
            }
          }
        }
      }
    }
    .setting {
      overflow: hidden;
      padding-bottom: 0.2rem;
      margin-top: 0.2rem;
    }
    .setting_l {
      float: left;
      width: 4rem;
      overflow: hidden;
      box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);
      border-radius: 0.15rem;
      li {
        height: 0.84rem;
        line-height: 0.84rem;
        text-align: center;
        font-size: 0.22rem;
        font-weight: 350;
        color: #282828;
        background: #fff;
        border-bottom: 0.01rem solid #e3e3e3;
        &.active {
          background: #e1f1fb;
        }
        &:last-of-type {
          border-bottom: none;
        }
      }
      li:hover {
        background: #e1f1fb;
      }
    }
    .setting_r {
      box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);
      border-radius: 0.2rem;
      width: 11.9rem;
      padding-bottom: 0.2rem;
      float: right;
      .safesetting {
        width: 11.9rem;
        // height: 5.09rem;
        border-radius: 0.15rem;
        background: #fff;
        li {
          line-height: 0.82rem;
          height: 0.82rem;
          font-size: 0.2rem;
          text-align: left;
          padding-left: 0.2rem;
          border-bottom: 0.01rem solid #efefef;
          position: relative;
          .secs{
          	margin-left: 0.5rem;
          }
          .sec {
            display: inline-block;
            // margin-left: 0.12rem;
            .sec_tip2 {
              position: absolute;
              top:0.7rem;
              left: 0.2rem;
              // padding-bottom: 0.2rem;
              display: inline-block;
              line-height: 0;
              margin: 0;
            }
          }
          .secnum {
            color: #449ed4;
            i {
              display: inline-block;
              margin-left: 0.2rem;
              font-style: normal;
              font-size: 0.14rem;
              color: #666;
            }
          }
          .sjhm {
            width: 4rem;
            height: 0.5rem;
            border-radius: 0.2rem;
            border: none;
            border: 0.01rem solid #999;
            padding-left: 0.2rem;
          }
          .third {
            float: right;
            cursor: pointer;
            // margin-left: 0.2rem;
            width: 1.4rem;
            // padding: 0 0.2rem;
            font-size: 0.2rem;
            height: 0.5rem;
            text-align: center;
            line-height: 0.5rem;
            background: #f4f4f4;
            border: 0.01rem solid #e6e6e6;
            border-radius: 0.1rem;
            margin-top: 0.2rem;
            margin-right: 0.2rem;
          }
          &:last-of-type {
            border-bottom: none;
          }
          .blockadres{
          	margin-left: 0.5rem;
          	color: gray;
          }
        }
      }
      .jlbzj {
        p {
          margin-top: 0.2rem;
          margin-bottom: 0.2rem;
          font-size: 0.2rem;
          color: #999;
          padding-left: 0.3rem;
          text-align: left;
        }
        .backmoney /deep/ .el-button--text span {
          // display: block;
          font-size: 0.18rem;
          color: black;
          padding: 0;
        }
        .backmoney /deep/ .el-button {
          padding: 0;
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .jlbzj2 {
        li:nth-of-type(2) {
          text-align: center;
          border-bottom: 0.01rem solid #efefef;
          p.bzjzr {
            width: 7.5rem;
            display: inline-block;
            font-size: 0.18rem;
            span {
              float: left;
            }
            i {
              font-style: normal;
              display: inline-block;
              width: 3.6rem;
              overflow: hidden;
              text-align: left;
              padding-left: 0.26rem;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            em {
              // display: inline-block;
              float: right;
              margin-top: 0.18rem;
              margin-right: 0.2rem;
              font-style: normal;
              width: 1rem;
              height: 0.5rem;
              line-height: 0.5rem;
              // padding: 0.1rem;
              border-radius: 0.2rem;
              background: #e6e6e6;
              font-size: 0.2rem;
              cursor: pointer;
            }
          }
        }
        li:nth-of-type(1) {
          .tips {
            color: red;
            font-size: 0.18rem;
            font-style: normal;
            margin-left: 0.2rem;
          }
        }
        .tb {
          width: 7.5rem;
          margin: 0 auto;
          .sub {
            cursor: pointer;
            font-size: 0.22rem;
            width: 1.42rem;
            height: 0.44rem;
            text-align: center;
            line-height: 0.44rem;
            background: #449ed4;
            color: #fff;
            border-radius: 0.05rem;
            margin: 0 auto;
            margin-top: 0.2rem;
            font-weight: 300;
          }
          ul {
            li {
              text-align: left;
              line-height: 0.7rem;
              font-size: 0.22rem;
              padding-left: 0.1rem;
              span {
                display: inline-block;
                width: 2.2rem;
              }
              input {
                display: inline-block;
                width: 3.66rem;
                height: 0.4rem;
                background: #e6e6e6;
                border: none;
                border-radius: 0.05rem;
              }
            }
          }
        }
      }
      .jlbzj4 {
        ul {
          li {
            em {
              font-style: normal;
              display: inline-block;
              width: 1.4rem;
            }
            &:nth-of-type(2) {
              span {
                input {
                  height: 0.4rem;
                  border-radius: 0.1rem;
                  border: none;
                  border: 0.01rem solid #e6e6e6;
                  padding-left: 0.1rem;
                }
                &:nth-of-type(3) {
                  input {
                    width: 3rem;
                  }
                }
              }
            }
            &:nth-of-type(3) {
              span {
                input {
                  width: 4rem;
                  height: 0.4rem;
                  border-radius: 0.1rem;
                  border: none;
                  border: 0.01rem solid #e6e6e6;
                  padding-left: 0.1rem;
                }
              }
            }
            &:nth-of-type(4) {
              span {
                input {
                  width: 4rem;
                  height: 0.4rem;
                  border-radius: 0.1rem;
                  border: none;
                  border: 0.01rem solid #e6e6e6;
                  padding-left: 0.1rem;
                }
              }
            }
            &:nth-of-type(5) {
              span {
                input {
                  width: 4rem;
                  height: 0.4rem;
                  border-radius: 0.1rem;
                  border: none;
                  border: 0.01rem solid #e6e6e6;
                  padding-left: 0.1rem;
                }
              }
            }
            &:nth-of-type(6) {
              span {
                input {
                  width: 4rem;
                  height: 0.4rem;
                  border-radius: 0.1rem;
                  border: none;
                  border: 0.01rem solid #e6e6e6;
                  padding-left: 0.1rem;
                }
              }
            }
            span {
              input {
                height: 0.4rem;
                border-radius: 0.1rem;
                border: none;
                border: 0.01rem solid #e6e6e6;
                padding-left: 0.1rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>