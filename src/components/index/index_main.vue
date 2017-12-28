<template>
  <div class="content">
    <header class="title">一个毫无意义的demo</header>
    <div class="ma-grid" id="grid">
      <div class="grid-item" :class="'grid-item' + item" v-for="item in itemTotal">{{ item }}</div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'hello',
  data() {
    return {
      itemTotal: 24,
      outer: null,
      beforePos: {
        top: 0,
        left: 0
      },
      afterPos: {
        top: 0,
        left: 0
      },
      itemSize: {
        width: 0,
        height: 0
      },
      clickItemIndex: -1,
      coveredItemIndex: -1,
      clickItem: null,
      itemsPos: [], // 每个对象数据结构为element,top,left
      isMove: true
    }
  },
  mounted() {
    this.outer = document.querySelector('.ma-grid');
    // 使node节点伪数组能使用数组的方法
    let items = Array.prototype.slice.call(document.querySelectorAll('.content .ma-grid .grid-item'));
    items.forEach((value, index) => {
      this.itemsPos.push({
        element: value,
        top: Math.round(this.getStyle(value, 'top')),
        left: Math.round(this.getStyle(value, 'left'))
      })
    });
    //获取元素宽高
    this.itemSize.width = parseInt(this.getStyle(items[0], 'width'));
    this.itemSize.height = parseInt(this.getStyle(items[0], 'height'));

    this.outer.addEventListener('mousedown', evt => {
      evt.preventDefault();
      evt.stopPropagation();
      let target = evt.target || evt.srcElement;
      if (target.classList.contains('grid-item') && this.isMove) {
        this.clickItem = target;
        this.clickItemIndex = this.getItemIndex(this.clickItem);
        // 获取拖动之前元素的位置
        this.beforePos.top = this.itemsPos[this.clickItemIndex].top;
        this.beforePos.left = this.itemsPos[this.clickItemIndex].left;
        this.clickItem.classList.add('move');
        this.outer.addEventListener('mousemove', this.itemMoveHandle, false);
      }
    }, false);
  },
  methods: {
    // 拖动元素处理
    itemMoveHandle(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      if(this.isMove) {
        let {
          mouseX,
          mouseY
        } = this.getMousePos(evt);
        this.clickItem.style.left = mouseX - this.clickItem.offsetWidth / 2 + 'px';
        this.clickItem.style.top = mouseY - this.clickItem.offsetHeight / 2 + 'px';
        this.outer.addEventListener('mouseup', this.outerMouseUp, false);
      }
    },
    // 松开鼠标处理
    outerMouseUp(evt) {
      const that = this;
      evt.preventDefault();
      evt.stopPropagation();
      if(this.isMove) {
        this.isMove = false;
        this.outer.removeEventListener('mouseup', this.outerMouseUp);
        let target = evt.target || evt.srcElement;
        if (target.classList.contains('grid-item')) {
          // 取消监听
          this.outer.removeEventListener('mousemove', this.itemMoveHandle);
          // 获取拖动之后元素的位置
          this.afterPos.top = Math.round(this.getStyle(this.clickItem, 'top'));
          this.afterPos.left = Math.round(this.getStyle(this.clickItem, 'left'));
          // 获取拖动元素对应的元素的位置
          let coveredItem = this.getCoveredItem();
          if (coveredItem) {
            this.coveredItemIndex = this.getItemIndex(coveredItem);
            coveredItem.classList.add('covered');
            let coveredItemPos = {
              top: Math.round(this.getStyle(coveredItem, 'top')),
              left: Math.round(this.getStyle(coveredItem, 'left'))
            }
            $(this.clickItem).animate({
              top: coveredItemPos.top,
              left: coveredItemPos.left
            }, {
              complete: function() {
                that.clickItem.classList.remove('move');
                that.itemsPos[that.clickItemIndex].top = coveredItemPos.top;
                that.itemsPos[that.clickItemIndex].left = coveredItemPos.left;
                that.isMove = true;
              }
            });
            $(coveredItem).animate({
              top: that.beforePos.top,
              left: that.beforePos.left
            }, {
              complete: function() {
                coveredItem.classList.remove('covered');
                that.itemsPos[that.coveredItemIndex].top = that.beforePos.top;
                that.itemsPos[that.coveredItemIndex].left = that.beforePos.left;
              }
            });
          } else {
            $(this.clickItem).animate({
              top: that.itemsPos[that.clickItemIndex].top,
              left: that.itemsPos[that.clickItemIndex].left
            }, {
              complete: function() {
                that.clickItem.classList.remove('move');
                that.isMove = true;
              }
            });
          }
        }
      }
    },
    getMousePos(evt) {
      return {
        mouseX: Math.round(evt.clientX - this.outer.getBoundingClientRect().left),
        mouseY: Math.round(evt.clientY - this.outer.getBoundingClientRect().top)
      }
    },
    getStyle(obj, style, attr) {
      // attr -> 伪类
      return getComputedStyle(obj, attr)[style].replace(/px/ig, '');
    },
    getCoveredItem() {
      const that = this;
      // 获取被点击元素覆盖的元素的下标
      let thisArea = 0,
        maxArea = 0, // 最大相交面积
        maxIndex = -1, // 与点击元素有最大相交面积的元素的下标
        intersectDirection = 0, // 相交位置，相对于点击元素的方向，以象限位置标注
        clickWidth = that.itemSize.width,
        clickHeight = that.itemSize.height,
        clickCenterX = that.afterPos.left + that.itemSize.width / 2,
        clickCenterY = that.afterPos.top + that.itemSize.height / 2;
      this.itemsPos.forEach(function(value, index) {
        // 判断是否相交
        let thisWidth = that.itemSize.width,
          thisHeight = that.itemSize.height,
          thisCenterX = value.left + that.itemSize.width / 2,
          thisCenterY = value.top + that.itemSize.height / 2;

        //如果相交
        if(Math.abs(clickCenterX - thisCenterX) < thisWidth / 2 + clickWidth / 2 && Math.abs(clickCenterY - thisCenterY) < thisHeight / 2 + clickHeight / 2) {
          // 相交
          // 判断相交区域
          if(clickCenterX > thisCenterX && clickCenterY > thisCenterY) {
            intersectDirection = 2;
          } else if(clickCenterX < thisCenterX && clickCenterY < thisCenterY) {
            intersectDirection = 4;
          } else if(clickCenterX > thisCenterX && clickCenterY < thisCenterY) {
            intersectDirection = 3;
          } else if(clickCenterX < thisCenterX && clickCenterY > thisCenterY) {
            intersectDirection = 1;
          }
          if(intersectDirection === 2 || intersectDirection === 4) {
            let resultPosLeftTop = value.left > that.afterPos.left ? {
              left: value.left,
              top: value.top
            } : {
              left: that.afterPos.left,
              top: that.afterPos.top
            };
            let resultPosRightBottom = value.left > that.afterPos.left ? {
              left: that.afterPos.left + that.itemSize.width,
              top: that.afterPos.top + that.itemSize.width
            } : {
              left: value.left + that.itemSize.width,
              top: value.top + that.itemSize.height
            };
            thisArea = Math.abs(resultPosLeftTop.left - resultPosRightBottom.left) * Math.abs(resultPosLeftTop.top - resultPosRightBottom.top);
          } else if(intersectDirection === 1 || intersectDirection === 3) {
            let resultPosRightTop = value.left < that.afterPos.left ? {
              left: value.left + that.itemSize.width,
              top: value.top
            } : {
              left: that.afterPos.left + that.itemSize.width,
              top: that.afterPos.top
            };
            let resultPosLeftBottom = value.left < that.afterPos.left ? {
              left: that.afterPos.left,
              top: that.afterPos.top + that.itemSize.height
            } : {
              left: value.left,
              top: value.top + that.itemSize.height
            };
            thisArea = Math.abs(resultPosRightTop.left - resultPosLeftBottom.left) * Math.abs(resultPosRightTop.top - resultPosLeftBottom.top);
          }
          if(thisArea >= maxArea) {
            maxArea = thisArea;
            maxIndex = index;
          }
        }
      });
      if(maxIndex === -1) {
        return null;
      }
      return this.itemsPos[maxIndex].element;
    },
    getItemIndex(item) {
      return parseInt(item.className.split(' ')[1].match(/[0-9]+/)[0]) - 1;
    }
  }
}
</script>

<style scoped lang="scss">
$grid_width: 900px;
$grid_height: 600px;
$grid_row: 6;
$grid_column: 4;
$item_width: 150px;
$item_height: 150px;

.content
{
  box-sizing: border-box;
  max-width: 1200px;
  min-height: 100%;
  margin: 0 auto;
  .title
  {
    padding: 50px 0;
    color: #fff;
    text-align: center;
  }
  .ma-grid
  {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: $grid_width;
    height: $grid_height;
    margin: 0 auto;
    background-color: #fff;
    .grid-item
    {
      position: absolute;
      box-sizing: border-box;
      width: $item_width;
      height: $item_height;
      line-height: $item_height;
      border: 1px solid #000;
      background-color: #ddd;
      text-align: center;
      transition: background-color .2s;
    }
    .grid-item.move
    {
      background-color: #ff7171;
      z-index: 1;
      transition: background-color .2s;
    }
    .grid-item.covered
    {
      background-color: #56a8ff;
      z-index: 1;
      transition: background-color .2s;
    }
  }
  padding: 50px 0;
  overflow: hidden;
}

//拖动元素定位
$count: 0;
@for $i from 1 to ($grid_row * $grid_column + 1)
{
  .grid-item#{$i}
  {
    top: $count * $item_height;
    left: ($i - 1 - $count * $grid_row) * $item_width;

    @if $i % $grid_row == 0 {
      $count: $count + 1;
    }
  }
}
</style>
