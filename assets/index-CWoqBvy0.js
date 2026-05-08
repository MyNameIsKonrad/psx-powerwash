(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=i(a);fetch(a.href,r)}})();const s={stream:{freeSpeed:280,eraseRadius:32,maxThrowSpeed:1800,minThrowSpeed:120,velWindowMs:180,bounceNudgeRad:2*Math.PI/180},edgeSnap:{dist:60,tan:.36,tanFast:.7},grid:{chunkSize:22,chunkGap:1,chunkHp:1},tiles:{gravity:2600,knockBase:110,knockVar:55,streamInherit:.18,rotMax:6,shrink:2.4,upwardKick:-50},splash:{spawnHz:50,life:.15,startSize:12,endSize:36,lineWidth:2,jitter:14,r:124,g:196,b:255},wallColor:"#6e7884",display:{virtualWidth:1280,virtualHeight:720,letterbox:"#06080b"},keyboard:{accel:2400,maxSpeed:900,perpBrake:3.5},run:{tankSeconds:30,cleanTargetPct:80,drainMultiplier:1}},Vt="psxwash:save",ut=[{id:"tank",name:"tank size",blurb:"+10% water capacity",baseCost:25,costGrowth:1.6,maxLevel:8},{id:"pressure",name:"stream pressure",blurb:"+8% free speed",baseCost:30,costGrowth:1.7,maxLevel:8},{id:"nozzle",name:"nozzle width",blurb:"+6% erase radius",baseCost:40,costGrowth:1.8,maxLevel:6},{id:"recovery",name:"water recovery",blurb:"-5% drain rate",baseCost:50,costGrowth:1.9,maxLevel:5},{id:"payout",name:"soap subsidy",blurb:"+10% currency earned",baseCost:60,costGrowth:2,maxLevel:6}];function G(){return{currency:0,levels:Object.fromEntries(ut.map(e=>[e.id,0]))}}let z=ie();function ie(){try{const e=localStorage.getItem(Vt);if(!e)return G();const t=JSON.parse(e);return{...G(),...t,levels:{...G().levels,...t.levels||{}}}}catch{return G()}}function pt(){localStorage.setItem(Vt,JSON.stringify(z))}function At(){return z.currency}function V(e){return z.levels[e]??0}function Bt(e,t){return Math.round(e.baseCost*Math.pow(e.costGrowth,t))}function ne(e){const t=ut.find(a=>a.id===e);if(!t)return!1;const i=V(e);if(i>=t.maxLevel)return!1;const n=Bt(t,i);return z.currency<n?!1:(z.currency-=n,z.levels[e]=i+1,pt(),!0)}function se(e){const t=e.state==="won"?60:20,i=e.cleanedPct/100*80,n=e.efficiency*40,a=1+.1*V("payout"),r=Math.round((t+i+n)*a);return z.currency+=r,pt(),r}function ae(){return{tankMul:1+.1*V("tank"),speedMul:1+.08*V("pressure"),radiusMul:1+.06*V("nozzle"),drainMul:1-.05*V("recovery")}}function re(){z=G(),pt()}const E={freeSpeed:280,eraseRadius:32,eraseRadiusSq:32*32,tankSeconds:30,drainMultiplier:1};function Rt(){const e=ae();E.freeSpeed=s.stream.freeSpeed*e.speedMul,E.eraseRadius=s.stream.eraseRadius*e.radiusMul,E.eraseRadiusSq=E.eraseRadius*E.eraseRadius,E.tankSeconds=s.run.tankSeconds*e.tankMul,E.drainMultiplier=s.run.drainMultiplier*e.drainMul}const x=new Set;let j=null,X=null;function oe(e){j=e.onPause,X=e.onRestart,window.addEventListener("keydown",t=>{t.repeat||(x.add(t.code),!(t.ctrlKey||t.metaKey||t.altKey)&&(t.code==="Escape"&&(t.preventDefault(),j==null||j()),t.code==="KeyR"&&(t.preventDefault(),X==null||X())))}),window.addEventListener("keyup",t=>{x.delete(t.code)}),window.addEventListener("blur",()=>x.clear())}function le(){let e=0,t=0;return(x.has("ArrowLeft")||x.has("KeyA"))&&(e-=1),(x.has("ArrowRight")||x.has("KeyD"))&&(e+=1),(x.has("ArrowUp")||x.has("KeyW"))&&(t-=1),(x.has("ArrowDown")||x.has("KeyS"))&&(t+=1),{x:e,y:t}}function de(){return x.has("ArrowLeft")||x.has("ArrowRight")||x.has("ArrowUp")||x.has("ArrowDown")||x.has("KeyA")||x.has("KeyD")||x.has("KeyW")||x.has("KeyS")}const nt=.18;let U=null,et=!1;const Et=[];let Z=null,q=null,Q=null;function ce(e){Z=e.onPause,q=e.onRestart,Q=e.onToggleGui,window.addEventListener("gamepadconnected",()=>{et=!0}),window.addEventListener("gamepaddisconnected",()=>{const t=navigator.getGamepads?navigator.getGamepads():[];et=Array.from(t).some(i=>!!i&&i.connected)})}function he(){if(!navigator.getGamepads)return;const e=navigator.getGamepads();let t=null;for(const o of e)if(o&&o.connected){t=o;break}if(!t){U=null;return}et=!0;for(let o=0;o<t.buttons.length;o++){const c=t.buttons[o].pressed,u=Et[o]||!1;c&&!u&&(o===9?Z==null||Z():o===3?q==null||q():o===2&&(Q==null||Q())),Et[o]=c}const i=t.axes[0]??0,n=t.axes[1]??0,a=Math.hypot(i,n);if(a<nt){U=null;return}const r=Math.min(1,(a-nt)/(1-nt));U={x:i/a,y:n/a,mag:r}}function ue(){return U}function pe(){return et}function me(){if(de()){const t=le(),i=Math.hypot(t.x,t.y)||1;return{x:t.x/i,y:t.y/i,mag:1}}const e=ue();return e?{x:e.x,y:e.y,mag:e.mag}:null}const l={x:0,y:0,vx:0,vy:0};function Pt(e,t){l.x=e/2,l.y=t/2;const i=Math.random()*Math.PI*2;l.vx=Math.cos(i)*E.freeSpeed,l.vy=Math.sin(i)*E.freeSpeed}function ge(e,t,i,n,a){if(n)return;const r=me();if(r){l.vx+=r.x*s.keyboard.accel*r.mag*e,l.vy+=r.y*s.keyboard.accel*r.mag*e;const u=l.vx*-r.y+l.vy*r.x,d=Math.min(1,s.keyboard.perpBrake*r.mag*e);l.vx-=-r.y*u*d,l.vy-=r.x*u*d;const m=Math.hypot(l.vx,l.vy);m>s.keyboard.maxSpeed&&(l.vx=l.vx/m*s.keyboard.maxSpeed,l.vy=l.vy/m*s.keyboard.maxSpeed)}l.x+=l.vx*e,l.y+=l.vy*e;const o=E.eraseRadius*.5;let c=!1;if(l.x<o&&(l.x=o,l.vx=Math.abs(l.vx),c=!0),l.x>t-o&&(l.x=t-o,l.vx=-Math.abs(l.vx),c=!0),l.y<o&&(l.y=o,l.vy=Math.abs(l.vy),c=!0),l.y>i-o&&(l.y=i-o,l.vy=-Math.abs(l.vy),c=!0),c){const u=Math.hypot(l.vx,l.vy),d=Math.atan2(l.vy,l.vx)+(Math.random()*2-1)*s.stream.bounceNudgeRad;l.vx=Math.cos(d)*u,l.vy=Math.sin(d)*u,a(l.x,l.y)}}function fe(e,t,i,n){const a=Math.hypot(e,t),r=s.stream.minThrowSpeed,o=s.stream.maxThrowSpeed,c=Math.max(0,Math.min(1,(a-r)/(o-r))),u=s.edgeSnap.tan+c*(s.edgeSnap.tanFast-s.edgeSnap.tan),d=s.edgeSnap.dist,m=l.y<d,p=l.y>n-d,v=l.x<d,w=l.x>i-d;return(m||p)&&Math.abs(t)<Math.abs(e)*u?{vx:Math.sign(e)*a,vy:0}:(v||w)&&Math.abs(e)<Math.abs(t)*u?{vx:0,vy:Math.sign(t)*a}:{vx:e,vy:t}}let R=!1,Ht=0,Gt=0,mt=()=>0,gt=()=>0;const _t=80;let ot=null;function ve(e){ot=e}let Yt=!0;function Nt(e){Yt=e,e||(R=!1)}const F=[];function ye(){return R}function we(){const e=E.eraseRadius*.5,t=mt(),i=gt();l.x<e&&(l.x=e),l.x>t-e&&(l.x=t-e),l.y<e&&(l.y=e),l.y>i-e&&(l.y=i-e)}function Ct(e,t){if(e<_t&&t<_t&&ot){ot();return}Yt&&(R=!0,Ht=l.x-e,Gt=l.y-t,F.length=0,F.push({x:e,y:t,t:performance.now()}))}function St(e,t){if(!R)return;l.x=e+Ht,l.y=t+Gt,we(),F.push({x:e,y:t,t:performance.now()});const i=performance.now()-s.stream.velWindowMs-20;for(;F.length>1&&F[0].t<i;)F.shift()}function st(){if(!R)return;R=!1;const t=performance.now()-s.stream.velWindowMs;let i=F[0];for(const c of F)if(c.t>=t){i=c;break}const n=F[F.length-1];let a=0,r=0;if(i&&n&&n.t>i.t){const c=(n.t-i.t)/1e3;a=(n.x-i.x)/c,r=(n.y-i.y)/c}const o=Math.hypot(a,r);if(o>s.stream.maxThrowSpeed&&(a=a/o*s.stream.maxThrowSpeed,r=r/o*s.stream.maxThrowSpeed),o<s.stream.minThrowSpeed){const c=Math.random()*Math.PI*2;l.vx=Math.cos(c)*E.freeSpeed,l.vy=Math.sin(c)*E.freeSpeed}else{const c=mt(),u=gt(),d=fe(a,r,c,u);l.vx=d.vx,l.vy=d.vy}F.length=0}function be(e,t,i,n){mt=t,gt=i,e.addEventListener("touchstart",a=>{a.preventDefault();const r=a.touches[0],o=n(r.clientX,r.clientY);Ct(o.x,o.y)},{passive:!1}),e.addEventListener("touchmove",a=>{a.preventDefault();const r=a.touches[0],o=n(r.clientX,r.clientY);St(o.x,o.y)},{passive:!1}),e.addEventListener("touchend",a=>{a.preventDefault(),st()},{passive:!1}),e.addEventListener("touchcancel",a=>{a.preventDefault(),st()},{passive:!1}),e.addEventListener("mousedown",a=>{if(a.button!==0)return;const r=n(a.clientX,a.clientY);Ct(r.x,r.y)}),window.addEventListener("mousemove",a=>{const r=n(a.clientX,a.clientY);St(r.x,r.y)}),window.addEventListener("mouseup",a=>{a.button===0&&st()})}const y={cols:0,rows:0,data:new Uint8Array(0),initialAlive:0};function I(e,t){const i=s.grid.chunkSize;y.cols=Math.ceil(e/i),y.rows=Math.ceil(t/i),y.data=new Uint8Array(y.cols*y.rows);const n=Math.max(1,s.grid.chunkHp|0);y.data.fill(n),y.initialAlive=y.cols*y.rows}function xe(e){const t=s.grid.chunkSize,i=E.eraseRadius,n=E.eraseRadiusSq,a=Math.max(0,Math.floor((l.x-i)/t)),r=Math.min(y.cols-1,Math.floor((l.x+i)/t)),o=Math.max(0,Math.floor((l.y-i)/t)),c=Math.min(y.rows-1,Math.floor((l.y+i)/t));for(let u=o;u<=c;u++)for(let d=a;d<=r;d++){const m=u*y.cols+d,p=y.data[m];if(p===0)continue;const v=d*t+t/2,w=u*t+t/2,S=v-l.x,k=w-l.y;if(S*S+k*k<=n){const L=p-1;y.data[m]=L,L===0&&e(v,w)}}}function ft(){return y.initialAlive}function vt(){let e=0;const t=y.data;for(let i=0;i<t.length;i++)t[i]===0&&e++;return e}const T=[],Ae=1200;function Ee(e,t){const i=e-l.x,n=t-l.y,a=Math.hypot(i,n)||1,r=i/a,o=n/a,c=Math.hypot(l.vx,l.vy)||1,u=s.tiles.streamInherit,d=l.vx/c*u*c,m=l.vy/c*u*c,p=s.tiles.knockBase+Math.random()*s.tiles.knockVar;T.length>=Ae&&T.shift(),T.push({x:e,y:t,vx:r*p+d,vy:o*p+m+s.tiles.upwardKick,rot:(Math.random()-.5)*.4,rotV:(Math.random()*2-1)*s.tiles.rotMax,size:s.grid.chunkSize-s.grid.chunkGap,scale:1})}function _e(e,t){for(let i=T.length-1;i>=0;i--){const n=T[i];n.vy+=s.tiles.gravity*e,n.x+=n.vx*e,n.y+=n.vy*e,n.rot+=n.rotV*e,n.scale-=s.tiles.shrink*e,(n.y>t+80||n.scale<=.05)&&T.splice(i,1)}}function Ce(){T.length=0}const B=[];let tt=0;function Kt(e,t,i=1){const n=Math.random()*s.splash.jitter,a=Math.random()*Math.PI*2;B.push({x:e+Math.cos(a)*n,y:t+Math.sin(a)*n,rot:Math.random()*Math.PI*2,age:0,sizeMul:i})}function Se(e,t){for(let i=0;i<5;i++)Kt(e,t,1.35);typeof navigator<"u"&&navigator.vibrate&&navigator.vibrate(12)}function ke(e){tt+=e;const t=1/s.splash.spawnHz;for(;tt>t;)Kt(l.x,l.y),tt-=t;for(let i=B.length-1;i>=0;i--)B[i].age+=e,B[i].age>=s.splash.life&&B.splice(i,1)}function $e(){B.length=0,tt=0}function Me(e,t,i){e.fillStyle=s.wallColor,e.fillRect(0,0,t,i);const n=s.grid.chunkSize,a=n-s.grid.chunkGap,r=Math.max(1,s.grid.chunkHp|0),o={r:0,g:0,b:0},c={r:130,g:86,b:48},u=[];for(let d=1;d<=r;d++){const m=(r-d)/Math.max(1,r-1),p=r===1?0:m,v=Math.round(o.r+(c.r-o.r)*p),w=Math.round(o.g+(c.g-o.g)*p),S=Math.round(o.b+(c.b-o.b)*p);u[d]=`rgb(${v},${w},${S})`}for(let d=0;d<y.rows;d++){const m=d*y.cols;for(let p=0;p<y.cols;p++){const v=y.data[m+p];v&&(e.fillStyle=u[v],e.fillRect(p*n,d*n,a,a))}}for(const d of T){e.save(),e.translate(d.x,d.y),e.rotate(d.rot),e.scale(d.scale,d.scale),e.fillStyle="#000000";const m=d.size/2;e.fillRect(-m,-m,d.size,d.size),e.restore()}e.lineWidth=s.splash.lineWidth;for(const d of B){const m=d.age/s.splash.life,p=(s.splash.startSize+(s.splash.endSize-s.splash.startSize)*m)*d.sizeMul,v=.7*(m<.8?1:(1-m)/.2);e.strokeStyle=`rgba(${s.splash.r},${s.splash.g},${s.splash.b},${v})`,e.save(),e.translate(d.x,d.y),e.rotate(d.rot);const w=p/2;e.strokeRect(-w,-w,p,p),e.restore()}e.fillStyle=`rgba(${s.splash.r},${s.splash.g},${s.splash.b},0.95)`,e.fillRect(l.x-2.5,l.y-2.5,5,5)}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class D{constructor(t,i,n,a,r="div"){this.parent=t,this.object=i,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("controller"),this.domElement.classList.add(a),this.$name=document.createElement("div"),this.$name.classList.add("name"),D.nextNameID=D.nextNameID||0,this.$name.id=`lil-gui-name-${++D.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const i=this.parent.add(this.object,this.property,t);return i.name(this._name),this.destroy(),i}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Le extends D{constructor(t,i,n){super(t,i,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function lt(e){let t,i;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?i=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),i?"#"+i:!1}const Fe={isPrimitive:!0,match:e=>typeof e=="string",fromHexString:lt,toHexString:lt},K={isPrimitive:!0,match:e=>typeof e=="number",fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>"#"+e.toString(16).padStart(6,0)},De={isPrimitive:!1,match:e=>Array.isArray(e),fromHexString(e,t,i=1){const n=K.fromHexString(e);t[0]=(n>>16&255)/255*i,t[1]=(n>>8&255)/255*i,t[2]=(n&255)/255*i},toHexString([e,t,i],n=1){n=255/n;const a=e*n<<16^t*n<<8^i*n<<0;return K.toHexString(a)}},Oe={isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,i=1){const n=K.fromHexString(e);t.r=(n>>16&255)/255*i,t.g=(n>>8&255)/255*i,t.b=(n&255)/255*i},toHexString({r:e,g:t,b:i},n=1){n=255/n;const a=e*n<<16^t*n<<8^i*n<<0;return K.toHexString(a)}},ze=[Fe,K,De,Oe];function Te(e){return ze.find(t=>t.match(e))}class Ie extends D{constructor(t,i,n,a){super(t,i,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Te(this.initialValue),this._rgbScale=a,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=lt(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const i=this._format.fromHexString(t);this.setValue(i)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class at extends D{constructor(t,i,n){super(t,i,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",a=>{a.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Ve extends D{constructor(t,i,n,a,r,o){super(t,i,n,"number"),this._initInput(),this.min(a),this.max(r);const c=o!==void 0;this.step(c?o:this._getImplicitStep(),c),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,i=!0){return this._step=t,this._stepExplicit=i,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let i=(t-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let h=parseFloat(this.$input.value);isNaN(h)||(this._stepExplicit&&(h=this._snap(h)),this.setValue(this._clamp(h)))},n=h=>{const f=parseFloat(this.$input.value);isNaN(f)||(this._snapClampSetValue(f+h),this.$input.value=this.getValue())},a=h=>{h.key==="Enter"&&this.$input.blur(),h.code==="ArrowUp"&&(h.preventDefault(),n(this._step*this._arrowKeyMultiplier(h))),h.code==="ArrowDown"&&(h.preventDefault(),n(this._step*this._arrowKeyMultiplier(h)*-1))},r=h=>{this._inputFocused&&(h.preventDefault(),n(this._step*this._normalizeMouseWheel(h)))};let o=!1,c,u,d,m,p;const v=5,w=h=>{c=h.clientX,u=d=h.clientY,o=!0,m=this.getValue(),p=0,window.addEventListener("mousemove",S),window.addEventListener("mouseup",k)},S=h=>{if(o){const f=h.clientX-c,C=h.clientY-u;Math.abs(C)>v?(h.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(f)>v&&k()}if(!o){const f=h.clientY-d;p-=f*this._step*this._arrowKeyMultiplier(h),m+p>this._max?p=this._max-m:m+p<this._min&&(p=this._min-m),this._snapClampSetValue(m+p)}d=h.clientY},k=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",S),window.removeEventListener("mouseup",k)},L=()=>{this._inputFocused=!0},g=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",a),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",w),this.$input.addEventListener("focus",L),this.$input.addEventListener("blur",g)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(g,h,f,C,it)=>(g-h)/(f-h)*(it-C)+C,i=g=>{const h=this.$slider.getBoundingClientRect();let f=t(g,h.left,h.right,this._min,this._max);this._snapClampSetValue(f)},n=g=>{this._setDraggingStyle(!0),i(g.clientX),window.addEventListener("mousemove",a),window.addEventListener("mouseup",r)},a=g=>{i(g.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",a),window.removeEventListener("mouseup",r)};let o=!1,c,u;const d=g=>{g.preventDefault(),this._setDraggingStyle(!0),i(g.touches[0].clientX),o=!1},m=g=>{g.touches.length>1||(this._hasScrollBar?(c=g.touches[0].clientX,u=g.touches[0].clientY,o=!0):d(g),window.addEventListener("touchmove",p,{passive:!1}),window.addEventListener("touchend",v))},p=g=>{if(o){const h=g.touches[0].clientX-c,f=g.touches[0].clientY-u;Math.abs(h)>Math.abs(f)?d(g):(window.removeEventListener("touchmove",p),window.removeEventListener("touchend",v))}else g.preventDefault(),i(g.touches[0].clientX)},v=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",p),window.removeEventListener("touchend",v)},w=this._callOnFinishChange.bind(this),S=400;let k;const L=g=>{if(Math.abs(g.deltaX)<Math.abs(g.deltaY)&&this._hasScrollBar)return;g.preventDefault();const f=this._normalizeMouseWheel(g)*this._step;this._snapClampSetValue(this.getValue()+f),this.$input.value=this.getValue(),clearTimeout(k),k=setTimeout(w,S)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",m,{passive:!1}),this.$slider.addEventListener("wheel",L,{passive:!1})}_setDraggingStyle(t,i="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${i}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:i,deltaY:n}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(i=0,n=-t.wheelDelta/120,n*=this._stepExplicit?1:10),i+-n}_arrowKeyMultiplier(t){let i=this._stepExplicit?1:10;return t.shiftKey?i*=10:t.altKey&&(i/=10),i}_snap(t){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),t-=i,t=Math.round(t/this._step)*this._step,t+=i,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Be extends D{constructor(t,i,n,a){super(t,i,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(a)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(i=>{const n=document.createElement("option");n.textContent=i,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),i=this._values.indexOf(t);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?t:this._names[i],this}}class Re extends D{constructor(t,i,n){super(t,i,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",a=>{a.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Pe=`.lil-gui {
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
}`;function He(e){const t=document.createElement("style");t.innerHTML=e;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(t,i):document.head.appendChild(t)}let kt=!1;class yt{constructor({parent:t,autoPlace:i=t===void 0,container:n,width:a,title:r="Controls",closeFolders:o=!1,injectStyles:c=!0,touchStyles:u=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),u&&this.domElement.classList.add("allow-touch-styles"),!kt&&c&&(He(Pe),kt=!0),n?n.appendChild(this.domElement):i&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),a&&this.domElement.style.setProperty("--width",a+"px"),this._closeFolders=o}add(t,i,n,a,r){if(Object(n)===n)return new Be(this,t,i,n);const o=t[i];switch(typeof o){case"number":return new Ve(this,t,i,n,a,r);case"boolean":return new Le(this,t,i);case"string":return new Re(this,t,i);case"function":return new at(this,t,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,t,`
	value:`,o)}addColor(t,i,n=1){return new Ie(this,t,i,n)}addFolder(t){const i=new yt({parent:this,title:t});return this.root._closeFolders&&i.close(),i}load(t,i=!0){return t.controllers&&this.controllers.forEach(n=>{n instanceof at||n._name in t.controllers&&n.load(t.controllers[n._name])}),i&&t.folders&&this.folders.forEach(n=>{n._title in t.folders&&n.load(t.folders[n._title])}),this}save(t=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof at)){if(n._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);i.controllers[n._name]=n.save()}}),t&&this.folders.forEach(n=>{if(n._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);i.folders[n._title]=n.save()}),i}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("transition");const n=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const a=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=a+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(i=>{t=t.concat(i.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(i=>{t=t.concat(i.foldersRecursive())}),t}}const _=e=>document.getElementById(e),Ge=_("waterFill"),Ye=_("cleanVal"),Ne=_("timeVal"),$t=_("endOverlay"),Ke=_("endTitle"),We=_("endVerdict"),je=_("endTime"),Xe=_("endClean"),Je=_("endWater"),Ue=_("endEff"),Ze=_("endEarned"),qe=_("endContinue"),Mt=_("shopOverlay"),Qe=_("shopStart"),ti=_("shopBalance"),Lt=_("upgradeList");function ei(e,t,i){Ge.style.width=`${Math.max(0,Math.min(1,e))*100}%`,Ye.textContent=`${t.toFixed(0)}%`,Ne.textContent=`${i.toFixed(1)}`}function ii(e,t,i){Ke.textContent=e.state==="won"?"clean!":"out of water",We.textContent=e.state==="won"?"wall is clean. nice flicks.":"tank ran dry before the wall was clean.",je.textContent=`${e.durationSec.toFixed(1)}s`,Xe.textContent=`${e.cleanedPct.toFixed(1)}%`,Je.textContent=`${(e.waterLeft*100).toFixed(0)}%`,Ue.textContent=`${(e.efficiency*100).toFixed(0)}%`,Ze.textContent=`+${t}`,document.body.classList.add("overlay-open"),$t.classList.add("show"),qe.onclick=()=>{$t.classList.remove("show"),i()}}function Wt(){ti.textContent=String(At()),Lt.innerHTML="";for(const e of ut){const t=V(e.id),i=Bt(e,t),n=t>=e.maxLevel,a=!n&&At()>=i,r=document.createElement("div");r.className="upgrade";const o=document.createElement("div");o.className="meta";const c=document.createElement("span");c.className="name",c.textContent=e.name;const u=document.createElement("span");u.className="lvl",u.textContent=`lvl ${t}/${e.maxLevel} · ${e.blurb}`,o.appendChild(c),o.appendChild(u);const d=document.createElement("button");d.textContent=n?"max":`buy · ${i}`,d.disabled=!a,d.addEventListener("click",()=>{ne(e.id)&&Wt()}),r.appendChild(o),r.appendChild(d),Lt.appendChild(r)}}function ni(e){Wt(),document.body.classList.add("overlay-open"),Mt.classList.add("show"),Qe.onclick=()=>{Mt.classList.remove("show"),document.body.classList.remove("overlay-open"),e()}}const jt=_("fps");function si(e){jt.classList.toggle("show",e)}function ai(e){jt.textContent=`${e.toFixed(0)} fps`}const ri=JSON.parse(JSON.stringify(s)),Xt="psxwash:presets";let A=null,rt=!1;function J(){try{return JSON.parse(localStorage.getItem(Xt)||"{}")}catch{return{}}}function Ft(e){localStorage.setItem(Xt,JSON.stringify(e))}function Dt(e){for(const t of Object.keys(s)){const i=e[t],n=s[t];i&&typeof i=="object"&&typeof n=="object"?Object.assign(n,i):i!==void 0&&(s[t]=i)}A&&A.controllersRecursive().forEach(t=>t.updateDisplay())}function oi(e,t,i){return"#"+[e,t,i].map(n=>Math.round(n).toString(16).padStart(2,"0")).join("")}function li(e){const t=e.replace("#","");return{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}}function di(e,t){A=new yt({title:"tuning · tap top-left to hide",width:280}),A.hide();const i=A.addFolder("Stream");i.add(s.stream,"freeSpeed",50,800,1).name("free speed (px/s)"),i.add(s.stream,"eraseRadius",8,100,1).name("erase radius"),i.add(s.stream,"maxThrowSpeed",400,4e3,10).name("max throw speed"),i.add(s.stream,"minThrowSpeed",0,400,5).name("min throw speed"),i.add(s.stream,"velWindowMs",100,400,5).name("vel window (ms)"),i.add(s.stream,"bounceNudgeRad",0,.3,.005).name("bounce nudge (rad)");const n=A.addFolder("Edge Snap");n.add(s.edgeSnap,"dist",10,200,1).name("dist (px)"),n.add(s.edgeSnap,"tan",0,1.5,.01).name("slow tan"),n.add(s.edgeSnap,"tanFast",0,2,.01).name("fast tan");const a=A.addFolder("Grid");a.add(s.grid,"chunkSize",4,64,1).name("chunk size").onFinishChange(()=>I(e(),t())),a.add(s.grid,"chunkGap",0,6,1).name("chunk gap").onFinishChange(()=>I(e(),t())),a.add(s.grid,"chunkHp",1,5,1).name("chunk HP (layers)").onFinishChange(()=>I(e(),t()));const r=A.addFolder("Tiles");r.add(s.tiles,"gravity",0,6e3,50).name("gravity"),r.add(s.tiles,"knockBase",0,400,5).name("knock base"),r.add(s.tiles,"knockVar",0,400,5).name("knock variance"),r.add(s.tiles,"streamInherit",0,1,.01).name("stream inherit"),r.add(s.tiles,"rotMax",0,20,.1).name("rot max (rad/s)"),r.add(s.tiles,"shrink",0,8,.1).name("shrink rate"),r.add(s.tiles,"upwardKick",-300,100,5).name("upward kick");const o=A.addFolder("Splash");o.add(s.splash,"spawnHz",0,200,1).name("spawn Hz"),o.add(s.splash,"life",.02,1,.01).name("life (s)"),o.add(s.splash,"startSize",0,80,1).name("start size"),o.add(s.splash,"endSize",0,200,1).name("end size"),o.add(s.splash,"lineWidth",.5,8,.5).name("line width"),o.add(s.splash,"jitter",0,80,1).name("jitter");const c={color:oi(s.splash.r,s.splash.g,s.splash.b)};o.addColor(c,"color").name("color").onChange(f=>{const{r:C,g:it,b:ee}=li(f);s.splash.r=C,s.splash.g=it,s.splash.b=ee}),A.addFolder("Wall").addColor(s,"wallColor").name("wall color");const d=A.addFolder("Display");d.add(s.display,"virtualWidth",640,3840,16).name("virtual width").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),d.add(s.display,"virtualHeight",360,2160,16).name("virtual height").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),d.addColor(s.display,"letterbox").name("letterbox color");const m=A.addFolder("Keyboard");m.add(s.keyboard,"accel",0,8e3,50).name("accel (px/s²)"),m.add(s.keyboard,"maxSpeed",0,3e3,25).name("max speed"),m.add(s.keyboard,"perpBrake",0,12,.1).name("perp brake");const p=A.addFolder("Run");p.add(s.run,"tankSeconds",5,120,1).name("tank seconds"),p.add(s.run,"cleanTargetPct",10,100,1).name("clean target %"),p.add(s.run,"drainMultiplier",0,3,.05).name("drain multiplier");const v=A.addFolder("Presets"),w={name:"preset-1",selected:""};v.add(w,"name").name("name");let S=v.add(w,"selected",[""]).name("saved");function k(){const f=J(),C=Object.keys(f);S=S.options(C.length?C:["(none)"]),C.length&&S.setValue(C[0])}k();const L={save(){const f=J();f[w.name]=JSON.parse(JSON.stringify(s)),Ft(f),k()},load(){const C=J()[w.selected];C&&(Dt(C),I(e(),t()))},delete(){const f=J();delete f[w.selected],Ft(f),k()},resetDefaults(){Dt(ri),I(e(),t())}};v.add(L,"save").name("save preset"),v.add(L,"load").name("load preset"),v.add(L,"delete").name("delete preset"),v.add(L,"resetDefaults").name("reset to defaults");const g=A.addFolder("Debug");g.close();const h={showFps:!1};g.add(h,"showFps").name("show FPS").onChange(f=>si(f)),g.add({wipeSave:()=>{re()}},"wipeSave").name("wipe save (currency + upgrades)")}function wt(){A&&(rt=!rt,rt?A.show():A.hide())}const b={state:"playing",water:1,startTime:0,endTime:0,result:null};function Jt(){return b}function ci(e){b.state="playing",b.water=1,b.startTime=e,b.endTime=0,b.result=null}function Ot(e,t){const i=vt()/Math.max(1,ft()),n=Math.max(1e-4,1-b.water);return{state:e,durationSec:(t-b.startTime)/1e3,cleanedPct:i*100,waterLeft:b.water,efficiency:Math.min(1,i/n)}}function hi(e,t){if(b.state!=="playing")return!1;const i=1/Math.max(.001,E.tankSeconds)*E.drainMultiplier;return b.water=Math.max(0,b.water-i*e),vt()/Math.max(1,ft())*100>=s.run.cleanTargetPct?(b.state="won",b.endTime=t,b.result=Ot("won",t),!1):b.water<=0?(b.state="lost",b.endTime=t,b.result=Ot("lost",t),!1):!0}const O=document.getElementById("stage"),Ut=O.getContext("2d"),ui=document.getElementById("reset"),Zt=document.getElementById("pauseOverlay");let M=s.display.virtualWidth,$=s.display.virtualHeight,P=1,Y=1,dt=0,ct=0;function qt(){M=s.display.virtualWidth,$=s.display.virtualHeight;const e=window.innerWidth,t=window.innerHeight;Y=Math.min(e/M,t/$);const i=M*Y,n=$*Y;dt=(e-i)/2,ct=(t-n)/2,P=Math.min(window.devicePixelRatio||1,2),O.width=M*P,O.height=$*P,O.style.width=i+"px",O.style.height=n+"px",O.style.left=dt+"px",O.style.top=ct+"px",Ut.setTransform(P,0,0,P,0,0),I(M,$),document.documentElement.style.background=s.display.letterbox,document.body.style.background=s.display.letterbox}function pi(e,t){return{x:(e-dt)/Y,y:(t-ct)/Y}}function W(){I(M,$),Ce(),$e(),Pt(M,$),Nt(!0),N=!1,Zt.classList.remove("show"),ci(performance.now())}let N=!1;function bt(){Jt().state==="playing"&&(N=!N,Zt.classList.toggle("show",N))}be(O,()=>M,()=>$,pi);di(()=>M,()=>$);oe({onPause:bt,onRestart:W});ce({onPause:bt,onRestart:W,onToggleGui:wt});ve(wt);window.addEventListener("keydown",e=>{e.code==="Backquote"&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&(e.preventDefault(),wt())});const zt=document.getElementById("pauseBtn");zt&&zt.addEventListener("click",e=>{e.stopPropagation(),bt()});const Tt=document.getElementById("hint"),Qt=matchMedia("(hover: none) and (pointer: coarse)").matches;function xt(){if(!Tt)return;const e=[];Qt?e.push("drag to throw","top-left to tune"):(e.push("drag to throw","WASD/arrows to thrust","esc to pause","R to restart","` to tune"),pe()&&e.push("gamepad: stick to thrust, start to pause, Y to restart")),Tt.textContent=e.join(" · ")}xt();window.addEventListener("gamepadconnected",xt);window.addEventListener("gamepaddisconnected",xt);if(Qt){const e=document.getElementById("reset");e&&(e.textContent="restart")}ui.addEventListener("click",e=>{e.stopPropagation(),W()});let ht=performance.now();const H=[];let It=0;function te(){const e=performance.now();let t=(e-ht)/1e3;ht=e,t>.05&&(t=.05),Rt(),he();const i=Jt();if(i.state==="playing"&&!N){ge(t,M,$,ye(),Se),xe(Ee),ke(t),_e(t,$);const n=hi(t,e),a=vt()/Math.max(1,ft())*100;if(ei(i.water,a,(e-i.startTime)/1e3),!n&&i.result){Nt(!1);const r=se(i.result),o=i.result;ii(o,r,()=>{ni(W)})}}for(Me(Ut,M,$),H.push(e);H.length&&e-H[0]>1e3;)H.shift();e-It>200&&(ai(H.length),It=e),requestAnimationFrame(te)}window.addEventListener("resize",()=>{qt(),Pt(M,$)});qt();Rt();W();ht=performance.now();te();
