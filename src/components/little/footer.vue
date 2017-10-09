<template>
	<div class="footer">
		<div class="footer-item">
			<router-link to="/">
			  <i class="iconfont icon-shouye"></i>
			  <span>首页</span>
			</router-link>
		</div>
		<div class="footer-item">
			<router-link to="/investment">
			  <i class="iconfont icon-touzi"></i>
			  <span>理财</span>
			</router-link>
		</div>
		<div class="footer-item">
			<router-link to="/activity">
			  <i class="iconfont icon-huodong"></i>
			  <span>活动</span>
			</router-link>
		</div>
		<div class="footer-item">
			<router-link to="/account">
			  <i class="iconfont icon-wode"></i>
			  <span>我的</span>
			</router-link>
		</div>      
	</div>
</template>
<script>
	export default {
	    data() {
	      return {
	      	currentP: '',
	        active: 'c_active'
	      };
	    },
	    watch: {
	      '$route': function () {
	      
	      }
	    },
	    mounted() {
	      this.$nextTick(function() {
	      	// console.log(this.$router)
	      })
	    },
	    methods: {
	      handleChange(index) {
	        
	      },
	    },
	    components: {
	      
	    }
 	 }
</script>
<style lang="scss"> 
	.footer {
	    position: fixed;
	    bottom: 0;
	    width: 100%;
	    background: #efeded;
	    display: flex;
	    justify-content: space-around;
	    align-items: center;
        z-index: 2;
	    .footer-item a {
	      display: flex;
	      flex-direction: column;
	      align-items: center;
	      padding: 0.13rem 0;
	      i {
	        font-size:0.67rem;
	      }
	    }
	  }
</style>