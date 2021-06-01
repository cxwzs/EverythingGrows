<template>
	<view class="container">
		<!-- top -->
		<view class="top">
			<view class="top-bg">
				<image src="/static/img/img_24.png" mode=""></image>
			</view>
			<view class="top-content">
				<u-navbar :background="background" :border-bottom="false" :back-icon-color="navbarScroll?'#333':'#fff'"
				 :title-color="navbarScroll?'#333':'#fff'" title="果实商城"></u-navbar>
				<view class="top-content-text">
					可用果实（颗）
				</view>
				<view class="top-content-num">
					{{integral}}
				</view>
				<view class="top-content-bottom">
					<view class="top-content-bottom-btn">
						<view class="top-content-bottom-btn-item" @click="toFruitRecord">
							<view class="top-content-bottom-btn-item-icon">
								<image src="/static/img/img_25.png" mode=""></image>
							</view>
							<text>果实明细</text>
						</view>
						<view class="top-content-bottom-btn-item" @click="toExchangeRecord">
							<view class="top-content-bottom-btn-item-icon">
								<image src="/static/img/img_25.png" mode=""></image>
							</view>
							<text>兑换记录</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 兑换商品 -->
		<view class="exchange">
			<text>兑换商品</text>
			<view class="exchange-list">
				<view class="exchange-list-item" v-for="(item,index) in list" :key="index" @click="toDetail(2,item.goods_id)">
					<view class="exchange-list-item-img">
						<u-image width="100%" height="100%" :src="item.cover_path"></u-image>
					</view>
					<view class="exchange-list-item-name">
						{{item.goods_name}}
					</view>
					<view class="exchange-list-item-num">
						<view>{{item.itg_price}}</view>
						<text>颗</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		GoodsList
	} from '@/network/api.js'
	export default {
		data() {
			return {
				background: {
					background: `${'rgba(0,0,0,0)'}`
				},
				navbarScroll: false, //页面标题 是否出现背景色(根据页面滚动距离判断)
				page: 1,//分页
				list:[],//商品列表
			};
		},
		computed:{
			// 果实数量
			integral() {
				return this.$store.state.integral
			},
		},
		// 监听 页面滚动 实现页面标题背景色动态设置
		onPageScroll(e) {
			if (e.scrollTop > 90) {
				this.navbarScroll = true
				this.background = {
					background: `${'#fff'}`
				}
			} else {
				this.navbarScroll = false
				this.background = {
					background: `${'rgba(0,0,0,0)'}`
				}
			}
		},
		onLoad() {
			// 获取 商品列表
			let data = {
				p: this.page,
				mall_type: 2
			}
			GoodsList(data).then(res => {
				this.list = res.data.data.list
			}).catch(err => {
				console.log(err,'GoodsList')
			})
		},
		onReachBottom() {
			let data = {
				p: this.page + 1,
				mall_type: 2
			}
			GoodsList(data,false).then(res => {
				if (res.data.data.list.length != 0) {
					this.page += 1
					this.list = [...this.list, ...res.data.data.list]
				}else{
					uni.showToast({
						title:'没有更多了',
						icon:'none'
					})
				}
			}).catch(err => {
				console.log(err,'GoodsList')
			})
		},
		methods:{
			// 跳转到 果实记录
			toFruitRecord() {
				uni.navigateTo({
					url:'/pages/FruitRecord/FruitRecord'
				})
			},
			// 跳转到 商品详情
			toDetail(type,goods_id) {
				/*
					goods_id 商品id
					type 1 商城商品 2 兑换商品
				*/
				uni.navigateTo({
					url:'/pages/GoodsDetail/GoodsDetail?type=' + type + '&goods_id=' + goods_id
				})
			},
			// 跳转到 兑换记录
			toExchangeRecord() {
				uni.navigateTo({
					url:'/pages/ExchangeRecord/ExchangeRecord'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		width: 100%;
		height: 450rpx;
		position: relative;
		z-index: 5;

		&-bg {
			position: absolute;
			z-index: 6;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
		}

		&-content {
			width: 100%;
			height: 100%;
			position: relative;
			z-index: 7;

			&-text {
				width: 100%;
				padding: 0 40rpx;
				font-size: 30rpx;
				color: #FFFFFF;
				font-weight: 400;
				margin-top: 30rpx;
			}

			&-num {
				width: 100%;
				padding: 0 40rpx;
				font-size: 60rpx;
				color: #FFFFFF;
				font-weight: 600;
				margin-top: 30rpx;
			}

			&-bottom {
				width: 100%;
				height: 140rpx;
				padding: 0 40rpx;
				position: absolute;
				z-index: 8;
				left: 0;
				right: 0;
				bottom: -35rpx;

				&-btn {
					width: 100%;
					height: 100%;
					background: #FFFFFF;
					box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.1);
					border-radius: 20rpx;
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

						&-icon {
							width: 60rpx;
							height: 60rpx;
							margin-right: 25rpx;
						}

						>text {
							font-size: 28rpx;
							color: #333333;
							font-weight: 600;
						}
					}
				}
			}
		}
	}

	.exchange {
		width: 100%;
		padding: 0 40rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-top: 100rpx;

		>text {
			font-size: 30rpx;
			color: #333333;
			font-weight: 600;
		}

		&-list {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			padding-bottom: 80rpx;

			&-item {
				width: 324rpx;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				margin-top: 40rpx;

				&-img {
					width: 100%;
					height: 324rpx;
				}

				&-name {
					width: 100%;
					font-size: 30rpx;
					color: #333333;
					font-weight: 600;
					margin-top: 25rpx;
					@include text-hidden-line(1);
				}

				&-num {
					width: 100%;
					display: flex;
					align-items: center;
					margin-top: 10rpx;

					>view {
						font-size: 36rpx;
						color: #FD5401;
						font-weight: 600;
						margin-right: 8rpx;
					}

					>text {
						font-size: 22rpx;
						color: #FD5401;
						font-weight: 400;
					}
				}
			}
		}
	}
</style>
