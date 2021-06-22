import Vue from 'vue'
import store from './store'
import router from './router'
import Cookies from 'js-cookie'
import App from './App'
import * as filters from './filters' //全局筛选器
import './assets/images/icons'
import Element from 'element-ui'
import './assets/styles/index.scss'

import './mock/index'

Vue.use(Element, {
    size: Cookies.get('size') || 'medium'
})
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})