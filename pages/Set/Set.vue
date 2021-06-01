<template>
	<view class="container">
		<view class="menu" @click="toFeedback">
			<view>意见反馈</view>
			<u-icon name="arrow-right" color="#999999" size="32"></u-icon>
		</view>
		<view class="menu" @click="toPlatformAgreement">
			<view>平台协议</view>
			<u-icon name="arrow-right" color="#999999" size="32"></u-icon>
		</view>
		<view class="menu" @click="aboutUsPopup = true">
			<view>关于我们</view>
			<u-icon name="arrow-right" color="#999999" size="32"></u-icon>
		</view>
		<view class="btn">
			<view class="btn-content" @click="bindLogOut">
				{{m_id?'退出登录':'去登录'}}
			</view>
		</view>
		<!-- 关于我们 弹窗 -->
		<u-popup @close="aboutUsPopup = false" v-model="aboutUsPopup" mode="center" border-radius="20" width="630" height="625">
			<view class="about">
				<text>公众号</text>
				<view class="about-img">
					<u-image width="100%" height="100%" :src="code"></u-image>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		AboutUs
	} from '@/network/api.js'
	export default {
		data() {
			return {
				aboutUsPopup: false,//关于我们 弹窗 出现/隐藏
				code:'',//关于我们 公众号二维码
				m_id:''
			};
		},
		onLoad() {
			// 获取 关于我们 公众号二维码
			AboutUs({},false).then((res)=>{
				this.code = res.data.data.logo
			})
		},
		onShow() {
			if (uni.getStorageSync('userinfo') && uni.getStorageSync('userinfo') != null && uni.getStorageSync('userinfo') !=
		undefined) {
				this.m_id = uni.getStorageSync('userinfo').m_id
			}
		},
		methods:{
			// 跳转到 意见反馈
			toFeedback() {
				uni.navigateTo({
					url:'/pages/Feedback/Feedback'
				})
			},
			// 跳转到 平台协议
			toPlatformAgreement() {
				uni.navigateTo({
					url:'/pages/PlatformAgreement/PlatformAgreement'
				})
			},
			// 退出登录
			bindLogOut() {
				if(this.m_id) {
					uni.removeStorageSync('userinfo')
					uni.reLaunch({
						url:'/pages/mine/mine'
					})
				}else{
					uni.navigateTo({
						url: '/pages/Login/Login?refresh=' + 2
					})
				}
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
	.menu {
		width: 100%;
		height: 104rpx;
		padding: 0 40rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2rpx;

		>view {
			font-size: 30rpx;
			color: #333333;
			font-weight: 400;
		}
	}

	.btn {
		width: 100%;
		padding: 0 40rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 80rpx;
		z-index: 9;

		&-content {
			width: 100%;
			height: 88rpx;
			background: linear-gradient(-28deg, #77C881, #62BD6A);
			border-radius: 44rpx;
			line-height: 88rpx;
			text-align: center;
			font-size: 32rpx;
			color: #fff;
			font-weight: 600;
		}
	}
	
	.about{
		width: 630rpx;
		height: 625rpx;
		padding: 60rpx 115rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		>text{
			font-size: 36rpx;
			color: #333333;
			font-weight: 600;
		}
		&-img{
			width: 100%;
			height: 400rpx;
		}
	}
</style>
