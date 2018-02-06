<template>
  <div class="selectratingWrapper">
    <div class="tab  border-1px">
      <span class="tab-item all" @click="selectTypefn(1)" :class="{'select':selectType==1}">
       <span> {{tabbar.first}}</span><span class='count'>{{ratings.length}}</span>
      </span>
      <span class="tab-item tuijian" @click="selectTypefn(2)"  :class="{'select':selectType==2}">
        <span>{{tabbar.second}}</span><span class='count'>{{recommenddata.length}}</span>
      </span>
      <span class="tab-item tucao" @click="selectTypefn(3)" :class="{'select':selectType==3}">
        <span>{{tabbar.three}}</span><span class='count'>{{norecommenddata.length}}</span>
      </span>
    </div>
    <div class="contentchoose" @click="changeonlyHasfn" :class="{'on':onlyHas}">
        <span  class="icon icon-check_circle onlyHas" ></span>
        <span class="icon_text">只看有内容的评价</span>
    </div> 
  </div>
</template>

<script type="text/ecmascript-6">
let All=1
let TUIJIAN=2
let TUCAO=3
export default {
    props:{
      ratings:{
        type:Array,
        default(){
          return []
        }
      },
      tabbar:{
        type:Object,
        default(){
          return {
            "first":"全部",
            "second":"推荐",
            "three":"吐槽",
          }
        }
      },
      selectType:{
        type:Number,
        default:All
      },
      onlyHas:{
         type:Boolean,
         default:true
      }
    },  
    data(){
      return {
        msg:"seller"
      }
    },
    methods:{
      selectTypefn(type){
         this.$emit("selectTypeChange",type)
      },
      changeonlyHasfn(){
         this.$emit("changehasonlyfn")
      }
    },
    computed:{
      recommenddata(){
        //推荐
       return this.ratings.filter((item)=>{
         return item.rateType==0
          
        })
      },
      norecommenddata(){
        //不推荐
         return this.ratings.filter((item)=>{
            return item.rateType==1
          
        })
      }
    }
}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
   @import "../../common/stylus/mixin";
   .selectratingWrapper{
     .tab{
       padding:18px 0;
       margin:0 18px;
       border-1px(rgba(7,17,27,.1))
       .tab-item{
         display:inline-block;
         padding:8px 12px;
         margin-right:8px;
         font-size:14px;
         &.all,&.tuijian{
           background:rgba(0,160,220,.2)
         }
         &.tucao{
           background:rgba(77,85,93,.2)
         } 
         &.select{
            color:#fff
           &.all,&.tuijian{
             background:rgba(0,160,220,1);
           }
           &.tucao{
           background:rgba(77,85,93,1)
         } 
         }
       }
     }
     .contentchoose{
       padding:12px 18px
       border-bottom:1px solid rgba(7,17,27,.1);
       font-size:0px;
       &.on{
         .icon-check_circle{
           color:green;
         }
       }
       .icon-check_circle{
         font-size:24px;
         vertical-align :top;
         margin-right:8px;
         color:rgb(147,153,159)
       }
       .icon_text{
         font-size:12px;
         vertical-align:top;
         line-height:24px;
         color:rgb(147,153,159)
       }
      }
   }

     
  
</style>