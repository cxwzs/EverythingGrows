(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/VipCode/VipCode"],{"0c74":function(e,t,n){"use strict";n.r(t);var i=n("c34c"),o=n("ddab");for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);n("f9ce");var r,a=n("f0c5"),c=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,"5a7d1a34",null,!1,i["a"],r);t["default"]=c.exports},7892:function(e,t,n){},c34c:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return i}));var i={uPopup:function(){return n.e("uview-ui/components/u-popup/u-popup").then(n.bind(null,"3d7e"))},uImage:function(){return n.e("uview-ui/components/u-image/u-image").then(n.bind(null,"a9d3"))}},o=function(){var e=this,t=e.$createElement;e._self._c},u=[]},ce66:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n("226b"),o={data:function(){return{show:this.vipCodePopup,vipCode:"",timer:""}},props:{vipCodePopup:{type:Boolean,default:!1}},watch:{vipCodePopup:{handler:function(e,t){this.show=e,this.show?(this.getVipCode(),this.timer=this.timerRefreshVipCode()):clearInterval(this.timer)}}},methods:{vipCodePopupClose:function(){this.show=!1,this.$emit("vipCodePopupClose")},getVipCode:function(){var t=this,n={m_id:e.getStorageSync("userinfo").m_id};(0,i.VipCode)(n,!1).then((function(e){t.vipCode=e.data.data.image}))},timerRefreshVipCode:function(){var e=this;return setInterval((function(){e.getVipCode()}),3e4)}}};t.default=o}).call(this,n("543d")["default"])},ddab:function(e,t,n){"use strict";n.r(t);var i=n("ce66"),o=n.n(i);for(var u in i)"default"!==u&&function(e){n.d(t,e,(function(){return i[e]}))}(u);t["default"]=o.a},f9ce:function(e,t,n){"use strict";var i=n("7892"),o=n.n(i);o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/VipCode/VipCode-create-component',
    {
        'components/VipCode/VipCode-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0c74"))
        })
    },
    [['components/VipCode/VipCode-create-component']]
]);