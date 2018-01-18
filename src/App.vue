<template>
  <div class="router-view">
    <!-- <router-view class="router-view-header" name="header"></router-view> -->
    <router-view class="router-view-container" name="container"></router-view>
    <router-view class="router-view-left" name="left"></router-view>
    <!-- <router-view class="router-view-footer" name="footer"></router-view> -->
  </div>
</template>

<script>

export default {
  name: 'app',
  created() {
    window.onresize = function() {
      document.getElementsByTagName('body')[0].style.height =
        window.innerHeight + 'px';
    };
    document.getElementsByTagName('body')[0].style.height =
      window.innerHeight + 'px';
  }
};
</script>

<style lang="scss">
html,body {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

.router-view,
.router-view-container {
  position: relative;
  height: 100%;
}
</style>
