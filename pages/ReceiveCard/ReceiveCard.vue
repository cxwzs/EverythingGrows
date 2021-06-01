<template>
	<view class="container" v-if="details">
		<!-- top -->
		<view class="top">
			<view class="top-content">
				<u-image border-radius="20" width="100%" height="100%" :src="details.image"></u-image>
			</view>
		</view>
		<!-- title -->
		<view class="title">
			{{details.name}}
		</view>
		<!-- 万物卡 面值 -->
		<view class="num">
			<view class="num-content">
				<text>卡面值</text>
				<view class="num-content-right">
					<view class="num-content-right-nr">
						<!-- <text>￥</text> -->
						<view>{{details.moeny}}</view>
						<text>种子</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 温馨提示 -->
		<view class="tips">
			<text>温馨提示</text>
			<view class="tips-content" v-if="details.reminder">
				<u-parse :html="details.reminder"></u-parse>
			</view>
		</view>
		<!-- 用户购买须知 -->
		<!-- <view class="konw" v-if="type==1">
			<view class="konw-icon" @click="know = !know">
				<image v-if="!know" src="/static/img/img_3.png" mode=""></image>
				<image v-else src="/static/img/img_4.png" mode=""></image>
			</view>
			<view class="konw-text">
				我已阅读并同意<text @click="toKnow">《用户购买须知》</text>
			</view>
		</view> -->
		<!-- 占位符 -->
		<view style="width: 100%;height: 150rpx;"></view>
		<!-- 按钮 -->
		<view class="btn">
			<view class="btn-content" v-if="type == 1" @click="receiveCard">
				立即领取
			</view>
			<view class="btn-content" v-if="type == 2" @click="bindCard(details.status)">
				{{details.status==1?'立即使用':'立即激活'}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		CardDesc,
		MemberCardDesc,
		ActiveCard,
		UseCard,
		ReceiveCard
	} from '@/network/api.js'
	export default {
		data() {
			return {
				know: false, //用户是否勾选 用户购买须知
				type: 1, //1 领取万物卡 2 领取成功
				card_id: '', //卡id
				order_id: '', //订单id
				details: '', //卡详情
			};
		},
		onLoad(options) {
			console.log(options, '领取万物卡')
			/*
				card_id 万物卡id 
				order_id 订单id
			*/
			this.order_id = options.order_id
			this.card_id = options.card_id
			this.getMemberCardDesc()
		},
		methods: {
			// 立即领取
			receiveCard() {
				if(this.$LoginIF()) {
					let data = {
						order_id: this.order_id,
						m_id: uni.getStorageSync('userinfo').m_id
					}
					ReceiveCard(data).then(res => {
						// 更新vuex数据
						this.$updateFUNC()
						this.type = 2
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							success: () => {
								setTimeout(() => {
									this.getMemberCardDesc()
								}, 1510)
							}
						})
					}).catch(err => {
						console.log(err, 'ReceiveCard')
					})
				}
			},
			// 立即使用/立即激活
			bindCard(status) {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					order_id: this.details.order_id
				}
				// 1 立即使用 2立即激活
				if (status == 1) {
					UseCard(data).then(res => {
						// 更新vuex数据
						this.$updateFUNC()
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							success: () => {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1510)
							}
						})
					}).catch(err => {
						console.log(err, 'UseCard')
					})
				} else {
					ActiveCard(data).then(res => {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						this.getMemberCardDesc()
					}).catch(err => {
						console.log(err, 'ActiveCard')
					})
				}
			},
			//获取 购买万物卡 卡详情
			getCardDesc() {
				let data = {
					id: this.card_id
				}
				CardDesc(data).then(res => {
					this.details = res.data.data
				}).catch(err => {
					console.log(err, 'CardDesc')
				})
			},
			// 获取 我购买的万物卡 卡详情
			getMemberCardDesc() {
				let data = {
					order_id: this.order_id,
					m_id: uni.getStorageSync('userinfo').m_id
				}
				MemberCardDesc(data).then(res => {
					this.details = res.data.data
					if(res.data.data.status==1){
						// 立即使用 不能分享
						uni.hideShareMenu({
							menus: ['shareAppMessage', 'shareTimeline']
						})
					}else{
						// 立即激活 能分享
						uni.showShareMenu({
							menus: ['shareAppMessage', 'shareTimeline']
						})
					}
				}).catch(err => {
					console.log(err, 'MemberCardDesc')
				})
			},
			// 跳转到 用户购买须知
			toKnow() {
				uni.navigateTo({
					url: '/pages/Rule/Rule?type=' + 6 + '&title=' + '用户购买须知'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		width: 100%;
		padding: 40rpx;

		&-content {
			width: 100%;
			height: 412rpx;
		}
	}

	.title {
		width: 100%;
		padding: 20rpx 40rpx;
		text-align: justify;
		font-size: 36rpx;
		color: #333333;
		font-weight: 600;
	}

	.num {
		width: 100%;
		padding: 0 40rpx;

		&-content {
			width: 100%;
			padding: 30rpx 0;
			border-bottom: 2rpx solid #F5F5F5;
			display: flex;
			align-items: center;
			justify-content: space-between;

			>text {
				font-size: 28rpx;
				color: #999999;
				font-weight: 400;
			}

			&-right {
				display: flex;
				align-items: center;

				&-nr {
					display: flex;
					align-items: center;

					>text {
						font-size: 26rpx;
						color: #FD5401;
						font-weight: 600;
						margin-top: 10rpx;
					}

					>view {
						font-size: 48rpx;
						color: #FD5401;
						font-weight: 500;
					}
				}
			}
		}
	}

	.tips {
		width: 100%;
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		>text {
			font-size: 32rpx;
			color: #333333;
			font-weight: 600;
		}

		&-content {
			width: 100%;
			margin-top: 30rpx;
		}
	}

	.konw {
		width: 100%;
		padding: 40rpx;
		display: flex;
		align-items: center;

		&-icon {
			width: 32rpx;
			height: 32rpx;
		}

		&-text {
			display: flex;
			align-items: center;
			font-size: 26rpx;
			color: #999999;
			font-weight: 400;
			margin-left: 20rpx;

			>text {
				color: #77C881;
			}
		}
	}

	.btn {
		width: 100%;
		padding: 0 40rpx;
		height: 150rpx;
		background-color: #fff;
		position: fixed;
		z-index: 5;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;

		&-content {
			width: 100%;
			height: 88rpx;
			border-radius: 44rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 32rpx;
			color: #fff;
			font-weight: 600;
			background: linear-gradient(-28deg, #77C881, #62BD6A);
		}
	}
</style>
