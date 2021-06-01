<template>
	<view class="container" v-if="details">
		<!-- 大图 -->
		<view class="banner">
			<!-- <u-image shape="square" width="100%" height="100%" :src="details.image"></u-image> -->
			<video id="myVideo" :src="details.video" :title="details.name" @play="bindPlay"></video>
		</view>
		<!-- 内容 -->
		<view class="content">
			<view class="content-price">
				<view style="margin-right: 10rpx;">{{details.moeny}}</view>
				<text>种子</text>
				<view style="margin-right: 10rpx;">/{{details.pay}}</view>
				<text>元</text>
			</view>
			<view class="content-tips">
				<u-icon name="error-circle" color="#999999" size="36"></u-icon>
				<view>{{details.adr}}</view>
			</view>
			<view class="content-text">
				{{details.name}}
			</view>
		</view>
		<!-- 详情 -->
		<view class="detail">
			<view class="detail-title">
				课程介绍
			</view>
			<view class="detail-content">
				<u-parse :html="details.content"></u-parse>
			</view>
		</view>
		<!-- 占位符 -->
		<view style="width: 100%;height: 160rpx;"></view>
		<!-- 按钮 -->
		<view class="btn">
			<view class="btn-left">
				<view class="btn-left-item" @click="bindCollection">
					<u-icon :name="details.collection_curriculum_status==1?'star-fill':'star'"
						:color="details.collection_curriculum_status==1?'#F39400':'#999'" size="46"></u-icon>
				</view>
				<view class="btn-left-item">
					<u-icon name="zhuanfa" color="#999999" size="44"></u-icon>
					<button open-type="share" plain></button>
				</view>
			</view>
			<view class="btn-right" v-if="details.pay_curriculum_status=='0'" @click="bindBuy">
				立即购买
			</view>
			<view class="btn-right" v-else>
				已购买
			</view>
		</view>
		<!-- 支付密码 弹窗 -->
		<u-popup v-model="passwordPopup" :mask-close-able="false" mode="center" width="630" height="280">
			<view class="password">
				<view class="password-inp">
					<u-message-input @finish="PassWord" :value="pay_pass" :maxlength="6" :dot-fill="true" mode="box"></u-message-input>
				</view>
				<view class="password-btn">
					<view class="password-btn-item" @click="hidePasswordPopup"
						style="color: #333;border-right: 2rpx solid #f6f6f6;">
						取消
					</view>
					<view class="password-btn-item" @click="buyCurriculum" style="color: #62BD6A;">
						立即购买
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		CurriculumDetail,
		CurriculumCollection,
		BuyCurriculum,
		PassMember
	} from '@/network/api.js'
	export default {
		data() {
			return {
				passwordPopup: false, //密码弹窗
				pay_pass: '', //支付密码
				videoContext: '',
				id: '', //课程id
				details: '', //课程详情
				video_src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4'
			};
		},
		computed: {
			// 是否已设置 支付密码
			is_pay_pass() {
				return this.$store.state.is_pay_pass
			}
		},
		onLoad(options) {
			if (options != undefined && options != null && options != '') {
				this.id = options.id
			}
		},
		onShow() {
			let data = {
				m_id: uni.getStorageSync('userinfo').m_id || '',
				id: this.id
			}
			CurriculumDetail(data).then(res => {
				this.details = res.data.data
			}).catch(err => {
				console.log(err, 'CurriculumDetail')
			})
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		methods: {
			// 密码
			PassWord(e) {
				this.pay_pass = e
			},
			// 取消 密码输入框
			hidePasswordPopup() {
				this.pay_pass = ''
				this.passwordPopup = false
			},
			// 播放 课程
			bindPlay() {
				if (!this.$LoginIF(2)) {
					this.videoContext.pause()
					return false
				}
				if (this.details.pay_curriculum_status == 0) {
					uni.showToast({
						title: '请先购买课程',
						icon: 'none'
					})
					this.videoContext.pause()
					return false
				}
			},
			// 收藏/取消收藏 课程
			bindCollection() {
				if (this.$LoginIF(2)) {
					let data = {
						m_id: uni.getStorageSync('userinfo').m_id,
						id: this.id
					}
					CurriculumCollection(data).then(res => {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						this.$set(this.details, 'collection_curriculum_status', this.details
							.collection_curriculum_status == 1 ? 2 : 1)
					}).catch(err => {
						console.log(err, 'CurriculumCollection')
					})
				}
			},
			// 购买 
			bindBuy() {
				if (!this.$LoginIF(2)) return false
				uni.navigateTo({
					url:'/pages/CurriculumPay/CurriculumPay?id=' + this.id
				})
				// if (!this.$LoginIF(2)) return false
				// if (!this.is_pay_pass) {
				// 	uni.showModal({
				// 		title: '提示',
				// 		confirmText: '设置密码',
				// 		confirmColor: '#73C67D',
				// 		cancelText: '取消',
				// 		cancelColor: '#999',
				// 		content: '请先去设置支付密码',
				// 		success: (res) => {
				// 			if (res.confirm) {
				// 				uni.navigateTo({
				// 					url: '/pages/FromSeed/FromSeed'
				// 				})
				// 			}
				// 		}
				// 	})
				// 	return false
				// }
				// this.passwordPopup = true
			},
			// 立即购买课程
			buyCurriculum() {
				if(!this.pay_pass) {
					uni.showToast({
						title: '请输入支付密码',
						icon: 'none'
					})
					return false
				}
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					id: this.id
				}
				BuyCurriculum(data).then(res => {
					let order_id = res.data.data.order_id
					PassMember({
						m_id: uni.getStorageSync('userinfo').m_id,
						order_id: res.data.data.order_id,
						pay_pass: this.pay_pass
					}).then(res => {
						// this.$set(this.details, 'pay_curriculum_status', '1')
						this.pay_pass = ''
						this.passwordPopup = false
						// 更新 vuex 里的数据
						// this.$updateFUNC()
						uni.navigateTo({
							url:'/pages/PayResult/PayResult?status=' + 1 + '&type=' + 4 + '&order_id=' + order_id
						})
					}).catch(err => {
						console.log(err, 'PassMember')
					})
				}).catch(err => {
					console.log(err, 'BuyCurriculum')
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8FC;
	}
</style>

<style lang="scss" scoped>
	.banner {
		width: 100%;
		height: 422rpx;

		>video {
			width: 100%;
			height: 100%;
		}
	}

	.content {
		width: 100%;
		padding: 40rpx;
		background-color: #fff;

		&-price {
			width: 100%;
			display: flex;
			align-items: flex-end;

			>text {
				font-size: 26rpx;
				color: #FD5401;
				font-weight: 600;
				display: inline-block;
				margin-bottom: 8rpx;
			}

			>view {
				font-size: 48rpx;
				color: #FD5401;
				font-weight: 600;
			}
		}

		&-tips{
			width: 100%;
			display: flex;
			align-items: center;
			margin-top: 10rpx;
			>view{
				font-size: 26rpx;
				color: #999999;
				margin-left: 10rpx;
			}
		}

		&-text {
			width: 100%;
			margin-top: 10rpx;
			text-align: justify;
			font-size: 36rpx;
			color: #333333;
			font-weight: 600;
			line-height: 1.5;
		}
	}

	.detail {
		width: 100%;
		padding: 40rpx;
		background-color: #fff;
		margin-top: 20rpx;

		&-title {
			font-size: 32rpx;
			color: #333333;
			font-weight: 600;
		}

		&-content {
			width: 100%;
			margin-top: 30rpx;
		}
	}

	.btn {
		width: 100%;
		height: 140rpx;
		background-color: #fff;
		position: fixed;
		z-index: 99;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-right {
			width: 506rpx;
			height: 84rpx;
			background-color: #77C881;
			border-radius: 42rpx;
			text-align: center;
			line-height: 84rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			font-weight: 600;
		}

		&-left {
			display: flex;
			align-items: center;
			width: 180rpx;
			height: 100%;

			&-item {
				width: 50%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				z-index: 5;

				>button {
					@include shareButton();
				}
			}
		}
	}

	.password {
		width: 630rpx;
		height: 280rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;

		&-inp {
			width: 100%;
			padding: 30rpx 0 50rpx 0;
		}

		&-btn {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-top: 2rpx solid #f6f6f6;

			&-item {
				width: 50%;
				height: 98rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
			}
		}
	}
</style>
