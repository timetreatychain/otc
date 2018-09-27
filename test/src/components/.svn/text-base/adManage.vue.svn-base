<template>
  <div class="buy">
    <div class="title_div">
      <div class="text">{{$t("app.adMager.title")}}：</div>

      <div class="orderStatus">
        <p class="title">
          {{$t("app.adMager.status")}}
        </p>
        <el-select v-model="value_deal" clearable :placeholder='$t("app.orderMager.qxz")'>
          <el-option v-for="item in options_deal" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-radio-group v-model="radio2">
          <el-radio :label="2">{{$t("app.orderMager.all")}}</el-radio>
          <el-radio :label="1">{{$t("app.orderMager.buy")}}</el-radio>
          <el-radio :label="0">{{$t("app.orderMager.sell")}}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="main">
      <div class="orders">
        <ul class="orders-title">
          <li>{{$t("app.adMager.type")}}</li>
          <li>{{$t("app.orderMager.cointype")}}</li>
          <li>{{$t("app.orderMager.count")}}</li>
          <li>{{$t("app.orderMager.price")}}</li>
          <li>{{$t("app.adMager.jyfs")}}</li>
          <li>{{$t("app.adMager.cjl")}}</li>
          <li>{{$t("app.orderMager.status1")}}</li>
          <li>{{$t("app.orderMager.cz")}}</li>
        </ul>
        <ul class="orderitems">
          <li class="frrstfloor" v-for="item in getSellOrderData" :key="item.uId">
            <div class="listTop">
              <p>{{$t("app.adMager.cjsj")}}
                <em>{{item.createTime}}</em>
              </p>
            </div>
            <div class="listBottom">
              <ul class="itemCon">
                <li>
                  <!-- 出售还是购买 -->
                  <span class="sellitem" v-if="item.dealType==='1'">{{$t("app.orderMager.sell")}}</span>
                  <span class="buyitem" v-if="item.dealType==='0'">{{$t("app.orderMager.buy")}}</span>
                  <!-- 币种 -->
                  <span>{{item.currencyType}}</span>
                  <!-- 数量 -->
                  <span>{{item.dealNum}} {{item.currencyType}}</span>
                  <!-- 单价 -->
                  <span v-if="item.list.length==1">
                    <em>{{item.list[0].unitPrice}} {{payType[item.list[0].payType]}} </em>
                    <!-- <em>0.0009993 ETH</em> -->
                  </span>
                  <span v-if="item.list.length==2">
                    <em>{{item.list[0].unitPrice}} {{payType[item.list[0].payType]}}</em>
                    <em>{{item.list[1].unitPrice}} {{payType[item.list[1].payType]}}</em>
                  </span>
                  <!-- 交易方式 -->
                  <span v-if="item.list.length==2">
                    <em >{{payType[item.list[0].payType]}}</em>
                    <em >{{payType[item.list[1].payType]}}</em>
                  </span>
                  <span v-if="item.list.length==1">
                    <em>{{payType[item.list[0].payType]}}</em>
                  </span>
                  <!-- 成交量 -->
                  <span class="cjl">
                    <em class="ys" v-if="item.dealType==='1'">{{$t("app.adMager.ys")}}</em>
                    <em class="yg" v-if="item.dealType==='0'">{{$t("app.adMager.yg")}}</em>
                    <!-- <em>{{item.turnover}}/{{item.dealNum}}</em> -->
                    <em>{{item.turnover}}</em>
                  </span>
                  <!-- 挂单状态 -->
                  <span v-if="item.orderStatus==='1'&&item.isRest==='0'">{{$t("app.adMager.gdz")}}</span>
                  <span v-if="item.orderStatus==='0'">{{$t("app.adMager.yqx")}}</span>
                  <span v-if="item.isRest==='1'&&item.orderStatus!='0'">{{$t("app.adMager.xjz")}}</span>
                  <span v-if="item.orderStatus==='2'&&item.isRest==='0'">{{$t("app.adMager.jywc")}}</span>
                  <!-- 查看 -->
                  <span>
                    <!-- <em>{{$t("app.adMager.bj")}}</em> -->
                    <em v-if="item.orderStatus !=='0' &&  item.orderStatus !=='2' && item.isEgg != 1"  @click='cancel_deal(item.uId,item.orderStatus)'>{{$t("app.adMager.xj")}}</em>
                    <em v-if="item.orderStatus !=='0' &&  item.orderStatus !=='2' && item.isEgg == 1"  @click='cancel_deal1(item.uId,item.orderStatus)'>{{$t("app.adMager.xj")}}</em>
                    <em v-if="item.orderStatus==='0' || item.orderStatus==='2'">{{$t("app.adMager.yxj")}}</em>
                  </span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <el-pagination background layout="prev, pager, next" :total="countNum" :page-size=10 @current-change="pageCallback"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type2 :2,
      lang: localStorage.otc_lang,
      getSellOrderData: "",
      payType: ["", "BIDT", "BTC", "ETH", "CNY"],
      countNum: 0,
      type: 0,
      value_deal: this.$t("app.orderMager.all"),
      radio2: 3,
      options_deal: [
        {
          value: 0,
          label: this.$t("app.orderMager.all")
        },
        {
          value: 1,
          label: this.$t("app.adMager.gdz")
        },
        {
          value: 2,
          label: this.$t("app.adMager.ywc")
        },
        {
          value: 3,
          label: this.$t("app.adMager.yxj")
        }
      ]
    };
  },
  watch: {
    value_deal(val) {
      if (val == 0) {
        this.sel(val);
      } else if (val == 1) {
        this.sel(val);
      } else if (val == 2) {
        this.sel(val);
      } else if (val == 3) {
        this.sel(val);
      }
    },
    radio2(val) {
      if (val == 0) {
        this.type2 = 1;
        this.getOrder1(1, 10, this.type, 1);
      } else if (val == 1) {
        this.type2 = 0;
        this.getOrder1(1, 10, this.type, 0);
      } else if (val == 2) {
        this.type2 = val;
        this.getOrder1(1, 10, this.type, val);
      }
    }
  },
  mounted() {
    this.getOrder(1, 10, this.type);
  },
  methods: {
    cancel_deal(id, orderStatus) {
      let vm = this;
      if (orderStatus != "0") {
        this.$confirm("此操作将取消该广告, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            $.ajax({
              type: "post",
              url: contextPath + "/api/push/deal/cancelTTCOrder",
              async: true,
              dataType: "json",
              data: {
                languageType: localStorage.coinlang || "zh",
                token: localStorage.otc_token,
                orderId: id
              },
              success(res) {
                if (res.state.code === "20000") {
                  vm.getOrder(1, 10, vm.type);
                  mui.toast("该广告订单取消成功！");
                }
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "放弃取消该广告订单!"
            });
          });
      } else {
        mui.alert("该订单已取消！");
      }
    },

    cancel_deal1(id, orderStatus) {
      let vm = this;
      if (orderStatus != "0") {
        this.$confirm("此操作将取消该广告, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            $.ajax({
              type: "post",
              url: contextPath + "/api/push/deal/cancelEggOrder",
              async: true,
              dataType: "json",
              data: {
                languageType: localStorage.coinlang || "zh",
                token: localStorage.otc_token,
                orderId: id
              },
              success(res) {
                if (res.state.code === "20000") {
                  vm.getOrder(1, 10, vm.type);
                  mui.toast("该广告订单取消成功！");
                }
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "放弃取消该广告订单!"
            });
          });
      } else {
        mui.alert("该订单已取消！");
      }
    },
    getOrder(page, row, type) {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/user/getUserAdvertising",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.coinlang || "zh",
          token: localStorage.otc_token,
          page,
          row,
          type,
          payType: vm.type2
        },
        success(res) {
          vm.countNum = res.data.count;
          vm.getSellOrderData = res.data.data;
        }
      });
    },
    getOrder1(page, row, type , type2) {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/user/getUserAdvertising",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.coinlang || "zh",
          token: localStorage.otc_token,
          page,
          row,
          type,
          payType: type2
        },
        success(res) {
          vm.countNum = res.data.count;
          vm.getSellOrderData = res.data.data;
        }
      });
    },
    pageCallback(arg) {
      let vm = this;
      this.getOrder(arg, 10, vm.type);
    },
    sel(type) {
      this.type = type;
      this.getOrder(1, 10, type);
    },
    tobuy() {
      this.$router.push({
        path: "/buyhim"
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
  min-height: 10rem;
  .title_div {
    width: 100%;
    // display: flex;
    text-align: left;
    // align-items: center;
    .text {
      font-size: 0.34rem;
      color: rgba(40, 40, 40, 1);
      margin-bottom: 0.2rem;
    }
    & /deep/ .el-input__inner {
      width: 2.2rem;
      height: 0.5rem;
      margin-right: 0.2rem;
    }
    & /deep/ .el-input__suffix {
      right: 20px;
      top: 3.5px;
    }
    .orderStatus {
      display: flex;
      align-items: center;
      .title {
        color: #939393;
        font-size: 0.24rem;
        margin-right: 0.1rem;
      }
    }
  }
  .main {
    width: 100%;
    margin-top: 0.59rem;
    .orders {
      .orders-title {
        box-sizing: border-box;
        padding: 0 0.25rem;
        padding-right: 0.1rem;
        margin-bottom: 0.2rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        background: #fafafa;
        li {
          line-height: 0.8rem;
          font-size: 0.24rem;
          color: #939393;
          // line-height: 0.3rem;
          &:nth-of-type(1) {
            width: 2rem;
          }
          &:nth-of-type(2) {
            width: 1.4rem;
          }
          &:nth-of-type(3) {
            width: 2rem;
          }
          &:nth-of-type(4) {
            width: 2.5rem;
          }
          &:nth-of-type(5) {
            width: 2.3rem;
          }
          &:nth-of-type(6) {
            width: 2.4rem;
          }
          &:nth-of-type(7) {
            width: 1.4rem;
            // color: #6ab1ef;
          }
          &:nth-of-type(8) {
            width: 1.5rem;
            // color: #6ab1ef;
          }
        }
      }
      .orderitems {
        li.frrstfloor {
          border-radius: 0.1rem;
          box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3);
          margin-bottom: 0.2rem;
          .listTop {
            // border-bottom: 0.01rem solid #eeeeee;
            p {
              color: #999999;
              font-size: 0.25rem;
              line-height: 0.2rem;
              text-align: left;
              padding-left: 0.2rem;
              em {
                display: inline-block;
                font-size: 0.24rem;
                line-height: 0.5rem;
                color: #999;
                font-style: normal;
                // margin-left: 0.2rem;
              }
            }
          }
          .listBottom {
            // padding: 0 0.2rem;
            // height: 0.7rem;
            padding-bottom: 0.05rem;
            .itemCon {
              padding-left: 0.1rem;
              li {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                align-items: center;
                margin-bottom: 0.2rem;
                span {
                  display: inline-block;
                  font-size: 0.24rem;
                  color: #282828;
                  // line-height: 0.64rem;
                  text-align: center;

                  &:nth-of-type(1) {
                    width: 2rem;
                  }
                  &.buyitem {
                    color: #cb4343;
                  }
                  &.sellitem {
                    color: #43cb83;
                  }
                  &:nth-of-type(2) {
                    width: 1.4rem;
                  }
                  &:nth-of-type(3) {
                    width: 2rem;
                  }
                  &:nth-of-type(4) {
                    width: 2.5rem;
                  }
                  &:nth-of-type(5) {
                    width: 2.3rem;
                  }
                  &:nth-of-type(6) {
                    width: 2.4rem;
                  }
                  &:nth-of-type(7) {
                    width: 1.4rem;
                    // color: #6ab1ef;
                  }
                  &:nth-of-type(8) {
                    width: 1.5rem;
                    color: #6ab1ef;
                  }
                  em {
                    display: block;
                    font-style: normal;
                    line-height: 0.3rem;
                  }
                  &.cjl em {
                    display: inline-block;
                    font-size: 0.24rem;
                    &.ys {
                      color: #43cb83;
                    }
                    &.yg {
                      color: #cb4343;
                    }
                  }
                  &:nth-of-type(8) {
                    width: 1.5rem;
                    em {
                      display: inline-block;
                      color: #6ab1ef;
                      margin-right: 0.1rem;
                    }
                    // color: #6ab1ef;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .el-pagination {
    height: 0;
    margin-top: 0.7rem;
  }
}
</style>