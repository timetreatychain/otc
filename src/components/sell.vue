<template>
	<div class="sell">
		<div class="title_div">
			<div class="text">{{$t('sell.title')}}：</div>
			<!-- <div class="bidt">BIDT</div> -->
			<el-select v-model="value_sell" clearable placeholder="全部" @change="change_message">
                  <el-option v-for="item in options_sell" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
		</div>
		<div class="main">
			<div class="main_title">
				<div class="who">{{$t('sell.list_title[0]')}}</div>
				<!-- <div class="currency">{{$t('sell.list_title[1]')}}</div> -->
				<div class="number">{{$t('sell.list_title[2]')}}</div>
				<div class="method">{{$t('sell.list_title[3]')}}</div>
				<div class="quota">{{$t('sell.list_title[4]')}}</div>
				<div class="price">{{$t('sell.list_title[5]')}}</div>
			</div>
			<div class="main_list" v-for="item in list">
				<!--名字-->
				<div class="who">{{item.userName}}</div>
				<!--币种-->
				<!-- <div class="currency">{{item.currencyType}}</div> -->
				<!--数量-->
				<div class="number">{{toDecimal(item.usableDealNum)}}</div>
				<!--支付方式-->
				<div class="method" v-if="item.list.length==1">
					<div>{{payType[item.list[0].payType]}}</div>
				</div>
				<div class="method" v-if="item.list.length==2">
					<div v-if="item.list[0].payType==='4'">CNY</div>
					<div v-if="item.list[1].payType==='4'">CNY</div>
					<div v-if="item.list[0].payType!='4'">{{payType[item.list[0].payType]}}</div>
					<div v-if="item.list[1].payType!='4'">{{payType[item.list[1].payType]}}</div>
				</div>
				<!--限额-->
				<div class="quota" v-if="item.list.length==1">
					<div>{{item.list[0].minQuota}}-{{item.list[0].maxQuota}} <span>{{payType[item.list[0].payType]}}</span></div>
				</div>
				<div class="quota" v-if="item.list.length==2">
					<div>{{item.list[0].minQuota}}-{{item.list[0].maxQuota}} <span>{{payType[item.list[0].payType]}}</span></div>
					<div>{{item.list[1].minQuota}}-{{item.list[1].maxQuota}} <span>{{payType[item.list[1].payType]}}</span></div>
				</div>
				<!--单价-->
				<div class="price" v-if="item.list.length==1">
					<div>{{item.list[0].unitPrice}} <span>{{payType[item.list[0].payType]}}</span></div>
				</div>
				<div class="price" v-if="item.list.length==2">
					<div>{{item.list[0].unitPrice}} <span>{{payType[item.list[0].payType]}}</span></div>
					<div>{{item.list[1].unitPrice}} <span>{{payType[item.list[1].payType]}}</span></div>
				</div>
				<!--btn-->
				<div class="btn" @click="tosell(item.uId,item.list[0].payType)">{{$t('sell.list_title[6]')}}{{item.currencyType}}</div>
			</div>
		</div>
		<el-pagination background layout="prev, pager, next" :current-page="currentPage4" :total="count" :page-size=10 @current-change="getpage"></el-pagination>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				currentPage4: 1,
				payType: ["", "BIDT", "BTC", "ETH","CNY"],
				payType1:0,
				value_sell:"",
				count:1,
				list:'',
				options_sell: [
					{
          value: "全部",
          label: "全部"
        },
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
			}
		},
		created(){
			this.getpage(1,10)
		},
		methods:{
			open() {
        this.$alert('交易前请先设置收款账号或者收币地址', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            // this.$message({
            //   type: 'info',
            //   message: `action: ${ action }`
            // });
          }
        });
      },
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
			change_message() {
				if (this.value_sell === "BIDT") {
					this.currentPage4 = 1;
					this.payType1 = 1;
					this.getlist (1,10);
          
        } else if (this.value_sell === "BTC") {
					this.currentPage4 = 1;
					this.payType1 = 2;
					this.getlist (1,10);
          
        } else if (this.value_sell === "ETH") {
					this.currentPage4 = 1;
					this.payType1 =3;
					this.getlist (1,10);
          
        } else if (this.value_sell === "USDT") {
					this.currentPage4 = 1;
					this.payType1 = 4;
					this.getlist (1,10);
          
				}else if (this.value_sell === "全部") {
					this.currentPage4 = 1;
					this.payType1 = 0;
					this.getlist (1,10);
        }
			},
			//获取用户筛选列表
			getlist0(page,row){
				let vm = this;
				$.ajax({
					url: contextPath + "/api/push/common/getSellOrder",
					type: "post",
					async: true,
					dataType: "json",
					data: {
						languageType: localStorage.otc_lang || "zh",
						page,
						row,
						userType:0,
						payType: 0,
						region:0,
						currencyType: vm.payType1,
						dealType:0
					},
					success(data){
						vm.list = data.data.data;
						vm.count = data.data.count;
					}
				})
			},
			getpage(arg){
				this.currentPage4 = arg;
				this.getlist(arg,10)
			},
			//获取列表
			getlist(page,row){
			// 	if(!localStorage.otc_token) {
			// 	this.$router.push("/login");
			// 	return;
      // }
				let vm = this;
				$.ajax({
					url: contextPath + "/api/push/common/getSellOrder",
					type: "post",
					async: true,
					dataType: "json",
					data: {
						languageType: localStorage.otc_lang || "zh",
						page,
						row,
						userType:0,
						payType:0,
						region:0,
						currencyType:vm.payType1,
						dealType:0
					},
					success(data){
						vm.list = data.data.data;
						vm.count = data.data.count;
					}
				})
			},
			//出售给他
			tosell(id,type){
				let vm=this;
				if (!localStorage.otc_token) {
        this.$router.push("/login");
        return;
      }
				if(localStorage.push_login_state==='1'){
					$.ajax({
						type:"post",
						url:contextPath+"/api/user/getUserAddress",
						async:true,
						dataType:'json',
						data:{
							token:localStorage.otc_token,
							languageType:localStorage.otc_lang
						},
						success(res){
							if(vm.payType[type]==='BTC'){
								if(res.data.btcaddress!=''&&res.data.btcaddress!=null){
									vm.$router.push({
										path:'/sellhim',
										query:{id}
									})
								}else{
									vm.open();
									// mui.alert('请前往个人中心设置收款地址')
									vm.$router.push({
                  path: "/usercenter",
                  query: { type: 3 }
                });
								}
							}
							if(vm.payType[type]==='ETH'){
								if(res.data.ethaddress!=''&&res.data.ethaddress!=null){
									vm.$router.push({
										path:'/sellhim',
										query:{id}
									})
								}else{
									vm.open();
									// mui.alert('请前往个人中心设置收款地址')
									vm.$router.push({
                  path: "/usercenter",
                  query: { type: 3 }
                });
								}
							}
							if(vm.payType[type]==='CNY'){
								if(res.data.cnyaddress!=''&&res.data.cnyaddress!=null){
									vm.$router.push({
										path:'/sellhim',
										query:{id}
									})
								}else{
									vm.open();
									// mui.alert('请前往个人中心设置收款地址')
									vm.$router.push({
                  path: "/usercenter",
                  query: { type: 3 }
                });
								}
							}
						}
					});
				}else{
					this.$router.push({
						path:'/login'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sell{
		width: 100%;
		box-sizing: border-box;
		padding:0.64rem 1.5rem 1rem 1.5rem;
		min-height: 10rem;
		.title_div{
			width: 100%;
			display: flex;
			align-items: center;
			.text{
				font-size: 0.26rem;
				color:rgba(40,40,40,1);
			}
			.bidt{
				width:0.7rem;
				height:0.34rem;
				line-height: 0.34rem;
				background:rgba(68,158,212,1);
				border-radius:0.1rem;
				color: white;
				font-size: 0.2rem;
				margin-left: 0.2rem;
			}
		}
		.main{
			width: 100%;
			margin-top: 0.39rem;
			.main_title{
				width: 100%;
				height: 0.78rem;
				box-sizing: border-box;
				padding: 0 0.2rem;
				margin-bottom: 0.12rem;
				display: flex;
				align-items: center;
				font-size: 0.18rem;
				border-radius:0.06rem;
				box-shadow:2px 0px 8px rgba(171,171,171,1);
				.who{
					width: 10%;
					text-align: left;
				}
				.currency{
					width: 10%;
					text-align: center;
				}
				.number{
					width: 15%;
					text-align: center;
				}
				.method{
					width: 20%;
					text-align: center;
				}
				.quota{
					// width: 15%;
					width: 18%;
					text-align: center;
				}
				.price{
					// width: 24%;
					width: 24%;
				}
			}
			.main_list{
				width: 100%;
				box-sizing: border-box;
				padding: 0.27rem 0.2rem 0.27rem 0.2rem;
				border-radius:0.06rem;
				box-shadow:2px 0px 8px rgba(171,171,171,1);
				display: flex;
				align-items: center;
				font-size: 0.18rem;
				margin-bottom: 0.15rem;
				.who{
					width: 10%;
					text-align: left;
					color: #666666;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.currency{
					width: 11%;
					text-align: center;
					color: #282828;
				}
				.number{
					// width: 12%;
					width: 15%;
					text-align: center;
					color: #666666;
				}
				.method{
					text-align: center;
					width: 20%;
					color: #666666;
				}
				.quota{
					width: 20%;
					text-align: center;
					color: #666666;
				}
				.price{
					width: 20%;
					text-align: center;
					cursor: #282828;
				}
				.btn{
					width:1.5rem;
					height:0.42rem;
					text-align: center;
					line-height: 0.42rem;
					background:rgba(68,158,212,1);
					border-radius:0.06rem;
					color: white;
					font-size: 0.2rem;
					cursor: pointer;
					float: right;
				}
			}
			.main_list:hover{
				background:rgba(225,241,251,1);
			}
		}
		.el-pagination{
			height: 0;
			margin-top: 0.7rem;
		}
	}
</style>