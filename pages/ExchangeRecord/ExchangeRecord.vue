<template>
	<view class="container">
		<u-sticky :enable="enable">
			<!-- tabs -->
			<view class="tabs">
				<u-tabs :list="tabs" active-color="#77C881" :is-scroll="false" :current="current" @change="changeTabs"></u-tabs>
			</view>
		</u-sticky>
		<!-- 列表 -->
		<view class="list" v-if="handleEmpty">
			<view class="list-item" v-for="(item,index) in list" :key="index" @click="toOrderDetail(item.order_id)">
				<view class="list-item-title">
					<text>订单编号：{{item.order_sn}}</text>
					<view>{{item.status_name}}</view>
				</view>
				<view class="list-item-goods">
					<view class="list-item-goods-item" v-for="(items,indexs) in item.goods_list">
						<view class="list-item-goods-item-img">
							<u-image width="100%" height="100%" :src="items.cover_path"></u-image>
						</view>
						<view class="list-item-goods-item-content">
							<view class="list-item-goods-item-content-name">
								{{items.goods_name}}
							</view>
							<view class="list-item-goods-item-content-else">
								<view class="list-item-goods-item-content-else-price">
									<view class="list-item-goods-item-content-else-price-new">
										<!-- <text>￥</text> -->
										<view>{{items.itg_price}}</view>
									</view>
									<view class="list-item-goods-item-content-else-price-old">
										颗
									</view>
								</view>
								<text>数量：x{{items.quantity}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="list-item-bottom">
					<view class="list-item-bottom-price">
						<text>兑换果实：</text>
						<view>{{item.pay_amounts}}</view>
					</view>
					<view class="list-item-bottom-btn" v-if="item.status==3" @click.stop="bindSignFor(item.order_id)">
						确认收货
					</view>
				</view>
			</view>
		</view>
		<!-- 空视图 -->
		<empty v-if="!handleEmpty"></empty>
	</view>
</template>

<script>
	import {
		OrderList,
		SignFor
	} from '@/network/api.js'
	import empty from './components/empty.vue'
	export default {
		data() {
			return {
				enable: true,
				tabs: [{
						name: '全部',
						id:'-1'
					},
					{
						name: '待发货',
						id:'2'
					},
					{
						name: '待收货',
						id:'3'
					},
					{
						name: '已完成',
						id:'4'
					}
				],
				current: 0,
				page: 1,//分页
				list:[],//记录列表
			};
		},
		computed:{
			// 判断 空视图 是否出现
			handleEmpty() {
				return this.list.length
			}
		},
		components:{
			empty
		},
		onLoad() {
			this.getOrderList()
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
				status: this.tabs[this.current].id,
				p: this.page + 1,
				mall_type: 2
			}
			OrderList(data,false).then(res => {
				if (res.data.data.list.length != 0) {
					this.page += 1
					this.list = [...this.list, ...res.data.data.list]
				}else{
					uni.showToast({
						title:'没有更多了',
						icon:'none'
					})
				}
			}).catch(err => {
				console.log(err,'OrderList')
			})
		},
		methods: {
			// 切换 tabs
			changeTabs(index) {
				this.current = index
				this.getOrderList()
			},
			// 跳转到 订单详情
			toOrderDetail(order_id) {
				uni.navigateTo({
					url: '/pages/ExchangeRecordDetail/ExchangeRecordDetail?order_id=' + order_id
				})
			},
			// 确认收货
			bindSignFor(order_id) {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					order_id: order_id
				}
				SignFor(data).then(res => {
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
					this.getOrderList(false)
				}).catch(err => {
					console.log(err, 'SignFor')
				})
			},
			// 获取 记录列表
			getOrderList(type = true) {
				//type 是否开启加载动画
				this.page = 1
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					status: this.tabs[this.current].id,
					p: this.page,
					mall_type: 2
				}
				OrderList(data,type).then(res => {
					this.list = res.data.data.list
				}).catch(err => {
					console.log(err,'OrderList')
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
		background-color: #fff;
	}

	.list {
		width: 100%;

		&-item {
			width: 100%;
			margin-top: 20rpx;
			background-color: #fff;
			
			&-title{
				width: 100%;
				height: 82rpx;
				border-bottom: 2rpx solid #F6F4F4;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30rpx;
				>text{
					font-size: 26rpx;
					color: #333333;
					font-weight: 600;
				}
				>view{
					font-size: 26rpx;
					color: #77C881;
					font-weight: 600;
				}
			}

			&-goods {
				width: 100%;
				padding: 0 40rpx;
				border-bottom: 2rpx solid #F6F4F4;
				&-item {
					width: 100%;
					padding: 40rpx 0;
					border-bottom: 2rpx solid #F6F4F4;
					display: flex;
					align-items: center;
					justify-content: space-between;

					&-img {
						width: 190rpx;
						height: 190rpx;
					}

					&-content {
						width: 67%;
						height: 190rpx;
						padding: 10rpx 0;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: space-between;

						&-name {
							width: 100%;
							font-size: 30rpx;
							color: #333333;
							font-weight: 600;
							@include text-hidden-line(2);
						}

						&-else {
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;

							>text {
								font-size: 26rpx;
								color: #666666;
								font-weight: 400;
							}

							&-price {
								display: flex;
								align-items: flex-end;

								&-old {
									font-size: 24rpx;
									color: #FD5401;
									font-weight: 400;
									text-decoration: line-through;
									margin-left: 10rpx;
									margin-bottom: 5rpx;
								}

								&-new {
									display: flex;
									align-items: flex-end;

									>text {
										font-size: 26rpx;
										color: #FD5401;
										font-weight: 600;
										margin-bottom: 5rpx;
									}

									>view {
										font-size: 36rpx;
										color: #FD5401;
										font-weight: 600;
									}
								}
							}
						}
					}
				}

				&-item:last-child {
					border-bottom: none;
				}
			}
		
			&-bottom{
				width: 100%;
				padding: 0 30rpx;
				height: 110rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&-price{
					display: flex;
					align-items: center;
					>text{
						font-size: 28rpx;
						color: #333333;
						font-weight: 400;
					}
					>view{
						font-size: 28rpx;
						color: #FD5401;
						font-weight: 400;
					}
				}
				&-btn{
					width: 140rpx;
					height: 50rpx;
					border-radius: 25rpx;
					text-align: center;
					line-height: 50rpx;
					font-size: 24rpx;
					font-weight: 400;
					background: linear-gradient(-28deg, #77C881, #62BD6A);
					color: #FFFFFF;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
