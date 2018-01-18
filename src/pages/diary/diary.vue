<template>
  <div>
    <header class="header">
      <nav class="nav">
        <a class="nav-item" @click="switchNav('1')">前端</a>
        <a class="nav-item" @click="switchNav('2')">生活</a>
        <a class="nav-item" @click="switchNav('3')">其他</a>
      </nav>
      <i class="nav-active" :class="'pos' + navIndex"></i>
    </header>
  </div>
</template>

<script>

export default {
  name: 'diary',
  data () {
    return {
      navIndex: '1'
    }
  },
  methods: {
    switchNav(index) {
      this.navIndex = index;
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/sass/common.scss';
$navItems: 3;

.header {
  position: relative;
  .nav {
    @include flexRow();
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #fff;
    box-shadow: 0 0 15px #333;
    cursor: pointer;
    .nav-item {
      flex: 1;
      display: block;
      text-align: center;
      font-size: 16px;
      &:active {
        background: #ddd;
      }
    }
  }
  .nav-active {
    position: absolute;
    left: 100% / ($navItems * 2);
    bottom: 5px;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    -webkit-transition: all .3s;
    transition: all .3s;
    width: 50px;
    height: 5px;
    background: #333;
    @for $i from 1 through $navItems {
      &.pos#{$i} {
        left: 100% / $navItems * $i - 100% / ($navItems * 2);
      }
    }
  }
}
</style>
