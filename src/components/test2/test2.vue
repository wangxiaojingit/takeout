<template>
<div>
  <transition name="move" 
  @before-enter="before"
  @enter="enter"
  @after-enter="after"
  >
    <div class="box" v-show="start">
     
    </div>
  </transition>
  <button @click="pos">dianji</button>

</div>
</template>

<script type="text/ecmascript-6">
export default {
    data(){
      return {
        start:false
      }
    },
    methods:{
      pos(){
        this.start=!this.start
      },
      before(ele){
        ele.style.opacity = 0
        console.log(ele)
      },
      enter(ele,done){
         console.log(2)
         ele.style.opacity = 1
         console.log(ele);
         done()
      },
      after(ele){
         console.log(3)
        console.log(ele)

      }
    },
}
</script>

<style rel="stylesheet/stylus" lang="stylus" >
   *{margin:0;padding:0}
   .box{width:100px;height:100px;background:green;transition:all 1s}  
    
      
     
      
   
   
   
</style>