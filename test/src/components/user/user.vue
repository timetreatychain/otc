<template>
	<div class="user">
		<div class="title">
			<img src="../../../static/userlogo.png" @click="returns"/>
		</div>
		<div class="content">
			<div class="switch">
				<router-link to="login">登录</router-link>
				<router-link to="registered">注册</router-link>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			returns(){
				this.$router.push({
					path:'/'
				})
			}
//			win_scroll(){
//				var top_left= document.body.scrollTop||window.scrollTop||document.documentElement.scrollTop;
//				$(".user").css("top",-top_left+"px");
//			}
		}
//		mounted () {
//		  window.addEventListener('scroll', this.win_scroll)
//		}
	}
</script>
<style lang="scss" scoped>
	.user{
		/*position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;*/
		width: 19.2rem;
		height: 9rem;
		background: url(../../../static/login.png) no-repeat;
		background-size: 100% 100%;
		margin-bottom: 3rem;
		.title{
			margin-top: 0.5rem;
			text-align: right;
			img{
				width: 2.5rem;
				margin-right: 3rem;
				cursor: pointer;
			}
		}
		.content{
			width: 5.36rem;
			height: 7rem;
			box-sizing: border-box;
			-moz-box-shadow:1px 2px 20px #c8c8c8; -webkit-box-shadow:1px 2px 20px #c8c8c8; box-shadow:1px 2px 20px #c8c8c8;
			border-radius:0.06rem;
			float: right;
			margin:0.2rem 1.6rem 0 0;
		}
		.switch{
			width: 100%;
			height: 0.8rem;
			box-sizing: border-box;
			font-size: 0.23rem;
			a{
				float: left;
				width: 50%;
				height: 0.8rem;
				line-height: 0.8rem;
				text-align: center;
				border-bottom: 1px solid darkgray;
			}
			.router-link-active{
				color: #60b5f0;
				border-bottom: 1px solid #60b5f0;
			}
		}
		/*.inputs{
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
			input{
				border: none;
				width: 3.9rem;
			}
			.validation{
				width: 2.6rem;
			}
			.btn_send{
				width: 1.16rem;
				height: 0.4rem;
				background: #fd8484;
				color: white;
				border: none;
				border-radius: 5px;
			}
		}
		.btn_login{
			width: 2.3rem;
			height: 0.62rem;
			border: none;
			border-radius: 10px;
			color: white;
			font-size: 0.28rem;
			background: #ffc454;
		}
		.text{
			padding: 0;
			color: darkgray;
			width: 4.9rem;
			text-align: right;
			margin: 0.2rem 0 0.7rem 0;
		}*/
	}
</style>