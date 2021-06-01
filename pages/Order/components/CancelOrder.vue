<template>
	<view class="container">
		<u-popup v-model="show" :mask-close-able="false" mode="bottom" border-radius="20" width="100%" height="590">
			<view class="content">
				<view class="content-title">
					<text>请选择取消订单的理由</text>
					<view class="content-title-close" @click="bindClose">
						<u-icon name="close" color="#333333" size="28"></u-icon>
					</view>
				</view>
				<view class="content-options">
					<scroll-view :scroll-y="true" class="content-options-scroll">
						<radio-group @change="changeReason">
							<label v-for="(item,index) in list" :key="index" class="content-options-scroll-item">
								<view class="content-options-scroll-item-text">{{item.reason}}</view><radio :value="item.reason" />
							</label>
						</radio-group>
					</scroll-view>
				</view>
				<view class="content-btn" @click="bindCancelOrder">
					确定
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: this.cancelOrderPopup,
				list:getApp().globalData.cancelOrderReason,//取消订单理由
				reason:'',//取消订单理由
			};
		},
		props:{
			cancelOrderPopup:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			cancelOrderPopup:{
				handler(newValue,oldValue) {
					this.show = newValue
				}
			}
		},
		methods:{
			// 关闭 弹窗
			bindClose() {
				this.show = false
				this.$emit('close')
			},
			// 选择 理由
			changeReason(e) {
				this.reason = e.detail.value
			},
			// 取消订单
			bindCancelOrder() {
				this.$emit('cancelOrder',this.reason)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		height: 590rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		&-title{
			width: 100%;
			padding: 40rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			z-index: 5;
			>text{
				font-size: 32rpx;
				color: #333333;
				font-weight: 400;
			}
			&-close{
				padding: 20rpx 30rpx;
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
		&-btn{
			width: 100%;
			height: 98rpx;
			background: #77C881;
			text-align: center;
			line-height: 98rpx;
			font-size: 32rpx;
			color: #fff;
			font-weight: 600;
		}
		&-options{
			width: 100%;
			height: 370rpx;
			padding: 0 40rpx;
			&-scroll{
				width: 100%;
				height: 100%;
				&-item{
					width: 100%;
					height: 105rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 2rpx solid #E1E1E1;
					&-text{
						width: 80%;
						font-size: 28rpx;
						color: #333333;
						font-weight: 400;
						@include text-hidden-line(1);
					}
				}
				&-item:last-child{
					border-bottom: none;
				}
			}
		}
	}
</style>
