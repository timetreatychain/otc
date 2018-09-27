<template>
  <div class="advertise">
    <div class="title">免费发布一个交易广告</div>
    <div class="main">
      <div class="left">
        <!--基本设置-->
        <div class="basic">
          <div class="basic_title">基本设置</div>
          <div class="basic_content">
            <!--交易类型 数量 地区-->
            <div class="basic_l">
              <div class="l_text">
                <sup>*</sup>交易类型</div>
              <div class="l_text" v-if="radios==='buy'">
                <sup>*</sup>购买数量</div>
              <div class="l_text" v-if="radios==='sell'">
                <sup>*</sup>出售数量</div>
              <div class="l_text">
                <sup>*</sup>所在地区</div>
            </div>
            <div class="basic_r">
              <!--出售or购买-->
              <div class="selects">
                <!--我要出售-->
                <el-radio v-model="radios" label="sell">我要出售</el-radio>
                <el-select v-model="value_sell" clearable placeholder="请选择" @change="change_message">
                  <el-option v-for="item in options_sell" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <!--我要购买-->
                <el-radio v-model="radios" label="buy" class="radios_l">我要购买</el-radio>
                <el-select @change="change_message" v-model="value_buy" clearable placeholder="请选择">
                  <el-option v-for="item in options_buy" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <!--数量-->
              <el-input @blur="checknum" v-model="num" clearable :placeholder="plcer3" @keyup.native="reg($event,'num')" ></el-input>
              <!--地区-->
              <el-select v-model="value_area" clearable placeholder="请选择">
                <el-option v-for="item in options_area" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!--交易设置-->
        <div class="deal deal_cny">
          <div class="deal_content">
            <!--支付方式 单价 限额-->
            <div class="deal_l">
              <div class="l_text" v-if="radios==='sell'">
                <sup>*</sup>收款方式</div>
              <div class="l_text" v-if="radios==='buy'">
                <sup>*</sup>支付方式</div>
              <div class="l_text" v-if="radios==='sell'">
                <sup>*</sup>收款账号</div>
              <div class="l_text" v-if="radios==='buy'">
                <sup>*</sup>收币地址</div>
              <div class="l_text">
                <sup>*</sup>交易单价</div>
              <div class="l_text">
                <sup>*</sup>交易限额</div>
            </div>
            <div class="deal_r">
              <div class="cnysele">
                <!--选择支付收款方式-->
                <el-select v-model="value_cny" clearable placeholder="请选择" @change="cny_select">
                  <el-option v-for="item in options_cny" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <!--删除-->
                <!-- <div class="removemethods">
								  		<img src="../../static/removemethods.png" @click="remove"/>
								  		<span @click="remove">删除</span>
								  	</div> -->
              </div>
              <!--收款地址-->
              <el-input v-if="radios==='sell'" v-model="address2" :disabled="true"></el-input>
              <el-input v-if="radios==='buy'" v-model="address3" :disabled="true"></el-input>
              <div class="price">
                <!--单价-->
                <div class="inp">
                  <el-input v-model="price_cny" clearable :placeholder="placehiler" @keyup.native="reg($event,'priceCNY')" ></el-input>
                  <div class="unit">{{value_cny}}</div>
                </div>
                <!--当前市场价格-->
                <div class="price_show" v-if="value_cny!=''">当前市场单价：{{toDecimal(scdj.fbt)}} CNY</div>
              </div>
              <!--限额-->
              <div class="quota">
                <!--最低-->
                <el-input @blur="checkcnymin" v-model="quota_min2" clearable :placeholder="cnyplacer" @keyup.native="reg($event,'quotaMIN2')"></el-input>
                <div class="unit">CNY</div>
                <span>-</span>
                <!--最高-->
                <el-input v-model="quota_max2" clearable placeholder="填写最高限额" @keyup.native="reg($event,'quotaMAX2')"></el-input>
                <div class="unit">CNY</div>
              </div>
            </div>
          </div>
        </div>
        <!--添加交易方式-->
        <div class="addmethods" v-if="add_btn">
          <img src="../../static/addmethods.png" @click="add" />
          <span @click="add">添加多个交易方式</span>
        </div>
        <!--CNY交易-->
        <transition name="deal_cny">

          <div class="deal" v-if="addORremove">
            <div class="deal_title">交易设置</div>
            <div class="deal_content">
              <!--支付 单价 限额-->
              <div class="deal_l">
                <div class="l_text" v-if="radios==='sell'">
                  <sup>*</sup>收款方式</div>
                <div class="l_text" v-if="radios==='buy'">
                  <sup>*</sup>支付方式</div>
                <div class="l_text" v-if="radios==='sell'">
                  <sup>*</sup>收币地址</div>
                <div class="l_text" v-if="radios==='buy'">
                  <sup>*</sup>收币地址</div>
                <div class="l_text">
                  <sup>*</sup>交易单价</div>
                <div class="l_text">
                  <sup>*</sup>交易限额</div>
              </div>
              <div class="deal_r">
                <!--支付收款方式-->
                <el-select v-model="value_deal" clearable placeholder="请选择" @change="address_methods">
                  <el-option v-for="item in options_deal" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <!--收款地址-->
                <el-input v-model="address3" v-if="radios==='sell'" :disabled="true"></el-input>
                <el-input v-model="address3" v-if="radios==='buy'" :disabled="true"></el-input>
                <div class="price">
                  <!--单价-->
                  <div class="inp">
                    <el-input v-model="price" clearable :placeholder="placehiler" @keyup.native="reg($event,'prices')"></el-input>
                    <div class="unit">{{value_deal}}</div>
                  </div>
                  <!--市场价-->
                  <div class="price_show" v-if="value_deal!=''">当前市场单价：{{toDecimal(scdj1)}} {{value_deal}}/{{commondPrice}}</div>
                </div>
                <!--限额-->
                <div class="quota">
                  <!--最低-->
                  <el-input @blur="checkaddmoneymin" v-model="quota_min1" clearable :placeholder="addpubmoney" @keyup.native="reg($event,'quotaMIN1')"></el-input>
                  <div class="unit">{{value_deal}}</div>
                  <span>-</span>
                  <!--最高-->
                  <el-input v-model="quota_max1" clearable placeholder="填写最高限额" @keyup.native="reg($event,'quotaMAX1')"></el-input>
                  <div class="unit">{{value_deal}}</div>
                </div>
              </div>
            </div>
            <div class="removemethods">
              <img src="../../static/removemethods.png" @click="remove" />
              <span @click="remove">删除</span>
            </div>
          </div>

        </transition>
        <!--其他设置-->
        <div class="else">
          <div class="else_title">其他设置</div>
          <div class="else_content">
            <!--留言 安全-->
            <div class="else_l">
              <div class="l_text">广告留言</div>
              <div class="l_text l_text1">安全选项</div>
            </div>
            <div class="else_r">
              <!--留言框-->
              <textarea id="textareas" placeholder="请说明有关您交易的相关要求，以便买家下单前先行查看，例如：1.请在有效期内付款并点击【我已付款】按钮，我才会释放数字资产给您；2.如果您无法在有效期付款，请及时取消订单。">
              </textarea>
              <!--开启电话通知-->
              <el-checkbox v-model="sms" @change="smspd">开启交易信息手机电话通知</el-checkbox>
              <div class="sms">勾选后，交易信息将通过手机电话通知与您</div>
              <!--<el-checkbox v-model="sms">交易对方必须绑定手机号码</el-checkbox>
							<div class="sms">勾选后，仅已绑定手机号码的用户与您交易</div>
							<el-checkbox v-model="sms">交易对方必须通过实名认证</el-checkbox>
							<div class="sms">勾选后，仅已完成实名认证的用户与您交易</div>-->
            </div>
          </div>
        </div>
        <!--立即发布-->
        <div class="send" @click="send_adv">立即发布</div>
      </div>
      <!--用户须知-->
      <div class="right">
        <div class="r_title">{{$t('advertise.right[0]')}}</div>
        <li>{{$t('advertise.right[1]')}}</li>
        <!--<li>{{$t('advertise.right[2]')}}</li>-->
        <li>{{$t('advertise.right[3]')}}</li>
        <li>{{$t('advertise.right[4]')}}</li>
        <li>{{$t('advertise.right[5]')}}</li>
      </div>
    </div>
    <!--绑定地址-->
    <div class="boxpopup" v-if="popup">
      <div class="popup">
        <div class="poptitle">设置收币地址</div>
        <div class="name" v-show="transationtype == 'BIDT'">
          <div class="text">请输入您的BIDT地址</div>
          <div class="right">
            <input type="text" class="inp" id="bidt" v-model="address.bidtaddress"  />
          </div>
        </div>
        <div class="name" v-show="transationtype == 'BTC'">
          <div class="text">请输入您的BTC地址</div>
          <div class="right">
            <input type="text" class="inp" id="btc" v-model="address.btcaddress" />
          </div>
        </div>
        <div class="name" v-show="transationtype == 'ETH'">
          <div class="text">请输入您的ETH地址</div>
          <div class="right">
            <input type="text" class="inp" id="eth" v-model="address.ethaddress"  />
          </div>
        </div>
        <div class="name" v-show="transationtype == 'USDT'">
          <div class="text">请输入您的USDT地址</div>
          <div class="right">
            <input type="text" class="inp" id="usdt" v-model="address.usdtaddress" />
          </div>
        </div>
        <div class="name names" v-show="transationtype == 'CNY'">
          <div class="text">银行卡号</div>
          <div class="right">
            <input type="text" class="inp" id="name" v-model="address.cnyuserName" placeholder="您的姓名" />
            <input type="text" class="inp" id="bank" v-model="address.bankName" placeholder="开户行名称" />
            <input type="text" class="inp" id="ht" v-model="address.cnyaddress" placeholder="请输入您的银行卡号" />
          </div>
        </div>
        <div class="popup_btn">
          <el-button :plain="true" class="popup_cancel" @click="popcancel()">取消</el-button>
          <el-button :plain="true" class="popup_submit" @click="popsubmit()">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transationtype: "",
      cnyplacer: "",
      addpubmoney: "",
      plcer3: "最少出售或购买2000BIDT",
      ploder2: "填写最低限额",
      popup: false,
      radios: "sell",
      options_sell: [
        {
          value: "BIDT",
          label: "BIDT"
        },
        {
          value: "BTC",
          label: "BTC"
        },
        {
          value: "ETH",
          label: "ETH"
        },
        {
          value: "USDT",
          label: "USDT"
        }
      ],
      value_sell: "",
      options_buy: [
        {
          value: "BIDT",
          label: "BIDT"
        },
        {
          value: "BTC",
          label: "BTC"
        },
        {
          value: "ETH",
          label: "ETH"
        },
        {
          value: "USDT",
          label: "USDT"
        }
      ],
      value_buy: "",
      num: "",
      options_area: [
        {
          value: "0",
          label: "中国"
        }
      ],
      value_area: "",
      options_deal: [
        {
          value: "BTC",
          label: "BTC"
        },
        {
          value: "ETH",
          label: "ETH"
        }
      ],
      value_deal: "",
      address1: "您的BTC收款地址:",
      price: "",
      quota_min1: "",
      quota_max1: "",
      add_btn: true,
      addORremove: false,
      options_cny: [
        {
          value: "CNY",
          label: "CNY"
        }
      ],
      value_cny: "",
      address2: "您的银行卡号:",
      price_cny: "",
      quota_min2: "",
      quota_max2: "",
      sms: false,
      btn_send: true,
      address: "",
      scdj: "",
      scdj1: "",
      commondPrice: "",
      placehiler: "填写你希望BIDT一个兑换多少",
      adressList: [],
      address3: ""
    };
  },
  created() {
    this.getaddress();
    this.getprice("BIDT");
    this.getinfkonw();
  },
  watch: {
    commondPrice(val) {
      this.transationtype = val;
      this.value_deal = "";
      this.placehiler = "填写你希望" + this.commondPrice + "一个兑换多少";
      if (val == "BIDT") {
        this.plcer3 = "最少出售或购买2000BIDT";
      } else {
        this.plcer3 = "";
      }

      // if (val == "BIDT") {
      //   this.ploder2 = "填写最低限额200";
      // } else if (val == "BTC") {
      //   this.ploder2 = "填写最低限额0.01";
      // } else if (val == "ETH") {
      //   this.ploder2 = "填写最低限额0.1";
      // } else if (val == "USDT") {
      //   this.ploder2 = "填写最低限额1";
      // }
    },
    // num (val) {
    //   if(this.commondPrice == "BIDT") {

    //   }
    // },
    radios(val) {
      if (val == "sell") {
        this.radios = "sell";
      } else {
        this.radios = "buy";
      }
    },
    value_sell(val) {
      if (this.radios != "sell") {
        this.value_buy = "";
        // mui.alert("请点击我要出售的按钮");
        this.open("请点击我要出售的按钮");
        return;
      }
      // this.value_buy ="";
      if (val == "BTC") {
        this.value_deal = "";
        this.options_deal = [
          {
            value: "ETH",
            label: "ETH"
          }
        ];
      } else if (val == "ETH") {
        this.value_deal = "";
        this.options_deal = [
          {
            value: "BTC",
            label: "BTC"
          }
        ];
      } else {
        this.options_deal = [
          {
            value: "BTC",
            label: "BTC"
          },
          {
            value: "ETH",
            label: "ETH"
          }
        ];
      }
    },
    value_buy(val) {
      if (this.radios != "buy") {
        this.value_sell = "";
        // mui.alert("请点击我要购买的按钮");
        this.open("请点击我要购买的按钮");
        return;
      }
      // this.value_sell = "";
      if (val == "BTC") {
        this.options_deal = [
          {
            value: "ETH",
            label: "ETH"
          }
        ];
      } else if (val == "ETH") {
        this.options_deal = [
          {
            value: "BTC",
            label: "BTC"
          }
        ];
      } else {
        this.options_deal = [
          {
            value: "BTC",
            label: "BTC"
          },
          {
            value: "ETH",
            label: "ETH"
          }
        ];
      }
    }
  },
  methods: {
  	//REG
  	reg(e,s){
			e.target.value=e.target.value.replace(/[^\-?\d.]/g,'');
			e.target.value = e.target.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
			e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/,'$1$2.$3'); //只能输入1个小数
			if(s==='num'){
				this.num=e.target.value;
			}
			if(s==='priceCNY'){
				this.price_cny=e.target.value;
			}
			if(s==='quotaMIN2'){
				this.quota_min2=e.target.value;
			}
			if(s==='quotaMAX2'){
				this.quota_max2=e.target.value;
			}
			if(s==='prices'){
				this.price=e.target.value;
			}
			if(s==='quotaMIN1'){
				this.quota_min1=e.target.value;
			}
			if(s==='quotaMAX1'){
				this.quota_max1=e.target.value;
			}
  	},
    open3() {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
    // toDecimal(x1) {
    //   console.log(x1);
    //   if (isNaN(x1)) {
    //     let x = x1.split(" ")[0];
    //     var f = parseFloat(x);
    //     let x2 = x.split(".");
    //     f = x2[0] + "." + x2[1].slice(0, 8);
    //     return f;
    //   } else {
    //     let f = x1.toString();
    //     if (f.indexOf(".") == -1) {
    //       return f;
    //     } else {
    //       let x2 = f.split(".");
    //       f = x2[0] + "." + x2[1].slice(0, 8);
    //       return f;
    //     }
    //   }
    // },
    toDecimal(x1) {
      console.log(x1);
      if (isNaN(x1)) {
        let x = x1.split(" ")[0];
        var f = parseFloat(x);
        let x2 = x.split(".");
        f = x2[0] + "." + x2[1].slice(0, 8);
        return f;
      } else {
				
				let str = Math.ceil(x1 * 100000000) / 100000000;
				return str;

        // let f = x1.toString();
        // if (f.indexOf(".") == -1) {
        //   return f;
        // } else {
        //   let x2 = f.split(".");
				// 	// f = x2[0] + "." + x2[1].slice(0, 8);
				// 	f = x2[0] + "." + Math.floor(Number(x2[1].slice(0, 9)) / 10 );
        //   return f;
        // }
      }
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
    // blsz (num) {
    //   console.log(Math.round((num*10000000)/ 10000000));
    //  return Math.round((num*10000000)/ 10000000);
    // },
    checkaddmoneymin() {
      let money1 = "";
      if (this.value_deal == "BTC") {
        money1 = 50 / this.scdj.btcprice;
      } else {
        money1 = 50 / this.scdj.ethprice;
      }
      if (this.quota_min1 < money1) {
        // mui.alert("最低限额" + this.toDecimal(money1) + this.value_deal);
        this.open("最低限额" + this.toDecimal(money1) + this.value_deal)
        return;
      }
    },
    checkcnymin() {
      if (this.quota_min2 < 50) {
        // mui.alert("最低限额" + 50);
        this.open("最低限额" + 50)
        return;
      }
    },
    // 当币种是BIDT 检查数量是否大于2000
    checknum() {
      if (this.commondPrice == "BIDT") {
        if (this.num < 2000) {
          this.open("最少出售或者购买2000BIDT")
          // mui.alert("最少出售或者购买2000BIDT");
          return;
        }
      }
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
    change_message() {
      let vm = this;
      if (vm.radios === "sell") {
        if (vm.value_sell === "BIDT") {
          vm.commondPrice = vm.value_sell;
          vm.getprice(vm.value_sell);
          // vm.address3 = vm.adressList[0];
          // vm.scdj1=` ${vm.scdj.btc} BTC / BIDT`;
          // if(vm.address.btcaddress===''||vm.address.btcaddress===null){
          // 	vm.popup=true;
          // }
          // vm.address1=vm.address.btcaddress;
        } else if (vm.value_sell === "BTC") {
          vm.commondPrice = vm.value_sell;
          vm.getprice(vm.value_sell);
        } else if (vm.value_sell === "ETH") {
          // vm.address3 = vm.adressList[2];
          vm.commondPrice = vm.value_sell;
          vm.getprice(vm.value_sell);
        } else if (vm.value_sell === "USDT") {
          // vm.address3 = vm.adressList[3];
          vm.commondPrice = vm.value_sell;
          vm.getprice(vm.value_sell);
        }
      } else if (vm.radios === "buy") {
        if (vm.value_buy === "BIDT") {
          vm.commondPrice = vm.value_buy;
          vm.getprice(vm.value_buy);
          if (vm.address.bidtaddress == "" || vm.address.bidtaddress == null) {
            vm.popup = true;
          }
          vm.address3 = vm.adressList[0];
        } else if (vm.value_buy === "BTC") {
          vm.commondPrice = vm.value_buy;
          vm.getprice(vm.value_buy);
          if (vm.address.btcaddress == "" || vm.address.btcaddress == null) {
            vm.popup = true;
          }
          vm.address3 = vm.adressList[1];
        } else if (vm.value_buy === "ETH") {
          vm.commondPrice = vm.value_buy;
          vm.getprice(vm.value_buy);
          if (vm.address.ethaddress == "" || vm.address.ethaddress == null) {
            vm.popup = true;
          }
          vm.address3 = vm.adressList[2];
        } else if (vm.value_buy === "USDT") {
          vm.commondPrice = vm.value_buy;
          vm.getprice(vm.value_buy);
          if (vm.address.usdtaddress == "" || vm.address.usdtaddress == null) {
            vm.popup = true;
          }
          vm.address3 = vm.adressList[3];
        }

        // if(vm.address.bidtaddress===''||vm.address.bidtaddress===null){
        // 	vm.popup=true;
        // 	vm.address1=vm.address.bidtaddress;
        // }else{
        // 	vm.address1=vm.address.bidtaddress;
        // 	vm.address2=vm.address.bidtaddress;
        // }
      }
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
            // mui.alert("您还未缴纳保证金，请先缴纳保证金");
            vm.open("发布交易广告需缴纳不少于交易货币1.25倍等值的BIDT作为保证金，保证金可退。");
            // vm.$router.push("/usercenter");
            vm.$router.push({
                  path: "/usercenter",
                  query: { type: 2 }
                });
          }
        }
      });
    },
    getprice(coinType) {
      if (!localStorage.otc_token) {
        this.$router.push("/login");
        return;
      }
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/deal/getBIDT",
        async: true,
        dataType: "json",
        data: {
          token: localStorage.otc_token,
          languageType: localStorage.otc_lang || "zh",
          type: coinType
        },
        success(res) {
          vm.scdj = res.data;
          vm.cnyplacer = "最低限额" + 50;
        }
      });
    },
    smspd() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/common/isPhone",
        async: true,
        dataType: "json",
        data: {
          token: localStorage.otc_token,
          languageType: localStorage.otc_lang
        },
        success(res) {
          if (res.data === "0") {
            mui.toast("请在个人中心绑定手机号码！");
            vm.$router.push('/usercenter')
            vm.sms = false;
          }
        }
      });
    },
    //判断是否有绑定地址
    address_methods() {
      let vm = this;
      if (vm.radios === "sell") {
        if (vm.value_deal === "BTC") {
          // vm.commondPrice = vm.value_deal;
          // vm.getprice(vm.value_deal);
          // vm.scdj1 = ` ${vm.scdj.btc} BTC / ${vm.commondPrice}`;
          vm.addpubmoney = "最低限额" + vm.toDecimal(50 / vm.scdj.btcprice);

          vm.scdj1 = vm.scdj.btc + " BTC /" + vm.commondPrice;
          if (vm.address.btcaddress === "" || vm.address.btcaddress === null) {
            vm.popup = true;
            vm.transationtype = "BTC";
          } else {
            vm.address3 = vm.adressList[1];
          }
          vm.address1 = vm.address.btcaddress;
        } else if (vm.value_deal === "ETH") {
          // vm.commondPrice = vm.value_deal;
          // vm.getprice(vm.value_deal);
          // vm.scdj1 = ` ${vm.scdj.eth} ETH / ${vm.commondPrice}`;
          vm.addpubmoney = "最低限额" + vm.toDecimal(50 / vm.scdj.ethprice);
          vm.scdj1 = vm.scdj.eth + " ETH /" + vm.commondPrice;
          if (vm.address.ethaddress === "" || vm.address.ethaddress === null) {
            vm.popup = true;
            vm.transationtype = "ETH";
          }
          vm.address1 = vm.address.ethaddress;
          vm.address3 = vm.adressList[2];
        }
      } else if (vm.radios === "buy") {
        if (vm.value_deal === "BTC") {
          // vm.commondPrice = vm.value_deal;
          // vm.getprice(vm.value_deal);
          // vm.scdj1 = ` ${vm.scdj.btc} BTC / ${vm.commondPrice}`;
          vm.addpubmoney = "最低限额" + vm.toDecimal(50 / vm.scdj.btcprice);
          vm.scdj1 = vm.scdj.btc + " BTC /" + vm.commondPrice;
          // if (vm.address.btcaddress === "" || vm.address.btcaddress === null) {
          //   vm.popup = true;
          //   vm.transationtype = "BTC";
          // }
          vm.address1 = vm.address.btcaddress;
          // vm.address3 = vm.adressList[1]
        } else if (vm.value_deal === "ETH") {
          // vm.commondPrice = vm.value_deal;
          // vm.getprice(vm.value_deal);
          // vm.scdj1 = ` ${vm.scdj.eth} ETH / ${vm.commondPrice}`;
          vm.addpubmoney = "最低限额" + vm.toDecimal(50 / vm.scdj.ethprice);
          vm.scdj1 = vm.scdj.eth + " ETH /" + vm.commondPrice;
          // if (vm.address.ethaddress === "" || vm.address.ethaddress === null) {
          //   vm.popup = true;
          //   vm.transationtype = "ETH";
          // }
          vm.address1 = vm.address.ethaddress;
          // vm.address3 = vm.adressList[2]
        }

        // if (vm.address.bidtaddress === "" || vm.address.bidtaddress === null) {
        //   vm.popup = true;
        //   vm.address1 = vm.address.bidtaddress;
        // } else {
        //   vm.address1 = vm.address.bidtaddress;
        //   vm.address2 = vm.address.bidtaddress;
        // }
      }
    },
    cny_select() {
      // if (this.radios != "buy" && this.address.cnyaddress === "" || this.radios != "buy" && this.address.cnyaddress === null  ||  this.address.cnyaddress === "" ||  this.address.cnyaddress === null) {
      //   this.transationtype = "CNY";
      //   this.popup = true;
      //   this.value_cny = "";
      //   return;
      // }
      if (
        (this.radios != "buy" && this.address.cnyaddress === "") ||
        this.address.cnyaddress === null
      ) {
        this.transationtype = "CNY";
        this.popup = true;
        this.value_cny = "";
        return;
      }
    },
    popsubmit() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/user/saveUserAddress",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.otc_lang || "zh",
          token: localStorage.otc_token,
          ETHAddress: $("#eth").val(),
          BTCAddress: $("#btc").val(),
          CNYAddress: $("#ht").val(),
          CNYuserName: $("#name").val(),
          bankName: $("#bank").val(),
          BIDTAddress: $("#bidt").val(),
          USDTAddress: $("#usdt").val()
        },
        success(res) {
          mui.toast("绑定成功！");
          vm.popup = false;
          // vm.value_deal = "";
          vm.getaddress();
        }
      });
    },
    popcancel() {
      // mui.alert("不保存无法完成广告交易！");
      this.popup = false;
      this.value_deal = "";
      this.value_buy = "";
      this.value_sell = "";
    },
    //  地址数组
    addresslists(obj) {
      this.adressList = [];
      this.adressList.push(obj["bidtaddress"]);
      this.adressList.push(obj["btcaddress"]);
      this.adressList.push(obj["ethaddress"]);
      this.adressList.push(obj["usdtaddress"]);
      // console.log(this.adressList);
    },
    //获取钱包地址
    getaddress() {
      if (!localStorage.otc_token) {
        this.$router.push("/login");
        return;
      }
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/user/getUserAddress",
        async: true,
        dataType: "json",
        data: {
          token: localStorage.otc_token,
          languageType: localStorage.otc_lang
        },
        success(res) {
          vm.address = res.data;
          vm.address1 = res.data.btcaddress;
          vm.address2 = res.data.cnyaddress;
          vm.address3 =
            vm.value_deal == "BTC" ? res.data.btcaddress : res.data.ethaddress;
          vm.addresslists(vm.address);
          if (vm.radios == "buy") {
            console.log("buybuy");
            if (vm.commondPrice == "BIDT") {
              console.log(vm.adressList[0]);
              vm.address3 = vm.adressList[0];
            } else if (vm.commondPrice == "BTC") {
              console.log(vm.adressList[1]);
              vm.address3 = vm.adressList[1];
            } else if (vm.commondPrice == "ETH") {
              console.log(vm.adressList[3]);
              vm.address3 = vm.adressList[2];
            } else if (vm.commondPrice == "USDT") {
              console.log(vm.adressList[3]);
              vm.address3 = vm.adressList[3];
            }
          }
        }
      });
    },
    //添加支付方式
    add() {
      this.addORremove = true;
      this.add_btn = false;
    },
    //删除支付方式
    remove() {
      this.addORremove = false;
      this.add_btn = true;
    },
    //发布广告
    send_adv() {
      let vm = this;
      //				if(vm.btn_send!=false){
      vm.btn_send = false;
      //判断 出售-购买
      if (vm.radios === "sell") {
        //出售
        //单种出售交易方式
        if (vm.addORremove != true) {
          //不可为空
          if (
            vm.value_sell != "" &&
            vm.num != "" &&
            vm.value_area != "" &&
            vm.value_cny != "" &&
            vm.price_cny != "" &&
            vm.quota_min2 != "" &&
            vm.quota_max2 != ""
          ) {
            vm.oneSell(
              vm.value_area,
              vm.num,
              vm.value_cny,
              vm.price_cny,
              vm.quota_min2,
              vm.quota_max2,
              vm.value_sell
            );
          } else {
            // mui.alert("请填写完整！");
            vm.open("请填写完整！");
          }
        } else {
          //多种出售交易方式
          if (
            vm.value_sell != "" &&
            vm.num != "" &&
            vm.value_area != "" &&
            vm.value_deal != "" &&
            vm.price != "" &&
            vm.quota_min1 != "" &&
            vm.quota_max1 != "" &&
            vm.value_cny != "" &&
            vm.price_cny != "" &&
            vm.quota_min2 != "" &&
            vm.quota_max2 != ""
          ) {
            //交易方式不可一样
            //							if(vm.value_deal!=vm.value_cny){
            //判断额度
            if (
              Number(vm.quota_min1) > Number(vm.quota_max1) ||
              Number(vm.quota_min2) > Number(vm.quota_max2)
            ) {
              mui.alert("最低额度不得大于最高额度！");
            } else {
              vm.towSell(
                vm.value_area,
                vm.num,
                vm.value_deal,
                vm.price,
                vm.quota_min1,
                vm.quota_max1,
                vm.price_cny,
                vm.quota_min2,
                vm.quota_max2,
                vm.value_sell
              );
            }
            //							}
            //							else{
            //								mui.alert('交易方式不可一致！')
            //							}
          } else {
            // mui.alert("请填写完整！");
            vm.open("请填写完整！");
          }
        }
      } else {
        //购买
        //单种购买交易方式
        if (vm.addORremove != true) {
          if (
            vm.value_buy != "" &&
            vm.num != "" &&
            vm.value_area != "" &&
            vm.value_cny != "" &&
            vm.price_cny != "" &&
            vm.quota_min2 != "" &&
            vm.quota_max2 != ""
          ) {
            //限额
            if (Number(vm.quota_min2) > Number(vm.quota_max2)) {
              mui.alert("最低额度不得大于最高额度");
            } else {
              vm.oneBuy(
                vm.value_area,
                vm.num,
                vm.value_cny,
                vm.price_cny,
                vm.quota_min2,
                vm.quota_max2,
                vm.value_buy
              );
            }
          } else {
            // mui.alert("请填写完整！");
            vm.open("请填写完整！");
          }
        } else {
          //多种购买交易方式
          if (
            vm.value_buy != "" &&
            vm.num != "" &&
            vm.value_area != "" &&
            vm.value_deal != "" &&
            vm.price != "" &&
            vm.quota_min1 != "" &&
            vm.quota_max1 != "" &&
            vm.value_cny != "" &&
            vm.price_cny != "" &&
            vm.quota_min2 != "" &&
            vm.quota_max2 != ""
          ) {
            //交易方式不可一样
            //							if(vm.value_deal!=vm.value_cny){
            //判断额度
            if (
              Number(vm.quota_min1) > Number(vm.quota_max1) ||
              Number(vm.quota_min2) > Number(vm.quota_max2)
            ) {
              mui.alert("最低额度不得大于最高额度！");
            } else {
              vm.towBuy(
                vm.value_area,
                vm.num,
                vm.value_deal,
                vm.price,
                vm.quota_min1,
                vm.quota_max1,
                vm.price_cny,
                vm.quota_min2,
                vm.quota_max2,
                vm.value_buy
              );
            }
            //							}
            //							else{
            //								mui.alert('交易方式不可一致！')
            //							}
          } else {
            // mui.alert("请填写完整！");
            vm.open("请填写完整！");
          }
        }
        //					}
      }
    },
    //单种出售交易方式
    oneSell(area, num, deal, price, min, max, cointype1) {
      let vm = this;
      if (Number(min) > Number(max)) {
        mui.alert("最低限额不得大于最高限额！");
      } else {
        //					if(deal!='CNY'){
        $.ajax({
          type: "post",
          url: contextPath + "/api/push/deal/sellTTCOrder",
          async: true,
          dataType: "json",
          data: {
            languageType: localStorage.otc_lang || "zh",
            token: localStorage.otc_token,
            region: area, //国家
            dealNum: num, //数量
            //	        DigiccyPayType: deal, //支付类型
            currencyType: cointype1, //类型
            CNYunitPrice: price, //银行单价
            CNYminQuota: min, //银行最小
            CNYmaxQuota: max, //银行最大
            isPhone: vm.sms,
            dealClaus: $("#textareas").val()
          },
          success(data) {
            if (data.state.code === "20000") {
              vm.btn_send = true;
              mui.toast("发布成功！");
              vm.$router.push({
                path: "/advertisingManagement"
              });
            }
          }
        });
        //					}else{
        //						$.ajax({
        //							type:"post",
        //							url: contextPath+"/api/push/deal/sellTTCOrder",
        //							async:true,
        //							dataType: "json",
        //							data:{
        //								languageType: localStorage.otc_lang || "zh",
        //								token:localStorage.otc_token,
        //								region:area, 							//国家
        //								dealNum:num,  							//数量
        //								CNYunitPrice:price, 					//银行单价
        //								CNYminQuota:min,  					//银行最小
        //								CNYmaxQuota:max,  					//银行最大
        //								currencyType:'TTC', 						//类型
        //								isPhone:vm.sms,
        //								dealClaus:$('#textareas').val()
        //							},
        //							success(data){
        //								if(data.state.code==='20000'){
        //									mui.toast('发布成功！')
        //									vm.$router.push({
        //										path:'/advertisingManagement'
        //									})
        //								}
        //							}
        //						});
        //					}
      }
    },
    //多种出售交易方式
    towSell(
      area,
      num,
      deal,
      price1,
      min1,
      max1,
      price2,
      min2,
      max2,
      cointype2
    ) {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/deal/sellTTCOrder",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.otc_lang || "zh",
          token: localStorage.otc_token,
          region: area, //国家
          dealNum: num, //数量
          DigiccyPayType: deal, //支付类型
          DigiccyunitPrice: price1, //数字单价
          DigiccyMinQuota: min1, //数字最小
          DigiccyMaxQuota: max1, //数字最大
          currencyType: cointype2, //类型
          CNYunitPrice: price2, //银行单价
          CNYminQuota: min2, //银行最小
          CNYmaxQuota: max2, //银行最大
          isPhone: vm.sms,
          dealClaus: $("#textareas").val()
        },
        success(data) {
          if (data.state.code === "20000") {
            vm.btn_send = true;
            mui.toast("发布成功！");
            vm.$router.push({
              path: "/advertisingManagement"
            });
          }
        }
      });
    },
    //单种购买方式
    oneBuy(area, num, deal, price, min, max, cointype2) {
      let vm = this;
      //				if(deal!='CNY'){
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/deal/obtainTTCOrder",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.otc_lang || "zh",
          token: localStorage.otc_token,
          region: area, //国家
          dealNum: num, //数量
          //	        DigiccyPayType: deal, //支付类型
          currencyType: cointype2, //类型
          CNYunitPrice: price, //银行单价
          CNYminQuota: min, //银行最小
          CNYmaxQuota: max, //银行最大
          isPhone: vm.sms,
          dealClaus: $("#textareas").val()
        },
        success(data) {
          if (data.state.code === "20000") {
            vm.btn_send = true;
            mui.toast("发布成功！");
            vm.$router.push({
              path: "/advertisingManagement"
            });
          }
        }
      });
      //				}else{
      //					$.ajax({
      //						type:"post",
      //						url: contextPath+"/api/push/deal/obtainTTCOrder",
      //						async:true,
      //						dataType: "json",
      //						data:{
      //							languageType: localStorage.otc_lang || "zh",
      //							token:localStorage.otc_token,
      //							region:area, 							//国家
      //							dealNum:num,  					//数量
      //							currencyType:'TTC', 							//类型
      //							CNYunitPrice:price, 			//银行单价
      //							CNYminQuota:min,  			//银行最小
      //							CNYmaxQuota:max,  			//银行最大
      //							isPhone:vm.sms,
      //							dealClaus:$('#textareas').val()
      //						},
      //						success(data){
      //							if(data.state.code==='20000'){
      //								mui.toast('发布成功！')
      //								vm.$router.push({
      //									path:'/advertisingManagement'
      //								})
      //							}
      //						}
      //					});
      //				}
    },
    towBuy(area, num, deal, price1, min1, max1, price2, min2, max2, cointype1) {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/deal/obtainTTCOrder",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.otc_lang || "zh",
          token: localStorage.otc_token,
          region: area, //国家
          dealNum: num, //数量
          DigiccyPayType: deal, //支付类型
          DigiccyunitPrice: price1, //数字单价
          DigiccyMinQuota: min1, //数字最小
          DigiccyMaxQuota: max1, //数字最大
          currencyType: cointype1, //类型
          CNYunitPrice: price2, //银行单价
          CNYminQuota: min2, //银行最小
          CNYmaxQuota: max2, //银行最大
          isPhone: vm.sms,
          dealClaus: $("#textareas").val()
        },
        success(data) {
          if (data.state.code === "20000") {
            vm.btn_send = true;
            mui.toast("发布成功！");
            vm.$router.push({
              path: "/advertisingManagement"
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.advertise {
  width: 100%;
  box-sizing: border-box;
  padding: 0.64rem 1.5rem 0.8rem 1.5rem;
  .title {
    font-size: 0.24rem;
    color: #282828;
    text-align: left;
    margin-bottom: 0.31rem;
  }
  .main {
    width: 100%;
    display: flex;
    .left {
      .basic {
        .basic_title {
          font-size: 0.2rem;
          margin-bottom: 0.15rem;
          text-align: left;
          padding-left: 0.2rem;
          color: #a3a3a3;
        }
        .basic_content {
          padding: 0.2rem;
          padding-top: 0;
          background: rgba(255, 255, 255, 1);
          border-radius: 0.06rem;
          box-shadow: 2px 0px 8px rgba(171, 171, 171, 1);
          text-align: left;
          display: flex;
          .basic_l {
            .l_text {
              width: 1.8rem;
              line-height: 0.7rem;
              font-size: 0.16rem;
              sup {
                color: #ff2b2b;
              }
            }
          }
          .basic_r {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .selects {
              margin-top: 0.1rem;
              display: flex;
              align-items: center;
              .el-radio {
                margin-right: 0.2rem;
              }
              .radios_l {
                margin-left: 0.2rem;
              }
            }
            .el-select {
              width: 130px;
            }
          }
        }
      }
      .deal {
        position: relative;
        .removemethods {
          top: 0.6rem;
          right: 0.4rem;
          position: absolute;
          display: flex;
          align-items: center;
          font-size: 0.14rem;
          color: #ff9d00;
          margin-top: 0.12rem;
          padding-left: 0.2rem;
          img {
            width: 0.2rem;
            height: 0.2rem;
            margin-right: 0.1rem;
            cursor: pointer;
          }
          span {
            cursor: pointer;
          }
        }
        .deal_title {
          font-size: 0.2rem;
          margin-bottom: 0.15rem;
          margin-top: 0.24rem;
          text-align: left;
          padding-left: 0.2rem;
          color: #a3a3a3;
        }
        .deal_content {
          padding: 0.2rem;
          padding-top: 0;
          background: rgba(255, 255, 255, 1);
          border-radius: 0.06rem;
          box-shadow: 2px 0px 8px rgba(171, 171, 171, 1);
          text-align: left;
          display: flex;
          .deal_l {
            .l_text {
              width: 1.8rem;
              line-height: 0.7rem;
              font-size: 0.16rem;
              sup {
                color: #ff2b2b;
              }
            }
          }
          .deal_r {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .el-select {
              width: 130px;
              margin-top: 0.15rem;
            }
            .price {
              position: relative;
              .inp {
                display: flex;
                .el-input {
                  flex: 1;
                }
                .unit {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 0.64rem;
                  font-size: 0.18rem;
                  color: #ffffff;
                  background: rgba(197, 197, 197, 1);
                  border-radius: 0px 6px 6px 0px;
                }
              }
              .price_show {
                font-size: 0.14rem;
                color: red;
              }
            }
            .quota {
              display: flex;
              .unit {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 0.64rem;
                background: rgba(197, 197, 197, 1);
                border-radius: 0px 6px 6px 0px;
                font-size: 0.18rem;
                color: #ffffff;
                padding: 0 0.1rem;
              }
              span {
                font-size: 0.2rem;
                margin: 0 0.1rem;
                line-height: 0.4rem;
              }
            }
          }
        }
      }
      .addmethods {
        display: flex;
        align-items: center;
        font-size: 0.14rem;
        color: #ff9d00;
        margin-top: 0.12rem;
        padding-left: 0.2rem;
        img {
          width: 0.2rem;
          height: 0.2rem;
          margin-right: 0.1rem;
          cursor: pointer;
        }
        span {
          cursor: pointer;
        }
      }
      .deal_cny {
        opacity: 1;
        margin-top: 0.24rem;
        .cnysele {
          display: flex;
          justify-content: space-between;
          .removemethods {
            display: flex;
            align-items: center;
            font-size: 0.14rem;
            color: #ff9d00;
            margin-top: 0.12rem;
            padding-left: 0.2rem;
            img {
              width: 0.2rem;
              height: 0.2rem;
              margin-right: 0.1rem;
              cursor: pointer;
            }
            span {
              cursor: pointer;
            }
          }
        }
      }
      .else {
        .else_title {
          font-size: 0.2rem;
          margin-bottom: 0.15rem;
          margin-top: 0.24rem;
          text-align: left;
          padding-left: 0.2rem;
          color: #a3a3a3;
        }
        .else_content {
          padding: 0.2rem;
          background: rgba(255, 255, 255, 1);
          border-radius: 0.06rem;
          box-shadow: 2px 0px 8px rgba(171, 171, 171, 1);
          text-align: left;
          display: flex;
          .else_l {
            .l_text {
              padding-left: 0.1rem;
              width: 1.8rem;
              font-size: 0.16rem;
            }
            .l_text1 {
              margin-top: 1.55rem;
            }
          }
          .else_r {
            flex: 1;
            display: flex;
            flex-direction: column;
            #textareas {
              width: 100%;
              box-sizing: border-box;
              padding: 0.15rem;
              height: 1.57rem;
              background: rgba(243, 243, 243, 1);
              border-radius: 0.06rem;
              color: #afafaf;
              resize: none;
              margin-bottom: 0.2rem;
            }
            .sms {
              font-size: 0.1rem;
              color: #999999;
              padding-left: 0.25rem;
              margin-bottom: 0.2rem;
            }
          }
        }
      }
      .send {
        cursor: pointer;
        margin-top: 0.36rem;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.24rem;
        color: #ffffff;
        background: rgba(67, 203, 131, 1);
        border-radius: 0.06rem;
        box-shadow: 4px 0px 8px rgba(33, 163, 94, 0.38);
      }
    }
    .right {
      height: fit-content;
      width: 5.38rem;
      margin-left: 1.06rem;
      margin-top: 0.45rem;
      box-sizing: border-box;
      padding: 0.28rem 0.2rem 0.5rem 0.2rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.06rem;
      box-shadow: 2px 0px 8px rgba(171, 171, 171, 1);
      .r_title {
        text-align: left;
        font-size: 0.24rem;
        color: #282828;
        margin-bottom: 0.5rem;
      }
      li {
        list-style: decimal;
        font-size: 0.18rem;
        color: #999999;
        text-align: left;
        line-height: 0.4rem;
      }
    }
  }
  .boxpopup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    .popup {
      // width: 7.28rem;
      /*height: 6rem;*/
      padding: 0.3rem 0;
      background-color: rgb(255, 255, 255);
      border-radius: 6px;
      .poptitle {
        box-sizing: border-box;
        padding-left: 0.2rem;
        text-align: left;
        font-size: 0.26rem;
        // color: red;
        color: #282828;
        // margin-top: 0.2rem;
        // margin-bottom: -0.3rem;
      }
      .name {
        width: 5.75rem;
        height: 0.48rem;
        // margin: 0 auto;
        margin-left: 0.2rem;
        // margin-bottom: 0.3rem;
        margin-top: 0.2rem;
        // display: flex;
        // align-items: center;
        .text {
          // width: 0.7rem;
          text-align: left;
          font-size: 0.16rem;
          // color: rgb(106, 177, 239);
          color: #282828;
          margin-right: 0.2rem;
          display: block;
          margin-bottom: 0.2rem;
        }
        .right {
          .inp {
            float: left;
            width: 5.5rem;
            height: 0.48rem;
            box-sizing: border-box;
            border: 1px solid rgb(219, 219, 219);
            border-radius: 6px;
            margin-bottom: 0.1rem;
            padding: 0 0.2rem;
            font-size: 0.18rem;
            color: rgb(102, 102, 102);
          }
        }
      }
      .names {
        // margin-top: 1rem;
        // overflow: hidden;
        .right {
          // display: flex;
          // flex-direction: column;
          // margin-bottom: 0.5rem;
        }
      }
      .popup_btn {
        // margin-top: 0.7rem;
        // width: 100%;
        display: flex;
        overflow: hidden;
        box-sizing: border-box;
        float: right;
        margin-right: 0.2rem;
        // padding-left: 1.85rem;
        .popup_cancel {
          width: 0.8rem;
          height: 0.4rem;
          border: none;
          border-radius: 2px;
          padding: 0;
          font-size: 0.2rem;
          color: #999;
          // background-color: rgb(202, 202, 202);
          margin-right: 0.2rem;
          margin-top: 0.2rem;
          cursor: pointer;
          border: 1px solid #999;
        }
        .popup_submit {
          width: 0.8rem;
          height: 0.4rem;
          border: none;
          border-radius: 2px;
          padding: 0;
          font-size: 0.2rem;
          color: rgb(255, 255, 255);
          background-color: #409EFF;
          margin-top: 0.2rem;
          cursor: pointer;
          // border: 2px solid #000;
        }
      }
    }
  }
}
</style>