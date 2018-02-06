<template>
  <div class="sellerWrapper" ref="sellWrapper">
     <div class="sellerContent">
       <div class="sellerMessage">
         <div class="top border-1px">
           <div class="sellerName">{{seller.name}}</div>
           <div class="sellersell">
             <span class="sellerScore">
               <star :size="24" :score="seller.score"></star>
             </span>
             <span class="ratingCount">({{seller.ratingCount}})</span>
             <span class="MouthCount">月售{{seller.sellCount}}单</span>
           </div>
           <div class="collection" @click="toggleselectionFlag">
             <div class="icon-favorite" :class="{'red':selectionFlag}"></div>  
             <div class="collectionText">
               <span v-show="!selectionFlag">收藏</span>
               <span v-show="selectionFlag">已收藏</span>
             </div>
           </div>
         </div>
         <div class="bottom">
           <div class="minPrice">
             <p class="pricetitle">起送价</p>
             <p class="priceNumber">{{seller.minPrice}}<span class="yuan">元</span></P>
           </div>
           <div class="sendPrice">
             <p class="pricetitle">商家配送价</p>
             <p class="priceNumber">{{seller.deliveryPrice}}<span class="yuan">元</span></p>
           </div>
           <div class="sendTime">
             <p class="pricetitle">平均配送时间</p>
             <p class="priceNumber">{{seller.deliveryTime}}<span class="yuan">分钟</span></p>
           </div>
         </div>
       </div>
       <split></split>
       <div class="actives">
         <div class="title">公告与活动</div>
         <div class="descript">
           {{seller.bulletin}}
         </div>
         <ul class="activesbox">
             <li class="active_item" v-for="item in seller.supports">
               <span class="icon">
                  <discount :size="4" :iconType="item.type"></discount>
               </span>
               <span class="icon_text">{{item.description}}</span>
             </li>
         </ul>
       </div>
       <split></split>
       <div class="sellerlive">
         <div class="title">商家实景</div>
         <div class="liveWrapper" ref="lives">
            <ul class="live_ul" ref="livesul">
              <li v-for="item in seller.pics">
                <div class="liveimg">
                    <img :src="item"/>
                </div>
              </li>
            </ul>
         </div>
       </div>
       <split></split>
       <div class="selleraddMessage">
         <div class="title">商家信息</div>
         <ul class="infolists" >
           <li v-for="item in seller.infos" class="infor_item">
              <span>{{item}}</span>
           </li>
         </ul>
       </div>
      
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from "@/base/star/star"
import split from "@/components/split/split"
import discount from "@/components/discount/discount"
import BScroll from 'better-scroll'

export default {
   props:{
     seller:{
       type:Object,
     }
   },
   created(){
     
     
    
   },
    data(){
      return {
       'selectionFlag':false
      }
    },
    mounted(){
      this.$nextTick(()=>{
          this._initpics();
          this._initSeller();
      })
      
    },
    methods:{
      toggleselectionFlag(){
        console.log(1)
        this.selectionFlag=!this.selectionFlag
      },
      _initpics(){
        if(this.seller.pics){
                let imgwidth= 120;
                let margingR=6
                let totalWidth=(imgwidth+margingR)*this.seller.pics.length-margingR;
                this.$refs.livesul.style.width=totalWidth+"px";
                this.$nextTick(()=>{
                  this.picscroll=new BScroll(this.$refs.lives,{
                     scrollX: true,
                    // eventPassthrough: 'vertical'
                  })
                })
        }
      },
      _initSeller(){
        if(!this.sellerScroll){
           this.sellerScroll=new BScroll(this.$refs.sellWrapper,{
             "click":true
           })
        }else{
          this.sellerScroll.refresh()
        }
      }
      
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initpics();
          this._initSeller();
        });
      }
    },

    components:{
      star,
      split,
      discount
    },

}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
@import "../../common/stylus/mixin";
   .sellerWrapper{
     position:absolute;
     left:0px;
     bottom:0px;
     right:0px;
     top:174px;
     overflow:hidden;
     .sellerContent{
        .sellerMessage{
          padding:18px 0;
          .top{
            margin:0 18px;
            position:relative;
            padding-bottom:18px;
            border-1px(rgba(7,17,27,.1))
            .sellerName{
              font-size:14px;
              color:rgb(7,17,27);
              line-height:14px;
              margin-bottom:8px;

            }
            .sellersell{
                font-size:0;
                color:rgb(77,85,93)
               .sellerScore{
                 display:inline-block
                 font-size:10px;
                 margin-right:8px;
               }
               .ratingCount{
                 display:inline-block;
                 font-size:10px;
                 margin-right:12px;
               }
               .MouthCount{
                 display:inline-block;
                 font-size:10px;
               }
               
            }
            .collection{
                  font-size:10px;
                  position:absolute;
                  right:0;
                  top:0px;
                  width:50px;
                  text-align:center;
                  .icon-favorite{
                    font-size:24px;
                    color:rgba(7,17,27,.1);
                    line-height:24px;
                    margin-bottom:8px;
                    &.red{
                      color:red
                    }
                  }
                  .collectionText{
                    font-size:10px;
                    line-height:10px;
                    color:rgb(77,85,93)
                  }
                 
            }

          }
          .bottom{
            display:flex;
            margin-top:18px;
            text-align:center;
            .pricetitle{
              font-size:10px;
              color:rgb(147,153,159);
              margin-bottom:4px;
              line-height:10px;
            }
            .priceNumber{
              font-size:24px;
              font-weight:200;
              color:rgb(7,17,27);
              line-height:24px;
              .yuan{
                font-size:10px;
              }
            }
            .minPrice{
              flex:1;
              border-right:1px solid rgba(7,17,27,.1)
            }
            .sendPrice{
              flex:1;
              border-right:1px solid rgba(7,17,27,.1)
            }
            .sendTime{
              flex:1;
             
            }
          }
        }
        .actives{
           padding:18px 0;
           margin:0 18px;
           padding-bottom:0px;
           
          .title{
            font-size: 14px;
            color: #07111b;
            line-height: 14px;
            margin-bottom: 8px;
          }
          .descript{
            font-size:12px;
            line-height:24px;
            color:rgb(240,20,20);
            padding:0 12px;
            padding-bottom:12px;
            border-1px(rgba(7,17,27,.1))
          }
          .activesbox{
            font-size:0;
            li{
              padding:16px;12px;
              font-size:0;
              border-1px(rgba(7,17,27,.1))
              .icon{
                width:16px;
                height:16px;
                display:inline-block;
                vertical-align :top;
                margin-right:6px;
                
              }
              .icon_text{
                font-size:12px;
                line-height:16px;
              }
            }
          }
        }
        .sellerlive{
          padding:18px;
          padding-right:0;
          .title{
            font-size: 14px;
            color: #07111b;
            line-height: 14px;
            margin-bottom: 12px;
          }
          .liveWrapper{
            width:100%;
            height:90px;
            white-space:nowrap;
            overflow: hidden
            ul{
                height:90px;
                font-size:0;
                li{
                  display:inline-block;
                  margin-right:6px; 
                  &:last-child:{margin-right:0}
                  .liveimg{
                    width:120px;
                    height:90px;
                    display:inline-block;
                    img{
                      width:120px;
                      height:90px;
                    }
                  }
                }
          }
        }

          }
        .selleraddMessage{
           padding:18px;
           padding-bottom:0;
           .title{
                font-size: 14px;
                color: #07111b;
                line-height: 14px;
                padding-bottom: 12px;
                border-1px(rgba(7,17,27,.1))
           }
           .infolists{
             .infor_item{
               padding:16px 12px;
               font-size:12px;
               line-height:16px;
               border-1px(rgba(7,17,27,.1))
             }
           }
        }
     }
   }
</style>