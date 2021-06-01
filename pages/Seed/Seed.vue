<template>
	<view class="container">
		<u-sticky :enable="enable">
			<view class="content">
				<!-- top -->
				<view class="top">
					<view class="top-bg">
						<image src="/static/img/img_27.png" mode=""></image>
					</view>
					<view class="top-content">
						<view class="top-content-text">
							<view>万物种子（粒）</view>
						</view>
						<view class="top-content-num">
							{{balance}}
						</view>
					</view>
				</view>
				<!-- 标题 -->
				<view class="title">
					选择充值
				</view>
			</view>
		</u-sticky>
		<!-- 列表 -->
		<view class="list">
			<view class="list-item" :class="seed==index?'list-active':''" v-for="(item,index) in list" :key="index" @click="changeSeed(index)">
				<view class="list-item-num" :class="seed==index?'list-item-active':''">
					<text>{{item.give_amounts}}</text>
					<view class="list-item-num-icon">
						<image src="/static/img/img_28.png" mode=""></image>
					</view>
				</view>
				<text>￥{{item.recharge_amounts}}</text>
			</view>
		</view>
		<!-- 占位符 -->
		<view style="width: 100%;height: 200rpx;"></view>
		<!-- 按钮 -->
		<view class="btn">
			<view class="btn-num">
				<text>实付金额：</text>
				<view>￥{{list[seed].recharge_amounts}}</view>
			</view>
			<view class="btn-nr" @click="bindPay">
				立即支付
			</view>
		</view>
	</view>
</template>

<script>
	import {
		RechargeList,
		CreateRechargeOrder
	} from '@/network/api.js'
	export default {
		data() {
			return {
				enable: true,
				seed: 0, //选中 种子充值套餐
				list: [], //种子 充值套餐 列表
			};
		},
		computed: {
			// 种子数量
			balance() {
				return this.$store.state.balance
			}
		},
		onLoad() {
			// 获取 充值列表
			RechargeList().then(res => {
				this.list = res.data.data
			}).catch(err => {
				console.log(err, 'RechargeList')
			})
		},
		onShow() {
			this.enable = true
		},
		onHide() {
			this.enable = false
		},
		methods: {
			// 选择 种子充值套餐
			changeSeed(val) {
				this.seed = val
			},
			// 立即支付
			bindPay() {
				let data = {
					recharge_amounts: this.list[this.seed].recharge_amounts,
					m_id: uni.getStorageSync('userinfo').m_id
				}
				CreateRechargeOrder(data).then(async res => {
					try{
						let data = await this.$WXPAY(2,res.data.data.recharge_order_id)
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
								// 更新vuex数据
								this.$updateFUNC()
								uni.showToast({
									title: '充值成功',
									icon: 'none',
									duration: 1500,
									success: () => {
										// setTimeout(() => {
										// 	uni.navigateBack({
										// 		delta: 1
										// 	})
										// }, 1510)
									}
								})
							}
						})
					}catch(e){
						//TODO handle the exception
						console.log(e,'catch')
						uni.showToast({
							title: '调起支付失败',
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err, 'CreateRechargeOrder')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
	}

	.content {
		width: 100%;
		padding: 30rpx 40rpx 0 40rpx;
		background-color: #fff;
	}

	.top {
		width: 100%;
		height: 280rpx;
		position: relative;
		z-index: 5;

		&-bg {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 6;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
		}

		&-content {
			width: 100%;
			height: 100%;
			position: relative;
			z-index: 7;
			padding: 40rpx 30rpx;

			&-text {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				>view {
					font-size: 30rpx;
					color: #FFFFFF;
					font-weight: 400;
				}

				>text {
					font-size: 24rpx;
					color: #FFFFFF;
					font-weight: 400;
				}
			}

			&-num {
				width: 100%;
				position: absolute;
				z-index: 9;
				left: 50%;
				top: 60%;
				transform: translate(-50%, -50%);
				text-align: center;
				font-size: 60rpx;
				color: #FFFFFF;
				font-weight: 600;
			}
		}
	}

	.title {
		width: 100%;
		padding: 20rpx 0;
		margin-top: 50rpx;
		text-align: left;
		font-size: 32rpx;
		color: #333333;
		font-weight: 600;
		background-color: #fff;
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

	.list {
		width: 100%;
		padding: 10rpx 40rpx 40rpx 40rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		&-item {
			width: 206rpx;
			height: 140rpx;
			background: #F2F2F2;
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-right: 26rpx;
			margin-top: 26rpx;

			>text {
				font-size: 28rpx;
				color: #FD5401;
				font-weight: 600;
			}

			&-num {
				display: flex;
				align-items: center;

				>text {
					font-size: 36rpx;
					color: #333333;
					font-weight: 600;
				}

				&-icon {
					width: 32rpx;
					height: 32rpx;
					margin-left: 10rpx;
				}
			}

			&-active {
				>text {
					color: #fff !important;
				}
			}
		}

		&-item:nth-of-type(3n+3) {
			margin-right: 0;
		}

		&-active {
			background-color: #77C881 !important;

			>text {
				color: #fff !important;
			}
		}
	}
</style>
