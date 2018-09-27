<template>
  <div class="announcement">
    <h4 class="title">公告</h4>
    <div class="page">
      <ul class="page_l">
        <!--<li v-for="(item, index) in pagelist" :key="item.id" :class="{'cur' : index0 == index}" @click="godetails(index)">{{item.title}}</li>-->
        <router-link v-for="(item,index) in pagelist" :key="index" to='' :class="{'cur':index0==item.id}" @click.native="todetail(item.id,index)" >{{item.title}}</router-link>
      </ul>
      <div class="page_r">
      	<router-view></router-view>
        <!--<div v-for="(item , index) in pagelist" v-if="index0 == index" :key="item.id">
          <div class="maintitle">
            {{item.mainHeadin}}
          </div>
          <p class="secondTilte">
            {{item.subheading}}
          </p>
          <div class="contett" v-html="item.content">
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index0:1,
      pagelist: "",
      ids:this.$route.query.id||1
    };
  },
  created(){
  	this.todetail(this.ids)
  },
  mounted() {
    this.getinit();
  },
  methods: {
  	todetail(id){
  		this.$router.push({
  			path:'/details',
  			query:{id}
  		})
  		this.index0=id;
//		var i=".a"+id;
//		$(i).css("background","#cdcdcd");
//		$(i).siblings().css("background","white")
  	},
    godetails(i) {
      this.index0 = i;
      // this.$router.push('/details/'+ i);
    },
    getinit() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/shopping/getAnnouncement",
        async: true,
        dataType: "json",
        data: {
          languageType: localStorage.otc_lang || "zh",
          token: localStorage.otc_token,
          page:1,
          row:10
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.pagelist = res.data;
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.announcement {
  //width: 11.9rem;
  padding: 0 3.65rem;
  // width: 8.66rem;
  margin: 0 auto;
  text-align: left;
  font-size: 0.12rem;
  margin-top: 0.42rem;
  .title {
    font-size: 0.22rem;
    font-weight: 400;
    margin-bottom: 0.2rem;
    font-family: "MicrosoftYaHei";
  }
  .page {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 1rem;
    min-height: 8rem;
    .page_l {
      line-height: 0.65rem;
      margin-right: 0.2rem;
      /*.a1{
      	background: #cdcdcd;
      }*/
      a {
      	display: block;
        cursor: pointer;
        width: 3rem;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        // height: 0.65rem;
        margin-bottom: 0.1rem;
        line-height: 0.65rem;
        // background: #c4c4c4;
        text-align: left;
        box-sizing: border-box;
        padding-left: 0.2rem;
        color: #333333;
        font-size: 0.16rem;
        &.cur {
          background: #cdcdcd;
          color: #333;
        }

        &:hover {
          background: #cdcdcd;
          color: #333;
        }
      }
    }
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
  }
}
</style>