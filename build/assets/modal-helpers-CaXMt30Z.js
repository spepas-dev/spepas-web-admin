import{f as d,j as a,c as y,a as x,aq as h}from"./index-C2Q_LmeJ.js";import{D as u,a as f,b as p,c as w,d as j}from"./dialog-BxdRvcNA.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],M=d("ChevronLeft",k);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M12 13v8l-4-4",key:"1f5nwf"}],["path",{d:"m12 21 4-4",key:"1lfcce"}],["path",{d:"M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284",key:"ui1hmy"}]],_=d("CloudDownload",C);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]],z=d("SlidersHorizontal",D),v={sm:"max-w-sm",md:"max-w-md",lg:"max-w-lg",xl:"max-w-xl",full:"max-w-[95vw] max-h-[95vh]"},g=({isOpen:s,onClose:l,title:e,description:i,size:n="md",persistent:o=!1,className:c,children:r})=>{const m=t=>{!t&&!o&&l()};return a.jsx(u,{open:s,onOpenChange:m,children:a.jsxs(f,{className:y(v[n],c),onPointerDownOutside:t=>o&&t.preventDefault(),onEscapeKeyDown:t=>o&&t.preventDefault(),children:[a.jsxs(p,{children:[e&&a.jsx(w,{className:"text-[#4A36EC] text-xl font-bold",children:e}),i&&a.jsx(j,{className:"text-gray-600",children:i})]}),a.jsx("div",{className:"mt-4",children:r})]})})},b=({children:s,onSubmit:l,submitText:e="Submit",cancelText:i="Cancel",loading:n=!1,showFooter:o=!0,...c})=>a.jsx(g,{...c,children:a.jsxs("div",{className:"space-y-4",children:[s,o&&a.jsxs("div",{className:"flex justify-end space-x-2 pt-4 border-t",children:[a.jsx(x,{variant:"outline",onClick:c.onClose,disabled:n,children:i}),l&&a.jsx(x,{onClick:l,disabled:n,children:n?"Loading...":e})]})]})}),S=()=>{const s=h("form-modal");return{openForm:e=>{s.open(b,{title:e.title,children:e.children,onSubmit:e.onSubmit,submitText:e.submitText,showFooter:e.showFooter},{size:e.size})},close:s.close,update:s.update}};export{M as C,z as S,_ as a,S as u};
