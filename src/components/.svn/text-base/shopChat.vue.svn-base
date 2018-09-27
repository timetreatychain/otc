<template>
  <div class="shopChat">
    <div class="chat">
      <div class="animallInfo">
        <img :src="chatdata.commodityPicUrl" alt="">
        <div class="animall-tip">
          <p class="title">{{chatdata.title}}</p>
          <p class="price1">
            <i>币达价</i>
            <em>{{chatdata.price}} BIDT</em>
          </p>
          <p class="price2">
            <i>参考价</i>
            <em> {{chatdata.referencePric}} CNY</em>
          </p>
        </div>
      </div>
      <div class="chat_r">
        <h3>购买咨询</h3>
        <div class="wrapper" id="wrapper">
          <div class="inner">
            <!-- <div class="leftUser">
            <img src="../../static/mall/kf.png" alt="">
            <div class="leftUserContent">
              <div class="leftUserContent_t">
                <i>xiaoxia </i>
                <em> 2018-7-20 19:15:50</em>
              </div>
              <div class="leftUserContent_b">
                你好，有什么可以为你服务的吗？
              </div>
            </div>
          </div> -->
            <div v-for="item in message" :class="item.userId==uid?'rightUser':'leftUser'">
              <!-- <img src="../../static/mall/kf.png" alt=""> -->
              <img :src="item.userPic" />
              <div class="leftUserContent">
                <div class="leftUserContent_t">
                  <i>{{item.userNickName}} </i>
                  <em> {{item.createTime}}</em>
                </div>
                <div class="leftUserContent_b">
                  {{item.contentText}}
                </div>
              </div>
            </div>
            <!-- <div class="rightUser">
            <img src="../../static/mall/kf.png" alt="">
            <div class="leftUserContent">
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
      message: [],
      ws: "",
      message_text: "",
      uid: localStorage.otc_uId,
      message_text: "",
      web_id: "",
      chatdata: "",
      sH : "",
    };
  },

  mounted() {
    //获取聊天
    this.web_id = this.$route.params.id;
    this.websocketopen();
  },
  watch: {
    web_id(val) {
      // this.websocketopen();
      this.showchat(val);
    },
    sH (val) {
      console.log(val);
      document.querySelector(".wrapper").scrollTop = val;
    }
  },
  methods: {
    sHfun () {
      setTimeout (() => {
            this.sH = document.querySelector(".wrapper").scrollHeight;
          } , 300)  
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
        url: contextPath + "/api/shopping/getChatNumberById",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.otc_langlang || "zh",
          token: localStorage.otc_token,
          chatId: val
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.chatdata = res.data;
            vm.message = res.data.content;
           vm.sHfun();
          }
        }
      });
    },
    getinit() {
      if (!localStorage.otc_token) {
        this.$router.push("/login");
        return;
      }
      let vm = this;
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
          vm.sHfun()
          
        }
      });
    },
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
    websocketopen() {
      let vm = this;
      let url =
        "ws:" +
        contextPath.replace("http://", "//") +
        "/websocket/" +
        vm.web_id +
        "";
      this.ws = new WebSocket(url);
      this.ws.onmessage = function(ev) {
        console.log(ev.data);
        vm.message.push(JSON.parse(ev.data));
         vm.sHfun()
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
          chatId: vm.web_id,
          contentText: `${vm.message_text}`
          // groupInfoId:vm.$route.query.id
        },
        success(res) {
          vm.message_text = "";
           vm.sHfun();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.shopChat {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 0.64rem 1.5rem 1rem 1.5rem;
  font-size: 0.24rem;
  text-align: left;
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
        // max-height: 4.91rem;
        padding: 0.2rem 0.3rem;
        box-sizing: border-box;
        overflow: hidden;
        overflow-y: auto;
        border-bottom: 0.01rem solid #e8ebe8;
        margin-right: -15px;
        margin-bottom: -15px;
        .inner {
          // overflow-y: scroll;
          overflow: hidden;
        }
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
              max-width: 5rem;
              word-wrap: break-word;
              word-break: normal;
              word-break: break-all;
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
}
</style>