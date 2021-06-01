<template>
	<view class="container" v-if="details">
		<!-- 用户 -->
		<view class="user">
			<view class="user-content">
				<view class="user-content-img">
					<u-image width="100%" height="100%" border-radius="50%" :src="details.avatar"></u-image>
				</view>
				<view class="user-content-text">
					<view>{{details.nickname}}</view>
					<text>{{details.age}}{{details.city_name?'，':''}}{{details.city_name}}</text>
				</view>
			</view>
			<view class="user-btn" @click="bindFollow">
				{{details.works_fans_status==1?'已关注':'+ 关注'}}
			</view>
		</view>
		<!-- 作品展示 -->
		<view class="works">
			<view class="works-img">
				<u-image width="100%" mode="widthFix" :src="details.image"></u-image>
			</view>
			<view class="works-content">
				<text>{{details.name}}</text>
				<view>{{details.desc}}</view>
			</view>
		</view>
		<!-- 占位符 -->
		<view style="width: 100%;height: 145rpx;"></view>
		<!-- 按钮 -->
		<view class="btn">
			<view class="btn-item" @click="bindLike">
				<u-icon :name="details.works_zan_status==1?'heart-fill':'heart'"
					:color="details.works_zan_status==1?'#FF3847':'#666'" size="40"></u-icon>
				<view>点赞</view>
				<view class="btn-item-num" v-if="details.works_zan_zong>0">
					{{details.works_zan_zong>999?'999+':details.works_zan_zong}}
				</view>
			</view>
			<view class="btn-item" @click="bindCollention">
				<u-icon :name="details.works_collection_status==1?'star-fill':'star'"
					:color="details.works_collection_status==1?'#F39400':'#666'" size="40"></u-icon>
				<view>收藏</view>
				<view class="btn-item-num" v-if="details.works_collection_zong>0">
					{{details.works_collection_zong>999?'999+':details.works_collection_zong}}
				</view>
			</view>
			<view class="btn-item" v-if="details.is_private==2">
				<u-icon name="zhuanfa" color="#666666" size="40"></u-icon>
				<view>分享</view>
				<button open-type="share" plain></button>
			</view>
			<view class="btn-item" v-if="details.is_private!=2" @click="showShareTips">
				<u-icon name="zhuanfa" color="#666666" size="40"></u-icon>
				<view>分享</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		WorksDetail,
		LikeArticleOrWorks,
		CollentionArticleOrWorks,
		WorksFans
	} from '@/network/api.js'
	export default {
		data() {
			return {
				id: '', //作品id
				details: '', //作品详情
			};
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
			// 获取 作品详情
			let data = {
				m_id: uni.getStorageSync('userinfo').m_id,
				id: this.id
			}
			WorksDetail(data).then((res) => {
				this.details = res.data.data
				if(this.details.is_private==2){
					wx.showShareMenu()
				}else{
					wx.hideShareMenu()
				}
			})
		},
		onShareAppMessage() {
			return {
				title: this.details.name,
				imageUrl: this.details.image,
				path: '/pages/WorksDetail/WorksDetail?id=' + this.id
			}
		},
		methods: {
			// 禁止 分享提示语
			showShareTips() {
				uni.showToast({
					title: '作者设置了当前作品禁止分享',
					icon: 'none'
				})
			},
			// 点赞/取消点赞
			bindLike() {
				if (this.$LoginIF(2)) {
					let data = {
						type: 1,
						m_id: uni.getStorageSync('userinfo').m_id,
						works_id: this.id
					}
					LikeArticleOrWorks(data).then((res) => {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						this.details.works_zan_zong = this.details.works_zan_status == 1 ? Number(this.details
							.works_zan_zong) - 1 : Number(this.details.works_zan_zong) + 1
						this.$set(this.details, 'works_zan_status', this.details.works_zan_status == 1 ? '0' : 1)
					}).catch(err => {
						console.log(err, 'LikeArticleOrWorks')
					})
				}
			},
			// 收藏/取消收藏
			bindCollention() {
				if (this.$LoginIF(2)) {
					let data = {
						type: 1,
						m_id: uni.getStorageSync('userinfo').m_id,
						works_id: this.id
					}
					CollentionArticleOrWorks(data).then((res) => {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						this.details.works_collection_zong = this.details.works_collection_status == 1 ? Number(
							this.details.works_collection_zong) - 1 : Number(this.details
							.works_collection_zong) + 1
						this.$set(this.details, 'works_collection_status', this.details.works_collection_status ==
							1 ? '0' : 1)
					}).catch(err => {
						console.log(err, 'CollentionArticleOrWorks')
					})
				}
			},
			// 关注/取消关注
			bindFollow() {
				if (this.$LoginIF(2)) {
					let data = {
						type: 1,
						m_id: uni.getStorageSync('userinfo').m_id,
						works_id: this.id
					}
					WorksFans(data).then((res) => {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						this.$set(this.details, 'works_fans_status', this.details.works_fans_status == 1 ? '0' : 1)
					}).catch(err => {
						console.log(err, 'WorksFans')
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
	.user {
		width: 100%;
		padding: 40rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;

		&-btn {
			width: 130rpx;
			height: 56rpx;
			background-color: #77C881;
			border-radius: 28rpx;
			text-align: center;
			line-height: 56rpx;
			font-size: 26rpx;
			color: #FFFFFF;
			font-weight: 400;
		}

		&-content {
			display: flex;
			align-items: center;

			&-img {
				width: 80rpx;
				height: 80rpx;
				margin-right: 20rpx;
			}

			&-text {
				display: flex;
				flex-direction: column;
				align-items: flex-start;

				>view {
					font-size: 30rpx;
					color: #333333;
					font-weight: 600;
				}

				>text {
					font-size: 22rpx;
					color: #999999;
					font-weight: 400;
				}
			}
		}
	}

	.works {
		width: 100%;
		background-color: #fff;

		&-img {
			width: 100%;
			// height: 750rpx;
		}

		&-content {
			width: 100%;
			padding: 25rpx 40rpx;

			>text {
				font-size: 36rpx;
				color: #333333;
				font-weight: 600;
			}

			>view {
				width: 100%;
				text-align: justify;
				font-size: 28rpx;
				color: #666666;
				font-weight: 400;
				margin-top: 25rpx;
			}
		}
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

			&-num {
				position: absolute;
				left: 153rpx;
				top: 0rpx;
				color: #666666 !important;
			}
		}
	}
</style>
