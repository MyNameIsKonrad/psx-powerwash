(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();const s={stream:{freeSpeed:280,eraseRadius:32,maxThrowSpeed:1800,minThrowSpeed:120,velWindowMs:180,bounceNudgeRad:2*Math.PI/180},edgeSnap:{dist:60,tan:.36,tanFast:.7},grid:{chunkSize:22,chunkGap:1},tiles:{gravity:2600,knockBase:110,knockVar:55,streamInherit:.18,rotMax:6,shrink:2.4,upwardKick:-50},splash:{spawnHz:50,life:.15,startSize:12,endSize:36,lineWidth:2,jitter:14,r:124,g:196,b:255},wallColor:"#6e7884",run:{tankSeconds:30,cleanTargetPct:80,drainMultiplier:1}},o={x:0,y:0,vx:0,vy:0};function ft(i,t){o.x=i/2,o.y=t/2;const e=Math.random()*Math.PI*2;o.vx=Math.cos(e)*s.stream.freeSpeed,o.vy=Math.sin(e)*s.stream.freeSpeed}function Ft(i,t,e,n,a){if(n)return;o.x+=o.vx*i,o.y+=o.vy*i;const r=s.stream.eraseRadius*.5;let l=!1;if(o.x<r&&(o.x=r,o.vx=Math.abs(o.vx),l=!0),o.x>t-r&&(o.x=t-r,o.vx=-Math.abs(o.vx),l=!0),o.y<r&&(o.y=r,o.vy=Math.abs(o.vy),l=!0),o.y>e-r&&(o.y=e-r,o.vy=-Math.abs(o.vy),l=!0),l){const d=Math.hypot(o.vx,o.vy),p=Math.atan2(o.vy,o.vx)+(Math.random()*2-1)*s.stream.bounceNudgeRad;o.vx=Math.cos(p)*d,o.vy=Math.sin(p)*d,a(o.x,o.y)}}function Ot(i,t,e,n){const a=Math.hypot(i,t),r=s.stream.minThrowSpeed,l=s.stream.maxThrowSpeed,d=Math.max(0,Math.min(1,(a-r)/(l-r))),p=s.edgeSnap.tan+d*(s.edgeSnap.tanFast-s.edgeSnap.tan),u=s.edgeSnap.dist,g=o.y<u,m=o.y>n-u,x=o.x<u,A=o.x>e-u;return(g||m)&&Math.abs(t)<Math.abs(i)*p?{vx:Math.sign(i)*a,vy:0}:(x||A)&&Math.abs(i)<Math.abs(t)*p?{vx:0,vy:Math.sign(t)*a}:{vx:i,vy:t}}let V=!1,vt=0,wt=0,K=()=>0,U=()=>0;const st=80;let W=null;function Dt(i){W=i}let bt=!0;function yt(i){bt=i,i||(V=!1)}const C=[];function zt(){return V}function Vt(){const i=s.stream.eraseRadius*.5,t=K(),e=U();o.x<i&&(o.x=i),o.x>t-i&&(o.x=t-i),o.y<i&&(o.y=i),o.y>e-i&&(o.y=e-i)}function rt(i,t){if(i<st&&t<st&&W){W();return}bt&&(V=!0,vt=o.x-i,wt=o.y-t,C.length=0,C.push({x:i,y:t,t:performance.now()}))}function at(i,t){if(!V)return;o.x=i+vt,o.y=t+wt,Vt(),C.push({x:i,y:t,t:performance.now()});const e=performance.now()-s.stream.velWindowMs-20;for(;C.length>1&&C[0].t<e;)C.shift()}function N(){if(!V)return;V=!1;const t=performance.now()-s.stream.velWindowMs;let e=C[0];for(const d of C)if(d.t>=t){e=d;break}const n=C[C.length-1];let a=0,r=0;if(e&&n&&n.t>e.t){const d=(n.t-e.t)/1e3;a=(n.x-e.x)/d,r=(n.y-e.y)/d}const l=Math.hypot(a,r);if(l>s.stream.maxThrowSpeed&&(a=a/l*s.stream.maxThrowSpeed,r=r/l*s.stream.maxThrowSpeed),l<s.stream.minThrowSpeed){const d=Math.random()*Math.PI*2;o.vx=Math.cos(d)*s.stream.freeSpeed,o.vy=Math.sin(d)*s.stream.freeSpeed}else{const d=K(),p=U(),u=Ot(a,r,d,p);o.vx=u.vx,o.vy=u.vy}C.length=0}function Tt(i,t,e){K=t,U=e,i.addEventListener("touchstart",n=>{n.preventDefault();const a=n.touches[0];rt(a.clientX,a.clientY)},{passive:!1}),i.addEventListener("touchmove",n=>{n.preventDefault();const a=n.touches[0];at(a.clientX,a.clientY)},{passive:!1}),i.addEventListener("touchend",n=>{n.preventDefault(),N()},{passive:!1}),i.addEventListener("touchcancel",n=>{n.preventDefault(),N()},{passive:!1}),i.addEventListener("mousedown",n=>rt(n.clientX,n.clientY)),window.addEventListener("mousemove",n=>at(n.clientX,n.clientY)),window.addEventListener("mouseup",N)}const v={cols:0,rows:0,data:new Uint8Array(0)};function D(i,t){const e=s.grid.chunkSize;v.cols=Math.ceil(i/e),v.rows=Math.ceil(t/e),v.data=new Uint8Array(v.cols*v.rows),v.data.fill(1)}function It(i){const t=s.grid.chunkSize,e=s.stream.eraseRadius,n=e*e,a=Math.max(0,Math.floor((o.x-e)/t)),r=Math.min(v.cols-1,Math.floor((o.x+e)/t)),l=Math.max(0,Math.floor((o.y-e)/t)),d=Math.min(v.rows-1,Math.floor((o.y+e)/t));for(let p=l;p<=d;p++)for(let u=a;u<=r;u++){const g=p*v.cols+u;if(v.data[g]===0)continue;const m=u*t+t/2,x=p*t+t/2,A=m-o.x,_=x-o.y;A*A+_*_<=n&&(v.data[g]=0,i(m,x))}}function Z(){return v.cols*v.rows}function Q(){let i=0;const t=v.data;for(let e=0;e<t.length;e++)t[e]===0&&i++;return i}const M=[],Bt=1200;function Pt(i,t){const e=i-o.x,n=t-o.y,a=Math.hypot(e,n)||1,r=e/a,l=n/a,d=Math.hypot(o.vx,o.vy)||1,p=s.tiles.streamInherit,u=o.vx/d*p*d,g=o.vy/d*p*d,m=s.tiles.knockBase+Math.random()*s.tiles.knockVar;M.length>=Bt&&M.shift(),M.push({x:i,y:t,vx:r*m+u,vy:l*m+g+s.tiles.upwardKick,rot:(Math.random()-.5)*.4,rotV:(Math.random()*2-1)*s.tiles.rotMax,size:s.grid.chunkSize-s.grid.chunkGap,scale:1})}function Ht(i,t){for(let e=M.length-1;e>=0;e--){const n=M[e];n.vy+=s.tiles.gravity*i,n.x+=n.vx*i,n.y+=n.vy*i,n.rot+=n.rotV*i,n.scale-=s.tiles.shrink*i,(n.y>t+80||n.scale<=.05)&&M.splice(e,1)}}function Rt(){M.length=0}const F=[];let Y=0;function xt(i,t,e=1){const n=Math.random()*s.splash.jitter,a=Math.random()*Math.PI*2;F.push({x:i+Math.cos(a)*n,y:t+Math.sin(a)*n,rot:Math.random()*Math.PI*2,age:0,sizeMul:e})}function Yt(i,t){for(let e=0;e<5;e++)xt(i,t,1.35)}function Nt(i){Y+=i;const t=1/s.splash.spawnHz;for(;Y>t;)xt(o.x,o.y),Y-=t;for(let e=F.length-1;e>=0;e--)F[e].age+=i,F[e].age>=s.splash.life&&F.splice(e,1)}function Gt(){F.length=0,Y=0}function jt(i,t,e){i.fillStyle=s.wallColor,i.fillRect(0,0,t,e),i.fillStyle="#000000";const n=s.grid.chunkSize,a=n-s.grid.chunkGap;for(let r=0;r<v.rows;r++){const l=r*v.cols;for(let d=0;d<v.cols;d++)v.data[l+d]&&i.fillRect(d*n,r*n,a,a)}for(const r of M){i.save(),i.translate(r.x,r.y),i.rotate(r.rot),i.scale(r.scale,r.scale),i.fillStyle="#000000";const l=r.size/2;i.fillRect(-l,-l,r.size,r.size),i.restore()}i.lineWidth=s.splash.lineWidth;for(const r of F){const l=r.age/s.splash.life,d=(s.splash.startSize+(s.splash.endSize-s.splash.startSize)*l)*r.sizeMul,p=.7*(l<.8?1:(1-l)/.2);i.strokeStyle=`rgba(${s.splash.r},${s.splash.g},${s.splash.b},${p})`,i.save(),i.translate(r.x,r.y),i.rotate(r.rot);const u=d/2;i.strokeRect(-u,-u,d,d),i.restore()}i.fillStyle=`rgba(${s.splash.r},${s.splash.g},${s.splash.b},0.95)`,i.fillRect(o.x-2.5,o.y-2.5,5,5)}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class k{constructor(t,e,n,a,r="div"){this.parent=t,this.object=e,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("controller"),this.domElement.classList.add(a),this.$name=document.createElement("div"),this.$name.classList.add("name"),k.nextNameID=k.nextNameID||0,this.$name.id=`lil-gui-name-${++k.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Wt extends k{constructor(t,e,n){super(t,e,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function X(i){let t,e;return(t=i.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),e?"#"+e:!1}const Xt={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:X,toHexString:X},H={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},Jt={isPrimitive:!1,match:i=>Array.isArray(i),fromHexString(i,t,e=1){const n=H.fromHexString(i);t[0]=(n>>16&255)/255*e,t[1]=(n>>8&255)/255*e,t[2]=(n&255)/255*e},toHexString([i,t,e],n=1){n=255/n;const a=i*n<<16^t*n<<8^e*n<<0;return H.toHexString(a)}},Kt={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,t,e=1){const n=H.fromHexString(i);t.r=(n>>16&255)/255*e,t.g=(n>>8&255)/255*e,t.b=(n&255)/255*e},toHexString({r:i,g:t,b:e},n=1){n=255/n;const a=i*n<<16^t*n<<8^e*n<<0;return H.toHexString(a)}},Ut=[Xt,H,Jt,Kt];function Zt(i){return Ut.find(t=>t.match(i))}class Qt extends k{constructor(t,e,n,a){super(t,e,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Zt(this.initialValue),this._rgbScale=a,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=X(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class G extends k{constructor(t,e,n){super(t,e,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",a=>{a.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class qt extends k{constructor(t,e,n,a,r,l){super(t,e,n,"number"),this._initInput(),this.min(a),this.max(r);const d=l!==void 0;this.step(d?l:this._getImplicitStep(),d),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=e*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let h=parseFloat(this.$input.value);isNaN(h)||(this._stepExplicit&&(h=this._snap(h)),this.setValue(this._clamp(h)))},n=h=>{const b=parseFloat(this.$input.value);isNaN(b)||(this._snapClampSetValue(b+h),this.$input.value=this.getValue())},a=h=>{h.key==="Enter"&&this.$input.blur(),h.code==="ArrowUp"&&(h.preventDefault(),n(this._step*this._arrowKeyMultiplier(h))),h.code==="ArrowDown"&&(h.preventDefault(),n(this._step*this._arrowKeyMultiplier(h)*-1))},r=h=>{this._inputFocused&&(h.preventDefault(),n(this._step*this._normalizeMouseWheel(h)))};let l=!1,d,p,u,g,m;const x=5,A=h=>{d=h.clientX,p=u=h.clientY,l=!0,g=this.getValue(),m=0,window.addEventListener("mousemove",_),window.addEventListener("mouseup",S)},_=h=>{if(l){const b=h.clientX-d,O=h.clientY-p;Math.abs(O)>x?(h.preventDefault(),this.$input.blur(),l=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(b)>x&&S()}if(!l){const b=h.clientY-u;m-=b*this._step*this._arrowKeyMultiplier(h),g+m>this._max?m=this._max-g:g+m<this._min&&(m=this._min-g),this._snapClampSetValue(g+m)}u=h.clientY},S=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",_),window.removeEventListener("mouseup",S)},T=()=>{this._inputFocused=!0},c=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",a),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",A),this.$input.addEventListener("focus",T),this.$input.addEventListener("blur",c)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(c,h,b,O,Lt)=>(c-h)/(b-h)*(Lt-O)+O,e=c=>{const h=this.$slider.getBoundingClientRect();let b=t(c,h.left,h.right,this._min,this._max);this._snapClampSetValue(b)},n=c=>{this._setDraggingStyle(!0),e(c.clientX),window.addEventListener("mousemove",a),window.addEventListener("mouseup",r)},a=c=>{e(c.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",a),window.removeEventListener("mouseup",r)};let l=!1,d,p;const u=c=>{c.preventDefault(),this._setDraggingStyle(!0),e(c.touches[0].clientX),l=!1},g=c=>{c.touches.length>1||(this._hasScrollBar?(d=c.touches[0].clientX,p=c.touches[0].clientY,l=!0):u(c),window.addEventListener("touchmove",m,{passive:!1}),window.addEventListener("touchend",x))},m=c=>{if(l){const h=c.touches[0].clientX-d,b=c.touches[0].clientY-p;Math.abs(h)>Math.abs(b)?u(c):(window.removeEventListener("touchmove",m),window.removeEventListener("touchend",x))}else c.preventDefault(),e(c.touches[0].clientX)},x=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",m),window.removeEventListener("touchend",x)},A=this._callOnFinishChange.bind(this),_=400;let S;const T=c=>{if(Math.abs(c.deltaX)<Math.abs(c.deltaY)&&this._hasScrollBar)return;c.preventDefault();const b=this._normalizeMouseWheel(c)*this._step;this._snapClampSetValue(this.getValue()+b),this.$input.value=this.getValue(),clearTimeout(S),S=setTimeout(A,_)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",g,{passive:!1}),this.$slider.addEventListener("wheel",T,{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:n}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,n=-t.wheelDelta/120,n*=this._stepExplicit?1:10),e+-n}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){let e=0;return this._hasMin?e=this._min:this._hasMax&&(e=this._max),t-=e,t=Math.round(t/this._step)*this._step,t+=e,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class te extends k{constructor(t,e,n,a){super(t,e,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(a)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(e=>{const n=document.createElement("option");n.textContent=e,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.textContent=e===-1?t:this._names[e],this}}class ee extends k{constructor(t,e,n){super(t,e,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",a=>{a.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var ie=`.lil-gui {
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
}`;function ne(i){const t=document.createElement("style");t.innerHTML=i;const e=document.querySelector("head link[rel=stylesheet], head style");e?document.head.insertBefore(t,e):document.head.appendChild(t)}let ot=!1;class q{constructor({parent:t,autoPlace:e=t===void 0,container:n,width:a,title:r="Controls",closeFolders:l=!1,injectStyles:d=!0,touchStyles:p=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),p&&this.domElement.classList.add("allow-touch-styles"),!ot&&d&&(ne(ie),ot=!0),n?n.appendChild(this.domElement):e&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),a&&this.domElement.style.setProperty("--width",a+"px"),this._closeFolders=l}add(t,e,n,a,r){if(Object(n)===n)return new te(this,t,e,n);const l=t[e];switch(typeof l){case"number":return new qt(this,t,e,n,a,r);case"boolean":return new Wt(this,t,e);case"string":return new ee(this,t,e);case"function":return new G(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,l)}addColor(t,e,n=1){return new Qt(this,t,e,n)}addFolder(t){const e=new q({parent:this,title:t});return this.root._closeFolders&&e.close(),e}load(t,e=!0){return t.controllers&&this.controllers.forEach(n=>{n instanceof G||n._name in t.controllers&&n.load(t.controllers[n._name])}),e&&t.folders&&this.folders.forEach(n=>{n._title in t.folders&&n.load(t.folders[n._title])}),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof G)){if(n._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);e.controllers[n._name]=n.save()}}),t&&this.folders.forEach(n=>{if(n._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);e.folders[n._title]=n.save()}),e}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("transition");const n=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const a=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=a+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}const At="psxwash:save",tt=[{id:"tank",name:"tank size",blurb:"+10% water capacity",baseCost:25,costGrowth:1.6,maxLevel:8},{id:"pressure",name:"stream pressure",blurb:"+8% free speed",baseCost:30,costGrowth:1.7,maxLevel:8},{id:"nozzle",name:"nozzle width",blurb:"+6% erase radius",baseCost:40,costGrowth:1.8,maxLevel:6},{id:"recovery",name:"water recovery",blurb:"-5% drain rate",baseCost:50,costGrowth:1.9,maxLevel:5},{id:"payout",name:"soap subsidy",blurb:"+10% currency earned",baseCost:60,costGrowth:2,maxLevel:6}];function P(){return{currency:0,levels:Object.fromEntries(tt.map(i=>[i.id,0]))}}let L=se();function se(){try{const i=localStorage.getItem(At);if(!i)return P();const t=JSON.parse(i);return{...P(),...t,levels:{...P().levels,...t.levels||{}}}}catch{return P()}}function et(){localStorage.setItem(At,JSON.stringify(L))}function lt(){return L.currency}function it(i){return L.levels[i]??0}function _t(i,t){return Math.round(i.baseCost*Math.pow(i.costGrowth,t))}function re(i){const t=tt.find(a=>a.id===i);if(!t)return!1;const e=it(i);if(e>=t.maxLevel)return!1;const n=_t(t,e);return L.currency<n?!1:(L.currency-=n,L.levels[i]=e+1,et(),!0)}function ae(i){const t=i.state==="won"?60:20,e=i.cleanedPct/100*80,n=i.efficiency*40,a=1+.1*it("payout"),r=Math.round((t+e+n)*a);return L.currency+=r,et(),r}function oe(){L=P(),et()}const w=i=>document.getElementById(i),le=w("waterFill"),de=w("cleanVal"),he=w("timeVal"),dt=w("endOverlay"),ce=w("endTitle"),ue=w("endVerdict"),pe=w("endTime"),me=w("endClean"),ge=w("endWater"),fe=w("endEff"),ve=w("endEarned"),we=w("endContinue"),ht=w("shopOverlay"),be=w("shopStart"),ye=w("shopBalance"),ct=w("upgradeList");function xe(i,t,e){le.style.width=`${Math.max(0,Math.min(1,i))*100}%`,de.textContent=`${t.toFixed(0)}%`,he.textContent=`${e.toFixed(1)}`}function Ae(i,t,e){ce.textContent=i.state==="won"?"clean!":"out of water",ue.textContent=i.state==="won"?"wall is clean. nice flicks.":"tank ran dry before the wall was clean.",pe.textContent=`${i.durationSec.toFixed(1)}s`,me.textContent=`${i.cleanedPct.toFixed(1)}%`,ge.textContent=`${(i.waterLeft*100).toFixed(0)}%`,fe.textContent=`${(i.efficiency*100).toFixed(0)}%`,ve.textContent=`+${t}`,document.body.classList.add("overlay-open"),dt.classList.add("show"),we.onclick=()=>{dt.classList.remove("show"),e()}}function Et(){ye.textContent=String(lt()),ct.innerHTML="";for(const i of tt){const t=it(i.id),e=_t(i,t),n=t>=i.maxLevel,a=!n&&lt()>=e,r=document.createElement("div");r.className="upgrade";const l=document.createElement("div");l.className="meta";const d=document.createElement("span");d.className="name",d.textContent=i.name;const p=document.createElement("span");p.className="lvl",p.textContent=`lvl ${t}/${i.maxLevel} · ${i.blurb}`,l.appendChild(d),l.appendChild(p);const u=document.createElement("button");u.textContent=n?"max":`buy · ${e}`,u.disabled=!a,u.addEventListener("click",()=>{re(i.id)&&Et()}),r.appendChild(l),r.appendChild(u),ct.appendChild(r)}}function _e(i){Et(),document.body.classList.add("overlay-open"),ht.classList.add("show"),be.onclick=()=>{ht.classList.remove("show"),document.body.classList.remove("overlay-open"),i()}}const Ct=w("fps");function Ee(i){Ct.classList.toggle("show",i)}function Ce(i){Ct.textContent=`${i.toFixed(0)} fps`}const $e=JSON.parse(JSON.stringify(s)),$t="psxwash:presets";let y=null,j=!1;function R(){try{return JSON.parse(localStorage.getItem($t)||"{}")}catch{return{}}}function ut(i){localStorage.setItem($t,JSON.stringify(i))}function pt(i){for(const t of Object.keys(s)){const e=i[t],n=s[t];e&&typeof e=="object"&&typeof n=="object"?Object.assign(n,e):e!==void 0&&(s[t]=e)}y&&y.controllersRecursive().forEach(t=>t.updateDisplay())}function Se(i,t,e){return"#"+[i,t,e].map(n=>Math.round(n).toString(16).padStart(2,"0")).join("")}function ke(i){const t=i.replace("#","");return{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}}function Me(i,t){y=new q({title:"tuning · tap top-left to hide",width:280}),y.hide();const e=y.addFolder("Stream");e.add(s.stream,"freeSpeed",50,800,1).name("free speed (px/s)"),e.add(s.stream,"eraseRadius",8,100,1).name("erase radius"),e.add(s.stream,"maxThrowSpeed",400,4e3,10).name("max throw speed"),e.add(s.stream,"minThrowSpeed",0,400,5).name("min throw speed"),e.add(s.stream,"velWindowMs",100,400,5).name("vel window (ms)"),e.add(s.stream,"bounceNudgeRad",0,.3,.005).name("bounce nudge (rad)");const n=y.addFolder("Edge Snap");n.add(s.edgeSnap,"dist",10,200,1).name("dist (px)"),n.add(s.edgeSnap,"tan",0,1.5,.01).name("slow tan"),n.add(s.edgeSnap,"tanFast",0,2,.01).name("fast tan");const a=y.addFolder("Grid");a.add(s.grid,"chunkSize",4,64,1).name("chunk size").onFinishChange(()=>D(i(),t())),a.add(s.grid,"chunkGap",0,6,1).name("chunk gap").onFinishChange(()=>D(i(),t()));const r=y.addFolder("Tiles");r.add(s.tiles,"gravity",0,6e3,50).name("gravity"),r.add(s.tiles,"knockBase",0,400,5).name("knock base"),r.add(s.tiles,"knockVar",0,400,5).name("knock variance"),r.add(s.tiles,"streamInherit",0,1,.01).name("stream inherit"),r.add(s.tiles,"rotMax",0,20,.1).name("rot max (rad/s)"),r.add(s.tiles,"shrink",0,8,.1).name("shrink rate"),r.add(s.tiles,"upwardKick",-300,100,5).name("upward kick");const l=y.addFolder("Splash");l.add(s.splash,"spawnHz",0,200,1).name("spawn Hz"),l.add(s.splash,"life",.02,1,.01).name("life (s)"),l.add(s.splash,"startSize",0,80,1).name("start size"),l.add(s.splash,"endSize",0,200,1).name("end size"),l.add(s.splash,"lineWidth",.5,8,.5).name("line width"),l.add(s.splash,"jitter",0,80,1).name("jitter");const d={color:Se(s.splash.r,s.splash.g,s.splash.b)};l.addColor(d,"color").name("color").onChange(c=>{const{r:h,g:b,b:O}=ke(c);s.splash.r=h,s.splash.g=b,s.splash.b=O}),y.addFolder("Wall").addColor(s,"wallColor").name("wall color");const u=y.addFolder("Run");u.add(s.run,"tankSeconds",5,120,1).name("tank seconds"),u.add(s.run,"cleanTargetPct",10,100,1).name("clean target %"),u.add(s.run,"drainMultiplier",0,3,.05).name("drain multiplier");const g=y.addFolder("Presets"),m={name:"preset-1",selected:""};g.add(m,"name").name("name");let x=g.add(m,"selected",[""]).name("saved");function A(){const c=R(),h=Object.keys(c);x=x.options(h.length?h:["(none)"]),h.length&&x.setValue(h[0])}A();const _={save(){const c=R();c[m.name]=JSON.parse(JSON.stringify(s)),ut(c),A()},load(){const h=R()[m.selected];h&&(pt(h),D(i(),t()))},delete(){const c=R();delete c[m.selected],ut(c),A()},resetDefaults(){pt($e),D(i(),t())}};g.add(_,"save").name("save preset"),g.add(_,"load").name("load preset"),g.add(_,"delete").name("delete preset"),g.add(_,"resetDefaults").name("reset to defaults");const S=y.addFolder("Debug");S.close();const T={showFps:!1};S.add(T,"showFps").name("show FPS").onChange(c=>Ee(c)),S.add({wipeSave:()=>{oe()}},"wipeSave").name("wipe save (currency + upgrades)")}function Le(){y&&(j=!j,j?y.show():y.hide())}const f={state:"playing",water:1,startTime:0,endTime:0,result:null};function Fe(){return f}function Oe(i){f.state="playing",f.water=1,f.startTime=i,f.endTime=0,f.result=null}function mt(i,t){const e=Q()/Math.max(1,Z()),n=Math.max(1e-4,1-f.water);return{state:i,durationSec:(t-f.startTime)/1e3,cleanedPct:e*100,waterLeft:f.water,efficiency:Math.min(1,e/n)}}function De(i,t){if(f.state!=="playing")return!1;const e=1/Math.max(.001,s.run.tankSeconds)*s.run.drainMultiplier;return f.water=Math.max(0,f.water-e*i),Q()/Math.max(1,Z())*100>=s.run.cleanTargetPct?(f.state="won",f.endTime=t,f.result=mt("won",t),!1):f.water<=0?(f.state="lost",f.endTime=t,f.result=mt("lost",t),!1):!0}const z=document.getElementById("stage"),St=z.getContext("2d"),ze=document.getElementById("reset");let $=0,E=0,I=1;function kt(){I=Math.min(window.devicePixelRatio||1,2),$=window.innerWidth,E=window.innerHeight,z.width=$*I,z.height=E*I,z.style.width=$+"px",z.style.height=E+"px",St.setTransform(I,0,0,I,0,0),D($,E)}function nt(){D($,E),Rt(),Gt(),ft($,E),yt(!0),Oe(performance.now())}Tt(z,()=>$,()=>E);Me(()=>$,()=>E);Dt(Le);ze.addEventListener("click",i=>{i.stopPropagation(),nt()});let J=performance.now();const B=[];let gt=0;function Mt(){const i=performance.now();let t=(i-J)/1e3;J=i,t>.05&&(t=.05);const e=Fe();if(e.state==="playing"){Ft(t,$,E,zt(),Yt),It(Pt),Nt(t),Ht(t,E);const n=De(t,i),a=Q()/Math.max(1,Z())*100;if(xe(e.water,a,(i-e.startTime)/1e3),!n&&e.result){yt(!1);const r=ae(e.result),l=e.result;Ae(l,r,()=>{_e(nt)})}}for(jt(St,$,E),B.push(i);B.length&&i-B[0]>1e3;)B.shift();i-gt>200&&(Ce(B.length),gt=i),requestAnimationFrame(Mt)}window.addEventListener("resize",()=>{kt(),ft($,E)});kt();nt();J=performance.now();Mt();
