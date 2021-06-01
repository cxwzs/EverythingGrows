<template>
	<view class="container">
		<view class="logo">
			<view class="logo-img">
				<image src="/static/img/logo.png" mode=""></image>
			</view>
			<text>万物生长</text>
		</view>
		<view class="inp">
			<text>手机号</text>
			<view class="inp-nr">
				<input type="number" v-model="account" placeholder="请输入手机号" placeholder-class="inps" />
			</view>
		</view>
		<view class="inp">
			<text>验证码</text>
			<view class="inp-nr">
				<input type="text" v-model="verify" placeholder="请输入验证码" placeholder-class="inps" style="width: 50%;" />
				<view class="inp-nr-btn" v-if="time===60" @click="getVerify">
					获取验证码
				</view>
				<view class="inp-nr-btn" v-else @click="tipsVerify">
					重新获取{{time}}s
				</view>
			</view>
		</view>
		<view class="btn" @click="bindLogin">
			登录
		</view>
		<!-- <view class="tips" @click="toRegister">
			<text>新用户注册</text>
		</view> -->
		<view class="tips">
			登录注册即表示同意<text @click="toAgreement">《用户协议》</text>
		</view>
	</view>
</template>

<script>
	import {
		Login,
		GetVerify,
		OpenidForCode
	} from '@/network/api.js'
	export default {
		data() {
			return {
				account:'',//手机号
				verify:'',//验证码
				timer: '', //获取 验证码 定时器
				time: 60, //获取 验证码 倒计时 时间
				refresh: 1,//登录成功后，返回上一页是否刷新 1 刷新 2 不刷新
			};
		},
		onLoad(options) {
			// refresh 登录成功后，返回上一页是否刷新 1 刷新 2 不刷新
			this.refresh = options.refresh
		},
		onUnload() {
			clearInterval(this.timer)
			this.time = 60
		},
		onHide() {
			clearInterval(this.timer)
			this.time = 60
		},
		methods:{
			// 跳转到 用户协议
			toAgreement() {
				uni.navigateTo({
					url:'/pages/Rule/Rule?type=' + 1 + '&title=' + '用户协议'
				})
			},
			// 获取验证码
			getVerifyFunc() {
				let data = {
					account: this.account,
					unique_code: 'login'
				}
				GetVerify(data).then((res) => {
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
					this.timer = this.timerFunc()
				})
			},
			getVerify() {
				this.$u.debounce(this.getVerifyFunc, 1000, true)
			},
			// 定时器
			timerFunc() {
				return setInterval(() => {
					if (this.time < 1) {
						clearInterval(this.timer)
						this.time = 60
					} else {
						this.time -= 1
					}
				}, 1000)
			},
			// 重复 获取验证码提示
			tipsVerify() {
				uni.showToast({
					title: '请不要重复获取验证码',
					icon: 'none'
				})
			},
			// 跳转到 注册
			toRegister() {
				uni.navigateTo({
					url:'/pages/Register/Register'
				})
			},
			// 登录
			loginFunc() {
				uni.login({
					fail: (err) => {
						console.log(err, '获取code失败')
					},
					success: (res) => {
						console.log(res, '获取code成功')
						let datas = {
							code: res.code
						}
						OpenidForCode(datas, false).then((res) => {
							console.log(res, 'openid')
							let data = {
								account: this.account,
								verify: this.verify,
								openid: res.data.data.openid,
								unique_code: 'login'
							}
							Login(data).then((res) => {
								uni.setStorageSync('userinfo',res.data.data)
								// 更新 vuex 里的数据
								this.$updateFUNC()
								uni.showToast({
									title: res.data.message,
									icon: 'none',
									duration:1500,
									success: (res) => {
										setTimeout(()=>{
											if(this.refresh==1){
												// 返回上一页 刷新
												let pages=getCurrentPages()
												let prevPage=pages[pages.length-2]
												prevPage.onLoad()
											}
											uni.navigateBack({
												delta:1
											})
										},1510)
									}
								})
							})
						})
					}
				})
			},
			bindLogin() {
				this.$u.debounce(this.loginFunc, 1000, true)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		padding: 0 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.logo{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 120rpx;
		margin-bottom: 70rpx;
		&-img{
			width: 160rpx;
			height: 160rpx;
			margin-bottom: 20rpx;
		}
		>text{
			font-size: 42rpx;
			color: #333333;
			font-weight: 600;
		}
	}
	.inps{
		font-size: 30rpx;
		color: #999999;
		font-weight: 400;
	}
	.inp{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 40rpx;
		>text{
			font-size: 30rpx;
			color: #333333;
			font-weight: 400;
		}
		&-nr{
			width: 100%;
			padding: 30rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx solid #F6F4F4;
			>input{
				width: 100%;
				font-size: 30rpx;
				color: #333333;
				font-weight: 4000;
			}
			&-btn{
				width: 35%;
				text-align: center;
				padding: 5rpx 0;
				border-left: 2rpx solid #CACACA;
				font-size: 28rpx;
				color: #FBAA00;
				font-weight: 400;
			}
		}
	}
	.btn{
		width: 100%;
		height: 88rpx;
		background: #77C881;
		border-radius: 44rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		font-weight: 600;
		margin-top: 40rpx;
	}
	.tips {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 25rpx 0;
		font-size: 28rpx;
		color: #B8B8B8;
		font-weight: 400;
	
		>text {
			font-size: 28rpx;
			color: #333333;
			font-weight: 400;
		}
	}
</style>
