<template>
  <div class="investment_record">
    <mt-header title="相关协议" fixed class="w-header">
      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
    </mt-header>
    <div class="record_box">
      <div class="m_item">
       <div class="_title">合同附图</div>
       <div class="pic-item" v-for="(item, index) in picList" :key="index" v-show="!flag">
         <img :src="'http://www.wodunjf.com'+item.picUrl" alt="">
       </div>
       <div v-show="flag" class="isEmpty">
        还没有合同附图
      </div>
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
        flag: false,
        picList: []
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
          localStorage.removeItem('pid');
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
            this.picList = res.result.picList;
            if(this.picList.length == 0) {
              this.flag = true;
            }
          }
        }).catch(err => {console.log(err)})
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
    background: #eee;
  }
  .m_item {
    padding: 0.33rem 0.4rem;
    font-size: 0.38rem;
    color: #333;
    margin-bottom: 0.4rem;
    background: #fff;
  }
  ._title {
    padding: 0.27rem 0;
    border-bottom: 1px solid #b9b6b6;
    margin-bottom: 0.27rem;
    font-size: 0.4rem;
    color: #000;
  }
  .pic-item {
    margin-bottom: 0.53rem;
    img {
      width: 100%;
    }
  }
   .isEmpty {
    display: flex;
    justify-content: center;
  }
</style>