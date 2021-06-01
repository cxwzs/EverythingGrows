<template>
	<view class="container" v-if="details">
		<!-- 地址 -->
		<view class="address">
			<!-- 有地址 -->
			<view class="address-yes">
				<u-icon name="map" color="#77C881" size="48"></u-icon>
				<view class="address-yes-content">
					<view class="address-yes-content-name">
						{{details.contacts}} {{details.mobile}}
					</view>
					<view class="address-yes-content-nr">
						{{details.province_name+details.city_name+details.district_name+details.address}}
					</view>
				</view>
			</view>
		</view>
		<!-- 商品明细 -->
		<view class="goods">
			<text>商品明细</text>
			<view class="goods-list">
				<view class="goods-list-item" v-for="(item,index) in details.goods_list" :key="index">
					<view class="goods-list-item-img">
						<u-image width="100%" height="100%" :src="item.cover_path"></u-image>
					</view>
					<view class="goods-list-item-content">
						<view class="goods-list-item-content-name">
							{{item.goods_name}}
						</view>
						<view class="goods-list-item-content-else">
							<view class="goods-list-item-content-else-price">
								<view class="goods-list-item-content-else-price-new">
									<view>{{item.itg_price}}</view>
									<text>颗</text>
								</view>
							</view>
							<text>数量：x{{item.quantity}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="title">
			订单信息
		</view>
		<view class="item">
			<text>订单编号</text>
			<view>{{details.order_sn}}</view>
		</view>
		<view class="item">
			<text>订单状态</text>
			<view class="item-color">{{details.status_name}}</view>
		</view>
		<view class="remarks" v-if="details.remark">
			<text>备注信息</text>
			<view class="remarks-content">
				{{details.remark}}
			</view>
		</view>
		<!-- 金额信息 -->
		<view class="title">
			金额信息
		</view>
		<view class="item">
			<text>商品总计</text>
			<view>{{details.goods_amounts}}</view>
		</view>
		<view class="item">
			<text>运费</text>
			<view>￥{{details.freight_amounts}}</view>
		</view>
		<!-- 价格 -->
		<view class="price">
			<view class="price-content">
				<text>实付果实：</text>
				<view>{{details.pay_amounts}}</view>
			</view>
			<text>下单时间：{{details.create_time}}</text>
		</view>
		<!-- 占位符 -->
		<view style="width: 100%;height: 160rpx;"></view>
		<!-- 按钮 -->
		<view class="btn" v-if="details.status==3">
			<view class="btn-bg" @click="bindReceivingGoods">
				确认收货
			</view>
		</view>
	</view>
</template>

<script>
	import {
		OrderDetail,
		// 确认收货
		SignFor
	} from '@/network/api.js'
	export default {
		data() {
			return {
				order_id:'',//订单id
				details:'',//订单详情
			};
		},
		onLoad(options) {
			this.order_id = options.order_id
			// 获取订单详情
			this.getOrderDetail()
		},
		methods:{
			// 获取订单详情
			getOrderDetail(status = true) {
				//status 是否显示加载动画
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					order_id: this.order_id
				}
				OrderDetail(data, status).then(res => {
					this.details = res.data.data
				})
			},
			// 刷新 上个页面 订单列表
			prevPageRefresh() {
				let pages = getCurrentPages()
				let prevPage = pages[pages.length-2]
				prevPage.$vm.getOrderList(false)
			},
			// 确认收货
			bindReceivingGoods() {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					order_id: this.order_id
				}
				SignFor(data).then(res => {
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
					this.getOrderDetail(false)
					this.prevPageRefresh()
				}).catch(err => {
					console.log(err, 'SignFor')
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
	.address {
		width: 100%;
		background-color: #fff;

		&-yes {
			width: 100%;
			min-height: 170rpx;
			padding: 0 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-content {
				width: 90%;
				display: flex;
				flex-direction: column;
				align-items: flex-start;

				&-name {
					width: 100%;
					text-align: justify;
					font-size: 30rpx;
					color: #323232;
					font-weight: 600;
				}

				&-nr {
					width: 100%;
					text-align: justify;
					font-size: 24rpx;
					color: #323232;
					font-weight: 400;
					margin-top: 20rpx;
				}
			}
		}
	}

	.goods {
		width: 100%;
		padding: 40rpx 40rpx 0 40rpx;
		background-color: #fff;
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		>text {
			font-size: 30rpx;
			color: #333333;
			font-weight: 600;
		}

		&-list {
			width: 100%;

			// padding: 0 40rpx;
			&-item {
				width: 100%;
				padding: 40rpx 0;
				border-bottom: 2rpx solid #F6F4F4;
				display: flex;
				align-items: center;
				justify-content: space-between;

				&-img {
					width: 190rpx;
					height: 190rpx;
				}

				&-content {
					width: 67%;
					height: 190rpx;
					padding: 10rpx 0;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: space-between;

					&-name {
						width: 100%;
						font-size: 30rpx;
						color: #333333;
						font-weight: 600;
						@include text-hidden-line(2);
					}

					&-else {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						>text {
							font-size: 26rpx;
							color: #666666;
							font-weight: 400;
						}

						&-price {
							display: flex;
							align-items: flex-end;

							&-old {
								font-size: 22rpx;
								color: #999999;
								font-weight: 400;
								text-decoration: line-through;
								margin-left: 10rpx;
								margin-bottom: 5rpx;
							}

							&-new {
								display: flex;
								align-items: flex-end;

								>text {
									font-size: 26rpx;
									color: #FD5401;
									font-weight: 600;
									margin-bottom: 5rpx;
								}

								>view {
									font-size: 36rpx;
									color: #FD5401;
									font-weight: 600;
								}
							}
						}
					}
				}
			}

			&-item:last-child {
				border-bottom: none;
			}
		}
	}

	.title {
		width: 100%;
		height: 82rpx;
		line-height: 82rpx;
		background-color: #fff;
		padding: 0 40rpx;
		font-size: 30rpx;
		color: #333333;
		font-weight: 600;
		margin-bottom: 2rpx;
		margin-top: 20rpx;
	}

	.item {
		width: 100%;
		height: 72rpx;
		background-color: #fff;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		>text {
			font-size: 30rpx;
			color: #333333;
			font-weight: 600;
		}

		>view {
			font-size: 28rpx;
			color: #333333;
			font-weight: 600;
		}

		&-color {
			color: #77C881 !important;
		}
	}

	.remarks {
		width: 100%;
		padding: 25rpx 40rpx;
		background-color: #fff;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;

		>text {
			font-size: 30rpx;
			color: #333333;
			font-weight: 600;
		}

		&-content {
			max-width: 75%;
			text-align: justify;
			font-size: 28rpx;
			color: #333333;
			font-weight: 600;
			line-height: 1.5;
		}
	}

	.price {
		width: 100%;
		padding: 25rpx 40rpx;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin-top: 2rpx;

		>text {
			font-size: 26rpx;
			color: #666666;
			font-weight: 600;
		}

		&-content {
			display: flex;
			align-items: center;
			margin-bottom: 15rpx;

			>text {
				font-size: 28rpx;
				color: #666666;
				font-weight: 600;
			}

			>view {
				font-size: 34rpx;
				color: #FD5401;
				font-weight: 600;
			}
		}
	}

	.btn {
		width: 100%;
		height: 110rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		border-top: 2rpx solid #F6F4F4;

		>view {
			width: 140rpx;
			height: 50rpx;
			border-radius: 25rpx;
			text-align: center;
			line-height: 50rpx;
			font-size: 24rpx;
			font-weight: 400;
		}

		&-border {
			border: 2rpx solid #999999;
			color: #999999;
		}

		&-bg {
			background: linear-gradient(-28deg, #77C881, #62BD6A);
			color: #FFFFFF;
			margin-left: 20rpx;
		}
	}
</style>
