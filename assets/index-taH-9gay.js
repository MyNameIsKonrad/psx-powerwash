(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=i(r);fetch(r.href,a)}})();const s={stream:{freeSpeed:280,eraseRadius:32,maxThrowSpeed:1800,minThrowSpeed:120,velWindowMs:180,bounceNudgeRad:2*Math.PI/180},edgeSnap:{dist:60,tan:.36,tanFast:.7},grid:{chunkSize:22,chunkGap:1,chunkHp:1},tiles:{gravity:2600,knockBase:110,knockVar:55,streamInherit:.18,rotMax:6,shrink:2.4,upwardKick:-50},splash:{spawnHz:50,life:.15,startSize:12,endSize:36,lineWidth:2,jitter:14,r:124,g:196,b:255},wallColor:"#6e7884",display:{virtualWidth:1280,virtualHeight:720,letterbox:"#06080b"},keyboard:{accel:2400,maxSpeed:900,perpBrake:3.5},run:{tankSeconds:30,cleanTargetPct:80,drainMultiplier:1}},kt="psxwash:save",Pt=[{id:"tank",name:"tank size",blurb:"+10% water capacity",baseCost:25,costGrowth:1.6,maxLevel:8},{id:"pressure",name:"stream pressure",blurb:"+8% free speed",baseCost:30,costGrowth:1.7,maxLevel:8},{id:"nozzle",name:"nozzle width",blurb:"+6% erase radius",baseCost:40,costGrowth:1.8,maxLevel:6},{id:"recovery",name:"water recovery",blurb:"-5% drain rate",baseCost:50,costGrowth:1.9,maxLevel:5},{id:"payout",name:"soap subsidy",blurb:"+10% currency earned",baseCost:60,costGrowth:2,maxLevel:6}];function B(){return{currency:0,levels:Object.fromEntries(Pt.map(e=>[e.id,0]))}}let ht=Gt();function Gt(){try{const e=localStorage.getItem(kt);if(!e)return B();const t=JSON.parse(e);return{...B(),...t,levels:{...B().levels,...t.levels||{}}}}catch{return B()}}function Yt(){localStorage.setItem(kt,JSON.stringify(ht))}function Y(e){return ht.levels[e]??0}function Kt(){return{tankMul:1+.1*Y("tank"),speedMul:1+.08*Y("pressure"),radiusMul:1+.06*Y("nozzle"),drainMul:1-.05*Y("recovery")}}function Nt(){ht=B(),Yt()}const E={freeSpeed:280,eraseRadius:32,eraseRadiusSq:32*32,tankSeconds:30,drainMultiplier:1};function $t(){const e=Kt();E.freeSpeed=s.stream.freeSpeed*e.speedMul,E.eraseRadius=s.stream.eraseRadius*e.radiusMul,E.eraseRadiusSq=E.eraseRadius*E.eraseRadius,E.tankSeconds=s.run.tankSeconds*e.tankMul,E.drainMultiplier=s.run.drainMultiplier*e.drainMul}const w=new Set;let K=null,N=null;function Wt(e){K=e.onPause,N=e.onRestart,window.addEventListener("keydown",t=>{t.repeat||(w.add(t.code),!(t.ctrlKey||t.metaKey||t.altKey)&&(t.code==="Escape"&&(t.preventDefault(),K==null||K()),t.code==="KeyR"&&(t.preventDefault(),N==null||N())))}),window.addEventListener("keyup",t=>{w.delete(t.code)}),window.addEventListener("blur",()=>w.clear())}function jt(){let e=0,t=0;return(w.has("ArrowLeft")||w.has("KeyA"))&&(e-=1),(w.has("ArrowRight")||w.has("KeyD"))&&(e+=1),(w.has("ArrowUp")||w.has("KeyW"))&&(t-=1),(w.has("ArrowDown")||w.has("KeyS"))&&(t+=1),{x:e,y:t}}function Xt(){return w.has("ArrowLeft")||w.has("ArrowRight")||w.has("ArrowUp")||w.has("ArrowDown")||w.has("KeyA")||w.has("KeyD")||w.has("KeyW")||w.has("KeyS")}const et=.18;let j=null,q=!1;const vt=[];let X=null,J=null,U=null;function Jt(e){X=e.onPause,J=e.onRestart,U=e.onToggleGui,window.addEventListener("gamepadconnected",()=>{q=!0}),window.addEventListener("gamepaddisconnected",()=>{const t=navigator.getGamepads?navigator.getGamepads():[];q=Array.from(t).some(i=>!!i&&i.connected)})}function Ut(){if(!navigator.getGamepads)return;const e=navigator.getGamepads();let t=null;for(const l of e)if(l&&l.connected){t=l;break}if(!t){j=null;return}q=!0;for(let l=0;l<t.buttons.length;l++){const h=t.buttons[l].pressed,g=vt[l]||!1;h&&!g&&(l===9?X==null||X():l===3?J==null||J():l===2&&(U==null||U())),vt[l]=h}const i=t.axes[0]??0,n=t.axes[1]??0,r=Math.hypot(i,n);if(r<et){j=null;return}const a=Math.min(1,(r-et)/(1-et));j={x:i/r,y:n/r,mag:a}}function Zt(){return j}function qt(){return q}function Qt(){if(Xt()){const t=jt(),i=Math.hypot(t.x,t.y)||1;return{x:t.x/i,y:t.y/i,mag:1}}const e=Zt();return e?{x:e.x,y:e.y,mag:e.mag}:null}const o={x:0,y:0,vx:0,vy:0};function Ct(e,t){o.x=e/2,o.y=t/2;const i=Math.random()*Math.PI*2;o.vx=Math.cos(i)*E.freeSpeed,o.vy=Math.sin(i)*E.freeSpeed}function te(e,t,i,n,r){if(n)return;const a=Qt();if(a){o.vx+=a.x*s.keyboard.accel*a.mag*e,o.vy+=a.y*s.keyboard.accel*a.mag*e;const g=o.vx*-a.y+o.vy*a.x,d=Math.min(1,s.keyboard.perpBrake*a.mag*e);o.vx-=-a.y*g*d,o.vy-=a.x*g*d;const p=Math.hypot(o.vx,o.vy);p>s.keyboard.maxSpeed&&(o.vx=o.vx/p*s.keyboard.maxSpeed,o.vy=o.vy/p*s.keyboard.maxSpeed)}o.x+=o.vx*e,o.y+=o.vy*e;const l=E.eraseRadius*.5;let h=!1;if(o.x<l&&(o.x=l,o.vx=Math.abs(o.vx),h=!0),o.x>t-l&&(o.x=t-l,o.vx=-Math.abs(o.vx),h=!0),o.y<l&&(o.y=l,o.vy=Math.abs(o.vy),h=!0),o.y>i-l&&(o.y=i-l,o.vy=-Math.abs(o.vy),h=!0),h){const g=Math.hypot(o.vx,o.vy),d=Math.atan2(o.vy,o.vx)+(Math.random()*2-1)*s.stream.bounceNudgeRad;o.vx=Math.cos(d)*g,o.vy=Math.sin(d)*g,r(o.x,o.y)}}function ee(e,t,i,n){const r=Math.hypot(e,t),a=s.stream.minThrowSpeed,l=s.stream.maxThrowSpeed,h=Math.max(0,Math.min(1,(r-a)/(l-a))),g=s.edgeSnap.tan+h*(s.edgeSnap.tanFast-s.edgeSnap.tan),d=s.edgeSnap.dist,p=o.y<d,u=o.y>n-d,v=o.x<d,y=o.x>i-d;return(p||u)&&Math.abs(t)<Math.abs(e)*g?{vx:Math.sign(e)*r,vy:0}:(v||y)&&Math.abs(e)<Math.abs(t)*g?{vx:0,vy:Math.sign(t)*r}:{vx:e,vy:t}}let P=!1,Mt=0,Lt=0,ct=()=>0,ut=()=>0;const yt=80;let rt=null;function ie(e){rt=e}let Ft=!0;function ne(e){Ft=e}const L=[];function se(){return P}function re(){const e=E.eraseRadius*.5,t=ct(),i=ut();o.x<e&&(o.x=e),o.x>t-e&&(o.x=t-e),o.y<e&&(o.y=e),o.y>i-e&&(o.y=i-e)}function wt(e,t){if(e<yt&&t<yt&&rt){rt();return}Ft&&(P=!0,Mt=o.x-e,Lt=o.y-t,L.length=0,L.push({x:e,y:t,t:performance.now()}))}function bt(e,t){if(!P)return;o.x=e+Mt,o.y=t+Lt,re(),L.push({x:e,y:t,t:performance.now()});const i=performance.now()-s.stream.velWindowMs-20;for(;L.length>1&&L[0].t<i;)L.shift()}function it(){if(!P)return;P=!1;const t=performance.now()-s.stream.velWindowMs;let i=L[0];for(const h of L)if(h.t>=t){i=h;break}const n=L[L.length-1];let r=0,a=0;if(i&&n&&n.t>i.t){const h=(n.t-i.t)/1e3;r=(n.x-i.x)/h,a=(n.y-i.y)/h}const l=Math.hypot(r,a);if(l>s.stream.maxThrowSpeed&&(r=r/l*s.stream.maxThrowSpeed,a=a/l*s.stream.maxThrowSpeed),l<s.stream.minThrowSpeed){const h=Math.random()*Math.PI*2;o.vx=Math.cos(h)*E.freeSpeed,o.vy=Math.sin(h)*E.freeSpeed}else{const h=ct(),g=ut(),d=ee(r,a,h,g);o.vx=d.vx,o.vy=d.vy}L.length=0}function ae(e,t,i,n){ct=t,ut=i,e.addEventListener("touchstart",r=>{r.preventDefault();const a=r.touches[0],l=n(a.clientX,a.clientY);wt(l.x,l.y)},{passive:!1}),e.addEventListener("touchmove",r=>{r.preventDefault();const a=r.touches[0],l=n(a.clientX,a.clientY);bt(l.x,l.y)},{passive:!1}),e.addEventListener("touchend",r=>{r.preventDefault(),it()},{passive:!1}),e.addEventListener("touchcancel",r=>{r.preventDefault(),it()},{passive:!1}),e.addEventListener("mousedown",r=>{if(r.button!==0)return;const a=n(r.clientX,r.clientY);wt(a.x,a.y)}),window.addEventListener("mousemove",r=>{const a=n(r.clientX,r.clientY);bt(a.x,a.y)}),window.addEventListener("mouseup",r=>{r.button===0&&it()})}const x={cols:0,rows:0,data:new Uint8Array(0),initialAlive:0};function z(e,t){const i=s.grid.chunkSize;x.cols=Math.ceil(e/i),x.rows=Math.ceil(t/i),x.data=new Uint8Array(x.cols*x.rows);const n=Math.max(1,s.grid.chunkHp|0);x.data.fill(n),x.initialAlive=x.cols*x.rows}function oe(e){const t=s.grid.chunkSize,i=E.eraseRadius,n=E.eraseRadiusSq,r=Math.max(0,Math.floor((o.x-i)/t)),a=Math.min(x.cols-1,Math.floor((o.x+i)/t)),l=Math.max(0,Math.floor((o.y-i)/t)),h=Math.min(x.rows-1,Math.floor((o.y+i)/t));for(let g=l;g<=h;g++)for(let d=r;d<=a;d++){const p=g*x.cols+d,u=x.data[p];if(u===0)continue;const v=d*t+t/2,y=g*t+t/2,S=v-o.x,k=y-o.y;if(S*S+k*k<=n){const M=u-1;x.data[p]=M,M===0&&e(v,y)}}}const O=[],le=1200;function de(e,t){const i=e-o.x,n=t-o.y,r=Math.hypot(i,n)||1,a=i/r,l=n/r,h=Math.hypot(o.vx,o.vy)||1,g=s.tiles.streamInherit,d=o.vx/h*g*h,p=o.vy/h*g*h,u=s.tiles.knockBase+Math.random()*s.tiles.knockVar;O.length>=le&&O.shift(),O.push({x:e,y:t,vx:a*u+d,vy:l*u+p+s.tiles.upwardKick,rot:(Math.random()-.5)*.4,rotV:(Math.random()*2-1)*s.tiles.rotMax,size:s.grid.chunkSize-s.grid.chunkGap,scale:1})}function he(e,t){for(let i=O.length-1;i>=0;i--){const n=O[i];n.vy+=s.tiles.gravity*e,n.x+=n.vx*e,n.y+=n.vy*e,n.rot+=n.rotV*e,n.scale-=s.tiles.shrink*e,(n.y>t+80||n.scale<=.05)&&O.splice(i,1)}}function ce(){O.length=0}const I=[];let Z=0;function Dt(e,t,i=1){const n=Math.random()*s.splash.jitter,r=Math.random()*Math.PI*2;I.push({x:e+Math.cos(r)*n,y:t+Math.sin(r)*n,rot:Math.random()*Math.PI*2,age:0,sizeMul:i})}function ue(e,t){for(let i=0;i<5;i++)Dt(e,t,1.35);typeof navigator<"u"&&navigator.vibrate&&navigator.vibrate(12)}function pe(e){Z+=e;const t=1/s.splash.spawnHz;for(;Z>t;)Dt(o.x,o.y),Z-=t;for(let i=I.length-1;i>=0;i--)I[i].age+=e,I[i].age>=s.splash.life&&I.splice(i,1)}function ge(){I.length=0,Z=0}function me(e,t,i){e.fillStyle=s.wallColor,e.fillRect(0,0,t,i);const n=s.grid.chunkSize,r=n-s.grid.chunkGap,a=Math.max(1,s.grid.chunkHp|0),l={r:0,g:0,b:0},h={r:130,g:86,b:48},g=[];for(let d=1;d<=a;d++){const p=(a-d)/Math.max(1,a-1),u=a===1?0:p,v=Math.round(l.r+(h.r-l.r)*u),y=Math.round(l.g+(h.g-l.g)*u),S=Math.round(l.b+(h.b-l.b)*u);g[d]=`rgb(${v},${y},${S})`}for(let d=0;d<x.rows;d++){const p=d*x.cols;for(let u=0;u<x.cols;u++){const v=x.data[p+u];v&&(e.fillStyle=g[v],e.fillRect(u*n,d*n,r,r))}}for(const d of O){e.save(),e.translate(d.x,d.y),e.rotate(d.rot),e.scale(d.scale,d.scale),e.fillStyle="#000000";const p=d.size/2;e.fillRect(-p,-p,d.size,d.size),e.restore()}e.lineWidth=s.splash.lineWidth;for(const d of I){const p=d.age/s.splash.life,u=(s.splash.startSize+(s.splash.endSize-s.splash.startSize)*p)*d.sizeMul,v=.7*(p<.8?1:(1-p)/.2);e.strokeStyle=`rgba(${s.splash.r},${s.splash.g},${s.splash.b},${v})`,e.save(),e.translate(d.x,d.y),e.rotate(d.rot);const y=u/2;e.strokeRect(-y,-y,u,u),e.restore()}e.fillStyle=`rgba(${s.splash.r},${s.splash.g},${s.splash.b},0.95)`,e.fillRect(o.x-2.5,o.y-2.5,5,5)}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class F{constructor(t,i,n,r,a="div"){this.parent=t,this.object=i,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(a),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),F.nextNameID=F.nextNameID||0,this.$name.id=`lil-gui-name-${++F.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const i=this.parent.add(this.object,this.property,t);return i.name(this._name),this.destroy(),i}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class fe extends F{constructor(t,i,n){super(t,i,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function at(e){let t,i;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?i=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),i?"#"+i:!1}const ve={isPrimitive:!0,match:e=>typeof e=="string",fromHexString:at,toHexString:at},G={isPrimitive:!0,match:e=>typeof e=="number",fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>"#"+e.toString(16).padStart(6,0)},ye={isPrimitive:!1,match:e=>Array.isArray(e),fromHexString(e,t,i=1){const n=G.fromHexString(e);t[0]=(n>>16&255)/255*i,t[1]=(n>>8&255)/255*i,t[2]=(n&255)/255*i},toHexString([e,t,i],n=1){n=255/n;const r=e*n<<16^t*n<<8^i*n<<0;return G.toHexString(r)}},we={isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,i=1){const n=G.fromHexString(e);t.r=(n>>16&255)/255*i,t.g=(n>>8&255)/255*i,t.b=(n&255)/255*i},toHexString({r:e,g:t,b:i},n=1){n=255/n;const r=e*n<<16^t*n<<8^i*n<<0;return G.toHexString(r)}},be=[ve,G,ye,we];function xe(e){return be.find(t=>t.match(e))}class Ae extends F{constructor(t,i,n,r){super(t,i,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=xe(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const a=at(this.$text.value);a&&this._setValueFromHexString(a)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const i=this._format.fromHexString(t);this.setValue(i)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class nt extends F{constructor(t,i,n){super(t,i,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Ee extends F{constructor(t,i,n,r,a,l){super(t,i,n,"number"),this._initInput(),this.min(r),this.max(a);const h=l!==void 0;this.step(h?l:this._getImplicitStep(),h),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,i=!0){return this._step=t,this._stepExplicit=i,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let i=(t-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let c=parseFloat(this.$input.value);isNaN(c)||(this._stepExplicit&&(c=this._snap(c)),this.setValue(this._clamp(c)))},n=c=>{const f=parseFloat(this.$input.value);isNaN(f)||(this._snapClampSetValue(f+c),this.$input.value=this.getValue())},r=c=>{c.key==="Enter"&&this.$input.blur(),c.code==="ArrowUp"&&(c.preventDefault(),n(this._step*this._arrowKeyMultiplier(c))),c.code==="ArrowDown"&&(c.preventDefault(),n(this._step*this._arrowKeyMultiplier(c)*-1))},a=c=>{this._inputFocused&&(c.preventDefault(),n(this._step*this._normalizeMouseWheel(c)))};let l=!1,h,g,d,p,u;const v=5,y=c=>{h=c.clientX,g=d=c.clientY,l=!0,p=this.getValue(),u=0,window.addEventListener("mousemove",S),window.addEventListener("mouseup",k)},S=c=>{if(l){const f=c.clientX-h,_=c.clientY-g;Math.abs(_)>v?(c.preventDefault(),this.$input.blur(),l=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(f)>v&&k()}if(!l){const f=c.clientY-d;u-=f*this._step*this._arrowKeyMultiplier(c),p+u>this._max?u=this._max-p:p+u<this._min&&(u=this._min-p),this._snapClampSetValue(p+u)}d=c.clientY},k=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",S),window.removeEventListener("mouseup",k)},M=()=>{this._inputFocused=!0},m=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",a,{passive:!1}),this.$input.addEventListener("mousedown",y),this.$input.addEventListener("focus",M),this.$input.addEventListener("blur",m)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(m,c,f,_,tt)=>(m-c)/(f-c)*(tt-_)+_,i=m=>{const c=this.$slider.getBoundingClientRect();let f=t(m,c.left,c.right,this._min,this._max);this._snapClampSetValue(f)},n=m=>{this._setDraggingStyle(!0),i(m.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",a)},r=m=>{i(m.clientX)},a=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",a)};let l=!1,h,g;const d=m=>{m.preventDefault(),this._setDraggingStyle(!0),i(m.touches[0].clientX),l=!1},p=m=>{m.touches.length>1||(this._hasScrollBar?(h=m.touches[0].clientX,g=m.touches[0].clientY,l=!0):d(m),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",v))},u=m=>{if(l){const c=m.touches[0].clientX-h,f=m.touches[0].clientY-g;Math.abs(c)>Math.abs(f)?d(m):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",v))}else m.preventDefault(),i(m.touches[0].clientX)},v=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",v)},y=this._callOnFinishChange.bind(this),S=400;let k;const M=m=>{if(Math.abs(m.deltaX)<Math.abs(m.deltaY)&&this._hasScrollBar)return;m.preventDefault();const f=this._normalizeMouseWheel(m)*this._step;this._snapClampSetValue(this.getValue()+f),this.$input.value=this.getValue(),clearTimeout(k),k=setTimeout(y,S)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",p,{passive:!1}),this.$slider.addEventListener("wheel",M,{passive:!1})}_setDraggingStyle(t,i="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${i}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:i,deltaY:n}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(i=0,n=-t.wheelDelta/120,n*=this._stepExplicit?1:10),i+-n}_arrowKeyMultiplier(t){let i=this._stepExplicit?1:10;return t.shiftKey?i*=10:t.altKey&&(i/=10),i}_snap(t){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),t-=i,t=Math.round(t/this._step)*this._step,t+=i,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class _e extends F{constructor(t,i,n,r){super(t,i,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(i=>{const n=document.createElement("option");n.textContent=i,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),i=this._values.indexOf(t);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?t:this._names[i],this}}class Se extends F{constructor(t,i,n){super(t,i,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var ke=`.lil-gui {
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
}`;function $e(e){const t=document.createElement("style");t.innerHTML=e;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(t,i):document.head.appendChild(t)}let xt=!1;class pt{constructor({parent:t,autoPlace:i=t===void 0,container:n,width:r,title:a="Controls",closeFolders:l=!1,injectStyles:h=!0,touchStyles:g=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(a),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),g&&this.domElement.classList.add("allow-touch-styles"),!xt&&h&&($e(ke),xt=!0),n?n.appendChild(this.domElement):i&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=l}add(t,i,n,r,a){if(Object(n)===n)return new _e(this,t,i,n);const l=t[i];switch(typeof l){case"number":return new Ee(this,t,i,n,r,a);case"boolean":return new fe(this,t,i);case"string":return new Se(this,t,i);case"function":return new nt(this,t,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,t,`
	value:`,l)}addColor(t,i,n=1){return new Ae(this,t,i,n)}addFolder(t){const i=new pt({parent:this,title:t});return this.root._closeFolders&&i.close(),i}load(t,i=!0){return t.controllers&&this.controllers.forEach(n=>{n instanceof nt||n._name in t.controllers&&n.load(t.controllers[n._name])}),i&&t.folders&&this.folders.forEach(n=>{n._title in t.folders&&n.load(t.folders[n._title])}),this}save(t=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof nt)){if(n._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);i.controllers[n._name]=n.save()}}),t&&this.folders.forEach(n=>{if(n._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);i.folders[n._title]=n.save()}),i}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("transition");const n=a=>{a.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const r=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(i=>{t=t.concat(i.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(i=>{t=t.concat(i.foldersRecursive())}),t}}const A=e=>document.getElementById(e);A("waterFill");A("cleanVal");A("timeVal");A("endOverlay");A("endTitle");A("endVerdict");A("endTime");A("endClean");A("endWater");A("endEff");A("endEarned");A("endContinue");A("shopOverlay");A("shopStart");A("shopBalance");A("upgradeList");const Ce=A("fps");function Me(e){Ce.classList.toggle("show",e)}const Le=JSON.parse(JSON.stringify(s)),Ot="psxwash:presets";let b=null,st=!1;function W(){try{return JSON.parse(localStorage.getItem(Ot)||"{}")}catch{return{}}}function At(e){localStorage.setItem(Ot,JSON.stringify(e))}function Et(e){for(const t of Object.keys(s)){const i=e[t],n=s[t];i&&typeof i=="object"&&typeof n=="object"?Object.assign(n,i):i!==void 0&&(s[t]=i)}b&&b.controllersRecursive().forEach(t=>t.updateDisplay())}function Fe(e,t,i){return"#"+[e,t,i].map(n=>Math.round(n).toString(16).padStart(2,"0")).join("")}function De(e){const t=e.replace("#","");return{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}}function Oe(e,t){b=new pt({title:"tuning · tap top-left to hide",width:280}),b.hide();const i=b.addFolder("Stream");i.add(s.stream,"freeSpeed",50,800,1).name("free speed (px/s)"),i.add(s.stream,"eraseRadius",8,100,1).name("erase radius"),i.add(s.stream,"maxThrowSpeed",400,4e3,10).name("max throw speed"),i.add(s.stream,"minThrowSpeed",0,400,5).name("min throw speed"),i.add(s.stream,"velWindowMs",100,400,5).name("vel window (ms)"),i.add(s.stream,"bounceNudgeRad",0,.3,.005).name("bounce nudge (rad)");const n=b.addFolder("Edge Snap");n.add(s.edgeSnap,"dist",10,200,1).name("dist (px)"),n.add(s.edgeSnap,"tan",0,1.5,.01).name("slow tan"),n.add(s.edgeSnap,"tanFast",0,2,.01).name("fast tan");const r=b.addFolder("Grid");r.add(s.grid,"chunkSize",4,64,1).name("chunk size").onFinishChange(()=>z(e(),t())),r.add(s.grid,"chunkGap",0,6,1).name("chunk gap").onFinishChange(()=>z(e(),t())),r.add(s.grid,"chunkHp",1,5,1).name("chunk HP (layers)").onFinishChange(()=>z(e(),t()));const a=b.addFolder("Tiles");a.add(s.tiles,"gravity",0,6e3,50).name("gravity"),a.add(s.tiles,"knockBase",0,400,5).name("knock base"),a.add(s.tiles,"knockVar",0,400,5).name("knock variance"),a.add(s.tiles,"streamInherit",0,1,.01).name("stream inherit"),a.add(s.tiles,"rotMax",0,20,.1).name("rot max (rad/s)"),a.add(s.tiles,"shrink",0,8,.1).name("shrink rate"),a.add(s.tiles,"upwardKick",-300,100,5).name("upward kick");const l=b.addFolder("Splash");l.add(s.splash,"spawnHz",0,200,1).name("spawn Hz"),l.add(s.splash,"life",.02,1,.01).name("life (s)"),l.add(s.splash,"startSize",0,80,1).name("start size"),l.add(s.splash,"endSize",0,200,1).name("end size"),l.add(s.splash,"lineWidth",.5,8,.5).name("line width"),l.add(s.splash,"jitter",0,80,1).name("jitter");const h={color:Fe(s.splash.r,s.splash.g,s.splash.b)};l.addColor(h,"color").name("color").onChange(f=>{const{r:_,g:tt,b:Ht}=De(f);s.splash.r=_,s.splash.g=tt,s.splash.b=Ht}),b.addFolder("Wall").addColor(s,"wallColor").name("wall color");const d=b.addFolder("Display");d.add(s.display,"virtualWidth",640,3840,16).name("virtual width").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),d.add(s.display,"virtualHeight",360,2160,16).name("virtual height").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),d.addColor(s.display,"letterbox").name("letterbox color");const p=b.addFolder("Keyboard");p.add(s.keyboard,"accel",0,8e3,50).name("accel (px/s²)"),p.add(s.keyboard,"maxSpeed",0,3e3,25).name("max speed"),p.add(s.keyboard,"perpBrake",0,12,.1).name("perp brake");const u=b.addFolder("Run");u.add(s.run,"tankSeconds",5,120,1).name("tank seconds"),u.add(s.run,"cleanTargetPct",10,100,1).name("clean target %"),u.add(s.run,"drainMultiplier",0,3,.05).name("drain multiplier");const v=b.addFolder("Presets"),y={name:"preset-1",selected:""};v.add(y,"name").name("name");let S=v.add(y,"selected",[""]).name("saved");function k(){const f=W(),_=Object.keys(f);S=S.options(_.length?_:["(none)"]),_.length&&S.setValue(_[0])}k();const M={save(){const f=W();f[y.name]=JSON.parse(JSON.stringify(s)),At(f),k()},load(){const _=W()[y.selected];_&&(Et(_),z(e(),t()))},delete(){const f=W();delete f[y.selected],At(f),k()},resetDefaults(){Et(Le),z(e(),t())}};v.add(M,"save").name("save preset"),v.add(M,"load").name("load preset"),v.add(M,"delete").name("delete preset"),v.add(M,"resetDefaults").name("reset to defaults");const m=b.addFolder("Debug");m.close();const c={showFps:!1};m.add(c,"showFps").name("show FPS").onChange(f=>Me(f)),m.add({wipeSave:()=>{Nt()}},"wipeSave").name("wipe save (currency + upgrades)")}function gt(){b&&(st=!st,st?b.show():b.hide())}const V={state:"playing",water:1,startTime:0,endTime:0,result:null};function zt(){return V}function ze(e){V.state="playing",V.water=1,V.startTime=e,V.endTime=0,V.result=null}const D=document.getElementById("stage"),It=D.getContext("2d"),Ie=document.getElementById("reset"),Vt=document.getElementById("pauseOverlay");let C=s.display.virtualWidth,$=s.display.virtualHeight,T=1,R=1,ot=0,lt=0;function Tt(){C=s.display.virtualWidth,$=s.display.virtualHeight;const e=window.innerWidth,t=window.innerHeight;R=Math.min(e/C,t/$);const i=C*R,n=$*R;ot=(e-i)/2,lt=(t-n)/2,T=Math.min(window.devicePixelRatio||1,2),D.width=C*T,D.height=$*T,D.style.width=i+"px",D.style.height=n+"px",D.style.left=ot+"px",D.style.top=lt+"px",It.setTransform(T,0,0,T,0,0),z(C,$),document.documentElement.style.background=s.display.letterbox,document.body.style.background=s.display.letterbox}function Ve(e,t){return{x:(e-ot)/R,y:(t-lt)/R}}function Q(){z(C,$),ce(),ge(),Ct(C,$),ne(!0),H=!1,Vt.classList.remove("show"),ze(performance.now())}let H=!1;function mt(){zt().state==="playing"&&(H=!H,Vt.classList.toggle("show",H))}ae(D,()=>C,()=>$,Ve);Oe(()=>C,()=>$);Wt({onPause:mt,onRestart:Q});Jt({onPause:mt,onRestart:Q,onToggleGui:gt});ie(gt);window.addEventListener("keydown",e=>{e.code==="Backquote"&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&(e.preventDefault(),gt())});const _t=document.getElementById("pauseBtn");_t&&_t.addEventListener("click",e=>{e.stopPropagation(),mt()});const St=document.getElementById("hint"),Bt=matchMedia("(hover: none) and (pointer: coarse)").matches;function ft(){if(!St)return;const e=[];Bt?e.push("drag to throw","top-left to tune"):(e.push("drag to throw","WASD/arrows to thrust","esc to pause","R to restart","` to tune"),qt()&&e.push("gamepad: stick to thrust, start to pause, Y to restart")),St.textContent=e.join(" · ")}ft();window.addEventListener("gamepadconnected",ft);window.addEventListener("gamepaddisconnected",ft);if(Bt){const e=document.getElementById("reset");e&&(e.textContent="restart")}Ie.addEventListener("click",e=>{e.stopPropagation(),Q()});let dt=performance.now();function Rt(){const e=performance.now();let t=(e-dt)/1e3;dt=e,t>.05&&(t=.05),$t(),Ut(),zt().state==="playing"&&!H&&(te(t,C,$,se(),ue),oe(de),pe(t),he(t,$)),me(It,C,$),requestAnimationFrame(Rt)}window.addEventListener("resize",()=>{Tt(),Ct(C,$)});Tt();$t();Q();dt=performance.now();Rt();
