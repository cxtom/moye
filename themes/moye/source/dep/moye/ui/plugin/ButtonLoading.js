/*! 2015 Baidu Inc. All Rights Reserved */
define("moye/ui/plugin/ButtonLoading",["require","jquery","./Plugin"],function(require){var t=require("jquery"),e=require("./Plugin"),i=e.extend({$class:"ButtonLoading",options:{text:"请稍候...",cooldown:6e4,interval:1e3},activate:function(e){this.target=e,e.setLoading=t.proxy(this.setLoading,this)},setLoading:function(t,e){var i=this.target;if(t)this.cache=i.getText(),i.addState("loading").disable(),i.setText(e||this.text);else i.removeState("loading").enable(),i.setText(this.cache),this.cache=""},isLoading:function(){return this.target.hasState("loading")},dispose:function(){this.target=null}});return i});