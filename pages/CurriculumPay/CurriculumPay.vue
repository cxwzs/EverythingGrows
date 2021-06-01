<template>
	<view class="container">
		<!-- 支付方式 -->
		<view class="options">
			<text>支付方式</text>
			<radio-group class="radioGroup" @change="changePayMode">
				<label class="radioGroup-label" v-for="(item,index) in payMode" :key="index">
					<view class="radioGroup-label-content">
						<view class="radioGroup-label-content-icon">
							<image :src="item.icon" mode=""></image>
						</view>
						<text>{{item.name}}</text>
					</view>
					<radio :value="item.id" :checked="xz_pay == item.id"></radio>
				</label>
			</radio-group>
		</view>
		<view class="btn" @click="bindPay">
			立即支付
		</view>
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
					<view class="password-btn-item" @click="buyCurriculum" style="color: #62BD6A;">
						立即购买
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		BuyCurriculum,
		PassMember
	} from '@/network/api.js'
	export default {
		data() {
			return {
				payMode: [{
						name: '微信支付',
						icon: '/static/img/img_40.png',
						id: 4
					},
					{
						name: '种子支付',
						icon: '/static/img/img_41.png',
						id: 2
					}
				],
				xz_pay: 4, //选中的 支付方式
				passwordPopup: false, //密码弹窗
				pay_pass: '', //支付密码
				id:'',//课程id
			};
		},
		computed: {
			// 是否已设置 支付密码
			is_pay_pass() {
				return this.$store.state.is_pay_pass
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		methods: {
			// 选择支付方式
			changePayMode(val) {
				this.xz_pay = val.detail.value
			},
			// 立即支付
			async bindPay() {
				if (this.xz_pay == 2) {
					// 选中了 种子支付
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
				} else {
					// 微信支付
					BuyCurriculum({
						m_id: uni.getStorageSync('userinfo').m_id,
						id: this.id,
						pay_type:2
					}, false).then(async res => {
						let order_id = res.data.data.order_id
						try {
							let data = await this.$WXPAY(4, order_id)
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
									// this.$updateFUNC()
									uni.showToast({
										title: '购买成功',
										icon: 'none',
										duration: 1500,
										success: () => {
											uni.navigateTo({
												url: '/pages/PayResult/PayResult?status=' +
													1 + '&type=' + 4 +
													'&order_id=' + order_id
											})
										}
									})
								}
							})
						} catch (e) {
							//TODO handle the exception
							console.log(e, 'catch')
							uni.showToast({
								title: '调起支付失败',
								icon: 'none'
							})
						}
					}).catch(err => {
						console.log(err, 'BuyCurriculum')
					})
				}

			},
			// 密码
			PassWord(e) {
				this.pay_pass = e
			},
			// 取消 密码输入框
			hidePasswordPopup() {
				this.pay_pass = ''
				this.passwordPopup = false
			},
			// 立即购买课程 种子支付
			buyCurriculum() {
				if (!this.pay_pass) {
					uni.showToast({
						title: '请输入支付密码',
						icon: 'none'
					})
					return false
				}
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					id: this.id,
					pay_type:1
				}
				BuyCurriculum(data).then(res => {
					let order_id = res.data.data.order_id
					PassMember({
						m_id: uni.getStorageSync('userinfo').m_id,
						order_id: res.data.data.order_id,
						pay_pass: this.pay_pass,
						type: 1
					}).then(res => {
						// this.$set(this.details, 'pay_curriculum_status', '1')
						this.pay_pass = ''
						this.passwordPopup = false
						// 更新 vuex 里的数据
						// this.$updateFUNC()
						uni.navigateTo({
							url: '/pages/PayResult/PayResult?status=' + 1 + '&type=' + 4 +
								'&order_id=' + order_id
						})
					}).catch(err => {
						console.log(err, 'PassMember')
					})
				}).catch(err => {
					console.log(err, 'BuyCurriculum')
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
	.container {
		width: 100%;
		padding: 40rpx;
	}

	.options {
		width: 100%;
		padding: 30rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		>text {
			font-size: 30rpx;
			color: #333333;
			font-weight: 600;
		}
	}

	.radioGroup {
		width: 100%;
		box-sizing: border-box;
		padding: 0 10rpx;

		&-label {
			width: 100%;
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-content {
				display: flex;
				align-items: center;

				>text {
					font-size: 28rpx;
					color: #333333;
				}

				&-icon {
					width: 42rpx;
					height: 42rpx;
					margin-right: 10rpx;
				}
			}
		}
	}

	.btn {
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
		bottom: 40rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 99;
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
