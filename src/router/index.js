import Vue from 'vue'
import Router from 'vue-router'

import operator_pro from '@/views/operator_pro'
import ecommerce from '@/views/ecommerce'
import wechat from '@/views/wechat'
import jd from '@/views/jd'
import record from '@/views/record'

import Vuex from 'vuex'

Vue.use(Router)
Vue.use(Vuex)


export default new Router({
  routes: [{
      path: '/',
      name: '默认页',
      component: app
    },
    {
      path: '/operator_pro',
      name: '运营商',
      component: operator_pro
    },
    {
      path: '/wechat',
      name: '微信',
      component: wechat
    },
    {
      path: '/ecommerce',
      name: '电商',
      component: ecommerce
    },
    {
      path: '/jd',
      name: '京东',
      component: jd
    },
    {
      path: '/record',
      name: '淘宝交易记录',
      component: record,
    }
  ]
})
