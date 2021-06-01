<template>
	<view class="container">
		<u-popup v-model="show" :mask-close-able="false" mode="bottom" width="750" height="590" border-radius="20">
			<view class="content">
				<view class="content-title">
					<text>请选择面额</text>
					<view class="content-title-close" @click="closePopup">
						<u-icon name="close" color="#333333" size="28"></u-icon>
					</view>
				</view>
				<view class="content-options">
					<scroll-view :scroll-y="true" class="content-options-scroll">
						<view class="content-options-scroll-item" :class="id==index?'content-options-scroll-active':''" v-for="(item,index) in list"
						 :key="index" @click="changeOption(index)">
							{{item.moeny}}种子
						</view>
					</scroll-view>
				</view>
				<view class="content-btn" @click="bindSubmit">
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
				show: this.cardNumPopup,
				id: 0, //选中的 面额
			};
		},
		props: {
			cardNumPopup: {
				type: Boolean,
				default: false
			},
			list: {
				type: Array,
				default: []
			}
		},
		watch: {
			cardNumPopup: {
				handler(newValue, oldValue) {
					this.show = newValue
				}
			}
		},
		methods: {
			// 选择 面额
			changeOption(val) {
				this.id = val
			},
			// 关闭 选择 卡面额 弹窗
			closePopup() {
				this.show = false
				this.$emit('closeCarPopup')
			},
			// 确定 选择的面额
			bindSubmit() {
				this.show = false
				this.$emit('submitCarNum', this.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 590rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;

		&-btn {
			width: 100%;
			height: 98rpx;
			text-align: center;
			line-height: 98rpx;
			background-color: #77C881;
			font-size: 32rpx;
			color: #fff;
			font-weight: 600;
		}

		&-title {
			width: 100%;
			padding: 50rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			z-index: 5;

			>text {
				font-size: 32rpx;
				color: #333333;
				font-weight: 400;
			}

			&-close {
				position: absolute;
				z-index: 6;
				right: 20rpx;
				top: 50%;
				transform: translateY(-50%);
				padding: 20rpx;
			}
		}

		&-options {
			width: 100%;
			padding: 0 40rpx;
			height: 350rpx;

			&-scroll {
				width: 100%;
				height: 100%;

				&-item {
					width: 100%;
					text-align: center;
					height: 105rpx;
					line-height: 105rpx;
					font-size: 28rpx;
					color: #333333;
					font-weight: 400;
					border-bottom: 2rpx solid #E1E1E1;
				}

				&-item:last-child {
					border-bottom: none;
				}

				&-active {
					color: #77C881 !important;
				}
			}
		}
	}
</style>
