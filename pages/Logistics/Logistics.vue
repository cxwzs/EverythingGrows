<template>
	<view class="container" v-if="wuliu">
		<!-- 商品信息 -->
		<view class="goods">
			<!-- <view class="goods-img">
				<u-image width="100%" height="100%" src="/static/img/img_1.png"></u-image>
			</view> -->
			<view class="goods-content">
				<text style="color: #FD5401;">运输状态：{{wuliu.status_name}}</text>
				<text>快递公司：{{wuliu.name}}</text>
				<text>快递单号：{{wuliu.nu}}</text>
			</view>
		</view>
		<!-- 物流进度 -->
		<view class="jind" v-if="wuliu.data.length">
			<u-time-line>
				<u-time-line-item v-for="(item,index) in wuliu.data" :key="index">
					<template v-slot:node>
						<view class="u-node-active" v-if="index==0">
							<image src="/static/img/img_42.png" mode=""></image>
						</view>
						<view class="u-node" v-else></view>
					</template>
					<template v-slot:content>
						<view>
							<view class="u-order-desc">{{item.context}}</view>
							<view class="u-order-time">{{item.time}}</view>
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
		</view>
	</view>
</template>

<script>
	import {
		getLogistics
	} from '@/network/api.js'
	export default {
		data() {
			return {
				wuliu:'',//物流信息
			};
		},
		onLoad(options) {
			// 获取物流进度
			getLogistics({
				m_id: uni.getStorageSync('userinfo').m_id,
				order_id: options.order_id
			}).then(res => {
				this.wuliu = res.data.data.list
			}).catch(err => {
				console.log(err,'getLogistics')
			})
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #E5E5E5;
	}
</style>

<style lang="scss" scoped>
	.container {
		width: 100%;
	}

	.goods {
		width: 100%;
		padding: 30rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-img {
			width: 190rpx;
			height: 190rpx;
		}

		&-content {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: flex-start;

			>text {
				font-size: 28rpx;
				color: #999999;
				line-height: 2.2;
			}
		}
	}

	.jind {
		width: 100%;
		background-color: #fff;
		padding: 30rpx;
		margin-top: 20rpx;
	}

	.u-node {
		width: 18rpx;
		height: 18rpx;
		border-radius: 100rpx;
		background: #EDEDED;
	}
	
	.u-node-active{
		width: 30rpx;
		height: 30rpx;
	}

	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>
