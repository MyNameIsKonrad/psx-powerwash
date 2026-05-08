(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=i(r);fetch(r.href,a)}})();const s={stream:{freeSpeed:280,eraseRadius:32,maxThrowSpeed:1800,minThrowSpeed:120,velWindowMs:180,bounceNudgeRad:2*Math.PI/180},edgeSnap:{dist:60,tan:.36,tanFast:.7},grid:{chunkSize:22,chunkGap:1,chunkHp:1},tiles:{gravity:2600,knockBase:110,knockVar:55,streamInherit:.18,rotMax:6,shrink:2.4,upwardKick:-50},splash:{spawnHz:50,life:.15,startSize:12,endSize:36,lineWidth:2,jitter:14,r:124,g:196,b:255},wallColor:"#6e7884",display:{virtualWidth:1280,virtualHeight:720,letterbox:"#06080b"},keyboard:{accel:2400,maxSpeed:900,perpBrake:3.5},run:{tankSeconds:30,cleanTargetPct:80,drainMultiplier:1}},Ct="psxwash:save",at=[{id:"tank",name:"tank size",blurb:"+10% water capacity",baseCost:25,costGrowth:1.6,maxLevel:8},{id:"pressure",name:"stream pressure",blurb:"+8% free speed",baseCost:30,costGrowth:1.7,maxLevel:8},{id:"nozzle",name:"nozzle width",blurb:"+6% erase radius",baseCost:40,costGrowth:1.8,maxLevel:6},{id:"recovery",name:"water recovery",blurb:"-5% drain rate",baseCost:50,costGrowth:1.9,maxLevel:5},{id:"payout",name:"soap subsidy",blurb:"+10% currency earned",baseCost:60,costGrowth:2,maxLevel:6}];function Y(){return{currency:0,levels:Object.fromEntries(at.map(e=>[e.id,0]))}}let z=Nt();function Nt(){try{const e=localStorage.getItem(Ct);if(!e)return Y();const t=JSON.parse(e);return{...Y(),...t,levels:{...Y().levels,...t.levels||{}}}}catch{return Y()}}function ot(){localStorage.setItem(Ct,JSON.stringify(z))}function pt(){return z.currency}function I(e){return z.levels[e]??0}function St(e,t){return Math.round(e.baseCost*Math.pow(e.costGrowth,t))}function Gt(e){const t=at.find(r=>r.id===e);if(!t)return!1;const i=I(e);if(i>=t.maxLevel)return!1;const n=St(t,i);return z.currency<n?!1:(z.currency-=n,z.levels[e]=i+1,ot(),!0)}function Wt(e){const t=e.state==="won"?60:20,i=e.cleanedPct/100*80,n=e.efficiency*40,r=1+.1*I("payout"),a=Math.round((t+i+n)*r);return z.currency+=a,ot(),a}function Kt(){return{tankMul:1+.1*I("tank"),speedMul:1+.08*I("pressure"),radiusMul:1+.06*I("nozzle"),drainMul:1-.05*I("recovery")}}function Xt(){z=Y(),ot()}const E={freeSpeed:280,eraseRadius:32,eraseRadiusSq:32*32,tankSeconds:30,drainMultiplier:1};function kt(){const e=Kt();E.freeSpeed=s.stream.freeSpeed*e.speedMul,E.eraseRadius=s.stream.eraseRadius*e.radiusMul,E.eraseRadiusSq=E.eraseRadius*E.eraseRadius,E.tankSeconds=s.run.tankSeconds*e.tankMul,E.drainMultiplier=s.run.drainMultiplier*e.drainMul}const x=new Set;let K=null,X=null;function jt(e){K=e.onPause,X=e.onRestart,window.addEventListener("keydown",t=>{t.repeat||(x.add(t.code),!(t.ctrlKey||t.metaKey||t.altKey)&&(t.code==="Escape"&&(t.preventDefault(),K==null||K()),t.code==="KeyR"&&(t.preventDefault(),X==null||X())))}),window.addEventListener("keyup",t=>{x.delete(t.code)}),window.addEventListener("blur",()=>x.clear())}function Jt(){let e=0,t=0;return(x.has("ArrowLeft")||x.has("KeyA"))&&(e-=1),(x.has("ArrowRight")||x.has("KeyD"))&&(e+=1),(x.has("ArrowUp")||x.has("KeyW"))&&(t-=1),(x.has("ArrowDown")||x.has("KeyS"))&&(t+=1),{x:e,y:t}}function Ut(){return x.has("ArrowLeft")||x.has("ArrowRight")||x.has("ArrowUp")||x.has("ArrowDown")||x.has("KeyA")||x.has("KeyD")||x.has("KeyW")||x.has("KeyS")}const o={x:0,y:0,vx:0,vy:0};function $t(e,t){o.x=e/2,o.y=t/2;const i=Math.random()*Math.PI*2;o.vx=Math.cos(i)*E.freeSpeed,o.vy=Math.sin(i)*E.freeSpeed}function Zt(e,t,i,n,r){if(n)return;if(Ut()){const h=Jt(),p=Math.hypot(h.x,h.y)||1,d=h.x/p,m=h.y/p;o.vx+=d*s.keyboard.accel*e,o.vy+=m*s.keyboard.accel*e;const c=o.vx*-m+o.vy*d,f=Math.min(1,s.keyboard.perpBrake*e);o.vx-=-m*c*f,o.vy-=d*c*f;const y=Math.hypot(o.vx,o.vy);y>s.keyboard.maxSpeed&&(o.vx=o.vx/y*s.keyboard.maxSpeed,o.vy=o.vy/y*s.keyboard.maxSpeed)}o.x+=o.vx*e,o.y+=o.vy*e;const a=E.eraseRadius*.5;let l=!1;if(o.x<a&&(o.x=a,o.vx=Math.abs(o.vx),l=!0),o.x>t-a&&(o.x=t-a,o.vx=-Math.abs(o.vx),l=!0),o.y<a&&(o.y=a,o.vy=Math.abs(o.vy),l=!0),o.y>i-a&&(o.y=i-a,o.vy=-Math.abs(o.vy),l=!0),l){const h=Math.hypot(o.vx,o.vy),p=Math.atan2(o.vy,o.vx)+(Math.random()*2-1)*s.stream.bounceNudgeRad;o.vx=Math.cos(p)*h,o.vy=Math.sin(p)*h,r(o.x,o.y)}}function Qt(e,t,i,n){const r=Math.hypot(e,t),a=s.stream.minThrowSpeed,l=s.stream.maxThrowSpeed,h=Math.max(0,Math.min(1,(r-a)/(l-a))),p=s.edgeSnap.tan+h*(s.edgeSnap.tanFast-s.edgeSnap.tan),d=s.edgeSnap.dist,m=o.y<d,c=o.y>n-d,f=o.x<d,y=o.x>i-d;return(m||c)&&Math.abs(t)<Math.abs(e)*p?{vx:Math.sign(e)*r,vy:0}:(f||y)&&Math.abs(e)<Math.abs(t)*p?{vx:0,vy:Math.sign(t)*r}:{vx:e,vy:t}}let H=!1,Mt=0,Lt=0,lt=()=>0,dt=()=>0;const mt=80;let et=null;function qt(e){et=e}let Ft=!0;function Dt(e){Ft=e,e||(H=!1)}const F=[];function te(){return H}function ee(){const e=E.eraseRadius*.5,t=lt(),i=dt();o.x<e&&(o.x=e),o.x>t-e&&(o.x=t-e),o.y<e&&(o.y=e),o.y>i-e&&(o.y=i-e)}function gt(e,t){if(e<mt&&t<mt&&et){et();return}Ft&&(H=!0,Mt=o.x-e,Lt=o.y-t,F.length=0,F.push({x:e,y:t,t:performance.now()}))}function ft(e,t){if(!H)return;o.x=e+Mt,o.y=t+Lt,ee(),F.push({x:e,y:t,t:performance.now()});const i=performance.now()-s.stream.velWindowMs-20;for(;F.length>1&&F[0].t<i;)F.shift()}function Q(){if(!H)return;H=!1;const t=performance.now()-s.stream.velWindowMs;let i=F[0];for(const h of F)if(h.t>=t){i=h;break}const n=F[F.length-1];let r=0,a=0;if(i&&n&&n.t>i.t){const h=(n.t-i.t)/1e3;r=(n.x-i.x)/h,a=(n.y-i.y)/h}const l=Math.hypot(r,a);if(l>s.stream.maxThrowSpeed&&(r=r/l*s.stream.maxThrowSpeed,a=a/l*s.stream.maxThrowSpeed),l<s.stream.minThrowSpeed){const h=Math.random()*Math.PI*2;o.vx=Math.cos(h)*E.freeSpeed,o.vy=Math.sin(h)*E.freeSpeed}else{const h=lt(),p=dt(),d=Qt(r,a,h,p);o.vx=d.vx,o.vy=d.vy}F.length=0}function ie(e,t,i,n){lt=t,dt=i,e.addEventListener("touchstart",r=>{r.preventDefault();const a=r.touches[0],l=n(a.clientX,a.clientY);gt(l.x,l.y)},{passive:!1}),e.addEventListener("touchmove",r=>{r.preventDefault();const a=r.touches[0],l=n(a.clientX,a.clientY);ft(l.x,l.y)},{passive:!1}),e.addEventListener("touchend",r=>{r.preventDefault(),Q()},{passive:!1}),e.addEventListener("touchcancel",r=>{r.preventDefault(),Q()},{passive:!1}),e.addEventListener("mousedown",r=>{if(r.button!==0)return;const a=n(r.clientX,r.clientY);gt(a.x,a.y)}),window.addEventListener("mousemove",r=>{const a=n(r.clientX,r.clientY);ft(a.x,a.y)}),window.addEventListener("mouseup",r=>{r.button===0&&Q()})}const w={cols:0,rows:0,data:new Uint8Array(0),initialAlive:0};function V(e,t){const i=s.grid.chunkSize;w.cols=Math.ceil(e/i),w.rows=Math.ceil(t/i),w.data=new Uint8Array(w.cols*w.rows);const n=Math.max(1,s.grid.chunkHp|0);w.data.fill(n),w.initialAlive=w.cols*w.rows}function ne(e){const t=s.grid.chunkSize,i=E.eraseRadius,n=E.eraseRadiusSq,r=Math.max(0,Math.floor((o.x-i)/t)),a=Math.min(w.cols-1,Math.floor((o.x+i)/t)),l=Math.max(0,Math.floor((o.y-i)/t)),h=Math.min(w.rows-1,Math.floor((o.y+i)/t));for(let p=l;p<=h;p++)for(let d=r;d<=a;d++){const m=p*w.cols+d,c=w.data[m];if(c===0)continue;const f=d*t+t/2,y=p*t+t/2,S=f-o.x,k=y-o.y;if(S*S+k*k<=n){const L=c-1;w.data[m]=L,L===0&&e(f,y)}}}function ht(){return w.initialAlive}function ct(){let e=0;const t=w.data;for(let i=0;i<t.length;i++)t[i]===0&&e++;return e}const T=[],se=1200;function re(e,t){const i=e-o.x,n=t-o.y,r=Math.hypot(i,n)||1,a=i/r,l=n/r,h=Math.hypot(o.vx,o.vy)||1,p=s.tiles.streamInherit,d=o.vx/h*p*h,m=o.vy/h*p*h,c=s.tiles.knockBase+Math.random()*s.tiles.knockVar;T.length>=se&&T.shift(),T.push({x:e,y:t,vx:a*c+d,vy:l*c+m+s.tiles.upwardKick,rot:(Math.random()-.5)*.4,rotV:(Math.random()*2-1)*s.tiles.rotMax,size:s.grid.chunkSize-s.grid.chunkGap,scale:1})}function ae(e,t){for(let i=T.length-1;i>=0;i--){const n=T[i];n.vy+=s.tiles.gravity*e,n.x+=n.vx*e,n.y+=n.vy*e,n.rot+=n.rotV*e,n.scale-=s.tiles.shrink*e,(n.y>t+80||n.scale<=.05)&&T.splice(i,1)}}function oe(){T.length=0}const R=[];let J=0;function Ot(e,t,i=1){const n=Math.random()*s.splash.jitter,r=Math.random()*Math.PI*2;R.push({x:e+Math.cos(r)*n,y:t+Math.sin(r)*n,rot:Math.random()*Math.PI*2,age:0,sizeMul:i})}function le(e,t){for(let i=0;i<5;i++)Ot(e,t,1.35);typeof navigator<"u"&&navigator.vibrate&&navigator.vibrate(12)}function de(e){J+=e;const t=1/s.splash.spawnHz;for(;J>t;)Ot(o.x,o.y),J-=t;for(let i=R.length-1;i>=0;i--)R[i].age+=e,R[i].age>=s.splash.life&&R.splice(i,1)}function he(){R.length=0,J=0}function ce(e,t,i){e.fillStyle=s.wallColor,e.fillRect(0,0,t,i);const n=s.grid.chunkSize,r=n-s.grid.chunkGap,a=Math.max(1,s.grid.chunkHp|0),l={r:0,g:0,b:0},h={r:130,g:86,b:48},p=[];for(let d=1;d<=a;d++){const m=(a-d)/Math.max(1,a-1),c=a===1?0:m,f=Math.round(l.r+(h.r-l.r)*c),y=Math.round(l.g+(h.g-l.g)*c),S=Math.round(l.b+(h.b-l.b)*c);p[d]=`rgb(${f},${y},${S})`}for(let d=0;d<w.rows;d++){const m=d*w.cols;for(let c=0;c<w.cols;c++){const f=w.data[m+c];f&&(e.fillStyle=p[f],e.fillRect(c*n,d*n,r,r))}}for(const d of T){e.save(),e.translate(d.x,d.y),e.rotate(d.rot),e.scale(d.scale,d.scale),e.fillStyle="#000000";const m=d.size/2;e.fillRect(-m,-m,d.size,d.size),e.restore()}e.lineWidth=s.splash.lineWidth;for(const d of R){const m=d.age/s.splash.life,c=(s.splash.startSize+(s.splash.endSize-s.splash.startSize)*m)*d.sizeMul,f=.7*(m<.8?1:(1-m)/.2);e.strokeStyle=`rgba(${s.splash.r},${s.splash.g},${s.splash.b},${f})`,e.save(),e.translate(d.x,d.y),e.rotate(d.rot);const y=c/2;e.strokeRect(-y,-y,c,c),e.restore()}e.fillStyle=`rgba(${s.splash.r},${s.splash.g},${s.splash.b},0.95)`,e.fillRect(o.x-2.5,o.y-2.5,5,5)}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class D{constructor(t,i,n,r,a="div"){this.parent=t,this.object=i,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(a),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),D.nextNameID=D.nextNameID||0,this.$name.id=`lil-gui-name-${++D.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const i=this.parent.add(this.object,this.property,t);return i.name(this._name),this.destroy(),i}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class ue extends D{constructor(t,i,n){super(t,i,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function it(e){let t,i;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?i=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),i?"#"+i:!1}const pe={isPrimitive:!0,match:e=>typeof e=="string",fromHexString:it,toHexString:it},W={isPrimitive:!0,match:e=>typeof e=="number",fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>"#"+e.toString(16).padStart(6,0)},me={isPrimitive:!1,match:e=>Array.isArray(e),fromHexString(e,t,i=1){const n=W.fromHexString(e);t[0]=(n>>16&255)/255*i,t[1]=(n>>8&255)/255*i,t[2]=(n&255)/255*i},toHexString([e,t,i],n=1){n=255/n;const r=e*n<<16^t*n<<8^i*n<<0;return W.toHexString(r)}},ge={isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,i=1){const n=W.fromHexString(e);t.r=(n>>16&255)/255*i,t.g=(n>>8&255)/255*i,t.b=(n&255)/255*i},toHexString({r:e,g:t,b:i},n=1){n=255/n;const r=e*n<<16^t*n<<8^i*n<<0;return W.toHexString(r)}},fe=[pe,W,me,ge];function ve(e){return fe.find(t=>t.match(e))}class ye extends D{constructor(t,i,n,r){super(t,i,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=ve(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const a=it(this.$text.value);a&&this._setValueFromHexString(a)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const i=this._format.fromHexString(t);this.setValue(i)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class q extends D{constructor(t,i,n){super(t,i,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class we extends D{constructor(t,i,n,r,a,l){super(t,i,n,"number"),this._initInput(),this.min(r),this.max(a);const h=l!==void 0;this.step(h?l:this._getImplicitStep(),h),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,i=!0){return this._step=t,this._stepExplicit=i,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let i=(t-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let u=parseFloat(this.$input.value);isNaN(u)||(this._stepExplicit&&(u=this._snap(u)),this.setValue(this._clamp(u)))},n=u=>{const v=parseFloat(this.$input.value);isNaN(v)||(this._snapClampSetValue(v+u),this.$input.value=this.getValue())},r=u=>{u.key==="Enter"&&this.$input.blur(),u.code==="ArrowUp"&&(u.preventDefault(),n(this._step*this._arrowKeyMultiplier(u))),u.code==="ArrowDown"&&(u.preventDefault(),n(this._step*this._arrowKeyMultiplier(u)*-1))},a=u=>{this._inputFocused&&(u.preventDefault(),n(this._step*this._normalizeMouseWheel(u)))};let l=!1,h,p,d,m,c;const f=5,y=u=>{h=u.clientX,p=d=u.clientY,l=!0,m=this.getValue(),c=0,window.addEventListener("mousemove",S),window.addEventListener("mouseup",k)},S=u=>{if(l){const v=u.clientX-h,C=u.clientY-p;Math.abs(C)>f?(u.preventDefault(),this.$input.blur(),l=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(v)>f&&k()}if(!l){const v=u.clientY-d;c-=v*this._step*this._arrowKeyMultiplier(u),m+c>this._max?c=this._max-m:m+c<this._min&&(c=this._min-m),this._snapClampSetValue(m+c)}d=u.clientY},k=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",S),window.removeEventListener("mouseup",k)},L=()=>{this._inputFocused=!0},g=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",a,{passive:!1}),this.$input.addEventListener("mousedown",y),this.$input.addEventListener("focus",L),this.$input.addEventListener("blur",g)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(g,u,v,C,Z)=>(g-u)/(v-u)*(Z-C)+C,i=g=>{const u=this.$slider.getBoundingClientRect();let v=t(g,u.left,u.right,this._min,this._max);this._snapClampSetValue(v)},n=g=>{this._setDraggingStyle(!0),i(g.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",a)},r=g=>{i(g.clientX)},a=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",a)};let l=!1,h,p;const d=g=>{g.preventDefault(),this._setDraggingStyle(!0),i(g.touches[0].clientX),l=!1},m=g=>{g.touches.length>1||(this._hasScrollBar?(h=g.touches[0].clientX,p=g.touches[0].clientY,l=!0):d(g),window.addEventListener("touchmove",c,{passive:!1}),window.addEventListener("touchend",f))},c=g=>{if(l){const u=g.touches[0].clientX-h,v=g.touches[0].clientY-p;Math.abs(u)>Math.abs(v)?d(g):(window.removeEventListener("touchmove",c),window.removeEventListener("touchend",f))}else g.preventDefault(),i(g.touches[0].clientX)},f=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",c),window.removeEventListener("touchend",f)},y=this._callOnFinishChange.bind(this),S=400;let k;const L=g=>{if(Math.abs(g.deltaX)<Math.abs(g.deltaY)&&this._hasScrollBar)return;g.preventDefault();const v=this._normalizeMouseWheel(g)*this._step;this._snapClampSetValue(this.getValue()+v),this.$input.value=this.getValue(),clearTimeout(k),k=setTimeout(y,S)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",m,{passive:!1}),this.$slider.addEventListener("wheel",L,{passive:!1})}_setDraggingStyle(t,i="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${i}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:i,deltaY:n}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(i=0,n=-t.wheelDelta/120,n*=this._stepExplicit?1:10),i+-n}_arrowKeyMultiplier(t){let i=this._stepExplicit?1:10;return t.shiftKey?i*=10:t.altKey&&(i/=10),i}_snap(t){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),t-=i,t=Math.round(t/this._step)*this._step,t+=i,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class be extends D{constructor(t,i,n,r){super(t,i,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(i=>{const n=document.createElement("option");n.textContent=i,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),i=this._values.indexOf(t);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?t:this._names[i],this}}class xe extends D{constructor(t,i,n){super(t,i,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Ae=`.lil-gui {
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
}`;function Ee(e){const t=document.createElement("style");t.innerHTML=e;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(t,i):document.head.appendChild(t)}let vt=!1;class ut{constructor({parent:t,autoPlace:i=t===void 0,container:n,width:r,title:a="Controls",closeFolders:l=!1,injectStyles:h=!0,touchStyles:p=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(a),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),p&&this.domElement.classList.add("allow-touch-styles"),!vt&&h&&(Ee(Ae),vt=!0),n?n.appendChild(this.domElement):i&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=l}add(t,i,n,r,a){if(Object(n)===n)return new be(this,t,i,n);const l=t[i];switch(typeof l){case"number":return new we(this,t,i,n,r,a);case"boolean":return new ue(this,t,i);case"string":return new xe(this,t,i);case"function":return new q(this,t,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,t,`
	value:`,l)}addColor(t,i,n=1){return new ye(this,t,i,n)}addFolder(t){const i=new ut({parent:this,title:t});return this.root._closeFolders&&i.close(),i}load(t,i=!0){return t.controllers&&this.controllers.forEach(n=>{n instanceof q||n._name in t.controllers&&n.load(t.controllers[n._name])}),i&&t.folders&&this.folders.forEach(n=>{n._title in t.folders&&n.load(t.folders[n._title])}),this}save(t=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof q)){if(n._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);i.controllers[n._name]=n.save()}}),t&&this.folders.forEach(n=>{if(n._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);i.folders[n._title]=n.save()}),i}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("transition");const n=a=>{a.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const r=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(i=>{t=t.concat(i.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(i=>{t=t.concat(i.foldersRecursive())}),t}}const _=e=>document.getElementById(e),_e=_("waterFill"),Ce=_("cleanVal"),Se=_("timeVal"),yt=_("endOverlay"),ke=_("endTitle"),$e=_("endVerdict"),Me=_("endTime"),Le=_("endClean"),Fe=_("endWater"),De=_("endEff"),Oe=_("endEarned"),ze=_("endContinue"),wt=_("shopOverlay"),Te=_("shopStart"),Ve=_("shopBalance"),bt=_("upgradeList");function Ie(e,t,i){_e.style.width=`${Math.max(0,Math.min(1,e))*100}%`,Ce.textContent=`${t.toFixed(0)}%`,Se.textContent=`${i.toFixed(1)}`}function Re(e,t,i){ke.textContent=e.state==="won"?"clean!":"out of water",$e.textContent=e.state==="won"?"wall is clean. nice flicks.":"tank ran dry before the wall was clean.",Me.textContent=`${e.durationSec.toFixed(1)}s`,Le.textContent=`${e.cleanedPct.toFixed(1)}%`,Fe.textContent=`${(e.waterLeft*100).toFixed(0)}%`,De.textContent=`${(e.efficiency*100).toFixed(0)}%`,Oe.textContent=`+${t}`,document.body.classList.add("overlay-open"),yt.classList.add("show"),ze.onclick=()=>{yt.classList.remove("show"),i()}}function zt(){Ve.textContent=String(pt()),bt.innerHTML="";for(const e of at){const t=I(e.id),i=St(e,t),n=t>=e.maxLevel,r=!n&&pt()>=i,a=document.createElement("div");a.className="upgrade";const l=document.createElement("div");l.className="meta";const h=document.createElement("span");h.className="name",h.textContent=e.name;const p=document.createElement("span");p.className="lvl",p.textContent=`lvl ${t}/${e.maxLevel} · ${e.blurb}`,l.appendChild(h),l.appendChild(p);const d=document.createElement("button");d.textContent=n?"max":`buy · ${i}`,d.disabled=!r,d.addEventListener("click",()=>{Gt(e.id)&&zt()}),a.appendChild(l),a.appendChild(d),bt.appendChild(a)}}function He(e){zt(),document.body.classList.add("overlay-open"),wt.classList.add("show"),Te.onclick=()=>{wt.classList.remove("show"),document.body.classList.remove("overlay-open"),e()}}const Tt=_("fps");function Be(e){Tt.classList.toggle("show",e)}function Pe(e){Tt.textContent=`${e.toFixed(0)} fps`}const Ye=JSON.parse(JSON.stringify(s)),Vt="psxwash:presets";let A=null,tt=!1;function j(){try{return JSON.parse(localStorage.getItem(Vt)||"{}")}catch{return{}}}function xt(e){localStorage.setItem(Vt,JSON.stringify(e))}function At(e){for(const t of Object.keys(s)){const i=e[t],n=s[t];i&&typeof i=="object"&&typeof n=="object"?Object.assign(n,i):i!==void 0&&(s[t]=i)}A&&A.controllersRecursive().forEach(t=>t.updateDisplay())}function Ne(e,t,i){return"#"+[e,t,i].map(n=>Math.round(n).toString(16).padStart(2,"0")).join("")}function Ge(e){const t=e.replace("#","");return{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}}function We(e,t){A=new ut({title:"tuning · tap top-left to hide",width:280}),A.hide();const i=A.addFolder("Stream");i.add(s.stream,"freeSpeed",50,800,1).name("free speed (px/s)"),i.add(s.stream,"eraseRadius",8,100,1).name("erase radius"),i.add(s.stream,"maxThrowSpeed",400,4e3,10).name("max throw speed"),i.add(s.stream,"minThrowSpeed",0,400,5).name("min throw speed"),i.add(s.stream,"velWindowMs",100,400,5).name("vel window (ms)"),i.add(s.stream,"bounceNudgeRad",0,.3,.005).name("bounce nudge (rad)");const n=A.addFolder("Edge Snap");n.add(s.edgeSnap,"dist",10,200,1).name("dist (px)"),n.add(s.edgeSnap,"tan",0,1.5,.01).name("slow tan"),n.add(s.edgeSnap,"tanFast",0,2,.01).name("fast tan");const r=A.addFolder("Grid");r.add(s.grid,"chunkSize",4,64,1).name("chunk size").onFinishChange(()=>V(e(),t())),r.add(s.grid,"chunkGap",0,6,1).name("chunk gap").onFinishChange(()=>V(e(),t())),r.add(s.grid,"chunkHp",1,5,1).name("chunk HP (layers)").onFinishChange(()=>V(e(),t()));const a=A.addFolder("Tiles");a.add(s.tiles,"gravity",0,6e3,50).name("gravity"),a.add(s.tiles,"knockBase",0,400,5).name("knock base"),a.add(s.tiles,"knockVar",0,400,5).name("knock variance"),a.add(s.tiles,"streamInherit",0,1,.01).name("stream inherit"),a.add(s.tiles,"rotMax",0,20,.1).name("rot max (rad/s)"),a.add(s.tiles,"shrink",0,8,.1).name("shrink rate"),a.add(s.tiles,"upwardKick",-300,100,5).name("upward kick");const l=A.addFolder("Splash");l.add(s.splash,"spawnHz",0,200,1).name("spawn Hz"),l.add(s.splash,"life",.02,1,.01).name("life (s)"),l.add(s.splash,"startSize",0,80,1).name("start size"),l.add(s.splash,"endSize",0,200,1).name("end size"),l.add(s.splash,"lineWidth",.5,8,.5).name("line width"),l.add(s.splash,"jitter",0,80,1).name("jitter");const h={color:Ne(s.splash.r,s.splash.g,s.splash.b)};l.addColor(h,"color").name("color").onChange(v=>{const{r:C,g:Z,b:Yt}=Ge(v);s.splash.r=C,s.splash.g=Z,s.splash.b=Yt}),A.addFolder("Wall").addColor(s,"wallColor").name("wall color");const d=A.addFolder("Display");d.add(s.display,"virtualWidth",640,3840,16).name("virtual width").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),d.add(s.display,"virtualHeight",360,2160,16).name("virtual height").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),d.addColor(s.display,"letterbox").name("letterbox color");const m=A.addFolder("Keyboard");m.add(s.keyboard,"accel",0,8e3,50).name("accel (px/s²)"),m.add(s.keyboard,"maxSpeed",0,3e3,25).name("max speed"),m.add(s.keyboard,"perpBrake",0,12,.1).name("perp brake");const c=A.addFolder("Run");c.add(s.run,"tankSeconds",5,120,1).name("tank seconds"),c.add(s.run,"cleanTargetPct",10,100,1).name("clean target %"),c.add(s.run,"drainMultiplier",0,3,.05).name("drain multiplier");const f=A.addFolder("Presets"),y={name:"preset-1",selected:""};f.add(y,"name").name("name");let S=f.add(y,"selected",[""]).name("saved");function k(){const v=j(),C=Object.keys(v);S=S.options(C.length?C:["(none)"]),C.length&&S.setValue(C[0])}k();const L={save(){const v=j();v[y.name]=JSON.parse(JSON.stringify(s)),xt(v),k()},load(){const C=j()[y.selected];C&&(At(C),V(e(),t()))},delete(){const v=j();delete v[y.selected],xt(v),k()},resetDefaults(){At(Ye),V(e(),t())}};f.add(L,"save").name("save preset"),f.add(L,"load").name("load preset"),f.add(L,"delete").name("delete preset"),f.add(L,"resetDefaults").name("reset to defaults");const g=A.addFolder("Debug");g.close();const u={showFps:!1};g.add(u,"showFps").name("show FPS").onChange(v=>Be(v)),g.add({wipeSave:()=>{Xt()}},"wipeSave").name("wipe save (currency + upgrades)")}function Ke(){A&&(tt=!tt,tt?A.show():A.hide())}const b={state:"playing",water:1,startTime:0,endTime:0,result:null};function It(){return b}function Xe(e){b.state="playing",b.water=1,b.startTime=e,b.endTime=0,b.result=null}function Et(e,t){const i=ct()/Math.max(1,ht()),n=Math.max(1e-4,1-b.water);return{state:e,durationSec:(t-b.startTime)/1e3,cleanedPct:i*100,waterLeft:b.water,efficiency:Math.min(1,i/n)}}function je(e,t){if(b.state!=="playing")return!1;const i=1/Math.max(.001,E.tankSeconds)*E.drainMultiplier;return b.water=Math.max(0,b.water-i*e),ct()/Math.max(1,ht())*100>=s.run.cleanTargetPct?(b.state="won",b.endTime=t,b.result=Et("won",t),!1):b.water<=0?(b.state="lost",b.endTime=t,b.result=Et("lost",t),!1):!0}const O=document.getElementById("stage"),Rt=O.getContext("2d"),Je=document.getElementById("reset"),Ht=document.getElementById("pauseOverlay");let M=s.display.virtualWidth,$=s.display.virtualHeight,B=1,N=1,nt=0,st=0;function Bt(){M=s.display.virtualWidth,$=s.display.virtualHeight;const e=window.innerWidth,t=window.innerHeight;N=Math.min(e/M,t/$);const i=M*N,n=$*N;nt=(e-i)/2,st=(t-n)/2,B=Math.min(window.devicePixelRatio||1,2),O.width=M*B,O.height=$*B,O.style.width=i+"px",O.style.height=n+"px",O.style.left=nt+"px",O.style.top=st+"px",Rt.setTransform(B,0,0,B,0,0),V(M,$),document.documentElement.style.background=s.display.letterbox,document.body.style.background=s.display.letterbox}function Ue(e,t){return{x:(e-nt)/N,y:(t-st)/N}}function U(){V(M,$),oe(),he(),$t(M,$),Dt(!0),G=!1,Ht.classList.remove("show"),Xe(performance.now())}let G=!1;function Ze(){It().state==="playing"&&(G=!G,Ht.classList.toggle("show",G))}ie(O,()=>M,()=>$,Ue);We(()=>M,()=>$);jt({onPause:Ze,onRestart:U});qt(Ke);if(matchMedia("(hover: none) and (pointer: coarse)").matches){const e=document.getElementById("hint");e&&(e.style.display="none")}Je.addEventListener("click",e=>{e.stopPropagation(),U()});let rt=performance.now();const P=[];let _t=0;function Pt(){const e=performance.now();let t=(e-rt)/1e3;rt=e,t>.05&&(t=.05),kt();const i=It();if(i.state==="playing"&&!G){Zt(t,M,$,te(),le),ne(re),de(t),ae(t,$);const n=je(t,e),r=ct()/Math.max(1,ht())*100;if(Ie(i.water,r,(e-i.startTime)/1e3),!n&&i.result){Dt(!1);const a=Wt(i.result),l=i.result;Re(l,a,()=>{He(U)})}}for(ce(Rt,M,$),P.push(e);P.length&&e-P[0]>1e3;)P.shift();e-_t>200&&(Pe(P.length),_t=e),requestAnimationFrame(Pt)}window.addEventListener("resize",()=>{Bt(),$t(M,$)});Bt();kt();U();rt=performance.now();Pt();
