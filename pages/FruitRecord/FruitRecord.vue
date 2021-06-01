<template>
	<view class="container">
		<u-sticky :enable="enable">
			<view class="content">
				<!-- top -->
				<view class="top">
					<view class="top-bg">
						<image src="/static/img/img_27.png" mode=""></image>
					</view>
					<view class="top-content">
						<view class="top-content-text">
							<view>当前记录（颗）</view>
							<text @click="toFruitRule">果实规则</text>
						</view>
						<view class="top-content-num">
							{{integral}}
						</view>
					</view>
				</view>
				<!-- 标题 -->
				<view class="title">
					果实记录
				</view>
			</view>
		</u-sticky>
		<!-- 列表 -->
		<view class="list">
			<view class="list-item" v-for="(item,index) in list" :key="index">
				<view class="list-item-left">
					<view>{{item.title}}</view>
					<text>{{item.add_time}}</text>
				</view>
				<text :class="item.type==2?'list-item-add':'list-item-reduce'">{{item.type==1?'-':'+'}}{{item.money}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		FruitLog
	} from '@/network/api.js'
	export default {
		data() {
			return {
				enable: true,
				list:[],//果实记录
				page: 1,//分页
			};
		},
		computed:{
			// 果实数量
			integral() {
				return this.$store.state.integral
			}
		},
		onLoad() {
			// 获取果实记录
			let data = {
				m_id: uni.getStorageSync('userinfo').m_id,
				p: this.page
			}
			FruitLog(data).then(res => {
				this.list = res.data.data
			}).catch(err => {
				console.log(err,'FruitLog')
			})
		},
		onShow() {
			this.enable = true
		},
		onHide() {
			this.enable = false
		},
		methods: {
			// 跳转到 果实规则
			toFruitRule() {
				uni.navigateTo({
					url:'/pages/Rule/Rule?type=' + 5 + '&title=' + '果实规则'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
	}

	.content {
		width: 100%;
		padding: 30rpx 40rpx 0 40rpx;
		background-color: #fff;
	}

	.top {
		width: 100%;
		height: 280rpx;
		position: relative;
		z-index: 5;

		&-bg {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 6;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
		}

		&-content {
			width: 100%;
			height: 100%;
			position: relative;
			z-index: 7;
			padding: 40rpx 30rpx;

			&-text {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				>view {
					font-size: 30rpx;
					color: #FFFFFF;
					font-weight: 400;
				}

				>text {
					font-size: 24rpx;
					color: #FFFFFF;
					font-weight: 400;
				}
			}

			&-num {
				width: 100%;
				position: absolute;
				z-index: 9;
				left: 50%;
				top: 60%;
				transform: translate(-50%, -50%);
				text-align: center;
				font-size: 60rpx;
				color: #FFFFFF;
				font-weight: 600;
			}
		}
	}

	.title {
		width: 100%;
		padding: 20rpx 0;
		margin-top: 50rpx;
		text-align: left;
		font-size: 32rpx;
		color: #333333;
		font-weight: 600;
		background-color: #fff;
	}

	.list {
		width: 100%;
		padding: 0 40rpx;

		&-item {
			width: 100%;
			padding: 30rpx 0;
			border-bottom: 2rpx solid #F5F5F5;
			display: flex;
			align-items: center;
			justify-content: space-between;

			>text {
				font-size: 36rpx;
				font-weight: 600;
			}

			&-add {
				color: #FD5401;
			}

			&-reduce {
				color: #333333;
			}

			&-left {
				display: flex;
				flex-direction: column;
				align-items: flex-start;

				>text {
					font-size: 22rpx;
					color: #999999;
					font-weight: 400;
					display: inline-block;
					margin-top: 15rpx;
				}

				>view {
					font-size: 28rpx;
					color: #333333;
					font-weight: 600;
				}
			}
		}

		&-item:last-child {
			border-bottom: none;
		}
	}
</style>
