<template>
	<div class="page_r">
      	<div class="maintitle">
	        {{pagelist.mainHeadin}}
	    </div>
	    <p class="secondTilte">
	        {{pagelist.subheading}}
	    </p>
	    <div class="contett" v-html="pagelist.content"></div>
    </div>
</template>

<script>
	export default{
		data(){
			return{
				pagelist:"",
				id:this.$route.query.id
			}
		},
		mounted(){
			this.getlist();
		},
		methods:{
			getlist(){
				let vm=this;
				$.ajax({
					type:"post",
					url:contextPath+"/api/shopping/getAnnouncementContent",
					async:true,
					dataType:'json',
					data:{
          				id:vm.id
					},
					success(res){
						if(res.state.code==='20000'){
							vm.pagelist=res.data;
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page_r {
      width: 7.8rem;
      // border: 1px solid #bebebe;
      box-sizing: border-box;
      // padding: 0.2rem;
      padding: 0 0.1rem;
      border-radius: 0.1rem;
      color: #666;
      font-size: 0.16rem;
      .maintitle {
        font-size: 0.3rem;
        margin-bottom: 0.17rem;
        color: #282828;
      }
      .secondTilte {
        font-size: 0.18rem;
        color: #666;
        margin-bottom: 0.23rem;
      }
    }
</style>