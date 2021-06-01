<template>
	<view class="container" v-if="item">
		<view class="item" @click="toCurriculumList(item.id,item.name)">
			<view class="item-img">
				<u-image width="100%" height="100%" border-radius="20" :src="item.image"></u-image>
			</view>
			<view class="item-content">
				<view class="item-content-title">
					{{item.name}}
				</view>
				<view class="item-content-desc">
					{{item.desc}}
				</view>
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
		props: {
			// 作品数据
			item: {
				type: Object,
				default: {}
			}
		},
		methods: {
			// 跳转到 课程列表
			toCurriculumList(id, name) {
				uni.navigateTo({
					url: '/pages/CurriculumList/CurriculumList?type=' + id + '&title=' + name + '&status=' + 3 
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		width: 100%;
		height: 192rpx;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 80rpx;
		padding: 40rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: relative;
		z-index: 5;
	
		&-img {
			width: 202rpx;
			height: 202rpx;
			position: absolute;
			left: 30rpx;
			top: -40rpx;
			z-index: 6;
		}
	
		&-content {
			width: 63%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
	
			>view {
				width: 100%;
				text-align: justify;
			}
	
			&-title {
				font-size: 32rpx;
				color: #333333;
				font-weight: 600;
			}
	
			&-desc {
				font-size: 24rpx;
				color: #9A9A9A;
				font-weight: 400;
			}
		}
	}
</style>
