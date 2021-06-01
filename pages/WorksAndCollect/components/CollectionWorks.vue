<template>
	<view class="container" v-if="item">
		<view class="item" @click="toDetail(item.works_id)">
			<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
			<view class="item-pic">
				<u-image width="100%" height="100%" mode="aspectFill" :src="item.image"></u-image>
				<!-- <image :src="item.image" mode="aspectFill"></image> -->
			</view>
			<view class="item-content">
				<view class="item-content-left">
					<view class="item-content-left-tx">
						<u-image width="100%" height="100%" border-radius="50%" :src="item.avatar"></u-image>
						<!-- <image :src="item.avatar" mode="aspectFill"></image> -->
					</view>
					<view class="item-content-left-nr">
						<view class="item-content-left-nr-name">
							{{item.nickname}}
						</view>
						<view class="item-content-left-nr-detail">
							{{item.age}}{{item.member_address?'，':''}}{{item.member_address}}
						</view>
					</view>
				</view>
				<view class="item-content-right">
					<u-icon :name="item.works_collection_status==1?'heart-fill':'heart'" :color="item.works_collection_status==1?'#FF3847':'#999'"
					 size="24"></u-icon>
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
			// 作品数据
			item: {
				type: Object,
				default: {}
			}
		},
		methods:{
			// 跳转到 详情
			toDetail(id) {
				uni.navigateTo({
					url:'/pages/WorksDetail/WorksDetail?id=' + id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		margin-top: 20rpx;
		width: 324rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 2rpx solid #E5E5E5;
		border-radius: 20rpx;
		overflow: hidden;

		&-pic {
			width: 100%;
			height: 340rpx;
		}

		&-content {
			width: 100%;
			height: 110rpx;
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
					width: 54rpx;
					height: 54rpx;

					>image {
						border-radius: 50%;
					}
				}

				&-nr {
					width: 70%;
					height: 54rpx;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: space-between;

					&-name {
						width: 100%;
						font-size: 22rpx;
						color: #333333;
						font-weight: 600;
						@include text-hidden-line(1);
					}

					&-detail {
						width: 100%;
						font-size: 16rpx;
						color: #666666;
						font-weight: 400;
						@include text-hidden-line(1);
					}
				}
			}

			&-right {
				height: 54rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;

				>view {
					font-size: 16rpx;
					color: #999999;
					font-weight: 400;
				}
			}
		}
	}
</style>
