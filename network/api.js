import $request from './request.js'
import $upload from './upload.js'

// 上传
export const Upload = (data) => {
	return $upload({
		url: 'System/upload',
		data: data
	})
}

// 注册
export const Register = (data, showLoading = true) => {
	return $request({
		url: 'Passport/register',
		data: data,
		showLoading: showLoading
	})
}
// 获取验证码
export const GetVerify = (data, showLoading = true) => {
	return $request({
		url: 'Verify/getVerify',
		data: data,
		showLoading: showLoading
	})
}
// 获取openid
export const OpenidForCode = (data, showLoading = true) => {
	return $request({
		url: 'Passport/openidForCode',
		data: data,
		showLoading: showLoading
	})
}
// 登录
export const Login = (data, showLoading = true) => {
	return $request({
		url: 'Passport/login',
		data: data,
		showLoading: showLoading
	})
}
// 获取我的个人资料	
export const GetInfo = (data, showLoading = true) => {
	return $request({
		url: 'Center/getInfo',
		data: data,
		showLoading: showLoading
	})
}
// 修改我的个人资料	
export const ModifyInfo = (data, showLoading = true) => {
	return $request({
		url: 'Center/modifyInfo',
		data: data,
		showLoading: showLoading
	})
}
// 修改手机号
export const ModifyAccount = (data, showLoading = true) => {
	return $request({
		url: 'Center/modifyAccount',
		data: data,
		showLoading: showLoading
	})
}
// 地址列表
export const Addresses = (data, showLoading = true) => {
	return $request({
		url: 'Center/addresses',
		data: data,
		showLoading: showLoading
	})
}
// 添加/编辑 地址
export const UpdAddress = (data, showLoading = true) => {
	return $request({
		url: 'Center/updAddress',
		data: data,
		showLoading: showLoading
	})
}
// 地址详情
export const AddressDetail = (data, showLoading = true) => {
	return $request({
		url: 'Center/address',
		data: data,
		showLoading: showLoading
	})
}
// 删除 地址
export const DelAddress = (data, showLoading = true) => {
	return $request({
		url: 'Center/delAddress',
		data: data,
		showLoading: showLoading
	})
}
// 意见反馈
export const Feedback = (data, showLoading = true) => {
	return $request({
		url: 'System/feedback',
		data: data,
		showLoading: showLoading
	})
}
// 关于我们
export const AboutUs = (data, showLoading = true) => {
	return $request({
		url: 'System/aboutUs',
		data: data,
		showLoading: showLoading
	})
}
// 首页
export const Index = (data, showLoading = true) => {
	return $request({
		url: 'Index/index',
		data: data,
		showLoading: showLoading
	})
}
// 首页用户信息
export const IndexUser = (data, showLoading = true) => {
	return $request({
		url: 'Index/member_info',
		data: data,
		showLoading: showLoading
	})
}
// 获取 作品类型接口
export const WorksType = (data, showLoading = true) => {
	return $request({
		url: 'Index/works_type',
		data: data,
		showLoading: showLoading
	})
}
// 更多 作品
export const WorksList = (data, showLoading = true) => {
	return $request({
		url: 'Index/works_lists',
		data: data,
		showLoading: showLoading
	})
}
// 作品详情
export const WorksDetail = (data, showLoading = true) => {
	return $request({
		url: 'Index/works_desc',
		data: data,
		showLoading: showLoading
	})
}
// 文章 类型
export const ArticleType = (data, showLoading = true) => {
	return $request({
		url: 'Index/member_article_cat',
		data: data,
		showLoading: showLoading
	})
}
// 文章列表
export const ArticleList = (data, showLoading = true) => {
	return $request({
		url: 'Index/member_article_lists',
		data: data,
		showLoading: showLoading
	})
}
// 文章详情
export const ArticleDetail = (data, showLoading = true) => {
	return $request({
		url: 'Index/member_article_desc',
		data: data,
		showLoading: showLoading
	})
}
// 点赞/取消点赞 作品/文章
export const LikeArticleOrWorks = (data, showLoading = true) => {
	return $request({
		url: 'Index/member_zan',
		data: data,
		showLoading: showLoading
	})
}
// 收藏/取消收藏 作品/文章
export const CollentionArticleOrWorks = (data, showLoading = true) => {
	return $request({
		url: 'Index/member_collection',
		data: data,
		showLoading: showLoading
	})
}
// 关注/取消关注 作品
export const WorksFans = (data, showLoading = true) => {
	return $request({
		url: 'Index/member_fans',
		data: data,
		showLoading: showLoading
	})
}
// 会员码
export const VipCode = (data, showLoading = true) => {
	return $request({
		url: 'Index/code',
		data: data,
		showLoading: showLoading
	})
}
// 商城 商品列表/兑换商品列表
export const GoodsList = (data, showLoading = true) => {
	return $request({
		url: 'Goods/goodsList',
		data: data,
		showLoading: showLoading
	})
}
// 商城 商品分类
export const GoodsCategoryList = (data, showLoading = true) => {
	return $request({
		url: 'Goods/goodsCategoryList',
		data: data,
		showLoading: showLoading
	})
}
// 商城 商品详情
export const GoodsDetail = (data, showLoading = true) => {
	return $request({
		url: 'Goods/goodsDetail',
		data: data,
		showLoading: showLoading
	})
}
// 商城 商品详情 选中规格的信息
export const GoodsGetSku = (data, showLoading = true) => {
	return $request({
		url: 'Goods/getSku',
		data: data,
		showLoading: showLoading
	})
}
// 商城 商品详情 加入购物车
export const AddToCart = (data, showLoading = true) => {
	return $request({
		url: 'Cart/addToCart',
		data: data,
		showLoading: showLoading
	})
}
// 商城 商品详情 收藏/取消收藏 商品
export const DoCollect = (data, showLoading = true) => {
	return $request({
		url: 'Goods/doCollect',
		data: data,
		showLoading: showLoading
	})
}
// 商城 购物车列表
export const CartList = (data, showLoading = true) => {
	return $request({
		url: 'Cart/cartList',
		data: data,
		showLoading: showLoading
	})
}
// 商城 购物车列表 更新商品数量
export const UpdCart = (data, showLoading = true) => {
	return $request({
		url: 'Cart/updCart',
		data: data,
		showLoading: showLoading
	})
}
// 商城 购物车列表 金额结算
export const CartChoose = (data, showLoading = true) => {
	return $request({
		url: 'Cart/cartChoose',
		data: data,
		showLoading: showLoading
	})
}
// 商城 购物车列表 删除商品
export const DelFromCart = (data, showLoading = true) => {
	return $request({
		url: 'Cart/delFromCart',
		data: data,
		showLoading: showLoading
	})
}
//商城 确认订单 购物车
export const ConfirmOrder = (data, showLoading = true) => {
	return $request({
		url: 'Flow/confirmOrder',
		data: data,
		showLoading: showLoading
	})
}
//商城 提交订单 购物车
export const SubmitOrder = (data, showLoading = true) => {
	return $request({
		url: 'Flow/submitOrder',
		data: data,
		showLoading: showLoading
	})
}
//商城 确认订单 立即购买
export const FastConfirmOrder = (data, showLoading = true) => {
	return $request({
		url: 'Flow/fastConfirmOrder',
		data: data,
		showLoading: showLoading
	})
}
//商城 提交订单 立即购买
export const FastSubmitOrder = (data, showLoading = true) => {
	return $request({
		url: 'Flow/fastSubmitOrder',
		data: data,
		showLoading: showLoading
	})
}
// 订单 支付页信息
export const Order_desc = (data, showLoading = true) => {
	return $request({
		url: 'Flow/order_desc',
		data: data,
		showLoading: showLoading
	})
}
// 我的 优惠券
export const MyCoupons = (data, showLoading = true) => {
	return $request({
		url: 'Center/myCoupons',
		data: data,
		showLoading: showLoading
	})
}
// 我的 商城商品/兑换商品 订单列表
export const OrderList = (data, showLoading = true) => {
	return $request({
		url: 'OrderInfo/orderList',
		data: data,
		showLoading: showLoading
	})
}
// 我的 订单列表 确认收货
export const SignFor = (data, showLoading = true) => {
	return $request({
		url: 'OrderInfo/signFor',
		data: data,
		showLoading: showLoading
	})
}
// 我的 订单列表 取消订单/申请退款 理由
export const GetReason = (data, showLoading = true) => {
	return $request({
		url: 'System/getReason',
		data: data,
		showLoading: showLoading
	})
}
// 我的 订单列表 取消订单
export const cancelOrder = (data, showLoading = true) => {
	return $request({
		url: 'OrderInfo/cancelOrder',
		data: data,
		showLoading: showLoading
	})
}
// 我的 订单列表 订单详情
export const OrderDetail = (data, showLoading = true) => {
	return $request({
		url: 'OrderInfo/orderDetail',
		data: data,
		showLoading: showLoading
	})
}
// 我的 订单列表 申请退款
export const ApplyRefund = (data, showLoading = true) => {
	return $request({
		url: 'OrderInfo/applyRefund',
		data: data,
		showLoading: showLoading
	})
}
// 我的 订单列表 取消退款
export const CancelRefund = (data, showLoading = true) => {
	return $request({
		url: 'OrderInfo/cancelRefund',
		data: data,
		showLoading: showLoading
	})
}
// 我的 果实记录
export const FruitLog = (data, showLoading = true) => {
	return $request({
		url: 'Flow/fruit_log',
		data: data,
		showLoading: showLoading
	})
}
// 各种 规则
export const UserInstructions = (data, showLoading = true) => {
	return $request({
		url: 'System/userInstructions',
		data: data,
		showLoading: showLoading
	})
}
// 充值 种子金额 列表
export const RechargeList = (data, showLoading = true) => {
	return $request({
		url: 'Index/recharge_list',
		data: data,
		showLoading: showLoading
	})
}
// 充值 种子金额 列表 立即充值
export const CreateRechargeOrder = (data, showLoading = true) => {
	return $request({
		url: 'Center/createRechargeOrder',
		data: data,
		showLoading: showLoading
	})
}
// 购买万物卡列表
export const CardList = (data, showLoading = true) => {
	return $request({
		url: 'Share/card_list',
		data: data,
		showLoading: showLoading
	})
}
// 购买万物卡列表 更多
export const CardTypeList = (data, showLoading = true) => {
	return $request({
		url: 'Share/card_type_list',
		data: data,
		showLoading: showLoading
	})
}
// 购买万物卡列表 卡详情
export const CardDesc = (data, showLoading = true) => {
	return $request({
		url: 'Share/card_desc',
		data: data,
		showLoading: showLoading
	})
}
// 我购买的万物卡列表
export const MemberCardList = (data, showLoading = true) => {
	return $request({
		url: 'Share/member_card_list',
		data: data,
		showLoading: showLoading
	})
}
// 我购买的万物卡列表 更多
export const MemberCardTypeList = (data, showLoading = true) => {
	return $request({
		url: 'Share/member_card_type_list',
		data: data,
		showLoading: showLoading
	})
}
// 我购买的万物卡列表 卡详情
export const MemberCardDesc = (data, showLoading = true) => {
	return $request({
		url: 'Share/member_card_desc',
		data: data,
		showLoading: showLoading
	})
}
// 录播课程
export const CurriculumList = (data, showLoading = true) => {
	return $request({
		url: 'Share/curriculum_list',
		data: data,
		showLoading: showLoading
	})
}
// 录播课程 年龄段
export const CurriculumAgeList = (data, showLoading = true) => {
	return $request({
		url: 'Share/curriculum_age_list',
		data: data,
		showLoading: showLoading
	})
}
// 录播课程 年龄段 对应课程
export const CurriculumSubjectList = (data, showLoading = true) => {
	return $request({
		url: 'Share/curriculum_subject_list',
		data: data,
		showLoading: showLoading
	})
}
// 录播课程 年龄段 对应课程 更多列表
export const CurriculumSubjectListMore = (data, showLoading = true) => {
	return $request({
		url: 'Share/curriculum_video_list',
		data: data,
		showLoading: showLoading
	})
}
// 课程详情
export const CurriculumDetail = (data, showLoading = true) => {
	return $request({
		url: 'Share/curriculum_video_desc',
		data: data,
		showLoading: showLoading
	})
}
// 收藏课程
export const CurriculumCollection = (data, showLoading = true) => {
	return $request({
		url: 'Share/collection_curriculum',
		data: data,
		showLoading: showLoading
	})
}
// 用户购买课程分类
export const MemberCurriculumList = (data, showLoading = true) => {
	return $request({
		url: 'Share/member_curriculum_list',
		data: data,
		showLoading: showLoading
	})
}
// 用户购买课程 年龄段
export const MemberCurriculumAgeList = (data, showLoading = true) => {
	return $request({
		url: 'Share/member_curriculum_age_list',
		data: data,
		showLoading: showLoading
	})
}
// 用户购买课程列表
export const MemberCurriculumSubjectList = (data, showLoading = true) => {
	return $request({
		url: 'Share/member_curriculum_subject_list',
		data: data,
		showLoading: showLoading
	})
}
// 用户购买课程列表 更多
export const MemberCurriculumSubjectListMore = (data, showLoading = true) => {
	return $request({
		url: 'Share/member_curriculum_video_list',
		data: data,
		showLoading: showLoading
	})
}
// 我发布的作品
export const MemberWorksLists = (data, showLoading = true) => {
	return $request({
		url: 'Center/member_works_lists',
		data: data,
		showLoading: showLoading
	})
}
// 我收藏的作品
export const CollectionWorksLists = (data, showLoading = true) => {
	return $request({
		url: 'Center/member_collection_works',
		data: data,
		showLoading: showLoading
	})
}
// 我收藏的亲子文章
export const CollectionArticle = (data, showLoading = true) => {
	return $request({
		url: 'Center/article_collection',
		data: data,
		showLoading: showLoading
	})
}
// 我收藏的商品
export const CollectionGoods = (data, showLoading = true) => {
	return $request({
		url: 'Center/myCollGoods',
		data: data,
		showLoading: showLoading
	})
}
// 我收藏的课程 分类
export const CollectionCurriculumClass = (data, showLoading = true) => {
	return $request({
		url: 'Center/member_collection_curriculum_list',
		data: data,
		showLoading: showLoading
	})
}
// 我收藏的课程 年龄段
export const CollectionCurriculumAge = (data, showLoading = true) => {
	return $request({
		url: 'Center/member_collection_curriculum_age_list',
		data: data,
		showLoading: showLoading
	})
}
// 我收藏的课程 列表
export const CollectionCurriculumList = (data, showLoading = true) => {
	return $request({
		url: 'Center/member_collection_curriculum_subject_list',
		data: data,
		showLoading: showLoading
	})
}
// 我收藏的课程 列表 更多
export const CollectionCurriculumListMore = (data, showLoading = true) => {
	return $request({
		url: 'Center/member_collection_curriculum_video_list',
		data: data,
		showLoading: showLoading
	})
}
// 设置支付密码
export const ModifyPayPass = (data, showLoading = true) => {
	return $request({
		url: 'Center/modifyPayPass',
		data: data,
		showLoading: showLoading
	})
}
// 作品类型接口 添加
export const AddWorksType = (data, showLoading = true) => {
	return $request({
		url: 'Index/works_type',
		data: data,
		showLoading: showLoading
	})
}
// 作品类型接口 添加
export const AddWorksTypePhoto = (data, showLoading = true) => {
	return $request({
		url: 'Index/works_photo',
		data: data,
		showLoading: showLoading
	})
}
// 添加作品
export const AddWorks = (data, showLoading = true) => {
	return $request({
		url: 'Index/works_add',
		data: data,
		showLoading: showLoading
	})
}
// 购买课程
export const BuyCurriculum = (data, showLoading = true) => {
	return $request({
		url: 'Share/MemberCurriculumOrder',
		data: data,
		showLoading: showLoading
	})
}
// 购买万物卡
export const BuyCard = (data, showLoading = true) => {
	return $request({
		url: 'Share/card_order',
		data: data,
		showLoading: showLoading
	})
}
// 激活万物卡
export const ActiveCard = (data, showLoading = true) => {
	return $request({
		url: 'Share/card_order_ji',
		data: data,
		showLoading: showLoading
	})
}
// 使用万物卡
export const UseCard = (data, showLoading = true) => {
	return $request({
		url: 'Share/card_order_yong',
		data: data,
		showLoading: showLoading
	})
}
// 领取万物卡
export const ReceiveCard = (data, showLoading = true) => {
	return $request({
		url: 'Share/card_lingqu',
		data: data,
		showLoading: showLoading
	})
}

// 用户购买课程 验证支付密码
export const PassMember = (data, showLoading = true) => {
	return $request({
		url: 'Share/pass_member',
		data: data,
		showLoading: showLoading
	})
}

// 支付接口
export const DoPay = (data, showLoading = true) => {
	return $request({
		url: 'Flow/doPay',
		data: data,
		showLoading: showLoading
	})
}

// 支付成功  同步回调 获取下单奖励 果实数量
export const AppCallback = (data, showLoading = true) => {
	return $request({
		url: 'OrderPay/appCallback',
		data: data,
		showLoading: showLoading
	})
}

// 课程激活 兑换码
export const CourseActive = (data, showLoading = true) => {
	return $request({
		url: 'Share/set_meal',
		data: data,
		showLoading: showLoading
	})
}

// ios  支付开关 后台控制
export const resGiter = (data, showLoading = true) => {
	return $request({
		url: 'Index/res_giter',
		data: data,
		showLoading: showLoading
	})
}

// 物流进度
export const getLogistics = (data, showLoading = true) => {
	return $request({
		url: 'OrderInfo/getLogistics',
		data: data,
		showLoading: showLoading
	})
}

// 删除 我的作品
export const delWorks = (data, showLoading = true) => {
	return $request({
		url: 'Index/works_del',
		data: data,
		showLoading: showLoading
	})
}
