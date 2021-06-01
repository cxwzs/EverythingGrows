<template>
	<view class="container">
		<view class="item" @click="toDetail(item.id)">
			<view class="item-img">
				<u-image width="100%" height="100%" mode="aspectFill" :src="item.image"></u-image>
			</view>
			<view class="item-text">
				<view class="item-text-left">
					<view class="item-text-left-tx">
						<u-image width="100%" height="100%" border-radius="50%" :src="item.avatar"></u-image>
					</view>
					<view class="item-text-left-nr">
						<view class="item-text-left-nr-name">
							{{item.nickname}}
						</view>
						<view class="item-text-left-nr-detail">
							{{item.age}}{{item.member_address?'，':''}}{{item.member_address}}
						</view>
					</view>
				</view>
				<view class="item-text-right">
					<u-icon :name="item.works_collection_status==1?'heart-fill':'heart'" :color="item.works_collection_status==1?'#FF3847':'#999'" size="24"></u-icon>
					<view>{{item.works_collection_zong}}</view>
				</view>
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
				type: [String, Number]
			},
			item: {
				type: Object
			}
		},
		methods:{
			// 跳转到 详情
			toDetail(id) {
				uni.navigateTo({
					url:'/pages/WorksDetail/WorksDetail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		width: 280rpx;
		height: 352rpx;
		// background-color: #F1FFFA;
		margin-left: 30rpx;
		border: 2rpx solid #E5E5E5;
		// border-radius: 20rpx;
		overflow: hidden;
		display: flex;
		flex-shrink: 0;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;

		&-img {
			width: 100%;
			height: 260rpx;
		}

		&-text {
			width: 100%;
			height: 92rpx;
			padding: 0 15rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-left {
				width: 80%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				&-tx {
					width: 48rpx;
					height: 48rpx;
				}

				&-nr {
					width: 70%;
					height: 48rpx;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: space-between;

					&-name {
						width: 100%;
						font-size: 20rpx;
						color: #333333;
						font-weight: 600;
						@include text-hidden-line(1);
					}

					&-detail {
						width: 100%;
						font-size: 14rpx;
						color: #666666;
						font-weight: 400;
						@include text-hidden-line(1);
					}
				}
			}

			&-right {
				height: 48rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;

				>view {
					font-size: 14rpx;
					color: #999999;
					font-weight: 400;
				}
			}
		}
	}
</style>
