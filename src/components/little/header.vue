<template>
	<div>
		<mt-header :title="wTitle" class="w-header">
	    	<i class="iconfont icon-caidan" slot="left" @click="toogleShow"></i>
	    </mt-header>
	</div>
</template>

<script>

export default {
  data() {
	  return {
	  };
	},
	methods: {
	    toogleShow() {
	        this.$emit('pToogleShow');
	    }
	},
	props:['wTitle']
}
</script>

<style lang="scss