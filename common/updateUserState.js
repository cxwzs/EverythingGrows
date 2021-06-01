//更新 vuex里  果实  种子 万物卡等数量
import {
	GetInfo
} from '@/network/api.js'
import store from '@/store/index.js'
export default {
	updateFUNC() {
		let data = {
			m_id: uni.getStorageSync('userinfo').m_id
		}
		GetInfo(data, false).then(res => {
			store.commit('changeBalance',res.data.data.balance)
			store.commit('changeIntegral',res.data.data.integral)
			store.commit('changeGiftNums',res.data.data.gift_nums)
			store.commit('changeCourseNums',res.data.data.course_nums)
			store.commit('changePassword',res.data.data.is_pay_pass)
		}).catch(err => {
			console.log(err,'GetInfo')
		})
	}
}