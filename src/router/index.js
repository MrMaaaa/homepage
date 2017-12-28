import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index';
import IndexMain from '@/components/index/index_main';
import Diary from '@/components/self_diary/diary';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/index',
  }, {
    path: '/index',
    name: 'index',
    component: Index,
  }, {
    path: '/diary',
    name: 'diary',
    component: Diary
  }],
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
});