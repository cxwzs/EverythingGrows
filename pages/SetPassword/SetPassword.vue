<template>
	<view class="container">
		<view class="item">
			<view class="item-title">
				请输入密码
			</view>
			<u-message-input @finish="PassWord" :width="100" :maxlength="6" :breathe="true"></u-message-input>
		</view>
		<view class="item">
			<view class="item-title">
				请确认密码
			</view>
			<u-message-input @finish="QrPassWord" :width="100" :maxlength="6" :breathe="true"></u-message-input>
		</view>
		<view class="btn">
			<view class="btn-content" @click="bindOpen">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ModifyPayPass
	} from '@/network/api.js'
	export default {
		data() {
			return {
				password: '', //密码
				qr_paddword: '', //确认密码
			};
		},
		methods: {
			// 密码
			PassWord(e) {
				this.password = e
			},
			// 确认密码
			QrPassWord(e) {
				this.qr_paddword = e
			},
			// 设置 支付密码
			bindOpen() {
				if (this.password !== this.qr_paddword) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					})
					return false
				} else if (!this.password && !this.qr_paddword) {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					})
					return false
				} else if (this.password.length == 6 && !this.qr_paddword.length == 6) {
					uni.showToast({
						title: '密码长度小于6',
						icon: 'none'
					})
					return false
				}
				let data = {
					pay_pass: this.password,
					re_pay_pass: this.qr_paddword,
					m_id: uni.getStorageSync('userinfo').m_id
				}
				ModifyPayPass(data).then(res => {
					// 更新 vuex 里的数据
					this.$updateFUNC()
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 1500,
						success: () => {
							setTimeout(() => {
								uni.navigateBack({
									delta: 2
								})
							}, 1510)
						}
					})
				}).catch(err => {
					console.log(err, 'ModifyPayPass')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		width: 100%;
		margin-top: 20rpx;

		&-title {
			width: 100%;
			padding: 20rpx 25rpx;
			font-size: 30rpx;
			color: #333333;
			font-weight: 400;
		}
	}

	.btn {
		width: 100%;
		padding: 40rpx 25rpx;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 99;

		&-content {
			width: 100%;
			height: 84rpx;
			background: #77C881;
			border-radius: 42rpx;
			font-size: 28rpx;
			color: #fff;
			font-weight: 600;
			text-align: center;
			line-height: 84rpx;
		}
	}
</style>
