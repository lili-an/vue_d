<template>
  <div class="investment_record">
    <mt-header title="投资记录" fixed class="w-header">
      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
    </mt-header>
    <div class="record_box">
      <div class="_title">
        <p>投资人/时间</p>
        <p>金额(元)</p>
      </div>
      <div class="m_item" v-for="(item, index) in detailList" :key="index" v-show="!flag">
        <div class="m_top">
          <p class="m_title">{{ str(item.userName) }}</p>
          <p>{{ getDate(item.createTime,'yyyy-MM-dd hh:mm:ss')}}</p>
        </div>
        <p class="m_money">{{ item.realMoney }}</p>
      </div>
      <div v-show="flag" class="isEmpty">
        还没有投资记录
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../api/api'
  export default {
    data() {
      return {
        w_data: {},
        detailList: [],
        flag: false
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
      getDetail() {
        var id = localStorage.getItem('pid');
        var params = {'projectId':id}
        api.ProtectDetail(params)
        .then(res => {
          if(res.errMsg == 'SUCCESS') {
            this.detailList = res.result.orderList;
            if(this.detailList.length == 0) {
              this.flag = true;
            }
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
      str(str) {
        return str.substr(0,3)+"*****"+str.substr(8)
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
  .record_box {
    margin-top: 1.45rem;
    padding-bottom: 1.45rem;
    ._title {
      display: flex;
      justify-content: space-between;
      padding: 0.27rem 0.4rem;
      font-size: 0.4rem;
    }
  }
  .m_item {
    padding: 0.33rem 0.4rem;
    font-size: 0.36rem;
    color: #666;
    border-bottom: 1px solid #b9b6b6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .m_title {
      margin-bottom: 0.27rem;
    }
    .m_money {
      color: #26a2ff;
    }
  }
  .m_top {
     p:nth-child(2) {
        font-size: 0.35rem;
     }
  }
  .isEmpty {
    display: flex;
    justify-content: center;
  }
</style>