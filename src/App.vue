<template>
  <div id="app">
    <!-- <w-header :wTitle="title" @pToogleShow="popupVisible = !popupVisible"></w-header> -->
    <!-- <w-left-nav :popupVisible="popupVisible"></w-left-nav> -->
    <!-- <transition name="slide-fade"> -->
	<router-view></router-view>
 	<!-- </transition>  -->
    <w-footer></w-footer>
  </div>
</template>

<script>
import wFooter from '@/components/little/footer'
import wHeader from '@/components/little/header'
import wLeftNav from '@/components/little/leftNav'
export default {
  name: 'wodunjinfu',
  data() {
	  return {
	    title: '沃顿金服',
	    popupVisible: false
	  };
	},
	watch: {
	  '$route': function () {
	  	
	  }
	},
	mounted() {
	  this.$nextTick(function() {

	  })
	},
 	methods: {

  },
  components: {
  	wFooter,
  	wHeader,
  	wLeftNav
  }
}
</script>

<style lang="scss">
  @import './assets/scss/main.scss';
</style>
