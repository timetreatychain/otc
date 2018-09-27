// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueI18n from 'vue-i18n'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard)
 
Vue.use(VueI18n)
Vue.use(ElementUI,{enLocale});

const i18n = new VueI18n({
	locale:localStorage.otc_lang || 'zh',
	messages:{
	    "zh":require("./assets/zh.js"),
	    "en":require("./assets/en.js")
	}
})

Vue.config.productionTip = false
window.eventBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
