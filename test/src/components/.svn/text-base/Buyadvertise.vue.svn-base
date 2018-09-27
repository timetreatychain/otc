<template>
	<!--购买 广告-->
	<div class="Buyadvertise">
		<div class="line">
			<div class="blue">已下单</div>
			<img src="../../static/line.png"/>
			<div class="red">{{left_state}}</div>
		</div>
		<div class="main">
			<div class="title">
				<div class="name">您发布购买 {{datas.currencyType}} 的交易广告<span>{{datas.customer}}</span>已向您下单成功！</div>
				<div class="time">{{datas.createTime}}</div>
			</div>
			<div class="list">
				<div class="list_title">
					<div class="t1 tt1">购买币种</div>
					<div class="t1">购买数量</div>
					<div class="t2">单价</div>
					<div class="t1">付款方式</div>
					<div class="t2">付款金额</div>
					<div class="t2">订单状态</div>
				</div>
				<div class="list_content">
					<div class="t1">{{datas.currencyType}}</div>
					<div class="t1">{{datas.bidt}}</div>
					<div class="t2">{{datas.unitPrice}} {{payType[datas.type]}}</div>
					<div class="t1">{{payType[datas.type]}}</div>
					<div class="t2">{{datas.price}} {{payType[datas.type]}}</div>
					<div class="t2">{{orderstatus[datas.orderStatus]}}</div>
				</div>
				<div class="list_num" v-if="status==='1'||status==='2'">
					待付款：{{datas.price}} {{payType[datas.type]}}
				</div>
				<div class="list_num" v-if="status==='3'||status==='4'">
					已付款：{{datas.price}} {{payType[datas.type]}}
				</div>
				<div class="list_num" v-if="status==='0'||status==='5'">
					<s>待付款：{{datas.price}} {{payType[datas.type]}}</s>
				</div>
			</div>
			<div class="message">
				<div class="message_title">对方收款账号或收币地址请向对方确认</div>
				<!--蛋生支付-->
				<div class="eggzf" v-if="datas.projectType!=0">
					<div class="zfb" v-if="datas.eggOrderDetails.payType!='2'">
						<img src="../../static/zfbimg.png" class="main_img"/>
						<div class="info">
							<div class="egg_name">{{datas.eggOrderDetails.number}}</div>
						</div>
						<div class="egg_code">
							<img :src="datas.eggOrderDetails.picUrl" class="min_code"/>
							<img :src="datas.eggOrderDetails.picUrl" class="max_code"/>
						</div>
					</div>
					<div class="zfb" v-if="datas.eggOrderDetails.payType!='1'">
						<img src="../../static/wximg.png" class="main_img"/>
						<div class="info">
							<div class="egg_name">{{datas.eggOrderDetails.number}}</div>
						</div>
						<div class="egg_code">
							<img :src="datas.eggOrderDetails.picUrl" class="min_code"/>
							<img :src="datas.eggOrderDetails.picUrl" class="max_code"/>
						</div>
					</div>
				</div>
				<!--货币支付-->
				<div class="hbzf" v-if="datas.projectType!=1">
					<div class="cnyzf" v-if="payType[datas.type]==='CNY'">
						<img src="../../static/cnyimg.png" class="main_img"/>
						<div class="info">
							<div class="egg_name">{{datas.userAddressVo.bankName}} {{datas.userAddressVo.cnyuserName}}</div>
							<div class="egg_name">{{datas.userAddressVo.cnyaddress}}</div>
						</div>
					</div>
					<div class="bbzf" v-if="payType[datas.type]!='CNY' && payType[datas.type]==='BTC'">
						收币地址：{{datas.userAddressVo.btcaddress}}
					</div>
					<div class="bbzf" v-if="payType[datas.type]!='CNY' && payType[datas.type]==='ETH'">
						收币地址：{{datas.userAddressVo.ethaddress}}
					</div>
					<div class="bbzf" v-if="payType[datas.type]!='CNY' && payType[datas.type]==='USDT'">
						收币地址：{{datas.userAddressVo.cnyaddress}}
					</div>
					<div class="bbzf" v-if="payType[datas.type]!='CNY' &&  payType[datas.type]==='BIDT'">
						收币地址：{{datas.userAddressVo.bidtaddress}}
					</div>
				</div>
				<div class="message_title">联系对方</div>
				<div class="message_content">
					<div class="messcon_title">您可以在这开始与卖家交流了！</div>
					<div class="message_main">
						<!--<div class="l_message">
							<img src="../../static/head.png"/>
							<div class="r">
								<div class="name_time">tom 2018-7-20 19:15:50</div>
								<div class="texts">你好，请尽快付款</div>
							</div>
						</div>
						<div class="r_message">
							<div class="r">
								<div class="name_time">tom 2018-7-20 19:15:50</div>
								<div class="texts">你好，请尽快付款</div>
							</div>
							<img src="../../static/head.png"/>
						</div>-->
						<div v-for="item in message" :class="item.userId==uid?'r_message':'l_message'">
							<img :src="item.urlPic" v-if="item.userId!=uid"/>
							<div class="r">
								<div class="name_time">{{item.userNickName}} {{item.createTime}}</div>
								<div class="texts">{{item.content}}</div>
							</div>
							<img :src=item.urlPic v-if="item.userId==uid"/>
						</div>
					</div>
				</div>
				<div class="message_btn">
					<el-input
					  placeholder="发送消息联系对方~"
					  v-model="message_text"
						@keyup.enter.native="websopen"
					  clearable>
					</el-input>
					<div class="send_message" @click="websopen">发送消息</div>
				</div>
				<div class="statustxt">
					{{statustext}}
				</div>
				<!--等待买家确认收款-->
				<div class="state1" v-if="status==='1'">
					<div class="state1_text">请等待卖家向您发放货币！</div>
					<div class="state1_time">剩余时间<span>{{ordertitme}}</span>逾期将自动取消，请提醒卖家尽快支付！</div>
				</div>
				<!--确认收钱-->
				<div class="state1" v-if="status==='2'">
					<div class="state1_text">卖家已向您发放货币，请确认是否收到?</div>
					<div class="state1_time">若已收到，请在<span>{{ordertitme}}</span>内付款，并请点击【我已付款】</div>
					<div class="state1_send" @click="getb">我已付款</div>
				</div>
				<!-- 已过期1 -->
        <div class="state1" v-if="status ==5">
					<div class="state1_text">交易超时， 已取消</div>
					<div class="state1_tell" @click="wyss"><em>我要申诉</em></div>
				</div>
				<!--等待卖家-->
				<div class="state1" v-if="status==='3'">
					<div class="state1_text">您已操作付款，等待卖家确认！</div>
					<div class="state1_send" style="background: lightgray;">我已付款</div>
				</div>
				<div class="state1" v-if="status==='4'">
					<div class="state1_text">本次交易已完成，期待与您再次交易！</div>
					<div class="state1_tell" @click="wyss"><em>我要申诉</em></div>
					<div class="state1_send" @click="tobuy">前往购买</div>
				</div>
				<!--交易过期-->
				<div class="state1" v-if="status==='5'">
					<!-- <div class="state1_text">本次交易已过期，请重新前往购买别的吧！</div> -->
					<div class="state1_send" @click="tobuy">重新前往购买</div>
				</div>
			</div>
		</div>
		<el-dialog
  title="请使用微信扫描二维码添加客服，进行申诉"
  :visible.sync="centerDialogVisible"
  width="25%"
  center
	:show-close = false
	>
  <img class="img4" src="../../static/wyss.png" alt="">
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">X</el-button>
    <!-- <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button> -->
  </span>
</el-dialog>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				centerDialogVisible: false,
				orderstatus:['已取消','等待卖家发币','卖家已发币','等待卖家确认','交易完成','已过期'],
				payType: ["", "BIDT", "BTC", "ETH","CNY"],
				message_text:'',
				left_state:'待收币',
				statustext:'告知买家您是否已支付货币？？',
				radios:'0',
				datas:'',
				status:'',
				ws:'',
				message:'',
				uid:localStorage.otc_uId,
				ordertitme:null,
			djs: "",
			timer0 : ""
			}
		},
		created(){
			//获取状态
			this.getStatus()
			//获取聊天
			this.getmessage()
			//建立socket
			this.websocketopen()
			this.gettime ();
			// 轮询获取时间
			this.getNewTime ();
		},
		beforeDestroy () {
				clearInterval(this.timer0 )
			},
		methods:{
			getNewTime () {
				this.timer0 = setInterval(() => {
					this.getStatus();
					 this.gettime();
				} , 15000);
			},
			wyss () {
				this.centerDialogVisible = true;
      return;
       const h = this.$createElement;
        this.$msgbox({
          // title: '',
          message: h('p', null, [
            h('div', {style: 'text-align: center;marginBottom: 0.1rem;'}, '请使用微信扫描二维码添加客服，进行申诉 '),
            h('div', { style: 'background: url("../../static/wyss.png"); width: 2rem;height: 2rem; background-size: 100%; margin: 0 auto;' }, )
          ]),
          showConfirmButton: false,
          showCancelButton: true,
					cancelButtonText: 'X',
					center: true,
        }).then(action => {
          // this.$message({
          //   type: 'info',
          //   message: 'action: ' + action
          // });
        });
    },
			gettime() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/push/common/getOrderOverTime",
        async: true,
        dataType: "json",
        data: {
          id: vm.$route.query.id
        },
        success(res) {
          // vm.time2
          clearInterval(vm.djs);
          let time1 = new Date() - 0 ;
					let time2 = new Date(res.data) - 0;
					// let time3 = (new Date(res.data) - 0) + 1800000;
					console.log(time1);
					console.log(time2);
          vm.djs = setInterval(() => {
						 time1 = new Date() - 0 ;
						 if(time1 <= time2) {
							 	vm.ordertitme = vm.formatDuring(time2 - time1)
						 }else {
							 clearInterval(vm.djs);
							 vm.ordertitme = 0;
							 if(vm.status == 1) {
								 vm.status = "5";
							 }else if(vm.status == 2 || vm.status == 3) {
								 vm.status = "4"
							 }
						 }
					}, 100);
        }
      });
    },
    formatDuring(mss) {
      // var days = parseInt(mss / (1000 * 60 * 60 * 24));
      // var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = parseInt((mss % (1000 * 60)) / 1000);
      return this.checkTime(minutes) + ":" + this.checkTime(seconds) + "";
    },
    checkTime(i) {
      //将0-9的数字前面加上0，例1变为01
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
			getmessage(){
				let vm=this;
				$.ajax({
					type:"post",
					url:contextPath+"/api/push/common/getChatDiscipline",
					async:true,
					dataType:'json',
					data:{
						languageType: localStorage.otc_lang || "zh",
						token:localStorage.otc_token,
						orderId:vm.$route.query.id
					},
					success(res){
						vm.message=res.data;
					}
				});
			},
			websocketopen(){
				let vm=this;
				let url="ws:"+contextPath.replace('http://','//')+"/websocket/"+vm.$route.query.id+"";
				this.ws=new WebSocket(url);
				this.ws.onmessage=function(ev){
					vm.message.push(JSON.parse(ev.data))
				}
			},
			websopen(){
				let vm=this;
				this.ws.send(JSON.stringify(
					{'content':vm.message_text,'createTime':vm.getNowDate(),'userNickName':localStorage.otc_username,'userId':localStorage.otc_uId,'urlPic':localStorage.otc_headimg}
				))
				$.ajax({
					type:"post",
					url:contextPath+"/api/push/common/savePushChatRecord",
					async:true,
					dataType:'json',
					data:{
						languageType: localStorage.otc_lang || "zh",
						token:localStorage.otc_token,
						content:`${vm.message_text}`,
						groupInfoId:vm.$route.query.id
					},
					success(res){
						vm.message_text='';
					}
				});
			},
			gettime () {
				let vm = this;
				$.ajax({
					type:"post",
					url:contextPath+"/api/push/common/getOrderOverTime",
					async:true,
					dataType:'json',
					data:{
						id : vm.$route.query.id
					},
					success(res){
						// vm.time2 
						// vm.ordertitme = res.data.overdueTime;
						clearInterval(vm.djs);
          let time1 = new Date() - 0 ;
					let time2 = new Date(res.data.overdueTime) - 0;
					// let time3 = (new Date(res.data) - 0) + 1800000;
					console.log(time1);
					console.log(time2);
          vm.djs = setInterval(() => {
						 time1 = new Date() - 0 ;
						 if(time1 <= time2) {
							 	vm.ordertitme = vm.formatDuring(time2 - time1)
						 }else {
							 clearInterval(vm.djs);
							 vm.ordertitme = 0;
						 }
					}, 1000);
					}
				});
			},
			getNowDate() {
				var date = new Date();
				var sign1 = "-";
				var sign2 = ":";
				var year = date.getFullYear() 
				var month = date.getMonth() + 1
				var day  = date.getDate()
				var hour = date.getHours()
				var minutes = date.getMinutes()
				var seconds = date.getSeconds()
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
				var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " ";
				return currentdate;
			},
			//确认收币
			getb(){
				let vm=this;
				this.$confirm('您确认是否已收到商家的币?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
					$.ajax({
						type:"post",
						url:contextPath+"/api/push/deal/userAffirmTransaction",
						async:true,
						dataType:'json',
						data:{
							languageType: localStorage.otc_lang || "zh",
							token:localStorage.otc_token,
							cancelTransactionId:vm.$route.query.id
						},
						success(res){
							if(res.state.code==='20000'){
								vm.status=res.data;
								vm.getStatus();
								vm.gettime();
							}
						}
					});
		        }).catch(() => {
//			          this.$message({
//			            type: 'info',
//			            message: '放弃取消订单!'
//			          });          
		        });
			},
		    //前往购买
		    tobuy(){
		    	this.$router.push({
		    		path:'/buy'
		    	})
		    },
		    //获取状态
		    getStatus(){
		    	let vm=this;
				$.ajax({
					type:"post",
					url:contextPath+"/api/user/getOrderStatus",
					async:true,
					dataType:'json',
					data:{
						languageType: localStorage.otc_lang || "zh",
						token:localStorage.otc_token,
						orderId:vm.$route.query.id
					},
					success(res){
						vm.datas=res.data;
						vm.status=res.data.orderStatus;
						if(res.data.orderStatus==='0'){
							vm.left_state='已取消';
							vm.statustext='本次交易已取消';
						}
						if(res.data.orderStatus==='1'){
							vm.left_state='待收币';
							vm.statustext='等待卖家向您发币';
						}
						if(res.data.orderStatus==='2'){
							vm.left_state='待确认';
							vm.statustext='卖家已发币，请付款';
						}
						if(res.data.orderStatus==='3'){
							vm.left_state='待确认';
							vm.statustext='您已操作付款，等待卖家确认！';
						}
						if(res.data.orderStatus==='4'){
							vm.left_state='已完成';
							vm.statustext='本次交易已完成！';
						}
						if(res.data.orderStatus==='5'){
							vm.left_state='已过期';
							vm.statustext='本次交易已过期！';
						}
					}
				})
		    }
		}
	}
</script>
<style lang="scss">
  .el-message-box__btns {
  // text-align: center;
  // border-radius: 5px;
}
.el-message-box {
  // width: 300px;
  & /deep/ .el-button--small {
    // border-radius: 10px;
  }
}
</style>
<style lang="scss" scoped>
	.Buyadvertise{
		box-sizing: border-box;
		padding: 0.64rem 1.5rem 0.64rem 1rem;
		display: flex;
		align-items: center;
		& /deep/ .el-dialog__title {
			font-size: 0.2rem;
		}
		& /deep/ .el-dialog__body {
			padding: 0;
		}
		& /deep/  .el-dialog__header {
			padding: 0;
		}

 		& /deep/ .img4 {
			width: 30%;
			position: relative;
			left:50%;
			transform: translateX(-50%);
		}
		.line{
			margin-right: 0.2rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.blue{
				width: 0.74rem;
				height: 0.74rem;
				border-radius: 50%;
				font-size: 0.16rem;
				color: #FFFFFF;
				text-align: center;
				line-height: 0.74rem;
				background:rgba(106,177,239,1);
			}
			.red{
				@extend .blue;
				background:rgba(255,0,0,1);
			}
		}
		.main{
			flex: 1;
			.title{
				box-sizing: border-box;
				padding:0 0.2rem;
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				.name{
					font-size: 0.26rem;
					color: #282828;
					span{
						font-size: 0.24rem;
						color: #3399FF;
					}
				}
				.time{
					font-size: 0.18rem;
					color: #999999;
				}
			}
			.list{
				margin-top: 0.2rem;
				background:rgba(255,255,255,1);
				border-radius:0.06rem;
				box-shadow:2px 0px 8px rgba(171,171,171,1);
				.list_title{
					box-sizing: border-box;
					padding: 0 0.2rem;
					height: 0.4rem;
					line-height: 0.4rem;
					background:rgba(244,244,244,1);
					border-radius:0.06rem 0.06rem 0px 0px;
					box-shadow:2px 0px 8px rgba(171,171,171,1);
					display: flex;
					text-align: center;
					font-size: 0.2rem;
					.t1{
						width: 13.3%;
						color: #939393;
					}
					.t2{
						width: 20%;
						color: #939393;
					}
				}
				.list_content{
					@extend .list_title;
					box-shadow: none;
					background: none;
					height: 0.5rem;
					line-height: 0.5rem;
					border-bottom: 1px solid rgba(238,238,238,1);
					color: #282828;
				}
				.list_num{
					box-sizing: border-box;
					padding: 0.15rem 0.2rem;
					text-align: right;
					color: #FF6600;
					font-size: 0.2rem;
				}
			}
			.message{
				margin-top: 0.2rem;
				box-sizing: border-box;
				padding: 0.2rem;
				border-radius:0.06rem;
				box-shadow:2px 0px 8px rgba(171,171,171,1);
				.message_title{
					font-size: 0.18rem;
					color: #939393;
					text-align: left;
					margin-bottom: 0.2rem;
				}
				/*蛋生支付*/
				.eggzf{
					display: flex;
					height: 0.5rem;
					margin: 0.2rem 0;
					.zfb{
						margin-right: 0.5rem;
						height: 0.5rem;
						align-items: center;
						display: flex;
						.main_img{
							width: 0.5rem;
							height: 0.5rem;
						}
						.info{
							font-size: 0.14rem;
							margin: 0 0.2rem;
						}
						.egg_code{
							display: flex;
							align-items: center;
							height: 0.5rem;
							position: relative;
							.min_code{
								width: 0.25rem;
								height: 0.25rem;
							}
							.max_code{
								position: absolute;
								width: 2rem;
								height: 2rem;
								bottom: -2rem;
								display: none;
							}
						}
						.egg_code:hover{
							cursor: pointer;
							.max_code{
								display: block;
							}
						}
					}
				}
				/*货币支付*/
				.hbzf{
					margin: 0.2rem 0;
					display: flex;
					align-items: center;
					.cnyzf{
						display: flex;
						.main_img{
							width: 0.7rem;
							height: 0.5rem;
						}
						.info{
							text-align: left;
							font-size: 0.14rem;
							margin: 0 0.2rem;
						}
					}
					.bbzf{
						font-size: 0.16rem;
					}
				}
				.message_content{
					height: 3.5rem;
					box-sizing: border-box;
					box-sizing: border-box;
					padding: 0.2rem 0.4rem 0.4rem 0.4rem;
					background:rgba(246,246,246,1);
					display: flex;
					flex-direction: column;
					.messcon_title{
						font-size: 0.16rem;
						text-align: center;
						color: #939393;
						margin-bottom: 0.2rem;
					}
					.message_main{
						flex: 1;
						overflow: hidden;
						overflow-y: auto;
						.l_message{
							margin-bottom: 0.2rem;
							display: flex;
							img{
								width: 0.6rem;
								height: 0.6rem;
							}
							.r{
								width: 40%;
								.name_time{
									font-size: 0.14rem;
									color: #939393;
									padding-left: 0.2rem;
									margin-bottom: 0.1rem;
								}
								.texts{
									text-align: left;
									font-size: 0.16rem;
									color: #282828;
									box-sizing: border-box;
									padding: 0.1rem;
									padding-left: 0.4rem;
									background: url(../../static/message_l.png)no-repeat;
									background-size: 100% 100%;
								}
							}
						}
						.r_message{
							@extend .l_message;
							justify-content: flex-end;
							.r{
								.name_time{
									padding-right: 0.2rem;
								}
								.texts{
									background:url(../../static/message_r.png)no-repeat;
									background-size: 100% 100%;
								}
							}
						}
					}
				}
				.message_btn{
					display: flex;
					.send_message{
						width: 1.8rem;
						background:rgba(0,153,204,1);
						font-size: 0.2rem;
						color: white;
						display: flex;
						align-items: center;
						justify-content: center;
						cursor: pointer;
					}
				}
				.statustxt{
					font-size: 0.18rem;
					color: #939393;
					padding: 0.2rem 0 0.1rem 0;
					border-bottom: 1px solid rgba(238,238,238,1);
					text-align: left;
				}
				.state1{
					padding-top: 0.3rem;
					display: flex;
					flex-direction: column;
					align-items: center;
					.state1_time{
						color: #282828;
						font-size: 0.16rem;
						span{
							color: #3399FF;
						}
					}
					.state1_text{
						font-size: 0.16rem;
						color: #282828;
						margin-top: 0.05rem;
					}
					.state1_send{
						margin-top: 0.07rem;
						cursor: pointer;
						font-size: 0.16rem;
						color: white;
						width:3rem;
						height:0.38rem;
						line-height: 0.38rem;
						background:rgba(68,158,212,1);
						border-radius:0.06rem;
						box-shadow:4px 0px 8px rgba(28,109,157,0.38);
					}
					.el-button--text{
						@extend .state1_send;
						padding: 0;
						color: #939393;
						background:rgba(232,232,232,1);
						box-shadow:4px 0px 8px rgba(192,192,192,0.38);
						
					}
					.state1_tell{
						font-size: 0.12rem;
						color: #999999;
						margin-top: 0.05rem;
						em {
							font-style: normal;
							cursor: pointer;
							&:hover {
								color: rgba(68,158,212,1);
							}
						}
					}
					.radio_div{
						width: 4.5rem;
						display: flex;
						justify-content: space-between;
						margin-bottom: 0.1rem;
					}
					textarea{
						width:4.6rem;
						height:1.06rem;
						resize: none;
						box-sizing: border-box;
						padding: 0.14rem 0.2rem;
						color: #999999;
						font-size: 0.14rem;
						background:rgba(246,246,246,1);
						border-radius:0.06rem;						
					}
				}
			}
		}
	}
</style>