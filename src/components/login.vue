<template>
  <div>
      <div class="login" v-show="!flag">
        <img src="../assets/logo.png">
        <div class="login_item">
          <span>手机号</span>
          <input type="text" placeholder="请输入手机号" v-model="username">
        </div>
        <div class="login_item">
          <span>密码</span>
          <input type="password" placeholder="请输入密码" v-model="password1">
        </div>
        </br>
        <mt-button type="primary" size="large" @click="login" class="mb">登录</mt-button>
        <mt-button type="danger" size="large" @click="register">注册</mt-button>
        </br>
        <span class="alLogin" @click="forgetP">忘记密码？</span>
      </div>
      <div class="forget_password" v-show="flag">
        <mt-header title="修改密码" fixed class="w-header">
          <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
        </mt-header>
        <div class="fp_box">
           <div class="fp_item">
            <span>手机号</span>
            <input type="text" placeholder="请输入手机号" v-model="userPhone">
          </div>
          <div class="fp_item">
            <span>验证码</span>
            <div>
              <input type="text" placeholder="请输入短信验证码" v-model="phoneCode">
              <mt-button type="primary" size="small" @click="sendCode">发送短信验证码</mt-button>
            </div>
          </div>
          <div class="fp_item">
            <span>密码</span>
            <input type="text" placeholder="请输入密码" v-model="password2">
          </div>
          </br>
          <mt-button type="danger" size="large" @click="sure">确定</mt-button>
        </div>
      </div>
  </div>
</template>

<script>
import api from '../api/api'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password1: '',
      userPhone: '',
      phoneCode: '',
      password2: '',
      flag: false
    }
  },
  methods: {
    login() {
      var obj = {
        'userName': this.username,
        'password': this.password1
      }
      if(!(/^1[34578]\d{9}$/.test(this.username))) {
        this.toast('请输入正确的手机号');
      }else if(!(/^[a-zA-Z0-9]{7,20}$/).test(this.password)){
        this.toast('请输入7-20位字母和数字组合的密码');
      }else{
        api.Login(obj)
        .then(res => {
          if(res.errMsg == 'SUCCESS') {
            var instance = this.$toast('登录成功');

            setTimeout(() => {
              instance.close();
              var a = JSON.stringify(res.result);
              localStorage.setItem('w_data', a);
              this.$router.push('/account')
            }, 1500)
          }else{
            this.toast(res.errMsg);
          }
        }).catch(err => {console.log(err)})
      }
    },
    sendCode() {
      var obj = {
        'userPhone': this.userPhone
      }
      if(!(/^1[34578]\d{9}$/.test(this.userPhone))) {
        this.toast('请输入正确的手机号');
      }else{
        api.CheckPassword(obj)
        .then(res => {
          if(res.errMsg == 'SUCCESS') {
            this.toast('发送成功')
          }else {
            this.toast(res.errMsg)
          } 
        })
        .catch(err => {console.log(err)})
      }
    },
    sure() {
      var obj = {
        'userPhone': this.userPhone,
        'phoneCode': this.phoneCode,
        'password': this.password2,
      }
      if(!(/^1[34578]\d{9}$/.test(this.userPhone))) {
        this.toast('请输入正确的手机号')
      }else if(this.phoneCode == ''){
        this.toast('验证码不正确')
      }else if(!(/^[a-zA-Z0-9]{7,20}$/).test(this.password2)){
        this.toast('请输入7-20位字母和数字组合的密码')
      }else{
        api.SetPassword(obj)
        .then(res => {
          if(res.errMsg == 'SUCCESS') {
            var instance = this.$toast('修改成功');

            setTimeout(() => {
              instance.close();
              window.location.reload();
            }, 1500)
          }else{
            this.toast(res.errMsg)
          }
        }).catch(err => {console.log(err)})
      }
    },
    forgetP() {
      this.flag = true;
    },
    register() {
      this.$router.push('/register')
    },
    goback() {
      this.flag = false;
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
  .login {
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
  .fp_box {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .fp_item {
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
    button.mint-button--large {
        width: 60%;
        font-size: 0.4rem;
        height: 0.75rem;
    }
  }
  .login_item {
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
  }
  .mb {
    margin-bottom: 0.2rem;
  }
</style>
