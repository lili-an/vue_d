// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import VueMTouch from 'vue-m-touch'
import 'mint-ui/lib/style.css';
import axios from 'axios'
import { MiniRefreshTools } from 'minirefresh';
import 'minirefresh/dist/minirefresh.min.css'
// import 'minirefresh/dist/themes/drawer3d/minirefresh.theme.drawer3d.min.css'
// import 'minirefresh/dist/themes/drawer3d/minirefresh.theme.drawer3d.min.js';

Vue.use(Mint);
Vue.use(VueMTouch);

Vue.config.productionTip = false
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
