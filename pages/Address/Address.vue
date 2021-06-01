<template>
	<view class="container">
		<!-- title -->
		<view class="title" v-if="handleDefaultAddress">
			默认地址
		</view>
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in defaultAddress" :key="item.adr_id" @click="delAddressDefault"
		 :options="options">
			<view class="address" v-if="handleDefaultAddress" @click="changeAddress(2,item.adr_id)">
				<view class="address-left">
					<view class="address-left-top">
						<u-icon name="map" color="#77C881" size="48"></u-icon>
						<view>{{item.contacts}}</view>
						<view>{{item.sex==1?'先生':'女士'}}</view>
						<view>{{item.mobile}}</view>
					</view>
					<view class="address-left-bottom">
						{{item.province_name+item.city_name+item.district_name+item.address}}
					</view>
				</view>
				<view class="address-right" @click.stop="toAddressDetail(2,item.adr_id)">
					<image src="/static/img/img_20.png" mode=""></image>
				</view>
			</view>
		</u-swipe-action>
		<view class="title" v-if="handleList">
			其他地址
		</view>
		<view class="list" v-if="handleList">
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item.adr_id" @click="delAddress"
			 @open="open" :options="options">
				<view class="address" @click="changeAddress(2,item.adr_id)">
					<view class="address-left">
						<view class="address-left-top">
							<u-icon name="map" color="#77C881" size="48"></u-icon>
							<view>{{item.contacts}}</view>
							<view>{{item.sex==1?'先生':'女士'}}</view>
							<view>{{item.mobile}}</view>
						</view>
						<view class="address-left-bottom">
							{{item.province_name+item.city_name+item.district_name+item.address}}
						</view>
					</view>
					<view class="address-right" @click.stop="toAddressDetail(2,item.adr_id)">
						<image src="/static/img/img_20.png" mode=""></image>
					</view>
				</view>
			</u-swipe-action>
		</view>
		<!-- 占位符 -->
		<view style="width: 100%;height: 118rpx;"></view>
		<!-- 按钮 -->
		<view class="btn" @click="toAddressDetail(1)">
			添加新地址
		</view>
		<!-- 空视图 -->
		<EmptyView v-if="!handleDefaultAddress&&!handleList"></EmptyView>
	</view>
</template>

<script>
	import {
		Addresses,
		DelAddress
	} from '@/network/api.js'
	export default {
		data() {
			return {
				type: 1, //1 我的页面进入 2 确认订单页面进入
				list: [], //其他地址
				defaultAddress: [], //默认地址
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		computed: {
			// 判断 是否存在默认地址
			handleDefaultAddress() {
				return this.defaultAddress.length != 0
			},
			// 判断 是否存在其他地址
			handleList() {
				return this.list.length != 0
			}
		},
		onLoad(options) {
			console.log(options)
			this.type = options.type
			// 获取地址
			this.getAddress()
		},
		methods: {
			// 获取 地址列表
			getAddress() {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id
				}
				Addresses(data).then((res) => {
					this.list = res.data.data.list
					this.defaultAddress = res.data.data.is_default
				})
			},
			// 跳转到 地址详情
			toAddressDetail(type, adr_id) {
				/*
					type 1 添加新地址 2 修改地址
					adr_id 地址id
				*/
				uni.navigateTo({
					url: '/pages/AddressDetail/AddressDetail?type=' + type + '&adr_id=' + adr_id
				})
			},
			// 选择地址
			changeAddress(type, adr_id) {
				/*
					type 1 添加新地址 2 修改地址
					this.type 1 我的页面进入 2 确认订单页面进入
					adr_id 地址id
				*/
				switch (Number(this.type)) {
					case 1:
						uni.navigateTo({
							url: '/pages/AddressDetail/AddressDetail?type=' + type + '&adr_id=' + adr_id
						})
						break;
					case 2:
						let pages = getCurrentPages()
						let prevPage = pages[pages.length-2]
						prevPage.$vm.adr_id = adr_id
						uni.navigateBack({
							delta: 1
						})
						break
				}
			},
			// 删除 其他地址
			delAddress(index) {
				console.log(index)
				// index 地址下标
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					adr_id: this.list[index].adr_id
				}
				DelAddress(data).then((res) => {
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
					this.list.splice(index, 1)
				})
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			// 删除 默认地址
			delAddressDefault(index) {
				console.log(index)
				// index 地址下标
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					adr_id: this.defaultAddress[index].adr_id
				}
				DelAddress(data).then((res) => {
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
					this.defaultAddress.splice(index, 1)
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

	.title {
		width: 100%;
		padding: 30rpx;
		text-align: left;
		font-size: 28rpx;
		color: #666666;
		font-weight: 400;
	}

	.address {
		width: 100%;
		padding: 30rpx;
		background-color: #fff;
		border-bottom: 2rpx solid #F6F4F4;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-right {
			width: 36rpx;
			height: 36rpx;
		}

		&-left {
			width: 90%;

			&-top {
				width: 100%;
				display: flex;
				align-items: center;

				>view {
					font-size: 30rpx;
					color: #333333;
					font-weight: 400;
					margin-left: 15rpx;
				}
			}

			&-bottom {
				width: 100%;
				padding-left: 64rpx;
				text-align: justify;
				font-size: 26rpx;
				color: #999999;
				font-weight: 400;
				margin-top: 20rpx;
				left: 1.5;
			}
		}
	}
</style>
