function o(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var S=typeof Symbol=="function"&&Symbol.observable||"@@observable",m=S,O=()=>Math.random().toString(36).substring(7).split("").join("."),x={INIT:`@@redux/INIT${O()}`,REPLACE:`@@redux/REPLACE${O()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${O()}`},g=x;function N(e){if(typeof e!="object"||e===null)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function A(e,t,r){if(typeof e!="function")throw new Error(o(2));if(typeof t=="function"&&typeof r=="function"||typeof r=="function"&&typeof arguments[3]=="function")throw new Error(o(0));if(typeof t=="function"&&typeof r>"u"&&(r=t,t=void 0),typeof r<"u"){if(typeof r!="function")throw new Error(o(1));return r(A)(e,t)}let u=e,c=t,n=new Map,i=n,a=0,f=!1;function y(){i===n&&(i=new Map,n.forEach((s,l)=>{i.set(l,s)}))}function w(){if(f)throw new Error(o(3));return c}function d(s){if(typeof s!="function")throw new Error(o(4));if(f)throw new Error(o(5));let l=!0;y();const p=a++;return i.set(p,s),function(){if(l){if(f)throw new Error(o(6));l=!1,y(),i.delete(p),n=null}}}function h(s){if(!N(s))throw new Error(o(7));if(typeof s.type>"u")throw new Error(o(8));if(typeof s.type!="string")throw new Error(o(17));if(f)throw new Error(o(9));try{f=!0,c=u(c,s)}finally{f=!1}return(n=i).forEach(p=>{p()}),s}function E(s){if(typeof s!="function")throw new Error(o(10));u=s,h({type:g.REPLACE})}function b(){const s=d;return{subscribe(l){if(typeof l!="object"||l===null)throw new Error(o(11));function p(){const v=l;v.next&&v.next(w())}return p(),{unsubscribe:s(p)}},[m](){return this}}}return h({type:g.INIT}),{dispatch:h,subscribe:d,getState:w,replaceReducer:E,[m]:b}}function R(e){Object.keys(e).forEach(t=>{const r=e[t];if(typeof r(void 0,{type:g.INIT})>"u")throw new Error(o(12));if(typeof r(void 0,{type:g.PROBE_UNKNOWN_ACTION()})>"u")throw new Error(o(13))})}function C(e){const t=Object.keys(e),r={};for(let n=0;n<t.length;n++){const i=t[n];typeof e[i]=="function"&&(r[i]=e[i])}const u=Object.keys(r);let c;try{R(r)}catch(n){c=n}return function(i={},a){if(c)throw c;let f=!1;const y={};for(let w=0;w<u.length;w++){const d=u[w],h=r[d],E=i[d],b=h(E,a);if(typeof b>"u")throw a&&a.type,new Error(o(14));y[d]=b,f=f||b!==E}return f=f||u.length!==Object.keys(i).length,f?y:i}}function T(...e){return e.length===0?t=>t:e.length===1?e[0]:e.reduce((t,r)=>(...u)=>t(r(...u)))}function _(...e){return t=>(r,u)=>{const c=t(r,u);let n=()=>{throw new Error(o(15))};const i={getState:c.getState,dispatch:(f,...y)=>n(f,...y)},a=e.map(f=>f(i));return n=T(...a)(c.dispatch),{...c,dispatch:n}}}function k(e){return N(e)&&"type"in e&&typeof e.type=="string"}function I(e){return({dispatch:r,getState:u})=>c=>n=>typeof n=="function"?n(r,u,e):c(n)}var M=I(),K=I;export{N as a,_ as b,C as c,T as d,A as e,k as i,M as t,K as w};
