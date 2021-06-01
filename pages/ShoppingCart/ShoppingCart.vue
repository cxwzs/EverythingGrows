<template>
	<view class="container">
		<u-sticky :enable="enable">
			<!-- 顶部 按钮 -->
			<view class="top" v-if="list.length">
				<view class="top-btn" @click="editCar = !editCar" v-show="!editCar">
					编辑
				</view>
				<view class="top-btn" @click="editCar = !editCar" v-show="editCar">
					完成
				</view>
			</view>
		</u-sticky>
		<!-- 商品列表 -->
		<view class="list" v-if="list.length">
			<checkbox-group @change="changeCarGood">
				<label v-for="(item,index) in list" :key="index" @click="changeCarItem(index)">
					<view class="list-item">
						<view class="list-item-checked">
							<checkbox :value="item.cart_id" :checked="item.sign"></checkbox>
						</view>
						<view class="list-item-img">
							<u-image width="100%" height="100%" :src="item.cover_path"></u-image>
						</view>
						<view class="list-item-content">
							<view class="list-item-content-name">
								{{item.goods_name}}
							</view>
							<view class="list-item-content-else">
								<view class="list-item-content-else-price">
									<view class="list-item-content-else-price-new">
										<text>￥</text>
										<view>{{item.price}}</view>
									</view>
									<view class="list-item-content-else-price-old">
										￥{{item.market_price}}
									</view>
								</view>
								<text v-show="!editCar">数量：x{{item.quantity}}</text>
								<view class="list-item-content-else-edit" v-show="editCar">
									<u-number-box v-model="item.quantity" :index="index" size="26" input-width="60" input-height="44"
									 :disabled-input="true" min="1" :max="item.stock" @plus="addGoodsNum" @minus="reduceGoodsNum"></u-number-box>
								</view>
							</view>
						</view>
					</view>
				</label>
			</checkbox-group>
		</view>
		<!-- 空视图 -->
		<EmptyView v-if="!list.length"></EmptyView>
		<!-- 占位符 -->
		<view style="width: 100%;height: 160rpx;"></view>
		<!-- 按钮 -->
		<view class="btn">
			<view class="btn-all" @click="changeAll">
				<view class="btn-all-icon">
					<image src="/static/img/img_3.png" v-show="!allCar" mode=""></image>
					<image src="/static/img/img_4.png" v-show="allCar" mode=""></image>
				</view>
				<text>全选</text>
			</view>
			<view class="btn-content">
				<view class="btn-content-price" v-if="!editCar">
					<text>合计：</text>
					<view>￥{{price_total}}</view>
				</view>
				<view class="btn-content-nr" @click="toConfirmOrder(2)" v-show="!editCar" style="background: linear-gradient(-28deg, #77C881, #62BD6A);">
					立即支付
				</view>
				<view class="btn-content-nr" @click="delCartGoods" v-show="editCar" style="background: linear-gradient(-28deg, #FC6161, #FF2B2B);">
					删除
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		CartList,
		UpdCart,
		CartChoose,
		DelFromCart
	} from '@/network/api.js'
	export default {
		data() {
			return {
				enable: true,
				editCar: false, //是否 编辑购物车 
				allCar: false, //是否全选
				list: [], //商品列表
				price_total: '0.00', //购物车结算
			};
		},
		onShow() {
			this.enable = true
			// 获取购物车列表
			this.getCartList()
		},
		onHide() {
			this.enable = false
		},
		methods: {
			// 获取购物车列表
			getCartList(status = true) {
				/*
					status 布尔值 是否显示加载动画
				*/
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id
				}
				CartList(data, status).then((res) => {
					this.list = res.data.data.list
				}).catch((err) => {
					console.log(err, 'CartList')
				})
			},
			// 删除 购物车 商品
			delCartGoods() {
				let cart_ids = this.list.filter(item => item.sign).map(item => item.cart_id).join(',')
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					cart_ids: cart_ids
				}
				DelFromCart(data, false).then(res => {
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
					// 更新购物车列表
					this.getCartList(false)
				}).catch(err => {
					console.log(err, 'DelFromCart')
				})
			},
			// 选择 商品 计算结算
			changeCarGood(e) {
				let cart_ids = e.detail.value.join(',')
				this.cartAmount(cart_ids)
				this.allCar = false
			},
			// 改变 单个商品 选中/取消选中 状态
			changeCarItem(index) {
				this.$set(this.list[index], 'sign', !this.list[index].sign)
			},
			// 购物车结算
			cartAmount(cart_ids) {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					cart_ids: cart_ids
				}
				CartChoose(data, false).then((res) => {
					this.price_total = res.data.data.price_total
				}).catch((err) => {
					console.log(err, 'CartChoose')
				})
			},
			// 增加 商品 购买数量
			addGoodsNum(e) {
				// console.log(e.value,e.index)
				let index = e.index
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					cart_id: this.list[index].cart_id,
					sign: 1
				}
				UpdCart(data, false).catch((err) => {
					console.log(err, 'UpdCart')
				})
			},
			// 减少 商品 购买数量
			reduceGoodsNum(e) {
				let index = e.index
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					cart_id: this.list[index].cart_id,
					sign: 2
				}
				UpdCart(data, false).catch((err) => {
					console.log(err, 'UpdCart')
				})
			},
			// 全选
			changeAll() {
				if (!this.allCar) {
					this.list.forEach(item => item.sign = true)
					let cart_ids = []
					cart_ids = cart_ids.concat(this.list.map(item => item.cart_id)).join(',')
					this.cartAmount(cart_ids)
				} else {
					this.list.forEach(item => item.sign = false)
					this.price_total = '0.00'
				}
				this.allCar = !this.allCar
			},
			// 跳转到 确认订单
			toConfirmOrder(type) {
				/*
					type 1 立即购买 2 购物车购买
				*/
				if (this.list.some(item => {
						return item.sign
					})) {
					// 判断 至少选中一个商品
					let cart_ids = this.list.filter(item => item.sign).map(item => item.cart_id).join(',')
					uni.navigateTo({
						url: '/pages/ConfirmOrder/ConfirmOrder?type=' + type + '&cart_ids=' + cart_ids
					})
				} else {
					uni.showToast({
						title: '请选择商品',
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
	.top {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background-color: #fff;
		border-bottom: 2rpx solid #F6F4F4;

		&-btn {
			padding: 30rpx;
			font-size: 28rpx;
			color: #77C881;
			font-weight: 400;
		}
	}

	.list {
		width: 100%;

		&-item {
			width: 100%;
			padding: 30rpx;
			background-color: #fff;
			border-bottom: 2rpx solid #F6F4F4;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-img {
				width: 190rpx;
				height: 190rpx;
			}

			&-content {
				width: 60%;
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
	}

	.btn {
		width: 100%;
		height: 140rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 2rpx solid #F6F4F4;

		&-all {
			height: 100%;
			display: flex;
			align-items: center;

			>text {
				font-size: 26rpx;
				color: #666666;
				font-weight: 600;
			}

			&-icon {
				width: 36rpx;
				height: 36rpx;
				margin-right: 20rpx;
			}
		}

		&-content {
			display: flex;
			align-items: center;

			&-price {
				display: flex;
				align-items: flex-end;

				>text {
					font-size: 24rpx;
					color: #333333;
					font-weight: 600;
					margin-bottom: 5rpx;
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
				margin-left: 30rpx;
			}
		}
	}
</style>
