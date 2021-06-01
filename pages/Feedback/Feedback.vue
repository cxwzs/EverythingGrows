<template>
	<view class="container">
		<textarea v-model="content" placeholder="请输入您的反馈意见，感谢您帮助我们改进产品和服务！" placeholder-class="inps" maxlength="-1"
		 :auto-height="true"></textarea>
		<input v-model="contact" type="text" placeholder="请留下你的邮箱、QQ号或手机号" placeholder-class="inps" />
		<view class="btn" @click="bindFeedBack">
			确定
		</view>
	</view>
</template>

<script>
	import {
		Feedback
	} from '@/network/api.js'
	export default {
		data() {
			return {
				content: '', //内容
				contact: '', //联系人
			};
		},
		methods: {
			// 意见反馈
			bindFeedBack() {
				let data = {
					content: this.content,
					contact: this.contact
				}
				Feedback(data).then((res) => {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 1500,
						success: (res) => {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1510)
						}
					})
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
		padding: 30rpx 40rpx;

		>textarea {
			width: 100%;
			min-height: 350rpx;
			height: 350rpx;
			box-sizing: border-box;
			padding: 30rpx;
			font-size: 28rpx;
			color: #333;
			font-weight: 400;
			line-height: 1.5;
			background-color: #fff;
			border-radius: 20rpx;
		}

		>input {
			width: 100%;
			height: 98rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			font-size: 28rpx;
			color: #333;
			font-weight: 400;
			margin-top: 30rpx;
		}

		.btn {
			width: 100%;
			height: 88rpx;
			background: linear-gradient(-28deg, #77C881, #62BD6A);
			border-radius: 44rpx;
			line-height: 88rpx;
			text-align: center;
			font-size: 32rpx;
			color: #fff;
			font-weight: 600;
			margin-top: 80rpx;
		}
	}

	.inps {
		font-size: 28rpx;
		color: #9E9E9E;
		font-weight: 400;
	}
</style>
