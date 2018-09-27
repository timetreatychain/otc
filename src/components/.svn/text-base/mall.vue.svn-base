<template>
  <div class="mall">
    <ul class="animallList" v-show="showanimall">
      <li @click="showchat(item.uId)" v-for="item in animallLists" :key="item.uId">
        <img :src="item.picUrl" alt="">
        <div class="info">
          <p class="title">{{item.title}}</p>
          <p class="price1">
            <i>币达价</i>
            <em>{{item.price}} BIDT</em>
          </p>
          <p class="price2">
            <i>参考价</i>
            <em>{{item.referencePric}} CNY</em>
          </p>
        </div>
      </li>
      <!-- <li>
        <img src="../../static/mall/bo.png" alt="">
        <div class="info">
          <p class="title">纯种宠物猫活体布偶猫咪幼猫双色布偶猫优雅猫咪</p>
          <p class="price1">
            <i>币达价</i>
            <em>1500000.00 BIDT</em>
          </p>
          <p class="price2">
            <i>参考价</i>
            <em> 10000~15000 CNY</em>
          </p>
        </div>
      </li>
      <li>
        <img src="../../static/mall/dn.png" alt="">
        <div class="info">
          <p class="title">法斗幼犬纯种法斗幼犬活体斗牛犬奶油色法国斗牛 犬短毛斗牛宠物狗
          </p>
          <p class="price1">
            <i>币达价</i>
            <em>1500000.00 BIDT</em>
          </p>
          <p class="price2">
            <i>参考价</i>
            <em> 6000~15000 CNY</em>
          </p>
        </div>
      </li>
      <li>
        <img src="../../static/mall/jm.png" alt="">
        <div class="info">
          <p class="title">纯种金毛犬幼犬活体大头宽嘴大骨架金毛幼犬活体 宠物狗狗家养小狗
          </p>
          <p class="price1">
            <i>币达价</i>
            <em>600000.00 BIDT</em>
          </p>
          <p class="price2">
            <i>参考价</i>
            <em> 4000~6000 CNY</em>
          </p>
        </div>
      </li>
      <li>
        <img src="../../static/mall/md.png" alt="">
        <div class="info">
          <p class="title">名猫馆美短纯种猫宠物猫咪活体美短幼猫活体</p>
          <p class="price1">
            <i>币达价</i>
            <em>500000.00 BIDT</em>
          </p>
          <p class="price2">
            <i>参考价</i>
            <em>3000~5000 CNY</em>
          </p>
        </div>
      </li>
      <li>
        <img src="../../static/mall/ze.png" alt="">
        <div class="info">
          <p class="title">折耳猫苏格兰活体幼猫纯种宠物猫</p>
          <p class="price1">
            <i>币达价</i>
            <em>800000.00 BIDT</em>
          </p>
          <p class="price2">
            <i>参考价</i>
            <em> 5000~8000 CNY</em>
          </p>
        </div>
      </li>
      <li>
        <img src="../../static/mall/td.png" alt="">
        <div class="info">
          <p class="title">纯种犬玩具贵宾红泰迪宠物狗狗活体幼犬</p>
          <p class="price1">
            <i>币达价</i>
            <em>500000.00 BIDT</em>
          </p>
          <p class="price2">
            <i>参考价</i>
            <em> 2500~5000 CNY</em>
          </p>
        </div>
      </li>
      <li>
        <img src="../../static/mall/ql.png" alt="">
        <div class="info">
          <p class="title">名猫馆纯种暹罗猫宠物猫咪活体暹罗幼猫活体</p>
          <p class="price1">
            <i>币达价</i>
            <em>500000.00 BIDT</em>
          </p>
          <p class="price2">
            <i>参考价</i>
            <em> 2500~5000 CNY</em>
          </p>
        </div>
      </li> -->
      <li>
        <img src="../../static/mall/more.png" alt="">
        <div class="info">
          <p class="title">更多宠物，敬请期待</p>
          <p class="price1">
            <i>币达价</i>
            <em>？ BIDT</em>
          </p>
          <p class="price2">
            <i>参考价</i>
            <em> ？~？ CNY</em>
          </p>
        </div>
      </li>
    </ul>
    <div class="chat" v-show="!showanimall">
      <div class="animallInfo">
        <img :src="chatdata.commodityPicUrl" alt="">
        <div class="animall-tip">
          <p class="title">{{chatdata.title}}</p>
          <p class="price1">
            <i>币达价</i>
            <em>{{chatdata.price}}BIDT</em>
          </p>
          <p class="price2">
            <i>参考价</i>
            <em> {{chatdata.referencePric}} CNY</em>
          </p>
        </div>
      </div>
      <div class="chat_r">
        <h3>购买咨询</h3>
        <div class="wrapper">
          <div v-for="item in message" :class="item.userId==uid?'rightUser':'leftUser'">
            <!-- <img src="../../static/mall/kf.png" alt=""> -->
            <!-- <img :src="item.userPic" v-if="item.userId==uid"/> -->
            <img :src="item.userPic" />
            <div class="leftUserContent">
              <div class="leftUserContent_t">
                <i>{{item.userNickName}} </i>
                <em> {{item.createTime}}</em>
              </div>
              <div class="leftUserContent_b">
                {{item.contentText}}</div>
            </div>
          </div>
          <!-- <div class="rightUser">
            <img src="../../static/mall/kf.png" alt="">
            <div class="leftUserContent" >
              <div class="leftUserContent_t">
                <i>xiaoxia </i>
                <em> 2018-7-20 19:15:50</em>
              </div>
              <div class="leftUserContent_b">
                你好，有什么可以为你服务的吗？
              </div>
            </div>
          </div> -->
        </div>
        <div class="send_msg">
          <textarea @keyup.enter="websopen" v-model="message_text" placeholder="请描述你想咨询的问题，如“如何用BIDT购买宠物”"></textarea>
          <p class="sub" @click="websopen">发送消息</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showanimall: true,
      animallLists: "",
      chatdata: "",
      message: [],
      ws: "",
      message_text: "",
      uid: localStorage.otc_uId,
      sH: ""
    };
  },
  mounted() {
    this.getinit();
  },
  watch: {
    sH(val) {
      console.log(val);
      document.querySelector(".wrapper").scrollTop = val;
    }
  },
  methods: {
    sHfun() {
      setTimeout(() => {
        this.sH = document.querySelector(".wrapper").scrollHeight;
      }, 300);
    },
    getmessage() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/common/getChatDiscipline",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.otc_lang || "zh",
          token: localStorage.otc_token,
          orderId: vm.$route.query.id
        },
        success(res) {
          vm.message = res.data;
          vm.sHfun();
        }
      });
    },
    websocketopen() {
      let vm = this;
      console.log(vm.chatdata.webId);
      let url =
        "ws:" +
        contextPath.replace("http://", "//") +
        "/websocket/" +
        vm.chatdata.webId +
        "";
      this.ws = new WebSocket(url);
      this.ws.onmessage = function(ev) {
        vm.message.push(JSON.parse(ev.data));
        vm.sHfun();
      };
    },
    websopen() {
      let vm = this;
      this.ws.send(
        JSON.stringify({
          contentText: vm.message_text,
          createTime: vm.getNowDate(),
          userNickName: localStorage.otc_username,
          userId: localStorage.otc_uId,
          userPic: localStorage.otc_headimg
        })
      );
      $.ajax({
        type: "post",
        url: contextPath + "/api/shopping/saveChat",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.otc_lang || "zh",
          token: localStorage.otc_token,
          chatId: vm.chatdata.webId,
          contentText: `${vm.message_text}`
          // groupInfoId:vm.$route.query.id
        },
        success(res) {
          vm.message_text = "";
          vm.sHfun();
        }
      });
    },
    showchat(val) {
      if (!localStorage.otc_token) {
        this.$router.push("/login");
        return;
      }
      this.showanimall = false;
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/shopping/getChatNumber",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.otc_langlang || "zh",
          token: localStorage.otc_token,
          commodityId: val
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.chatdata = res.data;
            vm.websocketopen();
            vm.message = res.data.content;
            vm.sHfun();
          }
        }
      });
    },
    // beforeDestroy () {
    //   this.ws.onclose = function () {

    //   };
    // },
    getNowDate() {
      var date = new Date();
      var sign1 = "-";
      var sign2 = ":";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (day >= 0 && day <= 9) {
        day = "0" + day;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      var currentdate =
        year +
        sign1 +
        month +
        sign1 +
        day +
        " " +
        hour +
        sign2 +
        minutes +
        sign2 +
        seconds +
        " ";
      return currentdate;
    },
    getinit() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/shopping/getCommodity",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.otc_langlang || "zh",
          // token: localStorage.otc_token
          // cancelTransactionId:vm.$route.query.id
          page: 1,
          row: 100,
          type: "宠物"
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.animallLists = res.data;
            vm.sHfun();
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.mall {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 0.64rem 1.5rem 1rem 1.5rem;
  font-size: 0.24rem;
  text-align: left;
  min-height: 10rem;
  .chat {
    width: 12rem;
    border: 0.01rem solid #f1f1f1;
    overflow: hidden;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .chat_r {
      float: left;
      // width: 8rem;
      flex: 1;
      height: 7.08rem;
      overflow: hidden;
      position: relative;
      left: -0.01rem;
      h3 {
        color: #fff;
        background: #56585e;
        padding-left: 0.2rem;
        line-height: 0.38rem;
        font-size: 0.18rem;
      }
      .send_msg {
        height: 1.79rem;
        position: relative;
        textarea {
          box-sizing: border-box;
          position: relative;
          left: 0.01rem;
          padding: 0.1rem;
          width: 100%;
          height: 1.4rem;
          border: none;
          resize: none;
          border-top: 0.01rem solid #f1f1f1;
        }
        .sub {
          position: absolute;
          right: 0.2rem;
          bottom: 0.2rem;
          background: #169bd5;
          color: #fff;
          font-size: 0.18rem;
          line-height: 0.32rem;
          height: 0.32rem;
          text-align: center;
          cursor: pointer;
          padding: 0 0.1rem;
          border-radius: 0.05rem;
        }
      }
      .wrapper {
        height: 4.91rem;
        padding: 0.2rem 0.3rem;
        box-sizing: border-box;
        overflow: hidden;
        overflow-y: auto;
        border-bottom: 0.01rem solid #e8ebe8;
        margin-right: -15px;
        margin-bottom: -15px;
        .leftUser {
          float: left;
          width: 100%;
          margin-bottom: 0.2rem;
          img {
            width: 0.58rem;
            height: 0.62rem;
            float: left;
            margin-right: 0.2rem;
          }
          .leftUserContent {
            float: left;
            .leftUserContent_t {
              color: #939393;
              font-size: 0.14rem;
              margin-bottom: 0.1rem;
              i {
                font-style: normal;
              }
              em {
                font-style: normal;
              }
            }
            .leftUserContent_b {
              color: #939393;
              background: #f9fafd;
              border: 1px solid #e8ebe8;
              padding: 0.1rem;
              font-size: 0.14rem;
              position: relative;
              word-wrap: break-word;
              word-break: normal;
              word-break: break-all;
              max-width: 5rem;
              &::before {
                content: "";
                height: 0;
                border-width: 10px 10px 10px 0;
                border-style: solid;
                border-color: transparent #f9fafd transparent transparent; /*透明 黄 透明 透明 */
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: -10px;
              }
            }
          }
        }
        .rightUser {
          float: left;
          width: 100%;
          margin-bottom: 0.2rem;
          img {
            width: 0.58rem;
            height: 0.62rem;
            float: right;
          }
          .leftUserContent {
            float: right;
            margin-right: 0.2rem;
            .leftUserContent_t {
              color: #939393;
              font-size: 0.14rem;
              margin-bottom: 0.1rem;
              overflow: hidden;
              // .time1 {
              //   float: right;
              //   height: 0.3rem;
              i {
                float: right;
                font-style: normal;
              }
              em {
                float: right;
                margin-right: 0.1rem;
                font-style: normal;
              }
              // }
            }
            .leftUserContent_b {
              color: #939393;
              background: #f9fafd;
              border: 1px solid #e8ebe8;
              padding: 0.1rem;
              font-size: 0.14rem;
              position: relative;
              word-wrap: break-word;
              word-break: normal;
              word-break: break-all;
              max-width: 5rem;
              &::before {
                content: "";
                height: 0;
                border-width: 10px 0px 10px 10px;
                border-style: solid;
                border-color: transparent transparent transparent #f9fafd; /*透明 黄 透明 透明 */
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: -0.1rem;
              }
            }
          }
        }
      }
    }
    .animallInfo {
      float: left;
      width: 3.89rem;
      border-right: 0.01rem solid #f1f1f1;
      // border-bottom: 0.01rem solid #f1f1f1;
      padding-bottom: 0.2rem;
      img {
        width: 100%;
        display: block;
      }
      .animall-tip {
        box-sizing: border-box;
        padding: 0.1rem;
        border-bottom: 1px solid #f1f1f1;
        .title {
          font-size: 0.17rem;
          color: #282828;
          margin-bottom: 0.2rem;
        }
        .price1 {
          i {
            display: inline-block;
            font-style: normal;
            font-size: 0.13rem;
            color: #ff3e4c;
          }
          em {
            display: inline-block;
            font-style: normal;
            color: #ff3e4c;
            font-size: 0.3rem;
          }
        }
        .price2 {
          i {
            font-style: normal;
            font-size: 0.12rem;
            color: #666;
          }
          em {
            font-style: normal;
            color: #666;
            font-size: 0.12rem;
          }
        }
      }
    }
  }
  .animallList {
    width: 12rem;
    margin: 0 auto;
    // display: flex;
    // justify-content: space-between;
    // flex-wrap: wrap;
    overflow: hidden;
    li {
      float: left;
      margin-right: 0.15rem;
      width: 3.8rem;
      // height: 4.28rem;
      height: 4.6rem;
      transition: all 0.2s linear;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
      border-radius: 0.08rem;
      margin-bottom: 0.2rem;
      &:hover {
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.3);
        transform: translate3d(0, -2px, 0);
      }
      img {
        width: 100%;
        height: 3rem;
      }
      .info {
        padding: 0.1rem;
        .title {
          font-size: 0.17rem;
          color: #282828;
          margin-bottom: 0.1rem;
        }
        .price1 {
          i {
            display: inline-block;
            font-style: normal;
            font-size: 0.13rem;
            color: #ff3e4c;
          }
          em {
            display: inline-block;
            font-style: normal;
            color: #ff3e4c;
            font-size: 0.26rem;
          }
        }
        .price2 {
          i {
            font-style: normal;
            font-size: 0.12rem;
            color: #666;
          }
          em {
            font-style: normal;
            color: #666;
            font-size: 0.12rem;
          }
        }
      }
    }
  }
}
</style>