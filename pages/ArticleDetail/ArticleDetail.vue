<template>
	<view class="container" v-if="details">
		<view class="box">
			<view class="title">
				{{details.title}}
			</view>
			<!-- <view class="from" v-if="details.name">
				来自：{{details.name}}社区
			</view> -->
			<!-- 详情 -->
			<view class="content" :lazy-load="true" v-if="details.content">
				<u-parse :html="details.content"></u-parse>
			</view>
		</view>
		<!-- 占位符 -->
		<view style="width: 100%;height: 145rpx;"></view>
		<!-- 按钮 -->
		<view class="btn">
			<view class="btn-item" @click="bindLike">
				<u-icon :name="details.article_zan_status==1?'heart-fill':'heart'"
					:color="details.article_zan_status==1?'#FF3847':'#666'" size="40"></u-icon>
				<view>点赞</view>
			</view>
			<view class="btn-item" @click="bindCollention">
				<u-icon :name="details.article_collection_status==1?'star-fill':'star'"
					:color="details.article_collection_status==1?'#F39400':'#666'" size="40"></u-icon>
				<view>收藏</view>
			</view>
			<view class="btn-item">
				<u-icon name="zhuanfa" color="#666666" size="40"></u-icon>
				<view>分享</view>
				<button open-type="share" plain></button>
			</view>
		</view>
		<!-- 悬浮按钮 -->
		<view class="fixed-btn" @click="bindFixed" v-if="details.target_rule!=1">
			{{details.target_rule==2?'购买商品':'购买课程'}}
		</view>
		<!-- 下一页按钮 -->
		<view class="next" v-if="details.target_rule==1&&details.xia_id" @click="bindNextPage">
			<image src="/static/img/img_38.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import {
		ArticleDetail,
		LikeArticleOrWorks,
		CollentionArticleOrWorks
	} from '@/network/api.js'
	export default {
		data() {
			return {
				id: '', //文章id
				details: '', //文章详情
			};
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
			// 获取 文章详情
			let data = {
				m_id: uni.getStorageSync('userinfo').m_id,
				id: this.id
			}
			ArticleDetail(data).then((res) => {
				this.details = res.data.data
			})
		},
		methods: {
			// 下一页
			bindNextPage() {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					id: this.details.xia_id
				}
				ArticleDetail(data).then((res) => {
					this.details = res.data.data
				})
			},
			// 悬浮按钮
			bindFixed() {
				// 1网络连接 2商品的详情 3课程详情
				switch (Number(this.details.target_rule)) {
					case 1:
						uni.navigateTo({
							url: '/pages/WebView/WebView?url=' + this.details.param
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/GoodsDetail/GoodsDetail?type=' + 1 + '&goods_id=' + this.details.param
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/CurriculumDetail/CurriculumDetail?id=' + this.details.param
						})
						break;
				}
			},
			// 点赞/取消点赞
			bindLike() {
				if (this.$LoginIF(2)) {
					let data = {
						type: 2,
						m_id: uni.getStorageSync('userinfo').m_id,
						article_id: this.id
					}
					LikeArticleOrWorks(data).then((res) => {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						this.$set(this.details, 'article_zan_status', this.details.article_zan_status == 1 ? '0' :
							1)
					})
				}
			},
			// 收藏/取消收藏
			bindCollention() {
				if (this.$LoginIF(2)) {
					let data = {
						type: 2,
						m_id: uni.getStorageSync('userinfo').m_id,
						article_id: this.id
					}
					CollentionArticleOrWorks(data).then((res) => {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						this.$set(this.details, 'article_collection_status', this.details
							.article_collection_status == 1 ? '0' : 1)
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8FC;
	}
	
	video{
		width: 100% !important;
	}

	.box {
		width: 100%;
		padding: 40rpx 30rpx;
		background-color: #fff;
	}

	.title {
		width: 100%;
		text-align: justify;
		font-size: 34rpx;
		color: #333333;
		font-weight: 600;
		line-height: 1.5;
	}

	.from {
		margin-top: 40rpx;
		font-size: 24rpx;
		color: #999999;
		font-weight: 400;
	}

	.content {
		width: 100%;
		margin-top: 30rpx;
	}

	.btn {
		width: 100%;
		height: 123rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-item {
			width: 33.33%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			z-index: 5;

			>button {
				@include shareButton();
			}

			>view {
				font-size: 26rpx;
				font-weight: 400;
				color: #999999;
				margin-top: 5rpx;
			}
		}
	}

	.fixed-btn {
		width: 234rpx;
		height: 94rpx;
		background: #77C881;
		box-shadow: 0rpx 6rpx 18rpx 0rpx rgba(0, 0, 0, 0.2);
		border-radius: 47rpx;
		text-align: center;
		line-height: 94rpx;
		font-size: 30rpx;
		color: #fff;
		font-weight: 600;
		position: fixed;
		bottom: 180rpx;
		right: 30rpx;
		z-index: 100;
	}

	.next {
		width: 100rpx;
		height: 100rpx;
		position: fixed;
		bottom: 180rpx;
		right: 30rpx;
		z-index: 100;
	}
</style>
