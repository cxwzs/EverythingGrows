(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ArticleDetail/ArticleDetail"],{"02f4":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("226b"),a={data:function(){return{id:"",details:""}},onLoad:function(t){this.id=t.id},onShow:function(){var e=this,i={m_id:t.getStorageSync("userinfo").m_id,id:this.id};(0,n.ArticleDetail)(i).then((function(t){e.details=t.data.data}))},methods:{bindNextPage:function(){var e=this,i={m_id:t.getStorageSync("userinfo").m_id,id:this.details.xia_id};(0,n.ArticleDetail)(i).then((function(t){e.details=t.data.data}))},bindFixed:function(){switch(Number(this.details.target_rule)){case 1:t.navigateTo({url:"/pages/WebView/WebView?url="+this.details.param});break;case 2:t.navigateTo({url:"/pages/GoodsDetail/GoodsDetail?type=1&goods_id="+this.details.param});break;case 3:t.navigateTo({url:"/pages/CurriculumDetail/CurriculumDetail?id="+this.details.param});break}},bindLike:function(){var e=this;if(this.$LoginIF(2)){var i={type:2,m_id:t.getStorageSync("userinfo").m_id,article_id:this.id};(0,n.LikeArticleOrWorks)(i).then((function(i){t.showToast({title:i.data.message,icon:"none"}),e.$set(e.details,"article_zan_status",1==e.details.article_zan_status?"0":1)}))}},bindCollention:function(){var e=this;if(this.$LoginIF(2)){var i={type:2,m_id:t.getStorageSync("userinfo").m_id,article_id:this.id};(0,n.CollentionArticleOrWorks)(i).then((function(i){t.showToast({title:i.data.message,icon:"none"}),e.$set(e.details,"article_collection_status",1==e.details.article_collection_status?"0":1)}))}}}};e.default=a}).call(this,i("543d")["default"])},"13a4":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={uParse:function(){return Promise.all([i.e("common/vendor"),i.e("uview-ui/components/u-parse/u-parse")]).then(i.bind(null,"5540"))},uIcon:function(){return i.e("uview-ui/components/u-icon/u-icon").then(i.bind(null,"e2e3"))}},a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"533b":function(t,e,i){"use strict";i.r(e);var n=i("13a4"),a=i("bb03");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("6d9f");var r,u=i("f0c5"),c=Object(u["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=c.exports},"6d9f":function(t,e,i){"use strict";var n=i("ccbb"),a=i.n(n);a.a},bb03:function(t,e,i){"use strict";i.r(e);var n=i("02f4"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},ccbb:function(t,e,i){},e29c:function(t,e,i){"use strict";(function(t){i("2f2f");n(i("66fd"));var e=n(i("533b"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])}},[["e29c","common/runtime","common/vendor"]]]);