import Vue from 'vue'
import App from './App.vue'
import requests from './requests'  //Запросы

Vue.config.productionTip = false
Vue.use(requests)

new Vue({
  render: h => h(App),
}).$mount('#app')
