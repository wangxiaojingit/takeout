<template>
  <div class="iconWrapper">
    <span class="icon_box" :class="mapIconClass[index]"></span>
  </div>
</template>

<script type="text/ecmascript-6">
import * as dom from "@/common/js/dom"

export default {
    props:{
      mapIconClass:{
          type:Array
      },
      index:{
          type:Number
      }
    },
    
    
}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
.iconWrapper
  width:100%
  height:100%
  font-size:0
  .icon_box
    width:100%
    height:100%
    display:inline-block
    vertical-align:top
          &.decrease_1
            backgroundImg("decrease_3") 
          &.discount_1
            backgroundImg("discount_3")
          &.guarantee_1
            backgroundImg("guarantee_3") 
          &.invoice_1  
            backgroundImg("invoice_3")  
          &.special_1
            backgroundImg("special_3")   