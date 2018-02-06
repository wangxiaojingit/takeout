<template>
  <div class="countWrapper">
    <span class="countIcon"
     :class="iconsizeClass"><i :class="icontypeClass"></i></span>
  </div>
</template>

<script type="text/ecmascript-6">
let size="iconsize_";
let type="icontype_"

export default {
  props:{
    iconType:{
      type:Number,
      default:0
    },
    size:{
      type:Number,
      default:4
    }
  },
  computed:{
    iconsizeClass(){
     
      let class2='size'+this.size
      return class2
     
    },
    icontypeClass(){
     let class1='type'+this.iconType;
     return class1
    }
  },
    data(){
      return {
        msg:"seller"
      }
    }
}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
@import "../../common/stylus/mixin";

  .countWrapper{
    .countIcon{
      width:16px;
      height:16px;
      display:inline-block;
      i{
        width:100%;
        height:100%;
        display:inline-block;
        background-size:100%
      }
      &.size1{
        .type0{
          backgroundImg('decrease_1')
        }
        .type1{
            backgroundImg('./discount_1')
          }
        .type2{
            backgroundImg('./special_1')
          }
        .type3{
            backgroundImg('./invoice_1')
          }
        .type4{
            backgroundImg('./guarantee_1')
          }

      }
      &.size2{
        .type0{
          backgroundImg('./decrease_2')
        }
        .type1{
            backgroundImg('./discount_2')
          }
        .type2{
            backgroundImg('./special_2')
          }
        .type3{
            backgroundImg('./invoice_2')
          }
        .type4{
            backgroundImg('./guarantee_2')
          }

      }
      &.size3{
        .type0{
          backgroundImg('./decrease_3')
        }
        .type1{
            backgroundImg('./discount_3')
          }
        .type2{
            backgroundImg('./special_3')
          }
        .type3{
            backgroundImg('./invoice_3')
          }
        .type4{
            backgroundImg('./guarantee_3')
          }

      }
      &.size4{
        .type0{
          backgroundImg('./decrease_4')
        }
        .type1{
            backgroundImg('./discount_4')
          }
        .type2{
            backgroundImg('./special_4')
          }
        .type3{
            backgroundImg('./invoice_4')
          }
        .type4{
            backgroundImg('./guarantee_4')
          }

      }
      
    }
  }
</style>