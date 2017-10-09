<template>
	<div class="property_record">
		<mt-header title="用户反馈" class="w-header">
      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
    </mt-header>
    <div class="m_box">
      <textarea rows="10" cols="30" class="tex" v-model="content" placeholder="请输入反馈信息"></textarea>
      <button type="button" class="sure" @click="feed">确定</button>
    </div>
	</div>
</template>
<script>
  import api from '../../api/api'
  export default {
    data() {
      return {
        w_data: {},
        content: ''
      };
    },
    watch: {
      '$route': function () {
        
      }
    },
    mounted() {
      this.$nextTick(function() {

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
      feed() {
        var obj = {
          'userId': this.w_data.userId,
          'content': this.content
        };
        if(this.content == '') {
          this.$toast({message: '反馈信息不能为空',position: 'middle', duration: 1500 })
        }else{
          api.Feedback(obj)
          .then(res => {
            if(res.errMsg == 'SUCCESS') {
              var ind = this.$toast({
                  message: '发送成功',
                  position: 'middle',
                  duration: 1500
                })
              var that = this;
              setTimeout(function() {
                ind.close();
                that.$router.push('/account/personal')
              },1500)
            }else{
              var ind = this.$toast({
                  message: res.errMsg,
                  position: 'middle',
                  duration: 1500
                })
            }
          })
          .catch(err => {console.log(err)})
        }
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
  .sure {
    padding: 0.2rem 1.33rem;
    border: 1px solid #20a0ff;
    background: #20a0ff;
    color: #fff;
    display: block;
    margin: 0.5rem auto;
  }
  .m_box {
    width: 100%;
    overflow: hidden;
  }
  .tex {
    overflow: hidden;
    resize: none;
    width: 100%;
    font-size: 0.37rem;
    line-height: 0.4rem;
    padding: 0.27rem;
  }
</style>