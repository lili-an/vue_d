<template>
  <div class="investment_record">
    <mt-header title="提现记录" fixed class="w-header">
      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
    </mt-header>
    <div class="record_box">

		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div class="m_item" v-for="(item, index) in billL" :key="index">
		        <div class="m_top">
		          <p class="m_title">提现</p>
		          <p class="m_money" :id="'b'+item.id"><span :id="'s'+item.id">-</span>{{ item.money }}元</p>
		        </div>
		        <div class="m_bottom">
		          <p>{{ getDate(item.createTime,'yyyy-MM-dd hh:mm:ss')}}</p>
		          <p>{{ item.status }}</p>
		        </div>
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
  import api from '../../api/api'
  export default {
    data() {
      return {
        w_data: {},
        num: 1,
        billL: [],
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
        this.getBill();
      })
    },
    created() {
      if(localStorage.getItem('w_data') == undefined) {
        this.$router.push('/login')
      }else {
        var a = JSON.parse(localStorage.getItem('w_data'));
        if(a.userPhone == undefined) {
          this.$router.push('/login');
          localStorage.removeItem('w_data')
        }else{
          this.w_data = a;
        }       
      }
    },
    methods: {
      loadMore() {
      	this.loadinging = true
		  setTimeout(() => {
		    this.num++
		    var projectObj = {
		          "userId": this.w_data.userId,
		          "status": "",
		          "pageSize": "10",
		          "pageNumber": this.num
		        }
		        api.WithdrawList(projectObj).then(res => {
		          if(res.errMsg == 'SUCCESS') {
		          	this.loadinging = false

		          	for(let i=0; i<res.result.length; i++) {
		              if(res.result[i].status == 0) {
		                  res.result[i].status = '未审核'
		              }else if(res.result[i].status == 1) {
		                  res.result[i].status = '审核通过'
		              }else if(res.result[i].status == 2) {
		                  res.result[i].status = '审核失败'
		              }
		            }
		          	
		            this.billL = this.billL.concat(res.result);
		            if (res.result.length < 10) {
			          this.loading = true;
			          this.loadinging = false;
			          this.nomore = true;
			        }
		          }
		        }).catch(err => {console.log(err)})

		  }, 2500);
		},
      getBill() {
        var obj = {
          "userId": this.w_data.userId,
          "status": "",
          "pageSize": "10",
          "pageNumber": this.num
        }
        // console.log(obj)
        api.WithdrawList(obj)
        .then(res => {
          if(res.errMsg == 'SUCCESS') {
            for(let i=0; i<res.result.length; i++) {
              if(res.result[i].status == 0) {
                  res.result[i].status = '未审核'
              }else if(res.result[i].status == 1) {
                  res.result[i].status = '审核通过'
              }else if(res.result[i].status == 2) {
                  res.result[i].status = '审核失败'
              }
            }
            this.billL = this.billL.concat(res.result);
          }else{
            console.log(res.errMsg)
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
        this.$router.go(-1)
      },
    },
    components: {
      
    }
  }
</script>
<style lang="scss" scoped>
  .record_box {
    margin-top: 1.45rem;
    padding-bottom: 1.6rem;
  }
  .m_item {
    padding: 0.33rem 0.4rem;
    font-size: 0.38rem;
    color: #666;
    border-bottom: 1px solid #b9b6b6;
  }
  .m_top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    font-size: 0.4rem;
    p {
      color: #999;
    }
    .m_title {
      color: #333;
    }
    .m_money {
      color: #f11d1d;
    }
    .m_money.m_blue {
      color: blue;
    }
  }
  .m_bottom {
    display: flex;
    justify-content: space-between;
    font-size: 0.35rem;
    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      .m_red {
        color: #f11d1d;
        font-size: 0.4rem;
        margin-bottom: 0.2rem;
      }
    }
  }
</style>