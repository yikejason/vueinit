import Vue from 'vue'
import App from './App.vue'
import { Button,icon,tabs,form,input,Checkbox,Layout,Menu,breadcrumb,Switch,table,DatePicker,modal,row,col,radio,upload } from "ant-design-vue"; //引入组件，但不用引入样式
import router from './router'
// import E from 'wangeditor-antd'

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
// Vue.use(E)
Vue.config.productionTip = false;



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
