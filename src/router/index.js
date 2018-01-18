import Vue from 'vue';
import Router from 'vue-router';

import FrameMain from '@/components/frame/main';
import FrameLeft from '@/components/frame/left';
import Diary from '@/pages/diary/diary';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/index',
  }, {
    path: '/index',
    name: 'index',
    components: {
      container: FrameMain,
      left: FrameLeft
    },
  }, {
    path: '/diary',
    name: 'diary',
    components: {
      container: Diary,
      left: FrameLeft
    }
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