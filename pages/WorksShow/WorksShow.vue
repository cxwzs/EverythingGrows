<template>
	<view class="container">
		<!-- 导航 -->
		<u-sticky :enable="enable">
			<view class="nav">
				<scroll-view :scroll-x="true" :enable-flex="true" class="nav-list">
					<view class="nav-list-item" v-for="(item,index) in worksType" :key="index"
						@click="changeNav(index,item.id)">
						<view class="nav-list-item-content">
							<view class="nav-list-item-content-icon" v-if="item.icon">
								<image :src="item.icon" mode=""></image>
							</view>
							<text :class="nav===index?'nav-list-active':''">{{item.name}}</text>
						</view>
						<view class="nav-list-item-border" :class="nav===index?'nav-list-item-show':''"></view>
					</view>
				</scroll-view>
			</view>
		</u-sticky>
		<!-- 列表 -->
		<view class="list" v-if="list.length">
			<view class="list-box">
				<view v-for="(item, index) in list" :key="index" class="list-box-item" @click="toDetail(item.id)">
					<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
					<view class="list-box-item-pic">
						<u-image width="100%" height="100%" mode="aspectFill" :src="item.image"></u-image>
						<!-- <image :src="item.image" mode="aspectFill"></image> -->
					</view>
					<view class="list-box-item-content">
						<view class="list-box-item-content-left">
							<view class="list-box-item-content-left-tx">
								<u-image width="100%" height="100%" border-radius="50%" :src="item.avatar"></u-image>
								<!-- <image :src="item.avatar" mode="aspectFill"></image> -->
							</view>
							<view class="list-box-item-content-left-nr">
								<view class="list-box-item-content-left-nr-name">
									{{item.nickname}}
								</view>
								<view class="list-box-item-content-left-nr-detail">
									{{item.age}}{{item.member_address?'，':''}}{{item.member_address}}
								</view>
							</view>
						</view>
						<view class="list-box-item-content-right">
							<u-icon :name="item.works_collection_status==1?'heart-fill':'heart'"
								:color="item.works_collection_status==1?'#FF3847':'#999'" size="24"></u-icon>
							<view>{{item.works_collection_zong}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 空视图 -->
		<EmptyView v-if="!list.length"></EmptyView>
		<!-- 列表 -->
		<view class="list" v-if="false">
			<view class="wrap">
				<u-waterfall v-model="list" ref="uWaterfall">
					<template v-slot:left="{leftList}">
						<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
							<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
							<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index">
							</u-lazy-load>
							<view class="list-box-item-content">
								<view class="list-box-item-content-left">
									<view class="list-box-item-content-left-tx">
										<u-image width="100%" height="100%" border-radius="50%" :src="item.avatar"></u-image>
										<!-- <image :src="item.avatar" mode="aspectFill"></image> -->
									</view>
									<view class="list-box-item-content-left-nr">
										<view class="list-box-item-content-left-nr-name">
											{{item.nickname}}
										</view>
										<view class="list-box-item-content-left-nr-detail">
											{{item.age}}{{item.member_address?'，':''}}{{item.member_address}}
										</view>
									</view>
								</view>
								<view class="list-box-item-content-right">
									<u-icon :name="item.works_collection_status==1?'heart-fill':'heart'"
										:color="item.works_collection_status==1?'#FF3847':'#999'" size="24"></u-icon>
									<view>{{item.works_collection_zong}}</view>
								</view>
							</view>
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
							<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index">
							</u-lazy-load>
							<view class="list-box-item-content">
								<view class="list-box-item-content-left">
									<view class="list-box-item-content-left-tx">
										<u-image width="100%" height="100%" border-radius="50%" :src="item.avatar"></u-image>
										<!-- <image :src="item.avatar" mode="aspectFill"></image> -->
									</view>
									<view class="list-box-item-content-left-nr">
										<view class="list-box-item-content-left-nr-name">
											{{item.nickname}}
										</view>
										<view class="list-box-item-content-left-nr-detail">
											{{item.age}}{{item.member_address?'，':''}}{{item.member_address}}
										</view>
									</view>
								</view>
								<view class="list-box-item-content-right">
									<u-icon :name="item.works_collection_status==1?'heart-fill':'heart'"
										:color="item.works_collection_status==1?'#FF3847':'#999'" size="24"></u-icon>
									<view>{{item.works_collection_zong}}</view>
								</view>
							</view>
						</view>
					</template>
				</u-waterfall>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		WorksList,
		WorksType
	} from '@/network/api.js'
	export default {
		data() {
			return {
				enable: true,
				nav: 0,
				worksType: [], //作品类型
				page: 1, //分页
				list: [], //作品列表
			};
		},
		async onLoad() {
			// 获取 作品类型
			this.worksType = await this.getWorksType()
			// 获取 作品列表
			this.getWorksList(this.worksType[0].id)
		},
		onShow() {
			this.enable = true
		},
		onHide() {
			this.enable = false
		},
		onReachBottom() {
			let data = {
				type_id: this.worksType[this.nav].id || '',
				m_id: uni.getStorageSync('userinfo').m_id,
				p: this.page + 1
			}
			WorksList(data).then((res) => {
				if (res.data.data.length != 0) {
					this.page += 1
					this.list = [...this.list, ...res.data.data]
				} else {
					uni.showToast({
						title: '没有更多了',
						icon: 'none'
					})
				}
			})
		},
		methods: {
			// 跳转到 详情
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/WorksDetail/WorksDetail?id=' + id
				})
			},
			// 切换导航
			changeNav(index, id) {
				this.nav = index
				this.getWorksList(id)
			},
			// 获取 作品类型
			getWorksType() {
				return new Promise((resolve, reject) => {
					WorksType().then((res) => {
						resolve(res.data.data)
					}).catch((err) => {
						reject(err)
					})
				})
			},
			// 获取 作品列表
			getWorksList(type_id) {
				this.page = 1
				let data = {
					type_id: type_id || '',
					m_id: uni.getStorageSync('userinfo').m_id,
					p: this.page
				}
				WorksList(data).then((res) => {
					this.list = res.data.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.nav {
		width: 100%;
		height: 114rpx;
		overflow: hidden;
		background-color: #fff;
		border-bottom: 2rpx solid #F8F8FC;

		&-list {
			width: 100%;
			height: 140rpx;
			display: flex;
			align-items: flex-start;

			&-item {
				height: 110rpx;
				position: relative;
				z-index: 5;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;

				&-content {
					padding: 0 30rpx;
					display: flex;
					// margin-top: 35rpx;
					align-items: center;

					&-icon {
						width: 36rpx;
						height: 36rpx;
						margin-right: 10rpx;
					}

					>text {
						font-size: 30rpx;
						color: #999999;
						font-weight: 400;
					}
				}

				&-border {
					width: 40rpx;
					height: 8rpx;
					background: #77C881;
					border-radius: 4rpx;
					position: absolute;
					z-index: 6;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					display: none;
				}

				&-show {
					display: block;
				}
			}

			&-active {
				font-size: 48rpx !important;
				color: #77C881 !important;
				font-weight: 600 !important;
			}
		}
	}

	.list {
		width: 100%;
		padding: 0 30rpx;

		&-right {
			padding-left: 11rpx;
		}

		&-left {
			padding-right: 11rpx;
		}

		&-box {
			width: 100%;
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			justify-content: space-between;

			&-item {
				margin-top: 20rpx;
				width: 324rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				border: 2rpx solid #E5E5E5;
				border-radius: 20rpx;
				overflow: hidden;

				&-pic {
					width: 100%;
					height: 340rpx;
				}

				&-content {
					width: 100%;
					height: 110rpx;
					padding: 0 15rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					&-left {
						width: 80%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						&-tx {
							width: 54rpx;
							height: 54rpx;

							>image {
								border-radius: 50%;
							}
						}

						&-nr {
							width: 70%;
							height: 54rpx;
							display: flex;
							flex-direction: column;
							align-items: flex-start;
							justify-content: space-between;

							&-name {
								width: 100%;
								font-size: 22rpx;
								color: #333333;
								font-weight: 600;
								@include text-hidden-line(1);
							}

							&-detail {
								width: 100%;
								font-size: 16rpx;
								color: #666666;
								font-weight: 400;
								@include text-hidden-line(1);
							}
						}
					}

					&-right {
						height: 54rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-between;

						>view {
							font-size: 16rpx;
							color: #999999;
							font-weight: 400;
						}
					}
				}
			}
		}
	}


	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}
	
	.demo-image {
		width: 100%;
		border-radius: 4px;
	}
	
	.demo-warter {
			border-radius: 8px;
			margin: 5px;
			background-color: #ffffff;
			padding: 8px;
			position: relative;
		}
		
		.u-close {
			position: absolute;
			top: 32rpx;
			right: 32rpx;
		}
		
		.demo-image {
			width: 100%;
			border-radius: 4px;
		}
		
		.demo-title {
			font-size: 30rpx;
			margin-top: 5px;
			color: $u-main-color;
		}
		
		.demo-tag {
			display: flex;
			margin-top: 5px;
		}
		
		.demo-tag-owner {
			background-color: $u-type-error;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			padding: 4rpx 14rpx;
			border-radius: 50rpx;
			font-size: 20rpx;
			line-height: 1;
		}
		
		.demo-tag-text {
			border: 1px solid $u-type-primary;
			color: $u-type-primary;
			margin-left: 10px;
			border-radius: 50rpx;
			line-height: 1;
			padding: 4rpx 14rpx;
			display: flex;
			align-items: center;
			border-radius: 50rpx;
			font-size: 20rpx;
		}
		
		.demo-price {
			font-size: 30rpx;
			color: $u-type-error;
			margin-top: 5px;
		}
		
		.demo-shop {
			font-size: 22rpx;
			color: $u-tips-color;
			margin-top: 5px;
		}
	
</style>
