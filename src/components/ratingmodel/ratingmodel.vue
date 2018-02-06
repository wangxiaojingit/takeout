<template>
<div class="foodratings">
    <h1>商品评价</h1>
    <div class="tab">
      <span class="tab-item all" @click="selecttab(1)" :class="{'select':selectType==1}">
       <span> {{tabbar.first}}</span><span class='count'>{{ratings.length}}</span>
      </span>
      <span class="tab-item tuijian" @click="selecttab(2)" :class="{'select':selectType==2}">
        <span>{{tabbar.second}}</span><span class='count'>{{tuijian.length}}</span>
      </span>
      <span class="tab-item tucao" @click="selecttab(3)" :class="{'select':selectType==3}">
        <span>{{tabbar.three}}</span><span class='count'>{{tucao.length}}</span>
      </span>
    </div>
    <div class="content">
      <div class="contentchoose" :class="{'on':onlyHas}" @click="changeOnlyHas">
          <span  class="icon icon-check_circle onlyHas" ></span>
          <span class="icon_text">只看有内容的评价</span>
      </div>
      <div class="ratings" >
        <ul v-if="ratinglists.length">
          <li v-for="item in ratinglists">
            <div class="data">
              <span class="day">{{item.rateTime | formatDate}}</span><span class="time">12:34</span>
            </div>
            <div class="rating-content border-1px" >
              <span class="icon" 
              :class="{'icon-thumb_up':item.rateType==0,'icon-thumb_down':item.rateType==1}"
              ></span><span class="rating-text">{{item.text}}</span>
            </div>
            <div class="useMessage">
              <span class="useNames">{{item.username}}</span>
              <div class="headimgbox"><img class="headimg" width="13" :src="item.avatar" /></div>
            </div>
          </li>
        </ul>
        <div class="noratings" v-if="!ratinglists||!ratinglists.length">暂无数据</div>
      </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
let All=1
let TUIJIAN=2
let TUCAO=3
import {formatDate} from "../../common/js/date.js"
export default {
    props:{
      ratings:{
         type:Array,
         dafault(){
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
        
      }
    },
    computed:{
      ratinglists(){
         let ratingAry=[];
         let man=[]
         if(this.selectType==All){
            ratingAry= this.ratings
         }else if(this.selectType==TUIJIAN){
            ratingAry= this.tuijian
         }else{
           ratingAry= this.tucao
         }

         if(this.onlyHas){
           //只看有内容的
           ratingAry.forEach(item => {
              if(item.text){
                man.push(item)
              }
           })
           return man
         }else{
           return ratingAry
         }
         
      },
      tuijian(){
        return this.ratings.filter( (item) => {
           return  item.rateType==0
        })
        
      },
      tucao(){
        return this.ratings.filter((item) => {
           return  item.rateType==1
        })

      }
     
    },
    methods:{
      selecttab(type){
        this.$emit("changeSelectType",type)
      },
      changeOnlyHas(){
        console.log("click")
        this.$emit("changeOnlyHas")
      }
    },
    filters:{
      formatDate(time){
         let date=new Date(time);
         return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
 @import "../../common/stylus/mixin";
.foodratings{
  padding:18px; 
  h1{
    margin-bottom:18px;
  }
  .tab{
    font-size:0px;
    padding-bottom:18px;
    border-1px(rgba(7,17,27,.1))
    .tab-item{
      display:inline-block;
      font-size:14px;
      padding:8px 12px;
      background:rgb(0,160,120);
      margin-right:8px;
      &.all,&.tuijian{
        background:rgba(0,160,220,.2)
      }
      &.tucao{
        background:rgba(77,85,93,.2)
      }
      &.all.select,&.tuijian.select{
        background:rgb(0,160,220);
        color:#fff;
      }
      &.tucao.select{
        background:rgb(77,85,93);
        color:#fff;
      }
      .count{
        font-size:10px;
        margin-left:3px;
      }
    }
  }
  .contentchoose{
    padding:12px 0;
    border-1px(rgba(7,17,27,.1))
    line-height:24px;
    color:rgb(147,153,159)
    &.on{
      .icon-check_circle{
        color:green
      }
    }
    .icon{
      font-size:24px;
      display:inline-block;
      vertical-align:top;
    }
    .icon_text{
      font-size:12px;
      display:inline-block;
      line-height:24px;
    }

  }
  .ratings{
    font-size:0px;
    .noratings{font-size:12px;line-height:24px;} 
    .useMessage{
      position:absolute;
      right:12px;
      top:0px;
      font-size:0px;
      .useNames{
        display:inline-block
        font-size:10px;
        color:rgb(147,153,159);
        line-height:13px;
        margin-right:6px;
      }
      .headimgbox{
        display:inline-block;
        vertical-align:top;
        width:13px;
        height:13px;
        border-radius:50%;
        overflow:hidden;
        img{
          display:block;
        }
      }
    }
    .rating-content{
      .icon{
        font-size:12px;
        display:inline-block;
        vertical-align:top;
        margin-right:3px;
        &.icon-thumb_up{
          color:rgb(0,160,220)
        } 
        &.icon-thumb_down{
          color:rgb(147,153,159)
        } 
      }
      
    }
    .data{
      font-size:10px;
      color:rgb(147,153,159);
      margin-bottom:6px;
      margin-top:16px;
      .day{
        margin-right:12px;
      }
      .time{
      }
      
    }
  }
}

.ratings li{
  position:relative
}
</style>