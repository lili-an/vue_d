<template>
  	<div class="investment_record">
  		  <mt-header title="添加银行卡" class="w-header">
  	      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
  	    </mt-header>
        <div class="bank_box">
          <div class="bank_row" @click="popupVisible3 = !popupVisible3">
            <p>开户所在地</p>
            <div>
              <input type="text" v-model="temp_addr" placeholder="请选择开户所在地" readonly="readonly">
              <i class="iconfont icon-go"></i>
            </div>
          </div>
          <div class="bank_row" @click="popupVisible4 = !popupVisible4">
            <p>选择银行</p>
            <div>
              <input type="text" v-model="bank" placeholder="请选择银行" readonly="readonly">
              <i class="iconfont icon-go"></i>
            </div>
          </div>
          <div class="bank_row">
            <p>银行卡号</p>
            <input type="text" v-model="cardNumber" placeholder="请输入银行卡号">
          </div>
        </div>
        <button type="button" class="sure" @click="addBank">确认添加</button>
        <mt-popup
          v-model="popupVisible4"
          position="bottom">
          <mt-picker :slots="slots1" @change="onValuesChange1"></mt-picker>
        </mt-popup>
        <mt-popup
          v-model="popupVisible3"
          position="bottom">
          <mt-picker class="select" :slots="slots" value-key="aname" @change="onValuesChange"></mt-picker>
        </mt-popup>
  	</div>
</template>
<script>
  import api from '../../api/api'
  import * as _ from '../../util/codeTable'
  import {address, slots} from '../../util/address';
  export default {
    data() {
      return {
        popupVisible3: false,
        popupVisible4: false,
        flag: false,
        slots: slots,
        temp_addr: '',
        w_data: {},
        cardNumber: '',
        cardList: [],
        bank: '',
        address: '',
        city: '',
        province: '',
        slots1: [
        {
          flex: 1,
          values: ["农业银行","北京银行","北京农商行","中国银行","上海银行","渤海银行","建设银行","重庆三峡银行","光大银行","兴业银行","中信银行","招商银行","民生银行","交通银行","长沙银行","浙商银行","浙江稠州商业银行","广东发展银行","广州市农信社","广州市商业银行","杭州银行","汉口银行","徽商银行","华夏银行","工商银行","宁波银行","南京银行","中国邮储银行","上海农村商业银行","深圳农村商业银行","浦东发展银行","晋城市商业银行","平安银行","银联在线支付","温州市商业银行"],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
      };
    },
    watch: {
      '$route': function () {
        
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.getBankCard();
        this.initAddress();
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
      initAddress() {
        this.slots[0].values = address.filter((item, index) => {
          if (item.apid === 0) {
            return item;
          }
        });
      },
      onValuesChange(picker, values) {
        // 防止没有省份时报错
        if (values[0]) {
          this.slots[1].values = address.filter((item, index) => {
            if (item.apid === values[0].aid) {
              return item;
            }
          });
        }
        // 防止没有市时报错
        if (values[1]) {
          this.slots[2].values = address.filter((item, index) => {
            if (item.apid === values[1].aid) {
              return item;
            }
          });
        }
        // 防止没有区时报错
        if (values[2]) {
          // 这里可以指定地址符，此处以空格进行连接
          this.temp_addr = values[0].aname + ' ' + values[1].aname + ' ' + values[2].aname;
          this.city = values[1].aname
          this.province = values[0].aname
        }
      },
      onValuesChange1(picker, values) {
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0]);
        }
        this.bank = values[0]
      },
      getBankCard() {
        var obj = {'userId': this.w_data.userId};
        api.Bank(obj)
        .then(res => {
          this.cardList = res.result;
        })
        .catch(err => {console.log(err)})
      },
      addBank() {
        if(!this.flag) {
          if(this.cardList.length != 0) {
            if(this.bank == '' || this.bank == undefined) {
              this.toast('请选择银行')
            }else{
              this.data()
            }
          }else{
            if(this.bank == '' || this.bank == undefined) {
              this.toast('请选择银行')
            }else if(this.cardNumber == '') {
              this.toast('请输入银行卡号')
            }else{
              this.data()
            }
          }
        }
      },
      data() {
        this.flag = true;
        var obj = {
          "userId": this.w_data.userId,
          "cardNumber": this.cardNumber,
          "bank": _.getBankCode(this.bank),
          "branch":"xxxxx",
          "city": this.city,
          "province": this.province,
        };
        api.AddBank(obj)
        .then(res => {
          if(res.errMsg == 'SUCCESS') {
            this.flag = false;
            var instance = this.$toast('添加成功');
            setTimeout(() => {
              instance.close();
              this.$router.push('/account/bank');
              window.location.reload();
            }, 1500)
          }else{
            this.toast(res.errMsg)
          }
        })
        .catch(err => {console.log(err)})
      },
      toast(data) {
        this.$toast({
            message: data,
            position: 'middle',
            duration: 1500
          });
      },
    	goback() {
    		this.$router.push('/account/bank')
    	},
    },
    components: {
      
    }
  }
</script>
<style lang="scss" scoped>
  .bank_box {
    padding: 0.27rem 0.4rem;
  }
  .sure {
    padding: 0.2rem 1.33rem;
    border: 1px solid #20a0ff;
    background: #20a0ff;
    color: #fff;
    display: block;
    margin: 0.5rem auto;
  }
  .bank_row {
    display: flex;
    justify-content: space-between;
    padding: 0.37rem 0;
    font-size: 0.37rem;
    input {
      border: none;
      text-align: right;
    }
    .iconfont {
      font-size: 0.37rem;
    }
  }
</style>