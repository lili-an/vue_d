<template>
	<div class="personal_information">
		<mt-header title="设置" fixed class="w-header">
	      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
  	    </mt-header>
		<div class="information">
			<div class="item" @click="uploadA">
				<span>头像</span>
				<div class="ava_">
					<img src="../../assets/logo.png" alt="">
					<i class="iconfont icon-go"></i>
				</div>
			</div>
		</div>
		<div class="information">
			<mt-popup
			  v-model="popupVisible"
			  position="top"
			  class="w_pop">
			  <mt-field label="真实姓名：" placeholder="请输入真实姓名" v-model="userReal"></mt-field>
			  <mt-field label="身份证号：" placeholder="请输入身份证号" v-model="userCard"></mt-field>
			  <button type="button" class="sure" @click="sure">确定</button>
			</mt-popup>
			<div class="item">
				<span>账户信息</span>
				<span>{{ w_data.userRealStatus == 1? w_data.userReal:w_data.userPhone}}</span>
			</div>
			<div class="item" @click="userCheck">
				<span>实名认证</span>
				<span>{{ w_data.userRealStatus == 1? '认证通过':'现在去认证'}}</span>
			</div>
			<div class="item" @click="userCheck">
				<span>身份证</span>
				<span>{{ w_data.userRealStatus == 1? card:'现在去认证'}}</span>
			</div>
		</div>
		<div class="information">
			<div class="item" @click="passwordCheck">
				<span>修改登录密码</span>
				<i class="iconfont icon-go"></i>
			</div>
			<mt-popup
			  v-model="popupVisible2"
			  position="top"
			  class="w_pop">
			  <mt-field label="旧密码：" placeholder="请输入原登录密码" v-model="password"></mt-field>
			  <mt-field label="新密码：" placeholder="请输入新登录密码" v-model="newPassword"></mt-field>
		      <mt-field label="确认密码：" placeholder="请确认新登录密码" v-model="repeatPassword"></mt-field>
			  <button type="button" class="sure" @click="sureChange">确定</button>
			</mt-popup>
			<div class="item" @click="changePayPass">
				<span>设置交易密码</span>
				<i class="iconfont icon-go"></i>
			</div>
		</div>
		<div class="information">
			<div class="item">
				<span>联系我们</span>
				<a href="tel:4008525717">400-8525-717</a>
			</div>
			<div class="item" @click="feed">
				<span>意见反馈</span>
				<i class="iconfont icon-go"></i>
			</div>
			<div class="item">
				<span>版本信息</span>
				<span>1.0.3</span>
			</div>
		</div>
		<button type="button" class="logout" @click="logout">退出登录</button>
	</div>
</template>
<script>
  import api from '../../api/api'
  export default {
    data() {
      return {
      	w_data: {},
      	popupVisible: false,
      	popupVisible2: false,
      	userReal: '',
      	userCard: '',
      	password: '',
      	newPassword: '',
      	repeatPassword: '',
      	card: ''
      };
    },
    watch: {
      '$route': function () {
        
      }
    },
    mounted() {
      this.$nextTick(function() {
      	if(this.w_data.userCard != null) {
			this.card = this.w_data.userCard.substr(0,4)+"*****"+this.w_data.userCard.substr(14);
      	}
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
				// localStorage.w_data = JSON.stringify(this.w_data)
			}   		
		}
    },
    methods: {
    	uploadA() {
    		this.tip('功能测试中');
    	},
    	sure() {
    		var obj = {
    			'userId': this.w_data.userId,
    			'userReal': this.userReal,
    			'userCard': this.userCard
    		}
    		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
    		if(this.userReal == '') {
    			if(this.w_data.userRealStatus != 1) {
    				this.tip('姓名不能为空');
    			}
    		}else if(reg.test(this.userCard) === false) {
    			if(this.w_data.userRealStatus != 1) {
    				this.tip('身份证号不合法');
    			}
    		}else{
    			api.Real(obj)
	    		.then(res => {
	    			if(res.errMsg == 'SUCCESS') {
	    				var ind = this.$toast({
				          message: '实名认证成功',
				          position: 'middle',
				          duration: 1500
				        })
	    				this.popupVisible = !this.popupVisible;
	    				this.w_data.userReal = this.userReal;
	    				this.w_data.userCard = this.userCard;
	    				this.w_data.userRealStatus = 1;
	    				localStorage.w_data = JSON.stringify(this.w_data);
	    				setTimeout(function() {
	    					ind.close();
	    					window.location.reload();
	    				},1000)
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
    	sureChange() {
    		var obj = {
    			'userId': this.w_data.userId,
    			'password': this.password,
    			'newPassword': this.newPassword
    		}
    		var reg = /^[a-zA-Z0-9]{7,20}$/;  
    		if(this.password == ''){
    			this.tip('原密码不能为空')
    		}else if(!reg.test(this.password) || !reg.test(this.newPassword)) {
    			this.tip('请输入7-20位字母和数字组合的密码');
    		}else if(this.repeatPassword != this.newPassword) {
    			this.tip('两次密码输入不一致')
    		}else{
    			api.ChangePassword(obj)
	    		.then(res => {
	    			if(res.errMsg == 'SUCCESS') {
	    				this.tip('修改成功')
	    				this.popupVisible2 = !this.popupVisible2;
	    			}else{
	    				this.tip(res.errMsg)
	    			}
	    		})
	    		.catch(err => {console.log(err)})
    		}
    	},
    	changePayPass() {
    		if(this.w_data.userRealStatus != 1) {
	            this.tip('请先实名');
	          }else{
	          	this.$router.push('/changePayPass')
	          }
    	},
    	userCheck() {
    		if(this.w_data.userRealStatus != 1) {
    			this.popupVisible = !this.popupVisible;
    		}	
    	},
    	passwordCheck() {
			this.popupVisible2 = !this.popupVisible2;
    	},
    	feed() {
    		if(this.w_data.userRealStatus != 1) {
    			this.tip('请先实名');
    		}else{
    			this.$router.push('/feedback')
    		}
    	},
    	tip(str) {
			this.$toast({
	          message: str,
	          position: 'middle',
	          duration: 1500
	        })
    	},
    	subStr(str) {
    		return str.substr(0,3)+"*****"+str.substr(8);
    	},
    	logout() {
    		localStorage.removeItem('w_data');
    		localStorage.removeItem('pid');
    		this.$toast({
	          message: '退出成功',
	          position: 'middle',
	          duration: 1500
	        })
    		setTimeout(function() {
    			window.location.reload();
    		}, 800)
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
	.personal_information {
		margin-top: 1.45rem;
	    margin-bottom: 1.45rem;
	    background: #eee;
	}
	.logout {
        padding: 0.3rem 1.33rem;
	    border: 1px solid #20a0ff;
	    background: #20a0ff;
	    color: #fff;
	    display: block;
	    margin: 0 auto;
	    width: 100%;
	}
	.sure {
		padding: 0.2rem 1.33rem;
	    border: 1px solid #20a0ff;
	    background: #20a0ff;
	    color: #fff;
	    display: block;
	    margin: 0.5rem auto;
	}
	.information {
		font-size: 0.4rem;
    	padding: 0 0.4rem;
    	margin-bottom: 0.4rem;
	    background: #fff;
    	.item {
		    display: flex;
		    justify-content: space-between;
	        align-items: center;
		    padding: 0.35rem 0;
		    border-bottom: 1px solid #ccc;
		    .iconfont {
		    	font-size: 0.5rem;
		    }
    	}
    	.item:nth-last-child(1) {
    		border-bottom: none;
    	}
    	.ava_ {
		    display: flex;
    		align-items: center;
    		img {
    			width: 0.8rem;
    		}
    	}
	}
</style>