<template>
  <div id="appmain">
    <header>
      <div class="left">
        <img src="../../static/logo.png" @click="gohome" />
        <router-link to='/sell' class="sell">{{$t("app.header.sell")}}</router-link>
        <router-link to='/buy'>
          <div class="buy">{{$t("app.header.buy")}}</div>
        </router-link>
        <router-link to='/advertise'>
          <div class="advertise">{{$t("app.header.advertise")}}</div>
        </router-link>
        <router-link to='/mall'>
          <div class="advertise mall">商城</div>
        </router-link>
        <!-- <router-link to='/announcement'>
          <div class="advertise mall">公告</div>
        </router-link> -->
      </div>
      <div class="right">
        <!-- <router-link to='/shopMessage' class="message">消息</router-link> -->
        <div class="allMessage" v-if="shopper ==1">
          <i class="message_tip" v-if="messages && messages.status != 0"></i>
          <!-- <el-select v-model="region" placeholder="消息">
						<el-option v-for="item in messages" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select> -->
          <span v-if="!showxx">消息</span>
          <el-dropdown v-if="showxx">
            <span class="el-dropdown-link">
              消息
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" v-show="messages != null">
              <el-dropdown-item v-for="(item , index)  in  messages &&  messages.list" @click.native="goshowChat(item.userChatId)" :key="index">{{item.userName}}
                <i class="message_tip1" v-if="item.readCount  != 0">{{item.readCount}}</i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-dropdown>
            <span class="el-dropdown-link">
               消息
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" v-show="messages">
              <el-dropdown-item v-for="(item , index)  in  messages.list" @click.native="goshowChat(item.userChatId)" :key="index">{{item.userName}}
                <i class="message_tip1" v-if="item.readCount  != 0">{{item.readCount}}</i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </div>
        <router-link to='/login' class="login" v-if="token===null">{{$t("app.header.login")}}</router-link>
        <router-link to='/registered' class="reg" v-if="token===null">{{$t("app.header.reg")}}</router-link>
        <div class="deal" v-if="token!=null">
          <div class="div1">{{$t("app.header.deal[0]")}}
            <i class="el-icon-arrow-down"></i>
          </div>
          <div class="absolute">
            <div class="one" @click="order_control">{{$t("app.header.deal[1]")}}</div>
            <div class="tow" @click="adv_control">{{$t("app.header.deal[2]")}}</div>
          </div>
        </div>
        <div class="user_center" v-if="token!=null">
          <div class="div1" @click="gousercenter">{{$t("app.header.mycenter[0]")}}
            <i class="el-icon-arrow-down"></i>
          </div>
          <div class="absolute">
            <div class="one" @click="usercenter_control">{{$t("app.header.mycenter[1]")}}</div>
            <div class="tow" @click="end">{{$t("app.header.mycenter[2]")}}</div>
          </div>
        </div>
        <!--<div class="language" @mouseover="langugeshow" @mouseout="langugehide">
					<img src="../../static/language.png"/> {{languge_type}}
					<div class="langage_type" v-if="languge_div">
						<div class="zh_type" @click="langugeZH">简体中文</div>
						<div class="en_type" @click="langugeEN">English</div>
					</div>
				</div>-->
      </div>
    </header>
    <router-view></router-view>
    <footer>
      <div class="left">
        <div class="text">&copy; Time Treaty Blockchain Foundation</div>
        <a href="https://t.me/TimeTreatyChain" target="_blank">
          <img src="../../static/footer1.png" />
        </a>
        <a href="https://www.facebook.com/Time-Treaty-Coin-137811593467221/" target="_blank">
          <img src="../../static/footer2.png" />
        </a>
        <a href="">
          <img src="../../static/footer3.png" />
        </a>
        <a href="https://twitter.com/TimeTreaty" target="_blank">
          <img src="../../static/footer4.png" />
        </a>
      </div>
      <div class="right">
        <router-link class="text" to="/announcement">公告</router-link>
        <router-link class="text" to="/aboutUs">{{$t("app.header.aboutus")}}</router-link>
        <!--<div class="text">常见问题</div>-->
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      languge_div: false,
      languge_type: "简体中文",
      token: localStorage.otc_token || null,
      region: "",
      messages: false,
      shopper: localStorage.shopper,
      showxx: true
    };
  },
  created() {
    if (localStorage.otc_lang === "zh") {
      this.languge_type = "简体中文";
    } else if (localStorage.otc_lang === "en") {
      this.languge_type = "English";
    } else {
      this.languge_type = "简体中文";
    }
    this.getinit();
  },
  mounted() {
    window.addEventListener("scroll", this.win_scroll);
  },
  methods: {
    gousercenter () {
      this.$router.push('/usercenter')
    },  
    getinit() {
      let vm = this;
      if (!localStorage.otc_token) {
        $.ajax({
          type: "post",
          url: contextPath + "/api/shopping/getUserChat",
          async: true,
          dataType: "json",
          data: {
            // languageType: localStorage.otc_lang || "zh",
            // token: localStorage.otc_token,
            // orderId: vm.$route.query.id
          },
          success(res) {
            if (!res.data) {
              vm.messages = res.data;
              if (!vm.messages || vm.messages.list.length == 0) {
                vm.showxx = false;
              }
            }
          }
        });
      } else {
        $.ajax({
          type: "post",
          url: contextPath + "/api/shopping/getUserChat",
          async: true,
          dataType: "json",
          data: {
            // languageType: localStorage.otc_lang || "zh",
            token: localStorage.otc_token
            // orderId: vm.$route.query.id
          },
          success(res) {
            vm.messages = res.data;
            // eventBus.$emit('todata',res.data )
            if (!vm.messages || vm.messages.list.length == 0) {
              vm.showxx = false;
            }
          }
        });
      }
    },
    goshowChat(val) {
      this.getinit();
      this.$router.push({
        name: "shopChat",
        params: {
          id: val
        }
      });
      location.reload();
    },
    win_scroll() {
      var top_left =
        document.body.scrollLeft ||
        window.scrollLeft ||
        document.documentElement.scrollLeft;
      $("header").css("left", -top_left + "px");
      $("footer").css("left", -top_left + "px");
    },
    gohome() {
      this.$router.push({ path: "/" });
    },
    langugeshow() {
      this.languge_div = true;
    },
    langugehide() {
      this.languge_div = false;
    },
    langugeZH() {
      this.$i18n.locale = "zh";
      this.languge_div = false;
      this.languge_type = "简体中文";
      localStorage.otc_lang = "zh";
    },
    langugeEN() {
      this.$i18n.locale = "en";
      this.languge_div = false;
      this.languge_type = "English";
      localStorage.otc_lang = "en";
    },
    order_control() {
      this.$router.push("/orderManagement");
      //订单管理
    },
    adv_control() {
      //广告管理
      this.$router.push("/advertisingManagement");
    },
    usercenter_control() {
      this.$router.push("/usercenter");
    },
    //退出
    end() {
      location.reload();
      localStorage.clear();
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.allMessage /deep/ .el-dropdown {
  width: 1.2rem;
}
.el-dropdown-menu__item {
  position: relative;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  background: #2d2d2d;
}

.el-dropdown-menu {
  background: #2d2d2d;
  border: 1px solid #2d2d2d;
  color: #fff;
  // margin-top: 0.1rem;
  left: auto;
  width: 1.8rem;
  right: 0rem;
  top: 0.55rem !important;
  // left: 891px !important;
  border-radius: 0;
  box-sizing: border-box;

  .el-dropdown-menu__item {
    border-radius: 0;
    font-size: 0.12rem;
    width: 1rem;
    // padding: 0 5px;
    // overflow: hidden;
    // white-space: nowrap;
    // text-overflow: ellipsis;
    // background: #2d2d2d;
    color: #fff;
    &:hover {
      color: #3ab6ff;
    }
  }
  .popper__arrow::after {
    border-bottom-color: #2d2d2d !important;
    border-color: #2d2d2d;
  }

  & /deep/ .popper__arrow::after {
    border-bottom-color: #2d2d2d !important;
    border: none;
  }
  & /deep/ .popper__arrow {
    left: 50% !important;
    border: none;
  }
}

.el-dropdown-menu__item .message_tip1 {
  position: absolute;
  z-index: 999;
  width: 0.2rem;
  height: 0.2rem;
  background: red;
  border-radius: 50%;
  top: 0rem;
  right: 0.06rem;
  color: #fff;
  line-height: 0.2rem;
  text-align: center;
  font-style: normal;
  font-size: 0.12rem;
}
#appmain {
  padding-top: 0.7rem;
  // padding-bottom: 0.7rem;
  header {
    position: fixed;
    z-index: 10;
    top: 0;
    width: 19.2rem;
    height: 0.7rem;
    background: rgba(97, 97, 97, 1);
    box-sizing: border-box;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      height: 100%;
      img {
        width: 2.34rem;
        margin-right: 0.58rem;
        cursor: pointer;
      }
      .sell,
      .buy {
        height: 100%;
        line-height: 0.7rem;
        padding: 0 0.2rem;
        font-size: 0.16rem;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
      .sell:hover {
        background: rgba(72, 72, 72, 1);
      }
      .buy:hover {
        background: rgba(72, 72, 72, 1);
      }
      .advertise {
        height: 100%;
        line-height: 0.7rem;
        padding: 0 0.2rem;
        font-size: 0.16rem;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
      .advertise:hover {
        background: rgba(72, 72, 72, 1);
      }
      .router-link-active {
        background: rgba(72, 72, 72, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 0.16rem;
      color: rgba(255, 255, 255, 1);
      .allMessage {
        position: relative;
        width: 1.2rem;
        height: 0.7rem;
        line-height: 0.7rem;
        &:hover{
          background: #484848;
        }
        .el-dropdown-link {
          color: #fff;
        }
        .message_tip {
          position: absolute;
          z-index: 999;
          width: 0.1rem;
          height: 0.1rem;
          background: red;
          border-radius: 50%;
          top: 0.15rem;
          right: 0.45rem;
        }
      }

      .login,
      .reg {
        height: 100%;
        line-height: 0.7rem;
        padding: 0 0.2rem;
        color: white;
      }
      .login:hover {
        background: rgba(72, 72, 72, 1);
      }
      .reg:hover {
        background: rgba(72, 72, 72, 1);
      }
      .user_center {
        width: 1.2rem;
        box-sizing: border-box;
      }
      .user_center,
      .deal {
        height: 100%;
        width: 1.2rem;
        box-sizing: border-box;
        line-height: 0.7rem;
        // padding: 0 0.16rem;
        cursor: pointer;
        position: relative;
        .div1 {
          color: white;
        }
        .absolute {
          position: absolute;
          // bottom: -1.3rem;
          width: 1.2rem;
          box-sizing: border-box;
          left: 0rem;
          color: #333;
          line-height: 0.2rem;
          font-size: 0.12rem;
          // background: url(../../static/language_bg.png) no-repeat;
          background-size: 100% 100%;
          padding: 0.15rem 0.2rem;
          /*height: 0.87rem;*/
          display: none;
          background:#2D2D2D;
          color: #fff;
          // width: 1rem;
          .one {
            // box-sizing: border-box;
            // padding: 0 0.08rem;
            // margin-top: 0.15rem;
            // padding-top: 0.05rem;
            padding-bottom: 0.05rem;
          }
          .tow {
            // margin: 0 0.08rem;
            padding: 0.05rem 0 0.05rem 0;
          }
          .one:hover {
            // background: #e1f1fb;
            color: #3ab6ff;
          }
          .tow:hover {
            // background: #e1f1fb;
            color: #3ab6ff;
          }
        }
      }
      .user_center:hover {
        background: rgba(72, 72, 72, 1);
        .absolute {
          display: block;
        }
      }
      .deal:hover {
        background: rgba(72, 72, 72, 1);
        .absolute {
          display: block;
        }
      }
      .language {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin-left: 0.8rem;
        padding: 0 0.2rem;
        cursor: pointer;
        position: relative;
        img {
          width: 0.22rem;
          height: 0.22rem;
          margin-right: 0.1rem;
        }
        .langage_type {
          position: absolute;
          bottom: -0.65rem;
          color: #333;
          line-height: 0.2rem;
          font-size: 0.12rem;
          background: url(../../static/language_bg.png) no-repeat;
          background-size: 100% 100%;
          width: 1.5rem;
          height: 0.87rem;
          .zh_type {
            margin: 0 0.08rem;
            margin-top: 0.15rem;
            padding-top: 0.05rem;
            padding-bottom: 0.05rem;
          }
          .en_type {
            margin: 0 0.08rem;
            padding: 0.05rem 0 0.05rem 0;
          }
          .zh_type:hover {
            background: #e1f1fb;
          }
          .en_type:hover {
            background: #e1f1fb;
          }
        }
      }
      .language:hover {
        background: rgba(72, 72, 72, 1);
      }
    }
  }
  footer {
    // position: fixed;
    // z-index: 10;
    // bottom: 0;
    width: 19.2rem;
    height: 0.7rem;
    background: rgba(51, 51, 51, 1);
    box-sizing: border-box;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .text {
        font-size: 0.16rem;
        color: rgba(255, 255, 255, 1);
        margin-right: 0.38rem;
      }
      img {
        display: block;
        width: 0.42rem;
        height: 0.42rem;
        margin-right: 0.48rem;
      }
    }
    .right {
      display: flex;
      align-items: center;
      font-size: 0.16rem;
      .text {
        color: rgba(255, 255, 255, 1);
        margin-left: 0.3rem;
      }
      .text:hover {
        cursor: pointer;
        color: #1c6d9d;
      }
      .router-link-active {
        color: #1c6d9d;
      }
    }
  }
}
</style>