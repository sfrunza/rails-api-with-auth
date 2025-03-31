import{t as c,a as z,c as D,j as e,R as E,b as M,S as R,d as q,T as F,P as O,C as U,I as A,G as Q,r as p}from"./vendor-Oy3yQvpb.js";import{L as f,O as V,u as k,a as B}from"./vendor-router-BOglXYhN.js";import{L as I,S as G,M as $}from"./vendor-ui-CTTbLvAw.js";import{c as W,f as H,i as Y,a as S}from"./vendor-redux-BIS1gR2s.js";import{f as J}from"./vendor-date-fns-BWtotJsy.js";import{p as K}from"./vendor-libphonenumber-js-1k7QeoIm.js";const X={user:null},P=W({name:"auth",initialState:X,reducers:{setUser:(t,s)=>{t.user=s.payload}}}),{setUser:m}=P.actions,ke=P.reducer,Se=t=>t.auth.user,Z=H({baseUrl:"http://localhost:3001/api/v1",credentials:"include"}),T=async(t,s,r)=>{var o,n,i;const a=await Z(t,s,r);return a.error&&a.error.status===401||a.data&&((n=(o=a.meta)==null?void 0:o.response)!=null&&n.headers)&&((i=a.meta.response.headers.get("Authorization"))==null||i.split(" ")[1]),a},Pe=()=>t=>s=>{var r;if(Y(s)){const a=s.payload;if(console.error("RTK Query Error:",a),(a==null?void 0:a.status)===422){const o=a==null?void 0:a.data;o&&typeof o=="object"&&Object.entries(o).forEach(([n,i])=>{const l=Array.isArray(i)?i.join(", "):i;c.error(`${n.split("_").join(" ")} ${l}`)})}else(a==null?void 0:a.status)===500?c.error("Server Error! Please try again later."):c.error(((r=a==null?void 0:a.data)==null?void 0:r.error)||"An unexpected error occurred.")}return t(s)},ee=S({reducerPath:"authApi",baseQuery:T,endpoints:t=>({login:t.mutation({query:s=>({url:"/session",credentials:"include",method:"POST",body:s}),async onQueryStarted(s,{dispatch:r,queryFulfilled:a}){try{const o=await a;r(m(o.data.user))}catch(o){console.log("error",o)}}}),logout:t.mutation({query:()=>({url:"/session",method:"DELETE",credentials:"include"}),async onQueryStarted(s,{dispatch:r,queryFulfilled:a}){try{await a,r(m(null))}catch(o){console.log("error",o)}}}),forgotPassword:t.mutation({query:s=>({url:"/passwords",method:"POST",body:s})}),resetPassword:t.mutation({query:s=>({url:`/passwords/${s.token}`,method:"PUT",body:s})}),verify:t.mutation({query:()=>({url:"/session",method:"GET",credentials:"include"}),async onQueryStarted(s,{dispatch:r,queryFulfilled:a}){try{const o=await a;r(m(o.data))}catch(o){r(m(null)),console.log("error",o)}}})})}),{useLoginMutation:te,useForgotPasswordMutation:se,useResetPasswordMutation:ae,useLogoutMutation:Te}=ee,re=S({reducerPath:"settingsApi",baseQuery:T,tagTypes:["Setting"],endpoints:t=>({getSettings:t.query({query:()=>"/settings",providesTags:["Setting"]}),bulkUpdateSettings:t.mutation({query:({data:s})=>({url:"/settings/bulk_update",method:"POST",body:{setting:s}}),invalidatesTags:(s,r)=>r?[]:["Setting"]}),updateLogo:t.mutation({query:({image:s})=>{const r=new FormData;return r.append("setting[company_logo]",s),{url:"/settings/bulk_update",method:"POST",body:r}},invalidatesTags:["Setting"]})})}),{useGetSettingsQuery:oe,useBulkUpdateSettingsMutation:_e,useUpdateLogoMutation:Ce}=re,ne="US";function d(...t){return z(D(t))}function Le(t){if(!t)return"";const s=K(t,ne);return s?s.formatNational():t}function ze(t){if(!t)return"TBD";const s=new Date(t),r=new Date(s.valueOf()+s.getTimezoneOffset()*60*1e3);return J(r,"PPP")}function g({className:t,type:s,...r}){return e.jsx("input",{type:s,"data-slot":"input",className:d("border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm","focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]","aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",t),...r})}function x({className:t,...s}){return e.jsx(E,{"data-slot":"label",className:d("text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",t),...s})}function v({className:t,...s}){return e.jsx("div",{"data-slot":"card",className:d("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",t),...s})}function w({className:t,...s}){return e.jsx("div",{"data-slot":"card-header",className:d("flex flex-col gap-1.5 px-6",t),...s})}function y({className:t,...s}){return e.jsx("div",{"data-slot":"card-title",className:d("leading-none font-semibold text-lg",t),...s})}function b({className:t,...s}){return e.jsx("div",{"data-slot":"card-description",className:d("text-muted-foreground text-sm",t),...s})}function j({className:t,...s}){return e.jsx("div",{"data-slot":"card-content",className:d("px-6",t),...s})}function De({className:t,...s}){return e.jsx("div",{"data-slot":"card-footer",className:d("flex items-center px-6",t),...s})}const ie=M("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",{variants:{variant:{default:"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",destructive:"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",outline:"border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2 has-[>svg]:px-3",sm:"h-8 rounded-md px-3 has-[>svg]:px-2.5",lg:"h-10 rounded-md px-6 has-[>svg]:px-4",icon:"size-9"}},defaultVariants:{variant:"default",size:"default"}});function _({className:t,variant:s,size:r,asChild:a=!1,...o}){const n=a?R:"button";return e.jsx(n,{"data-slot":"button",className:d(ie({variant:s,size:r,className:t})),...o})}function de({className:t}){return e.jsx(I,{className:d("size-5 animate-spin text-inherit",t)})}function N({loading:t,children:s,className:r,...a}){return e.jsxs(_,{className:d("relative",r),...a,children:[t&&e.jsx("span",{className:"absolute inset-0 flex items-center justify-center",children:e.jsx(de,{})}),e.jsx("span",{className:t?"invisible":"",children:s})]})}function le(){const[t,{isLoading:s}]=se();function r(a){a.preventDefault();const o=a.currentTarget,n=o.email_address.value;t({email_address:n}).unwrap().then(i=>{c.success(i.message),o.reset()})}return e.jsxs(v,{className:"mx-auto max-w-sm",children:[e.jsxs(w,{children:[e.jsx(y,{className:"text-2xl",children:"Reset your password"}),e.jsx(b,{children:"Enter your email address and we will send you a link to reset your password."})]}),e.jsxs(j,{children:[e.jsxs("form",{className:"grid gap-4",onSubmit:r,children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(x,{htmlFor:"email_address",children:"Email"}),e.jsx(g,{id:"email_address",name:"email_address",type:"email",placeholder:"m@example.com",required:!0,defaultValue:"frunza.sergiu3@gmail.com",autoComplete:"off"})]}),e.jsx(N,{loading:s,disabled:s,type:"submit",className:"w-full",children:"Request password reset"})]}),e.jsxs("div",{className:"mt-4 text-sm",children:["Remebmer your password?"," ",e.jsx(f,{to:"/auth/login",className:"underline",children:"Log in"})]})]})]})}function Ee(){return e.jsx(le,{})}function ce({...t}){return e.jsx(q,{"data-slot":"dropdown-menu",...t})}function ue({...t}){return e.jsx(F,{"data-slot":"dropdown-menu-trigger",...t})}function me({className:t,sideOffset:s=4,...r}){return e.jsx(O,{children:e.jsx(U,{"data-slot":"dropdown-menu-content",sideOffset:s,className:d("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",t),...r})})}function Me({...t}){return e.jsx(Q,{"data-slot":"dropdown-menu-group",...t})}function h({className:t,inset:s,variant:r="default",...a}){return e.jsx(A,{"data-slot":"dropdown-menu-item","data-inset":s,"data-variant":r,className:d("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",t),...a})}const pe={theme:"system",setTheme:()=>null},C=p.createContext(pe);function Re({children:t,defaultTheme:s="system",storageKey:r="vite-ui-theme",...a}){const[o,n]=p.useState(()=>localStorage.getItem(r)||s);p.useEffect(()=>{const l=window.document.documentElement;if(l.classList.remove("light","dark"),o==="system"){const u=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";l.classList.add(u);return}l.classList.add(o)},[o]);const i={theme:o,setTheme:l=>{localStorage.setItem(r,l),n(l)}};return e.jsx(C.Provider,{...a,value:i,children:t})}const ge=()=>{const t=p.useContext(C);if(t===void 0)throw new Error("useTheme must be used within a ThemeProvider");return t};function xe(){const{setTheme:t}=ge();return e.jsxs(ce,{children:[e.jsx(ue,{asChild:!0,children:e.jsxs(_,{variant:"outline",size:"icon",children:[e.jsx(G,{className:"h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"}),e.jsx($,{className:"absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"}),e.jsx("span",{className:"sr-only",children:"Toggle theme"})]})}),e.jsxs(me,{align:"end",children:[e.jsx(h,{onClick:()=>t("light"),children:"Light"}),e.jsx(h,{onClick:()=>t("dark"),children:"Dark"}),e.jsx(h,{onClick:()=>t("system"),children:"System"})]})]})}function qe(){const{data:t}=oe(),s=t==null?void 0:t.company_name,r=t==null?void 0:t.company_logo;return e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute right-4 top-4 z-50",children:e.jsx(xe,{})}),e.jsxs("div",{className:"relative isolate flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden bg-muted p-6 dark:bg-background md:p-10",children:[e.jsxs("svg",{"aria-hidden":"true",className:"absolute inset-0 -z-10 size-full stroke-foreground/10 [mask-image:radial-gradient(56rem_56rem_at_center,white,transparent)]",children:[e.jsx("defs",{children:e.jsx("pattern",{x:"50%",y:-1,id:"983e3e4c-de6d-4c3f-8d64-b9761d1534cc",width:200,height:200,patternUnits:"userSpaceOnUse",children:e.jsx("path",{d:"M.5 200V.5H200",fill:"none"})})}),e.jsx("rect",{fill:"url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)",width:"100%",height:"100%",strokeWidth:0})]}),e.jsxs("div",{className:"flex w-full max-w-sm flex-col gap-6",children:[e.jsx("div",{className:"flex h-12 items-center gap-2 self-center font-medium",children:t&&e.jsxs(e.Fragment,{children:[e.jsx("img",{src:r,alt:"Company logo",className:"size-12"}),s]})}),e.jsx(V,{}),e.jsxs("div",{className:"text-balance text-center text-xs text-muted-foreground",children:["By clicking continue, you agree to our"," ",e.jsx("a",{href:"#",className:"underline underline-offset-4 hover:text-primary",children:"Terms of Service"})," ","and"," ",e.jsx("a",{href:"#",className:"underline underline-offset-4 hover:text-primary",children:"Privacy Policy"}),"."]})]})]})]})}function he(){const t=k(),[s,{isLoading:r}]=te();async function a(o){o.preventDefault();const n=o.currentTarget,i=n.email_address.value,l=n.password.value;switch((await s({email_address:i,password:l}).unwrap()).user.role){case"admin":t("/crm",{replace:!0});break;case"manager":t("/crm",{replace:!0});break;case"customer":t("/account",{replace:!0});break;default:t("/",{replace:!0});break}}return e.jsxs(v,{className:"mx-auto max-w-sm",children:[e.jsxs(w,{children:[e.jsx(y,{className:"text-2xl",children:"Login"}),e.jsx(b,{children:"Enter your email below to login to your account."})]}),e.jsxs(j,{children:[e.jsxs("form",{className:"grid gap-4",onSubmit:a,children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(x,{htmlFor:"email_address",children:"Email"}),e.jsx(g,{id:"email_address",type:"email",placeholder:"m@example.com",defaultValue:"frunza.sergiu3@gmail.com",required:!0,autoComplete:"email",name:"email_address"})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(x,{htmlFor:"password",children:"Password"}),e.jsx(g,{id:"password",type:"password",defaultValue:"111111",required:!0})]}),e.jsx(N,{loading:r,disabled:r,type:"submit",className:"w-full",children:"Login"})]}),e.jsx("div",{className:"mt-4 text-sm",children:e.jsx(f,{to:"/auth/forgot-password",className:"ml-auto inline-block text-sm underline",children:"Forgot your password?"})})]})]})}function Fe(){return e.jsx(he,{})}function fe(){const t=k(),[s]=B(),r=s.get("token"),[a,{isLoading:o}]=ae();async function n(i){i.preventDefault();const u=i.currentTarget.password.value;a({password:u,token:r??""}).unwrap().then(L=>{c.success(L.message),t("/auth/login")})}return e.jsxs(v,{className:"mx-auto max-w-sm",children:[e.jsxs(w,{children:[e.jsx(y,{className:"text-2xl",children:"Change your password"}),e.jsx(b,{children:"Enter a new password below to change your password."})]}),e.jsxs(j,{children:[e.jsxs("form",{className:"grid gap-4",onSubmit:n,children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(x,{htmlFor:"password",children:"New password"}),e.jsx(g,{id:"password",type:"password",placeholder:"New password",required:!0,defaultValue:"333333",autoComplete:"off"})]}),e.jsx(N,{loading:o,disabled:o,type:"submit",className:"w-full",children:"Change password"})]}),e.jsx("div",{className:"mt-4 text-sm",children:e.jsx(f,{to:"/auth/login",className:"underline",children:"Log in"})})]})]})}function Oe(){return e.jsx(fe,{})}export{qe as A,_ as B,v as C,ce as D,Ee as F,g as I,x as L,xe as M,Oe as R,de as S,Re as T,ee as a,T as b,ke as c,d,ie as e,N as f,j as g,w as h,De as i,Le as j,oe as k,Ce as l,y as m,ze as n,Fe as o,Se as p,Te as q,Pe as r,re as s,ue as t,_e as u,me as v,h as w,Me as x};
