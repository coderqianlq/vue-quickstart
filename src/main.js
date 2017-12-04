// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './vuex/store'

import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Vuex)
Vue.use(Element)

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.filter('json', function(value) {
    //$("#json").JSONView(value);
    //return JSON.stringify(value,null,"\n");
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
