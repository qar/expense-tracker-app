(function(t){function e(e){for(var a,r,c=e[0],s=e[1],u=e[2],l=0,p=[];l<c.length;l++)r=c[l],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&p.push(o[r][0]),o[r]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);d&&d(e);while(p.length)p.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,r=1;r<n.length;r++){var c=n[r];0!==o[c]&&(a=!1)}a&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},r={app:0},o={app:0},i=[];function c(t){return s.p+"js/"+({about:"about"}[t]||t)+"."+{about:"a00d6525"}[t]+".js"}function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(t){var e=[],n={about:1};r[t]?e.push(r[t]):0!==r[t]&&n[t]&&e.push(r[t]=new Promise((function(e,n){for(var a="css/"+({about:"about"}[t]||t)+"."+{about:"3a590fe8"}[t]+".css",o=s.p+a,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var u=i[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===a||l===o))return e()}var p=document.getElementsByTagName("style");for(c=0;c<p.length;c++){u=p[c],l=u.getAttribute("data-href");if(l===a||l===o)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var a=e&&e.target&&e.target.src||o,i=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete r[t],d.parentNode.removeChild(d),n(i)},d.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(d)})).then((function(){r[t]=0})));var a=o[t];if(0!==a)if(a)e.push(a[2]);else{var i=new Promise((function(e,n){a=o[t]=[e,n]}));e.push(a[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=c(t);var p=new Error;u=function(e){l.onerror=l.onload=null,clearTimeout(d);var n=o[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;p.message="Loading chunk "+t+" failed.\n("+a+": "+r+")",p.name="ChunkLoadError",p.type=a,p.request=r,n[1](p)}o[t]=void 0}};var d=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(e)},s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/",s.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var p=0;p<u.length;p++)e(u[p]);var d=l;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[n("div",{staticClass:"d-flex align-center"},[n("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),n("h1",{staticClass:"text-h5 font-weight-medium"},[t._v("My Expenses")])],1),n("v-spacer"),n("settings-button",{on:{import:t.openImportDialog}}),n("data-import-dialog",{attrs:{visible:t.importDialogVisible},on:{"update:visible":function(e){t.importDialogVisible=e},import:t.onDataImport}})],1),n("v-navigation-drawer",{attrs:{app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list-item-group",{attrs:{value:t.menu,"active-class":"deep-purple--text text--accent-4"}},t._l(t.menus,(function(e,a){return n("v-list-item",{key:a,attrs:{to:e.path}},[n("v-list-item-title",[t._v(t._s(e.label))])],1)})),1)],1),n("v-main",[n("router-view")],1)],1)},o=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,r=e.attrs;return[n("v-icon",t._g(t._b({},"v-icon",r,!1),a),[t._v("mdi-cog-outline")])]}}])},[n("v-list",[n("v-list-item-group",{model:{value:t.model,callback:function(e){t.model=e},expression:"model"}},t._l(t.items,(function(e,a){return n("v-list-item",{key:a,on:{click:e.clickHandler}},[n("v-list-item-icon",[n("v-icon",{domProps:{textContent:t._s(e.icon)}})],1),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(e.text)}})],1)],1)})),1)],1)],1)},c=[],s={name:"SettingsButton",data:function(){var t=this;return{model:!1,items:[{icon:"mdi-application-import",text:"导入测试账单 CSV 文件",clickHandler:function(){return t.$emit("import")}}]}}},u=s,l=n("2877"),p=n("6544"),d=n.n(p),f=n("132d"),m=n("8860"),v=n("da13"),h=n("5d23"),b=n("1baa"),g=n("34c3"),w=n("e449"),O=Object(l["a"])(u,i,c,!1,null,null,null),j=O.exports;d()(O,{VIcon:f["a"],VList:m["a"],VListItem:v["a"],VListItemContent:h["a"],VListItemGroup:b["a"],VListItemIcon:g["a"],VListItemTitle:h["b"],VMenu:w["a"]});var y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-dialog",{attrs:{value:t.visible,"max-width":"500px"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"text-h5"},[t._v(t._s(t.formTitle))])]),n("v-card-text",[n("v-container",[n("v-file-input",{attrs:{"truncate-length":"15",placeholder:"导入账单"},on:{change:t.onTransactionsFileChange}}),n("v-file-input",{attrs:{"truncate-length":"15",placeholder:"导入分类"},on:{change:t.onCategoriesFileChange}})],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v("取消")]),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.save}},[t._v("确认")])],1)],1)],1)},x=[],k=n("c7eb"),C=n("1da1"),V=(n("d3b7"),n("4d7c")),_=n.n(V),D={name:"DataImportDialog",props:{visible:{type:Boolean,default:!1},item:{type:Object,default:function(){return{}}}},data:function(){return{transactions:[],categories:[],dialog:!1,formTitle:"数据导入",editedItem:{}}},methods:{readFileAsync:function(t){return Object(C["a"])(Object(k["a"])().mark((function e(){return Object(k["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){var a=new FileReader;a.onload=function(t){e(t.target.result)},a.readAsText(t)})));case 1:case"end":return e.stop()}}),e)})))()},onFileChange:function(t){var e=this;return Object(C["a"])(Object(k["a"])().mark((function n(){var a;return Object(k["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.readFileAsync(t);case 2:return a=n.sent,n.next=5,_()().fromString(a);case 5:return n.abrupt("return",n.sent);case 6:case"end":return n.stop()}}),n)})))()},onTransactionsFileChange:function(t){var e=this;return Object(C["a"])(Object(k["a"])().mark((function n(){return Object(k["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.onFileChange(t);case 2:e.transactions=n.sent;case 3:case"end":return n.stop()}}),n)})))()},onCategoriesFileChange:function(t){var e=this;return Object(C["a"])(Object(k["a"])().mark((function n(){return Object(k["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.onFileChange(t);case 2:e.categories=n.sent;case 3:case"end":return n.stop()}}),n)})))()},close:function(){this.transactions=[],this.categories=[],this.$emit("update:visible",!1)},save:function(){this.$emit("update:visible",!1),this.$emit("import",{transactions:this.transactions,categories:this.categories})}}},S=D,I=n("8336"),T=n("b0af"),A=n("99d9"),E=n("a523"),F=n("169a"),L=n("23a7"),P=n("2fa4"),N=Object(l["a"])(S,y,x,!1,null,null,null),$=N.exports;d()(N,{VBtn:I["a"],VCard:T["a"],VCardActions:A["a"],VCardText:A["b"],VCardTitle:A["c"],VContainer:E["a"],VDialog:F["a"],VFileInput:L["a"],VSpacer:P["a"]});var B={name:"App",components:{DataImportDialog:$,SettingsButton:j},data:function(){return{importDialogVisible:!1,drawer:!1,menu:null,menus:[{path:"/",label:"账单"},{path:"/categories",label:"账单分类"},{path:"/stats",label:"统计分析"}]}},created:function(){this.$store.dispatch("transactions/loadData"),this.$store.dispatch("categories/loadData")},methods:{openImportDialog:function(){this.importDialogVisible=!0},onDataImport:function(t){this.$store.dispatch("transactions/setData",t.transactions),this.$store.dispatch("categories/setData",t.categories)}}},M=B,H=n("7496"),J=n("40dc"),q=n("5bc1"),G=n("f6c4"),K=n("f774"),R=Object(l["a"])(M,r,o,!1,null,null,null),U=R.exports;d()(R,{VApp:H["a"],VAppBar:J["a"],VAppBarNavIcon:q["a"],VListItem:v["a"],VListItemGroup:b["a"],VListItemTitle:h["b"],VMain:G["a"],VNavigationDrawer:K["a"],VSpacer:P["a"]});var z=n("9483");Object(z["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});n("3ca3"),n("ddb0");var Q=n("8c4f");a["a"].use(Q["a"]);var W=[{path:"/",name:"Home",component:function(){return n.e("about").then(n.bind(null,"00f0"))}},{path:"/stats",name:"Stats",component:function(){return n.e("about").then(n.bind(null,"e617"))}},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],X=new Q["a"]({routes:W}),Y=X,Z=n("2f62"),tt=n("2909");n("99af"),n("e9c4");function et(t){return"[object Array]"===Object.prototype.toString.call(t)}function nt(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(n){console.log(n)}}function at(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];try{var n=JSON.parse(localStorage.getItem(t));return et(n)?n:e}catch(a){return console.log(a),e}}var rt="transactions",ot={namespaced:!0,state:{transactions:[]},mutations:{setTransactions:function(t,e){t.transactions=e}},actions:{loadData:function(t){return Object(C["a"])(Object(k["a"])().mark((function e(){return Object(k["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.commit("setTransactions",at(rt));case 1:case"end":return e.stop()}}),e)})))()},setData:function(t,e){return Object(C["a"])(Object(k["a"])().mark((function n(){return Object(k["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.commit("setTransactions",e),nt(rt,e);case 2:case"end":return n.stop()}}),n)})))()},addEntry:function(t,e){return Object(C["a"])(Object(k["a"])().mark((function n(){var a;return Object(k["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:a=[].concat(Object(tt["a"])(t.state.transactions),[e]),t.dispatch("setData",a);case 2:case"end":return n.stop()}}),n)})))()}}},it="categories",ct={namespaced:!0,state:{categories:[]},mutations:{setCategories:function(t,e){t.categories=e}},actions:{loadData:function(t){return Object(C["a"])(Object(k["a"])().mark((function e(){return Object(k["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.commit("setCategories",at(it));case 1:case"end":return e.stop()}}),e)})))()},setData:function(t,e){return Object(C["a"])(Object(k["a"])().mark((function n(){return Object(k["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.commit("setCategories",e),nt(it,e);case 2:case"end":return n.stop()}}),n)})))()}}};a["a"].use(Z["a"]);var st=new Z["a"].Store({state:{},mutations:{},actions:{},modules:{categories:ct,transactions:ot}}),ut=n("f309");a["a"].use(ut["a"]);var lt=new ut["a"]({});a["a"].config.productionTip=!1,new a["a"]({router:Y,store:st,vuetify:lt,render:function(t){return t(U)}}).$mount("#app")}});
//# sourceMappingURL=app.05273ba8.js.map