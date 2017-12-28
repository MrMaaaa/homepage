<template>
  <div id="app">
    <plug-index-left></plug-index-left>
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
import plugIndexLeft from '@/components/index/index_left';

export default {
  name: 'app',
  created() {
    window.onresize = function() {
      document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px';
    }
    document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px';
  },
  components: {
    plugIndexLeft,
  }
}
</script>

<style>
blockquote, body, button, dd, dl, dt, fieldset, legend, form, h1, h2, h3, h4, h5, h6, ul, ol, li, p, pre, td, th, textarea {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a, button {
  outline: none;
  text-decoration: none;
}
#app,
.router-view {
  position: relative;
  height: 100%;
}
</style>
