<template>
 <div class="ratingsWrapper" ref="ratingsWrapper" >
  <div class="ratingsContent">
    <!--综合评分开始 -->
    <div class="comprehensiveWrapper">
      <div class="left borderR1">
        <p class="score">{{seller.score}}</p>
        <p class="title">综合评分</p>
        <p class="beyondScore">高于周边商家{{seller.rankRate}}</p>

      </div>
      <div class="right">
        <div class="right_item">
          <span class="item_title">服务态度</span>
          <span class="item_starScore">
            <star :size="24" :score="seller.serviceScore"></star>
          </span>
          <span class="item_score">{{seller.serviceScore}}</span>
        </div>
        <div class="right_item">
          <span class="item_title">商品评分</span>
          <span class="item_starScore">
             <star :size="24" :score="seller.foodScore"></star>
          </span>
          <span class="item_score">{{seller.foodScore}}</span>
        </div>
        <div class="right_item">
          <span class="item_title">送达时间</span>
          <span class="item_time">{{seller.deliveryTime}}分</span>
         
        </div>
      </div>
    </div>
    <!--综合评分结束 -->
    <split></split>
<!-- 评论choose -->
  <div class="ratings">
    <selectratings
     @selectTypeChange="selectTypeChange" 
     :selectType="selectType" 
     :onlyHas="onlyHas" 
     :tabbar="tabbar"
     :ratings="ratings"
     @changehasonlyfn="changehasonlyfn"

     ></selectratings>
  </div>
<!-- 评论choose -->
<!-- 评论板块 -->
    <div class="ratingquare">
      <ul class="ratingquarelists">
        <li v-show="listhow(item.rateType,item.text)" class="ratingquarelists_item" v-for="item in ratings">
             <div class="left">
               <img :src="item.avatar" alt="">
             </div>
             <div class="right">
               <div class="userName">{{item.username}}</div>
               <div class="ratingMessage">
                 <span class="ratingScore"><star :size="24" :score="item.score"></star></span>
                 <span class="sendTime">{{item.deliveryTime}}分钟送达</span>
               </div>
               <p class="rating_text">{{item.text}}</p>
               <div class="recommend">
                 <span class="icon" :class="{'icon-thumb_up':item.rateType==0,'icon-thumb_down':item.rateType==1}"></span>
                 <div class="recommendlists" >
                   <span class="recommend_item" v-for="recommend in item.recommend">{{recommend}}</span>
                 </div>
               </div>
             </div>         
        </li>
      </ul>
    </div>
<!-- 评论板块 -->    
  </div>

 </div>
 
</template>

<script type="text/ecmascript-6">

import selectratings from "@/components/selectratings/selectratings.vue"
import split from "@/components/split/split"
import star from "@/base/star/star"  
import BScroll from 'better-scroll'
export default {
    props:{
       seller:{
         type:Object,
         default(){
           return {}
         }
       }
    },
    data(){
      return {
        ratings:[],
        selectType:1,
        onlyHas:true,
        tabbar:{
          "first":"全部",
          "second":"满意",
          "three":"不满意",
        }
      }
    },
    components:{
      "selectratings":selectratings,
      "star":star,
      "split":split
    },
    methods:{
      selectTypeChange(type){
        this.selectType=type
      },
      changehasonlyfn(){
         this.onlyHas=!this.onlyHas
      },
      listhow(rateType,text){
        if(!this.onlyHas){
              if(this.selectType==1){
                return true
              }else if(this.selectType==2){
                  //说明是推荐
                  if(rateType==0){
                    return true
                  }else{
                    false
                  }
              }else if(this.selectType==3){
                //说明是吐槽
                  if(rateType==1){
                    return true
                  }else{
                    false
                  }
              }

        }else{
          //只看有内容的
          if(text){
              if(this.selectType==1){
                return true
              }else if(this.selectType==2){
                  //说明是推荐
                  if(rateType==0){
                    return true
                  }else{
                    false
                  }
              }else if(this.selectType==3){
                //说明是吐槽
                  if(rateType==1){
                    return true
                  }else{
                    false
                  }
              }
          }else{
            return false
          }

        }
        
       
      }
    },
    created(){
      this.$http.get("/api/ratings").then((res)=>{
          this.ratings=res.body.data;
          this.$nextTick(()=>{
            this.bscroll=new BScroll(this.$refs.ratingsWrapper,{
              click:true
            })
            
          })
      })
    }
}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";

   .ratingsWrapper{
     position:absolute;
     left:0px;
     top:174px;
     right:0px;
     bottom:0px;
     overflow:hidden;
     .ratingsContent{
       .comprehensiveWrapper{
         padding:18px 0;
         display:flex;
         .left{
           width:135px;
           flex:0 0 135px;
           @media screen and (max-width:320px){
             width:110px;
           flex:0 0 110px;
           }
           borderR1(rgba(7,17,27,.1),70px)
           p{text-align:center;}
           .score{
             font-size:24px;
             color:rgb(255,153,0);
             line-height:28px;
             margin-bottom:6px;
           }
           .title{
             font-size:12px;
             color:rgb(7,17,27);
             line-height:12px;
             margin-bottom:8px;
           }  
           .beyondScore{
             font-size:10px;
             color:rgb(7,17,27,.2);
             line-height:10px;
             padding-bottom:6px;
           }

         }
         .right{
           flex:1
           padding:0 20px;
           @media only screen and (max-width:320px){
             padding:0 8px
           }
           .right_item{
            margin-bottom:8px;
            font-size:0px;
            .item_title{
              font-size:12px;
              color:rgb(7,17,27);
              margin-right:6px;
              display:inline-block;
              vertical-align :top;
              line-height:20px;
            }
            .item_starScore{
              display:inline-block;
              vertical-align :top;

            }
            .item_score{
               display:inline-block;
               line-height :20px;
               font-size:10px;
               color:rgb(255,153,0);
               margin-left:2px;
            }
            .item_time{
               font-size:10px;
               line-height:20px;
               color:rgb(147,153,159)
            }
           }
           

         }
       }
       
     }
     .ratingquare{
       .ratingquarelists{
         .ratingquarelists_item{
           padding:18px 0;
           margin:0 18px;
           border-1px(rgba(7,17,27,.1));
           display:flex;
           .left{
             flex:0 0 28px;
             width:28px;
             height:28px;
             border-radius:50%;
             overflow:hidden;
             margin-right:12px;
             img{
               width:100%;
               margin-right:12px
             }
           }
           .right{
             flex:1;
             .userName:{
               font-size:10px;
               line-height:14px;
               margin-bottom:4px;
             }
             .ratingMessage{
               margin-bottom:6px;
               .ratingScore{
                 display:inline-block;
               }
               .sendTime{
                 display:inline-block;
                 font-size:10px;
                 line-height:12px;
                 color:rgb(147,153,159)
               }
             }
             .rating_text{
               margin-bottom:8px;
               font-size:12px;
               line-height:18px;
             }
             .recommend{
               font-size:0;
               display:flex;
               .icon {
                 flex:0 0 12px
                 display:inline-block;
                 vertical-align :top;
                 font-size:12px;
                 line-height:16px;
                 margin-right:8px;
                 height:30px;
                 line-height:30px;
                 &.icon-thumb_up{
                   color:rgb(0,160,220)
                 }
                 &.icon icon-thumb_down{
                   color:rgb(183,187,191)
                 }
                }
               .recommendlists{
                 flex:1
                 display:inline-block;
                 .recommend_item{
                   text-align:center;
                   display:inline-block;
                   font-size:10px;
                   padding:6px;
                   border:1px solid rgba(7,17,27,.1);
                   margin-right:8px;
                   overflow:hidden;
                   text-overflow:ellipsis;
                   width:64px;
                   height:15px;
                   line-height:15px;
                   margin-bottom:3px;
                   white-space: nowrap;
                 }
               } 
             }
           }
         }
       }
     }
   }
</style>