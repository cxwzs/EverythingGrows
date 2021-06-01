// const dizhitou = 'http://wanwushengzhang-api.uuudoo.com/'
const dizhitou = 'https://wanwushengzhang-api.uuudoo.com/'

export default (options) => {
	// 上传文件
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: "上传中"
		})
		uni.uploadFile({
			url: dizhitou + options.url, //仅为示例，非真实的接口地址
			filePath: options.data,
			name: 'file',
			formData: {
				folder: 1
			},
			success: (res) => {
				console.log(res)
				uni.hideLoading()
				let datas=JSON.parse(res.data)
				if (datas.flag == "success") {
					resolve(datas)
				} else {
					uni.showToast({
						title: datas.message,
						icon: "none"
					})
				}
			},
			fail: function(res) {
				reject(res)
			}
		})
	})
}