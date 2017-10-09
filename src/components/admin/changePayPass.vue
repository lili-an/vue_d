<template>
	<div class="change_paypass">
		<mt-header title="修改交易密码" class="w-header">
      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
    </mt-header>
    <div class="m_box">
      <iframe :src="url" width="100%" height="100%"></iframe>
    </div>
	</div>
</template>
<script>
  import api from '../../api/api'
  export default {
    data() {
      return {
        w_data: {},
        url: ''
      };
    },
    watch: {
      '$route': function () {
        
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.changePayPass()
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
      changePayPass() {
        var obj = {
            'userId': this.w_data.userId,
          }
          api.ChangePayPass(obj)
          .then(res => {
            if(res.errMsg == 'SUCCESS') {
              this.url = res.result.url
            }else{
              this.tip(res.errMsg)
            }
          })
          .catch(err => {console.log(err)})
      },
    	goback() {
    		this.$router.push('/account/personal')
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
</style>