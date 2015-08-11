/*! 2015 Baidu Inc. All Rights Reserved */
define("moye/ui/plugin/TextBoxAutoComplete",["require","jquery","../lib","./Plugin","../Popup"],function(require){var t=require("jquery"),e=require("../lib"),i=require("./Plugin"),n=require("../Popup"),s=150,r={ENTER:13,ESC:27,UP:38,DOWN:40},a="autocomplete-item",o=e.map(r,function(t){return t}),h=i.extend({$class:"TextBoxAutoComplete",options:{history:!0,delay:s,datasource:function(t){return null},renderItem:function(t,e){return t.text}},initialize:function(t){this.$parent(t),this.delay=this.delay||s,this.move=e.throttle.call(this,this.move,50),this.current=null,this._cacheData={}},activate:function(i){this.$parent(i),this.textbox=i;var s=i.id,r=this.input=i.input;t(r).on("keydown."+s,t.proxy(this.onTextBoxKeyDown,this)).on("blur."+s,t.proxy(this.onTextBoxBlur,this)).get(0).autocomplete="off",i.getSuggestions=t.proxy(this.load,this),i.hideSuggestions=t.proxy(this.hide,this),i.showSuggestions=t.proxy(this.show,this),i.getPopup=t.proxy(this.getPopup,this);var a=e.debounce.call(this,t.proxy(this.onTextBoxChange,this),this.delay);i.on("change",a);var o=i.helper,h=this.popup=new n({main:o.createPart("autocomplete"),target:r,triggers:r,mode:"click",hideDelay:0,showDelay:0}).render();h.on("click",t.proxy(this.onPopupClick,this)).on("beforeshow",t.proxy(this.onPopupBeforeShow,this)).on("show",t.proxy(this.onPopupShow,this)).on("hide",t.proxy(this.onPopupHide,this)),i.addChild(h),this.resizePopup()},onTextBoxChange:function(e){var i=this.textbox.getValue();if(this.setCacheKey(i),i=t.trim(i))this.load(i);else this.hide(),this.suggestions=null},onTextBoxBlur:function(){e.delay.call(this,this.hide,200)()},onTextBoxKeyDown:function(e){var i=e.keyCode;if(~t.inArray(i,o))e.preventDefault();switch(e.keyCode){case r.DOWN:this.next();break;case r.UP:this.prev();break;case r.ENTER:this.confirm();break;case r.ESC:this.hide()}},onPopupClick:function(e){var i=this.getPartClassName(),n=t(e.target).closest("."+i);this.confirm(n[0]),this.textbox.fire("autocompleteclick")},onPopupBeforeShow:function(t){if(this.textbox.isDisabled())return void t.preventDefault();if(!this.suggestions||!this.getInputValue())return void t.preventDefault();else return void this.textbox.fire("autocompletebeforeshow")},onPopupShow:function(t){if(this.textbox.isDisabled())return void t.preventDefault();else return void this.textbox.fire("autocompleteshow")},onPopupHide:function(t){if(this.textbox.isDisabled())return void t.preventDefault();else return void this.textbox.fire("autocompletehide")},pick:function(e,i){var n=t(e).index();if(~n)null!==this.current&&this.cancelHighlight(this.current),this.highlight(n),this.current=n,this.textbox.setValue(this.toInput(this.suggestions[n])),!i&&this.textbox.fire("autocompletepick")},confirm:function(e){var i=this.suggestions||[];if(!e&&null!==this.current)e=this.getActiveItem();var n=t(e).index(),s=this.textbox.fire("autocomplete",{suggestion:i[n]||{}});if(!s.isDefaultPrevented())this.pick(e),this.hide()},load:function(i){var n=this.getCacheData(i);if(this.history&&n.length)return this.onSuggestionLoaded(i,n),this.textbox;var s=this.datasource(i);if(e.isPromise(s))s.then(t.proxy(this.onSuggestionLoaded,this,i));else this.onSuggestionLoaded(i,s);return this.textbox},onSuggestionLoaded:function(t,e){if(!e||!e.length)this.hide();else this.fill(t,e)},setCacheKey:function(t){this._key=t},getCacheKey:function(){return this._key||""},setCacheData:function(t,e){this._cacheData[t]=e},getCacheData:function(t){return this._cacheData[t]||[]},validateSource:function(e){if(t.isArray(e)&&e.length&&e[0].hasOwnProperty("text")&&e[0].hasOwnProperty("value"))return!0;else return!1},getMain:function(){return this.popup.main},getChildren:function(){return t("."+this.getPartClassName(),this.getMain())},getPartClassName:function(){return this.textbox.helper.getPrimaryClassName(a)},getActiveItem:function(){return null!==this.current?this.getChildren().eq(this.current):null},getInputValue:function(){return t.trim(this.textbox.getValue())},fill:function(t,i){var n=this;this.suggestions=i=i||[];var s=i.length;if(!(t&&i&&s&&this.validateSource(i)))return this.textbox;if(this.history)this.setCacheData(t,i);this.current=null;var r,a,o,h=["<ul>"],l=this.getPartClassName();return e.each(i,function(t,e){r=n.renderItem(t,e),a=/<[^>]+>/g.test(r)?"":' title="'+r+'"',o='<li class="'+l+'" data-index="'+e+'"'+a+">"+r+"</li>",h.push(o)}),h.push("</ul>"),this.popup.setContent(h.join("")),this.show(),this.textbox},show:function(){return this.popup.show(),this.textbox},hide:function(){return this.popup.hide(),this.textbox},toInput:function(t){return t.value},next:function(){this.move("down")},prev:function(){this.move("up")},move:function(t){var e=(this.suggestions||[]).length;if(0!==e){if(this.getInputValue()&&!this.popup.isVisible())return void this.show();var i,n=this.current;if("down"===t)i=null===n?0:n+1,i=i===e?null:i;else i=null===n?e-1:n-1,i=-1===i?null:i;if(null!==i)this.pick(this.getChildren().eq(i));else null!==n&&this.cancelHighlight(n),this.textbox.setValue(this.getCacheKey()),this.current=i}},highlight:function(t){this.getChildren().eq(t).addClass("hover")},cancelHighlight:function(t){this.getChildren().eq(t).removeClass("hover")},resizePopup:function(){t(this.getMain()).outerWidth(t(this.input).outerWidth())},getPopup:function(){return this.popup},inactivate:function(){var e=this.textbox,i=e.id;t(e.input).off("keydown."+i).off("blur."+i),this.textbox=null}});return h});