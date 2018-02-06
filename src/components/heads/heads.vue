<template>
  <div class="head">
     <!-- 内容区块 -->
     <div class="content_wrapper">
        <div class="avator">
           <img width="64" height="64" :src="seller.avatar" alt="">
        </div>
        <div class="content">
          <div class="title">
            <span class="brandsIcon"></span>
            <span class="titleName">{{seller.name}}</span>
          </div>
          <div class="descript">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div class="reduction" v-if="seller.supports">
            <span class="reductionIcon" :class="supportsClass[seller.supports[0].type]"></span>
            <span class="reductionText">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <!-- 支持的满减规则 -->
        <div class="supportsbut" v-if="seller.supports" @click="fcShowfn">
          <span>{{seller.supports.length}}个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
     </div>
     <!-- 公告区块 -->
     <div class="announcement"  @click="fcShowfn">
       <div class="announcement_icon"></div>
       <div class="announcement_text">{{seller.bulletin}}</div>
       <div class="icon-keyboard_arrow_right"></div>
     </div>
     <!-- 背景图片 -->
     <div class="background">
       <img :src="seller.avatar" alt="" width="100%" height="100%">
     </div>
     <!-- 浮层 -->
     <transition name="fade">
     <div class="fc" v-show="fcShow">
       <div class="fcContenWrapper clearfix">
         <div class="fcContenMain">
            <h1>{{seller.name}}</h1>
            <div class="starWrapper">
              <star  :size="36" :score="seller.score"></star>
            </div>
            <!-- 优惠信息 -->
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supportsContent">
              <li v-for="item in seller.supports">
                <span class="support_item" :class="supportsClass[item.type]"></span>
                <span class="support_text">{{item.description}}</span>
              </li>
            </ul>
            <!-- 商家公告 -->
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <!-- bulletin -->
            <div class="bulletinWrapper">
              <p >{{seller.bulletin}}</p>
            </div>
         </div>
       </div>
       <div class="fcClose">
         <i class="icon-close" @click="fchidefn"></i>
       </div>
     </div>
     </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from "@/base/star/star"  
export default {
    props:{
      seller:{
        type:Object,
        default:{}
      }
    },
    data(){
      return {
          supportsClass:["decrease_1","discount_1","guarantee_1","invoice_1","special_1"],
          fcShow:false
      }
    },
    methods:{
      fcShowfn(){
        this.fcShow=true;
      },
      fchidefn(){
        this.fcShow=false;
      }
    },
    components:{
      "star":star
    }

}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
@import "../../common/stylus/mixin"

   .head
     position:relative
     background:rgba(7,17,27,.5)
     .content_wrapper
       position:relative
       padding:24px 12px 18px 24px
       font-size:0
       .avator
         display:inline-block
         vertical-align:top
         border-radius:2px
         margin-right:16px
       .content
         display:inline-block  
         color:rgb(255,255,255)
         .title
           line-height:18px 
           font-size:16px
           font-weight:bold
           margin-bottom:8px
           .brandsIcon
             width:30px
             height:18px
             display:inline-block 
             backgroundImg("./brand") 
             background-size:30px 18px
             vertical-align:top
         .descript
           font-size:12px
           line-height:12px 
           margin-bottom:10px
         .reduction
           font-size:10px 
           line-height:12px 
           li:line-height:16px
           .reductionIcon
             width:12px
             height:12px
             display:inline-block
             background-size:12px 12px
             vertical-align:top
             &.decrease_1
               backgroundImg("decrease_1") 
             &.discount_1
               backgroundImg("discount_1")
             &.guarantee_1
               backgroundImg("guarantee_1") 
             &.invoice_1  
               backgroundImg("invoice_1")  
             &.special_1
               backgroundImg("special_1")   
        .supportsbut
          position:absolute    
          right:12px
          bottom:15px
          padding:7px 8px
          color:rgb(255,255,255)
          background:rgba(0,0,0,.2)
          font-size:10px
          border-radius:15px;
          line-height:12px
          .icon-keyboard_arrow_right
            display:inline-block
            vertical-align:top
            line-height:12px
// 公告层
.announcement
  position:relative
  height:28px
  line-height:28px
  padding:0 22px 0 12px
  overflow: hidden;
  white-space:nowrap
  text-overflow:ellipsis
  background:rgb(79,84,91,.3)
  color:#fff;
  .announcement_icon
    display:inline-block
    width:23px
    height:12px
    backgroundImg("bulletin")
    background-size:23px 12px
    vertical-align:top
    margin-top:8px
  .announcement_text 
    vertical-align:top
    display:inline-block
    font-size:10px
  .icon-keyboard_arrow_right
   position:absolute
   font-size:12px
   right:0px
   top:9px
// 背景层
.background  
  width:100%
  height:100%
  position:absolute
  left:0
  top:0
  z-index:-1
  filter :blur(10px)
//浮层
.fc
  position:fixed
  left:0
  top:0
  overflow:auto
  width:100%
  height:100%
  z-index:10
  background:rgba(7,17,27,.8)
  backdrop-filter：blur(10px)
  &.fade-transition 
    opacity:1
  &.fade-enter-active, &.fade-leave-active     
    transition: opacity 1s
  &.fade-enter, &.fade-leave-to     
    opacity: 0
  .fcContenWrapper
    min-height:100%;
    width:100%
    .fcContenMain
      margin-top:64px
      padding-bottom:64px
      color:#fff
      h1
        font-size:16px
        line-height:16px
        text-align:center
      .starWrapper  
        padding:16px 0 0px 0
        text-align:center
        .star 
          width:100%
          height:24px  
      .title 
        display:flex
        padding:0 36px
        height:16px
        margin-bottom:24px
        margin-top:28px
        .line
          flex:1
          border-bottom:1px solid #575d65
          position:relative
          top:-8px
        .text
          font-size:16px
          padding:0 12px  
      .supportsContent  
        width:80%
        margin:0 auto
        li
          margin-bottom:12px
          .support_item
            display:inline-block
            width:16px
            height:16px
            background-size:16px 16px
            margin-right:6px
            vertical-align:top
            &.decrease_1
              backgroundImg("decrease_2") 
            &.discount_1
              backgroundImg("discount_2")
            &.guarantee_1
              backgroundImg("guarantee_2") 
            &.invoice_1  
              backgroundImg("invoice_2")  
            &.special_1
              backgroundImg("special_2") 
          .support_text
            display:inline-block
            height:16px
            line-height:16px
            font-size:12px
            color:rgb(255,255,255) 
            font-weight:200
      .bulletinWrapper
        width:80%
        font-weight:200
        color:rgb(255,255,255)
        margin:0 auto
        p 
        line-height:24px
        font-size:14px;
              
  .fcClose
    position:relative
    width:32px
    height:32px
    margin:-64px auto 0 auto
    clear:both
    .icon-close
      font-size:32px
      color:#fff  
       

      





  
     
    
           
             
           
     

















</style>