<template>
	<div class="home">
		<div class="banner">
		    <el-carousel>
		      <!-- <el-carousel-item style="height: 400px;">
		        <router-link to="/announcement" tag="img"  src="../../static/banner.png"/>
		      </el-carousel-item> -->
		      <el-carousel-item style="height: 400px;" v-for="item in banners">
		      		<img :src="item.picUrl" @click="check(item.id)"/>
		        <!--<router-link to="/announcement" tag="img" src="../../static/banner1.png" @click="check" style="cursor: pointer;"/>-->
		      </el-carousel-item>
		    </el-carousel>
		</div>
		<div class="main">
			<div class="my_sell" @click="mysell()">
				<div class="title">{{$t("home.sell[0]")}}</div>
				<div class="txt">{{$t("home.sell[1]")}}</div>
			</div>
			<div class="my_buy" @click="mybuy()">
				<div class="title">{{$t("home.buy[0]")}}</div>
				<div class="txt">{{$t("home.buy[1]")}}</div>
			</div>
		</div>
		<div class="why">
			<div class="why_title"><b>{{$t("home.why[0]")}}</b></div>
			<div class="text">{{$t("home.why[1]")}}</div>
		</div>
		<div class="three">
			<div class="three_div">
				<img src="../../static/safe.png"/>
				<b>{{$t("home.one[0]")}}</b>
				<span>
					{{$t("home.one[1]")}}<br />
					{{$t("home.one[2]")}}<br />
					{{$t("home.one[3]")}}
				</span>
			</div>
			<div class="three_div">
				<img src="../../static/safe1.png" class="img1"/>
				<b>{{$t("home.tow[0]")}}</b>
				<span>
					<!--{{$t("home.tow[1]")}}<br />-->
					{{$t("home.tow[2]")}}<br />
					{{$t("home.tow[3]")}}
				</span>
			</div>
			<div class="three_div">
				<img src="../../static/safe2.png" class="img2"/>
				<b>{{$t("home.three[0]")}}</b>
				<span>
					{{$t("home.three[1]")}}<br />
					{{$t("home.three[2]")}}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				banners:""
			}
		},
		created(){
			this.getbanner()
		},
		methods:{
			check(id){
				this.$router.push({
					path:'/announcement',
					query:{id}
				})
			},
			getbanner(){
				let vm=this;
				$.ajax({
					type:"get",
					url:contextPath+"/api/shopping/getHomeAnnouncement",
					async:true,
					dataType:"json",
					success(res){
						if(res.state.code==='20000'){
							vm.banners=res.data;
						}
					}
				});
			},
			mysell(){
				this.$router.push({
					path:'/sell'
				})
			},
			mybuy(){
				this.$router.push({
					path:'/buy'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		width: 19.2rem;
		.banner{
			width: 100%;
			height: 400px;
			margin-bottom: 1.04rem;
			.el-carousel{
				height: 100%;
				img {
					cursor: pointer;
				}
			}
			img{
				height:100%;
				width: 100%;
			}
		}
		.main{
			width: 100%;
			display: flex;
			justify-content: center;
			.my_sell,.my_buy{
				width: 5.8rem;
				height: 2.3rem;
				box-sizing: border-box;
				background:rgba(255,255,255,1);
				border-radius:0.06rem;
				border: 1px solid #C5C5C5;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				.title{
					font-size: 0.5rem;
					margin-bottom: 0.3rem;
				}	
				.txt{
					font-size: 0.24rem;
					color: #7C7B7B;
				}
			}
			.my_sell{
				margin-right: 0.4rem;
			}
			.my_sell:hover{
				position: relative;
				top: -3px;
				-moz-box-shadow:2px 2px 15px #C5C5C5;
				-webkit-box-shadow:2px 2px 15px #C5C5C5; 
				box-shadow:2px 2px 15px #C5C5C5;
				.title{
					color: #1C6D9E;
				}
			}
			.my_buy:hover{
				position: relative;
				top: -3px;
				-moz-box-shadow:2px 2px 15px #C5C5C5;
				-webkit-box-shadow:2px 2px 15px #C5C5C5; 
				box-shadow:2px 2px 15px #C5C5C5;
				.title{
					color: #1C6D9E;
				}
			}
		}
		.why{
			margin-top: 1.05rem;
			text-align: center;
			.why_title{
				font-size: 0.5rem;
				color:rgba(40,40,40,1);
				margin-bottom: 0.3rem;
			}
			.text{
				font-size: 0.24rem;
				color: #7C7B7B;
				margin-bottom: 0.55rem;
			}
		}
		.three{
			margin-bottom: 0.7rem;
			display: flex;
			justify-content: space-around;
			.three_div{
				display: flex;
				flex-direction: column;
				align-items: center;
				img{
					width: 1.72rem;
					height: 1.18rem;
					margin-bottom: 0.3rem;
				}
				b{
					font-size: 0.3rem;
					margin-bottom: 0.38rem;
				}
				span{
					font-size: 0.24rem;
					color: #7C7B7B;
					line-height: 0.33rem;
				}
				.img1{
					width: 1.69rem;
					height: 1.35rem;
					margin-bottom: 0.17rem;
				}
				.img2{
					width: 1.12rem;
					height: 1.37rem;
					margin-bottom: 0.19rem;
				}
			}
		}
	}
</style>