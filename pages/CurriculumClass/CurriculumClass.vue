<template>
	<view class="container">
		<view class="bg" :style="'background-color:'+bgColor"></view>
		<view class="menu" v-if="list.length!=0">
			<view class="menu-item" v-for="(item,index) in list" :key="index" @click="toCurriculumList(item.id,item.name)">
				<view class="menu-item-img">
					<u-image width="100%" height="100%" border-radius="20" :src="item.image"></u-image>
				</view>
				<view class="menu-item-content">
					<view class="menu-item-content-title">
						{{item.name}}
					</view>
					<view class="menu-item-content-desc">
						{{item.desc}}
					</view>
				</view>
			</view>
		</view>
		<emptyView v-if="list.length==0"></emptyView>
	</view>
</template>

<script>
	import {
		CurriculumList,
		MemberCurriculumList
	} from '@/network/api.js'
	export default {
		data() {
			return {
				bgColor: '', //页面背景色
				list: [], //课程列表
				status:1,// 1 录播课程 2 已购课程
			};
		},
		onLoad(options) {
			console.log(options)
			this.status = options.type
			uni.setNavigationBarTitle({
				title: options.type == 1 ? '录播课程' : '已购课程'
			})
			this.bgColor = options.type == 1 ? '#FF9A7C' : '#3FA2FE'
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: options.type == 1 ? '#FF9A7C' : '#3FA2FE'
			})
			if (options.type == 1) {
				CurriculumList().then(res => {
					this.list = res.data.data
				}).catch(err => {
					console.log(err, 'CurriculumList')
				})
			} else {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id
				}
				MemberCurriculumList(data).then(res => {
					this.list = res.data.data
				}).catch(err => {
					console.log(err,'MemberCurriculumList')
				})
			}
		},
		methods: {
			// 跳转到 课程列表
			toCurriculumList(id, name) {
				uni.navigateTo({
					url: '/pages/CurriculumList/CurriculumList?type=' + id + '&title=' + name + '&status=' + this.status
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
	}

	.menu {
		width: 100%;
		padding: 0 30rpx 60rpx 30rpx;

		&-item {
			width: 100%;
			height: 192rpx;
			background-color: #fff;
			border-radius: 20rpx;
			margin-top: 80rpx;
			padding: 40rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			position: relative;
			z-index: 5;

			&-img {
				width: 202rpx;
				height: 202rpx;
				position: absolute;
				left: 30rpx;
				top: -40rpx;
				z-index: 6;
			}

			&-content {
				width: 63%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				>view {
					width: 100%;
					text-align: justify;
				}

				&-title {
					font-size: 32rpx;
					color: #333333;
					font-weight: 600;
				}

				&-desc {
					font-size: 24rpx;
					color: #9A9A9A;
					font-weight: 400;
				}
			}
		}
	}
</style>
