<template>
  <div class="investment_record">
    <mt-header title="我的红包" fixed class="w-header">
      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
      <span slot="right" @click="getRule">使用规则</span>
    </mt-header>
    <div class="record_box">
      <mt-navbar v-model="selected" fixed class="m_fixed">
        <mt-tab-item id="1">待使用</mt-tab-item>
        <mt-tab-item id="2">已使用</mt-tab-item>
        <mt-tab-item id="3">已过期</mt-tab-item>
      </mt-navbar>
      
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="m_box">
            <div v-show='!isEmpty1' class="m_item" v-for="(item, index) in unused" :key="index">
              <div class="m_left">
                <p class="m_n">{{ item.name }}</p>
                <span>满{{ item.lowAccount }}可用</span>
                <span>生效日期{{ getDate(item.getTime,'yyyy-MM-dd') }}</span>
                <span>有效期至{{ getDate(item.endTime,'yyyy-MM-dd') }}</span>
              </div>
              <div class="m_right">
                <p>{{ item.money }}元</p>
              </div>
            </div>
            <div v-show='isEmpty1' class="m_item">
              还没有待使用的红包...
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="m_box">
            <div v-show='!isEmpty2' class="m_item" v-for="(item, index) in used" :key="index">
              <div class="m_left">
                <p class="m_n">{{ item.name }}</p>
                <span>满{{ item.lowAccount }}可用</span>
                <span>生效日期{{ getDate(item.getTime,'yyyy-MM-dd') }}</span>
                <span>有效期至{{ getDate(item.endTime,'yyyy-MM-dd') }}</span>
              </div>
              <div class="m_right">
                <p>{{ item.money }}元</p>
              </div>
            </div>
            <div v-show='isEmpty2' class="m_item">
              还没有已使用的红包...
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="m_box">
            <div v-show='!isEmpty3' class="m_item" v-for="(item, index) in expired" :key="index">
              <div class="m_left">
                <p class="m_n">{{ item.name }}</p>
                <span>满{{ item.lowAccount }}可用</span>
                <span>生效日期{{ getDate(item.getTime,'yyyy-MM-dd') }}</span>
                <span>有效期至{{ getDate(item.endTime,'yyyy-MM-dd') }}</span>
              </div>
              <div class="m_right">
                <p>{{ item.money }}元</p>
              </div>
            </div>
            <div v-show='isEmpty3' class="m_item">
              还没有已过期的红包...
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      class="w_pop">
      <div class="rule_box">
        <h3>红包使用规则</h3>
        <p>(1)红包的使用期限，可以在“用户中心”-“我的红包“里进行查询，具体结束时间以活动公告为准；</p>
        <p>(2)红包有效期以实际领取红包的说明为准，以领取日开始计算；</p>
        <p>(3)注册红包一个账户仅限领取一次；</p>
        <p>(4)红包可用于购买沃金计划产品，详细见红包说明，体验金券仅限投资体验标；</p>
        <p>(5)新手任务完成后，奖励会自动发放至用户的沃顿金服账户“我的红包”中；</p>
        <p>(6)所有的注册奖励（红包，优惠券等），在完成实名注册后所得奖励在“用户中心”-“我的红包”里面进行查询；</p>
        <p>(7)本活动最终解释权在法律许可的范围内归入沃顿金服所有。</p>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import api from '../../api/api'
  export default {
    data() {
      return {
        w_data: {},
        selected: '1',
        unused: [],
        used: [],
        expired: [],
        popupVisible: false,
        isEmpty1: false,
        isEmpty2: false,
        isEmpty3: false,
      };
    },
    watch: {
      '$route': function () {
        
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.getCoupon();
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
          // localStorage.w_data = JSON.stringify(this.w_data)
        }       
      }
    },
    methods: {
      getRule() {
        this.popupVisible = !this.popupVisible
      },
      getCoupon() {
        var obj = {
          'userId': this.w_data.userId,
          'projectId': '',
          'money': '1'
        };
        api.Coupon(obj)
        .then(res => {
          for(var i=0; i<res.result.length; i++) {
            if(res.result[i].status == 0) {
              this.unused.push(res.result[i])
            }else if(res.result[i].status == 1) {
              this.used.push(res.result[i])
            }else if(res.result[i].status == 3) {
              this.expired.push(res.result[i])
            }
          }
          if(this.unused.length == 0) {
            this.isEmpty1 = true;
          }
          if(this.used.length == 0) {
            this.isEmpty2 = true;
          }
          if(this.expired.length == 0) {
            this.isEmpty3 = true;
          }
        })
        .catch(err => {console.log(err)})
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
    display: flex;
    justify-content: center;
    .m_left {
      display: flex;
      flex-direction: column;
      flex: 1;
      p , span{
        padding: 0.07rem;
      }
      .m_n {
        background: #da0303;
        color: #fff;
        border-radius: 20px;
        width: max-content;
      }
    }
    .m_right {
      width: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #da0303;
      color: #fff;
    }
  }
  .rule_box {
    font-size: 0.35rem;
    padding: 0 0.27rem 0.5rem;
    h3 {
      font-size: 0.43rem;
      text-align: center;
      margin-bottom: 0.27rem;
    }
    p {
      margin-bottom: 0.13rem;
      line-height: 0.48rem;
    }
  }
</style>