<template>
	<div class="context">
		<div class="inputs">
			<img class="icon" src="../../../static/mailbox.png" v-if="email"/>
			<img class="icon" src="../../../static/email_b.png" v-if="email1"/>
			<input type="text" placeholder="请输入您的邮箱/手机号" id="emailAddress" @focus="emailimg" @blur="emailimgf" v-model="otc_user"/>
		</div>
		<div class="inputs">
			<img class="icon" src="../../../static/password.png" v-if="psd"/>
			<img class="icon" src="../../../static/psd_b.png" v-if="psd1"/>
			<input type="password" placeholder="输入密码" id="pwd" @focus="psdimg" @blur="psdimgf"/>
		</div>
		<div class="inputs">
			<img class="icon" src="../../../static/verification code.png" v-if="code_img"/>
			<img class="icon" src="../../../static/code_b.png" v-if="code_img1"/>
			<input type="text" placeholder="请输入验证码" class="validation" id="input1" @focus="codeimg" @blur="codeimgf"/>
			<button class="btn_send" id="checkCode" @click="createCode">验证码</button>
		</div>
		<div class="rename">
			<div>
				<input type="checkbox" @change="checkboxinp" id="checkinp"/>
				<span>记住用户名</span>
			</div>
			<router-link to="findpassword" class="text">忘记密码</router-link>
		</div>
		<button class="btn_login" @click="loginFun">登录</button>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				code: "",
				email:true,
				email1:false,
				psd:true,
				psd1:false,
				code_img:true,
				code_img1:false,
				otc_user:localStorage.otc_user||''
			}
		},
		created(){
			let vm=this;
			var name = "otc_user" + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) {
				var c = ca[i].trim();
				if (c.indexOf(name)==0) { vm.otc_user=c.substring(name.length,c.length); }
			}
		},
		methods: {
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
			createCode: function() {
				let vm = this;
				vm.code = "";
				var codeLength = 4;
				var checkCode = document.getElementById("checkCode");
				var selectChar = new Array(2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y');
				for(var i = 0; i < codeLength; i++) {
					var charIndex = Math.floor(Math.random() * 29);
					vm.code += selectChar[charIndex];
				}
				if(checkCode) {
					$(checkCode).html(vm.code);
				}
			},
			validate: function(bakFun) {
				let vm = this;
				var inputCode = document.getElementById("input1").value;
				if(inputCode.length <= 0) {
					mui.alert("请输入验证码！");
				} else if( inputCode.toUpperCase() != vm.code) {
					mui.alert("验证码输入错误！");
					vm.createCode();
				} else {
					bakFun();
				}
			},
			loginFun: function() {
				let vm = this;
				vm.validate(function() {
					$.ajax({
						url: contextPath + "/api/push/reg/login",
						type: "post",
						async: true,
						dataType: "json",
						data: {
							languageType: localStorage.coinlang || "zh",
							username: $("#emailAddress").val(),
							pwd: $("#pwd").val()
						},
						success: function(data) {
							localStorage.push_login_state = 1;
							localStorage.otc_token = data.data.token;
							localStorage.otc_uId=data.data.uId;
							localStorage.otc_headimg=data.data.userHeadPicPath;
							localStorage.otc_username=data.data.nickName;
							localStorage.userdate= JSON.stringify(data.data);
							localStorage.shopper = data.data.userCommodityStatus;
							location.reload();
							vm.$router.push({
								path: "/"
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
			codeimg(){
				this.code_img=false;
				this.code_img1=true;
			},
			codeimgf(){
				this.code_img=true;
				this.code_img1=false;
			},
			checkboxinp(){
				let vm=this;
				var otc_user='otc_user'
				if($('#checkinp').is(':checked')!=false){
					var d = new Date();
					d.setTime(d.getTime()+(30*24*60*60*1000));
					var expires = "expires="+d.toGMTString();
					document.cookie = "otc_user"+"="+$('#emailAddress').val()+"; "+expires;
				}else{
					 document.cookie = `${otc_user}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
				}
			}
		},
		mounted: function() {
			let vm = this;
			vm.createCode();

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
				background: #f1f1f1;
				color: #818181;
				border: none;
				border-radius: 5px;
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
			cursor: pointer;
		}
		.rename{
			box-sizing: border-box;
			padding-right:0.4rem;
			padding-left:0.4rem;
			margin: 0.2rem 0 0.7rem 0;
			display: flex;
			justify-content: space-between;
			div{
				font-size: 0.18rem;
				input{
					-webkit-appearance: checkbox;
					cursor: pointer;
				}
			}
			.text {
				padding: 0;
				color: darkgray;
				display: block;
				text-align: right;
				font-size: 0.18rem;
			}
		}
			
	}
</style>