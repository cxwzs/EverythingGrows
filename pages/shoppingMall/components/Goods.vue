<template>
	<view class="item" @click="toDetail(1,item.goods_id)">
		<view class="item-img">
			<u-image width="100%" height="100%" :src="item.cover_path"></u-image>
		</view>
		<view class="item-name">
			{{item.goods_name}}
		</view>
		<view class="item-price">
			<text>￥</text>
			<view>{{item.price}}</view>
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
			item: {
				type: Object
			}
		},
		methods:{
			// 跳转到 详情
			toDetail(type,goods_id) {
				/*
					type 1 商城商品 2 兑换商品
					goods_id 商品id
				*/
				uni.navigateTo({
					url:'/pages/GoodsDetail/GoodsDetail?type=' + type + '&goods_id=' + goods_id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item{
		width: 324rpx;
		margin-top: 40rpx;
		&-img{
			width: 100%;
			height: 324rpx;
		}
		&-name{
			width: 100%;
			@include text-hidden-line(1);
			font-size: 30rpx;
			color: #333333;
			font-weight: 600;
			margin-top: 15rpx;
		}
		&-price{
			margin-top: 10rpx;
			display: flex;
			align-items: flex-end;
			>text{
				font-size: 26rpx;
				color: #FD5401;
				font-weight: 600;
			}
			>view{
				font-size: 36rpx;
				color: #FD5401;
				font-weight: 600;
			}
		}
	}
</style>
