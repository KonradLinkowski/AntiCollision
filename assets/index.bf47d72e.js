var A=Object.defineProperty;var I=(e,t,i)=>t in e?A(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var d=(e,t,i)=>(I(e,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();function O(e){return L(0,e)}function L(e,t){return Math.random()*(t-e)+e}class u{constructor(t,i,n){this.x=t,this.y=i,this.z=n}add(t){return new u(this.x+t.x,this.y+t.y,this.z+t.z)}sub(t){return new u(this.x-t.x,this.y-t.y,this.z-t.z)}mul(t){return new u(this.x*t,this.y*t,this.z*t)}div(t){return new u(this.x/t,this.y/t,this.z/t)}toRGB(){return`rgb(${this.x} ${this.y} ${this.z})`}}class a{constructor(t,i){this.x=t,this.y=i}add(t){return new a(this.x+t.x,this.y+t.y)}sub(t){return new a(this.x-t.x,this.y-t.y)}mul(t){return new a(this.x*t,this.y*t)}div(t){return new a(this.x/t,this.y/t)}}const m=100;class R{constructor(t,i,n){d(this,"position");d(this,"velocity");d(this,"r");d(this,"color");d(this,"position_history");d(this,"current_idx");d(this,"stable");d(this,"stableCount");this.position=new a(t,i),this.velocity=new a(L(-4,4),L(-4,4)),this.r=n,this.position_history=[],this.current_idx=0;for(let o=0;o<m;o+=1)this.position_history.push(new a(t,i));this.stableCount=0}save(){this.position_history[this.current_idx]=this.position,this.current_idx=++this.current_idx%m}getVA(){const t=[];for(let i=0;i<m;++i){const n=(i+this.current_idx)%m,o=i/m;t[i].position=this.position_history[n];const s=o*255;t[i].color=new u(0,s,0)}return t}draw(t){t.fillStyle=this.color.toRGB(),t.beginPath(),t.arc(this.position.x,this.position.y,this.r,0,Math.PI*2),t.fill(),t.closePath()}}const l=document.querySelector("canvas"),c=l.getContext("2d");l.width=window.innerWidth;l.height=window.innerHeight;window.addEventListener("resize",()=>{l.width=window.innerWidth,l.height=window.innerHeight});const X=new u(0,255,0),Y=new u(255,0,0),C=.1;let w=.1,g=.35;const $=3;window.addEventListener("wheel",({deltaY:e})=>{B(-e/5e3)});let _=null;window.addEventListener("touchstart",({touches:e})=>{e.length>1&&(_=Math.sqrt(Math.pow(e[0].clientX-e[1].clientX,2)+Math.pow(e[0].clientY-e[1].clientY,2)))});window.addEventListener("touchend",()=>{_=null});window.addEventListener("touchmove",({touches:e})=>{if(_!==null){const t=Math.sqrt(Math.pow(e[0].clientX-e[1].clientX,2)+Math.pow(e[0].clientY-e[1].clientY,2)),i=t-_;B(i/500),_=t}});function B(e){w+=e,w<0&&(w=0),w>1&&(w=1),g=w*($-C)+C}let b=1,S=1,x=1,E=1;const k=20,G=5,N=70,f=[];for(let e=0;e<k;e++){const t=O(2*Math.PI),i=350,n=i*Math.cos(t),o=i*Math.sin(t);f.push(new R(n+l.width*.5,o+l.height*.5,L(N,G)))}W("Space",()=>{E=b==1?10:1});let v=0;window.addEventListener("mousemove",e=>{e.x,e.y});requestAnimationFrame(F);function F(e){x!=E&&(x+=E-x);let t=!0;if(!S){for(const n of f)n.stable=!0,n.save();t=H(f),!t&&v<200&&(v=0),t&&++v,x&&(b=x),S=b}K(f,b);let i=new a(0,0);for(const n of f){const o=v>199?1:Math.min(1,n.stableCount/255),s=X.mul(o).add(Y.mul(1-o));n.r,b>1&&n.r,i=i.add(n.position),n.color=s}i=i.div(f.length),c.clearRect(0,0,l.width,l.height),c.save(),c.scale(g,g),c.translate(-i.x+l.width*.5*1/g,-i.y+l.height*.5*1/g),f.forEach(n=>n.draw(c)),c.fillStyle="purple",c.beginPath(),c.arc(i.x,i.y,10,0,Math.PI*2),c.fill(),c.closePath(),c.restore(),requestAnimationFrame(F)}function H(e,t){let i=!0;const n=e.length,o=.01,s=new a(l.width*.5,l.width*.5);for(let r=0;r<n;r++){const h=e[r],D=s.sub(h.position);h.velocity=h.velocity.add(D.mul(o));for(let z=r+1;z<n;z++){const p=e[z],y=h.position.sub(p.position),M=Math.sqrt(y.x*y.x+y.y*y.y),P=h.r+p.r;if(M<P){i=!1,h.stable=!1,p.stable=!1;const q=y.div(M);h.position=h.position.add(q.mul(.5*(P-M))),p.position=p.position.sub(q.mul(.5*(P-M)))}}}for(let r=0;r<n;r++)e[r].stable?e[r].stableCount++:e[r].stableCount=0;return i}function K(e,t){for(const n of e)n.position=n.position.add(n.velocity.mul(.016/t));S--}function W(e,t){window.addEventListener("keyup",i=>{i.code==e&&t()})}