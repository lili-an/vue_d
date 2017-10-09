<template>
	<div class="list">
		<mt-header fixed title="理财" class="w-header">
	      <!-- <i class="iconfont icon-caidan" slot="left" @click="toogleShow"></i> -->
	    </mt-header>
	    <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" bottomPullText="上拉加载更多..." ref="loadmore" @bottom-status-change="handleBottomChange"> -->
	    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
		<div class="item" v-for="(item, index) in projectList" :key="index">
			<router-link :to="{ name: 'investmentDetail', params: { id: item.id }}">
			<div class="item-title">
				<i class="iconfont" :class="item.icon"></i>
				<h3 v-text="item.name"></h3>
			</div>
			<div class="item-content">
				<div class="content_">
					<span>{{ item.apr }}%<span v-show="item.actApr != 0" class="extra_apr">+{{ item.actApr == 0 ? '': item.actApr }}%</span> </span>
					<span>年化收益率</span>
				</div>
				<div class="content_">
					<span>{{time(item.timeLimitType,item.timeLimit)}}</span>
					<span>投资期限</span>
				</div>
				<div class="content_">
					<span>{{ item.account }}</span>
					<span>总金额</span>
				</div>
			</div>
			<div class="item-pro">
				<mt-progress :value="(item.accountYes*100-item.accountYes*100%item.account)/item.account" :bar-height="4"></mt-progress>
			</div>
			</router-link>
			<i class="iconfont icon-xinshou new_" v-show="item.type == 3"></i>
		</div>
		<div class="w_spinner">
			<mt-spinner type="fading-circle" :size="40" v-show="loadinging"></mt-spinner>
			<span v-show="nomore">没有更多了</span>
		</div>
		</div>
		<!-- </mt-loadmore> -->
	</div>
</template>
<script>
  import {Indicator, Loadmore} from 'mint-ui'
  import api from '../api/api'
  export default {
    data() {
      return {
        projectList: [],
        allLoaded: false,
        num: 1,
        loading: false,
        loadinging: false,
        nomore: false
      }
    },
    watch: {
      '$route': function () {
        
      }
    },
    mounted() {
      this.$nextTick(function() {
      	this.getProject();
      })
    },
    methods: {
      handleChange(index) {
        
      },
      loadMore() {
      	this.loadinging = true
		  setTimeout(() => {
		    this.num++
		    var projectObj = {
		          "type": "",
		          "status": "",
		          "pageSize": "10",
		          "pageNumber": this.num
		        }
		        api.ProtectList(projectObj).then(res => {
		          if(res.errMsg == 'SUCCESS') {
		          	this.loadinging = false
		          	for(var i=0; i<res.result.length;i++) {
		          		if(res.result[i].type == 0) {
		          			res.result[i].icon = 'icon-zichan2'
		          		}else if(res.result[i].type == 1) {
		          			res.result[i].icon = 'icon-gongyinglian'
		          		}else if(res.result[i].type == 2) {
		          			res.result[i].icon = 'icon-xinyong'
		          		}else if(res.result[i].type == 3) {
		          			res.result[i].icon = 'icon-weibiaoti2'
		          		}
			          }

		            this.projectList = this.projectList.concat(res.result);
		            if (res.result.length < 10) {
			          this.loading = true;
			          this.loadinging = false;
			          this.nomore = true;
			        }
		          }
		        }).catch(err => {console.log(err)})

		  }, 2500);
		},
      loadTop() {
		// this.$indicator.open();
		this.$refs.loadmore.onTopLoaded();
	  },
	  handleBottomChange(status) {
        this.bottomStatus = status;
      },
	  loadBottom() {	
		// this.$indicator.open();
		this.num += 1;
		if( this.num == 5 ) {
			this.allLoaded = true;
		}else{
			this.$refs.loadmore.onBottomLoaded()
		}	
	  },
	  getProject() {
        var projectObj = {
          "type": "",
          "status": "",
          "pageSize": "10",
          "pageNumber": this.num
        }
        api.ProtectList(projectObj).then(res => {
          if(res.errMsg == 'SUCCESS') {
          	// console.log(res)
          	for(var i=0; i<res.result.length;i++) {
          		if(res.result[i].type == 0) {
          			res.result[i].icon = 'icon-zichan2'
          		}else if(res.result[i].type == 1) {
          			res.result[i].icon = 'icon-gongyinglian'
          		}else if(res.result[i].type == 2) {
          			res.result[i].icon = 'icon-xinyong'
          		}else if(res.result[i].type == 3) {
          			res.result[i].icon = 'icon-weibiaoti2'
          		}
	          }

            this.projectList = this.projectList.concat(res.result);
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
      createTime(val) {//修改时间戳
        var value = parseInt(val+'000');
        var date = new Date(value);
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) 
                 +'.'+ (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
        return M;
      },
    },
    components: {
      
    }
  }
</script>
<style lang="scss" scoped>
	.list {
	    height: 100%;
    	background: #eee;
	    margin-top: 1.33rem;
		padding-bottom: 1.33rem;
	}
	.list::-webkit-scrollbar{
	  display: none;
	}
	.item {
		font-size: 0.37rem;
		padding: 0 0.13rem;
	    border-bottom: 1px solid #c1baba;
	    background: #fff;
	    margin-bottom: 0.2rem;
        position: relative;
		.iconfont {
			font-size: 0.37rem;
			color: #fc1515;
		}
		.iconfont.icon-zichan2 {
			color: #118bd5;
		}
		.iconfont.icon-xinyong {
			color: #e515fc;
		}
		.new_ {
		    position: absolute;
		    top: 0;
		    right: 0;
		    font-size: 1.17rem;
		    color: #1585fc;
		}
	}
	.item-title {
	    display: flex;
	    padding: 0.13rem 0;
   		h3 {
   			margin-left: 0.13rem;
   		}
	}
	.item-content {
	    display: flex;
    	justify-content: space-between;
	    padding: 0.27rem;
	}
	.content_ {
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	}
	.item-pro {
		padding: 0.27rem;
	}
	.extra_apr {
		font-size: 0.32rem;
	}
</style>