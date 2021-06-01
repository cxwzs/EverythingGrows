<template>
	<view class="container">
		<!-- 头像 -->
		<view class="head">
			<view class="head-content" @click="changeAvatar">
				<view class="head-content-img">
					<u-image width="100%" height="100%" border-radius="50%" :src="!change_avatar?avatar_path:change_avatar"></u-image>
				</view>
				<view class="head-content-icon">
					<image src="/static/img/img_23.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 昵称 -->
		<view class="item">
			<text>昵称</text>
			<view class="item-right">
				<input type="text" placeholder="请输入昵称" v-model="nickname" placeholder-class="inps" />
			</view>
		</view>
		<!-- 手机号 -->
		<view class="item">
			<text>手机号</text>
			<view class="item-right">
				<view class="item-right-text">
					{{account.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}
				</view>
				<view class="item-right-btn" @click="toUpdadePhone">
					更换
				</view>
			</view>
		</view>
		<!-- 性别 -->
		<view class="item">
			<text>性别</text>
			<view class="item-right">
				<view class="item-right-gender">
					<view class="item-right-gender-item" v-for="(item,index) in genderOptions" :key="index" @click="changeGender(item.id)">
						<view class="item-right-gender-item-icon">
							<image v-if="gender==item.id" src="/static/img/img_4.png" mode=""></image>
							<image v-else src="/static/img/img_3.png" mode=""></image>
						</view>
						<text>{{item.text}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 生日 -->
		<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="changeBirthday">
			<view class="item">
				<text>生日</text>
				<view class="item-right">
					<view class="item-right-text">
						{{birthday}}
					</view>
					<u-icon name="arrow-right" color="#999999" size="32"></u-icon>
				</view>
			</view>
		</picker>
		<!-- 按钮 -->
		<view class="btn">
			<view class="btn-content" @click="updateUserInfo">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	import {
		GetInfo,
		ModifyInfo,
		Upload
	} from '@/network/api.js'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				genderOptions: [{
						id: 1,
						text: '男生'
					},
					{
						id: '0',
						text: '女生'
					}
				],
				gender: 1, //选中的性别 
				account: '', //用户手机号
				nickname: '', //用户昵称
				avatar_path: '', //用户头像
				change_avatar: '', //修改的 用户头像
				avatar: '', //用户头像id
				birthday: currentDate, //用户生日
			};
		},
		computed: {
			startDate() {
				return this.getDate('start')
			},
			endDate() {
				return this.getDate('end')
			}
		},
		onLoad() {
			let data = {
				m_id: uni.getStorageSync('userinfo').m_id
			}
			GetInfo(data).then((res) => {
				this.gender = res.data.data.gender
				this.birthday = res.data.data.birthday
				this.account = res.data.data.account
				this.nickname = res.data.data.nickname
				this.avatar_path = res.data.data.avatar_path
				this.avatar = res.data.data.avatar
			})
		},
		methods: {
			// 修改 个人资料
			async updateUserInfo() {
				if(this.change_avatar){
					let res = await Upload(this.change_avatar)
					this.change_avatar = ''
					this.avatar = res.data.list[0].id
					this.avatar_path = res.data.list[0].abs_url
				}
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					avatar: this.avatar,
					nickname: this.nickname,
					birthday: this.birthday,
					gender: this.gender
				}
				ModifyInfo(data).then((res) => {
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
				})
			},
			// 选择性别
			changeGender(val) {
				this.gender = val
			},
			// 跳转到 更换手机号
			toUpdadePhone() {
				uni.navigateTo({
					url: '/pages/UpdatePhone/UpdatePhone?account=' + this.account
				})
			},
			// 选择生日
			changeBirthday(e) {
				this.birthday = e.target.value
			},
			getDate(type) {
				const date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()

				if (type === 'start') {
					year = year - 60
				} else if (type === 'end') {
					year = year
				}
				month = month > 9 ? month : '0' + month
				day = day > 9 ? day : '0' + day
				return `${year}-${month}-${day}`
			},
			// 选择头像
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					success: (res) => {
						console.log(res, '选择图片成功')
						this.change_avatar = res.tempFilePaths[0]
					},
					fail: (err) => {
						console.log(err, '选择图片失败')
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F6F4F4;
	}
</style>

<style lang="scss" scoped>
	.head {
		width: 100%;
		padding: 80rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		margin-bottom: 20rpx;

		&-content {
			width: 182rpx;
			height: 182rpx;
			position: relative;
			z-index: 5;

			&-img {
				width: 100%;
				height: 100%;
				position: relative;
				z-index: 6;
			}

			&-icon {
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				z-index: 7;
				right: 0;
				bottom: 0;
			}
		}
	}

	.inps {
		font-size: 28rpx;
		color: #999;
		font-weight: 400;
	}

	.item {
		width: 100%;
		height: 104rpx;
		background-color: #fff;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 2rpx;

		>text {
			font-size: 28rpx;
			color: #333333;
			font-weight: 400;
		}

		&-right {
			width: 80%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-gender {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				&-item {
					width: 50%;
					display: flex;
					align-items: center;

					>text {
						font-size: 28rpx;
						color: #333333;
						font-weight: 400;
					}

					&-icon {
						width: 26rpx;
						height: 26rpx;
						margin-right: 20rpx;
					}
				}
			}

			&-text {
				font-size: 28rpx;
				color: #333333;
				font-weight: 400;
			}

			&-btn {
				width: 124rpx;
				height: 54rpx;
				background: #77C881;
				border-radius: 27rpx;
				text-align: center;
				line-height: 54rpx;
				font-size: 28rpx;
				color: #fff;
				font-weight: 400;
			}

			>input {
				width: 100%;
				font-size: 28rpx;
				color: #333333;
				font-weight: 400;
			}
		}
	}

	.btn {
		width: 100%;
		padding: 0 40rpx;
		margin-top: 80rpx;

		&-content {
			width: 100%;
			height: 88rpx;
			background: #77C881;
			border-radius: 44rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 32rpx;
			color: #fff;
			font-weight: 600;
		}
	}
</style>
