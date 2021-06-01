<template>
	<view class="container" :class="iPhoneX?'_iPhoneX':'paddingTabbar'" v-if="indexData">
		<!-- navBar -->
		<view style="width: 100%;" v-show="navBar">
			<u-navbar :background="background" :is-back="false" title-color="#333" title="首页"></u-navbar>
		</view>
		<!-- banner -->
		<view class="banner" v-if="indexData.adverts.length">
			<!-- <u-image width="100%" height="100%" src="https://cdn.uviewui.com/uview/swiper/2.jpg"></u-image> -->
			<u-swiper @click="bindBanner" :list="indexData.adverts" name="abs_url" height="400"></u-swiper>
		</view>
		<!-- user -->
		<view class="user" v-if="userInfo">
			<view class="user-content">
				<!-- 用户信息 -->
				<view class="user-content-info">
					<view class="user-content-info-left">
						<view class="user-content-info-left-img">
							<u-image shape="circle" width="100%" height="100%" :src="userInfo.avatar"></u-image>
						</view>
						<view class="user-content-info-left-text">
							{{userInfo.nickname}}
						</view>
					</view>
					<view class="user-content-info-right" @click="vipCodePopup = true">
						<view class="user-content-info-right-icon">
							<image src="/static/img/img_1.png" mode=""></image>
						</view>
						<text>会员码</text>
					</view>
				</view>
				<!-- 统计 -->
				<view class="user-content-statistics">
					<view class="user-content-statistics-item">
						<view class="user-content-statistics-item-num">
							<view>{{userInfo.balance}}</view>
							<text>粒</text>
						</view>
						<text>万物种子</text>
					</view>
					<view class="user-content-statistics-item">
						<view class="user-content-statistics-item-num">
							<view>{{userInfo.integral}}</view>
							<text>颗</text>
						</view>
						<text>万物果实</text>
					</view>
					<view class="user-content-statistics-item">
						<view class="user-content-statistics-item-num">
							<view>{{userInfo.create_tian}}</view>
							<text>天</text>
						</view>
						<text>您已来到</text>
					</view>
				</view>
				<!-- 按钮 -->
				<view class="user-content-btn">
					<view class="user-content-btn-item">
						<view style="border-right: 2rpx solid #EEEEEE;" @click="toGetSeed">补充种子</view>
					</view>
					<view class="user-content-btn-item" @click="toFruitMall">
						<view>兑换果实</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 作品展示 -->
		<view class="works" v-if="indexData.member_works.length!=0">
			<!-- 标题 -->
			<Section title="作品展示" toPage="/pages/WorksShow/WorksShow"></Section>
			<!-- 内容 -->
			<view class="works-content">
				<scroll-view :scroll-x="true" :enable-flex="true" class="works-content-list">
					<Works v-for="(item,index) in indexData.member_works" :key="index" :index="index" :item="item"></Works>
				</scroll-view>
			</view>
		</view>
		<!-- 亲子分享 -->
		<view class="parenting" v-if="indexData.member_article.length!=0">
			<!-- 标题 -->
			<Section title="亲子分享" toPage="/pages/ParentingShare/ParentingShare"></Section>
			<!-- 内容 -->
			<view class="parenting-content">
				<Parenting v-for="(item,index) in indexData.member_article" :key="index" :index="index" :item="item"></Parenting>
			</view>
		</view>
		<!-- 会员码 展示弹窗 -->
		<VipCode @vipCodePopupClose="vipCodePopupClose" :vipCodePopup="vipCodePopup"></VipCode>
	</view>
</template>

<script>
	import tabbar from '@/common/mixin'
	import Section from './components/Section.vue'
	import Parenting from './components/Parenting.vue'
	import Works from './components/Works.vue'
	import VipCode from '@/components/VipCode/VipCode.vue'
	import {
		Index,
		IndexUser
	} from '@/network/api.js'
	export default {
		data() {
			return {
				background: {
					background: `${'#fff'}`
				},
				navBar: false, //页面标题 动态出现
				iPhoneX: getApp().globalData.iPhoneX, //兼容iPhone X 当前设备是否是iPhone X
				vipCodePopup: false, //vip码弹窗 出现/隐藏
				indexData: '', //首页数据
				userInfo: '', //用户资料
			}
		},
		mixins: [tabbar],
		components: {
			Section,
			Parenting,
			Works,
			VipCode
		},
		computed: {
			// 是否已设置 支付密码
			is_pay_pass() {
				return this.$store.state.is_pay_pass
			}
		},
		// 监听 页面滚动 实现页面标题 动态出现
		onPageScroll(e) {
			if(this.indexData.adverts.length) {
				if (e.scrollTop > 150) {
					this.navBar = true
				} else {
					this.navBar = false
				}
			}
		},
		onShow() {
			this.setTabBarIndex(0)
			// 获取 首页 数据
			this.getIndex()
			if (uni.getStorageSync('userinfo') && uni.getStorageSync('member_id') != null && uni.getStorageSync('member_id') !=
				undefined) {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id
				}
				IndexUser(data, false).then((res) => {
					this.userInfo = res.data.data
					// 更新 vuex 里的数据
					this.$updateFUNC()
				})
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			let data = {
				m_id: uni.getStorageSync('userinfo').m_id
			}
			Index(data).then((res) => {
				this.indexData = res.data.data
				this.navBar = res.data.data.adverts.length ? false : true
				uni.stopPullDownRefresh()
			}).catch((err) => {
				console.log(err, 'Index')
				uni.stopPullDownRefresh()
			})
			if (uni.getStorageSync('userinfo') && uni.getStorageSync('member_id') != null && uni.getStorageSync('member_id') !=
				undefined) {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id
				}
				IndexUser(data, false).then((res) => {
					this.userInfo = res.data.data
					// 更新 vuex 里的数据
					this.$updateFUNC()
				})
			}
		},
		methods: {
			// 跳转到 果实商城
			toFruitMall() {
				uni.navigateTo({
					url: '/pages/FruitMall/FruitMall'
				})
			},
			// 跳转到 获取种子
			toGetSeed() {
				//is_pay_pass 是否已设置 支付密码 1 已设置 0 未设置
				uni.navigateTo({
					url: this.is_pay_pass ? '/pages/Seed/Seed' : '/pages/FromSeed/FromSeed'
				})
			},
			// vip码弹窗 关闭
			vipCodePopupClose() {
				this.vipCodePopup = false
			},
			// 获取 首页 数据
			getIndex() {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id
				}
				Index(data, false).then((res) => {
					this.indexData = res.data.data
					this.navBar = res.data.data.adverts.length ? false : true
				}).catch((err) => {
					console.log(err, 'Index')
				})
			},
			// 点击 banner
			bindBanner(index) {
				/*
					rule 跳转规则 1作品详情 2文章详情 3课程详情 4商品详情 5直播间
					param 跳转参数
				*/
				let rule = this.indexData.adverts[index].target_rule
				let param = this.indexData.adverts[index].param
				switch (Number(rule)) {
					case 1:
						uni.navigateTo({
							url: '/pages/WorksDetail/WorksDetail?id=' + param
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/ArticleDetail/ArticleDetail?id=' + param
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/CurriculumDetail/CurriculumDetail?id=' + param
						})
						break;
					case 4:
						uni.navigateTo({
							url: '/pages/GoodsDetail/GoodsDetail?type=' + 1 + '&goods_id=' + param
						})
						break;
					default:
						console.log(rule, 'rule', param, 'param')
				}
			}
		}
	}
</script>

<style lang="scss">
	.banner {
		width: 100%;
		height: 400rpx;
	}

	.user {
		width: 100%;
		padding: 0 30rpx;
		height: 410rpx;

		&-content {
			width: 100%;
			height: 100%;
			position: relative;
			left: 0;
			right: 0;
			top: -40rpx;
			padding-top: 40rpx;
			background-color: #fff;
			box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;

			&-info {
				width: 100%;
				padding: 0 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				&-left {
					width: 70%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					&-img {
						width: 100rpx;
						height: 100rpx;
					}

					&-text {
						width: 71%;
						text-align: justify;
						font-size: 32rpx;
						font-weight: 600;
						color: #333333;
						@include text-hidden-line(1);
					}
				}

				&-right {
					width: 160rpx;
					height: 52rpx;
					background: #F1F9F2;
					border-radius: 26rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					&-icon {
						width: 32rpx;
						height: 32rpx;
						margin-right: 10rpx;
					}

					>text {
						font-size: 22rpx;
						font-weight: 400;
						color: #666666;
					}
				}
			}

			&-statistics {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				&-item {
					width: 33.33%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					>text {
						font-size: 26rpx;
						font-weight: 600;
						color: #666666;
					}

					&-num {
						display: flex;
						align-items: flex-end;
						margin-bottom: 5rpx;

						>view {
							font-size: 48rpx;
							font-weight: 600;
							color: #333333;
							margin-right: 6rpx;
						}

						>text {
							font-size: 24rpx;
							font-weight: 600;
							color: #333333;
							margin-bottom: 8rpx;
						}
					}
				}
			}

			&-btn {
				width: 100%;
				height: 78rpx;
				background: #FFFFFF;
				box-shadow: 0rpx -6rpx 10rpx 0rpx rgba(198, 229, 211, 0.2);
				border-radius: 0rpx 0rpx 20rpx 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				&-item {
					width: 50%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					>view {
						width: 100%;
						text-align: center;
						font-size: 24rpx;
						font-weight: 400;
						color: #666666;
					}
				}
			}
		}
	}

	.works {
		width: 100%;
		margin-top: 20rpx;

		&-content {
			width: 100%;
			margin-top: 40rpx;
			height: 370rpx;
			overflow: hidden;

			&-list {
				width: 100%;
				height: 400rpx;
				display: flex;
				align-items: flex-start;
			}
		}
	}

	.parenting {
		width: 100%;
		margin-top: 40rpx;

		&-content {
			width: 100%;
			padding: 0 30rpx;
		}
	}
</style>
