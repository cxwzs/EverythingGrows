<template>
	<view class="container" v-if="details">
		<!-- 地址 -->
		<view class="address">
			<!-- 没有地址 -->
			<view class="address-not" @click="toAddress(2)" v-if="JSON.stringify(details.address)=='{}'">
				<view class="address-not-left">
					<u-icon name="map" color="#77C881" size="48"></u-icon>
					<view>添加收货地址</view>
				</view>
				<u-icon name="arrow-right" color="#A8A6A7" size="36"></u-icon>
			</view>
			<!-- 有地址 -->
			<view class="address-yes" v-else @click="toAddress(2)">
				<u-icon name="map" color="#77C881" size="48"></u-icon>
				<view class="address-yes-content">
					<view class="address-yes-content-name">
						{{details.address.contacts}} {{details.address.mobile}}
					</view>
					<view class="address-yes-content-nr">
						{{details.address.province_name+details.address.city_name+details.address.district_name+details.address.address}}
					</view>
				</view>
				<u-icon name="arrow-right" color="#A8A6A7" size="36"></u-icon>
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
									<text>￥</text>
									<view>{{item.price}}</view>
								</view>
								<view class="goods-list-item-content-else-price-old" v-if="item.market_price">
									￥{{item.market_price}}
								</view>
							</view>
							<text>数量：x{{item.quantity}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单明细 -->
		<view class="order">
			<view class="order-item" v-if="details.coupons.length!=0" @click="toCoupon">
				<text>优惠券</text>
				<view class="order-item-right">
					<view v-if="details.coupon_amounts">￥{{details.coupon_amounts}}</view>
					<u-icon name="arrow-right" color="#A8A6A7" size="28"></u-icon>
				</view>
			</view>
			<view class="order-item">
				<text>配送费</text>
				<view class="order-item-right">
					<view>￥{{details.freight_amounts}}</view>
					<!-- <u-icon name="arrow-right" color="#A8A6A7" size="28"></u-icon> -->
				</view>
			</view>
			<view class="order-item">
				<text>备注</text>
				<view class="order-item-right">
					<textarea :class="remarks?'order-item-right-textarea':''" v-model="remarks" placeholder="请输入备注" placeholder-class="inps"
					 maxlength="-1" :auto-height="true"></textarea>
				</view>
			</view>
		</view>
		<!-- 占位符 -->
		<view style="width: 100%;height: 200rpx;"></view>
		<!-- 按钮 -->
		<view class="btn">
			<view class="btn-num">
				<text>实付金额：</text>
				<view>￥{{details.order_amounts}}</view>
			</view>
			<view class="btn-nr" @click="toPay">
				立即支付
			</view>
		</view>
	</view>
</template>

<script>
	import {
		// 购物车 确认订单
		ConfirmOrder,
		// 购物车 提交订单
		SubmitOrder,
		// 立即购买 确认订单
		FastConfirmOrder,
		// 立即购买 提交订单
		FastSubmitOrder
	} from '@/network/api.js'
	export default {
		data() {
			return {
				type: 1, //1 立即购买 2 购物车购买
				remarks: '', //备注
				cart_ids: '', //购物车 购买 id串
				m_cpn_id: '', //优惠券id
				adr_id: '', //地址id
				details: '', //订单详情
				goods_attr_ids: '', //立即购买 规格id串
				goods_attr_desc: '', //立即购买 规格说明
				quantity: '', //立即购买 数量
				goods_id: '', //立即购买 商品id
			};
		},
		onLoad(options) {
			this.type = options.type
			if (this.type == 1) {
				// 立即购买
				let datas = JSON.parse(options.datas)
				this.goods_attr_ids = datas.goods_attr_ids
				this.goods_attr_desc = datas.goods_attr_desc
				this.quantity = datas.quantity
				this.goods_id = datas.goods_id
			} else {
				// 购物车 购买
				this.cart_ids = options.cart_ids
			}
		},
		onShow() {
			if (this.type == 1) {
				// 立即购买
				let datas = {
					m_id: uni.getStorageSync('userinfo').m_id,
					goods_id: this.goods_id,
					quantity: this.quantity,
					goods_attr_ids: this.goods_attr_ids,
					goods_attr_desc: this.goods_attr_desc,
					m_cpn_id: this.m_cpn_id,
					adr_id: this.adr_id,
					mall_type: 1
				}
				FastConfirmOrder(datas).then(res => {
					this.details = res.data.data
					this.adr_id = JSON.stringify(res.data.data.address) != '{}' ? res.data.data.address.adr_id : ''
				}).catch(err => {
					console.log(err, 'FastConfirmOrder')
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1510)
				})
			} else {
				// 购物车 购买
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					cart_ids: this.cart_ids,
					m_cpn_id: this.m_cpn_id,
					adr_id: this.adr_id,
					mall_type: 1
				}
				ConfirmOrder(data).then(res => {
					this.details = res.data.data
					this.adr_id = JSON.stringify(res.data.data.address) != '{}' ? res.data.data.address.adr_id : ''
				}).catch(err => {
					console.log(err, 'ConfirmOrder')
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1510)
				})
			}
		},
		methods: {
			// 跳转到 选择优惠券
			toCoupon() {
				let coupon = JSON.stringify(this.details.coupons)
				uni.navigateTo({
					url: '/pages/ConfirmOrderCoupon/ConfirmOrderCoupon?coupon=' + coupon
				})
			},
			// 跳转到 地址列表
			toAddress(type) {
				/*
					type 1 我的页面进入 2 确认订单页面进入
				*/
				uni.navigateTo({
					url: '/pages/Address/Address?type=' + type
				})
			},
			// 跳转到 支付界面
			toPay() {
				if (this.type == 1) {
					// 立即购买
					let datas = {
						m_id: uni.getStorageSync('userinfo').m_id,
						goods_id: this.goods_id,
						quantity: this.quantity,
						goods_attr_ids: this.goods_attr_ids,
						goods_attr_desc: this.goods_attr_desc,
						m_cpn_id: this.m_cpn_id,
						adr_id: this.adr_id,
						remark: this.remarks,
						mall_type: 1
					}
					FastSubmitOrder(datas).then(res => {
						let order_id = res.data.data.order_id
						//type 进入支付页面场景=> 1 立即购买/购物车购买 2订单列表进入 3订单详情进入 
						uni.navigateTo({
							url: '/pages/Pay/Pay?order_id=' + order_id + '&type=' + 1
						})
					}).catch(err => {
						console.log(err, 'FastSubmitOrder')
					})
				} else {
					// 购物车 购买
					let data = {
						m_id: uni.getStorageSync('userinfo').m_id,
						adr_id: this.adr_id,
						cart_ids: this.cart_ids,
						m_cpn_id: this.m_cpn_id,
						remark: this.remarks,
						mall_type: 1
					}
					SubmitOrder(data).then(res => {
						let order_id = res.data.data.order_id
						//type 进入支付页面场景=> 1 立即购买/购物车购买 2订单列表进入 3订单详情进入 
						uni.navigateTo({
							url: '/pages/Pay/Pay?order_id=' + order_id + '&type=' + 1
						})
					}).catch(err => {
						console.log(err, 'SubmitOrder')
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
	.address {
		width: 100%;
		background-color: #fff;

		&-not {
			width: 100%;
			min-height: 170rpx;
			padding: 0 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-left {
				display: flex;
				align-items: center;

				>view {
					font-size: 30rpx;
					color: #333333;
					font-weight: 400;
					margin-left: 30rpx;
				}
			}
		}

		&-yes {
			width: 100%;
			min-height: 170rpx;
			padding: 0 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-content {
				width: 80%;
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

	.inps {
		font-size: 28rpx;
		color: #999999;
		font-weight: 600;
	}

	.order {
		width: 100%;
		padding: 20rpx 40rpx;
		background-color: #fff;
		margin-top: 10rpx;

		&-item {
			width: 100%;
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			>text {
				font-size: 30rpx;
				color: #333333;
				font-weight: 600;
			}

			&-right {
				width: 80%;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				>view {
					font-size: 28rpx;
					color: #333333;
					font-weight: 600;
				}

				>textarea {
					width: 100%;
					text-align: right;
				}

				&-textarea {
					text-align: left !important;
				}
			}
		}
	}

	.btn {
		width: 100%;
		height: 140rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 99;
		border-top: 2rpx solid #F6F4F4;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-num {
			display: flex;
			align-items: center;

			>text {
				font-size: 24rpx;
				color: #333333;
				font-weight: 600;
			}

			>view {
				font-size: 36rpx;
				color: #FD5401;
				font-weight: 600;
			}
		}

		&-nr {
			width: 209rpx;
			height: 84rpx;
			border-radius: 42rpx;
			text-align: center;
			line-height: 84rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			font-weight: 600;
			background: linear-gradient(-28deg, #77C881, #62BD6A);
		}
	}
</style>
