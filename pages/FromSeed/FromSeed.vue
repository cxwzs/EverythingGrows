<template>
	<view class="container">
		<u-navbar :is-back="true" back-icon-color="#fff" :border-bottom="false" :back-icon-color="navbarScroll?'#333':'#fff'" :background="background"></u-navbar>
		<view class="container-bg">
			<image src="/static/img/img_32.png" mode=""></image>
		</view>
		<view class="content">
			<!-- 用户购买须知 -->
			<view class="konw">
				<view class="konw-icon" @click="know = !know">
					<image v-if="!know" src="/static/img/img_3.png" mode=""></image>
					<image v-else src="/static/img/img_4.png" mode=""></image>
				</view>
				<view class="konw-text">
					我已阅读并同意<text @click="toAgreement">《用户购买须知》</text>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="btn">
				<view class="btn-content" @click="openWallet">
					开通钱包
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					background: `${'rgba(0,0,0,0)'}`
				},
				navbarScroll: false, //页面标题 是否出现背景色(根据页面滚动距离判断)
				know: false,//用户是否勾选 用户购买须知
			};
		},
		// 监听 页面滚动 实现页面标题背景色动态设置
		onPageScroll(e) {
			if (e.scrollTop > 90) {
				this.navbarScroll = true
				this.background = {
					background: `${'#fff'}`
				}
			} else {
				this.navbarScroll = false
				this.background = {
					background: `${'rgba(0,0,0,0)'}`
				}
			}
		},
		methods:{
			// 跳转到 用户购买须知
			toAgreement() {
				uni.navigateTo({
					url:'/pages/Rule/Rule?type=' + 7 + '&title=' + '用户购买须知'
				})
			},
			// 开通钱包
			openWallet() {
				if(this.know) {
					uni.showModal({
						title:'提示',
						content:'为了您的安全，请先设置6位数字支付密码后开通万物生长钱包。',
						success: (res) => {
							if(res.confirm){
								// 点击了确定
								uni.navigateTo({
									url:'/pages/SetPassword/SetPassword'
								})
							}
						}
					})
				}else{
					uni.showToast({
						title:'请先勾选《用户购买须知》',
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height: 1808rpx;
		position: relative;
		z-index: 5;
		&-bg{
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 6;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}
	}
	
	.content{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 7;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
	}
	
	.konw {
		width: 100%;
		padding: 0 40rpx;
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
		padding: 40rpx;
		// background-color: #fff;
		// position: fixed;
		// z-index: 5;
		// bottom: 0;
		// left: 0;
		// right: 0;
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
			background: linear-gradient(-180deg, #FEB527 0%, #FD5B2C 100%);
		}
	}
</style>
