// 验证 是否登录
export const LoginIF = (type = 1) => {
	if (uni.getStorageSync('userinfo') && uni.getStorageSync('userinfo') != null && uni.getStorageSync('userinfo') !=
		undefined) {
		return true
	} else {
		uni.showModal({
			title: '提示',
			confirmText: '去登陆',
			confirmColor: '#73C67D',
			cancelText: '取消',
			cancelColor: '#999',
			content: '请先去登录',
			success: (res) => {
				if (res.confirm) {
					uni.navigateTo({
						url: '/pages/Login/Login?refresh=' + type
					})
				}
			}
		})
		return false
	}
}
