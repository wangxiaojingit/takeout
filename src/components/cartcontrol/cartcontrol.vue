<template>
  <div class="cartcontrolWrapper">
    <transition name="fade"  >
       <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decrease">
            <span class="icon-remove_circle_outline inner"></span>
       </div>
        </transition> 
     <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
     <div class="cart-add icon-add_circle" @click.stop.prevent="addcart($event)"></div>
  </div>
</template>

<script type="text/ecmascript6">
import Vue from "vue";
export default {
   props:{
     food:{
       type:Object,
       default(){
         return {}
       }
       
     }
   }, 
    computed:{
     
    },
    data(){
      return {
        msg:""
      }
    },
    methods:{
      addcart(e){
         if(!this.food.count){
          Vue.set(this.food,"count",1)
         }else{
           this.food.count++
         }
         this.$emit("foodadd",e.target)
      },
      decrease(){
        if(this.food.count>0){
            this.food.count--
        }
      }
    }
    
   
     
}

</script>

<style rel="stylesheet/stylus" lang="stylus" >
   .cartcontrolWrapper{
     font-size:0
     height: 24px;
     
     &>div{
       display:inline-block
       line-height:24px
     }
     .cart-decrease{
       display:inline-block;
       vertical-align: top;
       font-size:24px;
       color:rgb(0,160,220);
       opacity:1;
       transform:translate3d(0,0,0)
       .inner{
        display:inline-block;
        transform:rotate(0);
        transition:all .5s
       }
       &.fade-enter,&.fade-leave-to{
         opacity:0;
         transform:translate3d(24px,0,0);
         .inner{
            transform:rotate(180deg);
         }
       }
       &.fade-enter-active,&.fade-leave-active{
         transition:all .5s
       }
     }

     .cart-count{
       font-size:10px;
       color:rgb(147,153,159);
       width:30px;
       text-align:center;
       height:24px
       vertical-align:top
     }
     .icon-add_circle{
       font-size:24px;
        color:rgb(0,160,220)
        vertical-align:top
     }
   }



</style>