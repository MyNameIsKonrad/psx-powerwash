(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();const n={stream:{freeSpeed:280,eraseRadius:32,maxThrowSpeed:1800,minThrowSpeed:120,velWindowMs:180,bounceNudgeRad:2*Math.PI/180,drag:.15},edgeSnap:{dist:60,tan:.36,tanFast:.7},grid:{chunkSize:22,chunkGap:1,surfaceResistance:5,damageRate:2},tiles:{gravity:2600,knockBase:110,knockVar:55,streamInherit:.18,rotMax:6,shrink:2.4,upwardKick:-50},splash:{spawnHz:50,life:.15,startSize:12,endSize:36,lineWidth:2,jitter:14,r:124,g:196,b:255},wallColor:"#6e7884",display:{referenceWidth:1280,referenceHeight:720,responsiveMode:"aspect",virtualWidth:1280,virtualHeight:720,letterbox:"#06080b"},keyboard:{accel:2400,maxSpeed:900,perpBrake:3.5},run:{tankSeconds:30,cleanTargetPct:80,drainMultiplier:1}},ke="psxwash:save",Ge=[{id:"tank",name:"tank size",blurb:"+10% water capacity",baseCost:25,costGrowth:1.6,maxLevel:8},{id:"pressure",name:"stream pressure",blurb:"+8% free speed",baseCost:30,costGrowth:1.7,maxLevel:8},{id:"nozzle",name:"nozzle width",blurb:"+6% erase radius",baseCost:40,costGrowth:1.8,maxLevel:6},{id:"recovery",name:"water recovery",blurb:"-5% drain rate",baseCost:50,costGrowth:1.9,maxLevel:5},{id:"payout",name:"soap subsidy",blurb:"+10% currency earned",baseCost:60,costGrowth:2,maxLevel:6}];function V(){return{currency:0,levels:Object.fromEntries(Ge.map(i=>[i.id,0]))}}let he=Pe();function Pe(){try{const i=localStorage.getItem(ke);if(!i)return V();const e=JSON.parse(i);return{...V(),...e,levels:{...V().levels,...e.levels||{}}}}catch{return V()}}function Ke(){localStorage.setItem(ke,JSON.stringify(he))}function K(i){return he.levels[i]??0}function We(){return{tankMul:1+.1*K("tank"),speedMul:1+.08*K("pressure"),radiusMul:1+.06*K("nozzle"),drainMul:1-.05*K("recovery")}}function Ye(){he=V(),Ke()}const d={scale:1,freeSpeed:280,eraseRadius:32,eraseRadiusSq:32*32,maxThrowSpeed:1800,minThrowSpeed:120,tankSeconds:30,drainMultiplier:1,chunkSize:22,damageRate:2,splashJitter:14,splashStartSize:12,splashEndSize:36,splashLineWidth:2,tilesKnockBase:110,tilesKnockVar:55,tilesGravity:2600,tilesUpwardKick:-50,keyboardAccel:2400,keyboardMaxSpeed:900,edgeSnapDist:60};function Ce(i,e){const t=We(),s=Math.min(i,e)/Math.min(n.display.referenceWidth,n.display.referenceHeight);d.scale=s,d.freeSpeed=n.stream.freeSpeed*t.speedMul*s,d.eraseRadius=n.stream.eraseRadius*t.radiusMul*s,d.eraseRadiusSq=d.eraseRadius*d.eraseRadius,d.maxThrowSpeed=n.stream.maxThrowSpeed*s,d.minThrowSpeed=n.stream.minThrowSpeed*s,d.tankSeconds=n.run.tankSeconds*t.tankMul,d.drainMultiplier=n.run.drainMultiplier*t.drainMul,d.chunkSize=n.grid.chunkSize*s,d.damageRate=n.grid.damageRate,d.splashJitter=n.splash.jitter*s,d.splashStartSize=n.splash.startSize*s,d.splashEndSize=n.splash.endSize*s,d.splashLineWidth=n.splash.lineWidth*s,d.tilesKnockBase=n.tiles.knockBase*s,d.tilesKnockVar=n.tiles.knockVar*s,d.tilesGravity=n.tiles.gravity*s,d.tilesUpwardKick=n.tiles.upwardKick*s,d.keyboardAccel=n.keyboard.accel*s,d.keyboardMaxSpeed=n.keyboard.maxSpeed*s,d.edgeSnapDist=n.edgeSnap.dist*s}const w=new Set;let W=null,Y=null;function Ne(i){W=i.onPause,Y=i.onRestart,window.addEventListener("keydown",e=>{e.repeat||(w.add(e.code),!(e.ctrlKey||e.metaKey||e.altKey)&&(e.code==="Escape"&&(e.preventDefault(),W==null||W()),e.code==="KeyR"&&(e.preventDefault(),Y==null||Y())))}),window.addEventListener("keyup",e=>{w.delete(e.code)}),window.addEventListener("blur",()=>w.clear())}function je(){let i=0,e=0;return(w.has("ArrowLeft")||w.has("KeyA"))&&(i-=1),(w.has("ArrowRight")||w.has("KeyD"))&&(i+=1),(w.has("ArrowUp")||w.has("KeyW"))&&(e-=1),(w.has("ArrowDown")||w.has("KeyS"))&&(e+=1),{x:i,y:e}}function Je(){return w.has("ArrowLeft")||w.has("ArrowRight")||w.has("ArrowUp")||w.has("ArrowDown")||w.has("KeyA")||w.has("KeyD")||w.has("KeyW")||w.has("KeyS")}const te=.18;let j=null,q=!1;const ve=[];let J=null,X=null,U=null;function Xe(i){J=i.onPause,X=i.onRestart,U=i.onToggleGui,window.addEventListener("gamepadconnected",()=>{q=!0}),window.addEventListener("gamepaddisconnected",()=>{const e=navigator.getGamepads?navigator.getGamepads():[];q=Array.from(e).some(t=>!!t&&t.connected)})}function Ue(){if(!navigator.getGamepads)return;const i=navigator.getGamepads();let e=null;for(const l of i)if(l&&l.connected){e=l;break}if(!e){j=null;return}q=!0;for(let l=0;l<e.buttons.length;l++){const u=e.buttons[l].pressed,h=ve[l]||!1;u&&!h&&(l===9?J==null||J():l===3?X==null||X():l===2&&(U==null||U())),ve[l]=u}const t=e.axes[0]??0,s=e.axes[1]??0,a=Math.hypot(t,s);if(a<te){j=null;return}const r=Math.min(1,(a-te)/(1-te));j={x:t/a,y:s/a,mag:r}}function Ze(){return j}function qe(){return q}function Qe(){if(Je()){const e=je(),t=Math.hypot(e.x,e.y)||1;return{x:e.x/t,y:e.y/t,mag:1}}const i=Ze();return i?{x:i.x,y:i.y,mag:i.mag}:null}const o={x:0,y:0,vx:0,vy:0};function Me(i,e){o.x=i/2,o.y=e/2;const t=Math.random()*Math.PI*2;o.vx=Math.cos(t)*d.freeSpeed,o.vy=Math.sin(t)*d.freeSpeed}function et(i,e,t,s,a){if(s)return;const r=Qe();if(r){o.vx+=r.x*d.keyboardAccel*r.mag*i,o.vy+=r.y*d.keyboardAccel*r.mag*i;const h=o.vx*-r.y+o.vy*r.x,c=Math.min(1,n.keyboard.perpBrake*r.mag*i);o.vx-=-r.y*h*c,o.vy-=r.x*h*c;const g=Math.hypot(o.vx,o.vy);g>d.keyboardMaxSpeed&&(o.vx=o.vx/g*d.keyboardMaxSpeed,o.vy=o.vy/g*d.keyboardMaxSpeed)}if(!r){const h=Math.max(0,1-n.stream.drag*i);o.vx*=h,o.vy*=h}o.x+=o.vx*i,o.y+=o.vy*i;const l=d.eraseRadius*.5;let u=!1;if(o.x<l&&(o.x=l,o.vx=Math.abs(o.vx),u=!0),o.x>e-l&&(o.x=e-l,o.vx=-Math.abs(o.vx),u=!0),o.y<l&&(o.y=l,o.vy=Math.abs(o.vy),u=!0),o.y>t-l&&(o.y=t-l,o.vy=-Math.abs(o.vy),u=!0),u){const h=Math.hypot(o.vx,o.vy),c=Math.atan2(o.vy,o.vx)+(Math.random()*2-1)*n.stream.bounceNudgeRad;o.vx=Math.cos(c)*h,o.vy=Math.sin(c)*h,a(o.x,o.y)}}function tt(i,e,t,s){const a=Math.hypot(i,e),r=d.minThrowSpeed,l=d.maxThrowSpeed,u=Math.max(0,Math.min(1,(a-r)/(l-r))),h=n.edgeSnap.tan+u*(n.edgeSnap.tanFast-n.edgeSnap.tan),c=d.edgeSnapDist,g=o.y<c,f=o.y>s-c,y=o.x<c,S=o.x>t-c;return(g||f)&&Math.abs(e)<Math.abs(i)*h?{vx:Math.sign(i)*a,vy:0}:(y||S)&&Math.abs(i)<Math.abs(e)*h?{vx:0,vy:Math.sign(e)*a}:{vx:i,vy:e}}let G=!1,$e=0,Le=0,ce=()=>0,ue=()=>0;const ye=80;let ae=null;function it(i){ae=i}let Fe=!0;function st(i){Fe=i}const L=[];function nt(){return G}function at(){const i=d.eraseRadius*.5,e=ce(),t=ue();o.x<i&&(o.x=i),o.x>e-i&&(o.x=e-i),o.y<i&&(o.y=i),o.y>t-i&&(o.y=t-i)}function we(i,e){if(i<ye&&e<ye&&ae){ae();return}Fe&&(G=!0,$e=o.x-i,Le=o.y-e,L.length=0,L.push({x:i,y:e,t:performance.now()}))}function be(i,e){if(!G)return;o.x=i+$e,o.y=e+Le,at(),L.push({x:i,y:e,t:performance.now()});const t=performance.now()-n.stream.velWindowMs-20;for(;L.length>1&&L[0].t<t;)L.shift()}function ie(){if(!G)return;G=!1;const e=performance.now()-n.stream.velWindowMs;let t=L[0];for(const u of L)if(u.t>=e){t=u;break}const s=L[L.length-1];let a=0,r=0;if(t&&s&&s.t>t.t){const u=(s.t-t.t)/1e3;a=(s.x-t.x)/u,r=(s.y-t.y)/u}const l=Math.hypot(a,r);if(l>d.maxThrowSpeed&&(a=a/l*d.maxThrowSpeed,r=r/l*d.maxThrowSpeed),l>=d.minThrowSpeed){const u=ce(),h=ue(),c=tt(a,r,u,h);o.vx=c.vx,o.vy=c.vy}else o.vx=0,o.vy=0;L.length=0}function rt(i,e,t,s){ce=e,ue=t,i.addEventListener("touchstart",a=>{a.preventDefault();const r=a.touches[0],l=s(r.clientX,r.clientY);we(l.x,l.y)},{passive:!1}),i.addEventListener("touchmove",a=>{a.preventDefault();const r=a.touches[0],l=s(r.clientX,r.clientY);be(l.x,l.y)},{passive:!1}),i.addEventListener("touchend",a=>{a.preventDefault(),ie()},{passive:!1}),i.addEventListener("touchcancel",a=>{a.preventDefault(),ie()},{passive:!1}),i.addEventListener("mousedown",a=>{if(a.button!==0)return;const r=s(a.clientX,a.clientY);we(r.x,r.y)}),window.addEventListener("mousemove",a=>{const r=s(a.clientX,a.clientY);be(r.x,r.y)}),window.addEventListener("mouseup",a=>{a.button===0&&ie()})}const x={cols:0,rows:0,data:new Float32Array(0),initialAlive:0};function O(i,e){const t=d.chunkSize;x.cols=Math.ceil(i/t),x.rows=Math.ceil(e/t),x.data=new Float32Array(x.cols*x.rows),x.data.fill(n.grid.surfaceResistance),x.initialAlive=x.cols*x.rows}function ot(i,e){const t=d.chunkSize,s=d.eraseRadius,a=d.eraseRadiusSq,r=d.damageRate*i,l=Math.max(0,Math.floor((o.x-s)/t)),u=Math.min(x.cols-1,Math.floor((o.x+s)/t)),h=Math.max(0,Math.floor((o.y-s)/t)),c=Math.min(x.rows-1,Math.floor((o.y+s)/t));for(let g=h;g<=c;g++)for(let f=l;f<=u;f++){const y=g*x.cols+f,S=x.data[y];if(S<=0)continue;const M=f*t+t/2,C=g*t+t/2,$=M-o.x,m=C-o.y;if($*$+m*m<=a){const p=S-r;x.data[y]=p,p<=0&&e(M,C)}}}const D=[],lt=1200;function dt(i,e){const t=i-o.x,s=e-o.y,a=Math.hypot(t,s)||1,r=t/a,l=s/a,u=Math.hypot(o.vx,o.vy)||1,h=n.tiles.streamInherit,c=o.vx/u*h*u,g=o.vy/u*h*u,f=d.tilesKnockBase+Math.random()*d.tilesKnockVar;D.length>=lt&&D.shift(),D.push({x:i,y:e,vx:r*f+c,vy:l*f+g+d.tilesUpwardKick,rot:(Math.random()-.5)*.4,rotV:(Math.random()*2-1)*n.tiles.rotMax,size:Math.max(1,d.chunkSize-n.grid.chunkGap),scale:1})}function ht(i,e){for(let t=D.length-1;t>=0;t--){const s=D[t];s.vy+=d.tilesGravity*i,s.x+=s.vx*i,s.y+=s.vy*i,s.rot+=s.rotV*i,s.scale-=n.tiles.shrink*i,(s.y>e+80||s.scale<=.05)&&D.splice(t,1)}}function ct(){D.length=0}const R=[];let Z=0;function ze(i,e,t=1){const s=Math.random()*d.splashJitter,a=Math.random()*Math.PI*2;R.push({x:i+Math.cos(a)*s,y:e+Math.sin(a)*s,rot:Math.random()*Math.PI*2,age:0,sizeMul:t})}function ut(i,e){for(let t=0;t<5;t++)ze(i,e,1.35);typeof navigator<"u"&&navigator.vibrate&&navigator.vibrate(12)}function pt(i){Z+=i;const e=1/n.splash.spawnHz;for(;Z>e;)ze(o.x,o.y),Z-=e;for(let t=R.length-1;t>=0;t--)R[t].age+=i,R[t].age>=n.splash.life&&R.splice(t,1)}function gt(){R.length=0,Z=0}function mt(i,e,t){i.fillStyle=n.wallColor,i.fillRect(0,0,e,t);const s=d.chunkSize,a=Math.max(1,s-n.grid.chunkGap),r=n.grid.surfaceResistance,l=64,u=new Array(l+1);for(let h=0;h<=l;h++){const c=h/l,g=Math.round(0+130*c),f=Math.round(0+86*c),y=Math.round(0+48*c);u[h]=`rgb(${g},${f},${y})`}for(let h=0;h<x.rows;h++){const c=h*x.cols;for(let g=0;g<x.cols;g++){const f=x.data[c+g];if(f<=0)continue;const y=Math.round((1-f/r)*l);i.fillStyle=u[Math.max(0,Math.min(l,y))],i.fillRect(g*s,h*s,a,a)}}for(const h of D){i.save(),i.translate(h.x,h.y),i.rotate(h.rot),i.scale(h.scale,h.scale),i.fillStyle="#000000";const c=h.size/2;i.fillRect(-c,-c,h.size,h.size),i.restore()}i.lineWidth=d.splashLineWidth;for(const h of R){const c=h.age/n.splash.life,g=(d.splashStartSize+(d.splashEndSize-d.splashStartSize)*c)*h.sizeMul,f=.7*(c<.8?1:(1-c)/.2);i.strokeStyle=`rgba(${n.splash.r},${n.splash.g},${n.splash.b},${f})`,i.save(),i.translate(h.x,h.y),i.rotate(h.rot);const y=g/2;i.strokeRect(-y,-y,g,g),i.restore()}i.fillStyle=`rgba(${n.splash.r},${n.splash.g},${n.splash.b},0.95)`,i.fillRect(o.x-2.5,o.y-2.5,5,5)}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class F{constructor(e,t,s,a,r="div"){this.parent=e,this.object=t,this.property=s,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("controller"),this.domElement.classList.add(a),this.$name=document.createElement("div"),this.$name.classList.add("name"),F.nextNameID=F.nextNameID||0,this.$name.id=`lil-gui-name-${++F.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(s)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class ft extends F{constructor(e,t,s){super(e,t,s,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function re(i){let e,t;return(e=i.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const vt={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:re,toHexString:re},P={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},yt={isPrimitive:!1,match:i=>Array.isArray(i),fromHexString(i,e,t=1){const s=P.fromHexString(i);e[0]=(s>>16&255)/255*t,e[1]=(s>>8&255)/255*t,e[2]=(s&255)/255*t},toHexString([i,e,t],s=1){s=255/s;const a=i*s<<16^e*s<<8^t*s<<0;return P.toHexString(a)}},wt={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,e,t=1){const s=P.fromHexString(i);e.r=(s>>16&255)/255*t,e.g=(s>>8&255)/255*t,e.b=(s&255)/255*t},toHexString({r:i,g:e,b:t},s=1){s=255/s;const a=i*s<<16^e*s<<8^t*s<<0;return P.toHexString(a)}},bt=[vt,P,yt,wt];function xt(i){return bt.find(e=>e.match(i))}class At extends F{constructor(e,t,s,a){super(e,t,s,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=xt(this.initialValue),this._rgbScale=a,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=re(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class se extends F{constructor(e,t,s){super(e,t,s,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",a=>{a.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Et extends F{constructor(e,t,s,a,r,l){super(e,t,s,"number"),this._initInput(),this.min(a),this.max(r);const u=l!==void 0;this.step(u?l:this._getImplicitStep(),u),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let p=parseFloat(this.$input.value);isNaN(p)||(this._stepExplicit&&(p=this._snap(p)),this.setValue(this._clamp(p)))},s=p=>{const v=parseFloat(this.$input.value);isNaN(v)||(this._snapClampSetValue(v+p),this.$input.value=this.getValue())},a=p=>{p.key==="Enter"&&this.$input.blur(),p.code==="ArrowUp"&&(p.preventDefault(),s(this._step*this._arrowKeyMultiplier(p))),p.code==="ArrowDown"&&(p.preventDefault(),s(this._step*this._arrowKeyMultiplier(p)*-1))},r=p=>{this._inputFocused&&(p.preventDefault(),s(this._step*this._normalizeMouseWheel(p)))};let l=!1,u,h,c,g,f;const y=5,S=p=>{u=p.clientX,h=c=p.clientY,l=!0,g=this.getValue(),f=0,window.addEventListener("mousemove",M),window.addEventListener("mouseup",C)},M=p=>{if(l){const v=p.clientX-u,_=p.clientY-h;Math.abs(_)>y?(p.preventDefault(),this.$input.blur(),l=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(v)>y&&C()}if(!l){const v=p.clientY-c;f-=v*this._step*this._arrowKeyMultiplier(p),g+f>this._max?f=this._max-g:g+f<this._min&&(f=this._min-g),this._snapClampSetValue(g+f)}c=p.clientY},C=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",M),window.removeEventListener("mouseup",C)},$=()=>{this._inputFocused=!0},m=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",a),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",S),this.$input.addEventListener("focus",$),this.$input.addEventListener("blur",m)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(m,p,v,_,ee)=>(m-p)/(v-p)*(ee-_)+_,t=m=>{const p=this.$slider.getBoundingClientRect();let v=e(m,p.left,p.right,this._min,this._max);this._snapClampSetValue(v)},s=m=>{this._setDraggingStyle(!0),t(m.clientX),window.addEventListener("mousemove",a),window.addEventListener("mouseup",r)},a=m=>{t(m.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",a),window.removeEventListener("mouseup",r)};let l=!1,u,h;const c=m=>{m.preventDefault(),this._setDraggingStyle(!0),t(m.touches[0].clientX),l=!1},g=m=>{m.touches.length>1||(this._hasScrollBar?(u=m.touches[0].clientX,h=m.touches[0].clientY,l=!0):c(m),window.addEventListener("touchmove",f,{passive:!1}),window.addEventListener("touchend",y))},f=m=>{if(l){const p=m.touches[0].clientX-u,v=m.touches[0].clientY-h;Math.abs(p)>Math.abs(v)?c(m):(window.removeEventListener("touchmove",f),window.removeEventListener("touchend",y))}else m.preventDefault(),t(m.touches[0].clientX)},y=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",f),window.removeEventListener("touchend",y)},S=this._callOnFinishChange.bind(this),M=400;let C;const $=m=>{if(Math.abs(m.deltaX)<Math.abs(m.deltaY)&&this._hasScrollBar)return;m.preventDefault();const v=this._normalizeMouseWheel(m)*this._step;this._snapClampSetValue(this.getValue()+v),this.$input.value=this.getValue(),clearTimeout(C),C=setTimeout(S,M)};this.$slider.addEventListener("mousedown",s),this.$slider.addEventListener("touchstart",g,{passive:!1}),this.$slider.addEventListener("wheel",$,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:s}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,s=-e.wheelDelta/120,s*=this._stepExplicit?1:10),t+-s}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class St extends F{constructor(e,t,s,a){super(e,t,s,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(a)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const s=document.createElement("option");s.textContent=t,this.$select.appendChild(s)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class _t extends F{constructor(e,t,s){super(e,t,s,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",a=>{a.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var kt=`.lil-gui {
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
}`;function Ct(i){const e=document.createElement("style");e.innerHTML=i;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let xe=!1;class pe{constructor({parent:e,autoPlace:t=e===void 0,container:s,width:a,title:r="Controls",closeFolders:l=!1,injectStyles:u=!0,touchStyles:h=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),h&&this.domElement.classList.add("allow-touch-styles"),!xe&&u&&(Ct(kt),xe=!0),s?s.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),a&&this.domElement.style.setProperty("--width",a+"px"),this._closeFolders=l}add(e,t,s,a,r){if(Object(s)===s)return new St(this,e,t,s);const l=e[t];switch(typeof l){case"number":return new Et(this,e,t,s,a,r);case"boolean":return new ft(this,e,t);case"string":return new _t(this,e,t);case"function":return new se(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,l)}addColor(e,t,s=1){return new At(this,e,t,s)}addFolder(e){const t=new pe({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(s=>{s instanceof se||s._name in e.controllers&&s.load(e.controllers[s._name])}),t&&e.folders&&this.folders.forEach(s=>{s._title in e.folders&&s.load(e.folders[s._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(s=>{if(!(s instanceof se)){if(s._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${s._name}"`);t.controllers[s._name]=s.save()}}),e&&this.folders.forEach(s=>{if(s._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${s._title}"`);t.folders[s._title]=s.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const s=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",s))};this.$children.addEventListener("transitionend",s);const a=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=a+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(s=>s.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}const A=i=>document.getElementById(i);A("waterFill");A("cleanVal");A("timeVal");A("endOverlay");A("endTitle");A("endVerdict");A("endTime");A("endClean");A("endWater");A("endEff");A("endEarned");A("endContinue");A("shopOverlay");A("shopStart");A("shopBalance");A("upgradeList");const Mt=A("fps");function $t(i){Mt.classList.toggle("show",i)}const Lt=JSON.parse(JSON.stringify(n)),De="psxwash:presets";let b=null,ne=!1;function N(){try{return JSON.parse(localStorage.getItem(De)||"{}")}catch{return{}}}function Ae(i){localStorage.setItem(De,JSON.stringify(i))}function Ee(i){for(const e of Object.keys(n)){const t=i[e],s=n[e];t&&typeof t=="object"&&typeof s=="object"?Object.assign(s,t):t!==void 0&&(n[e]=t)}b&&b.controllersRecursive().forEach(e=>e.updateDisplay())}function Ft(i,e,t){return"#"+[i,e,t].map(s=>Math.round(s).toString(16).padStart(2,"0")).join("")}function zt(i){const e=i.replace("#","");return{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4,6),16)}}function Dt(i,e){b=new pe({title:"tuning · tap top-left to hide",width:280}),b.hide();const t=b.addFolder("Stream");t.add(n.stream,"freeSpeed",50,800,1).name("free speed (px/s)"),t.add(n.stream,"eraseRadius",8,100,1).name("erase radius"),t.add(n.stream,"maxThrowSpeed",400,4e3,10).name("max throw speed"),t.add(n.stream,"minThrowSpeed",0,400,5).name("min throw speed"),t.add(n.stream,"velWindowMs",100,400,5).name("vel window (ms)"),t.add(n.stream,"bounceNudgeRad",0,.3,.005).name("bounce nudge (rad)"),t.add(n.stream,"drag",0,1,.01).name("drag (0=none, 1=instant stop)");const s=b.addFolder("Edge Snap");s.add(n.edgeSnap,"dist",10,200,1).name("dist (px)"),s.add(n.edgeSnap,"tan",0,1.5,.01).name("slow tan"),s.add(n.edgeSnap,"tanFast",0,2,.01).name("fast tan");const a=b.addFolder("Grid");a.add(n.grid,"chunkSize",4,64,1).name("chunk size").onFinishChange(()=>O(i(),e())),a.add(n.grid,"chunkGap",0,6,1).name("chunk gap").onFinishChange(()=>O(i(),e())),a.add(n.grid,"surfaceResistance",.5,20,.5).name("surface resistance (sec)").onFinishChange(()=>O(i(),e())),a.add(n.grid,"damageRate",.5,10,.5).name("damage rate (hp/sec)");const r=b.addFolder("Tiles");r.add(n.tiles,"gravity",0,6e3,50).name("gravity"),r.add(n.tiles,"knockBase",0,400,5).name("knock base"),r.add(n.tiles,"knockVar",0,400,5).name("knock variance"),r.add(n.tiles,"streamInherit",0,1,.01).name("stream inherit"),r.add(n.tiles,"rotMax",0,20,.1).name("rot max (rad/s)"),r.add(n.tiles,"shrink",0,8,.1).name("shrink rate"),r.add(n.tiles,"upwardKick",-300,100,5).name("upward kick");const l=b.addFolder("Splash");l.add(n.splash,"spawnHz",0,200,1).name("spawn Hz"),l.add(n.splash,"life",.02,1,.01).name("life (s)"),l.add(n.splash,"startSize",0,80,1).name("start size"),l.add(n.splash,"endSize",0,200,1).name("end size"),l.add(n.splash,"lineWidth",.5,8,.5).name("line width"),l.add(n.splash,"jitter",0,80,1).name("jitter");const u={color:Ft(n.splash.r,n.splash.g,n.splash.b)};l.addColor(u,"color").name("color").onChange(v=>{const{r:_,g:ee,b:He}=zt(v);n.splash.r=_,n.splash.g=ee,n.splash.b=He}),b.addFolder("Wall").addColor(n,"wallColor").name("wall color");const c=b.addFolder("Display");c.add(n.display,"responsiveMode",["aspect","fixed","continuous"]).name("responsive mode").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),c.add(n.display,"referenceWidth",320,1920,16).name("reference width").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),c.add(n.display,"referenceHeight",180,1080,16).name("reference height").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),c.add(n.display,"virtualWidth",320,3840,16).name("virtual width (fixed)").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),c.add(n.display,"virtualHeight",180,2160,16).name("virtual height (fixed)").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),c.addColor(n.display,"letterbox").name("letterbox color");const g=b.addFolder("Keyboard");g.add(n.keyboard,"accel",0,8e3,50).name("accel (px/s²)"),g.add(n.keyboard,"maxSpeed",0,3e3,25).name("max speed"),g.add(n.keyboard,"perpBrake",0,12,.1).name("perp brake");const f=b.addFolder("Run");f.add(n.run,"tankSeconds",5,120,1).name("tank seconds"),f.add(n.run,"cleanTargetPct",10,100,1).name("clean target %"),f.add(n.run,"drainMultiplier",0,3,.05).name("drain multiplier");const y=b.addFolder("Presets"),S={name:"preset-1",selected:""};y.add(S,"name").name("name");let M=y.add(S,"selected",[""]).name("saved");function C(){const v=N(),_=Object.keys(v);M=M.options(_.length?_:["(none)"]),_.length&&M.setValue(_[0])}C();const $={save(){const v=N();v[S.name]=JSON.parse(JSON.stringify(n)),Ae(v),C()},load(){const _=N()[S.selected];_&&(Ee(_),O(i(),e()))},delete(){const v=N();delete v[S.selected],Ae(v),C()},resetDefaults(){Ee(Lt),O(i(),e())}};y.add($,"save").name("save preset"),y.add($,"load").name("load preset"),y.add($,"delete").name("delete preset"),y.add($,"resetDefaults").name("reset to defaults");const m=b.addFolder("Debug");m.close();const p={showFps:!1};m.add(p,"showFps").name("show FPS").onChange(v=>$t(v)),m.add({wipeSave:()=>{Ye()}},"wipeSave").name("wipe save (currency + upgrades)")}function ge(){b&&(ne=!ne,ne?b.show():b.hide())}const T={state:"playing",water:1,startTime:0,endTime:0,result:null};function Oe(){return T}function Ot(i){T.state="playing",T.water=1,T.startTime=i,T.endTime=0,T.result=null}const z=document.getElementById("stage"),Re=z.getContext("2d"),Rt=document.getElementById("reset"),Te=document.getElementById("pauseOverlay");let k=n.display.virtualWidth,E=n.display.virtualHeight,I=1,B=1,oe=0,le=0;function Ie(){const i=window.innerWidth,e=window.innerHeight,t=n.display;if(t.responsiveMode==="aspect")i>=e?(t.virtualWidth=t.referenceWidth,t.virtualHeight=t.referenceHeight):(t.virtualWidth=t.referenceHeight,t.virtualHeight=t.referenceWidth);else if(t.responsiveMode==="continuous"){const r=Math.min(t.referenceWidth,t.referenceHeight);i>=e?(t.virtualHeight=r,t.virtualWidth=Math.round(r*i/e/16)*16):(t.virtualWidth=r,t.virtualHeight=Math.round(r*e/i/16)*16)}k=t.virtualWidth,E=t.virtualHeight,Ce(k,E),B=Math.min(i/k,e/E);const s=k*B,a=E*B;oe=(i-s)/2,le=(e-a)/2,I=Math.min(window.devicePixelRatio||1,2),z.width=k*I,z.height=E*I,z.style.width=s+"px",z.style.height=a+"px",z.style.left=oe+"px",z.style.top=le+"px",Re.setTransform(I,0,0,I,0,0),O(k,E),document.documentElement.style.background=n.display.letterbox,document.body.style.background=n.display.letterbox}function Tt(i,e){return{x:(i-oe)/B,y:(e-le)/B}}function Q(){O(k,E),ct(),gt(),Me(k,E),st(!0),H=!1,Te.classList.remove("show"),Ot(performance.now())}let H=!1;function me(){Oe().state==="playing"&&(H=!H,Te.classList.toggle("show",H))}rt(z,()=>k,()=>E,Tt);Dt(()=>k,()=>E);Ne({onPause:me,onRestart:Q});Xe({onPause:me,onRestart:Q,onToggleGui:ge});it(ge);window.addEventListener("keydown",i=>{i.code==="Backquote"&&!i.ctrlKey&&!i.metaKey&&!i.altKey&&(i.preventDefault(),ge())});const Se=document.getElementById("pauseBtn");Se&&Se.addEventListener("click",i=>{i.stopPropagation(),me()});const _e=document.getElementById("hint"),Ve=matchMedia("(hover: none) and (pointer: coarse)").matches;function fe(){if(!_e)return;const i=[];Ve?i.push("drag to throw","top-left to tune"):(i.push("drag to throw","WASD/arrows to thrust","esc to pause","R to restart","` to tune"),qe()&&i.push("gamepad: stick to thrust, start to pause, Y to restart")),_e.textContent=i.join(" · ")}fe();window.addEventListener("gamepadconnected",fe);window.addEventListener("gamepaddisconnected",fe);if(Ve){const i=document.getElementById("reset");i&&(i.textContent="restart")}Rt.addEventListener("click",i=>{i.stopPropagation(),Q()});let de=performance.now();function Be(){const i=performance.now();let e=(i-de)/1e3;de=i,e>.05&&(e=.05),Ce(k,E),Ue(),Oe().state==="playing"&&!H&&(et(e,k,E,nt(),ut),ot(e,dt),pt(e),ht(e,E)),mt(Re,k,E),requestAnimationFrame(Be)}window.addEventListener("resize",()=>{Ie(),Me(k,E)});Ie();Q();de=performance.now();Be();
