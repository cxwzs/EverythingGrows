<template>
	<view class="container" v-if="userinfo">
		<!-- top -->
		<view class="top">
			<u-navbar :is-back="true" :background="background" :border-bottom="false"
				:back-icon-color="navbarScroll?'#333':'#fff'" :title-color="navbarScroll?'#333':'#fff'" :title="title">
			</u-navbar>
			<view class="top-bg">
				<u-image width="100%" height="100%" :src="userinfo.beijin"></u-image>
			</view>
			<view class="top-content">
				<view class="top-content-tx">
					<view class="top-content-tx-img">
						<u-image width="100%" height="100%" border-radius="50%" :src="userinfo.avatar_path"></u-image>
					</view>
					<!-- <view class="top-content-tx-btn">
						关注
					</view> -->
				</view>
				<view class="top-content-name">
					{{userinfo.nickname}}
				</view>
				<view class="top-content-text">
					<text>ID：{{userinfo.member_sn}}</text>
					<text>{{userinfo.age}}</text>
					<text>{{userinfo.city_name}}</text>
				</view>
				<view class="top-content-num">
					<view class="top-content-num-item">
						<view>{{userinfo.works_collection}}</view>
						<text>关注</text>
					</view>
					<view class="top-content-num-item">
						<view>{{userinfo.works_fans}}</view>
						<text>粉丝</text>
					</view>
					<view class="top-content-num-item">
						<view>{{userinfo.works_zan}}</view>
						<text>互动</text>
					</view>
				</view>
			</view>
		</view>
		<u-sticky :enable="enable" offset-top="130">
			<!-- tabs -->
			<view class="tabs">
				<view class="tabs-content">
					<view class="tabs-content-nr">
						<u-tabs :list="tabs" height="105" :active-item-style="activeItem" active-color="#333333"
							:bar-style="barStyle" :is-scroll="false" :current="`${type-1}`" @change="changeTabs">
						</u-tabs>
					</view>
				</view>
				<!-- 收藏下的二级导航 -->
				<view class="tabs-two" v-if="type==2">
					<u-tabs :list="collectionTabs" height="105" active-color="#77C881" :is-scroll="false"
						:current="`${collectionTabs_index-1}`" @change="changeCollectionTabs"></u-tabs>
				</view>
			</view>
		</u-sticky>
		<!-- 作品 列表 -->
		<view class="works" v-show="type==1">
			<WorksItem v-for="(item,index) in MemberWorksList" :key="index" :item="item" :index="index"
				@delWorks="delWorks"></WorksItem>
		</view>
		<!-- 收藏 作品 列表 -->
		<view class="collection-works" v-show="type==2&&collectionTabs_index==1">
			<CollectionWorks v-for="(item,index) in CollectionWorksList" :key="index" :item="item"></CollectionWorks>
		</view>
		<!-- 收藏 亲子文章 列表 -->
		<view class="collection-article" v-show="type==2&&collectionTabs_index==2">
			<CollectionArticleItem v-for="(item,index) in CollectionArticleList" :key="index" :index="index"
				:item="item"></CollectionArticleItem>
		</view>
		<!-- 收藏 课程分类 列表 -->
		<view class="collection-curriculum" v-show="type==2&&collectionTabs_index==3">
			<CollectionCurriculum v-for="(item,index) in CollectionCurriculumClassList" :key="index" :item="item">
			</CollectionCurriculum>
		</view>
		<!-- 收藏 商品 列表 -->
		<view class="collection-goods" v-show="type==2&&collectionTabs_index==4">
			<CollectionGoodsItem v-for="(item,index) in CollectionGoodsList" :key="index" :item="item">
			</CollectionGoodsItem>
		</view>
		<!-- 更换主页背景 操作栏 -->
		<u-action-sheet :mask-close-able="false" :safe-area-inset-bottom="true" :list="sheet" v-model="sheetShow">
		</u-action-sheet>
	</view>
</template>

<script>
	import {
		MemberWorksLists,
		CollectionWorksLists,
		CollectionArticle,
		CollectionGoods,
		CollectionCurriculumClass,
		GetInfo,
		delWorks
	} from '@/network/api.js'
	import WorksItem from './components/WorksItem.vue'
	import CollectionWorks from './components/CollectionWorks.vue'
	import CollectionArticleItem from './components/CollectionArticle.vue'
	import CollectionCurriculum from './components/CollectionCurriculum.vue'
	import CollectionGoodsItem from './components/CollectionGoods.vue'
	export default {
		data() {
			return {
				enable: true,
				sheet: [{
					text: '更换背景'
				}],
				sheetShow: false,
				activeItem: {
					fontSize: '36rpx',
				},
				barStyle: {
					background: '#77C881',
				},
				tabs: [{
						name: '作品'
					},
					{
						name: '收藏'
					}
				],
				type: 1, //1 我的作品 2 我的收藏
				title: '我的作品',
				background: {
					background: `${'rgba(0,0,0,0)'}`
				},
				navbarScroll: false, //页面标题 是否出现背景色(根据页面滚动距离判断)
				collectionTabs: [{
						name: '作品收藏'
					},
					{
						name: '亲子分享'
					},
					{
						name: '课程'
					},
					{
						name: '商品'
					}
				], //收藏下的二级导航
				collectionTabs_index: 1, // 1 作品收藏 2 亲自分享 3 课程 4 商品
				CollectionWorksList: [], //作品收藏 列表
				CollectionWorksListPage: 1, //作品收藏 列表 分页
				CollectionArticleList: [], //亲子分享收藏 列表
				CollectionArticlePage: 1, //亲子分享收藏 列表 分页
				CollectionCurriculumClassList: [], //课程收藏 列表
				CollectionGoodsList: [], //商品收藏 列表
				CollectionGoodsPage: 1, //商品收藏 列表 分页
				MemberWorksList: [], //我的作品 列表
				MemberWorksListPage: 1, //我的作品 列表 分页
				userinfo: '', //用户资料
			};
		},
		components: {
			WorksItem,
			CollectionWorks,
			CollectionArticleItem,
			CollectionCurriculum,
			CollectionGoodsItem
		},
		watch: {
			// 监听 选中tabs的变化
			type: {
				handler(newValue, oldValue) {
					this.type = newValue
					this.title = newValue == 1 ? '我的作品' : '我的收藏'
				}
			}
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
		onLoad(options) {
			this.type = options.type
			this.title = this.type == 1 ? '我的作品' : '我的收藏'
			// 获取 个人资料
			let data = {
				m_id: uni.getStorageSync('userinfo').m_id
			}
			GetInfo(data, false).then((res) => {
				this.userinfo = res.data.data
			})
			// 获取 我的作品 列表
			this.getMemberWorksLists()
			// 获取 作品收藏 列表
			this.getCollectionWorksLists()
			// 获取 亲子分享收藏 列表
			this.getCollectionArticle()
			//获取 课程收藏 列表
			this.getCollectionCurriculumClass()
			// 获取 商品收藏 列表
			this.getCollectionGoods()
		},
		onShow() {
			this.enable = true
		},
		onHide() {
			this.enable = false
		},
		onReachBottom() {
			if (this.type == 1) {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					p: this.MemberWorksListPage + 1
				}
				MemberWorksLists(data, false).then(res => {
					if (res.data.data.length != 0) {
						this.MemberWorksList = [...this.MemberWorksList, ...res.data.data]
						this.MemberWorksListPage += 1
					} else {
						uni.showToast({
							title: '没有更多了',
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err, 'MemberWorksLists')
				})
			} else {
				switch (this.collectionTabs_index) {
					case 1:
						let dataWorks = {
							m_id: uni.getStorageSync('userinfo').m_id,
							p: this.CollectionWorksListPage + 1
						}
						CollectionWorksLists(dataWorks, false).then(res => {
							if (res.data.data.length != 0) {
								this.CollectionWorksList = [...this.CollectionWorksList, ...res.data.data]
								this.CollectionWorksListPage += 1
							} else {
								uni.showToast({
									title: '没有更多了',
									icon: 'none'
								})
							}
						}).catch(err => {
							console.log(err, 'CollectionWorksLists')
						})
						break;
					case 2:
						let dataArticle = {
							m_id: uni.getStorageSync('userinfo').m_id,
							p: this.CollectionArticlePage + 1
						}
						CollectionArticle(dataArticle, false).then(res => {
							if (res.data.data.length != 0) {
								this.CollectionArticleList = [...this.CollectionArticleList, ...res.data.data]
								this.CollectionArticlePage += 1
							} else {
								uni.showToast({
									title: '没有更多了',
									icon: 'none'
								})
							}
						}).catch(err => {
							console.log(err, 'CollectionArticle')
						})
						break;
					case 4:
						let dataGood = {
							m_id: uni.getStorageSync('userinfo').m_id,
							p: this.CollectionGoodsPage + 1
						}
						CollectionGoods(dataGood, false).then(res => {
							if (res.data.data.list.length != 0) {
								this.CollectionGoodsList = [...this.CollectionGoodsList, ...res.data.data.list]
								this.CollectionGoodsPage += 1
							} else {
								uni.showToast({
									title: '没有更多了',
									icon: 'none'
								})
							}
						}).catch(err => {
							console.log(err, 'CollectionGoods')
						})
						break;
				}
			}
		},
		methods: {
			// 切换 tabs
			changeTabs(index) {
				this.type = index + 1
			},
			// 切换 收藏下的 二级tabs
			changeCollectionTabs(index) {
				this.collectionTabs_index = index + 1
			},
			// 获取 作品收藏列表
			getCollectionWorksLists() {
				this.CollectionWorksListPage = 1
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					p: this.CollectionWorksListPage
				}
				CollectionWorksLists(data).then(res => {
					this.CollectionWorksList = res.data.data
				}).catch(err => {
					console.log(err, 'CollectionWorksLists')
				})
			},
			// 获取 亲子分享收藏 列表
			getCollectionArticle() {
				this.CollectionArticlePage = 1
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					p: this.CollectionArticlePage
				}
				CollectionArticle(data).then(res => {
					this.CollectionArticleList = res.data.data
				}).catch(err => {
					console.log(err, 'CollectionArticle')
				})
			},
			// 获取 课程收藏 列表
			getCollectionCurriculumClass() {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id
				}
				CollectionCurriculumClass(data).then(res => {
					this.CollectionCurriculumClassList = res.data.data
				}).catch(err => {
					console.log(err, 'CollectionCurriculumClass')
				})
			},
			// 获取 商品收藏 列表
			getCollectionGoods() {
				this.CollectionGoodsPage = 1
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					p: this.CollectionGoodsPage
				}
				CollectionGoods(data).then(res => {
					this.CollectionGoodsList = res.data.data.list
				}).catch(err => {
					console.log(err, 'CollectionGoods')
				})
			},
			// 获取 我的作品 列表
			getMemberWorksLists() {
				this.MemberWorksListPage = 1
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					p: this.MemberWorksListPage
				}
				MemberWorksLists(data).then(res => {
					this.MemberWorksList = res.data.data
				}).catch(err => {
					console.log(err, 'MemberWorksLists')
				})
			},
			// 删除 作品
			delWorks(id, index) {
				/*
					id 作品id
					index 作品在列表的下标
				*/
				delWorks({
					m_id: uni.getStorageSync('userinfo').m_id,
					id: id
				}).then(res => {
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
					this.MemberWorksList.splice(index, 1)
				}).catch(err => {
					console.log(err, 'delWorks')
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.top {
		width: 100%;
		height: 1040rpx;
		position: relative;
		z-index: 99;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		border-bottom: 20rpx solid #F7F7F7;

		&-bg {
			width: 100%;
			height: 750rpx;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			z-index: 100;
		}

		&-content {
			width: 100%;
			height: 374rpx;
			position: relative;
			z-index: 101;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0rpx 0rpx;
			padding: 30rpx 0;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;

			&-tx {
				width: 100%;
				padding: 0 40rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				position: relative;
				z-index: 102;

				&-btn {
					width: 144rpx;
					height: 60rpx;
					background: linear-gradient(146deg, #77C881, #62BD6A);
					border-radius: 30rpx;
					text-align: center;
					line-height: 60rpx;
					font-size: 28rpx;
					color: #FFFFFF;
					font-weight: 400;
				}

				&-img {
					width: 158rpx;
					height: 158rpx;
					position: absolute;
					z-index: 103;
					left: 40rpx;
					top: -100rpx;
					border-radius: 50%;
					border: 6rpx solid #fff;
				}
			}

			&-name {
				width: 100%;
				padding: 0 40rpx;
				text-align: justify;
				font-size: 36rpx;
				color: #333333;
				font-weight: 600;
				@include text-hidden-line(1);
			}

			&-num {
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
						font-size: 24rpx;
						color: #999999;
						font-weight: 400;
					}

					>view {
						font-size: 32rpx;
						color: #333333;
						font-weight: 400;
					}
				}
			}

			&-text {
				width: 100%;
				display: flex;
				align-items: center;
				padding: 0 40rpx;

				>text {
					font-size: 30rpx;
					color: #333333;
					font-weight: 400;
					margin-right: 30rpx;
				}
			}
		}
	}

	.tabs {
		width: 100%;
		background-color: #fff;

		&-content {
			width: 100%;
			padding: 0 100rpx;

			&-nr {
				width: 100%;
				border-bottom: 2rpx solid #f6f6f6;
			}
		}

		&-two {
			width: 100%;
		}
	}

	.works {
		width: 100%;
		background-color: #fff;
		padding: 50rpx 30rpx 0 30rpx;
	}

	.collection-works {
		width: 100%;
		background-color: #fff;
		padding: 20rpx 40rpx 40rpx 40rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.collection-article {
		width: 100%;
		background-color: #fff;
		padding: 0 30rpx 40rpx 30rpx;
	}

	.collection-curriculum {
		width: 100%;
		background-color: #fff;
		padding: 80rpx 40rpx 0 40rpx;
	}

	.collection-goods {
		width: 100%;
		padding: 0 40rpx 40rpx 40rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
		background-color: #fff;
	}
</style>
