<template>
	<view class="container">
		<u-sticky :enable="enable">
			<!-- tbas -->
			<view class="tabs">
				<view class="tabs-item" :class="tabs==1?'tabs-active':''" @click="changeTabs(1)">
					未使用
				</view>
				<view class="tabs-item" :class="tabs==2?'tabs-active':''" @click="changeTabs(2)">
					已使用
				</view>
				<view class="tabs-item" :class="tabs==3?'tabs-active':''" @click="changeTabs(3)">
					已过期
				</view>
			</view>
		</u-sticky>
		<!-- 列表 -->
		<view class="list" v-if="handleEmpty">
			<view class="list-item" v-for="(item,index) in list" :key="index">
				<view class="list-item-bg">
					<image src="/static/img/img_31.png" mode=""></image>
				</view>
				<view class="list-item-content">
					<view class="list-item-content-left" :class="item.status!=1?'list-item-content-lefted':''">
						<view>{{item.face_value}}</view>
						<text>优惠券(元)</text>
					</view>
					<view class="list-item-content-right">
						<view class="list-item-content-right-name">
							{{item.can_use}}
						</view>
						<view class="list-item-content-right-btn">
							<text>满{{item.use_condition}}元可用</text>
							<view v-if="item.status==1" @click="bindUse">去使用</view>
							<view v-else-if="item.status==2" class="list-item-content-right-btn-ed">已使用</view>
							<view v-else class="list-item-content-right-btn-ed">已过期</view>
						</view>
						<text>有效期至{{item.end_use_time}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 空视图 -->
		<EmptyView v-if="!handleEmpty"></EmptyView>
	</view>
</template>

<script>
	import {
		MyCoupons
	} from '@/network/api.js'
	export default {
		data() {
			return {
				enable: true,
				tabs: 1,//选中的 tabs
				list:[],//优惠券列表
				page: 1,//分页
			};
		},
		computed: {
			// 判断 空视图 是否出现
			handleEmpty() {
				return this.list.length
			}
		},
		onLoad() {
			this.getMyCoupons()
		},
		onShow() {
			this.enable = true
		},
		onHide() {
			this.enable = false
		},
		onReachBottom() {
			let data = {
				m_id: uni.getStorageSync('userinfo').m_id,
				p: this.page,
				status: this.tabs
			}
			MyCoupons(data,false).then(res => {
				if (res.data.data.list.length != 0) {
					this.page += 1
					this.list = this.list.concat(res.data.data.list)
				}else{
					uni.showToast({
						title:'没有更多了',
						icon:'none'
					})
				}
			}).catch(err => {
				console.log(err,'MyCoupons')
			})
		},
		methods:{
			// 切换tabs
			changeTabs(val) {
				this.tabs = val
				this.getMyCoupons()
			},
			// 去使用 优惠券
			bindUse() {
				uni.switchTab({
					url:'/pages/shoppingMall/shoppingMall'
				})
			},
			// 获取 优惠券列表
			getMyCoupons() {
				this.page = 1
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					p: this.page,
					status: this.tabs
				}
				MyCoupons(data).then(res => {
					this.list = res.data.data.list
				}).catch(err => {
					console.log(err,'MyCoupons')
				})
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
	.tabs {
		width: 100%;
		padding: 40rpx;
		background-color: #F6F4F4;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-item {
			width: 210rpx;
			height: 60rpx;
			background: #F0EFF2;
			border-radius: 30rpx;
			text-align: center;
			line-height: 60rpx;
			font-size: 26rpx;
			color: #333333;
			font-size: 600;
		}
		
		&-active{
			background-color: #77C881;
			color: #fff;
		}
	}

	.list{
		width: 100%;
		padding: 0 40rpx;
		&-item{
			width: 100%;
			height: 205rpx;
			position: relative;
			z-index: 5;
			margin-bottom: 30rpx;
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
			&-content{
				width: 100%;
				height: 100%;
				position: absolute;
				z-index: 7;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&-left{
					width: 27%;
					height: 100%;
					padding: 10rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					>view{
						width: 100%;
						text-align: center;
						font-size: 60rpx;
						color: #77C881;
						font-weight: 600;
					}
					>text{
						font-size: 24rpx;
						color: #77C881;
						font-weight: 600;
					}
				}
				&-lefted{
					>view,>text{
						color: #999999 !important;
					}
				}
				&-right{
					width: 73%;
					height: 100%;
					padding: 25rpx 30rpx;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: space-between;
					>text{
						font-size: 22rpx;
						color: #999999;
						font-weight: 400;
					}
					&-name{
						width: 100%;
						text-align: justify;
						font-size: 30rpx;
						color: #333333;
						font-weight: 600;
						@include text-hidden-line(1);
					}
					&-btn{
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						>text{
							font-size: 24rpx;
							color: #666666;
							font-weight: 600;
						}
						>view{
							width: 160rpx;
							height: 60rpx;
							background: linear-gradient(-28deg, #77C881, #62BD6A);
							border-radius: 30rpx;
							text-align: center;
							line-height: 60rpx;
							font-size: 26rpx;
							color: #FFFFFF;
							font-weight: 600;
						}
						&-ed{
							background: #F0EFF2 !important;
						}
					}
				}
			}
		}
	}
</style>
