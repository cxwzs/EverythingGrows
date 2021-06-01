<template>
	<view class="container">
		<view class="list" v-if="list.length!=0">
			<view class="list-item" v-for="(item,index) in list" :key="index" @click="toDetail(type==1?item.id:item.order_id)">
				<u-image border-radius="20" width="100%" height="100%" :src="item.image"></u-image>
			</view>
		</view>
		<!-- 空视图 -->
		<emptyView v-if="list.length==0"></emptyView>
	</view>
</template>

<script>
	import {
		CardTypeList,
		MemberCardTypeList
	} from '@/network/api.js'
	export default {
		data() {
			return {
				list: [], //万物卡 列表
				page: 1, //分页
				type: 1, //1 购买万物卡 2 我购买的万物卡
				status: 1, //1 可使用 2 可激活
				card_type: '', //卡片类型id
			};
		},
		onLoad(options) {
			/*
				title 万物卡名称
				card_type 卡片类型id
				type 0 购买万物卡 1 我购买的万物卡
				status 0 可使用 1 可激活
			*/
			let data = JSON.parse(options.data)
			this.card_type = data.card_type
			this.type = Number(data.type) + 1
			this.status = Number(data.status) + 1 || ''
			uni.setNavigationBarTitle({
				title: data.title
			})
			if (this.type == 2) {
				let datas = {
					m_id: uni.getStorageSync('userinfo').m_id,
					card_type: this.card_type,
					status: this.status,
					p: this.page
				}
				MemberCardTypeList(datas).then(res => {
					this.list = res.data.data
				}).catch(err => {
					console.log(err, 'MemberCardTypeList')
				})
			} else {
				let datas = {
					card_type: this.card_type,
					p: this.page
				}
				CardTypeList(datas).then(res => {
					this.list = res.data.data
				}).catch(err => {
					console.log(err, 'CardTypeList')
				})
			}
		},
		onReachBottom() {
			if (this.type == 2) {
				let datas = {
					m_id: uni.getStorageSync('userinfo').m_id,
					card_type: this.card_type,
					status: this.status,
					p: this.page + 1
				}
				MemberCardTypeList(datas).then(res => {
					if (res.data.data.length != 0) {
						this.page += 1
						this.list = [...this.list, ...res.data.data]
					}
				}).catch(err => {
					console.log(err, 'MemberCardTypeList')
				})
			} else {
				let datas = {
					card_type: this.card_type,
					p: this.page
				}
				CardTypeList(datas).then(res => {
					if (res.data.data.length != 0) {
						this.page += 1
						this.list = [...this.list, ...res.data.data]
					}
				}).catch(err => {
					console.log(err, 'CardTypeList')
				})
			}
		},
		methods: {
			// 跳转到 卡详情
			toDetail(id) {
				/*
					type 1 购买万物卡 2 我购买的万物卡
					id 卡id(购买万物卡)/订单id(我购买的万物卡)
				*/
				uni.navigateTo({
					url: '/pages/CardDetail/CardDetail?type=' + this.type + '&id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		width: 100%;
		padding: 0 40rpx 30rpx 40rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;

		&-item {
			width: 318rpx;
			height: 195rpx;
			margin-top: 30rpx;
		}
	}
</style>
