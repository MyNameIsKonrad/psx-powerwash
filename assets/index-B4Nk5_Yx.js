(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const r={stream:{freeSpeed:280,eraseRadius:32,maxThrowSpeed:1800,minThrowSpeed:120,velWindowMs:180,bounceNudgeRad:2*Math.PI/180},edgeSnap:{dist:60,tan:.36,tanFast:.7},grid:{chunkSize:22,chunkGap:1,chunkHp:1},tiles:{gravity:2600,knockBase:110,knockVar:55,streamInherit:.18,rotMax:6,shrink:2.4,upwardKick:-50},splash:{spawnHz:50,life:.15,startSize:12,endSize:36,lineWidth:2,jitter:14,r:124,g:196,b:255},wallColor:"#6e7884",display:{referenceWidth:1280,referenceHeight:720,responsiveMode:"aspect",virtualWidth:1280,virtualHeight:720,letterbox:"#06080b"},keyboard:{accel:2400,maxSpeed:900,perpBrake:3.5},run:{tankSeconds:30,cleanTargetPct:80,drainMultiplier:1}},ke="psxwash:save",Pe=[{id:"tank",name:"tank size",blurb:"+10% water capacity",baseCost:25,costGrowth:1.6,maxLevel:8},{id:"pressure",name:"stream pressure",blurb:"+8% free speed",baseCost:30,costGrowth:1.7,maxLevel:8},{id:"nozzle",name:"nozzle width",blurb:"+6% erase radius",baseCost:40,costGrowth:1.8,maxLevel:6},{id:"recovery",name:"water recovery",blurb:"-5% drain rate",baseCost:50,costGrowth:1.9,maxLevel:5},{id:"payout",name:"soap subsidy",blurb:"+10% currency earned",baseCost:60,costGrowth:2,maxLevel:6}];function H(){return{currency:0,levels:Object.fromEntries(Pe.map(i=>[i.id,0]))}}let he=Ge();function Ge(){try{const i=localStorage.getItem(ke);if(!i)return H();const e=JSON.parse(i);return{...H(),...e,levels:{...H().levels,...e.levels||{}}}}catch{return H()}}function We(){localStorage.setItem(ke,JSON.stringify(he))}function W(i){return he.levels[i]??0}function Ke(){return{tankMul:1+.1*W("tank"),speedMul:1+.08*W("pressure"),radiusMul:1+.06*W("nozzle"),drainMul:1-.05*W("recovery")}}function Ye(){he=H(),We()}const h={scale:1,freeSpeed:280,eraseRadius:32,eraseRadiusSq:32*32,maxThrowSpeed:1800,minThrowSpeed:120,tankSeconds:30,drainMultiplier:1,chunkSize:22,splashJitter:14,splashStartSize:12,splashEndSize:36,splashLineWidth:2,tilesKnockBase:110,tilesKnockVar:55,tilesGravity:2600,tilesUpwardKick:-50,keyboardAccel:2400,keyboardMaxSpeed:900,edgeSnapDist:60};function Me(i,e){const t=Ke(),n=Math.min(i,e)/Math.min(r.display.referenceWidth,r.display.referenceHeight);h.scale=n,h.freeSpeed=r.stream.freeSpeed*t.speedMul*n,h.eraseRadius=r.stream.eraseRadius*t.radiusMul*n,h.eraseRadiusSq=h.eraseRadius*h.eraseRadius,h.maxThrowSpeed=r.stream.maxThrowSpeed*n,h.minThrowSpeed=r.stream.minThrowSpeed*n,h.tankSeconds=r.run.tankSeconds*t.tankMul,h.drainMultiplier=r.run.drainMultiplier*t.drainMul,h.chunkSize=r.grid.chunkSize*n,h.splashJitter=r.splash.jitter*n,h.splashStartSize=r.splash.startSize*n,h.splashEndSize=r.splash.endSize*n,h.splashLineWidth=r.splash.lineWidth*n,h.tilesKnockBase=r.tiles.knockBase*n,h.tilesKnockVar=r.tiles.knockVar*n,h.tilesGravity=r.tiles.gravity*n,h.tilesUpwardKick=r.tiles.upwardKick*n,h.keyboardAccel=r.keyboard.accel*n,h.keyboardMaxSpeed=r.keyboard.maxSpeed*n,h.edgeSnapDist=r.edgeSnap.dist*n}const b=new Set;let K=null,Y=null;function Ne(i){K=i.onPause,Y=i.onRestart,window.addEventListener("keydown",e=>{e.repeat||(b.add(e.code),!(e.ctrlKey||e.metaKey||e.altKey)&&(e.code==="Escape"&&(e.preventDefault(),K==null||K()),e.code==="KeyR"&&(e.preventDefault(),Y==null||Y())))}),window.addEventListener("keyup",e=>{b.delete(e.code)}),window.addEventListener("blur",()=>b.clear())}function je(){let i=0,e=0;return(b.has("ArrowLeft")||b.has("KeyA"))&&(i-=1),(b.has("ArrowRight")||b.has("KeyD"))&&(i+=1),(b.has("ArrowUp")||b.has("KeyW"))&&(e-=1),(b.has("ArrowDown")||b.has("KeyS"))&&(e+=1),{x:i,y:e}}function Je(){return b.has("ArrowLeft")||b.has("ArrowRight")||b.has("ArrowUp")||b.has("ArrowDown")||b.has("KeyA")||b.has("KeyD")||b.has("KeyW")||b.has("KeyS")}const te=.18;let j=null,q=!1;const ve=[];let J=null,X=null,U=null;function Xe(i){J=i.onPause,X=i.onRestart,U=i.onToggleGui,window.addEventListener("gamepadconnected",()=>{q=!0}),window.addEventListener("gamepaddisconnected",()=>{const e=navigator.getGamepads?navigator.getGamepads():[];q=Array.from(e).some(t=>!!t&&t.connected)})}function Ue(){if(!navigator.getGamepads)return;const i=navigator.getGamepads();let e=null;for(const l of i)if(l&&l.connected){e=l;break}if(!e){j=null;return}q=!0;for(let l=0;l<e.buttons.length;l++){const c=e.buttons[l].pressed,m=ve[l]||!1;c&&!m&&(l===9?J==null||J():l===3?X==null||X():l===2&&(U==null||U())),ve[l]=c}const t=e.axes[0]??0,n=e.axes[1]??0,s=Math.hypot(t,n);if(s<te){j=null;return}const a=Math.min(1,(s-te)/(1-te));j={x:t/s,y:n/s,mag:a}}function Ze(){return j}function qe(){return q}function Qe(){if(Je()){const e=je(),t=Math.hypot(e.x,e.y)||1;return{x:e.x/t,y:e.y/t,mag:1}}const i=Ze();return i?{x:i.x,y:i.y,mag:i.mag}:null}const o={x:0,y:0,vx:0,vy:0};function Ce(i,e){o.x=i/2,o.y=e/2;const t=Math.random()*Math.PI*2;o.vx=Math.cos(t)*h.freeSpeed,o.vy=Math.sin(t)*h.freeSpeed}function et(i,e,t,n,s){if(n)return;const a=Qe();if(a){o.vx+=a.x*h.keyboardAccel*a.mag*i,o.vy+=a.y*h.keyboardAccel*a.mag*i;const m=o.vx*-a.y+o.vy*a.x,d=Math.min(1,r.keyboard.perpBrake*a.mag*i);o.vx-=-a.y*m*d,o.vy-=a.x*m*d;const g=Math.hypot(o.vx,o.vy);g>h.keyboardMaxSpeed&&(o.vx=o.vx/g*h.keyboardMaxSpeed,o.vy=o.vy/g*h.keyboardMaxSpeed)}o.x+=o.vx*i,o.y+=o.vy*i;const l=h.eraseRadius*.5;let c=!1;if(o.x<l&&(o.x=l,o.vx=Math.abs(o.vx),c=!0),o.x>e-l&&(o.x=e-l,o.vx=-Math.abs(o.vx),c=!0),o.y<l&&(o.y=l,o.vy=Math.abs(o.vy),c=!0),o.y>t-l&&(o.y=t-l,o.vy=-Math.abs(o.vy),c=!0),c){const m=Math.hypot(o.vx,o.vy),d=Math.atan2(o.vy,o.vx)+(Math.random()*2-1)*r.stream.bounceNudgeRad;o.vx=Math.cos(d)*m,o.vy=Math.sin(d)*m,s(o.x,o.y)}}function tt(i,e,t,n){const s=Math.hypot(i,e),a=h.minThrowSpeed,l=h.maxThrowSpeed,c=Math.max(0,Math.min(1,(s-a)/(l-a))),m=r.edgeSnap.tan+c*(r.edgeSnap.tanFast-r.edgeSnap.tan),d=h.edgeSnapDist,g=o.y<d,p=o.y>n-d,y=o.x<d,w=o.x>t-d;return(g||p)&&Math.abs(e)<Math.abs(i)*m?{vx:Math.sign(i)*s,vy:0}:(y||w)&&Math.abs(i)<Math.abs(e)*m?{vx:0,vy:Math.sign(e)*s}:{vx:i,vy:e}}let P=!1,$e=0,Le=0,ce=()=>0,ue=()=>0;const ye=80;let re=null;function it(i){re=i}let Fe=!0;function nt(i){Fe=i}const L=[];function st(){return P}function rt(){const i=h.eraseRadius*.5,e=ce(),t=ue();o.x<i&&(o.x=i),o.x>e-i&&(o.x=e-i),o.y<i&&(o.y=i),o.y>t-i&&(o.y=t-i)}function we(i,e){if(i<ye&&e<ye&&re){re();return}Fe&&(P=!0,$e=o.x-i,Le=o.y-e,L.length=0,L.push({x:i,y:e,t:performance.now()}))}function be(i,e){if(!P)return;o.x=i+$e,o.y=e+Le,rt(),L.push({x:i,y:e,t:performance.now()});const t=performance.now()-r.stream.velWindowMs-20;for(;L.length>1&&L[0].t<t;)L.shift()}function ie(){if(!P)return;P=!1;const e=performance.now()-r.stream.velWindowMs;let t=L[0];for(const c of L)if(c.t>=e){t=c;break}const n=L[L.length-1];let s=0,a=0;if(t&&n&&n.t>t.t){const c=(n.t-t.t)/1e3;s=(n.x-t.x)/c,a=(n.y-t.y)/c}const l=Math.hypot(s,a);if(l>h.maxThrowSpeed&&(s=s/l*h.maxThrowSpeed,a=a/l*h.maxThrowSpeed),l<h.minThrowSpeed){const c=Math.random()*Math.PI*2;o.vx=Math.cos(c)*h.freeSpeed,o.vy=Math.sin(c)*h.freeSpeed}else{const c=ce(),m=ue(),d=tt(s,a,c,m);o.vx=d.vx,o.vy=d.vy}L.length=0}function at(i,e,t,n){ce=e,ue=t,i.addEventListener("touchstart",s=>{s.preventDefault();const a=s.touches[0],l=n(a.clientX,a.clientY);we(l.x,l.y)},{passive:!1}),i.addEventListener("touchmove",s=>{s.preventDefault();const a=s.touches[0],l=n(a.clientX,a.clientY);be(l.x,l.y)},{passive:!1}),i.addEventListener("touchend",s=>{s.preventDefault(),ie()},{passive:!1}),i.addEventListener("touchcancel",s=>{s.preventDefault(),ie()},{passive:!1}),i.addEventListener("mousedown",s=>{if(s.button!==0)return;const a=n(s.clientX,s.clientY);we(a.x,a.y)}),window.addEventListener("mousemove",s=>{const a=n(s.clientX,s.clientY);be(a.x,a.y)}),window.addEventListener("mouseup",s=>{s.button===0&&ie()})}const A={cols:0,rows:0,data:new Uint8Array(0),initialAlive:0};function O(i,e){const t=h.chunkSize;A.cols=Math.ceil(i/t),A.rows=Math.ceil(e/t),A.data=new Uint8Array(A.cols*A.rows);const n=Math.max(1,r.grid.chunkHp|0);A.data.fill(n),A.initialAlive=A.cols*A.rows}function ot(i){const e=h.chunkSize,t=h.eraseRadius,n=h.eraseRadiusSq,s=Math.max(0,Math.floor((o.x-t)/e)),a=Math.min(A.cols-1,Math.floor((o.x+t)/e)),l=Math.max(0,Math.floor((o.y-t)/e)),c=Math.min(A.rows-1,Math.floor((o.y+t)/e));for(let m=l;m<=c;m++)for(let d=s;d<=a;d++){const g=m*A.cols+d,p=A.data[g];if(p===0)continue;const y=d*e+e/2,w=m*e+e/2,M=y-o.x,C=w-o.y;if(M*M+C*C<=n){const $=p-1;A.data[g]=$,$===0&&i(y,w)}}}const D=[],lt=1200;function dt(i,e){const t=i-o.x,n=e-o.y,s=Math.hypot(t,n)||1,a=t/s,l=n/s,c=Math.hypot(o.vx,o.vy)||1,m=r.tiles.streamInherit,d=o.vx/c*m*c,g=o.vy/c*m*c,p=h.tilesKnockBase+Math.random()*h.tilesKnockVar;D.length>=lt&&D.shift(),D.push({x:i,y:e,vx:a*p+d,vy:l*p+g+h.tilesUpwardKick,rot:(Math.random()-.5)*.4,rotV:(Math.random()*2-1)*r.tiles.rotMax,size:Math.max(1,h.chunkSize-r.grid.chunkGap),scale:1})}function ht(i,e){for(let t=D.length-1;t>=0;t--){const n=D[t];n.vy+=h.tilesGravity*i,n.x+=n.vx*i,n.y+=n.vy*i,n.rot+=n.rotV*i,n.scale-=r.tiles.shrink*i,(n.y>e+80||n.scale<=.05)&&D.splice(t,1)}}function ct(){D.length=0}const T=[];let Z=0;function ze(i,e,t=1){const n=Math.random()*h.splashJitter,s=Math.random()*Math.PI*2;T.push({x:i+Math.cos(s)*n,y:e+Math.sin(s)*n,rot:Math.random()*Math.PI*2,age:0,sizeMul:t})}function ut(i,e){for(let t=0;t<5;t++)ze(i,e,1.35);typeof navigator<"u"&&navigator.vibrate&&navigator.vibrate(12)}function pt(i){Z+=i;const e=1/r.splash.spawnHz;for(;Z>e;)ze(o.x,o.y),Z-=e;for(let t=T.length-1;t>=0;t--)T[t].age+=i,T[t].age>=r.splash.life&&T.splice(t,1)}function gt(){T.length=0,Z=0}function mt(i,e,t){i.fillStyle=r.wallColor,i.fillRect(0,0,e,t);const n=h.chunkSize,s=Math.max(1,n-r.grid.chunkGap),a=Math.max(1,r.grid.chunkHp|0),l={r:0,g:0,b:0},c={r:130,g:86,b:48},m=[];for(let d=1;d<=a;d++){const g=(a-d)/Math.max(1,a-1),p=a===1?0:g,y=Math.round(l.r+(c.r-l.r)*p),w=Math.round(l.g+(c.g-l.g)*p),M=Math.round(l.b+(c.b-l.b)*p);m[d]=`rgb(${y},${w},${M})`}for(let d=0;d<A.rows;d++){const g=d*A.cols;for(let p=0;p<A.cols;p++){const y=A.data[g+p];y&&(i.fillStyle=m[y],i.fillRect(p*n,d*n,s,s))}}for(const d of D){i.save(),i.translate(d.x,d.y),i.rotate(d.rot),i.scale(d.scale,d.scale),i.fillStyle="#000000";const g=d.size/2;i.fillRect(-g,-g,d.size,d.size),i.restore()}i.lineWidth=h.splashLineWidth;for(const d of T){const g=d.age/r.splash.life,p=(h.splashStartSize+(h.splashEndSize-h.splashStartSize)*g)*d.sizeMul,y=.7*(g<.8?1:(1-g)/.2);i.strokeStyle=`rgba(${r.splash.r},${r.splash.g},${r.splash.b},${y})`,i.save(),i.translate(d.x,d.y),i.rotate(d.rot);const w=p/2;i.strokeRect(-w,-w,p,p),i.restore()}i.fillStyle=`rgba(${r.splash.r},${r.splash.g},${r.splash.b},0.95)`,i.fillRect(o.x-2.5,o.y-2.5,5,5)}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class F{constructor(e,t,n,s,a="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(a),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),F.nextNameID=F.nextNameID||0,this.$name.id=`lil-gui-name-${++F.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class ft extends F{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function ae(i){let e,t;return(e=i.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const vt={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:ae,toHexString:ae},G={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},yt={isPrimitive:!1,match:i=>Array.isArray(i),fromHexString(i,e,t=1){const n=G.fromHexString(i);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([i,e,t],n=1){n=255/n;const s=i*n<<16^e*n<<8^t*n<<0;return G.toHexString(s)}},wt={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,e,t=1){const n=G.fromHexString(i);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:i,g:e,b:t},n=1){n=255/n;const s=i*n<<16^e*n<<8^t*n<<0;return G.toHexString(s)}},bt=[vt,G,yt,wt];function xt(i){return bt.find(e=>e.match(i))}class At extends F{constructor(e,t,n,s){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=xt(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const a=ae(this.$text.value);a&&this._setValueFromHexString(a)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class ne extends F{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Et extends F{constructor(e,t,n,s,a,l){super(e,t,n,"number"),this._initInput(),this.min(s),this.max(a);const c=l!==void 0;this.step(c?l:this._getImplicitStep(),c),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let u=parseFloat(this.$input.value);isNaN(u)||(this._stepExplicit&&(u=this._snap(u)),this.setValue(this._clamp(u)))},n=u=>{const v=parseFloat(this.$input.value);isNaN(v)||(this._snapClampSetValue(v+u),this.$input.value=this.getValue())},s=u=>{u.key==="Enter"&&this.$input.blur(),u.code==="ArrowUp"&&(u.preventDefault(),n(this._step*this._arrowKeyMultiplier(u))),u.code==="ArrowDown"&&(u.preventDefault(),n(this._step*this._arrowKeyMultiplier(u)*-1))},a=u=>{this._inputFocused&&(u.preventDefault(),n(this._step*this._normalizeMouseWheel(u)))};let l=!1,c,m,d,g,p;const y=5,w=u=>{c=u.clientX,m=d=u.clientY,l=!0,g=this.getValue(),p=0,window.addEventListener("mousemove",M),window.addEventListener("mouseup",C)},M=u=>{if(l){const v=u.clientX-c,_=u.clientY-m;Math.abs(_)>y?(u.preventDefault(),this.$input.blur(),l=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(v)>y&&C()}if(!l){const v=u.clientY-d;p-=v*this._step*this._arrowKeyMultiplier(u),g+p>this._max?p=this._max-g:g+p<this._min&&(p=this._min-g),this._snapClampSetValue(g+p)}d=u.clientY},C=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",M),window.removeEventListener("mouseup",C)},$=()=>{this._inputFocused=!0},f=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",a,{passive:!1}),this.$input.addEventListener("mousedown",w),this.$input.addEventListener("focus",$),this.$input.addEventListener("blur",f)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(f,u,v,_,ee)=>(f-u)/(v-u)*(ee-_)+_,t=f=>{const u=this.$slider.getBoundingClientRect();let v=e(f,u.left,u.right,this._min,this._max);this._snapClampSetValue(v)},n=f=>{this._setDraggingStyle(!0),t(f.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",a)},s=f=>{t(f.clientX)},a=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",a)};let l=!1,c,m;const d=f=>{f.preventDefault(),this._setDraggingStyle(!0),t(f.touches[0].clientX),l=!1},g=f=>{f.touches.length>1||(this._hasScrollBar?(c=f.touches[0].clientX,m=f.touches[0].clientY,l=!0):d(f),window.addEventListener("touchmove",p,{passive:!1}),window.addEventListener("touchend",y))},p=f=>{if(l){const u=f.touches[0].clientX-c,v=f.touches[0].clientY-m;Math.abs(u)>Math.abs(v)?d(f):(window.removeEventListener("touchmove",p),window.removeEventListener("touchend",y))}else f.preventDefault(),t(f.touches[0].clientX)},y=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",p),window.removeEventListener("touchend",y)},w=this._callOnFinishChange.bind(this),M=400;let C;const $=f=>{if(Math.abs(f.deltaX)<Math.abs(f.deltaY)&&this._hasScrollBar)return;f.preventDefault();const v=this._normalizeMouseWheel(f)*this._step;this._snapClampSetValue(this.getValue()+v),this.$input.value=this.getValue(),clearTimeout(C),C=setTimeout(w,M)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",g,{passive:!1}),this.$slider.addEventListener("wheel",$,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class St extends F{constructor(e,t,n,s){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class _t extends F{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var kt=`.lil-gui {
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
}`;function Mt(i){const e=document.createElement("style");e.innerHTML=i;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let xe=!1;class pe{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:s,title:a="Controls",closeFolders:l=!1,injectStyles:c=!0,touchStyles:m=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(a),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),m&&this.domElement.classList.add("allow-touch-styles"),!xe&&c&&(Mt(kt),xe=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=l}add(e,t,n,s,a){if(Object(n)===n)return new St(this,e,t,n);const l=e[t];switch(typeof l){case"number":return new Et(this,e,t,n,s,a);case"boolean":return new ft(this,e,t);case"string":return new _t(this,e,t);case"function":return new ne(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,l)}addColor(e,t,n=1){return new At(this,e,t,n)}addFolder(e){const t=new pe({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof ne||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof ne)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=a=>{a.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const s=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}const E=i=>document.getElementById(i);E("waterFill");E("cleanVal");E("timeVal");E("endOverlay");E("endTitle");E("endVerdict");E("endTime");E("endClean");E("endWater");E("endEff");E("endEarned");E("endContinue");E("shopOverlay");E("shopStart");E("shopBalance");E("upgradeList");const Ct=E("fps");function $t(i){Ct.classList.toggle("show",i)}const Lt=JSON.parse(JSON.stringify(r)),De="psxwash:presets";let x=null,se=!1;function N(){try{return JSON.parse(localStorage.getItem(De)||"{}")}catch{return{}}}function Ae(i){localStorage.setItem(De,JSON.stringify(i))}function Ee(i){for(const e of Object.keys(r)){const t=i[e],n=r[e];t&&typeof t=="object"&&typeof n=="object"?Object.assign(n,t):t!==void 0&&(r[e]=t)}x&&x.controllersRecursive().forEach(e=>e.updateDisplay())}function Ft(i,e,t){return"#"+[i,e,t].map(n=>Math.round(n).toString(16).padStart(2,"0")).join("")}function zt(i){const e=i.replace("#","");return{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4,6),16)}}function Dt(i,e){x=new pe({title:"tuning · tap top-left to hide",width:280}),x.hide();const t=x.addFolder("Stream");t.add(r.stream,"freeSpeed",50,800,1).name("free speed (px/s)"),t.add(r.stream,"eraseRadius",8,100,1).name("erase radius"),t.add(r.stream,"maxThrowSpeed",400,4e3,10).name("max throw speed"),t.add(r.stream,"minThrowSpeed",0,400,5).name("min throw speed"),t.add(r.stream,"velWindowMs",100,400,5).name("vel window (ms)"),t.add(r.stream,"bounceNudgeRad",0,.3,.005).name("bounce nudge (rad)");const n=x.addFolder("Edge Snap");n.add(r.edgeSnap,"dist",10,200,1).name("dist (px)"),n.add(r.edgeSnap,"tan",0,1.5,.01).name("slow tan"),n.add(r.edgeSnap,"tanFast",0,2,.01).name("fast tan");const s=x.addFolder("Grid");s.add(r.grid,"chunkSize",4,64,1).name("chunk size").onFinishChange(()=>O(i(),e())),s.add(r.grid,"chunkGap",0,6,1).name("chunk gap").onFinishChange(()=>O(i(),e())),s.add(r.grid,"chunkHp",1,5,1).name("chunk HP (layers)").onFinishChange(()=>O(i(),e()));const a=x.addFolder("Tiles");a.add(r.tiles,"gravity",0,6e3,50).name("gravity"),a.add(r.tiles,"knockBase",0,400,5).name("knock base"),a.add(r.tiles,"knockVar",0,400,5).name("knock variance"),a.add(r.tiles,"streamInherit",0,1,.01).name("stream inherit"),a.add(r.tiles,"rotMax",0,20,.1).name("rot max (rad/s)"),a.add(r.tiles,"shrink",0,8,.1).name("shrink rate"),a.add(r.tiles,"upwardKick",-300,100,5).name("upward kick");const l=x.addFolder("Splash");l.add(r.splash,"spawnHz",0,200,1).name("spawn Hz"),l.add(r.splash,"life",.02,1,.01).name("life (s)"),l.add(r.splash,"startSize",0,80,1).name("start size"),l.add(r.splash,"endSize",0,200,1).name("end size"),l.add(r.splash,"lineWidth",.5,8,.5).name("line width"),l.add(r.splash,"jitter",0,80,1).name("jitter");const c={color:Ft(r.splash.r,r.splash.g,r.splash.b)};l.addColor(c,"color").name("color").onChange(v=>{const{r:_,g:ee,b:Re}=zt(v);r.splash.r=_,r.splash.g=ee,r.splash.b=Re}),x.addFolder("Wall").addColor(r,"wallColor").name("wall color");const d=x.addFolder("Display");d.add(r.display,"responsiveMode",["aspect","fixed","continuous"]).name("responsive mode").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),d.add(r.display,"referenceWidth",320,1920,16).name("reference width").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),d.add(r.display,"referenceHeight",180,1080,16).name("reference height").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),d.add(r.display,"virtualWidth",320,3840,16).name("virtual width (fixed)").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),d.add(r.display,"virtualHeight",180,2160,16).name("virtual height (fixed)").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),d.addColor(r.display,"letterbox").name("letterbox color");const g=x.addFolder("Keyboard");g.add(r.keyboard,"accel",0,8e3,50).name("accel (px/s²)"),g.add(r.keyboard,"maxSpeed",0,3e3,25).name("max speed"),g.add(r.keyboard,"perpBrake",0,12,.1).name("perp brake");const p=x.addFolder("Run");p.add(r.run,"tankSeconds",5,120,1).name("tank seconds"),p.add(r.run,"cleanTargetPct",10,100,1).name("clean target %"),p.add(r.run,"drainMultiplier",0,3,.05).name("drain multiplier");const y=x.addFolder("Presets"),w={name:"preset-1",selected:""};y.add(w,"name").name("name");let M=y.add(w,"selected",[""]).name("saved");function C(){const v=N(),_=Object.keys(v);M=M.options(_.length?_:["(none)"]),_.length&&M.setValue(_[0])}C();const $={save(){const v=N();v[w.name]=JSON.parse(JSON.stringify(r)),Ae(v),C()},load(){const _=N()[w.selected];_&&(Ee(_),O(i(),e()))},delete(){const v=N();delete v[w.selected],Ae(v),C()},resetDefaults(){Ee(Lt),O(i(),e())}};y.add($,"save").name("save preset"),y.add($,"load").name("load preset"),y.add($,"delete").name("delete preset"),y.add($,"resetDefaults").name("reset to defaults");const f=x.addFolder("Debug");f.close();const u={showFps:!1};f.add(u,"showFps").name("show FPS").onChange(v=>$t(v)),f.add({wipeSave:()=>{Ye()}},"wipeSave").name("wipe save (currency + upgrades)")}function ge(){x&&(se=!se,se?x.show():x.hide())}const I={state:"playing",water:1,startTime:0,endTime:0,result:null};function Oe(){return I}function Ot(i){I.state="playing",I.water=1,I.startTime=i,I.endTime=0,I.result=null}const z=document.getElementById("stage"),Te=z.getContext("2d"),Tt=document.getElementById("reset"),Ie=document.getElementById("pauseOverlay");let k=r.display.virtualWidth,S=r.display.virtualHeight,V=1,B=1,oe=0,le=0;function Ve(){const i=window.innerWidth,e=window.innerHeight,t=r.display;if(t.responsiveMode==="aspect")i>=e?(t.virtualWidth=t.referenceWidth,t.virtualHeight=t.referenceHeight):(t.virtualWidth=t.referenceHeight,t.virtualHeight=t.referenceWidth);else if(t.responsiveMode==="continuous"){const a=Math.min(t.referenceWidth,t.referenceHeight);i>=e?(t.virtualHeight=a,t.virtualWidth=Math.round(a*i/e/16)*16):(t.virtualWidth=a,t.virtualHeight=Math.round(a*e/i/16)*16)}k=t.virtualWidth,S=t.virtualHeight,Me(k,S),B=Math.min(i/k,e/S);const n=k*B,s=S*B;oe=(i-n)/2,le=(e-s)/2,V=Math.min(window.devicePixelRatio||1,2),z.width=k*V,z.height=S*V,z.style.width=n+"px",z.style.height=s+"px",z.style.left=oe+"px",z.style.top=le+"px",Te.setTransform(V,0,0,V,0,0),O(k,S),document.documentElement.style.background=r.display.letterbox,document.body.style.background=r.display.letterbox}function It(i,e){return{x:(i-oe)/B,y:(e-le)/B}}function Q(){O(k,S),ct(),gt(),Ce(k,S),nt(!0),R=!1,Ie.classList.remove("show"),Ot(performance.now())}let R=!1;function me(){Oe().state==="playing"&&(R=!R,Ie.classList.toggle("show",R))}at(z,()=>k,()=>S,It);Dt(()=>k,()=>S);Ne({onPause:me,onRestart:Q});Xe({onPause:me,onRestart:Q,onToggleGui:ge});it(ge);window.addEventListener("keydown",i=>{i.code==="Backquote"&&!i.ctrlKey&&!i.metaKey&&!i.altKey&&(i.preventDefault(),ge())});const Se=document.getElementById("pauseBtn");Se&&Se.addEventListener("click",i=>{i.stopPropagation(),me()});const _e=document.getElementById("hint"),He=matchMedia("(hover: none) and (pointer: coarse)").matches;function fe(){if(!_e)return;const i=[];He?i.push("drag to throw","top-left to tune"):(i.push("drag to throw","WASD/arrows to thrust","esc to pause","R to restart","` to tune"),qe()&&i.push("gamepad: stick to thrust, start to pause, Y to restart")),_e.textContent=i.join(" · ")}fe();window.addEventListener("gamepadconnected",fe);window.addEventListener("gamepaddisconnected",fe);if(He){const i=document.getElementById("reset");i&&(i.textContent="restart")}Tt.addEventListener("click",i=>{i.stopPropagation(),Q()});let de=performance.now();function Be(){const i=performance.now();let e=(i-de)/1e3;de=i,e>.05&&(e=.05),Me(k,S),Ue(),Oe().state==="playing"&&!R&&(et(e,k,S,st(),ut),ot(dt),pt(e),ht(e,S)),mt(Te,k,S),requestAnimationFrame(Be)}window.addEventListener("resize",()=>{Ve(),Ce(k,S)});Ve();Q();de=performance.now();Be();
