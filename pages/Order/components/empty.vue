<template>
	<view class="container">
		<view class="empty">
			<view class="empty-img">
				<image src="/static/img/img_29.png" mode=""></image>
			</view>
			<text>暂无订单记录</text>
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
	.empty{
		position: fixed;
		z-index: -1;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		&-img{
			width: 550rpx;
			height: 300rpx;
		}
		>text{
			font-size: 28rpx;
			color: #999999;
			font-weight: 400;
		}
	}
</style>
