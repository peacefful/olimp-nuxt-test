import{t as l,v as i,a7 as h,W as _,l as k,q as a}from"./entry.FxSTIjo9.js";import{u}from"./cookie._2z9B-9h.js";const m={__name:"Button",props:{color:String},setup(t){return(s,n)=>(l(),i("button",{class:_(["button",`button_${t.color}`])},[h(s.$slots,"default")],2))}},g=m,c=(t,s={})=>{const n=u("token").value,r=k().public.BASE_URL;return $fetch(`${r}${t}`,{...s,headers:{Authorization:`Bearer ${n}`}})},v=()=>{const t=u("token");return{authorization:async e=>{try{const o=await c("/auth/signin",{method:"POST",body:{...e}});o!=null&&o.access_token&&(t.value=o.access_token,a("/home"))}catch(o){console.log(o)}},refreshToken:async()=>{try{const e=await c("/auth/refresh",{method:"POST",body:{access_token:t.value}});t.value=await e.access_token}catch(e){e.status===401&&a("/")}},logout:()=>{t.value=0,a("/")}}};export{g as _,c as a,v as u};
