<template>
	<view class="container" v-if="details">
		<!-- banner -->
		<view class="banner">
			<u-swiper mode="number" name="abs_url" indicator-pos="bottomRight" height="750" :list="details.pictures"></u-swiper>
		</view>
		<!-- 内容 -->
		<view class="content">
			<view class="content-price">
				<view class="content-price-new">
					<text v-if="type==1">￥</text>
					<view v-if="type==1">{{details.price}}</view>
					<view v-if="type==2">{{details.itg_price}}</view>
				</view>
				<view class="content-price-old" v-if="type==1&&details.market_price">
					￥{{details.market_price}}
				</view>
				<view class="content-price-old" v-if="type==2" :style="type==2?'color:#FD5401;':''">
					颗
				</view>
			</view>
			<view class="content-text">
				{{details.goods_name}}
			</view>
			<!-- 商城商品 -->
			<view class="content-btn" v-if="type==1" @click="bindBtn(2)">
				<view class="content-btn-tips">
					选择
				</view>
				<view class="content-btn-text">
					可选 规格
				</view>
				<u-icon name="arrow-right" color="#A8A6A7" size="28"></u-icon>
			</view>
			<!-- 兑换商品 -->
			<view class="content-btn" v-if="type==2" @click="bindBtn(3)">
				<view class="content-btn-tips">
					选择
				</view>
				<view class="content-btn-text">
					可选 规格
				</view>
				<u-icon name="arrow-right" color="#A8A6A7" size="28"></u-icon>
			</view>
		</view>
		<!-- 详情 -->
		<view class="detail">
			<view class="detail-title">
				商品详情
			</view>
			<view class="detail-content">
				<u-parse :html="details.goods_desc"></u-parse>
			</view>
		</view>
		<!-- 占位元素 -->
		<view style="width: 100%;height: 160rpx;"></view>
		<!-- 按钮 商城商品 -->
		<view class="btn" v-if="type==1">
			<view class="btn-left">
				<view class="btn-left-item" @click="toShoppingCart">
					<u-icon name="shopping-cart" color="#999999" size="48"></u-icon>
				</view>
				<view class="btn-left-item" @click="bindCollection">
					<u-icon :name="details.is_coll==1?'star-fill':'star'" :color="details.is_coll==1?'#F39400':'#999'" size="48"></u-icon>
				</view>
				<view class="btn-left-item">
					<u-icon name="zhuanfa" color="#999999" size="48"></u-icon>
					<button open-type="share" plain></button>
				</view>
			</view>
			<view class="btn-right">
				<view class="btn-right-item" @click="bindBtn(1)" style="background-color: #68DE76;">
					加入购物车
				</view>
				<view class="btn-right-item" @click="bindBtn(2)" style="background-color: #77C881;">
					立即购买
				</view>
			</view>
		</view>
		<!-- 按钮 兑换商品 -->
		<view class="exchange" v-if="type==2">
			<view class="exchange-btn" @click="bindBtn(3)">
				确定兑换
			</view>
		</view>
		<!-- 规格弹窗 -->
		<Specs :type="type" :hasSku="details.hasSku" :goodsId="goods_id" :goodsSku="goodsSku" :goodAttr="goodAttr" :goodsName="details.goods_name" :specsPopup="specsPopup"
		 :specsType="specsType" @close="closeSpecs" @changeGoodsSku="changeGoodsSku"></Specs>
	</view>
</template>

<script>
	import Specs from './components/Specs.vue'
	import {
		GoodsDetail,
		GoodsGetSku,
		DoCollect
	} from '@/network/api.js'
	export default {
		data() {
			return {
				specsPopup: false, //
				specsType: 1, //1 加入购物车 2 立即购买 3 兑换商品
				type: 1, //1 商城商品 2 兑换商品
				goods_id: '', //商品id
				details: '', //商品详情
				goodAttr: [], //商品规格
				goodsSku: '', //商品 选中规格 信息
			};
		},
		components: {
			Specs
		},
		onLoad(options) {
			this.type = options.type
			this.goods_id = options.goods_id
		},
		onShow() {
			// 获取商品详情
			let data = {
				m_id: uni.getStorageSync('userinfo').m_id,
				goods_id: this.goods_id
			}
			GoodsDetail(data).then((res) => {
				this.details = res.data.data
				this.goodAttr = res.data.data.goods_attr
				// 设置 默认选中 第一个规格
				this.goodAttr.forEach((item) => {
					// 设置 默认选中 规格id
					this.$set(item, 'result', item.attr_values.length != 0 ? item.attr_values.find((items) => {
						// 判断当前规格是否有库存，有库存才设置，如果没有依次往后面规格推
						return items.attr_stock > 0
					}).goods_attr_id : '')
					// 设置 默认选中 规格名称
					this.$set(item, 'result_name', item.attr_values.length != 0 ? item.attr_values.find((items) => {
						// 判断当前规格是否有库存，有库存才设置，如果没有依次往后面规格推
						return items.attr_stock > 0
					}).attr_value : '')
				})
				// 获取 选中规格 信息
				this.getGoodsGetSku()
			}).catch((err) => {
				console.log(err, 'GoodsDetail')
			})
		},
		methods: {
			// 收藏/取消收藏 商品
			bindCollection() {
				if(this.$LoginIF(2)){
					let data = {
						m_id: uni.getStorageSync('userinfo').m_id,
						goods_id: this.goods_id,
						is_coll: this.details.is_coll == 1 ? '1' : '2'
					}
					DoCollect(data).then((res) => {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						this.$set(this.details, 'is_coll', this.details.is_coll == 1 ? 2 : 1)
					}).catch((err) => {
						console.log(err, 'DoCollect')
					})
				}
			},
			// 跳转到 购物车
			toShoppingCart() {
				if(this.$LoginIF(2)){
					uni.navigateTo({
						url: '/pages/ShoppingCart/ShoppingCart'
					})
				}
			},
			// 操作按钮 加入购物车/立即购买/兑换商品
			bindBtn(type) {
				/*
					type 1 加入购物车 2 立即购买 3 兑换商品
				*/
				this.specsType = type
				this.specsPopup = !this.specsPopup
			},
			// 关闭 规格弹窗
			closeSpecs() {
				this.specsPopup = false
			},
			// 获取选中规格的信息
			getGoodsGetSku() {
				let attr = [].concat(this.goodAttr.map((item) => {
					return item.result
				})).join('|')
				let data = {
					goods_id: this.goods_id,
					goods_attr_ids: attr
				}
				GoodsGetSku(data, false).then((res) => {
					this.goodsSku = res.data.data
				}).catch((err) => {
					console.log(err, 'GoodsGetSku')
				})
			},
			// 选择规格
			changeGoodsSku(index, goods_attr_id, attr_value) {
				/*
					index 第几个分类的规格
					goods_attr_id 规格id
					attr_value 规格名称
				*/
				this.$set(this.goodAttr[index], 'result', goods_attr_id)
				this.$set(this.goodAttr[index], 'result_name', attr_value)
				// 获取 选中规格 信息
				this.getGoodsGetSku()
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8FC;
	}
</style>

<style lang="scss" scoped>
	.banner {
		width: 100%;
		height: 750rpx;
	}

	.content {
		width: 100%;
		padding: 40rpx 40rpx 0 40rpx;
		background-color: #fff;
		// border-radius: 40rpx 40rpx 0rpx 0rpx;
		// position: relative;
		// top: -20rpx;

		&-price {
			display: flex;
			align-items: center;

			&-old {
				font-size: 26rpx;
				color: #999999;
				font-weight: 400;
				text-decoration: line-through;
				margin-left: 10rpx;
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
					font-size: 48rpx;
					color: #FD5401;
					font-weight: 600;
				}
			}
		}

		&-text {
			width: 100%;
			text-align: justify;
			font-size: 36rpx;
			color: #333333;
			font-weight: 600;
			line-height: 1.5;
			margin-top: 15rpx;
		}

		&-btn {
			width: 100%;
			margin-top: 30rpx;
			padding: 30rpx 0;
			border-top: 2rpx solid #F5F5F5;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-tips {
				font-size: 26rpx;
				color: #999999;
				font-weight: 400;
			}

			&-text {
				width: 75%;
				font-size: 26rpx;
				color: #333333;
				font-weight: 400;
			}
		}
	}

	.detail {
		width: 100%;
		padding: 40rpx;
		background-color: #fff;
		margin-top: 20rpx;

		&-title {
			font-size: 34rpx;
			color: #333333;
			font-weight: 600;
		}

		&-content {
			width: 100%;
			margin-top: 30rpx;
		}
	}

	.btn {
		width: 100%;
		height: 140rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx 0 15rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9;

		&-left {
			width: 38%;
			height: 84rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-item {
				width: 33.33%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				z-index: 5;

				>button {
					@include shareButton();
				}
			}
		}

		&-right {
			width: 418rpx;
			height: 84rpx;
			border-radius: 42rpx;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-item {
				width: 50%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				color: #FFFFFF;
				font-weight: 600;
			}
		}
	}

	.exchange {
		width: 100%;
		height: 140rpx;
		display: flex;
		align-items: center;
		padding: 0 40rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9;

		&-btn {
			width: 100%;
			height: 84rpx;
			border-radius: 42rpx;
			text-align: center;
			line-height: 84rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			font-weight: 600;
			background: #77C881;
		}
	}
</style>
