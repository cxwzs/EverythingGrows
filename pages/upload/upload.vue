<template>
	<view class="container" :class="iPhoneX?'_iPhoneX':'paddingTabbar'">
		
	</view>
</template>

<script>
	import tabbar from '@/common/mixin'
	export default {
		data() {
			return {
				iPhoneX: getApp().globalData.iPhoneX, //兼容iPhone X 当前设备是否是iPhone X
			};
		},
		mixins: [tabbar],
		onShow() {
			this.setTabBarIndex(2)
		},
	}
</script>

<style lang="scss">

</style>
