(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/demo/demo"],{1277:function(i,t,c){"use strict";(function(i){c("2f2f");e(c("66fd"));var t=e(c("9998"));function e(i){return i&&i.__esModule?i:{default:i}}i(t.default)}).call(this,c("543d")["createPage"])},6332:function(i,t,c){"use strict";var e=c("d72d"),n=c.n(e);n.a},7397:function(i,t,c){"use strict";c.d(t,"b",(function(){return n})),c.d(t,"c",(function(){return o})),c.d(t,"a",(function(){return e}));var e={uButton:function(){return c.e("uview-ui/components/u-button/u-button").then(c.bind(null,"bfe0"))},uWaterfall:function(){return Promise.all([c.e("common/vendor"),c.e("uview-ui/components/u-waterfall/u-waterfall")]).then(c.bind(null,"433d"))},uLazyLoad:function(){return c.e("uview-ui/components/u-lazy-load/u-lazy-load").then(c.bind(null,"e056"))},uIcon:function(){return c.e("uview-ui/components/u-icon/u-icon").then(c.bind(null,"e2e3"))},uLoadmore:function(){return c.e("uview-ui/components/u-loadmore/u-loadmore").then(c.bind(null,"300a"))}},n=function(){var i=this,t=i.$createElement;i._self._c},o=[]},"896c":function(i,t,c){"use strict";var e=c("c7c9"),n=c.n(e);n.a},9998:function(i,t,c){"use strict";c.r(t);var e=c("7397"),n=c("d70a");for(var o in n)"default"!==o&&function(i){c.d(t,i,(function(){return n[i]}))}(o);c("896c"),c("6332");var a,u=c("f0c5"),p=Object(u["a"])(n["default"],e["b"],e["c"],!1,null,"591806d1",null,!1,e["a"],a);t["default"]=p.exports},ae64:function(i,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{loadStatus:"loadmore",flowList:[],list:[{price:35,title:"北国风光，千里冰封，万里雪飘",shop:"李白杜甫白居易旗舰店",image:"http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg"},{price:75,title:"望长城内外，惟余莽莽",shop:"李白杜甫白居易旗舰店",image:"http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg"},{price:385,title:"大河上下，顿失滔滔",shop:"李白杜甫白居易旗舰店",image:"http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg"},{price:784,title:"欲与天公试比高",shop:"李白杜甫白居易旗舰店",image:"http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg"},{price:7891,title:"须晴日，看红装素裹，分外妖娆",shop:"李白杜甫白居易旗舰店",image:"http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg"},{price:2341,shop:"李白杜甫白居易旗舰店",title:"江山如此多娇，引无数英雄竞折腰",image:"http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg"},{price:661,shop:"李白杜甫白居易旗舰店",title:"惜秦皇汉武，略输文采",image:"http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg"},{price:1654,title:"唐宗宋祖，稍逊风骚",shop:"李白杜甫白居易旗舰店",image:"http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg"},{price:1678,title:"一代天骄，成吉思汗",shop:"李白杜甫白居易旗舰店",image:"http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg"},{price:924,title:"只识弯弓射大雕",shop:"李白杜甫白居易旗舰店",image:"http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg"},{price:8243,title:"俱往矣，数风流人物，还看今朝",shop:"李白杜甫白居易旗舰店",image:"http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg"}]}},onLoad:function(){this.addRandomData()},onReachBottom:function(){var i=this;this.loadStatus="loading",setTimeout((function(){i.addRandomData(),i.loadStatus="loadmore"}),1e3)},methods:{addRandomData:function(){for(var i=0;i<10;i++){var t=this.$u.random(0,this.list.length-1),c=JSON.parse(JSON.stringify(this.list[t]));c.id=this.$u.guid(),this.flowList.push(c)}},remove:function(i){this.$refs.uWaterfall.remove(i)},clear:function(){this.$refs.uWaterfall.clear()}}};t.default=e},c7c9:function(i,t,c){},d70a:function(i,t,c){"use strict";c.r(t);var e=c("ae64"),n=c.n(e);for(var o in e)"default"!==o&&function(i){c.d(t,i,(function(){return e[i]}))}(o);t["default"]=n.a},d72d:function(i,t,c){}},[["1277","common/runtime","common/vendor"]]]);