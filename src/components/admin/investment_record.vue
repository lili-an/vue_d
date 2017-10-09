<template>
	<div class="investment_record">
		<mt-header title="我的投资" fixed class="w-header">
      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
    </mt-header>
    <div class="record_box">
      <mt-navbar v-model="selected" fixed class="m_fixed">
        <mt-tab-item id="1">投资中</mt-tab-item>
        <mt-tab-item id="2">已还款</mt-tab-item>
      </mt-navbar>
      
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">

            <div class="m_item" v-for="(item, index) in orderL" :key="index">
              <div class="m_top">
                <p class="m_title">{{ item.projectName }}</p>
                <p>{{ getDate(item.createTime,'yyyy-MM-dd hh:mm')}}</p>
              </div>
              <div class="m_bottom">
                <p>
                  <span class="m_red">{{ item.repayInterest }}</span>
                  <span>预计累计收益(元)</span>
                </p>
                <p>
                  <span class="m_b">{{ item.realMoney }}</span>
                  <span>投资金额(元)</span>
                </p>
                <p>
                  <span class="m_b">{{time(item.projectTimeLimitType,item.projectTimeLimit)}}</span>
                  <span>投资期限</span>
                </p>
              </div>
            </div>
            <div class="w_spinner">
              <mt-spinner type="fading-circle" :size="40" v-show="loadinging"></mt-spinner>
              <span v-show="nomore">没有更多了</span>
            </div>

          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">

            <div class="m_item" v-for="(item, index) in orderR" :key="index">
              <div class="m_top">
                <p class="m_title">{{ item.projectName }}</p>
                <p>{{ getDate(item.createTime,'yyyy-MM-dd hh:mm')}}</p>
              </div>
              <div class="m_bottom">
                <p>
                  <span class="m_red">{{ item.repayInterest }}</span>
                  <span>预计累计收益(元)</span>
                </p>
                <p>
                  <span class="m_b">{{ item.realMoney }}</span>
                  <span>投资金额(元)</span>
                </p>
                <p>
                  <span class="m_b">{{time(item.projectTimeLimitType,item.projectTimeLimit)}}</span>
                  <span>投资期限</span>
                </p>
              </div>
            </div>
            <div class="w_spinner">
              <mt-spinner type="fading-circle" :size="40" v-show="loadinging"></mt-spinner>
              <span v-show="nomore">没有更多了</span>
            </div>

          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
	</div>
</template>
<script>
  import api from '../../api/api'
  export default {
    data() {
      return {
        selected: '1',
        w_data: {},
        num: 1,
        orderL: [],
        orderR: [],
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
        this.getOrder();
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
              api.UserOrder(projectObj).then(res => {
                if(res.errMsg == 'SUCCESS') {
                  this.loadinging = false

                  for(var i=0; i<res.result.length; i++) {
                    if(res.result[i].status == 2) {
                      this.orderL.push(res.result[i]);
                    }
                    if(res.result[i].status == 3) {
                      this.orderR.push(res.result[i]);
                    }
                  }
                  
                  if (res.result.length < 10) {
                    this.loading = true;
                    this.loadinging = false;
                    this.nomore = true;
                  }
                }
              }).catch(err => {console.log(err)})

        }, 2500);
      },
      getOrder() {
        var obj = {
          "userId": this.w_data.userId,
          "status": "",
          "pageSize": "10",
          "pageNumber": this.num
        }
        api.UserOrder(obj)
        .then(res => {
          if(res.errMsg == 'SUCCESS') {
            for(var i=0; i<res.result.length; i++) {
              if(res.result[i].status == 2) {
                this.orderL.push(res.result[i]);
              }
              if(res.result[i].status == 3) {
                this.orderR.push(res.result[i]);
              }
            }
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
      time(type,limit) {
        if(type == 0) {
          return limit+'个月'
        }else if(type == 1) {
          return limit+'天'
        }
      },
    	goback() {
    		this.$router.push('/account')
    	},
    },
    components: {
      
    }
  }
</script>

<style lang="scss" scoped>
  .record_box {
    margin-top: 2.9rem;
  }
  .m_fixed {
    top:1.45rem;
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
    margin-bottom: 0.5rem;
    p {
      color: #999;
    }
    .m_title {
      color: #666;
      font-size: 0.4rem;
    }
  }
  .m_bottom {
    display: flex;
    justify-content: space-between;
    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      .m_red {
        color: #f11d1d;
        font-size: 0.4rem;
        margin-bottom: 0.2rem;
      }
      .m_b {
        color: #333;
        font-size: 0.4rem;
        margin-bottom: 0.2rem;
      }
    }
  }
</style>