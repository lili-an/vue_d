<template>
  <div class="change_paypass">
    <mt-header title="提现" class="w-header">
      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
      <span slot="right" @click="to_record">提现记录</span>
    </mt-header>
    <div class="m_box">
      <div v-show="!flag" class="box_1">
        <p class="p_m">当前账户可提现金额 {{ mList.realMoney }} 元</p>
        <div class="checkMoney">
          <p>金额：</p>
          <div>
            <input type="text" v-model="money" placeholder="请输入提现金额">元
          </div>
        </div>
        <div class="checkCard">
          <p>银行卡：</p>
          <p @click="checkCard">{{ cardTxt }}</p>
        </div>
        <p class="sxf_">提现手续费&nbsp;2&nbsp;元</p>
        <mt-popup
          v-model="popupVisible3"
          position="bottom">
          <div class="bank_box">
            <div class="item1" v-for="(item, index) in bankList" :key="index" @click="checkBankCard(item.id, item.cardNumber)">
              <img :src="'../../../static/bank/'+item.bankStr+'.png'" alt="">
              <div class="_it">
                <span>{{ item.bankName }}</span>
                <span class="mar">储蓄卡</span>
                <span>{{ subStr(item.cardNumber) }}</span>
              </div>
            </div>
          </div>
        </mt-popup>
        <button type="button" class="sure" @click="withdraw">确认提现</button>
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
        popupVisible3: false,
        url: '',
        money: '',
        bank: '',
        cardTxt: '请选择银行卡',
        flag: false,
        mList: {},
        bankList: [],
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
        this.getBankCard()
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
      withdraw() {
        var obj = {
            'userId': this.w_data.userId,
            'money':this.money,
            'bank':this.bank,
          }
          if(this.money == '') {
            this.tip('请输入提现金额')
          }else if (this.bank == '') {
            this.tip('请选择银行卡')
          }else{
            api.Withdraw(obj)
            .then(res => {
              if(res.errMsg == 'SUCCESS') {
                this.flag = true;
                this.wHtml = res.result.form;
              }else{
                this.tip(res.errMsg)
              }
            })
            .catch(err => {console.log(err)})
          }     
      },
      getBankCard() {
        var obj = {'userId': this.w_data.userId};
        api.Bank(obj)
        .then(res => {
          this.bankList = res.result;
        })
        .catch(err => {console.log(err)})
      },
      getMoney() {
        var obj = {'userId': this.w_data.userId};
        api.GetUserMoney(obj)
        .then(res => {
          this.mList = res.result;
        })
        .catch(err => {console.log(err)})
      },
      checkCard() {
        if(this.bankList.length < 1) {
          this.tip('请先添加银行卡')
        }else{
           this.popupVisible3 = !this.popupVisible3;
        }
      },
      checkBankCard(id, name) {
        this.bank = id;
        this.cardTxt = name;
        this.popupVisible3 = !this.popupVisible3;
      },
      to_record() {
        this.$router.push('/withdraw/record')
      },
      tip(str) {
        this.$toast({
            message: str,
            position: 'middle',
            duration: 1500
          })
      },
      subStr(str) {
        return str.substr(0,4)+"*****"+str.substr(15);
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
    margin-bottom: 0.27rem;
  }
  .checkCard, .checkMoney {
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
  .sxf_ {
    padding: 0.4rem 0.27rem;
  }
  .bank_box {
    max-height: 8.0rem;
    overflow: auto;
    padding: 0.27rem 0.4rem;
    margin-top: 0.27rem;
    .item1 {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background: #eee;
      border-radius: 0.16rem;
      padding: 0.53rem;
      font-size: 0.37rem;
      margin-bottom: 0.27rem;
      .iconfont {
        font-size: 0.59rem;
        margin-bottom: 0.13rem;
      }
      img {
        width: 1.07rem;
      }
      ._it {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-left: 0.53rem;
        .mar {
          margin: 0.15rem 0;
        }
      }
    }
  }

</style>