(self["webpackChunkvue3_final_challenge"]=self["webpackChunkvue3_final_challenge"]||[]).push([[924],{2894:function(t,e,i){
/*!
  * Bootstrap modal.js v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,s){t.exports=s(i(6e3),i(1617),i(4822),i(7100),i(4755),i(2888),i(1752),i(6714))})(0,(function(t,e,i,s,n,o,a,l){"use strict";const r="modal",d="bs.modal",c=`.${d}`,h=".data-api",u="Escape",m=`hide${c}`,_=`hidePrevented${c}`,g=`hidden${c}`,f=`show${c}`,p=`shown${c}`,b=`resize${c}`,v=`click.dismiss${c}`,k=`mousedown.dismiss${c}`,w=`keydown.dismiss${c}`,y=`click${c}${h}`,A="modal-open",E="fade",L="show",T="modal-static",x=".modal.show",$=".modal-dialog",C=".modal-body",D='[data-bs-toggle="modal"]',M={backdrop:!0,focus:!0,keyboard:!0},N={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class P extends t{constructor(t,e){super(t,e),this._dialog=i.findOne($,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new l,this._addEventListeners()}static get Default(){return M}static get DefaultType(){return N}static get NAME(){return r}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){if(this._isShown||this._isTransitioning)return;const i=e.trigger(this._element,f,{relatedTarget:t});i.defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(A),this._adjustDialog(),this._backdrop.show((()=>this._showElement(t))))}hide(){if(!this._isShown||this._isTransitioning)return;const t=e.trigger(this._element,m);t.defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(L),this._queueCallback((()=>this._hideModal()),this._element,this._isAnimated()))}dispose(){e.off(window,c),e.off(this._dialog,c),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new s({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new o({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const s=i.findOne(C,this._dialog);s&&(s.scrollTop=0),a.reflow(this._element),this._element.classList.add(L);const n=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,e.trigger(this._element,p,{relatedTarget:t})};this._queueCallback(n,this._dialog,this._isAnimated())}_addEventListeners(){e.on(this._element,w,(t=>{t.key===u&&(this._config.keyboard?this.hide():this._triggerBackdropTransition())})),e.on(window,b,(()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()})),e.on(this._element,k,(t=>{e.one(this._element,v,(e=>{this._element===t.target&&this._element===e.target&&("static"!==this._config.backdrop?this._config.backdrop&&this.hide():this._triggerBackdropTransition())}))}))}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide((()=>{document.body.classList.remove(A),this._resetAdjustments(),this._scrollBar.reset(),e.trigger(this._element,g)}))}_isAnimated(){return this._element.classList.contains(E)}_triggerBackdropTransition(){const t=e.trigger(this._element,_);if(t.defaultPrevented)return;const i=this._element.scrollHeight>document.documentElement.clientHeight,s=this._element.style.overflowY;"hidden"===s||this._element.classList.contains(T)||(i||(this._element.style.overflowY="hidden"),this._element.classList.add(T),this._queueCallback((()=>{this._element.classList.remove(T),this._queueCallback((()=>{this._element.style.overflowY=s}),this._dialog)}),this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),i=e>0;if(i&&!t){const t=a.isRTL()?"paddingLeft":"paddingRight";this._element.style[t]=`${e}px`}if(!i&&t){const t=a.isRTL()?"paddingRight":"paddingLeft";this._element.style[t]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each((function(){const i=P.getOrCreateInstance(this,t);if("string"===typeof t){if("undefined"===typeof i[t])throw new TypeError(`No method named "${t}"`);i[t](e)}}))}}return e.on(document,y,D,(function(t){const s=i.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&t.preventDefault(),e.one(s,f,(t=>{t.defaultPrevented||e.one(s,g,(()=>{a.isVisible(this)&&this.focus()}))}));const n=i.findOne(x);n&&P.getInstance(n).hide();const o=P.getOrCreateInstance(s);o.toggle(this)})),n.enableDismissTrigger(P),a.defineJQueryPlugin(P),P}))},7100:function(t,e,i){
/*!
  * Bootstrap backdrop.js v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,s){t.exports=s(i(1617),i(540),i(1752))})(0,(function(t,e,i){"use strict";const s="backdrop",n="fade",o="show",a=`mousedown.bs.${s}`,l={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},r={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class d extends e{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null}static get Default(){return l}static get DefaultType(){return r}static get NAME(){return s}show(t){if(!this._config.isVisible)return void i.execute(t);this._append();const e=this._getElement();this._config.isAnimated&&i.reflow(e),e.classList.add(o),this._emulateAnimation((()=>{i.execute(t)}))}hide(t){this._config.isVisible?(this._getElement().classList.remove(o),this._emulateAnimation((()=>{this.dispose(),i.execute(t)}))):i.execute(t)}dispose(){this._isAppended&&(t.off(this._element,a),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add(n),this._element=t}return this._element}_configAfterMerge(t){return t.rootElement=i.getElement(t.rootElement),t}_append(){if(this._isAppended)return;const e=this._getElement();this._config.rootElement.append(e),t.on(e,a,(()=>{i.execute(this._config.clickCallback)})),this._isAppended=!0}_emulateAnimation(t){i.executeAfterTransition(t,this._getElement(),this._config.isAnimated)}}return d}))},2888:function(t,e,i){
/*!
  * Bootstrap focustrap.js v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,s){t.exports=s(i(1617),i(4822),i(540))})(0,(function(t,e,i){"use strict";const s="focustrap",n="bs.focustrap",o=`.${n}`,a=`focusin${o}`,l=`keydown.tab${o}`,r="Tab",d="forward",c="backward",h={autofocus:!0,trapElement:null},u={autofocus:"boolean",trapElement:"element"};class m extends i{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return h}static get DefaultType(){return u}static get NAME(){return s}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),t.off(document,o),t.on(document,a,(t=>this._handleFocusin(t))),t.on(document,l,(t=>this._handleKeydown(t))),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,t.off(document,o))}_handleFocusin(t){const{trapElement:i}=this._config;if(t.target===document||t.target===i||i.contains(t.target))return;const s=e.focusableChildren(i);0===s.length?i.focus():this._lastTabNavDirection===c?s[s.length-1].focus():s[0].focus()}_handleKeydown(t){t.key===r&&(this._lastTabNavDirection=t.shiftKey?c:d)}}return m}))},6714:function(t,e,i){
/*!
  * Bootstrap scrollbar.js v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,s){t.exports=s(i(7492),i(4822),i(1752))})(0,(function(t,e,i){"use strict";const s=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",n=".sticky-top",o="padding-right",a="margin-right";class l{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,o,(e=>e+t)),this._setElementAttributes(s,o,(e=>e+t)),this._setElementAttributes(n,a,(e=>e-t))}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,o),this._resetElementAttributes(s,o),this._resetElementAttributes(n,a)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,i){const s=this.getWidth(),n=t=>{if(t!==this._element&&window.innerWidth>t.clientWidth+s)return;this._saveInitialAttribute(t,e);const n=window.getComputedStyle(t).getPropertyValue(e);t.style.setProperty(e,`${i(Number.parseFloat(n))}px`)};this._applyManipulationCallback(t,n)}_saveInitialAttribute(e,i){const s=e.style.getPropertyValue(i);s&&t.setDataAttribute(e,i,s)}_resetElementAttributes(e,i){const s=e=>{const s=t.getDataAttribute(e,i);null!==s?(t.removeDataAttribute(e,i),e.style.setProperty(i,s)):e.style.removeProperty(i)};this._applyManipulationCallback(e,s)}_applyManipulationCallback(t,s){if(i.isElement(t))s(t);else for(const i of e.find(t,this._element))s(i)}}return l}))},3286:function(t,e,i){"use strict";var s=i(2894),n=i.n(s);e.A={methods:{showModal(){this.modal.show()},hideModal(){this.modal.hide()}},mounted(){this.modal=new(n())(this.$refs.modal)}}},1924:function(t,e,i){"use strict";i.d(e,{A:function(){return b}});var s=i(6768),n=i(4232);const o={class:"modal fade",id:"delModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},a={class:"modal-dialog",role:"document"},l={class:"modal-content border-0"},r={class:"modal-header bg-danger text-white"},d={class:"modal-title"},c={class:"modal-body"},h={class:"text-danger"},u={class:"modal-footer"};function m(t,e,i,m,_,g){return(0,s.uX)(),(0,s.CE)("div",o,[(0,s.Lk)("div",a,[(0,s.Lk)("div",l,[(0,s.Lk)("div",r,[(0,s.Lk)("h5",d,[(0,s.Lk)("span",null,"刪除 "+(0,n.v_)(i.item.title),1)]),e[1]||(e[1]=(0,s.Lk)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1))]),(0,s.Lk)("div",c,[e[2]||(e[2]=(0,s.eW)(" 是否刪除 ")),(0,s.Lk)("strong",h,(0,n.v_)(i.item.title),1),e[3]||(e[3]=(0,s.eW)(" (刪除後將無法恢復)。 "))]),(0,s.Lk)("div",u,[e[4]||(e[4]=(0,s.Lk)("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1)),(0,s.Lk)("button",{type:"button",class:"btn btn-danger",onClick:e[0]||(e[0]=e=>t.$emit("del-item"))}," 確認刪除 ")])])])],512)}var _=i(3286),g={props:{item:{}},data(){return{modal:""}},mixins:[_.A]},f=i(1241);const p=(0,f.A)(g,[["render",m]]);var b=p}}]);
//# sourceMappingURL=924.a2cde3a3.js.map