/*! 2015 Baidu Inc. All Rights Reserved */
define("moye/ui/Helper",["require","jquery","./helper/dom","./helper/life","./helper/children","./helper/plugin","./helper/event"],function(require){function t(t){this.control=t}var e=require("jquery");return e.extend(t.prototype,require("./helper/dom"),require("./helper/life"),require("./helper/children"),require("./helper/plugin"),require("./helper/event")),t});