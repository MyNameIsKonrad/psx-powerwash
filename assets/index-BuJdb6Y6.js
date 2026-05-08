(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();const s={stream:{freeSpeed:280,eraseRadius:32,maxThrowSpeed:1800,minThrowSpeed:120,velWindowMs:180,bounceNudgeRad:2*Math.PI/180},edgeSnap:{dist:60,tan:.36,tanFast:.7},grid:{chunkSize:22,chunkGap:1,chunkHp:1},tiles:{gravity:2600,knockBase:110,knockVar:55,streamInherit:.18,rotMax:6,shrink:2.4,upwardKick:-50},splash:{spawnHz:50,life:.15,startSize:12,endSize:36,lineWidth:2,jitter:14,r:124,g:196,b:255},wallColor:"#6e7884",run:{tankSeconds:30,cleanTargetPct:80,drainMultiplier:1}},vt="psxwash:save",Z=[{id:"tank",name:"tank size",blurb:"+10% water capacity",baseCost:25,costGrowth:1.6,maxLevel:8},{id:"pressure",name:"stream pressure",blurb:"+8% free speed",baseCost:30,costGrowth:1.7,maxLevel:8},{id:"nozzle",name:"nozzle width",blurb:"+6% erase radius",baseCost:40,costGrowth:1.8,maxLevel:6},{id:"recovery",name:"water recovery",blurb:"-5% drain rate",baseCost:50,costGrowth:1.9,maxLevel:5},{id:"payout",name:"soap subsidy",blurb:"+10% currency earned",baseCost:60,costGrowth:2,maxLevel:6}];function P(){return{currency:0,levels:Object.fromEntries(Z.map(i=>[i.id,0]))}}let F=zt();function zt(){try{const i=localStorage.getItem(vt);if(!i)return P();const t=JSON.parse(i);return{...P(),...t,levels:{...P().levels,...t.levels||{}}}}catch{return P()}}function Q(){localStorage.setItem(vt,JSON.stringify(F))}function rt(){return F.currency}function D(i){return F.levels[i]??0}function wt(i,t){return Math.round(i.baseCost*Math.pow(i.costGrowth,t))}function Dt(i){const t=Z.find(r=>r.id===i);if(!t)return!1;const e=D(i);if(e>=t.maxLevel)return!1;const n=wt(t,e);return F.currency<n?!1:(F.currency-=n,F.levels[i]=e+1,Q(),!0)}function Vt(i){const t=i.state==="won"?60:20,e=i.cleanedPct/100*80,n=i.efficiency*40,r=1+.1*D("payout"),a=Math.round((t+e+n)*r);return F.currency+=a,Q(),a}function Tt(){return{tankMul:1+.1*D("tank"),speedMul:1+.08*D("pressure"),radiusMul:1+.06*D("nozzle"),drainMul:1-.05*D("recovery")}}function It(){F=P(),Q()}const y={freeSpeed:280,eraseRadius:32,eraseRadiusSq:32*32,tankSeconds:30,drainMultiplier:1};function bt(){const i=Tt();y.freeSpeed=s.stream.freeSpeed*i.speedMul,y.eraseRadius=s.stream.eraseRadius*i.radiusMul,y.eraseRadiusSq=y.eraseRadius*y.eraseRadius,y.tankSeconds=s.run.tankSeconds*i.tankMul,y.drainMultiplier=s.run.drainMultiplier*i.drainMul}const o={x:0,y:0,vx:0,vy:0};function yt(i,t){o.x=i/2,o.y=t/2;const e=Math.random()*Math.PI*2;o.vx=Math.cos(e)*y.freeSpeed,o.vy=Math.sin(e)*y.freeSpeed}function Rt(i,t,e,n,r){if(n)return;o.x+=o.vx*i,o.y+=o.vy*i;const a=y.eraseRadius*.5;let l=!1;if(o.x<a&&(o.x=a,o.vx=Math.abs(o.vx),l=!0),o.x>t-a&&(o.x=t-a,o.vx=-Math.abs(o.vx),l=!0),o.y<a&&(o.y=a,o.vy=Math.abs(o.vy),l=!0),o.y>e-a&&(o.y=e-a,o.vy=-Math.abs(o.vy),l=!0),l){const c=Math.hypot(o.vx,o.vy),m=Math.atan2(o.vy,o.vx)+(Math.random()*2-1)*s.stream.bounceNudgeRad;o.vx=Math.cos(m)*c,o.vy=Math.sin(m)*c,r(o.x,o.y)}}function Bt(i,t,e,n){const r=Math.hypot(i,t),a=s.stream.minThrowSpeed,l=s.stream.maxThrowSpeed,c=Math.max(0,Math.min(1,(r-a)/(l-a))),m=s.edgeSnap.tan+c*(s.edgeSnap.tanFast-s.edgeSnap.tan),d=s.edgeSnap.dist,g=o.y<d,p=o.y>n-d,f=o.x<d,b=o.x>e-d;return(g||p)&&Math.abs(t)<Math.abs(i)*m?{vx:Math.sign(i)*r,vy:0}:(f||b)&&Math.abs(i)<Math.abs(t)*m?{vx:0,vy:Math.sign(t)*r}:{vx:i,vy:t}}let R=!1,xt=0,At=0,q=()=>0,tt=()=>0;const at=80;let J=null;function Ht(i){J=i}let _t=!0;function Et(i){_t=i,i||(R=!1)}const $=[];function Pt(){return R}function Nt(){const i=y.eraseRadius*.5,t=q(),e=tt();o.x<i&&(o.x=i),o.x>t-i&&(o.x=t-i),o.y<i&&(o.y=i),o.y>e-i&&(o.y=e-i)}function ot(i,t){if(i<at&&t<at&&J){J();return}_t&&(R=!0,xt=o.x-i,At=o.y-t,$.length=0,$.push({x:i,y:t,t:performance.now()}))}function lt(i,t){if(!R)return;o.x=i+xt,o.y=t+At,Nt(),$.push({x:i,y:t,t:performance.now()});const e=performance.now()-s.stream.velWindowMs-20;for(;$.length>1&&$[0].t<e;)$.shift()}function j(){if(!R)return;R=!1;const t=performance.now()-s.stream.velWindowMs;let e=$[0];for(const c of $)if(c.t>=t){e=c;break}const n=$[$.length-1];let r=0,a=0;if(e&&n&&n.t>e.t){const c=(n.t-e.t)/1e3;r=(n.x-e.x)/c,a=(n.y-e.y)/c}const l=Math.hypot(r,a);if(l>s.stream.maxThrowSpeed&&(r=r/l*s.stream.maxThrowSpeed,a=a/l*s.stream.maxThrowSpeed),l<s.stream.minThrowSpeed){const c=Math.random()*Math.PI*2;o.vx=Math.cos(c)*y.freeSpeed,o.vy=Math.sin(c)*y.freeSpeed}else{const c=q(),m=tt(),d=Bt(r,a,c,m);o.vx=d.vx,o.vy=d.vy}$.length=0}function Yt(i,t,e){q=t,tt=e,i.addEventListener("touchstart",n=>{n.preventDefault();const r=n.touches[0];ot(r.clientX,r.clientY)},{passive:!1}),i.addEventListener("touchmove",n=>{n.preventDefault();const r=n.touches[0];lt(r.clientX,r.clientY)},{passive:!1}),i.addEventListener("touchend",n=>{n.preventDefault(),j()},{passive:!1}),i.addEventListener("touchcancel",n=>{n.preventDefault(),j()},{passive:!1}),i.addEventListener("mousedown",n=>ot(n.clientX,n.clientY)),window.addEventListener("mousemove",n=>lt(n.clientX,n.clientY)),window.addEventListener("mouseup",j)}const v={cols:0,rows:0,data:new Uint8Array(0),initialAlive:0};function z(i,t){const e=s.grid.chunkSize;v.cols=Math.ceil(i/e),v.rows=Math.ceil(t/e),v.data=new Uint8Array(v.cols*v.rows);const n=Math.max(1,s.grid.chunkHp|0);v.data.fill(n),v.initialAlive=v.cols*v.rows}function Gt(i){const t=s.grid.chunkSize,e=y.eraseRadius,n=y.eraseRadiusSq,r=Math.max(0,Math.floor((o.x-e)/t)),a=Math.min(v.cols-1,Math.floor((o.x+e)/t)),l=Math.max(0,Math.floor((o.y-e)/t)),c=Math.min(v.rows-1,Math.floor((o.y+e)/t));for(let m=l;m<=c;m++)for(let d=r;d<=a;d++){const g=m*v.cols+d,p=v.data[g];if(p===0)continue;const f=d*t+t/2,b=m*t+t/2,E=f-o.x,C=b-o.y;if(E*E+C*C<=n){const L=p-1;v.data[g]=L,L===0&&i(f,b)}}}function et(){return v.initialAlive}function it(){let i=0;const t=v.data;for(let e=0;e<t.length;e++)t[e]===0&&i++;return i}const O=[],jt=1200;function Wt(i,t){const e=i-o.x,n=t-o.y,r=Math.hypot(e,n)||1,a=e/r,l=n/r,c=Math.hypot(o.vx,o.vy)||1,m=s.tiles.streamInherit,d=o.vx/c*m*c,g=o.vy/c*m*c,p=s.tiles.knockBase+Math.random()*s.tiles.knockVar;O.length>=jt&&O.shift(),O.push({x:i,y:t,vx:a*p+d,vy:l*p+g+s.tiles.upwardKick,rot:(Math.random()-.5)*.4,rotV:(Math.random()*2-1)*s.tiles.rotMax,size:s.grid.chunkSize-s.grid.chunkGap,scale:1})}function Xt(i,t){for(let e=O.length-1;e>=0;e--){const n=O[e];n.vy+=s.tiles.gravity*i,n.x+=n.vx*i,n.y+=n.vy*i,n.rot+=n.rotV*i,n.scale-=s.tiles.shrink*i,(n.y>t+80||n.scale<=.05)&&O.splice(e,1)}}function Jt(){O.length=0}const V=[];let G=0;function Ct(i,t,e=1){const n=Math.random()*s.splash.jitter,r=Math.random()*Math.PI*2;V.push({x:i+Math.cos(r)*n,y:t+Math.sin(r)*n,rot:Math.random()*Math.PI*2,age:0,sizeMul:e})}function Kt(i,t){for(let e=0;e<5;e++)Ct(i,t,1.35);typeof navigator<"u"&&navigator.vibrate&&navigator.vibrate(12)}function Ut(i){G+=i;const t=1/s.splash.spawnHz;for(;G>t;)Ct(o.x,o.y),G-=t;for(let e=V.length-1;e>=0;e--)V[e].age+=i,V[e].age>=s.splash.life&&V.splice(e,1)}function Zt(){V.length=0,G=0}function Qt(i,t,e){i.fillStyle=s.wallColor,i.fillRect(0,0,t,e);const n=s.grid.chunkSize,r=n-s.grid.chunkGap,a=Math.max(1,s.grid.chunkHp|0),l={r:0,g:0,b:0},c={r:130,g:86,b:48},m=[];for(let d=1;d<=a;d++){const g=(a-d)/Math.max(1,a-1),p=a===1?0:g,f=Math.round(l.r+(c.r-l.r)*p),b=Math.round(l.g+(c.g-l.g)*p),E=Math.round(l.b+(c.b-l.b)*p);m[d]=`rgb(${f},${b},${E})`}for(let d=0;d<v.rows;d++){const g=d*v.cols;for(let p=0;p<v.cols;p++){const f=v.data[g+p];f&&(i.fillStyle=m[f],i.fillRect(p*n,d*n,r,r))}}for(const d of O){i.save(),i.translate(d.x,d.y),i.rotate(d.rot),i.scale(d.scale,d.scale),i.fillStyle="#000000";const g=d.size/2;i.fillRect(-g,-g,d.size,d.size),i.restore()}i.lineWidth=s.splash.lineWidth;for(const d of V){const g=d.age/s.splash.life,p=(s.splash.startSize+(s.splash.endSize-s.splash.startSize)*g)*d.sizeMul,f=.7*(g<.8?1:(1-g)/.2);i.strokeStyle=`rgba(${s.splash.r},${s.splash.g},${s.splash.b},${f})`,i.save(),i.translate(d.x,d.y),i.rotate(d.rot);const b=p/2;i.strokeRect(-b,-b,p,p),i.restore()}i.fillStyle=`rgba(${s.splash.r},${s.splash.g},${s.splash.b},0.95)`,i.fillRect(o.x-2.5,o.y-2.5,5,5)}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class k{constructor(t,e,n,r,a="div"){this.parent=t,this.object=e,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(a),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),k.nextNameID=k.nextNameID||0,this.$name.id=`lil-gui-name-${++k.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class qt extends k{constructor(t,e,n){super(t,e,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function K(i){let t,e;return(t=i.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),e?"#"+e:!1}const te={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:K,toHexString:K},N={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},ee={isPrimitive:!1,match:i=>Array.isArray(i),fromHexString(i,t,e=1){const n=N.fromHexString(i);t[0]=(n>>16&255)/255*e,t[1]=(n>>8&255)/255*e,t[2]=(n&255)/255*e},toHexString([i,t,e],n=1){n=255/n;const r=i*n<<16^t*n<<8^e*n<<0;return N.toHexString(r)}},ie={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,t,e=1){const n=N.fromHexString(i);t.r=(n>>16&255)/255*e,t.g=(n>>8&255)/255*e,t.b=(n&255)/255*e},toHexString({r:i,g:t,b:e},n=1){n=255/n;const r=i*n<<16^t*n<<8^e*n<<0;return N.toHexString(r)}},ne=[te,N,ee,ie];function se(i){return ne.find(t=>t.match(i))}class re extends k{constructor(t,e,n,r){super(t,e,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=se(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const a=K(this.$text.value);a&&this._setValueFromHexString(a)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class W extends k{constructor(t,e,n){super(t,e,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class ae extends k{constructor(t,e,n,r,a,l){super(t,e,n,"number"),this._initInput(),this.min(r),this.max(a);const c=l!==void 0;this.step(c?l:this._getImplicitStep(),c),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=e*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let h=parseFloat(this.$input.value);isNaN(h)||(this._stepExplicit&&(h=this._snap(h)),this.setValue(this._clamp(h)))},n=h=>{const A=parseFloat(this.$input.value);isNaN(A)||(this._snapClampSetValue(A+h),this.$input.value=this.getValue())},r=h=>{h.key==="Enter"&&this.$input.blur(),h.code==="ArrowUp"&&(h.preventDefault(),n(this._step*this._arrowKeyMultiplier(h))),h.code==="ArrowDown"&&(h.preventDefault(),n(this._step*this._arrowKeyMultiplier(h)*-1))},a=h=>{this._inputFocused&&(h.preventDefault(),n(this._step*this._normalizeMouseWheel(h)))};let l=!1,c,m,d,g,p;const f=5,b=h=>{c=h.clientX,m=d=h.clientY,l=!0,g=this.getValue(),p=0,window.addEventListener("mousemove",E),window.addEventListener("mouseup",C)},E=h=>{if(l){const A=h.clientX-c,T=h.clientY-m;Math.abs(T)>f?(h.preventDefault(),this.$input.blur(),l=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(A)>f&&C()}if(!l){const A=h.clientY-d;p-=A*this._step*this._arrowKeyMultiplier(h),g+p>this._max?p=this._max-g:g+p<this._min&&(p=this._min-g),this._snapClampSetValue(g+p)}d=h.clientY},C=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",E),window.removeEventListener("mouseup",C)},L=()=>{this._inputFocused=!0},u=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",a,{passive:!1}),this.$input.addEventListener("mousedown",b),this.$input.addEventListener("focus",L),this.$input.addEventListener("blur",u)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(u,h,A,T,Ot)=>(u-h)/(A-h)*(Ot-T)+T,e=u=>{const h=this.$slider.getBoundingClientRect();let A=t(u,h.left,h.right,this._min,this._max);this._snapClampSetValue(A)},n=u=>{this._setDraggingStyle(!0),e(u.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",a)},r=u=>{e(u.clientX)},a=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",a)};let l=!1,c,m;const d=u=>{u.preventDefault(),this._setDraggingStyle(!0),e(u.touches[0].clientX),l=!1},g=u=>{u.touches.length>1||(this._hasScrollBar?(c=u.touches[0].clientX,m=u.touches[0].clientY,l=!0):d(u),window.addEventListener("touchmove",p,{passive:!1}),window.addEventListener("touchend",f))},p=u=>{if(l){const h=u.touches[0].clientX-c,A=u.touches[0].clientY-m;Math.abs(h)>Math.abs(A)?d(u):(window.removeEventListener("touchmove",p),window.removeEventListener("touchend",f))}else u.preventDefault(),e(u.touches[0].clientX)},f=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",p),window.removeEventListener("touchend",f)},b=this._callOnFinishChange.bind(this),E=400;let C;const L=u=>{if(Math.abs(u.deltaX)<Math.abs(u.deltaY)&&this._hasScrollBar)return;u.preventDefault();const A=this._normalizeMouseWheel(u)*this._step;this._snapClampSetValue(this.getValue()+A),this.$input.value=this.getValue(),clearTimeout(C),C=setTimeout(b,E)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",g,{passive:!1}),this.$slider.addEventListener("wheel",L,{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:n}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,n=-t.wheelDelta/120,n*=this._stepExplicit?1:10),e+-n}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){let e=0;return this._hasMin?e=this._min:this._hasMax&&(e=this._max),t-=e,t=Math.round(t/this._step)*this._step,t+=e,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class oe extends k{constructor(t,e,n,r){super(t,e,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(e=>{const n=document.createElement("option");n.textContent=e,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.textContent=e===-1?t:this._names[e],this}}class le extends k{constructor(t,e,n){super(t,e,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var de=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function he(i){const t=document.createElement("style");t.innerHTML=i;const e=document.querySelector("head link[rel=stylesheet], head style");e?document.head.insertBefore(t,e):document.head.appendChild(t)}let dt=!1;class nt{constructor({parent:t,autoPlace:e=t===void 0,container:n,width:r,title:a="Controls",closeFolders:l=!1,injectStyles:c=!0,touchStyles:m=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(a),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),m&&this.domElement.classList.add("allow-touch-styles"),!dt&&c&&(he(de),dt=!0),n?n.appendChild(this.domElement):e&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=l}add(t,e,n,r,a){if(Object(n)===n)return new oe(this,t,e,n);const l=t[e];switch(typeof l){case"number":return new ae(this,t,e,n,r,a);case"boolean":return new qt(this,t,e);case"string":return new le(this,t,e);case"function":return new W(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,l)}addColor(t,e,n=1){return new re(this,t,e,n)}addFolder(t){const e=new nt({parent:this,title:t});return this.root._closeFolders&&e.close(),e}load(t,e=!0){return t.controllers&&this.controllers.forEach(n=>{n instanceof W||n._name in t.controllers&&n.load(t.controllers[n._name])}),e&&t.folders&&this.folders.forEach(n=>{n._title in t.folders&&n.load(t.folders[n._title])}),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof W)){if(n._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);e.controllers[n._name]=n.save()}}),t&&this.folders.forEach(n=>{if(n._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);e.folders[n._title]=n.save()}),e}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("transition");const n=a=>{a.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const r=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}const x=i=>document.getElementById(i),ce=x("waterFill"),ue=x("cleanVal"),pe=x("timeVal"),ht=x("endOverlay"),ge=x("endTitle"),me=x("endVerdict"),fe=x("endTime"),ve=x("endClean"),we=x("endWater"),be=x("endEff"),ye=x("endEarned"),xe=x("endContinue"),ct=x("shopOverlay"),Ae=x("shopStart"),_e=x("shopBalance"),ut=x("upgradeList");function Ee(i,t,e){ce.style.width=`${Math.max(0,Math.min(1,i))*100}%`,ue.textContent=`${t.toFixed(0)}%`,pe.textContent=`${e.toFixed(1)}`}function Ce(i,t,e){ge.textContent=i.state==="won"?"clean!":"out of water",me.textContent=i.state==="won"?"wall is clean. nice flicks.":"tank ran dry before the wall was clean.",fe.textContent=`${i.durationSec.toFixed(1)}s`,ve.textContent=`${i.cleanedPct.toFixed(1)}%`,we.textContent=`${(i.waterLeft*100).toFixed(0)}%`,be.textContent=`${(i.efficiency*100).toFixed(0)}%`,ye.textContent=`+${t}`,document.body.classList.add("overlay-open"),ht.classList.add("show"),xe.onclick=()=>{ht.classList.remove("show"),e()}}function St(){_e.textContent=String(rt()),ut.innerHTML="";for(const i of Z){const t=D(i.id),e=wt(i,t),n=t>=i.maxLevel,r=!n&&rt()>=e,a=document.createElement("div");a.className="upgrade";const l=document.createElement("div");l.className="meta";const c=document.createElement("span");c.className="name",c.textContent=i.name;const m=document.createElement("span");m.className="lvl",m.textContent=`lvl ${t}/${i.maxLevel} · ${i.blurb}`,l.appendChild(c),l.appendChild(m);const d=document.createElement("button");d.textContent=n?"max":`buy · ${e}`,d.disabled=!r,d.addEventListener("click",()=>{Dt(i.id)&&St()}),a.appendChild(l),a.appendChild(d),ut.appendChild(a)}}function Se(i){St(),document.body.classList.add("overlay-open"),ct.classList.add("show"),Ae.onclick=()=>{ct.classList.remove("show"),document.body.classList.remove("overlay-open"),i()}}const $t=x("fps");function $e(i){$t.classList.toggle("show",i)}function Me(i){$t.textContent=`${i.toFixed(0)} fps`}const ke=JSON.parse(JSON.stringify(s)),Mt="psxwash:presets";let _=null,X=!1;function Y(){try{return JSON.parse(localStorage.getItem(Mt)||"{}")}catch{return{}}}function pt(i){localStorage.setItem(Mt,JSON.stringify(i))}function gt(i){for(const t of Object.keys(s)){const e=i[t],n=s[t];e&&typeof e=="object"&&typeof n=="object"?Object.assign(n,e):e!==void 0&&(s[t]=e)}_&&_.controllersRecursive().forEach(t=>t.updateDisplay())}function Le(i,t,e){return"#"+[i,t,e].map(n=>Math.round(n).toString(16).padStart(2,"0")).join("")}function Fe(i){const t=i.replace("#","");return{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}}function Oe(i,t){_=new nt({title:"tuning · tap top-left to hide",width:280}),_.hide();const e=_.addFolder("Stream");e.add(s.stream,"freeSpeed",50,800,1).name("free speed (px/s)"),e.add(s.stream,"eraseRadius",8,100,1).name("erase radius"),e.add(s.stream,"maxThrowSpeed",400,4e3,10).name("max throw speed"),e.add(s.stream,"minThrowSpeed",0,400,5).name("min throw speed"),e.add(s.stream,"velWindowMs",100,400,5).name("vel window (ms)"),e.add(s.stream,"bounceNudgeRad",0,.3,.005).name("bounce nudge (rad)");const n=_.addFolder("Edge Snap");n.add(s.edgeSnap,"dist",10,200,1).name("dist (px)"),n.add(s.edgeSnap,"tan",0,1.5,.01).name("slow tan"),n.add(s.edgeSnap,"tanFast",0,2,.01).name("fast tan");const r=_.addFolder("Grid");r.add(s.grid,"chunkSize",4,64,1).name("chunk size").onFinishChange(()=>z(i(),t())),r.add(s.grid,"chunkGap",0,6,1).name("chunk gap").onFinishChange(()=>z(i(),t())),r.add(s.grid,"chunkHp",1,5,1).name("chunk HP (layers)").onFinishChange(()=>z(i(),t()));const a=_.addFolder("Tiles");a.add(s.tiles,"gravity",0,6e3,50).name("gravity"),a.add(s.tiles,"knockBase",0,400,5).name("knock base"),a.add(s.tiles,"knockVar",0,400,5).name("knock variance"),a.add(s.tiles,"streamInherit",0,1,.01).name("stream inherit"),a.add(s.tiles,"rotMax",0,20,.1).name("rot max (rad/s)"),a.add(s.tiles,"shrink",0,8,.1).name("shrink rate"),a.add(s.tiles,"upwardKick",-300,100,5).name("upward kick");const l=_.addFolder("Splash");l.add(s.splash,"spawnHz",0,200,1).name("spawn Hz"),l.add(s.splash,"life",.02,1,.01).name("life (s)"),l.add(s.splash,"startSize",0,80,1).name("start size"),l.add(s.splash,"endSize",0,200,1).name("end size"),l.add(s.splash,"lineWidth",.5,8,.5).name("line width"),l.add(s.splash,"jitter",0,80,1).name("jitter");const c={color:Le(s.splash.r,s.splash.g,s.splash.b)};l.addColor(c,"color").name("color").onChange(u=>{const{r:h,g:A,b:T}=Fe(u);s.splash.r=h,s.splash.g=A,s.splash.b=T}),_.addFolder("Wall").addColor(s,"wallColor").name("wall color");const d=_.addFolder("Run");d.add(s.run,"tankSeconds",5,120,1).name("tank seconds"),d.add(s.run,"cleanTargetPct",10,100,1).name("clean target %"),d.add(s.run,"drainMultiplier",0,3,.05).name("drain multiplier");const g=_.addFolder("Presets"),p={name:"preset-1",selected:""};g.add(p,"name").name("name");let f=g.add(p,"selected",[""]).name("saved");function b(){const u=Y(),h=Object.keys(u);f=f.options(h.length?h:["(none)"]),h.length&&f.setValue(h[0])}b();const E={save(){const u=Y();u[p.name]=JSON.parse(JSON.stringify(s)),pt(u),b()},load(){const h=Y()[p.selected];h&&(gt(h),z(i(),t()))},delete(){const u=Y();delete u[p.selected],pt(u),b()},resetDefaults(){gt(ke),z(i(),t())}};g.add(E,"save").name("save preset"),g.add(E,"load").name("load preset"),g.add(E,"delete").name("delete preset"),g.add(E,"resetDefaults").name("reset to defaults");const C=_.addFolder("Debug");C.close();const L={showFps:!1};C.add(L,"showFps").name("show FPS").onChange(u=>$e(u)),C.add({wipeSave:()=>{It()}},"wipeSave").name("wipe save (currency + upgrades)")}function ze(){_&&(X=!X,X?_.show():_.hide())}const w={state:"playing",water:1,startTime:0,endTime:0,result:null};function De(){return w}function Ve(i){w.state="playing",w.water=1,w.startTime=i,w.endTime=0,w.result=null}function mt(i,t){const e=it()/Math.max(1,et()),n=Math.max(1e-4,1-w.water);return{state:i,durationSec:(t-w.startTime)/1e3,cleanedPct:e*100,waterLeft:w.water,efficiency:Math.min(1,e/n)}}function Te(i,t){if(w.state!=="playing")return!1;const e=1/Math.max(.001,y.tankSeconds)*y.drainMultiplier;return w.water=Math.max(0,w.water-e*i),it()/Math.max(1,et())*100>=s.run.cleanTargetPct?(w.state="won",w.endTime=t,w.result=mt("won",t),!1):w.water<=0?(w.state="lost",w.endTime=t,w.result=mt("lost",t),!1):!0}const I=document.getElementById("stage"),kt=I.getContext("2d"),Ie=document.getElementById("reset");let M=0,S=0,B=1;function Lt(){B=Math.min(window.devicePixelRatio||1,2),M=window.innerWidth,S=window.innerHeight,I.width=M*B,I.height=S*B,I.style.width=M+"px",I.style.height=S+"px",kt.setTransform(B,0,0,B,0,0),z(M,S)}function st(){z(M,S),Jt(),Zt(),yt(M,S),Et(!0),Ve(performance.now())}Yt(I,()=>M,()=>S);Oe(()=>M,()=>S);Ht(ze);Ie.addEventListener("click",i=>{i.stopPropagation(),st()});let U=performance.now();const H=[];let ft=0;function Ft(){const i=performance.now();let t=(i-U)/1e3;U=i,t>.05&&(t=.05),bt();const e=De();if(e.state==="playing"){Rt(t,M,S,Pt(),Kt),Gt(Wt),Ut(t),Xt(t,S);const n=Te(t,i),r=it()/Math.max(1,et())*100;if(Ee(e.water,r,(i-e.startTime)/1e3),!n&&e.result){Et(!1);const a=Vt(e.result),l=e.result;Ce(l,a,()=>{Se(st)})}}for(Qt(kt,M,S),H.push(i);H.length&&i-H[0]>1e3;)H.shift();i-ft>200&&(Me(H.length),ft=i),requestAnimationFrame(Ft)}window.addEventListener("resize",()=>{Lt(),yt(M,S)});Lt();bt();st();U=performance.now();Ft();
