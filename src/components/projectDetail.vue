<template>
  <div class="investment_record">
    <mt-header title="项目详情" fixed class="w-header">
      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
    </mt-header>
    <div class="record_box">
      <div class="m_item">
        <div class="m_top">
          <div>项目内容</div>
          <p v-html="detailList.content"></p>
        </div>
        <!-- <div class="m_top">
          <div>验票托管</div>
          <p>{{ detailList.safeGuard }}</p>
        </div> -->
      </div>
      <!-- <div class="m_item">
        <div class="m_top">
          <div>还款来源</div>
          <p>{{ detailList.purpose }}</p>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
  import api from '../api/api'
  export default {
    data() {
      return {
        w_data: {},
        detailList: {}
      };
    },
    watch: {
      '$route': function () {
        
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.getDetail();
        console.log(1)
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
            this.detailList = res.result;
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
    padding-bottom: 1.45rem;
    background: #eee;
  }
  .m_item {
    padding: 0.33rem 0.4rem;
    font-size: 0.38rem;
    color: #333;
    margin-bottom: 0.4rem;
    background: #fff;
  }
  .m_top {
    margin-bottom: 0.4rem;
    div {
      padding: 0.27rem 0;
      border-bottom: 1px solid #b9b6b6;
      margin-bottom: 0.27rem;
      font-size: 0.4rem;
      color: #000;
    }
  }
  .m_bottom {

  }
</style>