<template>
	<div class="account">
		<mt-header title="个人中心" fixed class="w-header">
	      <i class="iconfont icon-shezhi" slot="right" v-touch:tap="toAccount"></i>
	    </mt-header>
		<div class="account-top">
			<div class="ava-box">
				<div class="pic">
					<img src="../assets/logo.png" alt="">
				</div>
				<span>{{ w_data.userRealStatus == 1? w_data.userReal:w_data.userPhone}}</span>
			</div>
			<div class="msg-wrap">
				<div class="msg-content">
					<span v-text="mList.realMoney">0</span>
					<span>可用金额(元)</span>
				</div>
				<div class="msg-content">
					<span v-text="mList.waitTotalMoney">0</span>
					<span>待收总额(元)</span>
				</div>
				<div class="msg-content">
					<span v-text="mList.haveInterest">0</span>
					<span>累计收益(元)</span>
				</div>
			</div>
		</div>
		<div class="account-middle">
			<mt-button plain @click="withdraw">提现</mt-button>
			<mt-button plain class="recharge" @click="recharge">充值</mt-button>
		</div>
		<div class="account-bottom">
			<router-link to="/account/property">
				<div class="item">
					<div>
						<i class="iconfont icon-zichan"></i>
						<span>资产明细</span>
					</div>
					<i class="iconfont icon-go"></i>
				</div>
			</router-link>
			<router-link to="/account/investmentRecord">
				<div class="item">
					<div>
						<i class="iconfont icon-wodetouzi"></i>
						<span>我的投资</span>
					</div>
					<i class="iconfont icon-go"></i>
				</div>
			</router-link>
			<router-link to="/account/coupon">
				<div class="item">
					<div>
						<i class="iconfont icon-youhuiquan"></i>
						<span>我的红包</span>
					</div>
					<i class="iconfont icon-go"></i>
				</div>
			</router-link>
			<router-link to="/account/capitalRecord">
				<div class="item">
					<div>
						<i class="iconfont icon-1202"></i>
						<span>资金记录</span>
					</div>
					<i class="iconfont icon-go"></i>
				</div>
			</router-link>
			<router-link to="/account/bank">
				<div class="item">
					<div>
						<i class="iconfont icon-yinhangqia"></i>
						<span>银行卡</span>
					</div>
					<i class="iconfont icon-go"></i>
				</div>
			</router-link>
			<div class="item">
				<div>
					<i class="iconfont icon-fuwurexian"></i>
					<span>服务热线</span>
				</div>
				<a href="tel:4008525717">400-8525-717</a>
			</div>
			<div class="item-end"></div>
		</div>
	</div>
</template>
<script>
  import api from '../api/api'
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
	        if(this.w_data.userId != null) {
	        	api.GetUserMoney(obj)
		        .then(res => {
		          this.mList = res.result;
		        })
		        .catch(err => {console.log(err)})
	        } 
	      },
    	withdraw() {
			if(this.w_data.userRealStatus != 1) {
    			this.tip('请先实名')
    		}else{
    			this.$router.push('/withdraw');
    		}
    	},
    	recharge() {
    		if(this.w_data.userRealStatus != 1) {
    			this.tip('请先实名')
    		}else{
    			this.$router.push('/recharge');
    		}
    	},
		thousands(num) {
        	num = num.toString();
	        if(/^-?\d+\.?\d+$/.test(num)){
	            if(/^-?\d+$/.test(num)){
	                num =num + ",00";
	            }else{
	                num = num.replace(/\./,',');
	            }
	            while(/\d{4}/.test(num)){
	                num = num.replace(/(\d+)(\d{3}\,)/,'$1,$2');
	            }
	            num = num.replace(/\,(\d*)$/,'.$1');
	        }
	        return num;
	    },
    	toAccount() {
    		this.$router.push('/account/personal');
    	},
    	tip(str) {
			this.$toast({
	          message: str,
	          position: 'middle',
	          duration: 1500
	        })
    	}
    },
    components: {
      
    }
  }
</script>
<style lang="scss" scoped>
	.item-end {
		min-height:0.5rem;
	}
	.account {
	    font-size: 0.37rem;
	    background: #eee;
	    margin-top: 1.45rem;
	    padding-bottom: 1.6rem;
	}
	.account-top {
	    min-height: 5.33rem;
        background: #fff;
        padding-top: 0.27rem;
        position: relative;
	}
	.ava-box {
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
		.pic {
		    width: 2.67rem;
		    height: 2.67rem;
		    margin-bottom: 0.2rem;
		    img {
		    	width:100%;
		    }
		}
	}
	.msg-wrap {
	    display: flex;
    	justify-content: space-around;
	    position: absolute;
	    bottom: 0.27rem;
	    width: 100%;
    	.msg-content {
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		    line-height: 0.6rem;
		    span:nth-child(1) {
		    	color: #26a2ff;
		    }
    	}
	}
	.account-middle {
	    display: flex;
    	justify-content: space-around;
		padding: 0.27rem 0;
	    margin: 0.35rem 0;
		background: #fff;
		.mint-button {
			font-size:0.4rem;
			padding: 0.13rem 1rem;
		    height: auto;
		}
		.mint-button--default.is-plain.recharge {
		    border: 1px solid #26a2ff;
		}
	}
	.account-bottom {
		background: #fff;
		min-height: 5.33rem;
		.item {
		    display: flex;
		    justify-content: space-between;
		   	padding: 0.35rem 0.4rem;
		    align-items: center;
		    border-bottom: 1px solid #ccc;
		    font-size: 0.4rem;
		    .iconfont {
		    	font-size: 0.5rem;
		    }
		}
	}
</style>