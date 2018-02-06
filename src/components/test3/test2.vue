<template>
  <div>
    
     <button @click="add" >add</button>
     <div class="box" :class="{'start':show}"></div>
    
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    data(){
      return {
        show:false
      }
    },
    methods:{
      add(){
        this.show=true
      }
      
    },
    computed:{
      start(){
        return "start"
      }
    }
}
</script>

<style >
   .box{width:100px;height:100px;background:green;transition:all 1s}
   .start{transform:translate3d(100px,0,0)}
   /* .fade-enter-active{
     transition: all 1s linear
   }
   .fade-leave-active{
     transition: all 1s linear
   }
   .fade-enter,{
     opacity:0;
     transform:translate3d(0px,0,0);
   }
   .fade-enter-to,.fade-leave-to{
     transform:translate3d(100px,0,0);
     opacity:1
   }
  */
   
   
   
</style>