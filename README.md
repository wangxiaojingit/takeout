# takeout

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
1\在使用stylus的时候 需要yarn add stylus stylus-loader 
2\ 1像素边框

   .border1px{
       position:relative;
   }
   .border1px::after{
       position:absolute;
       left:0;
       bottom:0
       bottom-top:1px solid #333
       content:"";

   }
   把伪类进行缩放
   @media(-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5)
     .border1px::after
       transform:scaleY(.7)
       -webkit-transform:scaleY(.7)
    @media(-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2)   
      .border1px::after
       transform:scaleY(.5)
       -webkit-transform:scaleY(.5)
3\sticky Footer 布局       
   //见云盘

4\星星评价的取值
小于0.5时候 把小数等成0 当小数部分大于.5-到0.9999的时候小数部分按.5计算
Math.floor(score*2)/2   
       
5\flex 布局
  只要对固定宽度的盒子写宽度 剩下的自适应的就可以flex:1 或者别的值来等分剩下的 外容器要写display:flex
6\模糊
  backdrop-filter：blur(10px)  对于背景颜色设置高斯模糊  (只支持ios)
  filter:blur(10px) 对于背景图片设置模糊(兼容性好) 
7\商品页面的左右联动
   用插件better-scroll
    this.left= new Bscroll(".menuWrapper")
    this.right=new Bscroll(".foodsWrapper",{probeType:3})
    probeType:3 开启实时滑动
    //绑定监听滑动事件,记录y值
    this.rigth.on("scroll",(pos)=>{
        this.scrollY=Math.abs(Math.round(pos.y))
    })
    //在reated 函数里面有个得到数据的区域,
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

      在给数据赋值的时候,映射是一个异步过程,this.$nextTick 是代表映射成功之后的回调,
      成功之后,重新计算高度,this._initHeight 是计算了列表的高度数组,在data上用this.heightAry存放
      
      然后在计算属性里面写cunrrentIndex 
      在列表上用key==this.cunrrentIndex 赋值current类

      点击左侧实现联动
      this.foodsScroll.scrollToElement(lis[key],300)
      因为右侧滚动了所以也触发了onscroll事件所以左侧的样式自然会变,但是这里一定要写第二个参数300(数字值可变,但不能不写,如果不写就不会有样式的变化效果)
8\  Vue form "vue"  
    Vue.set(this.food,"count",1)  
    给传过来的props里面的food添加count属性,并赋值1 这样的话可以更新视图
9\ 购物车详情的折叠和展示,用了一个数据fold:false 来表示,默认是折叠状态,当我们点击底部的购物低栏的时候
   我们需要让购物详情展示和折叠
      1当购物的总数小于等于0的时候,购物车详情是不存在的,所以不论怎么点击都不会切换效果,直接return false
      2当购物车的总数>0的时候,是展示还是折叠我们需要根据this.fold 来判断  
      3在点击购物底部的时候我们需要一个点击事件,来切换this.fold 值
10\ 要想把img图片设置的跟屏幕一样宽度,高度也设置成一样 有一个css
    <div class="imgWrapper">      
      <image src="" /> 
    </div>
    .imgWrapper{
        position:relative;
        width:100%;
        height:0;
        padding-top:100%;//padding 值用百分比的时候会以width来计算,这样就设置成了width=height
        image{
            width:100%;
            height:100%;
            position:absolute;
            left:0;
            top:0
        }

    }
11\惨痛教训:在写food详情页的时候,用计算属性来获得吐槽数和推荐数,但是总是报错,报错的原因在于在goodvue的时候,selected方法名字和selected data 重名导致.找了food 页面好久,结果才发现.
12\在做评论切换的时候,黄奕的思想和我的不同,我用了新的变量 ratinglists 计算属性来获取评论的数据 如果当前是类型是all 就是所有 如果是吐槽 就是吐槽....黄奕用的则是v-show="fn(itme.type,item.text)" 还是把所有的数据都展示,但是在show的时候进行了条件判断

13\ 在写评分布局的时候,有时候会在小屏幕上宽度不够掉下, 我们需要用@media 再写一个样式
  .left{
           width:135px;
           flex:0 0 135px;
           @media screen and (max-width:320px){
             width:110px;
           flex:0 0 110px;
           }
    