<template>
	<view class="container">
		<!-- 导航 -->
		<u-sticky :enable="enable">
			<view class="nav">
				<scroll-view :scroll-x="true" :enable-flex="true" class="nav-list">
					<view class="nav-list-item" v-for="(item,index) in articleType" :key="index" @click="changeNav(index,item.id)">
						<text :class="nav===index?'nav-list-item-active':''">{{item.name}}</text>
						<view :class="nav===index?'nav-list-item-show':''"></view>
					</view>
				</scroll-view>
			</view>
		</u-sticky>
		<!-- 列表 -->
		<view class="list" v-if="handleEmpty">
			<Parenting v-for="(item,index) in articleList" :key="index" :index="index" :item="item"></Parenting>
		</view>
		<!-- 空视图 -->
		<EmptyView v-if="!handleEmpty"></EmptyView>
	</view>
</template>

<script>
	import Parenting from './components/Parenting.vue'
	import {
		ArticleType,
		ArticleList
	} from '@/network/api.js'
	export default {
		data() {
			return {
				enable: true,
				nav: 0,
				articleType:[],//文章类型
				articleList:[],//文章列表
				page:1,//分页
			};
		},
		components: {
			Parenting
		},
		computed:{
			// 判断 空视图 是否出现
			handleEmpty() {
				return this.articleList.length
			}
		},
		async onLoad() {
			// 获取 文章类型
			this.articleType = await this.getArticleType()
			// 获取 文章列表
			this.getArticleList(this.articleType[0].id)
		},
		onShow() {
			this.enable = true
		},
		onHide() {
			this.enable = false
		},
		onReachBottom() {
			let data = {
				article_id: article_id||'',
				p: this.page + 1
			}
			ArticleList(data).then((res) => {
				if (res.data.data.length != 0) {
					this.page += 1
					this.articleList = [...this.articleList, ...res.data.data]
				}else{
					uni.showToast({
						title:'没有更多了',
						icon:'none'
					})
				}
			})
		},
		methods: {
			// 切换导航
			changeNav(index,article_id) {
				this.nav = index
				this.getArticleList(article_id)
			},
			// 获得 文章类型
			getArticleType() {
				return new Promise((resolve, reject) => {
					ArticleType().then((res) => {
						resolve(res.data.data)
					}).catch((err) => {
						reject(err)
					})
				})
			},
			// 获得 文章列表
			getArticleList(article_id) {
				this.page = 1
				let data = {
					article_id: article_id||'',
					p: this.page
				}
				ArticleList(data).then((res) => {
					this.articleList = res.data.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		width: 100%;
		height: 92rpx;
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
		padding: 0 30rpx;
	}
</style>
