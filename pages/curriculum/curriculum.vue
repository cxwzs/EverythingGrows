<template>
	<view class="container" :class="iPhoneX?'_iPhoneX':'paddingTabbar'">
		<view class="menu">
			<view class="menu-item" @click="toCurriculumClass(1)">
				<view class="menu-item-content">
					<text style="color: #FF9C7F;">VIDEO COURSE</text>
					<view class="menu-item-content-text">
						<view style="color: #FF835F;">录播课程</view>
						<text style="color: #FF9C7F;">直播课程</text>
					</view>
				</view>
				<view class="menu-item-img">
					<image src="/static/img/img_36.png" mode=""></image>
				</view>
			</view>
			<view class="menu-item" @click="toCurriculumClass(2)">
				<view class="menu-item-content">
					<text style="color: #9ECAFE;">PURCHASED COURSE</text>
					<view class="menu-item-content-text">
						<view style="color: #3FA2FE;">已购课程</view>
						<text style="color: #9ECAFE;">直播课程</text>
					</view>
				</view>
				<view class="menu-item-img">
					<image src="/static/img/img_37.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabbar from '@/common/mixin'
	export default {
		data() {
			return {
				iPhoneX: getApp().globalData.iPhoneX, //兼容iPhone X 当前设备是否是iPhone X
			};
		},
		mixins: [tabbar],
		onShow() {
			this.setTabBarIndex(1)
		},
		methods: {
			// 跳转到 课程分类
			toCurriculumClass(type) {
				//type 1 录播课程 2 已购课程
				//如果点击的是已购课程，判断是否登录
				let status = type == 1 ? true : this.$LoginIF() ? true : false
				if(status) {
					uni.navigateTo({
						url: '/pages/CurriculumClass/CurriculumClass?type=' + type
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(146deg, #77C881, #62BD6A);
	}
</style>

<style lang="scss" scoped>
	.menu {
		width: 100%;
		padding: 10rpx 30rpx;

		&-item {
			width: 100%;
			height: 280rpx;
			margin-top: 30rpx;
			background-color: #fff;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			overflow: hidden;

			&-img {
				width: 280rpx;
				height: 280rpx;
			}

			&-content {
				width: 58%;
				height: 100%;
				padding: 50rpx 0 60rpx 50rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;

				>text {
					font-size: 26rpx;
					font-weight: 600;
				}

				&-text {
					display: flex;
					flex-direction: column;
					align-items: flex-start;

					>view {
						font-size: 42rpx;
						font-weight: 600;
					}

					>text {
						font-size: 26rpx;
						font-weight: 400;
						margin-top: 10rpx;
					}
				}
			}
		}
	}
</style>
