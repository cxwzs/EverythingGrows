<template>
	<view class="container">
		<view class="menu" @click="toAgreement(3,'服务协议')">
			<view>服务协议</view>
			<u-icon name="arrow-right" color="#999999" size="32"></u-icon>
		</view>
		<view class="menu" @click="toAgreement(1,'用户协议')">
			<view>用户协议</view>
			<u-icon name="arrow-right" color="#999999" size="32"></u-icon>
		</view>
		<view class="menu" @click="toAgreement(2,'隐私协议')">
			<view>隐私协议</view>
			<u-icon name="arrow-right" color="#999999" size="32"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			// 查看协议
			toAgreement(type, title) {
				uni.navigateTo({
					url: '/pages/Rule/Rule?type=' + type + '&title=' + title
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F6F4F4;
	}
</style>

<style lang="scss" scoped>
	.menu {
		width: 100%;
		height: 104rpx;
		padding: 0 40rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2rpx;

		>view {
			font-size: 30rpx;
			color: #333333;
			font-weight: 400;
		}
	}
</style>
