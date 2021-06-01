<template>
	<view class="container">
		<view class="box">
			<!-- 旧手机号 -->
			<view class="phone">
				<text>手机号</text>
				<input type="number" placeholder="请输入需要绑定的手机号" :value="account_old.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')"
				 disabled placeholder-class="inps" />
			</view>
			<!-- 验证码 -->
			<view class="code">
				<view class="code-left">
					<text>验证码</text>
					<input type="text" placeholder="请填写验证码" v-model="verify_old" placeholder-class="inps" />
				</view>
				<view class="code-right" v-if="!time_if_old" @click="send_verify(1)">
					<view>获取验证码</view>
				</view>
				<view class="code-right" v-if="time_if_old" @click="verify_tips">
					<view>重新获取({{time_num_old}}s)</view>
				</view>
			</view>
			<!-- 新手机号 -->
			<view class="phone" style="margin-top: 30rpx;">
				<text>手机号</text>
				<input type="number" placeholder="请填写新手机号" v-model="account_new" placeholder-class="inps" />
			</view>
			<!-- 验证码 -->
			<view class="code">
				<view class="code-left">
					<text>验证码</text>
					<input type="text" placeholder="请填写验证码" v-model="verify_new" placeholder-class="inps" />
				</view>
				<view class="code-right" v-if="!time_if_new" @click="send_verify(2)">
					<view>获取验证码</view>
				</view>
				<view class="code-right" v-if="time_if_new" @click="verify_tips">
					<view>重新获取({{time_num_new}}s)</view>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="btn" @click="bind_preserve">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	import {
		GetVerify,
		ModifyAccount
	} from '@/network/api.js'
	export default {
		data() {
			return {
				account_old: '', //原手机号
				verify_old: '', //原手机号验证码
				time_num_old: 60, //原手机号 倒计时
				time_if_old: false, //原手机号 获取验证码倒计时是否进行
				count_down_old: '', //原手机号 获取验证码定时器
				account_new: '', //新手机号
				verify_new: '', //新手机号验证码
				time_num_new: 60, //新手机号 倒计时
				time_if_new: false, //新手机号 获取验证码倒计时是否进行
				count_down_new: '', //新手机号 获取验证码定时器
			};
		},
		onLoad(options) {
			// console.log(options)
			this.account_old = options.account
		},
		onHide() {
			clearInterval(this.count_down_old)
			clearInterval(this.count_down_new)
		},
		onUnload() {
			clearInterval(this.count_down_old)
			clearInterval(this.count_down_new)
		},
		methods: {
			// 确定 修改手机号
			bind_preserve: function() {
				let data = {
					verify: this.verify_old,
					account: this.account_old,
					new_account: this.account_new,
					new_verify:this.verify_new,
					m_id: uni.getStorageSync('userinfo').m_id
				}
				ModifyAccount(data).then((res) => {
					console.log(res)
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 1500,
						success: () => {
							let pages = getCurrentPages(); // 获取页面栈
							let prevPage = pages[pages.length - 2]; // 上一个页面
							prevPage.$vm.account = this.account_new
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				})
			},
			// 发送验证码
			send_verify: function(type) {
				// type 1原手机号获取验证码 2新手机号获取验证码
				switch (type) {
					case 1:
						let data = {
							account: this.account_old,
							unique_code: 'modify_account'
						}
						GetVerify(data).then((res) => {
							// console.log(res)
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							})
							this.time_if_old = true
							this.verify_time_old()
						})
						break;
					case 2:
						// 新手机号获取验证码
						let datas = {
							account: this.account_new,
							unique_code: 'modify_account'
						}
						GetVerify(datas).then((res) => {
							// console.log(res)
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							})
							this.time_if_new = true
							this.verify_time_new()
						})
						break;
				}
			},
			// 获取验证码 倒计时 原手机号
			verify_time_old: function() {
				this.count_down_old = setInterval(() => {
					if (this.time_num_old >= 1) {
						this.time_num_old = this.time_num_old - 1
					} else {
						this.time_num_old = 60
						this.time_if_old = false
						clearInterval(this.count_down_old)
					}
				}, 1000)
			},
			// 获取验证码 倒计时 新手机号
			verify_time_new: function() {
				this.count_down_new = setInterval(() => {
					if (this.time_num_new >= 1) {
						this.time_num_new = this.time_num_new - 1
					} else {
						this.time_num_new = 60
						this.time_if_new = false
						clearInterval(this.count_down_new)
					}
				}, 1000)
			},
			// 请不要重复获取验证码提示语
			verify_tips: function() {
				uni.showToast({
					title: '请不要重复获取验证码',
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}
	
	.inps{
		font-size: 30rpx;
		color: #999;
		font-weight: 400;
	}

	.box {
		width: 100%;
		padding: 30rpx;

		.phone {
			width: 100%;
			height: 98rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			background-color: #fff;

			>text {
				font-size: 30rpx;
				color: #333;
				font-weight: 400;
				margin-right: 25rpx;
			}

			>input {
				flex: 1;
				font-size: 30rpx;
				color: #333;
				font-weight: 400;
			}
		}

		.code {
			width: 100%;
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-left {
				width: 65%;
				height: 98rpx;
				padding: 0 30rpx;
				background-color: #fff;
				display: flex;
				align-items: center;

				>text {
					font-size: 30rpx;
					color: #333;
					margin-right: 25rpx;
				}

				>input {
					flex: 1;
					font-size: 30rpx;
					color: #333;
				}
			}

			&-right {
				width: 30%;
				height: 98rpx;
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;

				>view {
					font-size: 30rpx;
					color: #FD5401;
					font-weight: 400;
				}
			}
		}

		.btn {
			width: 100%;
			height: 88rpx;
			background: linear-gradient(-28deg, #77C881, #62BD6A);
			border-radius: 44rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			color: #fff;
			font-weight: bold;
			margin-top: 80rpx;
		}
	}
</style>
