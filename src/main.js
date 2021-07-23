import Vue from 'vue'
import App from './App.vue'
import { Button,icon,tabs,form,input,Checkbox,Layout,Menu,breadcrumb,Switch,table,DatePicker,modal,row,col,radio,upload,message } from "ant-design-vue"; //引入组件，但不用引入样式
import router from './router'
import requests from './request.js'
// import wangeditor from '../node_modules/wangeditor-antd'
Vue.prototype.rq = requests
Vue.prototype.$message = message

import axios from 'axios'
axios.defaults.baseURL='https://www.fastmock.site/mock/cd235ed102c5e41584a4545ced505d98/dev'
axios.interceptors.request.use(config=>{
    console.log(config);
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http=axios

Vue.use(modal)
Vue.use(Button)
Vue.use(icon)
Vue.use(tabs)
Vue.use(form)
Vue.use(input)
Vue.use(Checkbox)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(breadcrumb)
Vue.use(Switch)
Vue.use(table)
Vue.use(DatePicker)
Vue.use(row)
Vue.use(col)
Vue.use(radio)
Vue.use(upload)

Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
