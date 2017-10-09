<template>
	<div class="media">
		<mt-header title="新闻资讯" fixed class="w-header">
      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
    </mt-header>
    <div class="media_list">

      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
	    	<div v-for="(item, index) in mediaList" :key="index">
	    		<router-link :to="{ name: 'mediaDetail', params: { id: item.id }}">
  	    		<div class="media_item">
  	    			<img :src="'http://www.wodunjf.com'+item.titlePic" alt="">
  	    			<div class="m_bottom">
  	    				<span>{{ item.title }}</span>
  	    				<span>{{ getDate(item.createTime,'yyyy-MM-dd') }}</span>
  	    			</div>
  	    		</div>
	    		</router-link>
	    	</div>
        <div class="w_spinner">
          <mt-spinner type="fading-circle" :size="40" v-show="loadinging"></mt-spinner>
          <span v-show="nomore">没有更多了</span>
        </div>
	    </div>
    </div>
	</div>
</template>

<script>
  import api from '../api/api'
  export default {
    data() {
      return {
        mediaList: [],
        num: 1,
        loading: false,
        loadinging: false,
        nomore: false
      };
    },
    watch: {
      '$route': function () {
        
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.getDetail();
      })
    },
    created() {

    },
    methods: {
      loadMore() {
        this.loadinging = true
        setTimeout(() => {
          this.num++
          var obj = {
                "typeId": "1603667023640924167",
                'pageNumber': this.num,
                'pageSize': '10'
              }
              api.Article(obj).then(res => {
                if(res.errMsg == 'SUCCESS') {
                  this.loadinging = false

                  this.mediaList = this.mediaList.concat(res.result);
                  if (res.result.length < 10) {
                    this.loading = true;
                    this.loadinging = false;
                    this.nomore = true;
                  }
                }
              }).catch(err => {console.log(err)})

        }, 2500);
      },
      getDetail() {
        var obj = {
          "typeId": "1603667023640924167",
          'pageNumber': this.num,
          'pageSize': '10'
        }
        api.Article(obj)
        .then(res => {
          if(res.errMsg == 'SUCCESS') {
            console.log(res)
          	this.mediaList = this.mediaList.concat(res.result);
 
          }
        }).catch(err => {console.log(err)})
      },
      getDate(val,fmt) { 
        if (!val) {
           return '';
        }
        if (val && val.length == 10) {
           val = parseInt(val+'000');
        }
        var date = new Date(val);
        var o = {   
            "M+" : date.getMonth()+1,                 //月份   
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时   
            "m+" : date.getMinutes(),                 //分   
            "s+" : date.getSeconds(),                 //秒   
            "q+" : Math.floor((date.getMonth()+3)/3), //季度   
            "S"  : date.getMilliseconds()             //毫秒   
        };   
        if(/(y+)/.test(fmt))   
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
        for(var k in o)   
            if(new RegExp("("+ k +")").test(fmt))   
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
        return fmt;   
      },
      goback() {
        this.$router.go(-1);
      },
    },
    components: {
      
    }
  }
</script>
<style lang="scss" scoped>
	.media {
		margin-top: 1.45rem;
		padding-bottom: 1.45rem;
	}
	.media_item {
	    height: 4.0rem;
    	overflow: hidden;
	    position: relative;
	    margin-bottom: 0.27rem;
    	img {
		    width: 100%;
    		height: 4.0rem;
    	}
    	.m_bottom {
		    position: absolute;
		    bottom: 0;
		    background: rgba(0,0,0,0.5);
		    color: #fff;
		    width: 100%;
		    padding: 0.2rem 0;
		    display: flex;
		    justify-content: space-around;
		    span:nth-child(1) {
	    	    width: 70%;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
		    }
    	}
	}
</style>