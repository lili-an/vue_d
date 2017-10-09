<template>
	<div class="property_record">
		<mt-header title="资产明细" class="w-header">
      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
    </mt-header>
    <div class="m_box">
      <div class="m_item">
        <span class="m_red" v-text="mList.totalMoney">0</span>
        <span>资产总额(元)</span>
      </div>
      <div class="m_item">
        <div class="m_1">
          <p>账户可用余额(元)</p>
          <p class="m_red" v-text="mList.realMoney">0</p>
        </div>
        <div class="m_1">
          <span>代收总金额(元)</span>
          <span class="m_red" v-text="mList.waitTotalMoney">0</span>
        </div>
      </div>
      <div class="m_item">
        <div class="m_1">
          <span>待结算收益(元)</span>
          <span class="m_red" v-text="mList.haveInterest">0</span>
        </div>
        <div class="m_1">
          <span>已结算收益(元)</span>
          <span class="m_red" v-text="mList.waitInterest">0</span>
        </div>
        <div class="m_1">
          <span>累计收益(元)</span>
          <span class="m_red" v-text="mList.haveInterest + mList.waitInterest">0</span>
        </div>
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
        mList: {}
      };
    },
    watch: {
      '$route': function () {
        
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.getMoney()
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
      getMoney() {
        var obj = {'userId': this.w_data.userId};
        api.GetUserMoney(obj)
        .then(res => {
          this.mList = res.result;
        })
        .catch(err => {console.log(err)})
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
  .m_red {
    color: #f12626;
  }
  .m_box {
    font-size: 0.4rem;
    background: #eee;
  }
  .m_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.4rem;
    background: #fff;
    padding: 0 0.4rem;
  }
  .m_item:nth-child(1) {
    padding: 0.67rem 0;
    .m_red {
      margin-bottom: 0.4rem;
    }
  }
  .m_1 {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0.4rem 0;
    border-bottom: 1px solid #e1dfdf;
  } 

</style>