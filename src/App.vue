<template>
  <div class="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
       <div class="tab_item">
         <router-link to="/seller">商家</router-link>
       </div>
       <div class="tab_item">
         <router-link to="/goods">商品</router-link>
       </div>
       <div class="tab_item">
         <router-link to="/ratings">评论</router-link>
       </div>
    </div>
    <keep-alive>
       <router-view :seller="seller"></router-view>
    </keep-alive>
   
    
   
  </div>
</template>

<script type="text/ecmascript-6">
import heads from "@/components/heads/heads"
import axios from 'axios'
import * as dom from "@/common/js/dom"
import {urlParse} from "@/common/js/utils"
//const ERRNO=0
export default {
      data(){
        return{
          seller:{
            
          },
        }
      },
      created(){
        this.$http.get("/api/seller").then(res => {
           let data=res.body;
           if(data.errno==dom.ERRNO){
             // console.log(data)
              this.seller=data.data;
             
           }
        })
       
        
      },
      components:{
        "v-header":heads
      }
}
</script>

<style scoped lang="stylus"  rel="stylesheet/stylus">
@import "./common/stylus/mixin"
   .app
      .tab
        display:flex
        height:40px
        line-height:40px
        width:100%
        background:#fff
        border-1px(rgba(7,17,27,.1))
        .tab_item
          flex:1
          text-align:center
          &>a
            display:block
            font-size:14px
            color:rgb(77,85,93)
            &.active
               color:rgb(240,20,20)
             
</style>
