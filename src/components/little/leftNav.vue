<template>
	<div>
		<mt-popup
		  v-model="popupVisible"
		  position="left"
		  class="w-left-nav">
		  <mt-cell title="标题" label="描述信息" is-link></mt-cell>
		  <mt-cell title="标题" label="描述信息" is-link></mt-cell>
		  <mt-cell title="标题" label="描述信息" is-link></mt-cell>
		  <mt-cell title="标题" label="描述信息" is-link></mt-cell>
		</mt-popup>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				// popupVisible: false
			}
		},
		props: ['popupVisible']
	}
</script>