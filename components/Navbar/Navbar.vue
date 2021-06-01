<template>
	<view class="container">
		<u-navbar :is-back="is_back" :title="title"></u-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props:{
			is_back:{
				type:Boolean
			},
			title:{
				type:String,
				default:'万物生长'
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
