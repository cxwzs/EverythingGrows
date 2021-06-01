<template>
	<view class="container" :class="iPhoneX?'_iPhoneX':'paddingTabbar'">
		<!-- top -->
		<view class="top">
			<view class="top-bg">
				<image src="/static/img/img_5.png" mode=""></image>
			</view>
			<u-navbar :is-back="false" title="我的" background="{background:rgba(0,0,0,0)}" :border-bottom="false" title-color="#fff"></u-navbar>
			<view class="top-content">
				<view class="top-content-nr" v-if="!m_id" @click="toLogin">
					<view class="top-content-nr-img">
						<image src="/static/img/img_35.png" mode=""></image>
					</view>
					<view class="top-content-nr-name">注册/登录</view>
				</view>
				<view class="top-content-nr" v-if="m_id" @click="toUserInfo">
					<view class="top-content-nr-img">
						<u-image width="100%" height="100%" border-radius="50%" :src="userinfo.avatar_path"></u-image>
					</view>
					<view class="top-content-nr-name">{{userinfo.nickname}}</view>
					<u-icon name="edit-pen-fill" color="#fff" size="36"></u-icon>
				</view>
			</view>
		</view>
		<!-- 导航 -->
		<view class="nav" v-if="m_id">
			<view class="nav-content">
				<view class="nav-content-item" @click="toCurriculum">
					<view class="nav-content-item-icon">
						<image src="/static/img/img_6.png" mode=""></image>
					</view>
					<view class="nav-content-item-num">
						<view>{{course_nums}}</view>
						<text>节</text>
					</view>
					<text>已购课程</text>
				</view>
				<view class="nav-content-item" @click="toGetSeed">
					<view class="nav-content-item-icon">
						<image src="/static/img/img_7.png" mode=""></image>
					</view>
					<view class="nav-content-item-num">
						<view>{{balance}}</view>
						<text>粒</text>
					</view>
					<text>万物种子</text>
				</view>
				<view class="nav-content-item" @click="toFruitMall">
					<view class="nav-content-item-icon">
						<image src="/static/img/img_8.png" mode=""></image>
					</view>
					<view class="nav-content-item-num">
						<view>{{integral}}</view>
						<text>颗</text>
					</view>
					<text>万物果实</text>
				</view>
				<view class="nav-content-item" @click="toAllThingsCard">
					<view class="nav-content-item-icon">
						<image src="/static/img/img_9.png" mode=""></image>
					</view>
					<view class="nav-content-item-num">
						<view>{{giftNums}}</view>
						<text>个</text>
					</view>
					<text>万物有礼</text>
				</view>
			</view>
		</view>
		<!-- 菜单 -->
		<view class="menu">
			<view class="menu-item" @click="vipCodePopupOpen">
				<view class="menu-item-icon">
					<image src="/static/img/img_10.png" mode=""></image>
				</view>
				<text>会员码</text>
			</view>
			<view class="menu-item" @click="toWorksAndCollect(1)">
				<view class="menu-item-icon">
					<image src="/static/img/img_11.png" mode=""></image>
				</view>
				<text>我的作品</text>
			</view>
			<view class="menu-item" @click="toShoppingCar">
				<view class="menu-item-icon">
					<image src="/static/img/img_12.png" mode=""></image>
				</view>
				<text>购物车</text>
			</view>
			<view class="menu-item" @click="toOrder">
				<view class="menu-item-icon">
					<image src="/static/img/img_13.png" mode=""></image>
				</view>
				<text>我的订单</text>
			</view>
		</view>
		<!-- 标题 -->
		<view class="title">
			常用工具
		</view>
		<view class="menu">
			<view class="menu-item" @click="toGetSeed">
				<view class="menu-item-icon">
					<image src="/static/img/img_14.png" mode=""></image>
				</view>
				<text>获得种子</text>
			</view>
			<view class="menu-item" @click="toCoupon">
				<view class="menu-item-icon">
					<image src="/static/img/img_15.png" mode=""></image>
				</view>
				<text>我的优惠券</text>
			</view>
			<view class="menu-item" @click="toAddress(1)">
				<view class="menu-item-icon">
					<image src="/static/img/img_16.png" mode=""></image>
				</view>
				<text>我的地址</text>
			</view>
			<view class="menu-item" @click="toWorksAndCollect(2)">
				<view class="menu-item-icon">
					<image src="/static/img/img_17.png" mode=""></image>
				</view>
				<text>我的收藏</text>
			</view>
			<view class="menu-item">
				<view class="menu-item-icon">
					<image src="/static/img/img_18.png" mode=""></image>
				</view>
				<text>联系客服</text>
				<button open-type="contact" plain></button>
			</view>
			<view class="menu-item" @click="toCourseActive">
				<view class="menu-item-icon">
					<image src="/static/img/img_39.png" mode=""></image>
				</view>
				<text>课程激活</text>
			</view>
			<view class="menu-item" @click="toSet">
				<view class="menu-item-icon">
					<image src="/static/img/img_19.png" mode=""></image>
				</view>
				<text>设置</text>
			</view>
		</view>
		<!-- 会员码 展示弹窗 -->
		<VipCode @vipCodePopupClose="vipCodePopupClose" :vipCodePopup="vipCodePopup"></VipCode>
	</view>
</template>

<script>
	import tabbar from '@/common/mixin'
	import VipCode from '@/components/VipCode/VipCode.vue'
	import {
		GetInfo
	} from '@/network/api.js'
	export default {
		data() {
			return {
				iPhoneX: getApp().globalData.iPhoneX, //兼容iPhone X 当前设备是否是iPhone X
				vipCodePopup: false, //vip码弹窗 出现/隐藏
				m_id:'',//用户id
				userinfo:'',//用户资料
			};
		},
		mixins: [tabbar],
		components: {
			VipCode
		},
		computed:{
			// 种子数量
			balance() {
				return this.$store.state.balance
			},
			// 果实数量
			integral() {
				return this.$store.state.integral
			},
			// 万物卡数量
			giftNums() {
				return this.$store.state.gift_nums
			},
			// 已学课程
			course_nums() {
				return this.$store.state.course_nums
			},
			// 是否已设置 支付密码
			is_pay_pass() {
				return this.$store.state.is_pay_pass
			}
		},
		onShow() {
			this.setTabBarIndex(4)
			// 获得用户资料
			if (uni.getStorageSync('userinfo') && uni.getStorageSync('userinfo') != null && uni.getStorageSync('userinfo') !=
				undefined) {
				this.m_id = uni.getStorageSync('userinfo').m_id
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id
				}
				GetInfo(data,false).then((res) => {
					this.userinfo = res.data.data
					// 更新 vuex 里的数据
					this.$updateFUNC()
				})
			}
		},
		methods: {
			// 跳转到 课程激活
			toCourseActive() {
				if (this.$LoginIF()) {
					uni.navigateTo({
						url:'/pages/CourseActive/CourseActive'
					})
				}
			},
			// 跳转到 登录
			toLogin() {
				// refresh 登录成功后，返回当前页是否刷新 1 刷新 2 不刷新
				uni.navigateTo({
					url: '/pages/Login/Login?refresh=' + 1
				})
			},
			// 跳转到 已购课程
			toCurriculum() {
				uni.navigateTo({
					url:'/pages/CurriculumClass/CurriculumClass?type=' + 2
				})
			},
			// 跳转到 地址列表
			toAddress(type) {
				if (this.$LoginIF()) {
					/*
						type 1 我的页面进入 2 确认订单页面进入
					*/
					uni.navigateTo({
						url: '/pages/Address/Address?type=' + type
					})
				}
			},
			// 跳转到 个人资料
			toUserInfo() {
				uni.navigateTo({
					url: '/pages/UserInfo/UserInfo'
				})
			},
			// 跳转到 果实商城
			toFruitMall() {
				uni.navigateTo({
					url: '/pages/FruitMall/FruitMall'
				})
			},
			// 跳转到 获取种子
			toGetSeed() {
				if (this.$LoginIF()) {
					//is_pay_pass 是否已设置 支付密码 1 已设置 0 未设置
					uni.navigateTo({
						url: this.is_pay_pass?'/pages/Seed/Seed':'/pages/FromSeed/FromSeed'
					})
				}
			},
			// vip码弹窗 关闭
			vipCodePopupClose() {
				this.vipCodePopup = false
			},
			// vip码弹窗 开启
			vipCodePopupOpen() {
				if (this.$LoginIF()) {
					this.vipCodePopup = true
				}
			},
			// 跳转到 万物有礼
			toAllThingsCard() {
				uni.navigateTo({
					url: '/pages/AllThingsCard/AllThingsCard'
				})
			},
			// 跳转到 我的优惠券
			toCoupon() {
				if (this.$LoginIF()) {
					uni.navigateTo({
						url: '/pages/Coupon/Coupon'
					})
				}
			},
			// 跳转到 订单列表
			toOrder() {
				if (this.$LoginIF()) {
					uni.navigateTo({
						url: '/pages/Order/Order'
					})
				}
			},
			// 跳转到 购物车
			toShoppingCar() {
				if (this.$LoginIF()) {
					uni.navigateTo({
						url: '/pages/ShoppingCart/ShoppingCart'
					})
				}
			},
			// 跳转到 设置
			toSet() {
				uni.navigateTo({
					url: '/pages/Set/Set'
				})
			},
			// 跳转到 我的作品/我的收藏
			toWorksAndCollect(type) {
				if (this.$LoginIF()) {
					/*
						type 1 我的作品 2 我的收藏
					*/
					uni.navigateTo({
						url: '/pages/WorksAndCollect/WorksAndCollect?type=' + type
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		width: 100%;
		height: 400rpx;
		position: relative;
		z-index: 2;

		&-bg {
			position: absolute;
			z-index: 3;
			left: 0;
			right: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}

		&-content {
			position: absolute;
			z-index: 4;
			left: 0;
			right: 0;
			top: 0;
			width: 100%;
			height: 100%;
			padding: 0 65rpx 100rpx 65rpx;
			display: flex;
			align-items: flex-end;

			&-nr {
				width: 100%;
				height: 126rpx;
				display: flex;
				align-items: center;
				position: relative;
				z-index: 5;

				&-img {
					width: 126rpx;
					height: 100%;
					margin-right: 30rpx;
				}

				&-name {
					max-width: 50%;
					font-size: 32rpx;
					color: #FFFFFF;
					font-weight: 600;
					margin-right: 20rpx;
					@include text-hidden-line(1);
				}
			}
		}
	}

	.nav {
		width: 100%;
		height: 240rpx;
		padding: 0 40rpx;

		&-content {
			width: 100%;
			height: 100%;
			position: relative;
			z-index: 10;
			top: -40rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 20rpx;
			padding: 40rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-item {
				width: 25%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;

				&-icon {
					width: 112rpx;
					height: 76rpx;
				}

				>text {
					font-size: 20rpx;
					color: #666666;
					font-weight: 400;
				}

				&-num {
					width: 96%;
					display: flex;
					align-items: center;
					justify-content: center;

					>view {
						max-width: 83%;
						text-align: center;
						font-size: 32rpx;
						color: #333333;
						font-weight: 600;
						margin-right: 10rpx;
						@include text-hidden-line(1);
					}

					>text {
						font-size: 20rpx;
						color: #333333;
						font-weight: 600;
					}
				}
			}
		}
	}

	.menu {
		width: 100%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		&-item {
			width: 25%;
			padding: 20rpx 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			z-index: 5;

			>button {
				@include shareButton();
			}

			&-icon {
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 15rpx;
			}

			>text {
				font-size: 24rpx;
				color: #666666;
				font-weight: 600;
			}
		}
	}

	.title {
		width: 100%;
		text-align: left;
		font-size: 30rpx;
		color: #333333;
		font-weight: 600;
		padding: 30rpx 40rpx;
	}
</style>
