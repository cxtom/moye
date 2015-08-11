/*! 2015 Baidu Inc. All Rights Reserved */
define("moye/ui/Marquee",["require","jquery","./lib","./Control"],function(require){function t(){this.timeoutID&&clearTimeout(this.timeoutID),this.timeoutID=null}var e=require("jquery"),i=require("./lib"),n=require("./Control"),s={left:"padding-right",right:"padding-left",up:"padding-bottom",down:"padding-top"},r={continous:function o(){this.timeoutID=setTimeout(e.proxy(o,this),this.speed);var t=this.item;if(t.css(this.getDirection(),this.pos+"px"),this.pos--,this.pos<-this.max){t.append(this.itemHtml);var i=t.find("span"),n=i.length;if(2>=n&&!this.vertical)return this.max="left"===this.direction?this.max+this.width:this.max,void(this.pos="left"===this.direction?this.pos:this.pos+this.width);else if(2>=n&&this.vertical)return this.max="up"===this.direction?this.max+this.height:this.max,void(this.pos="up"===this.direction?this.pos:this.pos+this.height);i.eq(0).remove(),this.pos+=this.vertical?this.height:this.width}},scroll:function u(){this.timeoutID=setTimeout(e.proxy(u,this),this.speed);var t=this.item;if(t.css(this.getDirection(),this.pos+"px"),this.pos--,this.pos<-this.max)this.initPosition()}},a={continous:function(){switch(this.direction){case"left":this.max=this.width-this.main.width();break;case"down":case"right":this.max=0;break;case"up":this.max=this.height-this.main.height()}},scroll:function(){switch(this.direction){case"left":this.max=this.width;break;case"right":this.max=this.main.outerWidth();break;case"up":this.max=this.height;break;case"down":this.max=this.main.outerHeight()}}},h=n.extend({type:"Marquee",options:{speed:16,direction:"left",content:"",hoverable:!0,auto:!0,gap:80,behavior:"continous"},init:function(t){if(this.$parent(t),this.timeoutID=null,this.main=e(this.main),e.inArray(this.direction,["left","right","up","down"])<0)this.direction="left";if(this.vertical=e.inArray(this.direction,["up","down"])>=0,this.vertical)this.helper.addPartClasses("vertical");this.helper.addPartClasses(this.behavior)},initStructure:function(){this.content=this.content||this.main.data("content")||"",this.itemHtml='<span style="'+this.getGapStr()+'">'+this.content+"</span>",this.main.html("<span>"+this.itemHtml+"</span>");var i=this.main.children("span");if(this.item=i,this.width=this.width||i.outerWidth(),this.height=this.height||i.outerHeight(),this.initPosition(),this.item.css(this.getDirection(),this.pos),"continous"===this.behavior&&(!this.vertical&&this.width<this.main.width()||this.vertical&&this.height<this.main.height()))this.vertical?this.height-=this.gap:this.width-=this.gap,this.behavior="scroll",this.helper.removePartClasses("continus"),this.helper.addPartClasses("scroll"),this.item.children("span").css("padding","0");if(a[this.behavior].call(this),this.start=e.proxy(r[this.behavior],this),this.stop=e.proxy(t,this),this.auto)return void this.start();else return void(this.timeoutID=null)},initEvents:function(){if(this.hoverable)e(this.main).on("mouseenter",this.stop),e(this.main).on("mouseleave",this.start)},getDirection:function(){var t={up:"top",down:"bottom"};return t[this.direction]||this.direction},getGapStr:function(){if("continous"!==this.behavior)return"";else return s[this.direction]+":"+this.gap+"px"},initPosition:function(){switch(this.direction){case"right":this.pos=this.width;break;case"up":this.pos=this.main.outerHeight();break;case"down":this.pos=this.height;break;case"left":this.pos=this.main.outerWidth()}},dispose:function(){if(this.stop(),this.hoverable)e(this.main).off("mouseenter",this.stop),e(this.main).off("mouseleave",this.start);this.item=null,this.itemHtml="",this.start=e.noop,this.stop=e.noop,e(this.main).html(""),this.$parent()}}).implement(i.observable).implement(i.configurable);return h});