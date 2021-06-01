<script>
	import {
		// 取消订单/申请退款 理由
		GetReason
	} from '@/network/api.js'
	export default {
		globalData:{
			iPhoneX: false, //兼容iPhone X 当前设备是否是iPhone X
			cancelOrderReason:[],//取消订单理由
			orderRefund:[],//订单退款理由
		},
		onLaunch: function() {
			console.log('App Launch')
			// 获取取消订单理由
			GetReason({
				type: 2
			}, false).then(res => {
				this.$scope.globalData.cancelOrderReason = res.data.data.list
			}).catch(err => {
				console.log(err, 'GetReason')
			})
			// 获取订单退款理由
			GetReason({
				type: 1
			}, false).then(res => {
				this.$scope.globalData.orderRefund = res.data.data.list
			}).catch(err => {
				console.log(err, 'GetReason')
			})
		},
		onShow: function() {
			console.log('App Show')
			// 判断设备
			wx.getSystemInfo({
				success:(res)=> {
					console.log(res.model)
					if (res.model.indexOf('iPhone X') >= 0) {
						this.$scope.globalData.iPhoneX = true
					}else{
						this.$scope.globalData.iPhoneX = false
					}
				}
			})
			if (uni.getStorageSync('userinfo') && uni.getStorageSync('member_id') != null && uni.getStorageSync('member_id') !=
				undefined) {
				// 更新 vuex 里的数据
				this.$updateFUNC()
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共scss */
	page {
		background-color: #fff;
	}

	.container {
		width: 100%;
	}
	.paddingTabbar{
		padding-bottom: 150rpx;
	}
	._iPhoneX{
		padding-bottom: 200rpx;
	}

	view {
		box-sizing: border-box;
	}

	image {
		display: block;
		width: 100%;
		height: 100%;
	}
	// 复选框样式
	/* 未选中的 背景样式 */
	checkbox .wx-checkbox-input {
		width: 40rpx;
		height: 40rpx;
		box-sizing: border-box;
		border: 2rpx solid #E1E1E1;
		border-radius: 50%;
		background-color: #fff;
	}
	
	/* 选中后的样式 （可根据设计稿需求自己修改） */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #75C77F;
		border: none;
	}
	
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		border-radius: 50%;
		width: 46rpx;
		height: 46rpx;
		line-height: 46rpx;
		text-align: center;
		font-size: 20rpx;
		/* 对勾大小 28rpx */
		color: #fff;
		/* 对勾颜色 白色 */
		background: transparent;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
	}
</style>
