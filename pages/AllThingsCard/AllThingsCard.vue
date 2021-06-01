<template>
	<view class="container">
		<u-sticky :enable="enable">
			<view class="tabs">
				<u-tabs :list="tabs" bar-width="80" :bar-style="barStyle" active-color="#333333" inactive-color="#999999"
				 :is-scroll="false" :current="current" @change="changeTabs"></u-tabs>
			</view>
			<!-- 我的万物礼物 -->
			<view class="mine" v-if="current==1">
				<view class="mine-content">
					<u-tabs :list="mineTabs" bg-color="#F6F4F4" bar-width="66" active-color="#77C881" inactive-color="#666" :is-scroll="false"
					 :current="mineCurrent" @change="changeMineTabs"></u-tabs>
				</view>
			</view>
		</u-sticky>
		<!-- 购买万物卡 列表 -->
		<view class="list" v-if="current!=1&&cardList.length!=0">
			<view class="list-item" v-for="(item,index) in cardList" :key="index">
				<view class="list-item-title">
					<text>{{item.name}}</text>
					<view @click="toCardMore(item.name,item.card_type)">查看更多</view>
				</view>
				<view class="list-item-content">
					<scroll-view :scroll-x="true" :enable-flex="true" class="list-item-content-scroll">
						<view class="list-item-content-scroll-item" v-for="(items,indexs) in item.card_list" :key="indexs" @click="toCardDetail(items.id)">
							<u-image border-radius="20" width="100%" height="100%" :src="items.image"></u-image>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 我购买的万物卡 列表 -->
		<view class="list" v-if="current==1&&memberCardList.length!=0">
			<view class="list-item" v-for="(item,index) in memberCardList" :key="index">
				<view class="list-item-title">
					<text>{{item.name}}({{item.count}})</text>
					<view @click="toCardMore(item.name,item.card_type)">查看更多</view>
				</view>
				<view class="list-item-content">
					<scroll-view :scroll-x="true" :enable-flex="true" class="list-item-content-scroll">
						<view class="list-item-content-scroll-item" v-for="(items,indexs) in item.card_list" :key="indexs" @click="toCardDetail(items.order_id)">
							<u-image border-radius="20" width="100%" height="100%" :src="items.image"></u-image>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 空视图 -->
		<empty :status="current" @goBuy="goBuy" v-if="current==1?memberCardList.length==0:cardList.length==0"></empty>
	</view>
</template>

<script>
	import {
		CardList,
		MemberCardList
	} from '@/network/api.js'
	import empty from './components/empty.vue'
	export default {
		data() {
			return {
				barStyle: {
					background: `${'#77C881'}`
				},
				enable: true,
				tabs: [{
						name: '购买万物礼物'
					},
					{
						name: '我的万物礼物'
					}
				],
				current: 0,
				mineTabs: [{
						name: '可使用'
					},
					{
						name: '可激活'
					}
				],
				mineCurrent: 0,
				cardList: [], //购买万物卡列表
				memberCardList: [], //我购买的万物卡列表
			};
		},
		components: {
			empty
		},
		onLoad() {
			this.getCardList()
		},
		onShow() {
			this.enable = true
			this.getMemberCardList()
		},
		onHide() {
			this.enable = false
		},
		methods: {
			// 去购买万物卡
			goBuy() {
				this.current = 0
			},
			// 切换 tabs
			changeTabs(index) {
				this.current = index
			},
			// 切换 我的 tabs
			changeMineTabs(index) {
				this.mineCurrent = index
				this.getMemberCardList()
			},
			// 获得 购买万物卡 列表
			getCardList() {
				CardList().then(res => {
					this.cardList = res.data.data
				}).catch(err => {
					console.log(err, 'CardList')
				})
			},
			// 获得 我购买的万物卡 列表
			getMemberCardList() {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					status: this.mineCurrent + 1
				}
				MemberCardList(data).then(res => {
					this.memberCardList = res.data.data.list
					this.$set(this.mineTabs[0],'name','可使用（' + `${res.data.data.zong_count_one}` + '）')
					this.$set(this.mineTabs[1],'name','可激活（' + `${res.data.data.zong_count_two}` + '）')
				}).catch(err => {
					console.log(err, 'MemberCardList')
				})
			},
			// 跳转到 卡详情
			toCardDetail(id) {
				/*
					current 0 购买万物卡 1 我购买的万物卡
					id 卡id(购买万物卡)/订单id(我购买的万物卡)
				*/
			   let type = Number(this.current) + 1
				uni.navigateTo({
					url: '/pages/CardDetail/CardDetail?type=' + type + '&id=' + id
				})
			},
			// 跳转到 更多卡
			toCardMore(title, card_type) {
				/*
					title 万物卡名称
					card_type 卡片类型id
					current 0 购买万物卡 1 我购买的万物卡
					mineCurrent 0 可使用 1 可激活
				*/
				let data = {}
				if (this.current == 1) {
					let dataObj = {
						title: title,
						type: this.current,
						status: this.mineCurrent,
						card_type: card_type
					}
					data = new Object(dataObj)
				} else {
					let dataObj = {
						title: title,
						type: this.current,
						card_type: card_type
					}
					data = new Object(dataObj)
				}
				uni.navigateTo({
					url: '/pages/CardMore/CardMore?data=' + JSON.stringify(data)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabs {
		width: 100%;
		background-color: #fff;
	}

	.mine {
		width: 100%;
		background-color: #F6F4F4;
		padding-top: 30rpx;

		&-content {
			width: 65%;
		}
	}

	.list {
		width: 100%;
		background-color: #fff;
		border-top: 20rpx solid #F6F4F4;

		&-item {
			width: 100%;

			&-title {
				width: 100%;
				padding: 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				>text {
					font-size: 32rpx;
					color: #333333;
					font-weight: 600;
				}

				>view {
					font-size: 26rpx;
					color: #999999;
					font-weight: 400;
				}
			}

			&-content {
				width: 100%;
				height: 240rpx;
				overflow: hidden;

				&-scroll {
					width: 100%;
					height: 270rpx;
					display: flex;
					align-items: flex-start;

					&-item {
						flex-shrink: 0;
						width: 350rpx;
						height: 215rpx;
						margin-left: 40rpx;
						// margin-top: 32rpx;
					}
				}
			}
		}
	}
</style>
