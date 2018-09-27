<template>
	<div class="context">
		<div class="inputs">
			<img class="icon" src="../../../static/mailbox.png" v-if="email"/>
			<img class="icon" src="../../../static/email_b.png" v-if="email1"/>
			<input type="text" id="emailAddress" placeholder="请输入您的邮箱地址" @focus="emailimg" @blur="emailimgf"/>
		</div>
		<div class="inputs">
			<img class="icon" src="../../../static/password.png" v-if="psd" />
			<img class="icon" src="../../../static/psd_b.png" v-if="psd1"/>
			<input type="password" placeholder="请输入您的密码" id="pwd" @focus="psdimg" @blur="psdimgf"/>
		</div>
		<!--<div class="inputs">
			<img class="icon" src="../../../static/address.png" v-if="locationimg"/>
			<img class="icon" src="../../../static/location_b.png" v-if="locationimg1"/>
			<input type="text" placeholder="请绑定您的BIDT地址" id="TTCsite" class="validation" @focus="location_img" @blur="location_imgf"/>
		</div>-->
		<div class="inputs">
			<img class="icon" src="../../../static/verification code.png" v-if="code_img"/>
			<img class="icon" src="../../../static/code_b.png" v-if="code_img1"/>
			<input type="text" placeholder="请输入验证码" id="code" class="validation" @focus="codeimg" @blur="codeimgf"/>
			<button class="btn_send" id="btn_send" @click="sendCode">发送验证码</button>
		</div>
		<div class="read">
			<input type="checkbox" id="readinp" @change=""/>
			<span class="sp1">阅读并同意</span>
			<a href="http://123.207.158.196:8090/pictures/1f5686b3-75b9-4ed1-a94d-fe87d30972dc.pdf" target="_blank" class="sp2">《OTC用户服务协议》</a>
		</div>
		<button class="btn_login" @click="registFun">注册</button>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				code: "",
				toClick: true,
				email:true,
				email1:false,
				psd:true,
				psd1:false,
				locationimg:true,
				locationimg1:false,
				code_img:true,
				code_img1:false
			}
		},
		methods: {
			verification:function(bakFun){
				if(true){
					bakFun();
				}
			},
			sendCode: function() {
				let vm = this;
				if(vm.toClick) {
					$.ajax({
						url: contextPath + "/api/push/reg/code",
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
							},1000)
						}
					})
				} else {
					mui.toast("30s内请勿重复发送验证码");
				}
			},
			registFun: function() {
				let vm = this;
				vm.verification(function(){
					$.ajax({
					url: contextPath + "/api/push/reg/userReg",
					type: "post",
					async: true,
					dataType: "json",
					data: {
						languageType: localStorage.coinlang || "zh",
						account: $("#emailAddress").val(),
						code: $("#code").val(),
						pwd: $("#pwd").val()
					},
					success: function(data) {
						mui.toast('注册成功！')
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
			psdimg(){
				this.psd=false;
				this.psd1=true;
			},
			psdimgf(){
				this.psd=true;
				this.psd1=false;
			},
			location_img(){
				this.locationimg=false;
				this.locationimg1=true;
			},
			location_imgf(){
				this.locationimg=true;
				this.locationimg1=false;
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
	.context {
		.inputs {
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
			input {
				border: none;
				width: 3.9rem;
				font-size: 0.17rem;
			}
			.validation {
				width: 2.3rem;
			}
			.btn_send {
				width: 1.46rem;
				height: 0.4rem;
				background:#f1f1f1;
				color: #818181;
				border: none;
				font-size: 0.12rem;
				cursor: pointer;
				border-radius: 0.06rem;
			}
		}
		.read{
			text-align: left;
			box-sizing: border-box;
			padding-left: 0.4rem;
			font-size: 0.18rem;
			margin-top: 0.2rem;
			input{
				height: 0.2rem;
				height: 0.2rem;
				margin-top: -0.03rem;
				-webkit-appearance: checkbox !important;
				cursor: pointer;
			}
			.sp2:hover{
				color: #60b5f0;
				cursor: pointer;
			}
		}
		.btn_login {
			width: 2.3rem;
			height: 0.62rem;
			border: none;
			border-radius: 10px;
			color: white;
			font-size: 0.28rem;
			background: #60b5f0;
			margin-top: 0.7rem;
			cursor: pointer;
		}
	}
</style>