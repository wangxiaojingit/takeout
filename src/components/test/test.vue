<template>
  <div >
    <button @click="yd">运动</button>
    <transition name="fade" >
        <div v-show="msg" class="test"></div>
        
    </transition>
    
  </div>
  
</template>

<script type="text/ecmascript-6">
export default {
    data(){
      return {
        msg:false
      }
    },
    methods:{
      yd(){
        this.msg=!this.msg
      }
    }
}
</script>

<style >
   .test{width:100px;height:100px;background:green;
     transform:rotate(99deg) translateX(300px)
   
   }
   .fade-enter{opacity:0;transform:rotate(0deg) translateX(0px);}
   .fade-enter-active{transition: all 2s}
</style>