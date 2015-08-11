/*! 2015 Baidu Inc. All Rights Reserved */
define("moye/ui/Control",["require","jquery","./lib","./main","./Helper"],function(require){var t=require("jquery"),e=require("./lib"),i=require("./main"),n=require("./Helper"),s="hidden",a="disabled",r="readOnly",h=e.newClass({type:"Control",ignoreStates:["disable"],delegate:function(){var t=this.helper;return t.delegate.apply(t,arguments),this},undelegate:function(){var t=this.helper;return t.undelegate.apply(t,arguments),this},initialize:function(t){var i=this.helper=new n(this);if(i.changeStage("NEW"),this.currentStates={},t=t||{},this.bindEvents(t),this.init(t),this.main=this.main?e.g(this.main):this.createMain(),this.id=this.id||e.guid(),this.hasOwnProperty("states")){var s=this.states;if(e.isString(s))this.states=[s]}if(this.hasOwnProperty("skin")){var a=this.skin;if(e.isString(a))this.skin=[a]}i.initContext(),this.children=[],this.childrenIndex={},i.initPlugins(),i.changeStage("INITED")},init:function(t){if(this.helper.isInStage("NEW"))this.setOptions(t)},render:function(){var e=this.helper;if(e.isInStage("INITED"))if(this.fire("beforerender"),this.initStructure(),this.initEvents(),t(this.main).attr(i.getConfig("instanceAttr"),this.id),e.addPartClasses(),this.states&&this.states.length)for(var n=this.states.length-1;n>=0;n--)this.addState(this.states[n]);if(this.repaint(),e.isInStage("INITED"))e.changeStage("RENDERED"),this.fire("afterrender");return this},initStructure:function(){return this},initEvents:function(){return this},repaint:function(t,i){if(this.helper.isInStage("INITED")){if(this[a])this.disable(),delete this[a];if(this[s])this.hide(),delete this[s];if(e.isFunction(this.getValue))this.setReadOnly(!!this[r]),delete this[r]}return this},set:function(i,n){var s;if(e.isObject(i))s=i;else s={},s[i]=n;if(!this.helper.isInStage("RENDERED"))return t.extend(this,s),this;var a=[],r={};for(var h in s)if(s.hasOwnProperty(h)){var o=s[h],u=this[h],l=this.isPropertyChanged(h,o,u);if(l){this[h]=o;var p={name:h,oldValue:u,newValue:o};a.push(p),r[h]=p}}if(a.length)this.repaint(a,r);return r},get:function(t){return this[t]},isPropertyChanged:function(t,e,i){return e!==i},appendTo:function(t){if(this.helper.isInStage("INITED"))this.render();return t.appendChild(this.main),this},query:function(e){return t("."+e,this.main).toArray()},createMain:function(){return document.createElement("div")},addState:function(t){if(this.hasState(t))return this;else return this.currentStates[t]=!0,this.helper.addStateClasses(t),this.fire("statechange",{state:t,action:"add"}),this},removeState:function(t){var e=this;if(!e.hasState(t))return e;else return e.currentStates[t]=!1,this.helper.removeStateClasses(t),e.fire("statechange",{state:t,action:"remove"}),e},toggleState:function(t){return this.hasState(t)?this.removeState(t):this.addState(t),this},hasState:function(t){return!!this.currentStates[t]},show:function(){return this.removeState(s)},hide:function(){return this.addState(s)},toggle:function(){return this.toggleState(s)},disable:function(){return this.addState(a),this.helper.disableChildren(),this.fire("disable"),this},enable:function(){return this.removeState(a),this.helper.enableChildren(),this.fire("enable"),this},isDisabled:function(){return this.hasState(a)},isReadOnly:function(){return this.hasState(r)},setReadOnly:function(t){if(t)this.addState(r);else this.removeState(r);return this},addChild:function(t,e){var i=this.children,n=this.childrenIndex,s=t.getParent();if(s)s.removeChild(t);if(t.setParent(this),e=e||t.childName)n[e]=t;return t.setContext(this.context),i.push(t),this},removeChild:function(t){for(var e=this.children,i=this.childrenIndex,n=e.length-1;n>=0;n--)if(e[n]===t)e.splice(n,1);var s=t.childName;return delete i[s],t.setParent(null),this},getChild:function(t){return this.childrenIndex[t]},setParent:function(t){return this.parent=t,this},getParent:function(){return this.parent},initChildren:function(){return this.helper.initChildren(),this},setContext:function(e){var n=this.context;if(e!==n||n.get(this.id)!==this){if(n)this.context.remove(this);return e.add(this),t(this.main).attr(i.getConfig("contextAttr"),e.id),this.context=e,this}},dispose:function(){this.fire("beforedispose"),this.helper.disposePlugins(),this.helper.disposeChildren(),this.destroyEvents(),this.helper.changeStage("DISPOSED"),this.fire("afterdispose")},destroy:function(){if(this.dispose(),this.main)t(this.main).remove(),this.main=null},use:function(t){var e=this.plugins;if(!this.plugins)e=this.plugins=[];if(t=this.helper.createPluginInstance(t),e.push(t),!this.helper.isInStage("NEW"))t.activate(this);return this}}).implement(e.observable).implement(e.configurable);return h});