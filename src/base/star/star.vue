<template>
  <div class="star" >
    <span class="star_item" v-for="item in starClassesdata" :class="item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
const START_LENGTH=5;
const on="on";
const half="half";
const off="off"
export default {
    props:{
      size:{
        type:Number,
        default:36
      },
      score:{
        type:Number,
      }
    },
    created(){
      let starClasses=[];
      let score2=Math.floor(this.score*2)/2;
      let floatScore=score2%1;//小数部分只可能是0 或者0.5(因为上面的计算公式决定了)
      let parseScore=Math.floor(score2)
      //遍历整星
      if(parseScore){
         for(var i=0;i<parseScore;i++){
             starClasses.push("star"+this.size+"_"+on)
         }
      }
      //遍历分星
      if(floatScore!=0){
        for(var i=0;i<floatScore;i++){
          starClasses.push("star"+this.size+"_"+half)
        }
      }
      while(starClasses.length<START_LENGTH){
         starClasses.push("star"+this.size+"_"+off)
      }
      this.starClassesdata=starClasses;
    },
    data(){
      return {
        starClassesdata:[]
      }
    }
}
</script>
                     
<style lang="stylus" rel="stylesheet/stylus" >
   @import "../../common/stylus/mixin.styl";
   .star
     width:100%
     .star_item
       display: inline-block
       background-repeat: no-repeat
       &.star24_half
         width:12px
         height:12px
         backgroundImg("star24_half")
         background-size:100%
         margin-right:3px
       &.star24_on 
         width:12px
         height:12px
         backgroundImg("star24_on")
         background-size:100%
         margin-right:3px
       &.star24_off 
         width:12px
         height:12px
         backgroundImg("star24_off")
         background-size:100%
         margin-right:3px
       &.star36_half
         width:20px
         height:19px
         backgroundImg("star24_half")
         background-size:20px 19px
         margin-right:16px
       &.star36_on 
         width:20px
         height:19px
         backgroundImg("star24_on")
         background-size:20px 19px
         margin-right:16px
       &.star36_off 
         width:20px
         height:19px
         backgroundImg("star24_off")
         background-size:20px 19px  
         margin-right:16px  
       &.star48_half
         width:20px
         height:19px
         backgroundImg("star24_half")
         background-size:20px 19px
         margin-right:20px
       &.star48_on 
         width:20px
         height:19px
         backgroundImg("star24_on")
         background-size:20px 19px
         margin-right:20px
       &.star48_off 
         width:20px
         height:19px
         backgroundImg("star24_off")
         background-size:20px 19px  
         margin-right:20px    
         
</style>