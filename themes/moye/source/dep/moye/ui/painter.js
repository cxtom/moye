/*! 2015 Baidu Inc. All Rights Reserved */
define("moye/ui/painter",["require","./lib"],function(require){var t=require("./lib");return{createRepaint:function(){var e=t.slice(arguments);return function(i,n){for(var s=t.extend({},n),r=0;r<e.length;r++){var a=e[r];if("function"!=typeof a){var o=[].concat(a.name),h=!i,l=o.length;if(!h)for(var u=0;l>u;u++){var c=o[u];if(n.hasOwnProperty(c)){h=!0;break}}if(h){var f=[a];for(u=0;l>u;u++)c=o[u],f.push(this[c]),delete s[c];a.paint.apply(this,f)}else;}else a.apply(this,arguments)}return this}}}});