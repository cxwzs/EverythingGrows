<template>
	<view class="container" :class="iPhoneX?'_iPhoneX':'paddingTabbar'">
		<u-sticky :enable="enable">
			<!-- search -->
			<view class="search">
				<u-search placeholder="搜索" v-model="keywords" :show-action="false" placeholder-color="#BBBBBB" bg-color="#F9F9F9"
				 color="#333"></u-search>
			</view>
			<!-- 导航 -->
			<view class="nav">
				<scroll-view :scroll-x="true" :enable-flex="true" class="nav-list">
					<view class="nav-list-item" v-for="(item,index) in goodsCate" :key="index" @click="changeNav(index)">
						<text :class="nav===index?'nav-list-item-active':''">{{item.name}}</text>
						<view :class="nav===index?'nav-list-item-show':''"></view>
					</view>
				</scroll-view>
			</view>
		</u-sticky>
		<!-- 列表 -->
		<view class="list" v-if="handleEmpty">
			<Goods v-for="(item,index) in list" :key="index" :item="item"></Goods>
		</view>
		<!-- 空视图 -->
		<EmptyView v-if="!handleEmpty"></EmptyView>
		<!-- 购物车 -->
		<view class="car" @click="toCar">
			<image src="/static/img/img_2.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import tabbar from '@/common/mixin'
	import Goods from './components/Goods.vue'
	import {
		GoodsList,
		GoodsCategoryList
	} from '@/network/api.js'
	export default {
		data() {
			return {
				iPhoneX: getApp().globalData.iPhoneX, //兼容iPhone X 当前设备是否是iPhone X
				enable: true,
				nav: 0,
				goodsCate: [], //商品分类
				list: [], //商品列表
				page: 1, //分页
				goods_cate_id: '', //商品分类选中的id
				keywords: '', //搜索关键字
			};
		},
		mixins: [tabbar],
		components: {
			Goods
		},
		computed: {
			// 判断 空视图 是否出现
			handleEmpty() {
				return this.list.length
			}
		},
		watch: {
			// 监听 搜索关键词
			keywords: {
				handler(newValue, oldValue) {
					this.keywords = newValue
					this.getGoodsList(this.goods_cate_id, this.keywords, false)
				}
			}
		},
		async onLoad() {
			// 获取商品分类
			this.goodsCate = await this.getGoodsCategoryList()
			this.goods_cate_id = this.goodsCate[0].id
			// 获取商品列表
			this.getGoodsList(this.goodsCate[0].id, this.keywords)
		},
		onShow() {
			this.setTabBarIndex(3)
			this.enable = true
		},
		onHide() {
			this.enable = false
		},
		onReachBottom() {
			let data = {
				goods_cate_id: this.goods_cate_id,
				keywords: this.keywords,
				p: this.page + 1,
				mall_type: 1
			}
			GoodsList(data, false).then((res) => {
				if (res.data.data.list.length != 0) {
					this.page += 1
					this.list = this.list.concat(res.data.data.list)
				} else {
					uni.showToast({
						title: '没有更多了',
						icon: 'none'
					})
				}
			}).catch((err) => {
				console.log(err, 'GoodsList')
			})
		},
		methods: {
			// 切换导航
			changeNav(index) {
				this.nav = index
				this.goods_cate_id = this.goodsCate[this.nav].id
				this.getGoodsList(this.goodsCate[this.nav].id, this.keywords)
			},
			// 获取 商品分类
			getGoodsCategoryList() {
				return new Promise((resolve, reject) => {
					GoodsCategoryList({
						mall_type: 1
					}, false).then((res) => {
						resolve(res.data.data.list)
					}).catch((err) => {
						reject(err)
					})
				})
			},
			// 获取 商品列表
			getGoodsList(goods_cate_id = '', keywords = '', status = true) {
				/*
					goods_cate_id 商品分类id
					keywords 搜索关键字
					status 是否出现加载动画
				*/
				this.page = 1
				let data = {
					goods_cate_id: goods_cate_id || '',
					keywords: keywords || '',
					p: this.page,
					mall_type: 1
				}
				GoodsList(data, status).then((res) => {
					this.list = res.data.data.list
				}).catch((err) => {
					console.log(err, 'GoodsList')
				})
			},
			// 跳转到 购物车
			toCar() {
				if (this.$LoginIF()) {
					uni.navigateTo({
						url: '/pages/ShoppingCart/ShoppingCart'
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		width: 100%;
		padding: 40rpx;
		background-color: #fff;
	}

	.nav {
		width: 100%;
		height: 88rpx;
		overflow: hidden;
		background-color: #fff;
		border-bottom: 2rpx solid #F8F8FC;

		&-list {
			width: 100%;
			height: 120rpx;
			display: flex;
			align-items: flex-start;

			&-item {
				padding: 0 30rpx;
				height: 88rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
				position: relative;
				z-index: 5;

				>text {
					font-size: 30rpx;
					color: #999999;
					font-weight: 400;
					display: inline-block;
					// margin-top: 38rpx;
				}

				>view {
					width: 30rpx;
					height: 8rpx;
					background: #77C881;
					border-radius: 4rpx;
					position: absolute;
					z-index: 6;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					display: none;
				}

				&-active {
					color: #77C881 !important;
					font-size: 34rpx !important;
					font-weight: 600 !important;
				}

				&-show {
					display: block !important;
				}
			}
		}
	}

	.list {
		width: 100%;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.car {
		width: 88rpx;
		height: 88rpx;
		position: fixed;
		right: 40rpx;
		bottom: 160rpx;
		z-index: 999;
	}
</style>
