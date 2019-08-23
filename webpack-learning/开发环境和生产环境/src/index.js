//同步引入js 
// import _ from 'lodash';



//同步引入不在nodemodule里的js
// import a from './a'







// 动态引入js  chunks:"async"使生效
// function getComponent(){
//     return import(/* webpackChunkName:"lodash" */ 'lodash').then((lodash)=>{
//         let element = document.createElement('div')
//         element.innerHTML=lodash.join(['Dell','Lee'],'-')
//         return element
//     })
// }


//推荐写法
// document.addEventListener('click',()=>{
//     import(/* webpackPrefetch:true */ /* webpackChunkName:"handleClick" */  './handleClick.js').then(func=>{
//         console.log(func)
//         func.default();
//     })
// })


//css 代码分割
// import './index.css'
// document.addEventListener('click',()=>{
//     import('./style1.css')
// })



// import _ from 'lodash'
let element = document.createElement('div')
element.innerHTML=_.join(['Dell','Lee'],'，---')
document.body.appendChild(element)

