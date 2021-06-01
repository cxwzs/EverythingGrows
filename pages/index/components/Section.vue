<template>
	<view class="container">
		<view class="title">
			<view class="title-left">
				<view></view>
				<text>{{title}}</text>
			</view>
			<text @click="toMore">查看更多</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			title: {
				type: String
			},
			toPage: {
				type: String
			}
		},
		methods: {
			// 查看更多
			toMore() {
				uni.navigateTo({
					url: this.toPage
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		width: 100%;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		>text {
			font-size: 26rpx;
			color: #999999;
			font-weight: 400;
		}

		&-left {
			display: flex;
			align-items: center;

			>view {
				width: 8rpx;
				height: 36rpx;
				background: #77C800;
				border-radius: 4rpx;
				margin-right: 15rpx;
				margin-top: 2rpx;
			}

			>text {
				font-size: 34rpx;
				color: #333333;
				font-weight: 600;
			}
		}
	}
</style>
