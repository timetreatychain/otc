<template>
	<div class="findpsd">
		<div class="content">
			<div class="title">忘记密码</div>
			<div class="inputs">
				<img class="icon" src="../../../static/mailbox.png" v-if="email"/>
				<img class="icon" src="../../../static/email_b.png" v-if="email1"/>
				<input type="text" placeholder="请输入您邮箱账号" id="emailAddress" @focus="emailimg" @blur="emailimgf"/>
			</div>
			<div class="inputs">
				<img class="icon" src="../../../static/password.png" v-if="psd"/>
				<img class="icon" src="../../../static/psd_b.png" v-if="psd1"/>
				<input type="password" placeholder="请输入您新密码" id="pwd1" @focus="psd1img" @blur="psd1imgf"/>
			</div>
			<div class="inputs">
				<img class="icon" src="../../../static/password.png" v-if="psd2"/>
				<img class="icon" src="../../../static/psd_b.png" v-if="psd2f"/>
				<input type="password" placeholder="请确认您的新密码" id="pwd2" @focus="psd2img" @blur="psd2imgf"/>
			</div>
			<div class="inputs">
				<img class="icon" src="../../../static/verification code.png" v-if="code_img"/>
				<img class="icon" src="../../../static/code_b.png" v-if="code_img1"/>
				<input type="text" placeholder="请输入验证码" class="validation" id="code" @focus="codeimg" @blur="codeimgf"/>
				<button class="btn_send" id="btn_send" @click="sendCode">发送验证码</button>
			</div>
			<router-link to="/login" class="text">立即登录</router-link>
			<button class="btn_login"  @click="resetPwd">重置密码</button>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				code:"",
				toClick:true,
				email:true,
				email1:false,
				psd:true,
				psd1:false,
				psd2:true,
				psd2f:false,
				code_img:true,
				code_img1:false
			}
		},
		methods: {
			verification:function(bakFun){
				if($("#pwd1").val()==$("#pwd2").val()){
					bakFun();
				}else{
					mui.alert("输入信息有误")
				}
			},
			sendCode: function() {
				let vm = this;
				if(vm.toClick) {
					$.ajax({
						url: contextPath + "/api/push/reg/findPwdVerficode",
						type: "post",
						async: true,
						dataType: "json",
						data: {
							languageType: localStorage.coinlang || "zh",
							account: $("#emailAddress").val()
						},
						success: function(data) {
							$("#btn_send").html("已发送")
							mui.toast("发送成功");
							vm.toClick = false;
							let countNum=60;
							var myVar=setInterval(function() {
							 	if(countNum>0){
							 		$("#btn_send").html(countNum+"S")
							 	}else{
							 		clearInterval(myVar);
							 		vm.toClick = true;
							 		$("#btn_send").html("发送验证码")
							 	}
							 	countNum--;
							}, 1000)
						}
					})
				} else {
					mui.toast("30s内请勿重复发送验证码");
				}

			},
			resetPwd: function() {
				let vm = this;
				vm.verification(function(){
					$.ajax({
					url: contextPath + "/api/push/reg/updatePwdByAccount",
					type: "post",
					async: true,
					dataType: "json",
					data: {
						languageType: localStorage.coinlang || "zh",
						account: $("#emailAddress").val(),
						code: $("#code").val(),
						pwd: $("#pwd1").val()
					},
					success: function(data) {
						localStorage.push_login_state = 1;
						localStorage.push_token = data.data.token;
						vm.$router.push({
							path: "/login"
						});
					}
				})
				})
			},
			emailimg(){
				this.email=false;
				this.email1=true;
			},
			emailimgf(){
				this.email=true;
				this.email1=false;
			},
			psd1img(){
				this.psd=false;
				this.psd1=true;
			},
			psd1imgf(){
				this.psd=true;
				this.psd1=false;
			},
			psd2img(){
				this.psd2=false;
				this.psd2f=true;
			},
			psd2imgf(){
				this.psd2=true;
				this.psd2f=false;
			},
			codeimg(){
				this.code_img=false;
				this.code_img1=true;
			},
			codeimgf(){
				this.code_img=true;
				this.code_img1=false;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.findpsd{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
		background:  url(../../../static/login.png) no-repeat;
		background-size: 100% 100%;
		.content{
			width: 5.36rem;
			height: 7rem;
			box-sizing: border-box;
			border: 1px solid darkgray;
			border-radius:10px;
			float: right;
			margin:1.37rem 1.6rem 0 0;
		}
		.title{
			height: 0.8rem;
			line-height: 0.8rem;
			width: 100%;
			text-align: center;
			font-size: 0.25rem;
			box-sizing: border-box;
			border-bottom:1px solid darkgray;
			color: #60b5f0;
		}
		.inputs{
			margin: 0 auto;
			margin-top: 0.45rem;
			width: 4.6rem;
			height: 0.6rem;
			font-size: 0.24rem;
			box-sizing: border-box;
			border: 1px solid darkgray;
			border-radius: 5px;
			padding-left: 0.25rem;
			text-align: left;
			vertical-align: middle;
			.icon{
				width: 0.24rem;
				/*height: 0.22rem;*/
				position: relative;
				top: 0.04rem;
			}			
			input{
				border: none;
				width: 3.9rem;
				font-size: 0.17rem;
			}
			.validation{
				width: 2.3rem;
			}
			.btn_send{
				width: 1.46rem;
				height: 0.4rem;
				background: #f1f1f1;
				color: #818181;
				border: none;
				border-radius: 5px;
				font-size: 0.12rem;
				cursor: pointer;
			}
		}
		.btn_login{
			display: block;
			width: 2.3rem;
			height: 0.62rem;
			margin: 0 auto;
			line-height: 0.62rem;
			border-radius: 10px;
			color: white;
			font-size: 0.28rem;
			background: #60b5f0;
			margin-top:0.6rem;
			border: none;
			cursor: pointer;
		}
		.text{
			padding: 0;
			color: darkgray;
			display: block;
			width: 4.9rem;
			text-align: right;
			margin-top: 0.2rem ;
			font-size: 0.18rem;
		}
	}
</style>