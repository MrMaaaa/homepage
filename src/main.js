// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import Alert from './components/common/alert';
import Loading from './components/common/loading';
import Dialog from './components/common/dialog';

Vue.config.productionTip = false;

Vue.prototype.$alert = Alert;
Vue.prototype.$loading = Loading;
Vue.prototype.$dialog = Dialog;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
