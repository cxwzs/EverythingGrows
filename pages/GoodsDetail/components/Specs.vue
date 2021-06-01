<template>
	<view class="container">
		<u-popup v-model="specsPopup" :height="hasSku?'913':'500'" mode="bottom" :mask-close-able="false"
			border-radius="40">
			<view class="specs" :style="hasSku?'height:913rpx;':'height:500rpx;'">
				<view class="specs-goods">
					<view class="specs-goods-img">
						<u-image width="100%" height="100%" :src="goodsSku.pictures[0].abs_url"></u-image>
					</view>
					<view class="specs-goods-text">
						<view class="specs-goods-text-name">
							{{goodsName}}
						</view>
						<view class="specs-goods-text-price">
							<view class="specs-goods-text-price-new">
								<text v-if="type==1">￥</text>
								<view v-if="type==1">{{goodsSku.price}}</view>
								<view v-if="type==2">{{goodsSku.itg_price}}</view>
							</view>
							<view class="specs-goods-text-price-old" v-if="type==1&&goodsSku.market_price">
								￥{{goodsSku.market_price}}
							</view>
							<view class="specs-goods-text-price-old" v-if="type==2"
								:style="type==2?'color:#FD5401;':''">
								颗
							</view>
						</view>
					</view>
					<view class="specs-goods-close" @click="bindClose">
						<u-icon name="close" color="#666666" size="36"></u-icon>
					</view>
				</view>
				<view class="specs-content" v-if="goodAttr.length!=0">
					<scroll-view :scroll-y="true" class="specs-content-list">
						<view class="specs-content-list-item" v-for="(item,index) in goodAttr" :key="index">
							<text>{{item.attr_name}}</text>
							<view class="specs-content-list-item-options">
								<view class="specs-content-list-item-options-item"
									@click="changeGoodsSku(index,itemVal.goods_attr_id,itemVal.attr_value)"
									:class="itemVal.goods_attr_id==item.result?'specs-content-list-item-options-active':''"
									v-for="(itemVal,indexVal) in item.attr_values" :key="indexVal">
									{{itemVal.attr_value}}
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="specs-num" v-if="type==1">
					<text>购买数量</text>
					<u-number-box :disabled-input="true" v-model="num" min="1" :max="goodsSku.stock"
						@change="changeNum"></u-number-box>
				</view>
				<view class="specs-btn" v-if="goodsSku.stock>0" @click="bindSubmit">
					{{specsType==3?'确定兑换':'确定'}}
				</view>
				<view class="specs-btn" v-else style="background: #999;">
					{{specsType==3?'确定兑换':'确定'}}
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		AddToCart
	} from '@/network/api.js'
	export default {
		data() {
			return {
				num: 1
			};
		},
		props: {
			// 规格弹窗 出现/隐藏
			specsPopup: {
				type: Boolean,
				default: false
			},
			//1 加入购物车 2 立即购买 3 兑换商品
			specsType: {
				type: [Number, String],
				default: 1
			},
			// 商品名称
			goodsName: {
				type: String,
				default: ''
			},
			// 规格列表
			goodAttr: {
				type: Array,
				default: []
			},
			// 选中 规格 信息
			goodsSku: {
				type: Object,
				default: {}
			},
			// 商品id
			goodsId: {
				type: [Number, String],
				default: ''
			},
			// 是否有规格
			hasSku: {
				type: [Number, String],
				default: 0
			},
			// 商品类型 1 商城商品 2 兑换商品
			type: {
				type: [Number, String],
				default: 1
			}
		},
		methods: {
			// 选择规格
			changeGoodsSku(index, goods_attr_id, attr_value) {
				/*
					index 第几个分类的规格
					goods_attr_id 规格id
					attr_value 规格名称
				*/
				this.num = 1
				this.$emit('changeGoodsSku', index, goods_attr_id, attr_value)
			},
			// 改变 购买数量
			changeNum(e) {
				console.log('当前值为: ' + e.value)
			},
			// 隐藏 规格弹窗
			bindClose() {
				this.$emit('close')
			},
			// 跳转到 确认订单/确认兑换
			bindSubmit() {
				if (this.$LoginIF(2)) {
					let goods_attr_desc = [].concat(this.goodAttr.map((item) => {
						return item.attr_name + ':' + item.result_name
					})).join(' ')
					// console.log(goods_attr_desc)
					let goods_attr_ids = [].concat(this.goodAttr.map((item) => {
						return item.result
					})).join('|')
					// console.log(goods_attr_ids)
					// this.specsType 1 加入购物车 2 立即购买 3 兑换商品
					switch (Number(this.specsType)) {
						case 1:
							// uni.navigateTo({
							// 	url:'/pages/ShoppingCart/ShoppingCart'
							// })
							let data = {
								m_id: uni.getStorageSync('userinfo').m_id,
								goods_id: this.goodsId,
								quantity: this.num,
								goods_attr_ids: goods_attr_ids,
								goods_attr_desc: goods_attr_desc
							}
							AddToCart(data).then((res) => {
								uni.showToast({
									title: res.data.message,
									icon: 'none'
								})
								this.$emit('close')
							}).catch((err) => {
								console.log(err, 'AddToCart')
							})
							break;
						case 2:
							/*
								type 1 立即购买进入确认订单 2 购物车进入确认订单
							*/
							let datas = {
								goods_attr_ids: goods_attr_ids,
								goods_attr_desc: goods_attr_desc,
								goods_id: this.goodsId,
								quantity: this.num
							}
							uni.navigateTo({
								url: '/pages/ConfirmOrder/ConfirmOrder?type=' + 1 + '&datas=' + JSON.stringify(
									datas)
							})
							break;
						case 3:
							// 进入 兑换商品 确认订单
							let datass = {
								goods_attr_ids: goods_attr_ids,
								goods_attr_desc: goods_attr_desc,
								goods_id: this.goodsId,
								quantity: this.num
							}
							uni.navigateTo({
								url: '/pages/ExchangeConfirmOrder/ExchangeConfirmOrder?data=' + JSON.stringify(
									datass)
							})
							break;
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.specs {
		width: 100%;
		padding: 40rpx 40rpx 30rpx 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;

		&-btn {
			width: 100%;
			height: 88rpx;
			background: linear-gradient(-28deg, #77C881, #62BD6A);
			border-radius: 44rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			font-weight: 600;
		}

		&-goods {
			width: 100%;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;

			&-img {
				width: 180rpx;
				height: 180rpx;
			}

			&-text {
				width: 57%;
				margin-top: 30rpx;

				&-name {
					width: 100%;
					font-size: 30rpx;
					color: #333333;
					font-weight: 600;
					line-height: 1.5;
					@include text-hidden-line(2);
				}

				&-price {
					display: flex;
					align-items: flex-end;
					margin-top: 10rpx;

					&-old {
						font-size: 22rpx;
						color: #999999;
						font-weight: 400;
						margin-left: 15rpx;
					}

					&-new {
						display: flex;
						align-items: flex-end;

						>text {
							font-size: 26rpx;
							color: #FD5401;
							font-weight: 400;
							margin-bottom: 5rpx;
						}

						>view {
							font-size: 36rpx;
							color: #FD5401;
							font-weight: 400;
						}
					}
				}
			}
		}

		&-num {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			>text {
				font-size: 26rpx;
				color: #333333;
				font-weight: 600;
			}
		}

		&-content {
			width: 100%;
			height: 400rpx;

			&-list {
				width: 100%;
				height: 100%;

				&-item {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					margin-top: 30rpx;

					>text {
						font-size: 26rpx;
						color: #333333;
						font-weight: 600;
					}

					&-options {
						width: 100%;
						margin-top: 15rpx;
						display: flex;
						flex-wrap: wrap;
						align-items: center;

						&-item {
							min-width: 160rpx;
							padding: 0 20rpx;
							height: 48rpx;
							background: #F7F7F7;
							border-radius: 10rpx;
							font-size: 22rpx;
							color: #666666;
							font-weight: 600;
							text-align: center;
							line-height: 48rpx;
							margin: 10rpx;
						}

						&-active {
							background: linear-gradient(-28deg, #77C881, #62BD6A);
							color: #fff;
						}
					}
				}

				&-item:first-child {
					margin-top: 0;
				}
			}
		}
	}
</style>
