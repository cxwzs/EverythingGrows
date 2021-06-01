<template>
	<view class="container">
		<view class="content">
			<text>暂无数据</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #666;
	}
</style>
