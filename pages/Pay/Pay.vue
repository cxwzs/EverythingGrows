<template>
	<view class="container" v-if="details">
		<!-- 订单内容 -->
		<view class="order">
			<view class="order-title">
				等待支付
			</view>
			<view class="order-money">
				付款金额
			</view>
			<!-- 商品 -->
			<view class="order-goods">
				<text>已选商品</text>
				<view class="order-goods-item" v-for="(item,index) in details.list" :key="index">
					<view class="order-goods-item-content">
						<view class="order-goods-item-content-name">
							{{item.goods_name}}
						</view>
						<text>x{{item.quantity}}</text>
					</view>
					<text>￥{{item.price}}</text>
				</view>
			</view>
			<!-- 配送费 -->
			<view class="order-peisong">
				<text>配送费</text>
				<view>￥{{details.freight_amounts}}</view>
			</view>
			<!-- 付款金额 -->
			<view class="order-num">
				<text>优惠：￥{{details.coupon_amounts}}</text>
				<view class="order-num-nr">
					<text>应付：</text>
					<view>￥{{details.order_amounts}}</view>
				</view>
			</view>
		</view>
		<!-- 占位符 -->
		<view style="width: 100%;height: 88rpx;"></view>
		<!-- 支付按钮 -->
		<view class="pay" @click="bindPay">
			立即支付 ￥{{details.order_amounts}}
		</view>
	</view>
</template>

<script>
	import {
		Order_desc
	} from '@/network/api.js'
	export default {
		data() {
			return {
				order_id: '', //订单id
				details: '', //订单信息
				type: 1, //进入支付页面场景=> 1 立即购买/购物车购买 2订单列表进入 3订单详情进入 
			};
		},
		onLoad(options) {
			console.log(options)
			this.order_id = options.order_id
			this.type = options.type
			let data = {
				order_id: this.order_id,
				m_id: uni.getStorageSync('userinfo').m_id
			}
			Order_desc(data).then(res => {
				this.details = res.data.data
			}).catch(err => {
				console.log(err, 'Order_desc')
			})
		},
		methods: {
			// 支付
			async bindPay() {
				try {
					let data = await this.$WXPAY(1,this.order_id)
					uni.requestPayment({
						timeStamp: data.timeStamp.toString(),
						nonceStr: data.nonceStr,
						package: data.package,
						signType: 'MD5',
						paySign: data.sign,
						fail: (err) => {
							console.log(err, '支付失败')
						},
						success: (res) => {
							console.log(res, '支付成功')
							uni.navigateTo({
								url: '/pages/PayResult/PayResult?status=' + 1 + '&type=' + this.type +
									'&order_id=' + this.order_id
							})
						}
					})
				} catch (e) {
					console.log(e,'catch')
					uni.showToast({
						title: '调起支付失败',
						icon: 'none'
					})
				}
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
	.container {
		width: 100%;
		padding: 30rpx 40rpx;
	}

	.order {
		width: 100%;
		padding: 40rpx 30rpx;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;

		&-title {
			font-size: 48rpx;
			color: #333333;
			font-weight: 600;
			margin-top: 30rpx;
		}

		&-money {
			font-size: 26rpx;
			color: #666666;
			font-weight: 400;
			margin-top: 20rpx;
		}

		&-goods {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin-top: 30rpx;

			>text {
				font-size: 30rpx;
				color: #333333;
				font-weight: 600;
			}

			&-item {
				width: 100%;
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				>text {
					font-size: 30rpx;
					color: #333333;
					font-weight: 400;
				}

				&-content {
					width: 65%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					>text {
						font-size: 26rpx;
						color: #666666;
						font-weight: 400;
					}

					&-name {
						width: 90%;
						font-size: 26rpx;
						color: #666666;
						font-weight: 400;
						@include text-hidden-line(1);
					}
				}
			}
		}

		&-peisong {
			width: 100%;
			margin-top: 30rpx;
			padding: 25rpx 0;
			border-top: 2rpx solid #F5F5F5;
			border-bottom: 2rpx solid #F5F5F5;
			display: flex;
			align-items: center;
			justify-content: space-between;

			>text {
				font-size: 26rpx;
				color: #666666;
				font-weight: 400;
			}

			>view {
				font-size: 26rpx;
				color: #333;
				font-weight: 400;
			}
		}

		&-num {
			width: 100%;
			margin-top: 30rpx;
			display: flex;
			align-items: flex-end;
			justify-content: flex-end;

			>text {
				font-size: 20rpx;
				color: #666666;
				font-weight: 400;
			}

			&-nr {
				display: flex;
				align-items: center;
				margin-left: 30rpx;

				>text {
					font-size: 26rpx;
					color: #666666;
					font-weight: 400;
				}

				>view {
					font-size: 26rpx;
					color: #FD5401;
					font-weight: 400;
				}
			}
		}
	}

	.pay {
		width: 90%;
		height: 88rpx;
		border-radius: 44rpx;
		background: linear-gradient(-28deg, #77C881, #62BD6A);
		text-align: center;
		line-height: 88rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		font-weight: 600;
		position: fixed;
		bottom: 30rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 99;
	}
</style>
