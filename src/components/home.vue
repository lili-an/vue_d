<template>
<div>
  <div v-show="!flag" class="home">
    <mt-header title="沃顿金服" fixed class="w-header">
      <!-- <i class="iconfont icon-caidan" slot="left" @click="toogleShow"></i> -->
    </mt-header>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in bannerList" :key="index">
        <img :src="item.pic" alt="" @click="checkBanner(item.orderNum, item.url, item.name)">
      </mt-swipe-item>
    </mt-swipe>
    <div class="exra_box">
      <div class="exra_item" v-for="(item, index) in itemList" :key="index" @click="checkThis(index, item.name)">
        <i class="iconfont" :class="item.icon"></i>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="item-box" v-touch:swipeleft="touchLeft" v-touch:swiperight="touchRight">
      <div class="item" v-for="(item, index) in projectList" :key="index">
         <div class="item-title">
           <i class="iconfont icon-liwu"></i>
           <span v-text="item.name"></span>
         </div>
         <div class="item-pro">
           <vue-circle
            :id="'circle'+item.id"
            :progress="(item.accountYes*100-item.accountYes*100%item.account)/item.account"
            :size="200"
            :reverse="false"
            line-cap="round"
            :fill="fill"
            empty-fill="rgba(0, 0, 0, .1)"
            :animation-start-value="0.0"
            :start-angle="0"
            insert-mode="append"
            :thickness="6"
            :inner-text="'预期年化收益'+item.apr+'%'"
            :show-percent="true"
            @vue-circle-progress="progress"
            @vue-circle-end="progress_end">
          </vue-circle>
         </div>
         <div class="item-content">
           <p>{{ item.lowAccount }}元起购</p>
           <p>融资金额{{ item.account }}元</p>
           <p>投资期限45天</p>
         </div>
         <div class="item-tip"><i class="iconfont icon-bao"></i><span>账户资金安全由新浪支付全程托管</span></div>
         <div class="item-buy"><a href="javascript:;" @click="goDetail(item.id)">立即购买</a></div>
      </div>
    </div>
  </div>
  <div v-show="flag" class="mif">
    <mt-header :title="wTitle" fixed class="w-header">
      <i class="iconfont icon-back" slot="left" v-touch:tap="goback"></i>
    </mt-header>
   <iframe :src="url" width="100%" height="100%" seamless frameborder="0" marginheight="0" marginwidth="0" id="acitity_iframe"></iframe>
  </div>
</div>
</template>
<script>
  import VueCircle from 'vue2-circle-progress'
  import { Indicator } from 'mint-ui';
  import api from '../api/api'
  export default {
    data() {
      return {
        n: 0,
        num: 1,
        fill: { gradient: ["#20a0ff"] },
        bannerList: [],
        projectList: [],
        url: '',
        wTitle: '',
        flag: false,
        flag1: false,
        itemList: [{
          'icon': 'icon-newhand',
          'name': '帮助中心'
        },{
          'icon': 'icon-safe',
          'name': '安全保障'
        },{
          'icon': 'icon-guanyuwomen',
          'name': '关于我们'
        },{
          'icon': 'icon-xinwen1',
          'name': '新闻资讯'
        }]
      };
    },
    watch: {
      '$route': function () {
        
      },
      flag: function() {
        if(this.flag) {
          this.iframeH()
        }
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.getBanner();
        this.getProject();

        setTimeout(function() {   
           var cir = document.getElementsByTagName('canvas');
          if(document.documentElement.clientWidth >= '1242' && cir.length != 0) {
            for( var i=0; i<cir.length; i++) {
              cir[i].style.width = "400px"
              cir[i].style.height = "400px"
            }
          } 
        },500) 
        
      })
    },
    methods: {
      progress(event,progress,stepValue){
        // console.log(stepValue);
      },
      progress_end(event){
        // console.log("Circle progress end");
      },
      checkBanner(num, url, name) {
        this.flag = true;
        this.wTitle = name;
        this.url = url
      },
      checkThis(index, name) {
        if(index == 0) {
          this.$router.push('/help')
        }else if(index == 1) {
          this.flag = true;
          this.wTitle = name;
          this.url = 'http://www.wodunjf.com/app/safe.html'
        }else if(index == 2) {
          this.flag = true;
          this.wTitle = name;
          this.url = 'http://www.wodunjf.com/app/about.html'
        }else if(index == 3) {
          this.$router.push('/media')
        }
      },
      goDetail(id) {
        this.$router.push('/investment/detail/'+id)
      },
      getBanner() {
        var obj = {
          "type": "1597865919278747654",
          "status": "0",
          "number": "5"
        }
        api.Banner(obj).then(res => {

          for(var i=0; i<res.result.length;i++) {
            res.result[i].pic = 'http://www.wodunjf.com'+res.result[i].pic
          }
          // console.log(res)
          this.bannerList = res.result;
        }).catch(err => {console.log(err)})
      },
      getProject() {
        var projectObj = {
          "type": "",
          "status": "1",
          "pageSize": "10",
          "pageNumber": this.num
        }
        api.ProtectList(projectObj).then(res => {
          if(res.errMsg == 'SUCCESS') {
            this.projectList = res.result;
          }
        }).catch(err => {console.log(err)})
      },
      touchLeft() {
        var el = document.getElementsByClassName('item-box')[0];
        var wh = document.documentElement.clientWidth;
        var leng = document.getElementsByClassName('item').length;
        if(this.n == leng-1) {
          return;
        }else {
          this.n++;
          el.style.transform = 'translateX(' + (-wh * this.n) + 'px)';
        }
        if(!this.flag1) {
            this.num++

            var projectObj = {
              "type": '',
              "status": "1",
              "pageSize": "10",
              "pageNumber": this.num
            }
            api.ProtectList(projectObj).then(res => {
              if(res.errMsg == 'SUCCESS') {

                this.projectList = this.projectList.concat(res.result);
                if(res.result.length < 10) {
                  this.flag1 = true;
                }
              }
            }).catch(err => {console.log(err)})
        }
        
      },
      touchRight() {
        var el = document.getElementsByClassName('item-box')[0];
        var wh = document.documentElement.clientWidth;
        if(this.n == 0) {
          return ;
        }else {
          this.n--
          el.style.transform = 'translateX(' + (-wh * this.n-1) + 'px)';
        }
      },
      createTime(val) {//修改时间戳
        var value = parseInt(val+'000');
        var date = new Date(value);
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) 
                 +'.'+ (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
        return M;
      },
      iframeH() {
        var ifm = document.getElementById("acitity_iframe");
        ifm.height = document.documentElement.clientHeight;
        Indicator.open({
          text: '玩命加载中',
          spinnerType: 'fading-circle'
        })
        ifm.onload = function() {
          Indicator.close();
        }
        setTimeout(function() {
          Indicator.close();
        }, 2000)
      },
      goback() {
        this.flag = false;
      }
    },
    components: {
      VueCircle,
    },
  }
</script>
<style lang="scss" scoped>
  .home {
    background: #eee;
    overflow: hidden;
    margin-top: 1.45rem;
  }
  .mint-swipe {
    height:5.33rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .exra_box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0.25rem 0;
    background: #fff;
    .exra_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.27rem 0;
      i {
        font-size:0.67rem;
      }
    }
  }
  .item-box {
    min-height: 5.33rem;
    background: #fff;
    padding: 0.4rem 0;
    margin-bottom: 1.33rem;
    display: -webkit-box;
    flex-wrap: nowrap;
    min-width: 200rem;
    transition: transform .4s ease;
    .item {
      border: 1px solid #eee;
      background: #eee;
      border-radius: 10px;
      margin: 0.4rem 0.6rem;
      padding: 0.27rem;
      width: 8.23rem;
    }
    .item-title {
      display: flex;
      align-items: center;
      span {
        margin-left: 0.2rem;
      }
      .iconfont {
        font-size: 0.35rem;
        color: #20a0ff;
      }
    }
    .item-pro {
      display: flex;
      justify-content: center;
      margin: 0.2rem 0;
    }
    .item-content {
      display: flex;
      justify-content: space-around;
      margin-bottom: 0.2rem;
    }
    .item-tip {
      display: flex;
      justify-content: center;
      margin-bottom: 0.13rem;
      color: #7d7d7d;
      span {
        margin-left: 0.2rem;
      }
      .iconfont {
        font-size: 0.4rem;
        color: #20a0ff;
      }
    }
    .item-buy {
      display: flex;
      justify-content: center;
      a {
        padding: 0.2rem 1.33rem;
        border: 1px solid #20a0ff;
        background: #20a0ff;
        color: #fff;
      }
    }
  }
  .mif {
    margin-top: 1.45rem;
    padding-bottom: 1.45rem;
  }
</style>