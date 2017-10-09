<template>
	<div>
		<div v-show="!isBuy" class="list">
			<div class="list_top">
				<!-- <div class="list_top_title">
					<i class="iconfont icon-back" v-touch:tap="goback"></i>
					<h3 v-text="detailList.name"></h3>
				</div> -->
				<mt-header :title="detailList.name" fixed class="w-header">
			      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
			    </mt-header>
				<p class="text_1">{{detailList.apr}}%<span v-show="detailList.actApr != 0" class="extra_apr">+{{ detailList.actApr == 0 ? '': detailList.actApr }}%</span></p>
				<p class="text_2">预期年化收益率</p>
			</div>
			<div class="list_middle">
				<div class="list_middle_box">
					<div class="middle_top">
						<div class="m_item">
							<span>{{time(detailList.type,detailList.timeLimit)}}</span>
							<i>投资期限</i>
						</div>
						<div class="m_item">
							<span>{{detailList.account}}元</span>
							<i>融资金额</i>
						</div>
						<div class="m_item">
							<span>{{detailList.lowAccount}}元</span>
							<i>起投金额</i>
						</div>
					</div>
					<div>
						<mt-progress :value="(detailList.accountYes*100-detailList.accountYes*100%detailList.account)/detailList.account" :bar-height="8"></mt-progress>
					</div>
					<p class="m_tip">当前进度{{(detailList.accountYes*100-detailList.accountYes*100%detailList.account)/detailList.account}}% 剩余可投金额<span> {{ detailList.account - detailList.accountYes }} </span>元</p>
				</div>
			</div>
			<div class="list_bottom">
				<div class="bottom_item">
					<div class="bottom_i">
						<span class="i_left">还款方式</span>
						<span class="i_right">到期还本息</span>
					</div>
					<div class="bottom_i">
						<span class="i_left">计息方式</span>
						<span class="i_right">募集日+1</span>
					</div>
					<!-- <div class="bottom_i">
						<span class="i_left">到期时间</span>
						<span class="i_right">2017-09-12</span>
					</div> -->
				</div>
				<div class="bottom_item">
					<div class="bottom_i" v-for="(item,index) in dTxt" :key="item" @click="checkT(index)">
						<span>{{ item }}</span>
						<i class="iconfont icon-go"></i>
					</div>
					<!-- <div class="bottom_i">
						<span>风险提示</span>
						<span>理财有风险，投资需谨慎</span>
					</div> -->
				</div>
				<button type="button" class="now_buy" @click="goBuy">立即投资</button>	
			</div>
		</div>
		<div class="buyNow" v-show="isBuy">
		    <mt-header title="立即投资" class="w-header">
		      <i class="iconfont icon-back" slot="left" v-touch:tap="goback1"></i>
		    </mt-header>
		    <div class="m_box">
		      <div v-show="!flag" class="box_1">
		        <div class="checkMoney">
		          <p>投资金额：</p>
		          <div>
		            <input type="text" v-model="money" placeholder="请输入投资金额">元
		          </div>
		        </div>
		        <div class="checkCard" @click="showC">
		          <p>优惠券：</p>
		          <p>
			          <span>{{checkM}}</span>
			          <i class="iconfont icon-go"></i>
		          </p>
		        </div>
		        <router-link to="/agreement">
		        	<p class="sxf_">*我已经同意<span>《沃顿金服用户协议》</span></p>
		        </router-link>
		        <mt-popup
		          v-model="popupVisible1"
		          position="bottom">
		          <div class="coupon_box">
		            <div v-show='!isEmpty' class="m_item" v-for="(item, index) in couponList" :key="index" @click="checkCoupon(item.awardId,item.money)">
		              <div class="m_left">
		                <p class="m_n">{{ item.name }}</p>
		                <span>满{{ item.lowAccount }}可用</span>
		                <span>生效日期{{ getDate(item.getTime,'yyyy-MM-dd') }}</span>
		                <span>有效期至{{ getDate(item.endTime,'yyyy-MM-dd') }}</span>
		              </div>
		              <div class="m_right">
		                <p>{{ item.money }}元</p>
		              </div>
		            </div>
		            <div v-show='isEmpty' class="m_item">
		              空空如也...
		            </div>
		          </div>
		        </mt-popup>
		        <button type="button" class="sure" @click="gobuyNow(detailList.id)">立即投资</button>
		      </div>
		      <div v-show="flag" style="height:1000px">
		        <iframe width="100%" height="100%" seamless frameborder="0" :srcdoc="wHtml"></iframe>
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
      	detailList: {},
      	flag: false,
      	flag1: true,
      	isBuy: false,
      	popupVisible1: false,
      	isEmpty: false,
      	wHtml: '',
      	money: '',
      	w_data: '',
      	couponList: [],
      	checkM: '0元',
      	checkCouponId: '',
      	dTxt: ['项目详情', '相关协议', '投资记录']
      };
    },
    watch: {
      '$route': function () {
        
      },
      money: function() {
      	this.flag1 = true;
      	this.couponList = [];
      	this.checkM = '0元';
      	this.checkCouponId = '';
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
        }else{
          this.w_data = a;
        }       
      }
    },
    methods: {
      getDetail() {
      	var id = this.$route.params.id;
      	var params = {'projectId':id}
      	api.ProtectDetail(params)
      	.then(res => {
      		if(res.errMsg == 'SUCCESS') {
      			// console.log(res)
	            this.detailList = res.result;
	          }
      	}).catch(err => {console.log(err)})
      },
      time(type,limit) {
      	if(type == 0) {
      		return limit+'个月'
      	}else if(type == 1) {
      		return limit+'天'
      	}
      },
      goBuy() {
      	this.isBuy = !this.isBuy;
      },
      gobuyNow(id) {
      	var obj = {
          'userId': this.w_data.userId,
          'projectId': id,
          'money': this.money,
          'awardId': this.checkCouponId
        };
        if(!(/^[0-9]*$/).test(this.money) || this.money == '') {
        	this.toast('请输入正确的金额')
        }else{
        	api.Order(obj)
	        .then(res => {
	          if(res.errMsg == 'SUCCESS') {
	            this.flag = !this.flag;
	            this.wHtml = res.result.form;
	          }else{
	          	this.toast(res.errMsg)
	          }
	        })
	        .catch(err => {console.log(err)})
        }     
      },
      showC() {
      	this.popupVisible1 = !this.popupVisible1;
      	this.couponList = []
      	this.isEmpty = false;
      	if(this.flag1){
      		this.getCoupon();
      	}
      },
      checkCoupon(id, money) {
      	this.checkM = '已选择'+money+'元红包';
      	this.checkCouponId = id;
      	this.popupVisible1 = !this.popupVisible1;
      },
      getCoupon() {
        var obj = {
          'userId': this.w_data.userId,
          'projectId': '',
          'money': '1'
        };
        api.Coupon(obj)
        .then(res => {
          for(var i=0; i<res.result.length; i++) {
            if(res.result[i].status == 0 && this.money >= res.result[i].lowAccount) {
              this.couponList.push(res.result[i])
            }
          }
          if(this.couponList.length == 0) {
            this.isEmpty = true;
          }
          this.flag1 = true;
        })
        .catch(err => {console.log(err)})
      },
      checkT(index) {
      	var id = this.$route.params.id;
      	localStorage.setItem('pid',id);
      	if(index == 0) {
			this.$router.push('/project/detail')
      	}else if(index == 1) {
      		this.$router.push('/project/agreement')
      	}else if(index == 2) {
      		this.$router.push('/project/record')
      	}
      },
      goback() {
      	this.$router.push('/investment')
      },
      goback1() {
      	this.isBuy = !this.isBuy;
      	this.flag = false;
      },
      toast(str) {
      	this.$toast({
	        message: str,
	        position: 'middle',
	        duration: 1500
	      })
      },
      getDate(val,fmt) { 
        if (!val) {
           return '';
        }
        if (val && val.length == 10) {
           val = parseInt(val+'000');
        }
        var date = new Date(val);
        var o = {   
            "M+" : date.getMonth()+1,                 //月份   
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时   
            "m+" : date.getMinutes(),                 //分   
            "s+" : date.getSeconds(),                 //秒   
            "q+" : Math.floor((date.getMonth()+3)/3), //季度   
            "S"  : date.getMilliseconds()             //毫秒   
        };   
        if(/(y+)/.test(fmt))   
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
        for(var k in o)   
            if(new RegExp("("+ k +")").test(fmt))   
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
        return fmt;   
      },
    },
    components: {
      
    }
  }
</script>
<style lang="scss" scoped>
	.list {
		margin-top: 1.4rem;
	    padding-bottom: 1.6rem;
	}
	.list_top {
	    min-height: 2.67rem;
	    background: #26a2ff;
	    padding: 0.4rem;
	    color: #fff;
	    .text_1 {
		    text-align: center;
		    font-size: 0.48rem;
		    margin-bottom: 0.4rem;
	    }
	    .text_2 {
		    text-align: center;
		    font-size: 0.4rem;
		    margin-bottom: 0.67rem;
	    }
	}
	.list_top_title {
	    display: flex;
	    justify-content: center;
	    margin-bottom: 0.67rem;
	    .iconfont {
	    	font-size: 0.4rem;
	    }
	    h3 {
    	    flex: 1;
		    text-align: center;
		    font-size: 0.43rem;
		    padding-right: 0.4rem;
	    }
	}
	.list_middle {
		background: #eee;
    	padding: 0 0.53rem;
	}
	.list_middle_box {
	    border: 1px solid #eee;
	    background: #fff;
	    padding: 0.4rem;
	    font-size: 0.37rem;
	    position: relative;
	    top: -0.47rem;
	    .m_tip {
    	    text-align: center;
    		margin: 0.2rem 0;
    		span {
			    color: #26a2ff;
    		}
	    }
	}
	.middle_top {
	    display: flex;
	    justify-content: space-around;
	    margin-bottom: 0.2rem;
	    .m_item {
    	    display: flex;
		    flex-direction: column;
		    align-items: center;
		    span {
	    	    color: #26a2ff;
    			margin-bottom: 0.24rem;
		    }
		    i {
	    	    font-style: normal;
		    }
	    }
	}
	.list_bottom {
	    font-size: 0.37rem;
    	background: #eee;
	}
	.bottom_item {
		background: #fff;
   		padding: 0 0.53rem;
	    margin-bottom: 0.3rem;
   		.bottom_i {
		    display: flex;
		    justify-content: space-between;
		    padding: 0.33rem 0;
		    border-bottom: 1px solid #dbd9d9;
		    .iconfont {
		    	font-size: 0.4rem;
		    }
		    .i_right {
		    	color: #a19f9f;
		    }
   		}
   		.bottom_i:nth-last-child(1) {
   			border-bottom: none;
   		}
	}
	.now_buy {
	    width: 100%;	
	}
	.now_buy, .sure {
	    padding: 0.2rem 1.33rem;
	    border: 1px solid #20a0ff;
	    background: #20a0ff;
	    color: #fff;
	    display: block;
	    margin: 0 auto;
        font-size: 0.45rem;
	}

  .checkMoney {
    margin-bottom: 0.27rem;
  }
  .checkCard, .checkMoney {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0.27rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #e3e0e0;
    input {
      border: none;
      text-align: right;
      padding-right: 0.53rem;
    }
    .iconfont {
    	font-size: 0.45rem;
    }
  }
  .sxf_ {
    padding: 0.4rem 0.27rem;
    margin-bottom: 0.67rem;
    span {
    	color: #fd2424;
    }
  }
  .box_1 {
    padding-top: 0.53rem;
  }
.coupon_box {
    max-height: 6.67rem;
    overflow: auto;
	.m_item {
	    padding: 0.33rem 0.4rem;
	    font-size: 0.38rem;
	    color: #666;
	    border-bottom: 1px solid #b9b6b6;
	    display: flex;
	    justify-content: center;
	    .m_left {
	      display: flex;
	      flex-direction: column;
	      flex: 1;
	      p , span{
	        padding: 0.07rem;
	      }
	      .m_n {
	        background: #da0303;
	        color: #fff;
	        border-radius: 20px;
	        width: max-content;
	      }
	    }
	    .m_right {
	      width: 30%;
	      display: flex;
	      justify-content: center;
	      align-items: center;
	      background: #da0303;
	      color: #fff;
	    }
	}
}
.coupon_box::-webkit-scrollbar{
  display: none;
}
.extra_apr {
	font-size: 0.32rem;
}
</style>