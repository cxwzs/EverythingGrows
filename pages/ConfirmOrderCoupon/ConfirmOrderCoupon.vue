<template>
	<view class="container">
		<!-- 列表 -->
		<view class="list">
			<view class="list-item" v-for="(item,index) in list" :key="index" @click="changeCoupon(item.m_cpn_id)">
				<view class="list-item-bg">
					<image src="/static/img/img_31.png" mode=""></image>
				</view>
				<view class="list-item-content">
					<view class="list-item-content-left">
						<view>{{item.face_value}}</view>
						<text>优惠券(元)</text>
					</view>
					<view class="list-item-content-right">
						<view class="list-item-content-right-name">
							{{item.can_use}}
						</view>
						<view class="list-item-content-right-btn">
							<text>满{{item.use_condition}}元可用</text>
							<!-- <view :class="index%2==0?'list-item-content-right-btn-ed':''">已使用</view> -->
						</view>
						<text>有效期至{{item.end_use_time}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],//优惠券列表
			};
		},
		onLoad(options) {
			this.list = JSON.parse(options.coupon)
		},
		methods:{
			// 选择优惠券
			changeCoupon(m_cpn_id) {
				let pages = getCurrentPages()
				let prevPage = pages[pages.length-2]
				prevPage.$vm.m_cpn_id = m_cpn_id
				uni.navigateBack({
					delta: 1
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

	.list{
		width: 100%;
		padding: 40rpx 40rpx 0 40rpx;
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
