import Vue from 'vue'
import VueRouter from 'vue-router';

import Home from './views/home'
import FundsDetail from './views/fundsDetail'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home'
        },
        {
            path: '/fundsDetail/:fundCode',
            component: FundsDetail,
            name: 'fundsDetail'
        }
    ]
})