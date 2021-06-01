<template>
	<view class="container">
		<view class="title" v-if="title">
			{{title}}
		</view>
		<view class="content" v-if="content">
			<u-parse :html="content"></u-parse>
		</view>
	</view>
</template>

<script>
	import {
		UserInstructions
	} from '@/network/api.js'
	export default {
		data() {
			return {
				title:'',//标题
				content:'',//内容
			};
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title:options.title
			})
			UserInstructions({
				type: options.type
			}).then(res => {
				this.title = res.data.data.title
				this.content = res.data.data.content
			}).catch(err => {
				console.log(err,'UserInstructions')
			})
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		width: 100%;
		padding: 30rpx;
		text-align: center;
		font-size: 36rpx;
		color: #333;
		font-weight: 600;
	}
	.content{
		width: 100%;
		padding: 30rpx;
	}
</style>
