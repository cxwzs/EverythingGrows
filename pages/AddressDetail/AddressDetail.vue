<template>
	<view class="container">
		<!-- 收货人 -->
		<view class="item">
			<view>收货人</view>
			<input type="text" v-model="contacts" placeholder="请输入收货人姓名" placeholder-class="inps" />
			<u-icon name="arrow-right" color="#fff" size="28"></u-icon>
		</view>
		<!-- 性别 -->
		<view class="gender">
			<view class="gender-item" v-for="(item,index) in genderOptions" :key="index" @click="changeGender(item.id)">
				<view class="gender-item-icon">
					<image v-show="item.id != gender" src="/static/img/img_3.png" mode=""></image>
					<image v-show="item.id == gender" src="/static/img/img_4.png" mode=""></image>
				</view>
				<text>{{item.text}}</text>
			</view>
		</view>
		<!-- 手机号 -->
		<view class="item">
			<view>手机号</view>
			<input type="number" v-model="mobile" placeholder="请输入收货手机号" placeholder-class="inps" />
			<u-icon name="arrow-right" color="#fff" size="28"></u-icon>
		</view>
		<!-- 地址 -->
		<picker @change="bindPickerChange" mode="region">
			<view class="item">
				<view>地址</view>
				<input type="text" :value="`${province_name+city_name+district_name}`" disabled placeholder="请选择收货地址"
				 placeholder-class="inps" />
				<u-icon name="arrow-right" color="#999" size="28"></u-icon>
			</view>
		</picker>
		<!-- 详细地址 -->
		<view class="detail">
			<textarea v-model="address" placeholder="详细地址：如街道门牌信息" placeholder-class="inps" maxlength="-1" :auto-height="true"></textarea>
		</view>
		<!-- 设置默认地址 -->
		<view class="default">
			<text>设为默认地址</text>
			<u-switch v-model="defaultAddress" active-color="#77C881"></u-switch>
		</view>
		<!-- 占位符 -->
		<view style="width: 100%;height: 118rpx;"></view>
		<!-- 按钮 -->
		<view class="btn" @click="bindAddress">
			{{type==1?'添加地址':'保存修改'}}
		</view>
	</view>
</template>

<script>
	import {
		UpdAddress,
		AddressDetail
	} from '@/network/api.js'
	export default {
		data() {
			return {
				type: 1, //1 添加 2 修改
				genderOptions: [{
						id: 1,
						text: '男生'
					},
					{
						id: 2,
						text: '女生'
					}
				], //性别选项
				gender: 1, //选中的性别
				defaultAddress: false, //是否为默认地址
				adr_id: '', //地址id  修改地址时存在
				contacts: '', //收货人
				mobile: '', //联系电话
				province_id: '', // 省id
				province_name: '', //省名称
				city_id: '', //城市id
				city_name: '', //城市名称
				district_id: '', //区县id
				district_name: '', //区县名称
				address: '', //详细地址
			};
		},
		onLoad(options) {
			this.type = options.type
			uni.setNavigationBarTitle({
				title: this.type == 1 ? '添加地址' : '修改地址'
			})
			// 修改地址 获取地址详情
			if (this.type == 2) {
				this.adr_id = options.adr_id
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					adr_id: this.adr_id
				}
				AddressDetail(data).then((res) => {
					this.gender = res.data.data.sex
					this.defaultAddress = res.data.data.is_default==1?true:false
					this.contacts = res.data.data.contacts
					this.mobile = res.data.data.mobile
					this.province_id = res.data.data.province_id
					this.province_name = res.data.data.province_name
					this.city_id = res.data.data.city_id
					this.city_name = res.data.data.city_name
					this.district_id = res.data.data.district_id
					this.district_name = res.data.data.district_name
					this.address = res.data.data.address
				})
			}
		},
		methods: {
			// 选择性别
			changeGender(val) {
				this.gender = val
			},
			// 选择 收货地址
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e)
				this.province_id = e.detail.code[0]
				this.province_name = e.detail.value[0]
				this.city_id = e.detail.code[1]
				this.city_name = e.detail.value[1]
				this.district_id = e.detail.code[2]
				this.district_name = e.detail.value[2]
			},
			// 添加/修改 地址
			bindAddress() {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					contacts: this.contacts,
					mobile: this.mobile,
					province_id: this.province_id,
					province_name: this.province_name,
					city_id: this.city_id,
					city_name: this.city_name,
					district_id: this.district_id,
					district_name: this.district_name,
					address: this.address,
					is_default: this.defaultAddress ? 1 : '0',
					adr_id: this.adr_id || '',
					sex: this.gender
				}
				UpdAddress(data).then((res) => {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 1500,
						success: (res) => {
							setTimeout(() => {
								let pages = getCurrentPages()
								let prevPage = pages[pages.length - 2]
								prevPage.$vm.getAddress()
								uni.navigateBack({
									delta: 1
								})
							}, 1510)
						}
					})
				}).catch(err => {
					console.log(err,'UpdAddress')
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F6F4F4;
	}
</style>

<style lang="scss" scoped>
	.btn {
		width: 100%;
		height: 98rpx;
		background-color: #77C881;
		text-align: center;
		line-height: 98rpx;
		font-size: 32rpx;
		color: #fff;
		font-weight: 600;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 99;
	}

	.inps {
		font-size: 30rpx;
		color: #999999;
		font-weight: 400;
	}

	.item {
		width: 100%;
		height: 104rpx;
		background-color: #fff;
		margin-top: 2rpx;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		z-index: 5;

		>picker {
			width: 100%;
			height: 100%;
		}

		>view {
			font-size: 30rpx;
			color: #333333;
			font-weight: 400;
		}

		>input {
			width: 70%;
			font-size: 30rpx;
			color: #333333;
			font-weight: 400;
		}
	}

	.gender {
		width: 100%;
		height: 104rpx;
		background-color: #fff;
		margin-top: 2rpx;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		&-item {
			display: flex;
			align-items: center;
			margin: 0 40rpx;

			&-icon {
				width: 26rpx;
				height: 26rpx;
				margin-right: 20rpx;
			}

			>text {
				font-size: 30rpx;
				color: #333333;
				font-weight: 400;
			}
		}
	}

	.detail {
		width: 100%;
		padding: 30rpx 40rpx;
		margin-top: 2rpx;
		background-color: #fff;

		>textarea {
			width: 100%;
			min-height: 200rpx;
			font-size: 30rpx;
			color: #333333;
			font-weight: 400;
		}
	}

	.default {
		width: 100%;
		height: 104rpx;
		background-color: #fff;
		margin-top: 20rpx;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		>text {
			font-size: 30rpx;
			color: #333333;
			font-weight: 400;
		}
	}
</style>
