<template>
	<div class="media">
		<mt-header title="新闻资讯" fixed class="w-header">
	      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
	    </mt-header>
	    <div class="media_list">
	    		<div class="media_item">
	    			<div class="m_bottom">
	    				<span>{{ mediaDetail.title }}</span>
              <span>日期：{{ getDate(mediaDetail.createTime,'yyyy-MM-dd') }}</span>
	    			</div>
            <p v-html="mediaDetail.titleContent"></p>
	    		</div>
	    </div>
	</div>
</template>

<script>
  import api from '../api/api'
  export default {
    data() {
      return {
        mediaDetail: {},
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
      getDetail() {
      	var id = this.$route.params.id;
        var obj = {
          "id": id,
        }
        api.articleDetail(obj)
        .then(res => {
          if(res.errMsg == 'SUCCESS') {
          	// console.log(res)
            this.mediaDetail = res.result1;
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
      padding-top: 0.27rem;
  }
  .m_bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span:nth-child(1) {
        font-size: 0.37rem;
        color: #000;
      }
      span:nth-child(2) {
        font-size: 0.32rem;
        margin: 0.27rem 0;
      }
  }
</style>