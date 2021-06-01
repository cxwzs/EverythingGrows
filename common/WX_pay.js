// 微信支付 ios系统提示暂未开通 后台控制是否开通微信支付开关
import {
	DoPay,
	resGiter
} from '@/network/api.js'
export default {
	WXPAY(type = 1, order_id) {
		/*
			type 1商品订单2种子充值3万物卡购买
			order_id 订单id
		*/
		if (uni.getSystemInfoSync().system.indexOf('iOS') > -1) {
			// ios
			return new Promise((resolve) => {
				resGiter({}, false).then(res => {
					// ios  支付开关 后台控制
					if (res.data.data.res == 1) {
						DoPay({
							m_id: uni.getStorageSync('userinfo').m_id,
							order_id: order_id,
							payment: 2,
							type: type,
							pay_type: 'wx'
						}).then(res => {
							resolve(res.data.data.data)
						}).catch(err => {
							console.log(err, 'DoPay')
						})
					} else {
						uni.showToast({
							title: '暂未开通',
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(resGiter, 'resGiter')
				})

			})
		} else {
			// android
			return new Promise((resolve) => {
				DoPay({
					m_id: uni.getStorageSync('userinfo').m_id,
					order_id: order_id,
					payment: 2,
					type: type,
					pay_type: 'wx'
				}).then(res => {
					resolve(res.data.data.data)
				}).catch(err => {
					console.log(err, 'DoPay')
				})
			})

		}
	}
}
