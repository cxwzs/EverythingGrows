<template>
	<view class="container">
		<view class="title">
			选择您申请的原因
		</view>
		<view class="list">
			<u-radio-group active-color="#77C881" width="50%" v-model="reason" @change="radioGroupChange">
				<u-radio v-for="(item, index) in list" :key="index" :name="item.reason" :disabled="item.disabled">
					{{item.reason}}
				</u-radio>
			</u-radio-group>
		</view>
		<!-- 申请理由 -->
		<textarea class="textArea" v-model="apply_refund_content" :auto-height="true" maxlength="-1" placeholder="请输入您的申请理由..." placeholder-class="inps"></textarea>
		<!-- 按钮 -->
		<view class="btn">
			<view class="btn-content" @click="applyRefund">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ApplyRefund
	} from '@/network/api.js'
	export default {
		data() {
			return {
				list: getApp().globalData.orderRefund,//订单退款原因
				reason: getApp().globalData.orderRefund[0].reason,//选中的原因
				order_id:'',//订单id
				apply_refund_content:'',//退款理由
				type: 1,//进入场景 1 订单列表进入 2 订单详情进入
			};
		},
		onLoad(options) {
			this.order_id = options.order_id
			this.type = options.type
		},
		methods: {
			// 选择退款理由
			radioGroupChange(e) {
				console.log(e)
				this.reason = e
			},
			// 申请退款
			applyRefund() {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					order_id: this.order_id,
					apply_refund_reason: this.reason,
					apply_refund_content: this.apply_refund_content
				}
				ApplyRefund(data).then(res => {
					if(this.type ==1) {
						// 刷新订单列表
						let pages = getCurrentPages()
						let prevPage = pages[pages.length-2]
						prevPage.$vm.getOrderList(false)	
					}else{
						// 刷新订单详情
						let pages = getCurrentPages()
						let prevPage = pages[pages.length-2]
						prevPage.$vm.getOrderDetail(false)
						// 刷新订单列表
						let orderPage = pages[pages.length-3]
						orderPage.$vm.getOrderList(false)
					}
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration:1500,
						success: () => {
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1510)
						}
					})
				}).catch(err => {
					console.log(err, 'ApplyRefund')
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
	.title {
		width: 100%;
		padding: 30rpx 30rpx 20rpx 30rpx;
		background-color: #fff;
		font-size: 30rpx;
		color: #333333;
		font-weight: 400;
	}
	.list{
		width: 100%;
		padding: 0 30rpx 30rpx 30rpx;
		background-color: #fff;
	}
	.inps{
		font-size: 30rpx;
		color: #999999;
		font-weight: 400;
	}
	.textArea{
		width: 100%;
		min-height: 250rpx;
		background-color: #fff;
		box-sizing: border-box;
		padding: 30rpx;
		font-size: 30rpx;
		color: #333;
		font-weight: 400;
		margin-top: 20rpx;
	}
	.btn{
		width: 100%;
		padding: 80rpx 40rpx;
		&-content{
			width: 100%;
			height: 88rpx;
			border-radius: 44rpx;
			background-color: #77C881;
			font-weight: 32rpx;
			color: #fff;
			font-weight: 600;
			text-align: center;
			line-height: 88rpx;
		}
	}
</style>
