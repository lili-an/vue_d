<template>
  <div class="change_paypass">
    <mt-header title="充值" class="w-header">
      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
      <span slot="right" @click="to_record">充值记录</span>
    </mt-header>
    <div class="m_box">
      <div v-show="!flag" class="box_1">
        <p class="p_m">当前账户余额 {{ mList.realMoney }} 元</p>
        <div class="checkMoney">
          <p>充值金额：</p>
          <div>
            <input type="text" v-model="money" placeholder="请输入充值金额">元
          </div>
        </div>
        <button type="button" class="sure" @click="recharge">确认充值</button>
      </div>
      <div v-show="flag" style="height:100%">
        <iframe width="100%" height="100%" seamless frameborder="0" :srcdoc="wHtml"></iframe>
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
        url: '',
        money: '',
        flag: false,
        mList: {},
        wHtml: ''
      };
    },
    watch: {
      '$route': function () {
        
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.getMoney();
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
      recharge() {
        var obj = {
            'userId': this.w_data.userId,
            'money':this.money,
          }
          if(this.money == '') {
            this.tip('金额不能为空')
          }else{
            api.Recharge(obj)
            .then(res => {
              if(res.errMsg == 'SUCCESS') {
                this.flag = true;
                this.wHtml = res.result.form
              }else{
                this.tip(res.errMsg)
              }
            })
            .catch(err => {console.log(err)})
          }
      },
      getMoney() {
        var obj = {'userId': this.w_data.userId};
        api.GetUserMoney(obj)
        .then(res => {
          this.mList = res.result;
        })
        .catch(err => {console.log(err)})
      },
      tip(str) {
        this.$toast({
            message: str,
            position: 'middle',
            duration: 1500
          })
      },
      to_record() {
        this.$router.push('/recharge/record')
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
  .m_box {
    height: 1000px;
  }
  .sure {
    padding: 0.2rem 1.33rem;
    border: 1px solid #20a0ff;
    background: #20a0ff;
    color: #fff;
    display: block;
    margin: 0.5rem auto;
  }
  .p_m {
    padding: 0.5rem 0.27rem;
  }
  .checkMoney {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0.27rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #e3e0e0;
    input {
      border: none;
      text-align: right;
      padding-right: 0.53rem;
    }
  }

</style>