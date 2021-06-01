<template>
	<view class="container">
		<view class="content">
			<view class="content-img">
				<image v-if="status==1" src="/static/img/img_21.png" mode=""></image>
				<image v-else src="/static/img/img_21.png" mode=""></image>
			</view>
			<view class="content-tips">
				{{status == 1 ? '支付成功' : '支付失败'}}
			</view>
			<text v-if="status == 1">可获得 {{seedNum}}颗果实</text>
			<view class="content-btn" @click="bindBtn">
				{{status == 1 ? '知道了' : '重新支付'}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		AppCallback
	} from '@/network/api.js'
	export default {
		data() {
			return {
				status: 1, // 1 支付成功 2 支付失败
				type: 1, //进入支付页面场景=> 1 立即购买/购物车购买 2订单列表进入 3订单详情进入 4购买课程进入
				seedNum: 0, //果实数量
			};
		},
		onLoad(options) {
			this.status = options.status
			this.type = options.type
			this.order_id = options.order_id
			uni.setNavigationBarTitle({
				title: this.status == 1 ? '支付成功' : '支付失败'
			})
			AppCallback({
				m_id: uni.getStorageSync('userinfo').m_id,
				order_id: this.order_id,
				type: this.type == 4 ? 4 : 1
			}).then(res => {
				this.seedNum = res.data.data.res
				// 更新 vuex 里的数据
				this.$updateFUNC()
			}).catch(err => {
				console.log(AppCallback, 'AppCallback')
			})
		},
		methods: {
			bindBtn() {
				switch (Number(this.status)) {
					case 1:
						this.paySuccess()
						break;
					case 2:
						uni.navigateBack({
							delta: 1
						})
						break;
				}
			},
			// 支付成功 跳转
			paySuccess() {
				// 1 返回商品详情/购物车 2返回订单列表 3返回订单详情
				switch (Number(this.type)) {
					case 1:
						uni.navigateBack({
							delta: 3
						})
						break;
					case 2:
						let pages = getCurrentPages()
						// 刷新订单列表
						let orderPage = pages[pages.length - 3]
						orderPage.$vm.getOrderList(false)
						uni.navigateBack({
							delta: 2
						})
						break;
					case 3:
						let Pages = getCurrentPages()
						// 刷新订单详情
						let detailPages = Pages[Pages.length - 3]
						detailPages.$vm.getOrderDetail(false)
						// 刷新订单列表
						let orderPages = Pages[Pages.length - 4]
						orderPages.$vm.getOrderList(false)
						uni.navigateBack({
							delta: 2
						})
						break;
					case 4:
						uni.navigateBack({
							delta: 2
						})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		padding-top: 200rpx;
		display: flex;
		justify-content: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;

		// position: fixed;
		// left: 50%;
		// top: 50%;
		// transform: translate(-50%,-50%);
		// z-index: 9;
		&-img {
			width: 311rpx;
			height: 221rpx;
		}

		&-tips {
			font-size: 30rpx;
			color: #333333;
			font-weight: 600;
			margin-top: 30rpx;
		}

		>text {
			font-size: 24rpx;
			color: #999999;
			font-weight: 600;
			margin-top: 20rpx;
		}

		&-btn {
			width: 450rpx;
			height: 88rpx;
			background: linear-gradient(-28deg, #77C881, #62BD6A);
			border-radius: 44rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			font-weight: 600;
			margin-top: 60rpx;
		}
	}
</style>
