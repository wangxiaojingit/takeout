<template>
 <transition name="slide"> 
    <div class="food"  v-show="showFlag" ref="foodWrapper">
        <div class="foodIn">
          <!-- food名字 -->
            <div class="foodMessage border-1px">
              <div class="foodBannerWrapper">
                 <img class="foodBanner"  :src="food.image" />
                 <div class="back" @click="hide">
                   <i class="icon-arrow_lift"></i>
                 </div>
              </div>
              <div class="foodMessageText">
                <div class="foodName">{{food.name}}</div>
                <div class="foodsellMessage">
                  <span class="sellcount">月售{{food.sellCount}}份</span>
                  <span class="ratingsPecent">好评率{{food.rating}}%</span>
                </div>
                <div class="foodPrice">
                  <span class="foodNowPrice">{{food.price}}</span>
                  <span class="foodOldPrice">{{food.oldPrice}}</span>
                </div>
                <transition name="fade">
                 <div class="addshopCart" v-show="!food.count" @click="addFood($event)">加入购物车</div>
                </transition>
                <div class="shopCartControl">
                    <cartcontrol @foodadd="foodadd" ref="shopcontrol" :food="food"></cartcontrol>
                </div>
              </div>
            </div>
            <!-- food介绍 -->
            <div class="foodIntroduce">
              <h1 class="infoName">商品介绍</h1>
              <p class="inforText">{{food.info}}</p>
            </div>
            <!-- food 评价 -->
            <div  class="ratingWrapper" v-if="food">
              <rating  :selectType="selectType" :onlyHas="onlyHas" :ratings="food.ratings" 
              :food="food"
               @changeSelectType="changeSelectType"
               @changeOnlyHas="changeOnlyHas"
               ></rating>
            </div>
        </div>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
import Vue from "vue"
import BScroll from 'better-scroll'
import cartcontrol from "@/components/cartcontrol/cartcontrol"
import rating from "@/components/ratingmodel/ratingmodel"
let All=1
let TUIJIAN=2
let TUCAO=3
export default {
    props:{
      food:{
        type:Object,
        default:{}
      }
    },
    created(){
      console.log(this.food)
    },
    computed:{
     
    },
    data(){
      return {
        showFlag:false,
        selectType:All,
        onlyHas:true
      }
    },
    methods:{
      show(){
        this.showFlag=true
        this.selectType=All
        
        this.$nextTick(()=>{
         
          if(!this.scroll){
              this.scroll=new BScroll(this.$refs.foodWrapper,{
                click:true
              })
          }else{
            this.scroll.refresh()
          }

      })
      },
      hide(){
        this.showFlag=false
      },
      addFood(e){
         Vue.set(this.food,"count",1);
         this.$emit("foodadd",e.target)
      },
      foodadd(e){
        
         this.$emit("foodadd",e)
      },
      changeSelectType(type){
          this.selectType=type
      },
      changeOnlyHas(){
        this.onlyHas=!this.onlyHas
      }
      
      

    },
    components:{
      cartcontrol,rating
    }
}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
 @import "../../common/stylus/mixin";
   .food{
     position:fixed;
     left:0px;
     right:0px;
     top:0px;
     bottom:50px;
     background:#fff;
     transform:translate3d(0,0,0)
     
     &.slide-enter,&.slide-leave-to{
       transform:translate3d(100%,0,0)
       
     }
     &.slide-enter-active,&.slide-leave-active{
        transition:all .5s
     }
     z-index:6
     .foodMessage{
        border-1px(rgba(7,17,27,.1));
        margin-bottom:16px;
        .foodBannerWrapper{
          position:relative;
          width:100%;
          height:0px;
          padding-top:100%
          .foodBanner{
             position:absolute;
             left:0px;
             top:0px;
             width:100%;
             height:100%;
          }
          .back{
            position:absolute;
            left:10px;
            top:10px;
            padding:10px;
            .icon-arrow_lift{
              font-size:20px;
              color:#fff;
              display:inline-block
            }
          }

        }
       
       .foodMessageText{
         position:relative;
         padding:18px;
         .foodName{
           font-size:14px;
           color:rgb(7,17,27);
           font-weight:700;
           line-height:14px;
           padding:18px 0 8px 0px
         }
         .foodsellMessage{
           font-size:10px;
           line-height:10px;
           color:rgb(147,153,159);
           margin-bottom:18px;
           .sellcount{
             margin-right:12px;
           }
         }
         .foodPrice{
           .foodNowPrice{
             font-size:14px;
             color:rgb(240,20,20);
             line-height:24px;
           }
           .foodOldPrice{
             font-size:10px;
              color:rgb(147,153,159);
              line-height :24px;
              text-decoration: line-through
           }
         }
         .addshopCart{
           position:absolute;
           right:18px;
           bottom:18px;
           width:74px;
           height:24px;
           border-radius:12px;
           background:rgb(0,160,220);
           color:rgb(255,255,255);
           line-height:24px;
           font-size:10px;
           text-align:center;
           z-index:10
           opacity:1
           &.fade-enter,&.fade-leave-to{
             opacity:0
           }
           &.fade-enter-active,&.fade-leave-active{
             transition:all .5s
           }
         }
         .shopCartControl{
           position:absolute;
           right:18px;
           bottom:18px;
           z-index:5
         }
       }
     }
     .foodIntroduce{
       padding:18px;
       .infoName{
         margin-bottom:6px;
         color:rgb(7,17,27);
         font-weight:300;
         }
       .inforText{
           padding:0 8px;
           font-size:14px;
           line-height:14px;
           color:rgb(77,85,93)
           line-height:24px;
           
       }
     }
     .ratingWrapper{
     }
     
   }
.rating-content{
  padding:6px 0 16px 0;
  border-1px(rgba(7,17,27,.1))
}
.rating-text{
                 display:inline-block;
                 font-size:12px;
                 color:#333;
                 
            }
</style>