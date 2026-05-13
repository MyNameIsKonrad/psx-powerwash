(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();const n={stream:{freeSpeed:280,eraseRadius:32,maxThrowSpeed:1800,minThrowSpeed:120,velWindowMs:180,bounceNudgeRad:2*Math.PI/180,drag:.15},edgeSnap:{dist:60,tan:.36,tanFast:.7},grid:{chunkSize:22,chunkGap:1,surfaceResistance:5,damageRate:2,hardness:0,rotJitter:.2,scaleJitter:.25},tiles:{gravity:2600,knockBase:110,knockVar:55,streamInherit:.18,rotMax:6,shrink:2.4,upwardKick:-50},splash:{spawnHz:50,life:.15,startSize:12,endSize:36,lineWidth:2,jitter:14,r:124,g:196,b:255},wallColor:"#6e7884",display:{referenceWidth:1280,referenceHeight:720,responsiveMode:"aspect",virtualWidth:1280,virtualHeight:720,letterbox:"#06080b"},keyboard:{accel:2400,maxSpeed:900,perpBrake:3.5},run:{tankSeconds:30,cleanTargetPct:80,drainMultiplier:1}},Fe="psxwash:save",Ne=[{id:"tank",name:"tank size",blurb:"+10% water capacity",baseCost:25,costGrowth:1.6,maxLevel:8},{id:"pressure",name:"stream pressure",blurb:"+8% free speed",baseCost:30,costGrowth:1.7,maxLevel:8},{id:"nozzle",name:"nozzle width",blurb:"+6% erase radius",baseCost:40,costGrowth:1.8,maxLevel:6},{id:"recovery",name:"water recovery",blurb:"-5% drain rate",baseCost:50,costGrowth:1.9,maxLevel:5},{id:"payout",name:"soap subsidy",blurb:"+10% currency earned",baseCost:60,costGrowth:2,maxLevel:6}];function B(){return{currency:0,levels:Object.fromEntries(Ne.map(i=>[i.id,0]))}}let ue=Je();function Je(){try{const i=localStorage.getItem(Fe);if(!i)return B();const e=JSON.parse(i);return{...B(),...e,levels:{...B().levels,...e.levels||{}}}}catch{return B()}}function je(){localStorage.setItem(Fe,JSON.stringify(ue))}function Y(i){return ue.levels[i]??0}function Xe(){return{tankMul:1+.1*Y("tank"),speedMul:1+.08*Y("pressure"),radiusMul:1+.06*Y("nozzle"),drainMul:1-.05*Y("recovery")}}function Ue(){ue=B(),je()}const d={scale:1,freeSpeed:280,eraseRadius:32,eraseRadiusSq:32*32,maxThrowSpeed:1800,minThrowSpeed:120,tankSeconds:30,drainMultiplier:1,chunkSize:22,damageRate:2,surfaceHardness:0,splashJitter:14,splashStartSize:12,splashEndSize:36,splashLineWidth:2,tilesKnockBase:110,tilesKnockVar:55,tilesGravity:2600,tilesUpwardKick:-50,keyboardAccel:2400,keyboardMaxSpeed:900,edgeSnapDist:60};function ze(i,e){const t=Xe(),s=Math.min(i,e)/Math.min(n.display.referenceWidth,n.display.referenceHeight);d.scale=s,d.freeSpeed=n.stream.freeSpeed*t.speedMul*s,d.eraseRadius=n.stream.eraseRadius*t.radiusMul*s,d.eraseRadiusSq=d.eraseRadius*d.eraseRadius,d.maxThrowSpeed=n.stream.maxThrowSpeed*s,d.minThrowSpeed=n.stream.minThrowSpeed*s,d.tankSeconds=n.run.tankSeconds*t.tankMul,d.drainMultiplier=n.run.drainMultiplier*t.drainMul,d.chunkSize=n.grid.chunkSize*s,d.damageRate=n.grid.damageRate,d.surfaceHardness=n.grid.hardness,d.splashJitter=n.splash.jitter*s,d.splashStartSize=n.splash.startSize*s,d.splashEndSize=n.splash.endSize*s,d.splashLineWidth=n.splash.lineWidth*s,d.tilesKnockBase=n.tiles.knockBase*s,d.tilesKnockVar=n.tiles.knockVar*s,d.tilesGravity=n.tiles.gravity*s,d.tilesUpwardKick=n.tiles.upwardKick*s,d.keyboardAccel=n.keyboard.accel*s,d.keyboardMaxSpeed=n.keyboard.maxSpeed*s,d.edgeSnapDist=n.edgeSnap.dist*s}const x=new Set;let N=null,J=null;function Ze(i){N=i.onPause,J=i.onRestart,window.addEventListener("keydown",e=>{e.repeat||(x.add(e.code),!(e.ctrlKey||e.metaKey||e.altKey)&&(e.code==="Escape"&&(e.preventDefault(),N==null||N()),e.code==="KeyR"&&(e.preventDefault(),J==null||J())))}),window.addEventListener("keyup",e=>{x.delete(e.code)}),window.addEventListener("blur",()=>x.clear())}function qe(){let i=0,e=0;return(x.has("ArrowLeft")||x.has("KeyA"))&&(i-=1),(x.has("ArrowRight")||x.has("KeyD"))&&(i+=1),(x.has("ArrowUp")||x.has("KeyW"))&&(e-=1),(x.has("ArrowDown")||x.has("KeyS"))&&(e+=1),{x:i,y:e}}function Qe(){return x.has("ArrowLeft")||x.has("ArrowRight")||x.has("ArrowUp")||x.has("ArrowDown")||x.has("KeyA")||x.has("KeyD")||x.has("KeyW")||x.has("KeyS")}const se=.18;let X=null,ee=!1;const Ae=[];let U=null,Z=null,q=null;function et(i){U=i.onPause,Z=i.onRestart,q=i.onToggleGui,window.addEventListener("gamepadconnected",()=>{ee=!0}),window.addEventListener("gamepaddisconnected",()=>{const e=navigator.getGamepads?navigator.getGamepads():[];ee=Array.from(e).some(t=>!!t&&t.connected)})}function tt(){if(!navigator.getGamepads)return;const i=navigator.getGamepads();let e=null;for(const l of i)if(l&&l.connected){e=l;break}if(!e){X=null;return}ee=!0;for(let l=0;l<e.buttons.length;l++){const c=e.buttons[l].pressed,h=Ae[l]||!1;c&&!h&&(l===9?U==null||U():l===3?Z==null||Z():l===2&&(q==null||q())),Ae[l]=c}const t=e.axes[0]??0,s=e.axes[1]??0,a=Math.hypot(t,s);if(a<se){X=null;return}const o=Math.min(1,(a-se)/(1-se));X={x:t/a,y:s/a,mag:o}}function it(){return X}function st(){return ee}function nt(){if(Qe()){const e=qe(),t=Math.hypot(e.x,e.y)||1;return{x:e.x/t,y:e.y/t,mag:1}}const i=it();return i?{x:i.x,y:i.y,mag:i.mag}:null}const r={x:0,y:0,vx:0,vy:0};function De(i,e){r.x=i/2,r.y=e/2;const t=Math.random()*Math.PI*2;r.vx=Math.cos(t)*d.freeSpeed,r.vy=Math.sin(t)*d.freeSpeed}function at(i,e,t,s,a){if(s)return;const o=nt();if(o){r.vx+=o.x*d.keyboardAccel*o.mag*i,r.vy+=o.y*d.keyboardAccel*o.mag*i;const h=r.vx*-o.y+r.vy*o.x,u=Math.min(1,n.keyboard.perpBrake*o.mag*i);r.vx-=-o.y*h*u,r.vy-=o.x*h*u;const m=Math.hypot(r.vx,r.vy);m>d.keyboardMaxSpeed&&(r.vx=r.vx/m*d.keyboardMaxSpeed,r.vy=r.vy/m*d.keyboardMaxSpeed)}if(!o){const h=Math.max(0,1-n.stream.drag*i);r.vx*=h,r.vy*=h}r.x+=r.vx*i,r.y+=r.vy*i;const l=d.eraseRadius*.5;let c=!1;if(r.x<l&&(r.x=l,r.vx=Math.abs(r.vx),c=!0),r.x>e-l&&(r.x=e-l,r.vx=-Math.abs(r.vx),c=!0),r.y<l&&(r.y=l,r.vy=Math.abs(r.vy),c=!0),r.y>t-l&&(r.y=t-l,r.vy=-Math.abs(r.vy),c=!0),c){const h=Math.hypot(r.vx,r.vy),u=Math.atan2(r.vy,r.vx)+(Math.random()*2-1)*n.stream.bounceNudgeRad;r.vx=Math.cos(u)*h,r.vy=Math.sin(u)*h,a(r.x,r.y)}}function rt(i,e,t,s){const a=Math.hypot(i,e),o=d.minThrowSpeed,l=d.maxThrowSpeed,c=Math.max(0,Math.min(1,(a-o)/(l-o))),h=n.edgeSnap.tan+c*(n.edgeSnap.tanFast-n.edgeSnap.tan),u=d.edgeSnapDist,m=r.y<u,f=r.y>s-u,y=r.x<u,_=r.x>t-u;return(m||f)&&Math.abs(e)<Math.abs(i)*h?{vx:Math.sign(i)*a,vy:0}:(y||_)&&Math.abs(i)<Math.abs(e)*h?{vx:0,vy:Math.sign(e)*a}:{vx:i,vy:e}}let G=!1,Oe=0,Re=0,pe=()=>0,ge=()=>0;const Ee=80;let oe=null;function ot(i){oe=i}let Te=!0;function lt(i){Te=i}const L=[];function dt(){return G}function ht(){const i=d.eraseRadius*.5,e=pe(),t=ge();r.x<i&&(r.x=i),r.x>e-i&&(r.x=e-i),r.y<i&&(r.y=i),r.y>t-i&&(r.y=t-i)}function Se(i,e){if(i<Ee&&e<Ee&&oe){oe();return}Te&&(G=!0,Oe=r.x-i,Re=r.y-e,L.length=0,L.push({x:i,y:e,t:performance.now()}))}function _e(i,e){if(!G)return;r.x=i+Oe,r.y=e+Re,ht(),L.push({x:i,y:e,t:performance.now()});const t=performance.now()-n.stream.velWindowMs-20;for(;L.length>1&&L[0].t<t;)L.shift()}function ne(){if(!G)return;G=!1;const e=performance.now()-n.stream.velWindowMs;let t=L[0];for(const c of L)if(c.t>=e){t=c;break}const s=L[L.length-1];let a=0,o=0;if(t&&s&&s.t>t.t){const c=(s.t-t.t)/1e3;a=(s.x-t.x)/c,o=(s.y-t.y)/c}const l=Math.hypot(a,o);if(l>d.maxThrowSpeed&&(a=a/l*d.maxThrowSpeed,o=o/l*d.maxThrowSpeed),l>=d.minThrowSpeed){const c=pe(),h=ge(),u=rt(a,o,c,h);r.vx=u.vx,r.vy=u.vy}else r.vx=0,r.vy=0;L.length=0}function ct(i,e,t,s){pe=e,ge=t,i.addEventListener("touchstart",a=>{a.preventDefault();const o=a.touches[0],l=s(o.clientX,o.clientY);Se(l.x,l.y)},{passive:!1}),i.addEventListener("touchmove",a=>{a.preventDefault();const o=a.touches[0],l=s(o.clientX,o.clientY);_e(l.x,l.y)},{passive:!1}),i.addEventListener("touchend",a=>{a.preventDefault(),ne()},{passive:!1}),i.addEventListener("touchcancel",a=>{a.preventDefault(),ne()},{passive:!1}),i.addEventListener("mousedown",a=>{if(a.button!==0)return;const o=s(a.clientX,a.clientY);Se(o.x,o.y)}),window.addEventListener("mousemove",a=>{const o=s(a.clientX,a.clientY);_e(o.x,o.y)}),window.addEventListener("mouseup",a=>{a.button===0&&ne()})}const w={cols:0,rows:0,data:new Float32Array(0),rot:new Float32Array(0),scaleFactor:new Float32Array(0),initialAlive:0};function Ie(){const i=w.cols*w.rows;for(let e=0;e<i;e++)w.rot[e]=(Math.random()*2-1)*n.grid.rotJitter,w.scaleFactor[e]=1-Math.random()*n.grid.scaleJitter}function R(i,e){const t=d.chunkSize;w.cols=Math.ceil(i/t),w.rows=Math.ceil(e/t);const s=w.cols*w.rows;w.data=new Float32Array(s),w.data.fill(n.grid.surfaceResistance),w.rot=new Float32Array(s),w.scaleFactor=new Float32Array(s),w.initialAlive=s,Ie()}function ut(i,e){const t=d.chunkSize,s=d.eraseRadius,a=d.eraseRadiusSq,o=d.damageRate*i,l=n.grid.surfaceResistance,c=d.surfaceHardness,h=Math.max(0,Math.floor((r.x-s)/t)),u=Math.min(w.cols-1,Math.floor((r.x+s)/t)),m=Math.max(0,Math.floor((r.y-s)/t)),f=Math.min(w.rows-1,Math.floor((r.y+s)/t));let y=0,_=0;for(let k=m;k<=f;k++)for(let b=h;b<=u;b++){const $=k*w.cols+b,g=w.data[$];if(g<=0)continue;const p=b*t+t/2,v=k*t+t/2,A=p-r.x,O=v-r.y,W=A*A+O*O;if(W<=a){const we=g-o;if(w.data[$]=we,we<=0&&e(p,v),c>0){const ie=Math.sqrt(W)||1,be=1-ie/s,xe=Math.min(1,g/l);y+=-A/ie*be*xe,_+=-O/ie*be*xe}}}c>0&&(r.vx+=y*c*500*i,r.vy+=_*c*500*i)}const D=[],pt=1200;function gt(i,e){const t=i-r.x,s=e-r.y,a=Math.hypot(t,s)||1,o=t/a,l=s/a,c=Math.hypot(r.vx,r.vy)||1,h=n.tiles.streamInherit,u=r.vx/c*h*c,m=r.vy/c*h*c,f=d.tilesKnockBase+Math.random()*d.tilesKnockVar;D.length>=pt&&D.shift(),D.push({x:i,y:e,vx:o*f+u,vy:l*f+m+d.tilesUpwardKick,rot:(Math.random()-.5)*.4,rotV:(Math.random()*2-1)*n.tiles.rotMax,size:Math.max(1,d.chunkSize-n.grid.chunkGap),scale:1})}function mt(i,e){for(let t=D.length-1;t>=0;t--){const s=D[t];s.vy+=d.tilesGravity*i,s.x+=s.vx*i,s.y+=s.vy*i,s.rot+=s.rotV*i,s.scale-=n.tiles.shrink*i,(s.y>e+80||s.scale<=.05)&&D.splice(t,1)}}function ft(){D.length=0}const T=[];let Q=0;function Ve(i,e,t=1){const s=Math.random()*d.splashJitter,a=Math.random()*Math.PI*2;T.push({x:i+Math.cos(a)*s,y:e+Math.sin(a)*s,rot:Math.random()*Math.PI*2,age:0,sizeMul:t})}function vt(i,e){for(let t=0;t<5;t++)Ve(i,e,1.35);typeof navigator<"u"&&navigator.vibrate&&navigator.vibrate(12)}function yt(i){Q+=i;const e=1/n.splash.spawnHz;for(;Q>e;)Ve(r.x,r.y),Q-=e;for(let t=T.length-1;t>=0;t--)T[t].age+=i,T[t].age>=n.splash.life&&T.splice(t,1)}function wt(){T.length=0,Q=0}function bt(i,e,t){i.fillStyle=n.wallColor,i.fillRect(0,0,e,t);const s=d.chunkSize,a=Math.max(1,s-n.grid.chunkGap),o=n.grid.surfaceResistance,l=64,c=new Array(l+1);for(let h=0;h<=l;h++){const u=h/l,m=Math.round(0+130*u),f=Math.round(0+86*u),y=Math.round(0+48*u);c[h]=`rgb(${m},${f},${y})`}for(let h=0;h<w.rows;h++){const u=h*w.cols;for(let m=0;m<w.cols;m++){const f=u+m,y=w.data[f];if(y<=0)continue;const _=Math.round((1-y/o)*l);i.fillStyle=c[Math.max(0,Math.min(l,_))];const k=w.scaleFactor[f],b=a*k/2;i.save(),i.translate(m*s+s/2,h*s+s/2),i.rotate(w.rot[f]),i.fillRect(-b,-b,b*2,b*2),i.restore()}}for(const h of D){i.save(),i.translate(h.x,h.y),i.rotate(h.rot),i.scale(h.scale,h.scale),i.fillStyle="#000000";const u=h.size/2;i.fillRect(-u,-u,h.size,h.size),i.restore()}i.lineWidth=d.splashLineWidth;for(const h of T){const u=h.age/n.splash.life,m=(d.splashStartSize+(d.splashEndSize-d.splashStartSize)*u)*h.sizeMul,f=.7*(u<.8?1:(1-u)/.2);i.strokeStyle=`rgba(${n.splash.r},${n.splash.g},${n.splash.b},${f})`,i.save(),i.translate(h.x,h.y),i.rotate(h.rot);const y=m/2;i.strokeRect(-y,-y,m,m),i.restore()}i.fillStyle=`rgba(${n.splash.r},${n.splash.g},${n.splash.b},0.95)`,i.fillRect(r.x-2.5,r.y-2.5,5,5)}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class F{constructor(e,t,s,a,o="div"){this.parent=e,this.object=t,this.property=s,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("controller"),this.domElement.classList.add(a),this.$name=document.createElement("div"),this.$name.classList.add("name"),F.nextNameID=F.nextNameID||0,this.$name.id=`lil-gui-name-${++F.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(s)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class xt extends F{constructor(e,t,s){super(e,t,s,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function le(i){let e,t;return(e=i.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const At={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:le,toHexString:le},K={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},Et={isPrimitive:!1,match:i=>Array.isArray(i),fromHexString(i,e,t=1){const s=K.fromHexString(i);e[0]=(s>>16&255)/255*t,e[1]=(s>>8&255)/255*t,e[2]=(s&255)/255*t},toHexString([i,e,t],s=1){s=255/s;const a=i*s<<16^e*s<<8^t*s<<0;return K.toHexString(a)}},St={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,e,t=1){const s=K.fromHexString(i);e.r=(s>>16&255)/255*t,e.g=(s>>8&255)/255*t,e.b=(s&255)/255*t},toHexString({r:i,g:e,b:t},s=1){s=255/s;const a=i*s<<16^e*s<<8^t*s<<0;return K.toHexString(a)}},_t=[At,K,Et,St];function kt(i){return _t.find(e=>e.match(i))}class Mt extends F{constructor(e,t,s,a){super(e,t,s,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=kt(this.initialValue),this._rgbScale=a,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=le(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class ae extends F{constructor(e,t,s){super(e,t,s,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",a=>{a.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Ct extends F{constructor(e,t,s,a,o,l){super(e,t,s,"number"),this._initInput(),this.min(a),this.max(o);const c=l!==void 0;this.step(c?l:this._getImplicitStep(),c),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let p=parseFloat(this.$input.value);isNaN(p)||(this._stepExplicit&&(p=this._snap(p)),this.setValue(this._clamp(p)))},s=p=>{const v=parseFloat(this.$input.value);isNaN(v)||(this._snapClampSetValue(v+p),this.$input.value=this.getValue())},a=p=>{p.key==="Enter"&&this.$input.blur(),p.code==="ArrowUp"&&(p.preventDefault(),s(this._step*this._arrowKeyMultiplier(p))),p.code==="ArrowDown"&&(p.preventDefault(),s(this._step*this._arrowKeyMultiplier(p)*-1))},o=p=>{this._inputFocused&&(p.preventDefault(),s(this._step*this._normalizeMouseWheel(p)))};let l=!1,c,h,u,m,f;const y=5,_=p=>{c=p.clientX,h=u=p.clientY,l=!0,m=this.getValue(),f=0,window.addEventListener("mousemove",k),window.addEventListener("mouseup",b)},k=p=>{if(l){const v=p.clientX-c,A=p.clientY-h;Math.abs(A)>y?(p.preventDefault(),this.$input.blur(),l=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(v)>y&&b()}if(!l){const v=p.clientY-u;f-=v*this._step*this._arrowKeyMultiplier(p),m+f>this._max?f=this._max-m:m+f<this._min&&(f=this._min-m),this._snapClampSetValue(m+f)}u=p.clientY},b=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",k),window.removeEventListener("mouseup",b)},$=()=>{this._inputFocused=!0},g=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",a),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",_),this.$input.addEventListener("focus",$),this.$input.addEventListener("blur",g)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(g,p,v,A,O)=>(g-p)/(v-p)*(O-A)+A,t=g=>{const p=this.$slider.getBoundingClientRect();let v=e(g,p.left,p.right,this._min,this._max);this._snapClampSetValue(v)},s=g=>{this._setDraggingStyle(!0),t(g.clientX),window.addEventListener("mousemove",a),window.addEventListener("mouseup",o)},a=g=>{t(g.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",a),window.removeEventListener("mouseup",o)};let l=!1,c,h;const u=g=>{g.preventDefault(),this._setDraggingStyle(!0),t(g.touches[0].clientX),l=!1},m=g=>{g.touches.length>1||(this._hasScrollBar?(c=g.touches[0].clientX,h=g.touches[0].clientY,l=!0):u(g),window.addEventListener("touchmove",f,{passive:!1}),window.addEventListener("touchend",y))},f=g=>{if(l){const p=g.touches[0].clientX-c,v=g.touches[0].clientY-h;Math.abs(p)>Math.abs(v)?u(g):(window.removeEventListener("touchmove",f),window.removeEventListener("touchend",y))}else g.preventDefault(),t(g.touches[0].clientX)},y=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",f),window.removeEventListener("touchend",y)},_=this._callOnFinishChange.bind(this),k=400;let b;const $=g=>{if(Math.abs(g.deltaX)<Math.abs(g.deltaY)&&this._hasScrollBar)return;g.preventDefault();const v=this._normalizeMouseWheel(g)*this._step;this._snapClampSetValue(this.getValue()+v),this.$input.value=this.getValue(),clearTimeout(b),b=setTimeout(_,k)};this.$slider.addEventListener("mousedown",s),this.$slider.addEventListener("touchstart",m,{passive:!1}),this.$slider.addEventListener("wheel",$,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:s}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,s=-e.wheelDelta/120,s*=this._stepExplicit?1:10),t+-s}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class $t extends F{constructor(e,t,s,a){super(e,t,s,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(a)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const s=document.createElement("option");s.textContent=t,this.$select.appendChild(s)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class Lt extends F{constructor(e,t,s){super(e,t,s,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",a=>{a.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Ft=`.lil-gui {
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
}`;function zt(i){const e=document.createElement("style");e.innerHTML=i;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let ke=!1;class me{constructor({parent:e,autoPlace:t=e===void 0,container:s,width:a,title:o="Controls",closeFolders:l=!1,injectStyles:c=!0,touchStyles:h=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),h&&this.domElement.classList.add("allow-touch-styles"),!ke&&c&&(zt(Ft),ke=!0),s?s.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),a&&this.domElement.style.setProperty("--width",a+"px"),this._closeFolders=l}add(e,t,s,a,o){if(Object(s)===s)return new $t(this,e,t,s);const l=e[t];switch(typeof l){case"number":return new Ct(this,e,t,s,a,o);case"boolean":return new xt(this,e,t);case"string":return new Lt(this,e,t);case"function":return new ae(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,l)}addColor(e,t,s=1){return new Mt(this,e,t,s)}addFolder(e){const t=new me({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(s=>{s instanceof ae||s._name in e.controllers&&s.load(e.controllers[s._name])}),t&&e.folders&&this.folders.forEach(s=>{s._title in e.folders&&s.load(e.folders[s._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(s=>{if(!(s instanceof ae)){if(s._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${s._name}"`);t.controllers[s._name]=s.save()}}),e&&this.folders.forEach(s=>{if(s._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${s._title}"`);t.folders[s._title]=s.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const s=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",s))};this.$children.addEventListener("transitionend",s);const a=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=a+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(s=>s.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}const S=i=>document.getElementById(i);S("waterFill");S("cleanVal");S("timeVal");S("endOverlay");S("endTitle");S("endVerdict");S("endTime");S("endClean");S("endWater");S("endEff");S("endEarned");S("endContinue");S("shopOverlay");S("shopStart");S("shopBalance");S("upgradeList");const Dt=S("fps");function Ot(i){Dt.classList.toggle("show",i)}const Rt=JSON.parse(JSON.stringify(n)),Be="psxwash:presets";let E=null,re=!1;function j(){try{return JSON.parse(localStorage.getItem(Be)||"{}")}catch{return{}}}function Me(i){localStorage.setItem(Be,JSON.stringify(i))}function Ce(i){for(const e of Object.keys(n)){const t=i[e],s=n[e];t&&typeof t=="object"&&typeof s=="object"?Object.assign(s,t):t!==void 0&&(n[e]=t)}E&&E.controllersRecursive().forEach(e=>e.updateDisplay())}function Tt(i,e,t){return"#"+[i,e,t].map(s=>Math.round(s).toString(16).padStart(2,"0")).join("")}function It(i){const e=i.replace("#","");return{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4,6),16)}}function Vt(i,e){E=new me({title:"tuning · tap top-left to hide",width:280}),E.hide();const t=E.addFolder("Stream");t.add(n.stream,"freeSpeed",50,800,1).name("free speed (px/s)"),t.add(n.stream,"eraseRadius",8,100,1).name("erase radius"),t.add(n.stream,"maxThrowSpeed",400,4e3,10).name("max throw speed"),t.add(n.stream,"minThrowSpeed",0,400,5).name("min throw speed"),t.add(n.stream,"velWindowMs",100,400,5).name("vel window (ms)"),t.add(n.stream,"bounceNudgeRad",0,.3,.005).name("bounce nudge (rad)"),t.add(n.stream,"drag",0,1,.01).name("drag (0=none, 1=instant stop)");const s=E.addFolder("Edge Snap");s.add(n.edgeSnap,"dist",10,200,1).name("dist (px)"),s.add(n.edgeSnap,"tan",0,1.5,.01).name("slow tan"),s.add(n.edgeSnap,"tanFast",0,2,.01).name("fast tan");const a=E.addFolder("Grid");a.add(n.grid,"chunkSize",4,64,1).name("chunk size").onFinishChange(()=>R(i(),e())),a.add(n.grid,"chunkGap",0,6,1).name("chunk gap").onFinishChange(()=>R(i(),e())),a.add(n.grid,"surfaceResistance",.5,20,.5).name("surface resistance (sec)").onFinishChange(()=>R(i(),e())),a.add(n.grid,"damageRate",.5,10,.5).name("damage rate (hp/sec)"),a.add(n.grid,"hardness",0,1,.01).name("hardness (chunk pushback)"),a.add(n.grid,"rotJitter",0,Math.PI/4,.01).name("rotation jitter (rad)"),a.add(n.grid,"scaleJitter",0,.5,.01).name("scale jitter"),a.add({randomize:()=>Ie()},"randomize").name("randomize surface");const o=E.addFolder("Tiles");o.add(n.tiles,"gravity",0,6e3,50).name("gravity"),o.add(n.tiles,"knockBase",0,400,5).name("knock base"),o.add(n.tiles,"knockVar",0,400,5).name("knock variance"),o.add(n.tiles,"streamInherit",0,1,.01).name("stream inherit"),o.add(n.tiles,"rotMax",0,20,.1).name("rot max (rad/s)"),o.add(n.tiles,"shrink",0,8,.1).name("shrink rate"),o.add(n.tiles,"upwardKick",-300,100,5).name("upward kick");const l=E.addFolder("Splash");l.add(n.splash,"spawnHz",0,200,1).name("spawn Hz"),l.add(n.splash,"life",.02,1,.01).name("life (s)"),l.add(n.splash,"startSize",0,80,1).name("start size"),l.add(n.splash,"endSize",0,200,1).name("end size"),l.add(n.splash,"lineWidth",.5,8,.5).name("line width"),l.add(n.splash,"jitter",0,80,1).name("jitter");const c={color:Tt(n.splash.r,n.splash.g,n.splash.b)};l.addColor(c,"color").name("color").onChange(v=>{const{r:A,g:O,b:W}=It(v);n.splash.r=A,n.splash.g=O,n.splash.b=W}),E.addFolder("Wall").addColor(n,"wallColor").name("wall color");const u=E.addFolder("Display");u.add(n.display,"responsiveMode",["aspect","fixed","continuous"]).name("responsive mode").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),u.add(n.display,"referenceWidth",320,1920,16).name("reference width").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),u.add(n.display,"referenceHeight",180,1080,16).name("reference height").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),u.add(n.display,"virtualWidth",320,3840,16).name("virtual width (fixed)").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),u.add(n.display,"virtualHeight",180,2160,16).name("virtual height (fixed)").onFinishChange(()=>window.dispatchEvent(new Event("resize"))),u.addColor(n.display,"letterbox").name("letterbox color");const m=E.addFolder("Keyboard");m.add(n.keyboard,"accel",0,8e3,50).name("accel (px/s²)"),m.add(n.keyboard,"maxSpeed",0,3e3,25).name("max speed"),m.add(n.keyboard,"perpBrake",0,12,.1).name("perp brake");const f=E.addFolder("Run");f.add(n.run,"tankSeconds",5,120,1).name("tank seconds"),f.add(n.run,"cleanTargetPct",10,100,1).name("clean target %"),f.add(n.run,"drainMultiplier",0,3,.05).name("drain multiplier");const y=E.addFolder("Presets"),_={name:"preset-1",selected:""};y.add(_,"name").name("name");let k=y.add(_,"selected",[""]).name("saved");function b(){const v=j(),A=Object.keys(v);k=k.options(A.length?A:["(none)"]),A.length&&k.setValue(A[0])}b();const $={save(){const v=j();v[_.name]=JSON.parse(JSON.stringify(n)),Me(v),b()},load(){const A=j()[_.selected];A&&(Ce(A),R(i(),e()))},delete(){const v=j();delete v[_.selected],Me(v),b()},resetDefaults(){Ce(Rt),R(i(),e())}};y.add($,"save").name("save preset"),y.add($,"load").name("load preset"),y.add($,"delete").name("delete preset"),y.add($,"resetDefaults").name("reset to defaults");const g=E.addFolder("Debug");g.close();const p={showFps:!1};g.add(p,"showFps").name("show FPS").onChange(v=>Ot(v)),g.add({wipeSave:()=>{Ue()}},"wipeSave").name("wipe save (currency + upgrades)")}function fe(){E&&(re=!re,re?E.show():E.hide())}const I={state:"playing",water:1,startTime:0,endTime:0,result:null};function He(){return I}function Bt(i){I.state="playing",I.water=1,I.startTime=i,I.endTime=0,I.result=null}const z=document.getElementById("stage"),Pe=z.getContext("2d"),Ht=document.getElementById("reset"),Ge=document.getElementById("pauseOverlay");let C=n.display.virtualWidth,M=n.display.virtualHeight,V=1,H=1,de=0,he=0;function Ke(){const i=window.innerWidth,e=window.innerHeight,t=n.display;if(t.responsiveMode==="aspect")i>=e?(t.virtualWidth=t.referenceWidth,t.virtualHeight=t.referenceHeight):(t.virtualWidth=t.referenceHeight,t.virtualHeight=t.referenceWidth);else if(t.responsiveMode==="continuous"){const o=Math.min(t.referenceWidth,t.referenceHeight);i>=e?(t.virtualHeight=o,t.virtualWidth=Math.round(o*i/e/16)*16):(t.virtualWidth=o,t.virtualHeight=Math.round(o*e/i/16)*16)}C=t.virtualWidth,M=t.virtualHeight,ze(C,M),H=Math.min(i/C,e/M);const s=C*H,a=M*H;de=(i-s)/2,he=(e-a)/2,V=Math.min(window.devicePixelRatio||1,2),z.width=C*V,z.height=M*V,z.style.width=s+"px",z.style.height=a+"px",z.style.left=de+"px",z.style.top=he+"px",Pe.setTransform(V,0,0,V,0,0),R(C,M),document.documentElement.style.background=n.display.letterbox,document.body.style.background=n.display.letterbox}function Pt(i,e){return{x:(i-de)/H,y:(e-he)/H}}function te(){R(C,M),ft(),wt(),De(C,M),lt(!0),P=!1,Ge.classList.remove("show"),Bt(performance.now())}let P=!1;function ve(){He().state==="playing"&&(P=!P,Ge.classList.toggle("show",P))}ct(z,()=>C,()=>M,Pt);Vt(()=>C,()=>M);Ze({onPause:ve,onRestart:te});et({onPause:ve,onRestart:te,onToggleGui:fe});ot(fe);window.addEventListener("keydown",i=>{i.code==="Backquote"&&!i.ctrlKey&&!i.metaKey&&!i.altKey&&(i.preventDefault(),fe())});const $e=document.getElementById("pauseBtn");$e&&$e.addEventListener("click",i=>{i.stopPropagation(),ve()});const Le=document.getElementById("hint"),We=matchMedia("(hover: none) and (pointer: coarse)").matches;function ye(){if(!Le)return;const i=[];We?i.push("drag to throw","top-left to tune"):(i.push("drag to throw","WASD/arrows to thrust","esc to pause","R to restart","` to tune"),st()&&i.push("gamepad: stick to thrust, start to pause, Y to restart")),Le.textContent=i.join(" · ")}ye();window.addEventListener("gamepadconnected",ye);window.addEventListener("gamepaddisconnected",ye);if(We){const i=document.getElementById("reset");i&&(i.textContent="restart")}Ht.addEventListener("click",i=>{i.stopPropagation(),te()});let ce=performance.now();function Ye(){const i=performance.now();let e=(i-ce)/1e3;ce=i,e>.05&&(e=.05),ze(C,M),tt(),He().state==="playing"&&!P&&(at(e,C,M,dt(),vt),ut(e,gt),yt(e),mt(e,M)),bt(Pe,C,M),requestAnimationFrame(Ye)}window.addEventListener("resize",()=>{Ke(),De(C,M)});Ke();te();ce=performance.now();Ye();
