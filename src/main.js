import Vue from 'vue'
import App from './App.vue'
import { Button } from "ant-design-vue"; //引入组件，但不用引入样式

Vue.component(Button.name, Button);
Vue.config.productionTip = false;



new Vue({
  render: h => h(App),
}).$mount('#app')
