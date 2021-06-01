<template>
	<view class="container">
		<!-- 导航 -->
		<u-sticky :enable="enable">
			<view class="nav">
				<scroll-view :show-scrollbar="false" :scroll-x="true" :enable-flex="true" class="nav-list">
					<view class="nav-list-item" v-for="(item,index) in tabs" :key="index" @click="changeNav(index)">
						<view class="nav-list-item-text" :class="nav===index?'nav-list-item-active':''">
							{{item.name}}
						</view>
						<view class="nav-list-item-age">
							{{item.age}}
						</view>
						<view class="nav-list-item-border" :class="nav===index?'nav-list-item-show':''"></view>
					</view>
				</scroll-view>
			</view>
		</u-sticky>
		<!-- 课程列表 -->
		<view class="list">
			<Curriculum v-for="(item,index) in list" :key="index" :item="item" :type="type" :s_id="tabs[nav].s_id"
				:status="status"></Curriculum>
		</view>
		<!-- 空视图 -->
		<emptyView v-if="!list.length"></emptyView>
	</view>
</template>

<script>
	import {
		CurriculumAgeList,
		CurriculumSubjectList,
		MemberCurriculumAgeList,
		MemberCurriculumSubjectList,
		CollectionCurriculumAge,
		CollectionCurriculumList
	} from '@/network/api.js'
	import Curriculum from './components/Curriculum.vue'
	export default {
		data() {
			return {
				enable: true,
				nav: 0,
				tabs: [], //年龄段导航
				list: [], //课程列表
				type: '', //课程类型id
				status: 1, // 1 录播课程 2 已购课程 3 收藏课程
			};
		},
		components: {
			Curriculum
		},
		async onLoad(options) {
			console.log(options)
			this.status = options.status
			this.type = options.type
			uni.setNavigationBarTitle({
				title: options.title
			})
			if (this.status == 1) {
				// 获取 年龄段 导航
				this.tabs = await this.getCurriculumAgeList()
				this.getCurriculumSubjectList(this.tabs[this.nav].s_id)
			} else if (this.status == 2) {
				// 获取 年龄段 导航
				this.tabs = await this.getMemberCurriculumAgeList()
				this.getMemberCurriculumSubjectList(this.tabs[this.nav].s_id)
			} else {
				// 获取 年龄段 导航
				this.tabs = await this.getCollectionCurriculumAge()
				this.getCollectionCurriculumList(this.tabs[this.nav].s_id)
			}
		},
		onShow() {
			this.enable = true
		},
		onHide() {
			this.enable = false
		},
		methods: {
			// 选择导航
			changeNav(index) {
				this.nav = index
				if (this.status == 1) {
					this.getCurriculumSubjectList(this.tabs[this.nav].s_id)
				} else if (this.status == 2) {
					this.getMemberCurriculumSubjectList(this.tabs[this.nav].s_id)
				} else {
					this.getCollectionCurriculumList(this.tabs[this.nav].s_id)
				}
			},
			// 获取 年龄段 导航
			getCurriculumAgeList() {
				return new Promise((resolve, reject) => {
					CurriculumAgeList({
						type: this.type
					}).then(res => {
						resolve(res.data.data.list)
					}).catch(err => {
						reject(err)
					})
				})
			},
			// 获取 年龄段 对应 课程
			getCurriculumSubjectList(s_id) {
				CurriculumSubjectList({
					s_id: s_id
				}).then(res => {
					this.list = res.data.data
				}).catch(err => {
					console.log(err, 'CurriculumSubjectList')
				})
			},
			// 获取 用户已购课程年龄段
			getMemberCurriculumAgeList() {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					id: this.type
				}
				return new Promise((resolve, reject) => {
					MemberCurriculumAgeList(data).then(res => {
						resolve(res.data.data.list)
					}).catch(err => {
						reject(err)
					})
				})
			},
			// 获取 年龄段 对应 用户已购课程
			getMemberCurriculumSubjectList(s_id) {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					s_id: s_id
				}
				MemberCurriculumSubjectList(data).then(res => {
					this.list = res.data.data
				}).catch(err => {
					console.log(err, 'MemberCurriculumSubjectList')
				})
			},
			// 获取 用户收藏课程 年龄段
			getCollectionCurriculumAge() {
				return new Promise((resolve, reject) => {
					CollectionCurriculumAge({
						m_id: uni.getStorageSync('userinfo').m_id,
						type: this.type
					}).then(res => {
						resolve(res.data.data.list)
					}).catch(err => {
						reject(err)
					})
				})
			},
			// 获取 年龄段 对应 用户收藏课程
			getCollectionCurriculumList(s_id) {
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					s_id: s_id
				}
				CollectionCurriculumList(data).then(res => {
					this.list = res.data.data
				}).catch(err => {
					console.log(err, 'CollectionCurriculumList')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		width: 100%;
		height: 130rpx;
		overflow: hidden;
		background-color: #fff;
		border-bottom: 2rpx solid #F8F8FC;

		&-list {
			width: 100%;
			height: 160rpx;
			display: flex;
			align-items: flex-start;

			&-item {
				padding: 0 40rpx;
				height: 110rpx;
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

		>scroll-view::-webkit-scrollbar {
			width: 0;
			height: 0;
			background-color: transparent;
		}
	}
</style>
