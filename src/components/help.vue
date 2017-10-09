<template>
  <div class="investment_record">
    <mt-header title="帮助中心" fixed class="w-header">
      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
    </mt-header>
    <div class="record_box">
      <div class="problem_title_box">
      	<div class="item" v-for="(item, index) in title" :key="index" @click="checkThis(index, item.name)">{{ item.name }}</div>
      </div>
	  <div class="problem_box">
      	<div class="problem_er_title">
      		{{ showName }}
      	</div>
      	<div class="qa_box">
      		<div class="q_box" v-for="(item, index) in oneL" :key="index">
      			<p>Q：{{ item.title }}</p>
      			<p v-html="item.titleDescription"></p>
      		</div>
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
        helpList: {},
        oneL: [],
        twoL: [],
        threeL: [],
        fourL: [],
        showName: '账号相关',
        title: [{
        	'name':'账号相关',
        	'icon': ''
        },{
        	'name':'充值服务',
        	'icon': ''
        },{
        	'name':'兑奖提现',
        	'icon': ''
        },{
        	'name':'新手引导',
        	'icon': ''
        }]
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

    },
    methods: {
      getDetail() {
        var obj = {
          "typeId": "1622811223506554889",
        }
        api.Article(obj)
        .then(res => {
          if(res.errMsg == 'SUCCESS') {
          	// console.log(res)
          	for(var i=0; i<res.result.length; i++) {
	            if(res.result[i].orderNumber == 0) {
	              this.oneL.push(res.result[i])
	            }else if(res.result[i].orderNumber == 1) {
	              this.twoL.push(res.result[i])
	            }else if(res.result[i].orderNumber == 2) {
	              this.threeL.push(res.result[i])
	            }else if(res.result[i].orderNumber == 3) {
	              this.fourL.push(res.result[i])
	            }          
	        }
          }
        }).catch(err => {console.log(err)})
      },
      checkThis(index, name) {
      	this.showName = name;
      	if(index == 0) {
			this.oneL = this.oneL;
      	}else if(index == 1) {
      		this.oneL = this.twoL;
      	}else if(index == 2) {
      		this.oneL = this.threeL;
      	}else if(index == 3) {
      		this.oneL = this.fourL;
      	}
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
	padding: 0 0.4rem;
  }
  .problem_title_box {
    display: flex;
    justify-content: space-between;
    font-size: 0.35rem;
    padding: 0.27rem 0;
    border-bottom: 1px solid #ccc;
    margin-bottom: 0.13rem;
    .item {
	    background: #26a2ff;
	    color: #fff;
	    padding: 0.07rem;
    }
  }
  .problem_er_title {
  	font-size: 0.4rem;
  	color: #26a2ff;
    margin-bottom: 0.4rem;
  }
  .qa_box {
    font-size: 0.35rem;
  }
  .q_box {
  	margin-bottom: 0.15rem;
  	p:nth-child(1) {
  		margin-bottom: 0.13rem;
  	}
  }
</style>