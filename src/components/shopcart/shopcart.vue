<template>
  <div class="shopCart_wrapper" >
      <div class="shopCart_content" @click="totoggleFold">
          <div class="shopLeft clearfix" >
            <div class="logoWrapper" :class="{'highlight':totalNum>0}">
              <div class="logo icon-shopping_cart"></div>
              <!-- 数量 -->
              <div class="count" v-show="totalNum"
              :class="{'highlight':totalNum>0}">{{totalNum}}</div>
            </div>
            <div class="price" :class="{'highlight':totalPrice>0}">
              ¥{{totalPrice}}
            </div>
            <div class="descript">
              另需配送费{{seller.deliveryPrice}}元
            </div>
          </div>
          <div class="shopRight" :class="payClass"  >
            <span @click.stop.prevent="pay"> {{payDescript}}</span>
          </div>
      </div>
       <div class="ballsWrapper" >
          <div  v-for="item in balls" >
              <transition name="drop" 
               @before-enter="beforeEnter" 
               @enter="enter" 
               @after-enter="afterEnter"
               >
                   <div class="ball" v-show="item.show">
                      <div class="ballsInner inner-hook"  ></div>
                   </div>
                      
              </transition>         
          </div>
       </div>
       <transition name="fold">
          <div class="shoplistWrapper" v-show="foldFlag">
              <div class="shop-title clearfix">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="empty">清空</span>
              </div>
              <div class="content" ref="content">
                <ul class="contentlists">
                  <li v-for="item in selectFoods" class="border-1px">
                    <span class="foodName">{{item.name}}</span>
                    <div class="shopControlWrapper">
                    <cartcontrol @foodadd="foodadd" :food="item"></cartcontrol>
                    </div>
                    <span class="foodPrice">¥{{item.price*item.count}}</span>
                  </li>
                </ul>
              </div>
          </div>
       </transition>
       <!-- 黑色浮层 -->
       <transition name="fade">
         <div class="Mast" v-show="foldFlag"></div>
       </transition>
       
  </div>
</template>

<script type="text/ecmascript6">
import cartcontrol from "@/components/cartcontrol/cartcontrol"
import BScroll from 'better-scroll'
export default {
   props:{
     seller:{
       type:Object,
       default:{}
     },
     selectFoods:{
       type:Array,
       default(){
         return []
       }
      }
   },
    computed:{
      foldFlag(){
        if(!this.totalNum){
           this.fold=false;
           return false;
        }else{
          return this.fold
        }
      },
      totalNum(){
        let total=0;
        this.selectFoods.forEach((item) => {
          
          total+=item.count
        })
        return total
      },
      totalPrice(){
        let total=0;
         this.selectFoods.forEach((item) => {
           total+=item.count*item.price
        })
        return total
      },
      payDescript(){
        //当totalPrice
        if(this.totalPrice==0){
              return `${this.seller.minPrice}元起送`
        }else if(this.totalPrice<this.seller.minPrice){
            let def=this.seller.minPrice-this.totalPrice
            return `还差${def}元起送`
        }else{
          return "去结算"
        }
      },
      payClass(){
        if(this.totalPrice<this.seller.minPrice){
           return "no-enough"
        }else{
          return "enough"
        }
      }
      
     
    },
    data(){
      return {
        balls:[
          {
          show:false
          },
          {
          show:false
          },
          {
          show:false
          },
          {
          show:false
          },
          {
          show:false
          }
        ],
        dropBalls:[],
        fold:false//当fold等false的时候就是折叠  等于true的时候就是展示
      }
    },
    created(){
     
    },
    methods:{
      pay(){
        if(this.totalPrice<this.seller.minPrice){
          return
        }
        alert(`支付总金额:${this.totalPrice}元`)
      },
      empty(){
        this.selectFoods.forEach((item)=>{
            item.count=0;
            this.fold=false

        })
      },
      foodadd(e){
        //点击添加的商品的时候
         this.drop(e)
      },
      beforeEnter(el){
        console.log(11)
        let count=this.balls.length;
        for(var i=0;i<this.balls.length;i++){
           let ball=this.balls[i];
           if(ball.show){
             let rect=ball.el.getBoundingClientRect()
             let x=rect.left-37;
             let y=-(window.innerHeight-rect.top-37)
             el.style.display="";
             el.style.webkitTransform=`translate3d(0,${y}px,0)`
             el.style.transform=`translate3d(0,${y}px,0)`
             let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
           }
        }
        
      },
      enter(el,done){
        //这句话是为了单纯重新渲染,没有其它作用
          let rf = el.offsetHeight;
          this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterEnter(el){
       
              let ball = this.dropBalls.shift();
              if (ball) {
                ball.show = false;
                el.style.display = 'none';
              }
      },
      drop(ele){
        //遍历balls,找到第一个为false的小球
        for(var i=0;i<this.balls.length;i++){
           let ball=this.balls[i];
           if(!ball.show){
              ball.show=true;
              ball.el=ele;
              this.dropBalls.push(ball);
              console.log(this.dropBalls)
              return
           }
        }
        
      },
      totoggleFold(){
        if(!this.totalNum){
           this.fold=false; 
           return
        }
        this.fold=!this.fold;
      }

    },
    components:{
      cartcontrol
    },
    watch:{
      fold(){
        if(this.fold){
          this.$nextTick(()=>{
          if(!this.Bsscroll){
            this.Bsscroll=new BScroll(this.$refs.content,{
             click:true
            })
          }else{
            this.Bsscroll.refresh()
          }

          })
          
        }
      }
    }
   
     
}
</script>

<style rel="stylesheet/stylus" lang="stylus" >
  @import "../../common/stylus/mixin";
   .shopCart_wrapper{
     position:fixed
     left:0
     bottom:0
     width:100%
     height:50px
     background:#000
     z-index:999
     .Mast{
       position:fixed;
       left:0px;
       top:0px;
       z-index:-5;
       width:100%;
       height:100%;
       background:rgba(7,17,27,.6)
       backdrop-filter: blur(10px)
       &.fade-enter,&.fade-leave-to{
         background:rgba(7,17,27,0)
       }
       &.fade-enter-active,&.fade-leave-active{
         transition:all .5s
       }
     }

     .shopLeft{
        flex:1
        display:inline-block
        background:#000;
        .logoWrapper{
          display: inline-block;
          position:relative
          top:-10px;
          width:44px;
          height:44px;
          color:#fff;
          border-radius:50%;
          background:#2b343c;
          border:5px solid #131d26
          margin:0 18px
          text-align:center
          vertical-align:top
          line-height:44px
          font-size:0
          &.highlight{
            background:#3879d9;
            color:#fff;

          }
          .count{
            position:absolute;
            right:0px;
            top:-11px;
            padding:2px 5px;
            border-radius:10px;
            background:red;
            font-size:12px;
            line-height:16px;


          }
          .logo{
            font-size:24px;
            margin-top: 10px;
            
          }
          
        }
        .price{
          display: inline-block;
          font-size:16px;
          color:rgba(255,255,255,.4)
          height:30px;
          line-height:30px;
          font-weight:bold;
          margin-top:10px;
          border-right:1px solid rgba(255,255,255,.3)
          padding-right:12px
          &.highlight{
            color:#fff;
          }
        }
        .descript{
          display:inline-block;
          font-size:14px
          color:rgba(255,255,255,.4)
          height:50px
          line-height:50px
        }
     }
     .shopRight{
       display:inline-block
       width:105px
       flex:0 0 105px
       background:#2b333b;
       height:100%
       color:rgba(255,255,255,.4)
       font-size:12px;
       font-weight:400
       line-height:50px
       text-align:center;
       &.no-enough{
          background:#2b333b;
       }
       &.enough{
          background:green;
          color:#fff;
       }
     }
     .ballsWrapper{
       .ball{
         position:fixed;
         left:37px;
         bottom:37px;
         transition: all 0.6s cubic-bezier(.19,-1.24,.83,.67)
       }
       .ballsInner{
         width:16px;
         height:16px;
         background:#00a0dc;
         border-radius:50%;
         transition: all 0.6s linear
       }
     }
     .shoplistWrapper{
       position:absolute;
       z-index:-1;
       left:0px;
       top:0;
       width:100%;
       transform: translate3d(0, -100%, 0);
       &.fold-enter,&.fold-leave-to{
         transform: translate3d(0, 0, 0);
        
       }
       &.fold-enter-active,&.fold-leave-active{
          transition:all .5s
       }
       .shop-title{
          height:40px;
          background:#f3f5f7;
          padding:0 18px;
          box-sizing:border-box;
          width:100%
          border-bottom:1px solid rgba(7,17,27,.1)
        }
       .title{
         color:rgb(7,17,27); font-size:14px;
         float:left;
         height:40px;
         line-height:40px;
       }
       .empty{
         font-size:12px;
         color:rgb(0,160,220);
         float:right;
         height:40px;
         line-height:40px;
       }
       .content{
         max-height:261px;
         overflow:hidden;
         padding:0 16px;
         box-sizing:border-box;
         background:#fff;
         li{
           position:relative;
           height:48px;
           line-height:48px;
           border-1px(rgba(7,17,27,.1))
           color:rgb(7,17,27)
           font-size:0
           .foodName{
              float:left;
            font-size:14px;
           
           }
           .foodPrice{
              float:right;
             font-size:10px;
             color:rgb(240,20,20);
             line-height:24px;
            
             margin:0 12px;
             margin-top:15px;
             
           }
           .shopControlWrapper {
             float:right;
             font-size:25px;
             margin-top:15px;
           }
         }
       }
       
     }
     
     
   }
.shopCart_content{
        width:100%
        height:50px
        display:flex

}  
</style>