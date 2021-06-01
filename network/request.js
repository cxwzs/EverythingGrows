// const dizhitou = 'http://wanwushengzhang-api.uuudoo.com/'
const dizhitou = 'https://wanwushengzhang-api.uuudoo.com/'

export default (options) => {
	// 请求数据
	return new Promise((resolve, reject) => {
		if(options.showLoading) {
			uni.showLoading({
				title: "加载中"
			})
		}
		// uni.showNavigationBarLoading()
		uni.request({
			url: dizhitou + options.url,
			method: 'post',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: options.data,
			success: (res) => {
				uni.hideLoading()
				// uni.hideNavigationBarLoading()
				if (res.data.flag == "success") {
					resolve(res)
				} else {
					reject(res)
					uni.showToast({
						title: res.data.message,
						icon: "none",
						duration:1500
					})
				}
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}
