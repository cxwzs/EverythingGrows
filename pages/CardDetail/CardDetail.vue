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
		<!-- 面值 -->
		<!-- 购买万物卡 -->
		<view class="num" v-if="type==1">
			<view class="num-content" @click="cardNumPopup = true">
				<text>选择面值</text>
				<view class="num-content-right">
					<view class="num-content-right-nr">
						<!-- <text>￥</text> -->
						<view>{{details.moeny_list[changeCarNum].moeny}}</view>
						<text>种子</text>
					</view>
					<u-icon name="arrow-right" color="#A8A6A7" size="32"></u-icon>
				</view>
			</view>
		</view>
		<!-- 我购买的万物卡 -->
		<view class="num" v-if="type==2">
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
		<view class="konw" v-if="type==1">
			<view class="konw-icon" @click="know = !know">
				<image v-if="!know" src="/static/img/img_3.png" mode=""></image>
				<image v-else src="/static/img/img_4.png" mode=""></image>
			</view>
			<view class="konw-text">
				我已阅读并同意<text @click="toKnow">《用户购买须知》</text>
			</view>
		</view>
		<!-- 占位符 -->
		<view style="width: 100%;height: 150rpx;"></view>
		<!-- 按钮 -->
		<view class="btn">
			<view class="btn-content" v-if="type == 1" @click="buyCard">
				确定支付 {{details.moeny_list[changeCarNum].moeny}}种子
			</view>
			<view class="btn-content" v-if="type == 2" @click="bindCard(details.status)">
				{{details.status==1?'立即使用':'立即激活'}}
			</view>
		</view>
		<!-- 选择 卡面额 弹窗 -->
		<CardNum @submitCarNum="submitCarNum" @closeCarPopup="closeCarPopup" :cardNumPopup="cardNumPopup"
			:list="details.moeny_list"></CardNum>
		<!-- 支付密码 弹窗 -->
		<u-popup v-model="passwordPopup" :mask-close-able="false" mode="center" width="630" height="280">
			<view class="password">
				<view class="password-inp">
					<u-message-input @finish="PassWord" :value="pay_pass" :maxlength="6" :dot-fill="true" mode="box">
					</u-message-input>
				</view>
				<view class="password-btn">
					<view class="password-btn-item" @click="hidePasswordPopup"
						style="color: #333;border-right: 2rpx solid #f6f6f6;">
						取消
					</view>
					<view class="password-btn-item" @click="submitCard" style="color: #62BD6A;">
						立即购买
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		CardDesc,
		MemberCardDesc,
		BuyCard,
		ActiveCard,
		UseCard,
		PassMember
	} from '@/network/api.js'
	import CardNum from './components/CardNum.vue'
	export default {
		data() {
			return {
				know: false, //用户是否勾选 用户购买须知
				cardNumPopup: false, //选择 卡面额 弹窗 出现/隐藏
				type: 1, //1 购买万物卡 2 我购买的万物卡
				id: '', //卡id(购买万物卡)/订单id(我购买的万物卡)
				details: '', //卡详情
				changeCarNum: 0, //选中的 卡面额 下标
				passwordPopup: false, //密码弹窗
				pay_pass: '', //支付密码
			};
		},
		computed: {
			// 是否已设置 支付密码
			is_pay_pass() {
				return this.$store.state.is_pay_pass
			}
		},
		components: {
			CardNum
		},
		onLoad(options) {
			/*
				type 1 购买万物卡 2 我购买的万物卡
				id 卡id(购买万物卡)/订单id(我购买的万物卡)
			*/
			this.type = options.type
			this.id = options.id
			if (this.type == 1) {
				this.getCardDesc()
			} else {
				this.getMemberCardDesc()
			}
		},
		onShareAppMessage() {
			if (this.type != 1) {
				/*
					card_id 万物卡id 
					order_id 订单id
				*/
				return {
					title: '领取万物卡',
					path: '/pages/ReceiveCard/ReceiveCard?order_id=' + this.id + '&card_id=' + this.details.card_id
				}
			}
		},
		methods: {
			// 密码
			PassWord(e) {
				this.pay_pass = e
			},
			// 取消 密码输入框
			hidePasswordPopup() {
				this.pay_pass = ''
				this.passwordPopup = false
			},
			// 密码弹窗 立即购买
			submitCard() {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					id: this.id,
					moeny: this.details.moeny_list[this.changeCarNum].moeny
				}
				BuyCard(data).then(async res => {
					PassMember({
						m_id: uni.getStorageSync('userinfo').m_id,
						order_id: res.data.data.order_id,
						pay_pass: this.pay_pass,
						type: 2
					}).then(res => {
						this.pay_pass = ''
						this.passwordPopup = false
						this.$updateFUNC()
						uni.showToast({
							title: '购买成功',
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
						console.log(err, 'PassMember')
					})
				}).catch(err => {
					console.log(err, 'BuyCard')
				})
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
			// 购买万物卡
			buyCard() {
				if (this.know) {
					if (!this.is_pay_pass) {
						uni.showModal({
							title: '提示',
							confirmText: '设置密码',
							confirmColor: '#73C67D',
							cancelText: '取消',
							cancelColor: '#999',
							content: '请先去设置支付密码',
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/FromSeed/FromSeed'
									})
								}
							}
						})
						return false
					}
					this.passwordPopup = true
					// let data = {
					// 	m_id: uni.getStorageSync('userinfo').m_id,
					// 	id: this.id,
					// 	moeny: this.details.moeny_list[this.changeCarNum].moeny
					// }
					// BuyCard(data).then(async res => {
					// 	try{
					// 		let data = await this.$WXPAY(3,res.data.data.order_id)
					// 		uni.requestPayment({
					// 			timeStamp: data.timeStamp.toString(),
					// 			nonceStr: data.nonceStr,
					// 			package: data.package,
					// 			signType: 'MD5',
					// 			paySign: data.sign,
					// 			fail: (err) => {
					// 				console.log(err, '支付失败')
					// 			},
					// 			success: (res) => {
					// 				console.log(res, '支付成功')
					// 				// 更新vuex数据
					// 				this.$updateFUNC()
					// 				uni.showToast({
					// 					title: '购买成功',
					// 					icon: 'none',
					// 					duration: 1500,
					// 					success: () => {
					// 						setTimeout(() => {
					// 							uni.navigateBack({
					// 								delta: 1
					// 							})
					// 						}, 1510)
					// 					}
					// 				})
					// 			}
					// 		})
					// 	}catch(e){
					// 		//TODO handle the exception
					// 		console.log(e,'catch')
					// 		uni.showToast({
					// 			title: '调起支付失败',
					// 			icon: 'none'
					// 		})
					// 	}
					// }).catch(err => {
					// 	console.log(err, 'BuyCard')
					// })
				} else {
					uni.showToast({
						title: '请先勾选《用户购买须知》',
						icon: 'none'
					})
				}
			},
			// 关闭 选择 卡面额 弹窗
			closeCarPopup() {
				this.cardNumPopup = false
			},
			// 确定 选择的 卡面额
			submitCarNum(id) {
				this.cardNumPopup = false
				this.changeCarNum = id
			},
			//获取 购买万物卡 卡详情
			getCardDesc() {
				let data = {
					id: this.id
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
					order_id: this.id,
					m_id: uni.getStorageSync('userinfo').m_id
				}
				MemberCardDesc(data).then(res => {
					this.details = res.data.data
					if (res.data.data.status == 1) {
						// 立即使用 不能分享
						uni.hideShareMenu({
							menus: ['shareAppMessage', 'shareTimeline']
						})
					} else {
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

	.password {
		width: 630rpx;
		height: 280rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;

		&-inp {
			width: 100%;
			padding: 30rpx 0 50rpx 0;
		}

		&-btn {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-top: 2rpx solid #f6f6f6;

			&-item {
				width: 50%;
				height: 98rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
			}
		}
	}
</style>
