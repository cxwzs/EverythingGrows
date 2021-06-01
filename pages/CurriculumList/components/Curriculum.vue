<template>
	<view class="container">
		<view class="item">
			<view class="item-title">
				<view>{{item.name}}</view>
				<text @click="toMore(item.subject_id)">查看更多</text>
			</view>
			<view class="item-content">
				<view class="item-content-nr" v-for="(items,indexs) in item.curriculum_video_image" :key="indexs" @click="toDetail(items.id)">
					<u-image shape="square" width="100%" height="100%" border-radius="20" :src="items.image"></u-image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			// 课程数据
			item: {
				type: Object,
				default: {}
			},
			//课程 分类id
			type: {
				type: [Number, String],
				default: ''
			},
			//课程 年龄段id
			s_id:{
				type: [Number, String],
				default: ''
			},
			// 1 录播课程 2 已购课程
			status:{
				type: [Number, String],
				default: ''
			}
		},
		methods: {
			// 跳转到 课程详情
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/CurriculumDetail/CurriculumDetail?id=' + id
				})
			},
			// 跳转到 查看更多
			toMore(subject_id) {
				uni.navigateTo({
					url: '/pages/CurriculumMore/CurriculumMore?s_id=' + this.s_id + '&subject_id=' + subject_id + '&status=' + this.status
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		width: 100%;
		padding: 40rpx 40rpx 20rpx 40rpx;

		&-title {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			>view {
				font-size: 32rpx;
				color: #333333;
				font-weight: 600;
			}

			>text {
				font-size: 26rpx;
				color: #999999;
				font-weight: 400;
			}
		}

		&-content {
			width: 100%;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin-top: 15rpx;

			&-nr {
				width: 212rpx;
				height: 280rpx;
				margin-right: 17rpx;
				margin-top: 30rpx;
			}

			&-nr:nth-of-type(3n+3) {
				margin-right: 0;
			}
		}
	}
</style>
