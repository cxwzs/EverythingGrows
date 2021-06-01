<template>
	<view class="container">
		<!-- 列表 -->
		<view class="list" v-if="list.length">
			<view class="list-item" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
				<u-image shape="square" width="100%" height="100%" border-radius="20" :src="item.image"></u-image>
			</view>
		</view>
		<!-- 空视图 -->
		<emptyView v-if="!list.length"></emptyView>
	</view>
</template>

<script>
	import {
		CurriculumSubjectListMore,
		MemberCurriculumSubjectListMore,
		CollectionCurriculumListMore
	} from '@/network/api.js'
	export default {
		data() {
			return {
				enable: true,
				list: [], //课程列表
				s_id: '', //几岁id
				subject_id: '', //学科类型subject_id
				page: 1, //分页
				status: 1, // 1 录播课程 2 已购课程 3 收藏课程
			};
		},
		async onLoad(options) {
			this.status = options.status
			this.s_id = options.s_id
			this.subject_id = options.subject_id
			if(this.status==1){
				// 获取课程列表
				this.getCurriculumSubjectListMore(this.s_id)
			}else if(this.status==2){
				this.getMemberCurriculumSubjectListMore(this.s_id)
			}else{
				this.getCollectionCurriculumListMore(this.s_id)
			}
		},
		onShow() {
			this.enable = true
		},
		onHide() {
			this.enable = false
		},
		onReachBottom() {
			if(this.status==1){
				let data = {
					subject_id: this.subject_id,
					s_id: this.s_id,
					p: this.page + 1
				}
				CurriculumSubjectListMore(data).then(res => {
					if (res.data.data.length != 0) {
						this.list = this.list.concat(res.data.data)
						this.page += 1
					} else {
						uni.showToast({
							title: '没有更多了',
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err, 'CurriculumSubjectListMore')
				})
			}else if(this.status==2){
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					subject_id: this.subject_id,
					s_id: this.s_id,
					p: this.page + 1
				}
				MemberCurriculumSubjectListMore(data).then(res => {
					if (res.data.data.length != 0) {
						this.list = this.list.concat(res.data.data)
						this.page += 1
					} else {
						uni.showToast({
							title: '没有更多了',
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err, 'MemberCurriculumSubjectListMore')
				})
			}else{
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					subject_id: this.subject_id,
					s_id: this.s_id,
					p: this.page + 1
				}
				CollectionCurriculumListMore(data).then(res => {
					if (res.data.data.length != 0) {
						this.list = this.list.concat(res.data.data)
						this.page += 1
					} else {
						uni.showToast({
							title: '没有更多了',
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err, 'CollectionCurriculumListMore')
				})
			}
		},
		methods: {
			// 获取课程列表
			getCurriculumSubjectListMore(s_id) {
				this.page = 1
				let data = {
					subject_id: this.subject_id,
					s_id: s_id,
					p: this.page
				}
				CurriculumSubjectListMore(data).then(res => {
					this.list = res.data.data
				}).catch(err => {
					console.log(err, 'CurriculumSubjectListMore')
				})
			},
			// 获取 用户已购课程列表
			getMemberCurriculumSubjectListMore(s_id) {
				this.page = 1
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					subject_id: this.subject_id,
					s_id: s_id,
					p: this.page
				}
				MemberCurriculumSubjectListMore(data).then(res => {
					this.list = res.data.data
				}).catch(err => {
					console.log(err, 'MemberCurriculumSubjectListMore')
				})
			},
			// 获取 用户收藏课程列表
			getCollectionCurriculumListMore(s_id) {
				this.page = 1
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					subject_id: this.subject_id,
					s_id: s_id,
					p: this.page
				}
				CollectionCurriculumListMore(data).then(res => {
					this.list = res.data.data
				}).catch(err => {
					console.log(err, 'CollectionCurriculumListMore')
				})
			},
			// 跳转到 课程详情
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/CurriculumDetail/CurriculumDetail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		width: 100%;
		height: 110rpx;
		background-color: #fff;
		border-bottom: 2rpx solid #F8F8FC;

		&-list {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;

			&-item {
				padding: 0 40rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
				position: relative;
				z-index: 5;

				&-border {
					position: absolute;
					z-index: 6;
					bottom: -18rpx;
					left: 50%;
					transform: translateX(-50%);
					width: 66rpx;
					height: 4rpx;
					background: #77C881;
					border-radius: 2rpx;
					display: none;
				}

				&-show {
					display: block !important;
				}

				&-text {
					font-size: 32rpx;
					color: #999999;
					font-weight: 600;
					margin-top: 36rpx;
				}

				&-active {
					color: #77C881 !important;
				}

				&-age {
					font-size: 26rpx;
					color: #333333;
					font-weight: 600;
					margin-top: 4rpx;
				}
			}
		}
	}

	.list {
		width: 100%;
		padding: 10rpx 40rpx 40rpx 40rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		&-item {
			width: 212rpx;
			height: 280rpx;
			margin-right: 17rpx;
			margin-top: 30rpx;
		}

		&-item:nth-of-type(3n+3) {
			margin-right: 0;
		}
	}
</style>
