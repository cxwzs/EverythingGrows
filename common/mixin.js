const tabbar = {
	methods: {
		setTabBarIndex(index) {
			if (typeof this.$mp.page.getTabBar === 'function' &&
				this.$mp.page.getTabBar()) {

				this.$mp.page.getTabBar().setData({
					_tabbat: index
				})
			}
		}
	}
}

export default tabbar
