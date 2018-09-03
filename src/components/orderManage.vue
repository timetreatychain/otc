<template>
  <div class="buy">
    <div class="title_div">
      <div class="text">{{$t("app.orderMager.title")}}：</div>
      <div class="orderStatus">
        <p class="title">
          {{$t("app.orderMager.status")}}
        </p>
        <el-select v-model="value_deal" clearable :placeholder='$t("app.orderMager.qxz")'>
          <el-option v-for="item in options_deal" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-radio-group v-model="radio2">
          <el-radio :label="2" @click="getOrder1(1, 10, this.type)">{{$t("app.orderMager.all")}}</el-radio>
          <el-radio :label="0" @click="getOrder1(1, 10, this.type, 0)">{{$t("app.orderMager.buy")}}</el-radio>
          <el-radio :label="1" @click="getOrder1(1, 10, this.type , 1)">{{$t("app.orderMager.sell")}}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="main">
      <div class="orders">
        <ul class="orders-title">
          <li>{{$t("app.orderMager.selltype")}}</li>
          <li>{{$t("app.orderMager.cointype")}}</li>
          <li>{{$t("app.orderMager.count")}}</li>
          <li>{{$t("app.orderMager.price")}}</li>
          <li>{{$t("app.orderMager.total")}}</li>
          <li>{{$t("app.orderMager.status1")}}</li>
          <li>{{$t("app.orderMager.cz")}}</li>
        </ul>
        <ul class="orderitems">
          <li class="frrstfloor" v-for="item in list" :key="item.id">
            <div class="listTop">
              <p>
                <!-- 用户 -->
                <span v-if="item.dealType==='0' && item.isMerchan == 0">买家</span>
                <span v-if="item.dealType==='1' &&  item.isMerchan == 0">卖家</span>
                <!-- 商家 -->
                <span v-if="item.dealType==='0' && item.isMerchan == 1">卖家</span>
                <span v-if="item.dealType==='1' &&  item.isMerchan == 1">买家</span>
                {{item.name}}
                <em>{{item.createTime}}</em>
              </p>
            </div>
            <div class="listBottom">
              <ul class="itemCon">
                <li>
                  <span class="buyitem" v-if="item.dealType==='1' && item.isMerchan == 0">{{$t("app.orderMager.buy")}}</span>
                  <span class="sellitem" v-if="item.dealType==='0' && item.isMerchan == 0">{{$t("app.orderMager.sell")}}</span>

                  <span class="sellitem" v-if="item.dealType==='1' && item.isMerchan == 1">{{$t("app.orderMager.sell")}}</span>
                  <span   class="buyitem"  v-if="item.dealType==='0' && item.isMerchan == 1">{{$t("app.orderMager.buy")}}</span>
                  <span>{{item.currencyType}}</span>
                  <span>{{toDecimal(item.dealNum)}}{{item.currencyType}}</span>
                  <!--  -->
                  <span v-if="item.payType==='1'">{{toDecimal(item.digiccyUnitPrice)}} BIDT</span>
                  <span v-if="item.payType==='2'">{{toDecimal(item.digiccyUnitPrice)}} BTC</span>
                  <span v-if="item.payType==='3'">{{toDecimal(item.digiccyUnitPrice)}} ETH</span>
                  <span v-if="item.payType==='4'">{{toDecimal(item.cnyunitPrice)}} CNY</span>
                  <!-- <span>{{item.digiccyUnitPrice}} BTC</span> -->

                  <!-- <span v-if="item.payType==='1'">{{item.digiccyUnitPrice}}BIDT</span>
                  <span v-if="item.payType==='2'">{{item.digiccyUnitPrice}}BTC</span>
                  <span v-if="item.payType==='3'">{{item.digiccyUnitPrice}}ETH</span>
                  <span v-if="item.payType==='4'">{{item.digiccyUnitPrice}}CNY</span> -->
                  <span v-if="item.payType==='1'">{{toDecimal(item.digiccyTradeTotalPrices)}}BIDT</span>
                  <span v-if="item.payType==='2'"> {{toDecimal(item.digiccyTradeTotalPrices)}}BTC</span>
                  <span v-if="item.payType==='3'"> {{toDecimal(item.digiccyTradeTotalPrices)}}ETH</span>
                  <span v-if="item.payType==='4'">{{toDecimal(item.cnytradeTotalPrices)}}CNY</span>

                  <!-- <span>{{$t("app.orderMager.yxd")}}</span> -->

                  <span v-if="item.orderStatus==='0'">{{$t("app.orderMager.qx")}}</span>
                  <!-- <span v-if="item.orderStatus==='1'">{{$t("app.orderMager.yhxd")}}</span> -->
                  <!-- 用户 购买 -->
                  <span v-if="item.orderStatus==='1' && item.dealType==='1' && item.isMerchan == 0">待付款</span>
                  <span v-if="item.orderStatus==='2' && item.dealType==='1' && item.isMerchan == 0">等待卖家发币</span>
                  <span v-if="item.orderStatus==='3' && item.dealType==='1' && item.isMerchan == 0">卖家已发币</span>
                  <span v-if="item.orderStatus==='4' && item.dealType==='1' && item.isMerchan == 0">{{$t("app.orderMager.jywc")}}</span>
                  <span v-if="item.orderStatus==='5'">{{$t("app.orderMager.jyfq")}}</span>
                  <!-- 用户 出售 -->
                  <span v-if="item.orderStatus==='1' && item.dealType==='0' && item.isMerchan == 0">待支付</span>
                  <span v-if="item.orderStatus==='2' && item.dealType==='0' && item.isMerchan == 0">等待买家付款</span>
                  <span v-if="item.orderStatus==='3' && item.dealType==='0' && item.isMerchan == 0">买家已付款</span>
                  <span v-if="item.orderStatus==='4' && item.dealType==='0' && item.isMerchan == 0">{{$t("app.orderMager.jywc")}}</span>



                  <!-- 商家 出售-->
                  <span v-if="item.orderStatus==='1' && item.dealType==='1' && item.isMerchan == 1">等待买家付款</span>
                  <span v-if="item.orderStatus==='2' && item.dealType==='1' && item.isMerchan == 1">买家已付款</span>
                  <span v-if="item.orderStatus==='3' && item.dealType==='1' && item.isMerchan == 1">等待买家确认</span>
                  <span v-if="item.orderStatus==='4' && item.dealType==='1' && item.isMerchan == 1">{{$t("app.orderMager.jywc")}}</span>

                   <!-- 商家 购买-->
                   <span v-if="item.orderStatus==='1' && item.dealType==='0' && item.isMerchan == 1">等待卖家发币</span>
                  <span v-if="item.orderStatus==='2' && item.dealType==='0' && item.isMerchan == 1">卖家已发币</span>
                  <span v-if="item.orderStatus==='3' && item.dealType==='0' && item.isMerchan == 1">等待卖家确认</span>
                  <span v-if="item.orderStatus==='4' && item.dealType==='0' && item.isMerchan == 1">{{$t("app.orderMager.jywc")}}</span>

                  <span @click="message(item.dealType,item.isMerchan,item.id)">{{$t("app.orderMager.check")}}</span>
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
      type2:2,
      list: "",
      // countNum: 0,
      type: 0,
      countNum: 1,
      value_deal: "全部",
      radio2: 2,
      options_deal: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "交易中"
        },
        {
          value: 2,
          label: "已完成"
        },
        {
          value: 3,
          label: "已取消"
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
        this.type2 = 0;
        this.getOrder1(1, 10, this.type, 0);
      } else if (val == 1) {
        this.type2 = 1;
        this.getOrder1(1, 10, this.type, 1);
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
    toDecimal(x1) {
      console.log(x1);
      if (isNaN(x1)) {
        let x = x1.split(" ")[0];
        var f = parseFloat(x);
        let x2 = x.split(".");
        f = x2[0] + "." + x2[1].slice(0, 8);
        return f;
      } else {
        let f = x1.toString();
        if (f.indexOf(".") == -1) {
          return f;
        } else {
          let x2 = f.split(".");
          f = x2[0] + "." + x2[1].slice(0, 8);
          return f;
        }
      }
    },
    sel(type) {
      this.type = type;
      this.getOrder(1, 10, type);
    },
    pageCallback(arg) {
      let vm = this;
      this.getOrder(arg, 10, vm.type);
    },
    message(type, who, id) {
      //dealType 1,isMerchan 0
      if (who === "1") {
        if (type === "0") {
          //购买 广告
          this.$router.push({
            path: "/buyadvertise",
            query: { id }
          });
        } else if (type === "1") {
          //出售 卖家
          this.$router.push({
            path: "/selladvertise",
            query: { id }
          });
        }
      } else if (who === "0") {
        if (type === "0") {
          //出售 买家
          this.$router.push({
            path: "/SellOrder",
            query: { id }
          });
        } else if (type === "1") {
          //购买 BIDT
          this.$router.push({
            path: "/PurchaseOrder",
            query: { id }
          });
        }
      }
    },
    // pageCallback(arg) {},
    tobuy() {
      this.$router.push({
        path: "/buyhim"
      });
    },
    getOrder(page, row, type) {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/user/getUserOrder",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.otc_lang || "zh",
          token: localStorage.otc_token,
          page,
          row,
          type,
          payType: vm.type2
        },
        success(res) {
          console.log(res);
          vm.countNum = res.data.count;
          vm.list = res.data.data;
        }
      });
    },
    getOrder1(page, row, type, type2) {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/user/getUserOrder",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.otc_lang || "zh",
          token: localStorage.otc_token,
          page,
          row,
          type,
          payType: type2
        },
        success(res) {
          console.log(res);
          vm.countNum = res.data.count;
          vm.list = res.data.data;
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
        padding-right: 0.12rem;
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
            width: 1.5rem;
          }
          &:nth-of-type(3) {
            width: 2.5rem;
          }
          &:nth-of-type(4) {
            width: 2.5rem;
          }
          &:nth-of-type(5) {
            width: 2rem;
          }
          &:nth-of-type(6) {
            width: 2.4rem;
          }
          &:nth-of-type(7) {
            width: 1.4rem;
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
            border-bottom: 0.01rem solid #eeeeee;
            p {
              color: #282828;
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
                margin-left: 0.2rem;
              }
            }
          }
          .listBottom {
            // padding: 0 0.2rem;
            height: 0.64rem;
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
                  line-height: 0.64rem;
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
                    width: 1.5rem;
                  }
                  &:nth-of-type(3) {
                    width: 2.5rem;
                  }
                  &:nth-of-type(4) {
                    width: 2.5rem;
                  }
                  &:nth-of-type(5) {
                    width: 2rem;
                  }
                  &:nth-of-type(6) {
                    width: 2.4rem;
                  }
                  &:nth-of-type(7) {
                    width: 1.4rem;
                    color: #6ab1ef;
                    cursor: pointer;
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