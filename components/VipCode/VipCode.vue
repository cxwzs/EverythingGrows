<template>
	<view class="container">
		<u-popup @close="vipCodePopupClose" v-model="show" mode="center" border-radius="20" width="630" height="705" z-index="900">
			<view class="code">
				<view class="code-title">
					此二维码可累计积分
				</view>
				<view class="code-url">
					<u-image width="100%" height="100%" :src="vipCode"></u-image>
				</view>
				<view class="code-tips">
					会员码每30秒自动刷新不支持付款
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		VipCode
	} from '@/network/api.js'
	export default {
		data() {
			return {
				show: this.vipCodePopup,
				vipCode: '', //会员码
				timer: '', //定时器
			};
		},
		props: {
			vipCodePopup: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			vipCodePopup: {
				handler(newValue, oldValue) {
					this.show = newValue
					if (this.show) {
						this.getVipCode()
						this.timer = this.timerRefreshVipCode()
					}else{
						clearInterval(this.timer)
					}
				}
			}
		},
		methods: {
			// vip码弹窗 关闭
			vipCodePopupClose() {
				this.show = false
				this.$emit('vipCodePopupClose')
			},
			// 获取会员码
			getVipCode() {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id
				}
				VipCode(data, false).then((res) => {
					this.vipCode = res.data.data.image
				})
			},
			// 定时 刷新 会员码
			timerRefreshVipCode() {
				return setInterval(() => {
					// 获取会员码
					this.getVipCode()
				}, 30000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.code {
		width: 630rpx;
		height: 705rpx;
		padding: 60rpx 115rpx 40rpx 115rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;

		&-title {
			width: 100%;
			text-align: center;
			font-size: 36rpx;
			color: #333333;
			font-weight: 600;
		}

		&-tips {
			width: 75%;
			text-align: center;
			font-size: 28rpx;
			color: #999999;
			font-weight: 400;
		}

		&-url {
			width: 100%;
			height: 400rpx;
		}
	}
</style>
