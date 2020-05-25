import Vue from 'vue'
import App from './App.vue'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import './assets/css/main.css'
import router from './router'
import { store } from '../store'

Vue.use(VueGoodTablePlugin);

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
