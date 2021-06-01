Component({
	/**
	 * 组件的属性列表
	 */
	properties: {

	},
	/**
	 * 组件的初始数据
	 */
	data: {
		_tabbat: 0, //选中的 tabbar
		iPhoneX: false, //兼容iPhone X 当前设备是否是iPhone X
		urls: [{
				"iconPath": "/static/tabbar/index.png",
				"selectedIconPath": "/static/tabbar/index_active.png",
				"pagePath": "/pages/index/index",
				"text": "首页",
				"type": 1
			},
			{
				"iconPath": "/static/tabbar/curriculum.png",
				"selectedIconPath": "/static/tabbar/curriculum_active.png",
				"pagePath": "/pages/curriculum/curriculum",
				"text": "课程",
				"type": 2
			},
			{
				"iconPath": "/static/tabbar/upload.png",
				"selectedIconPath": "/static/tabbar/upload.png",
				"pagePath": "/pages/upload/upload",
				"text": "上传",
				"type": 3
			},
			{
				"iconPath": "/static/tabbar/shoppingMall.png",
				"selectedIconPath": "/static/tabbar/shoppingMall_active.png",
				"pagePath": "/pages/shoppingMall/shoppingMall",
				"text": "商城",
				"type": 4
			},
			{
				"iconPath": "/static/tabbar/mine.png",
				"selectedIconPath": "/static/tabbar/mine_active.png",
				"pagePath": "/pages/mine/mine",
				"text": "我的",
				"type": 5

			}
		], //tabbar页面路径
	},
	attached() {
		wx.getSystemInfo({
			success: (res) => {
				console.log(res.model)
				if (res.model.indexOf('iPhone X') >= 0) {
					this.setData({
						iPhoneX: true
					})
				}
			}
		})
	},
	/**
	 * 组件的方法列表
	 */
	methods: {
		// 跳转 tabbar
		switchTap(e) {
			/*
				type 判断点击的那个导航页面
			*/
			if (e.currentTarget.dataset.type == 3) {
				wx.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					success:(res)=>{
						console.log(res, '选择图片成功')
						wx.navigateTo({
							url: '/pages/WorksMounting/WorksMounting?url=' + res.tempFilePaths[0]
						})
					},
					fail:(err) => {
						console.log(err, '选择图片失败')
					}
				})
			} else {
				wx.switchTab({
					url: e.currentTarget.dataset.page_path,
				})
			}
		}
	}
})
