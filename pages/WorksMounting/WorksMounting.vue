<template>
	<view class="container">
		<!-- 图片 -->
		<view class="img">
			<!-- 无相框 -->
			<view class="img-content" v-if="!photoDetail">
				<u-image width="100%" height="100%" mode="widthFix" :src="worksUrl"></u-image>
			</view>
			<!-- 有相框 -->
			<view class="img-photo" v-if="photoDetail">
				<view class="img-photo-bg">
					<u-image width="100%" height="100%" :src="photoDetail.image"></u-image>
				</view>
				<view class="img-photo-url"
					:style="'width:'+photoDetail.photo_width+'rpx;'+'height:'+photoDetail.photo_height+'rpx;'">
					<u-image width="100%" height="100%" :src="worksUrl"></u-image>
				</view>
			</view>
		</view>
		<!-- 画板 -->
		<view class="haibao">
			<canvas id='canvas' class='canvas' canvas-id="firstCanvas"></canvas>
		</view>
		<!-- 占位符 -->
		<!-- <view style="width: 100%;" :style="step==1?'height: 530rpx;':'height: 690rpx;'"></view> -->
		<!-- 操作栏 选择相框 -->
		<view class="operation" v-show="step==1">
			<view class="operation-content">
				<view class="operation-content-tabs">
					<u-tabs :list="tabs" :is-scroll="true" :current="current" @change="changeTabs" height="88"
						bar-height="8" bar-width="30" inactive-color="#999999" active-color="#77C881"></u-tabs>
				</view>
				<view class="operation-content-list">
					<scroll-view :scroll-x="true" :enable-flex="true" class="operation-content-list-scroll">
						<view class="operation-content-list-scroll-item" v-for="(item, index) in photoList" :key="index"
							@click="changePhoto(index)">
							<u-image width="100%" height="100%" :src="item.image"></u-image>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="operation-btn" @click="this.$LoginIF()?step = 2:step = 1">
				下一步
			</view>
		</view>
		<!-- 作品信息 操作栏 -->
		<view class="info" v-show="step==2">
			<view class="info-content">
				<view class="info-content-title">
					作品分类
				</view>
				<view class="info-content-inp" @click="show = true">
					<input style="width: 95%;" type="text" v-model="type_name" disabled placeholder="请选择"
						placeholder-class="inps" />
					<u-icon name="arrow-right" color="#999" size="28"></u-icon>
				</view>
				<view class="info-content-title">
					作品名称
				</view>
				<view class="info-content-inp">
					<input type="text" v-model="name" placeholder="请输入......" placeholder-class="inps" />
				</view>
				<view class="info-content-title">
					创作详情
				</view>
				<view class="info-content-detail">
					<textarea v-model="desc" placeholder="请输入......" placeholder-class="inps" maxlength="100"
						:auto-height="false"></textarea>
					<text>0/100</text>
				</view>
				<view class="info-content-radio">
					<!-- <view class="info-content-radio-item" @click="limit = 1">
						<view class="info-content-radio-item-icon">
							<image v-show="limit!=1" src="/static/img/img_3.png" mode=""></image>
							<image v-show="limit==1" src="/static/img/img_4.png" mode=""></image>
						</view>
						<text>是否设置为私密</text>
					</view>
					<view class="info-content-radio-item" @click="limit = 2">
						<view class="info-content-radio-item-icon">
							<image v-show="limit!=2" src="/static/img/img_3.png" mode=""></image>
							<image v-show="limit==2" src="/static/img/img_4.png" mode=""></image>
						</view>
						<text>是否允许转发</text>
					</view> -->
					<u-checkbox-group @change="checkboxGroupChange">
						<u-checkbox active-color="#62BD6A" v-model="item.checked" v-for="(item, index) in checkOptions"
							:key="index" :name="item.id">{{item.name}}</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
			<!-- 占位符 -->
			<view style="width: 100%; height: 100rpx;"></view>
			<view class="info-btn" @click="bindUpload">
				确定上传
			</view>
			<!-- 选择作品分类 弹窗 -->
			<u-select v-model="show" :list="tabs"  @confirm="confirm" value-name="id" label-name="name"></u-select>
		</view>

	</view>
</template>

<script>
	import {
		AddWorksType,
		AddWorksTypePhoto,
		AddWorks,
		Upload
	} from '@/network/api.js'
	export default {
		data() {
			return {
				worksUrl: '', //作品图片路径
				tabs: [],
				current: 0,
				step: 2, //步骤 1 选择作品相框 2 编辑作品信息
				limit: '', //1 设置为私密 2允许转发
				photoList: [], //相框列表
				photoIndex: '', //选中的 相框 下标
				photoDetail: '', //相框信息
				customData: {
					ctx: null,
				}, //海报信息
				name: '', //作品名称
				desc: '', //作品描述
				checkOptions: [{
						name: '是否设置为私密',
						checked: false,
						disabled: false,
						id: 1
					},
					{
						name: '是否允许转发',
						checked: false,
						disabled: false,
						id: 2
					}
				],
				show: false,//选择 作品分类弹窗
				type_id:'',//作品类型 id
				type_name:'',//作品类型 名称
			};
		},
		async onLoad(options) {
			if (options != undefined && options != null && options != '') {
				this.worksUrl = options.url
			}
			// 获取作品类型
			this.tabs = await this.getAddWorksType()
			// 获取 作品类型对应的相框
			this.getAddWorksTypePhoto(this.tabs[this.current].id)
		},
		methods: {
			// 选择 作品 是否私密/是否允许转发
			checkboxGroupChange(e) {
				console.log(e)
				this.limit = e.join(',')
			},
			// 选择 相框
			changePhoto(index) {
				if (this.$LoginIF()) {
					this.photoIndex = index
					this.photoDetail = this.photoList[this.photoIndex]
				}
			},
			// 选择导航
			changeTabs(index) {
				this.current = index
				// 获取 作品类型对应的相框
				this.getAddWorksTypePhoto(this.tabs[this.current].id)
			},
			// 选择 作品分类
			confirm(val) {
				console.log(val)
				this.type_id = val[0].value
				this.type_name = val[0].label
			},
			// 获取作品类型
			getAddWorksType() {
				return new Promise((resolve, reject) => {
					AddWorksType().then(res => {
						resolve(res.data.data)
					}).catch(err => {
						reject(err)
					})
				})
			},
			// 获取 作品类型 对应的相框
			getAddWorksTypePhoto(type_id) {
				let data = {
					type_id: type_id
				}
				AddWorksTypePhoto(data).then(res => {
					this.photoList = res.data.data
				}).catch(err => {
					console.log(err, 'AddWorksTypePhoto')
				})
			},
			// 确定 上传
			async bindUpload() {
				//作品图id
				let worksImageID = await this.PosterMaking()
				// console.log(worksImageID, 'worksImageID')
				let data = {
					m_id: uni.getStorageSync('userinfo').m_id,
					name: this.name,
					desc: this.desc,
					image: worksImageID,
					is_private: this.limit,
					// type_id: this.tabs[this.current].id
					type_id: this.type_id
				}
				AddWorks(data).then(res => {
					uni.showModal({
						title: '等待审核提示',
						content: '发布的内容已成功上传进入人工审核，请耐心等待审核。',
						cancelText: '回到首页',
						confirmText: '继续上传',
						success: (res) => {
							uni.navigateBack({
								delta: 1
							})
						}
					})
				}).catch(err => {
					console.log(err, 'AddWorks')
				})
			},
			// canvas 制作海报
			PosterMaking() {
				return new Promise((resolve, reject) => {
					// 上传 海报 到服务器
					Upload(this.worksUrl).then(res => {
						// console.log(res,'Upload')
						resolve(res.data.list[0].id)
					}).catch(err => {
						reject(err)
					})
					// this.customData.ctx = wx.createCanvasContext('firstCanvas')
					// // 获取画布的宽高
					// uni.createSelectorQuery().select('#canvas').boundingClientRect(async (rect) => {
					// 	let canvasWidth = rect.width
					// 	let canvasHeight = rect.height
					// 	// 清除画布
					// 	this.customData.ctx.clearRect(0, 0, canvasWidth, canvasHeight)
					// 	// 绘制背景
					// 	this.customData.ctx.rect(0, 0, canvasWidth, canvasHeight)
					// 	this.customData.ctx.setFillStyle('white')
					// 	this.customData.ctx.fill()
					// 	// 绘制 海报 背景图 网络图片要通过 getImageInfo / downloadFile 先下载
					// 	let bgImage = await this.getImageInfo(this.photoDetail.image)
					// 	this.customData.ctx.drawImage(bgImage, 0, 0, canvasWidth, canvasHeight)
					// 	// 绘制 海报 内容图 相对海报居中显示
					// 	/*
					// 		worksUrl_x 内容图在海报里x轴的位置
					// 		worksUrl_y 内容图在海报里y轴的位置
					// 	*/
					// 	let worksUrl_x = (canvasWidth - this.photoDetail.photo_width / 2) / 2
					// 	let worksUrl_y = (canvasHeight - this.photoDetail.photo_height / 2) / 2
					// 	// console.log(worksUrl_x,worksUrl_y)
					// 	this.customData.ctx.drawImage(this.worksUrl, worksUrl_x, worksUrl_y, this
					// 		.photoDetail.photo_width / 2, this.photoDetail
					// 		.photo_height /
					// 		2)
					// 	this.customData.ctx.draw(false, () => {
					// 		uni.canvasToTempFilePath({
					// 			x: 0,
					// 			y: 0,
					// 			canvasId: 'firstCanvas',
					// 			success: (res) => {
					// 				// console.log(res, 'canvasToTempFilePath')
					// 				let tempFilePath = res.tempFilePath
					// 				// 上传 海报 到服务器
					// 				Upload(tempFilePath).then(res => {
					// 					// console.log(res,'Upload')
					// 					resolve(res.data.list[0].id)
					// 				}).catch(err => {
					// 					reject(err)
					// 				})
					// 			}
					// 		})
					// 	})
					// }).exec()
				})
			},
			// 下载制作海报所需图片
			getImageInfo(url) {
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: url,
						success: (res) => {
							resolve(res.path)
						},
						fail: (err) => {
							reject(err)
						}
					})
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #F6F4F4;
	}

	.haibao {
		width: 100%;
		padding: 80rpx 105rpx 65rpx 105rpx;
		position: fixed;
		z-index: 9;
		left: 99999rpx;

		.canvas {
			width: 100%;
			height: 540rpx;
		}
	}

	.img {
		width: 100%;
		padding: 80rpx 105rpx 65rpx 105rpx;

		&-content {
			width: 100%;
			// height: 540rpx;
		}

		&-photo {
			width: 100%;
			height: 540rpx;
			position: relative;
			z-index: 5;

			&-bg {
				position: absolute;
				z-index: 6;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}

			&-url {
				position: absolute;
				z-index: 7;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}

	.inp {
		font-size: 30rpx;
		color: #999999;
		font-weight: 400;
	}

	.operation {
		width: 100%;
		height: 530rpx;
		background-color: #fff;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;

		&-btn {
			width: 100%;
			height: 100rpx;
			background-color: #77C881;
			font-weight: 32rpx;
			color: #fff;
			font-weight: 600;
			text-align: center;
			line-height: 100rpx;
		}

		&-content {
			width: 100%;
			height: 430rpx;

			&-tabs {
				width: 100%;
				height: 100rpx;
				border-bottom: 2rpx solid #F6F4F4;
			}

			&-list {
				width: 100%;
				height: 330rpx;
				display: flex;
				align-items: center;

				&-scroll {
					width: 100%;
					display: flex;
					align-items: center;

					&-item {
						flex-shrink: 0;
						width: 180rpx;
						height: 180rpx;
						margin-left: 40rpx;
						margin-top: 32rpx;
					}
				}
			}
		}
	}

	.info {
		width: 100%;
		// height: 690rpx;
		background-color: #fff;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		// position: fixed;
		// left: 0;
		// right: 0;
		// bottom: 0;
		// z-index: 9;

		&-btn {
			width: 100%;
			height: 100rpx;
			background-color: #77C881;
			font-weight: 32rpx;
			color: #fff;
			font-weight: 600;
			text-align: center;
			line-height: 100rpx;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 99;
		}

		&-content {
			width: 100%;
			// height: 590rpx;
			padding: 0 40rpx;

			&-title {
				margin-top: 40rpx;
				font-size: 30rpx;
				color: #333333;
				font-weight: 600;
			}

			&-inp {
				width: 100%;
				height: 88rpx;
				background: #F5F5F5;
				border-radius: 20rpx;
				padding: 0 40rpx;
				display: flex;
				align-items: center;
				margin-top: 20rpx;

				>input {
					width: 100%;
					font-size: 30rpx;
					color: #333333;
					font-weight: 400;
				}
			}

			&-detail {
				width: 100%;
				height: 180rpx;
				background: #F5F5F5;
				border-radius: 20rpx;
				position: relative;
				z-index: 20;
				margin-top: 20rpx;
				overflow: hidden;

				>textarea {
					box-sizing: border-box;
					width: 100%;
					height: 130rpx;
					padding: 20rpx 30rpx;
					line-height: 1.5;
					font-weight: 30rpx;
					color: #333;
					font-weight: 400;
				}

				>text {
					font-size: 28rpx;
					color: #999999;
					font-weight: 400;
					position: absolute;
					right: 30rpx;
					bottom: 10rpx;
					z-index: 21;
				}
			}

			&-radio {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-bottom: 30rpx;
				margin-top: 40rpx;

				&-item {
					width: 50%;
					display: flex;
					align-items: center;
					justify-content: flex-start;

					>text {
						font-size: 30rpx;
						color: #333333;
						font-weight: 400;
					}

					&-icon {
						width: 36rpx;
						height: 36rpx;
						margin-right: 25rpx;
					}
				}
			}
		}
	}
</style>
