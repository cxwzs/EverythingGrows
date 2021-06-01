<template>
	<view class="container">
		<view class="empty">
			<view class="empty-img">
				<image src="/static/img/img_30.png" mode=""></image>
			</view>
			<text>暂无礼物卡</text>
			<view class="empty-btn" v-if="status==1" @click="goBuy">
				去购买万物卡
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			// status 1 用户查看自己的万物卡 0 用户查看购买列表中的万物卡
			status:{
				type:[Number,String],
				default:'0'
			}
		},
		methods:{
			// 去购买万物卡
			goBuy() {
				this.$emit('goBuy')
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.empty{
		position: fixed;
		z-index: -1;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		&-img{
			width: 550rpx;
			height: 300rpx;
		}
		>text{
			font-size: 28rpx;
			color: #999999;
			font-weight: 400;
		}
		&-btn{
			width: 450rpx;
			height: 88rpx;
			background: linear-gradient(-28deg, #77C881, #62BD6A);
			border-radius: 44rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 32rpx;
			color: #fff;
			font-weight: 600;
			position: absolute;
			z-index: 1;
			left: 50%;
			transform: translateX(-50%);
			bottom: 230rpx;
		}
	}
</style>
