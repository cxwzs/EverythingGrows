<template>
	<view class="container">
		<view class="item" :style="index===0?'border-top:none;':'border-top:2rpx solid #F8F8FC;'" @click="toDetail(item.id)">
			<view class="item-title">
				{{item.title}}
			</view>
			<view class="item-img" v-if="item.image.length!=0">
				<view class="item-img-item" v-for="(itemIMG,indexIMG) in item.image" :key="indexIMG">
					<u-image width="100%" height="100%" :src="itemIMG.abs_url"></u-image>
				</view>
			</view>
			<view class="item-text">
				<!-- <view class="item-text-left">
					<view class="item-text-left-tips" v-if="item.name">
						{{item.name}}社区
					</view>
					<text>999评论</text>
				</view> -->
				<text>{{item.add_time}}</text>
			</view>
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
			index: {
				type: [Number, String]
			},
			item: {
				type: Object
			}
		},
		methods: {
			// 跳转到详情
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/ArticleDetail/ArticleDetail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		width: 100%;
		padding: 30rpx 0;

		&-title {
			width: 100%;
			text-align: justify;
			font-size: 30rpx;
			color: #333333;
			font-weight: 600;
			line-height: 1.5;
		}

		&-img {
			width: 100%;
			display: flex;
			align-items: center;
			flex-wrap: wrap;

			&-item {
				width: 214rpx;
				height: 214rpx;
				margin-right: 24rpx;
				margin-top: 30rpx;
			}

			&-item:nth-of-type(3n+3) {
				margin-right: 0;
			}
		}

		&-text {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 30rpx;

			text {
				font-size: 22rpx;
				color: #A2A8A6;
				font-weight: 400;
			}

			&-left {
				display: flex;
				align-items: center;

				>view {
					width: 103rpx;
					height: 36rpx;
					background: rgba(0, 170, 255, 0.1);
					border-radius: 4rpx;
					text-align: center;
					line-height: 36rpx;
					font-size: 20rpx;
					color: #00AAFF;
					font-weight: 400;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
