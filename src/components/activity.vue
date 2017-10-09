<template>
	<div class="activity">
		<mt-header title="活动" fixed class="w-header">
	      <i v-show="flag" class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
	    </mt-header>
	    <div class="item_b">
	    	<div v-show="!flag" class="item" v-for="(item, index) in bannerList" :key="index">
				<div class="item-title">
					<span>{{ item.name }}</span>
					<span>{{ getDate(item.createTime,'yyyy-MM-dd')}}</span>
				</div>
				<div class="pic" @click="checkthis(item.url)">
					<img :src="item.pic" alt="">
				</div>
			</div>
			<div v-show="flag">
		       <iframe :src="url" width="100%" height="100%" seamless frameborder="0" marginheight="0" marginwidth="0" id="acitity_iframe"></iframe>
	        </div>
	    </div>	
	</div>
</template>
<script>
  import { Indicator } from 'mint-ui';
  import api from '../api/api'
  export default {
    data() {
      return {
      	bannerList: [],
      	flag: false,
      	url: ''
      };
    },
    watch: {
      '$route': function () {
        
      },
      flag: function() {
      	if(this.flag) {
      		this.iframeH();
      	}
      }
    },
    mounted() {
      this.$nextTick(function() {
      	this.getBanner();
      })
    },
    methods: {
      getBanner() {
        var obj = {
          "type": "1597865919278747654",
          "status": "0",
          "number": "5"
        }
        api.Banner(obj).then(res => {
        	
          for(var i=0; i<res.result.length;i++) {
            res.result[i].pic = 'http://www.wodunjf.com'+res.result[i].pic
          }

          this.bannerList = res.result;
        }).catch(err => {console.log(err)})
      },
      checkthis(par) {
      	this.flag = !this.flag;
      	this.url = par;
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
      	this.flag = !this.flag;
      },
      iframeH() {
      	var ifm = document.getElementById("acitity_iframe");
    		ifm.height = document.documentElement.clientHeight;
    		Indicator.open({
    		  text: '玩命加载中',
    		  spinnerType: 'fading-circle'
    		})
    		ifm.onload = function() {
      		Indicator.close();
      	}
        setTimeout(function() {
          Indicator.close();
        }, 2000)
      },
    },
    components: {
      
    }
  }
</script>
<style lang="scss" scoped>
	.activity {
	    height: 100%;
    	.item {
    		height:5.33rem;
    		margin-bottom:0.2rem;
		    padding: 0 0.27rem;
    	}
    	.item-title {
		    display: flex;
		    justify-content: space-between;
		    padding: 15px 0;
    	}
    	.pic {
    		width:100%;
    		height:4.0rem;
    		img {
    			width: 100%;
    		}
    	}
	}
	.item_b {
		padding-top: 1.6rem;
		margin-bottom: 1.6rem;
	}
</style>