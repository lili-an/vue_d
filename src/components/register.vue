<template>
  <div class="register" id="register">
    <img src="../assets/logo.png">
    <div class="register_item">
      <span>手机号</span>
      <input type="text" placeholder="请输入手机号" v-model="userPhone">
    </div>
    <div class="register_item">
      <span>验证码</span>
      <div>
        <input type="text" placeholder="请输入短信验证码" v-model="phoneCode">
        <mt-button type="primary" size="small" @click="sendCode">发送短信验证码</mt-button>
      </div>
    </div>
    <div class="register_item">
      <span>密码</span>
      <input type="text" placeholder="请输入密码" v-model="password">
    </div>
    <div class="register_item">
      <span>邀请人</span>
      <input type="text" placeholder="请输入邀请人（可空）" v-model="userParent">
    </div>
    </br>
    <mt-button type="danger" size="large" @click="register">注册</mt-button>
    </br>
    <span class="alLogin" @click="login">已有账号？去登录</span>
  </div>
</template>

<script>
import api from '../api/api'
export default {
  name: 'register',
  data () {
    return {
      userPhone: '',
      phoneCode: '',
      password: '',
      userParent: ''
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.registerH()
    })
  },
  methods: {
    sendCode() {
      var obj = {
        'verifyType':'1',
        'data': this.userPhone
      }
      var codeObj = {
        'userPhone': this.userPhone,
        'sendType': 'register_valicode'
      }
      if(!(/^1[34578]\d{9}$/.test(this.userPhone))) {
        this.toast('请输入正确的手机号')
      }else{
        api.Validate(obj)
        .then(res => {
          if(res.errMsg == 'SUCCESS') {
            api.RegisterCode(codeObj)
            .then(res => {
              console.log(res)
            })
            .catch(err => {console.log(err)})
          }else {
            this.toast(res.errMsg)
          } 
        })
        .catch(err => {console.log(err)})
      }
    },
    register() {
      var obj = {
        'userPhone': this.userPhone,
        'phoneCode': this.phoneCode,
        'password': this.password,
        'userParent': this.userParent,
      }
      if(!(/^1[34578]\d{9}$/.test(this.userPhone))) {
        this.toast('请输入正确的手机号')
      }else if(this.phoneCode == ''){
        this.toast('验证码不正确')
      }else if(!(/^[a-zA-Z0-9]{7,20}$/).test(this.password)){
        this.toast('请输入7-20位字母和数字组合的密码')
      }else{
        api.Register(obj)
        .then(res => {
          if(res.errMsg == 'SUCCESS') {
            var instance = this.$toast('登录成功');

            setTimeout(() => {
              instance.close();
              this.$router.push('/login')
            }, 1500)
          }else{
            this.toast(res.errMsg)
          }
        }).catch(err => {console.log(err)})
      }
    },
    registerH() {
      // var registerH = document.getElementById("register");
      // registerH.style.height = document.documentElement.clientHeight + 'px';
    },
    login() {
      this.$router.push('/login')
    },
    toast(data) {
      this.$toast({
          message: data,
          position: 'middle',
          duration: 1500
        });
    }
  },
}
</script>

<style lang="scss" scoped>
  .register {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 1.33rem;
      img {
        width: 2.67rem;
        margin-bottom: 0.53rem;
      }
      button.mint-button--large {
        width: 100%;
        font-size: 0.4rem;
        height: 0.75rem;
    }
    .alLogin {
      font-size: 0.4rem;
    }
  }
  .register_item {
      width: 80%;
      display: flex;
      font-size: 0.4rem;
      padding: 0.27rem 0;
      position: relative;
      span {
        width: 20%;
      }
      input {
        border: none;
      }
      button.mint-button--small {
        padding: 0px 0.16rem;
        height: 0.56rem;
        position: absolute;
        top: 0.27rem;
        right: 0;
        font-size: 0.32rem;
      }
  }
</style>
