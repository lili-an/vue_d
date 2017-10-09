<template>
  	<div class="investment_record">
  		  <mt-header title="我的银行卡" fixed class="w-header">
  	      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
          <span slot="right" v-show="!check1" @click="edit">编辑</span>
          <span slot="right" v-show="check1" @click="j_btn">解绑</span>
  	    </mt-header>
        <div class="bank_box">
          <div class="item" @click="addBank">
            <i class="iconfont icon-tianjia"></i>
            <p>添加银行卡</p>
          </div>
          <div class="item1" v-for="(item, index) in blist" :key="index">
            <img :src="'../../../static/bank/'+item.bankStr+'.png'" alt="">
            <div class="_it">
              <span>{{ item.bankName }}</span>
              <span class="mar">储蓄卡</span>
              <span>{{ subStr(item.cardNumber) }}</span>
            </div>
            <label v-show="check1">
              <i class="iconfont icon-xuanze1" @click="checkCard(item.cardNumber, $event)"></i>
            </label>
          </div>
        </div>
  	</div>
</template>
<script>
  import api from '../../api/api'
  export default {
    data() {
      return {
        popupVisible4: false,
        w_data: {},
        blist: [],
        check1: false,
        checkedId: ''
      }
    },
    watch: {
      '$route': function () {
        
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.getBankCard();
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
      j_btn() {
        var obj = {
          'userId': this.w_data.userId,
          'cardNumber': this.checkedId
        }
        var xz = document.getElementsByClassName('icon-xuanze');
        if(xz.length == 0) {
          this.toast('请选择要解绑的银行卡')
        }else if(xz.length >= 2) {
          this.toast('请选择一张银行卡')
        }else{
          api.DeleteBank(obj)
          .then(res => {
            if(res.errMsg = 'SUCCESS') {
              this.toast('解绑成功');
              setTimeout(function() {
                window.location.reload();
              }, 1500)
            }
          })
          .catch(err => {console.log(err)})
        }
      },
      edit() {
        this.check1 = !this.check1
      },
      checkCard(id, event) {
        event.toElement.classList.toggle('icon-xuanze1')
        event.toElement.classList.toggle('icon-xuanze')

        this.checkedId = id;
        
      },
      getBankCard() {
        var obj = {'userId': this.w_data.userId};
        api.Bank(obj)
        .then(res => {
          // console.log(res)
          this.blist = res.result;
        })
        .catch(err => {console.log(err)})
      },
      addBank() {
        this.$router.push('/account/addBank')
      },
      subStr(str) {
        return str.substr(0,4)+"*****"+str.substr(15);
      },
      toast(data) {
        this.$toast({
            message: data,
            position: 'middle',
            duration: 1500
          });
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
  .bank_box {
    padding: 0.27rem 0.4rem;
    margin-top: 1.6rem;
    .item, .item1 {
      display: flex;
      flex-direction: column;
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
    }
    .item1 {
      flex-direction: row;
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