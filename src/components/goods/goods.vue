<template>
  <div class="goods">
    <div class="menuWrapper" ref="menuScroll">
        <div style="width:100%" >
           <div v-for="(item,key ) in goods" class="menu_item" 
           :class="{'current':currentIndex==key}"
           @click.stop.prevent="selectleft(key)"
           >
             <div class="text">
                <span class="goodsIcon item" v-if="item.type>-1" :class="mapIconClass[item.type]"></span>
                <span class="goodsName">{{item.name}}</span>
             </div>
           </div>
        </div>   
    </div>
    <div class="foodsWrapper" ref="foodsScroll">
      <ul class="foodsWrapperIn">
        <li v-for="(item,index) in goods"  ref="foodsliItem">
           <h1 class="goodsTitle">{{item.name}}</h1>
           <ul class="foodsWrapper">
             <li  @click="selectedFoodFn(food,$event)" class="foods_itme" v-for="food in item.foods" >
               <div class="icon" >
                 <img :src="food.icon" alt="">
               </div>
               <div class="content">
                  <div class="foodsName">{{food.name}}</div>
                  <p class="descript">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="newPrice">{{food.price}}</span>
                    <span class="oldPrice">{{food.oldPrice}}</span>
                  </div>
                  <div class="carControlbox">
                      <cartcontrol @foodadd="foodadd" :food="food"></cartcontrol>
                  </div>
               </div>
             </li>
           </ul>
        </li>
      </ul>  
    </div>
    <!-- 购物车 -->
    <shopcart ref="shopcart" :selectFoods="selectFoods" :seller="seller"></shopcart>
    <food  @foodadd="foodadd" :food="seletedfood" ref="food"></food> 
  </div>
</template>

<script type="text/ecmascript-6">
import * as dom from "@/common/js/dom"
import BScroll from 'better-scroll'
import shopcart from "@/components/shopcart/shopcart"
import cartcontrol from "@/components/cartcontrol/cartcontrol"
import food from "@/components/food/food"
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
      return{
        goods:[],
        mapIconClass:["decrease_1","discount_1","guarantee_1","invoice_1","special_1"],
        scrollY:0,
        foodsHeightAry:[],
        seletedfood:{}
      }
    },
    computed:{
       currentIndex:function(){
         for(var i=0;i<this.foodsHeightAry.length;i++){
             let height1=this.foodsHeightAry[i]
             let height2=this.foodsHeightAry[i+1]
             if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
               return i;
          }
         }
         return 0
       },
       selectFoods(){
         let foodsary=[];
         this.goods.forEach((good) => {
           good.foods.forEach((food) => {
              if(food.count>0){
                 foodsary.push(food)
              }
           })
         })
         return foodsary
       }
    },
    created(){
      this.$http.get("/api/goods").then(res => {
          let data=res.body
          if(data.errno==dom.ERRNO){
              this.goods=data.data;
             
              this.$nextTick(() => {
                   this._initScroll();
                   this._initHeight();                  
              })
          }
         
      })
    },
    methods:{
      selectedFoodFn(food){
          this.seletedfood=food;
          this.$nextTick(()=>{
             this.$refs.food.show();
          })
         
      },
      selectleft(key){
       //点击哪一个的时候就让右侧内容调到哪个
       let lis=this.$refs.foodsliItem;
       this.foodsScroll.scrollToElement(lis[key],300)
      },
      foodadd(e){
        //点击添加的商品的时候,执行小球动画
         this.$refs.shopcart.drop(e)
      },
      _initScroll(){
        this.menuScroll=new BScroll(this.$refs.menuScroll,{
          click:true
        })
        this.foodsScroll=new BScroll(this.$refs.foodsScroll,{
           click:true,
          probeType:3
        })

        this.foodsScroll.on("scroll",(m) => {
            this.scrollY=Math.abs(Math.round(m.y))
        })
      },
      _initHeight(){
          let height=0;
          this.foodsHeightAry.push(height);
          let arr=this.$refs.foodsliItem;
          for(var i=0;i<arr.length;i++){
            let currentH=arr[i].clientHeight;
            height+=currentH;
            this.foodsHeightAry.push(height)
          }
                  
      }
    },
    components:{
      shopcart,
      cartcontrol,
      food
    }
}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
.goods
  display:flex
  position:absolute
  top:174px
  bottom:40px
  width:100%
  overflow:hidden
  .menuWrapper
    flex:0 0 80px
    .menu_item
      width:56px
      height:54px
      margin:0 auto
      border-1px(rgba(7,17,27,.1))
      display:table
      text-align:center
      vertical-align:middle
      &.current{
        background:rgba(238,188,0,1)
        color:#fff
        position:relative;
        top:-1px
        borderno1()
      }
      .text
        display:table-cell
        vertical-align: middle 
        font-size:0px
        line-height:12px
        .item
          display:inline-block
          width:12px
          height:12px 
          background-size:12px 12px
          vertical-align:top
          &.decrease_1
            backgroundImg("decrease_3") 
          &.discount_1
            backgroundImg("discount_3")
          &.guarantee_1
            backgroundImg("guarantee_3") 
          &.invoice_1  
            backgroundImg("invoice_3")  
          &.special_1
            backgroundImg("special_3")   
        .goodsName
          font-size:12px
          margin-left:2px  
  .foodsWrapper
    flex:1  
    .goodsTitle
      font-size:12px;
      color:rgb(147,153,159)
      background:#f3f5f7
      height:26px
      line-height:26px
      padding:14px
      border-left:2px solid #999
    

.foods_itme{
  display:flex
  margin:0 18px
  padding:18px 0
  border-1px(rgba(7,17,27,.1))
  &::last-child{
    borderno()
  } 
  .icon{
    width:56px
    height:56px
    flex:0 0 56
    margin-right:10px
    img{
      width:100%
      display:block;
    }
  }
  .content{
    position:relative;
    flex:1; 
    font-size:10px;
    color:rgb(147,153,159);
    line-height:10px;
    .foodsName{
      color:rgb(7,17,27);
      font-size:14px;
      height:14px;
      line-height:14px;
      margin-bottom:8px;
    }
    .descript{
         margin-bottom:8px;
    }
    .extra{
      margin-bottom:8px;
    }
    .price{
      .newPrice{
        color:rgb(147,153,159)
        font-size:14px
      }
      .oldPrice{
        color:#333
        font-size:10px
      }
    }
    .carControlbox{
      position:absolute;
      right:0px;
      bottom:-12px
    }
  }  
                   
}
      
        
          



</style>