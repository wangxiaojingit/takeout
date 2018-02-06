/**
 * @example
 * url:?name=lili&password=123
 * ary:["?ie=utf-8", "&f=8", "&rsv_bp=0", "&rsv_idx=1", "&tn=baidu"]
 * obj:{name:lili,password:123}
 * 
 * 
 * 
 * 
 */

// export function urlParse(){
//     let obj={};
//     let url=window.location.search;
//     console.log(url)
//     let reg=/[?&][^?&]+=[^?&]+/g;
//     let arr= url.match(reg) ;
//     console.log(arr)
//     if(arr){
//         arr.forEach((item)=>{
//             let items=item.substr(1).split("=");
//             let key=items[0];
//             let value=items[1];
//             obj[key]=value
//           })
//     }
   
//     console.log(obj)
//     return obj
// }

export function urlParse() {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=12345', '&a=b']
    if (arr) {
      arr.forEach((item) => {
        let tempArr = item.substring(1).split('=');
        let key = decodeURIComponent(tempArr[0]);
        let val = decodeURIComponent(tempArr[1]);
        obj[key] = val;
      });
    }
    console.log(obj)
    return obj;
  };
  