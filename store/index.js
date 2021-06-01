import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	// 存放状态
	state: {
		balance: 0, //种子
		integral: 0, //果实
		gift_nums: 0, //万物卡
		course_nums:0,//已学课程
		is_pay_pass: 0,//是否已设置 支付密码
	},
	// 改变 state 里的值
	mutations: {
		// 改变 种子
		changeBalance(state, val) {
			state.balance = val
		},
		// 改变 果实
		changeIntegral(state, val) {
			state.integral = val
		},
		// 改变 万物卡
		changeGiftNums(state, val) {
			state.gift_nums = val
		},
		// 改变 已学课程
		changeCourseNums(state, val) {
			state.course_nums = val
		},
		// 改变 是否已设置 支付密码
		changePassword(state, val) {
			state.is_pay_pass = val
		}
	}
})
