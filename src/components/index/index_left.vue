<template>
  <div id="left">
    <router-link :to="item.linkto" class="item flex-row" :key="item.title" v-for="item in itemInfo">
      <div class="left">{{ item.content }}</div>

      <div class="right">{{ item.title }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'index_left',
  data () {
    return {
      itemInfo: [{
        title: '首页？',
        content: '关于一个半成品',
        linkto: 'index'
      }, {
        title: '我',
        content: '关于我',
        linkto: 'test1'
      }, {
        title: '他',
        content: '关于',
        linkto: 'test2'
      }, {
        title: '备忘录',
        content: '生怕记不住',
        linkto: {
          name: 'diary'
        }
      }]
    }
  }
}
</script>

<style scoped lang="scss">
$item_hide_width: 50px;
$item_show_width: 150px;
$item_height: 50px;
$item_margin: 20px;

.flex-row
{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-item: center;
}
@mixin txtOverHide() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#left
{
  position: fixed;
  top: 50%;
  left: -($item_show_width - $item_hide_width);
  z-index: 9999;
  width: $item_show_width;
  transform: translateY(-50%);
  background-color: rgba(0,0,0,.8);
  .item
  {
    position: relative;
    left: 0;
    width: $item_show_width;
    height: $item_height;
    line-height: $item_height;
    text-align: center;
    color: #333;
    transition: left .2s;
    &:hover
    {
      left: $item_show_width - $item_hide_width;
      transition: left .2s;
    }
    .left
    {
      box-sizing: border-box;
      width: $item_show_width - $item_hide_width;
      height: $item_height;
      padding: 0 10px;
      background-color: #333;
      color: #fff;
      @include txtOverHide();
    }
    .right
    {
      width: $item_hide_width;
      height: $item_height;
      background-color: #ddd;
    }
  }
  .item:not(:first-child)
  {
    margin-top: $item_margin;
  }
}
</style>
