<template>
	<view class="container">
		<input type="text" v-model="code" placeholder="请填写激活码" placeholder-class="inps" />
		<view class="btn" @click="bindActive">
			激活
		</view>
	</view>
</template>

<script>
	import {
		CourseActive
	} from '@/network/api.js'
	export default {
		data() {
			return {
				code: '', //激活码
			};
		},
		methods: {
			// 激活
			bindActive() {
				CourseActive({
					m_id: uni.getStorageSync('userinfo').m_id,
					code: this.code
				}).then(res => {
					uni.showToast({
						title: '激活成功',
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
					console.log(err,'CourseActive')
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
		padding: 30rpx;

		>input {
			width: 100%;
			height: 104rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 20rpx;
			font-size: 30rpx;
			color: #333;
			padding: 0 30rpx;
		}
	}

	.btn {
		width: 100%;
		height: 88rpx;
		background: #77C881;
		border-radius: 44rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		font-weight: 600;
		margin-top: 400rpx;
	}
</style>
