<template>
	<view class="container" v-if="item">
		<view class="works">
			<view class="works-left">
				<view class="works-left-icon">
					<image src="/static/img/img_33.png" mode=""></image>
				</view>
				<view class="works-left-border">
					<image src="/static/img/img_34.png" mode=""></image>
				</view>
			</view>
			<view class="works-right">
				<view class="works-right-time">
					<view>{{item.time_log}}</view>
					<!-- <text>周四</text> -->
				</view>
				<view class="works-right-content">
					<u-image width="100%" height="100%" border-radius="20" :src="item.image"></u-image>
				</view>
			</view>
			<view class="works-del" @click="delWorks(item.id)">
				<u-icon name="trash" color="#999" size="42"></u-icon>
				<view>删除</view>
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
			item: {
				type: Object,
				default:{}
			},
			index:{
				type:[Number,String],
				default:0
			}
		},
		methods:{
			// 删除 作品
			delWorks(id) {
				uni.showModal({
					title: '提示',
					confirmText: '删除',
					confirmColor: 'red',
					cancelText: '取消',
					cancelColor: '#999',
					content: '确定删除当前作品吗',
					success: (res) => {
						if (res.confirm) {
							this.$emit('delWorks',id,this.index)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.works{
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		position: relative;
		z-index: 5;
		&-left{
			display: flex;
			flex-direction: column;
			align-items: center;
			&-icon{
				width: 24rpx;
				height: 24rpx;
			}
			&-border{
				width: 2rpx;
				height: 442rpx;
			}
		}
		&-right{
			width: 93%;
			margin-top: -6rpx;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			&-time{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				>view{
					font-size: 28rpx;
					color: #333333;
					font-weight: 400;
					margin-right: 20rpx;
				}
				>text{
					font-size: 28rpx;
					color: #BFBFBF;
					font-weight: 400;
				}
			}
			&-content{
				width: 320rpx;
				height: 320rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 25rpx 0rpx rgba(0, 0, 0, 0.1);
				border-radius: 20rpx;
				padding: 26rpx;
				margin-top: 30rpx;
			}
		}
		&-del{
			position: absolute;
			z-index: 6;
			right: 30rpx;
			top: 50rpx;
			display: flex;
			align-items: center;
			>view{
				margin-left: 10rpx;
			}
		}
	}
</style>
