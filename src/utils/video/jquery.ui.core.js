/*!
 * jQuery UI Core @VERSION
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
(function ($, undefined) {

    // $.ui might exist from components with no dependencies, e.g., $.ui.position
    $.ui = $.ui || {};

    $.extend($.ui, {
        version: "@VERSION",

        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });

    // plugins
    $.fn.extend({
        focus: (function (orig) {
            return function (delay, fn) {
                return typeof delay === "number" ?
                    this.each(function () {
                        var elem = this;
                        setTimeout(function () {
                            $(elem).focus();
                            if (fn) {
                                fn.call(elem);
                            }
                        }, delay);
                    }) :
                    orig.apply(this, arguments);
            };
        })($.fn.focus),

        scrollParent: function () {
            var position = this.css("position"),
                excludeStaticParent = position === "absolute",
                scrollParent = this.parents().filter(function () {
                    var parent = $(this);
                    if (excludeStaticParent && parent.css("position") === "static") {
                        return false;
                    }
                    return (/(auto|scroll)/).test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));
                }).eq(0);

            return position === "fixed" || !scrollParent.length ? $(this[0].ownerDocument || document) : scrollParent;
        },

        uniqueId: (function () {
            var uuid = 0;

            return function () {
                return this.each(function () {
                    if (!this.id) {
                        this.id = "ui-id-" + (++uuid);
                    }
                });
            };
        })(),

        removeUniqueId: function () {
            return this.each(function () {
                if (/^ui-id-\d+$/.test(this.id)) {
                    $(this).removeAttr("id");
                }
            });
        }
    });

    // selectors
    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img,
            nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                return false;
            }
            img = $("img[usemap=#" + mapName + "]")[0];
            return !!img && visible(img);
        }
        return (/input|select|textarea|button|object/.test(nodeName) ?
                !element.disabled :
                "a" === nodeName ?
                element.href || isTabIndexNotNaN :
                isTabIndexNotNaN) &&
            // the element and all of its ancestors must be visible
            visible(element);
    }

    function visible(element) {
        return $.expr.filters.visible(element) &&
            !$(element).parents().addBack().filter(function () {
                return $.css(this, "visibility") === "hidden";
            }).length;
    }

    $.extend($.expr[":"], {
        data: $.expr.createPseudo ?
            $.expr.createPseudo(function (dataName) {
                return function (elem) {
                    return !!$.data(elem, dataName);
                };
            }) :
        // support: jQuery <1.8
        function (elem, i, match) {
            return !!$.data(elem, match[3]);
        },

        focusable: function (element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        },

        tabbable: function (element) {
            var tabIndex = $.attr(element, "tabindex"),
                isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        }
    });

    // support: jQuery <1.8
    if (!$("<a>").outerWidth(1).jquery) {
        $.each(["Width", "Height"], function (i, name) {
            var side = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                type = name.toLowerCase(),
                orig = {
                    innerWidth: $.fn.innerWidth,
                    innerHeight: $.fn.innerHeight,
                    outerWidth: $.fn.outerWidth,
                    outerHeight: $.fn.outerHeight
                };

            function reduce(elem, size, border, margin) {
                $.each(side, function () {
                    size -= parseFloat($.css(elem, "padding" + this)) || 0;
                    if (border) {
                        size -= parseFloat($.css(elem, "border" + this + "Width")) || 0;
                    }
                    if (margin) {
                        size -= parseFloat($.css(elem, "margin" + this)) || 0;
                    }
                });
                return size;
            }

            $.fn["inner" + name] = function (size) {
                if (size === undefined) {
                    return orig["inner" + name].call(this);
                }

                return this.each(function () {
                    $(this).css(type, reduce(this, size) + "px");
                });
            };

            $.fn["outer" + name] = function (size, margin) {
                if (typeof size !== "number") {
                    return orig["outer" + name].call(this, size);
                }

                return this.each(function () {
                    $(this).css(type, reduce(this, size, true, margin) + "px");
                });
            };
        });
    }

    // support: jQuery <1.8
    if (!$.fn.addBack) {
        $.fn.addBack = function (selector) {
            return this.add(selector == null ?
                this.prevObject : this.prevObject.filter(selector)
            );
        };
    }

    // support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
    if ($("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        $.fn.removeData = (function (removeData) {
            return function (key) {
                if (arguments.length) {
                    return removeData.call(this, $.camelCase(key));
                } else {
                    return removeData.call(this);
                }
            };
        })($.fn.removeData);
    }

    // deprecated
    $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());

    $.support.selectstart = "onselectstart" in document.createElement("div");
    $.fn.extend({
        disableSelection: function () {
            return this.bind(($.support.selectstart ? "selectstart" : "mousedown") +
                ".ui-disableSelection", function (event) {
                    event.preventDefault();
                });
        },

        enableSelection: function () {
            return this.unbind(".ui-disableSelection");
        },

        zIndex: function (zIndex) {
            if (zIndex !== undefined) {
                return this.css("zIndex", zIndex);
            }

            if (this.length) {
                var elem = $(this[0]),
                    position, value;
                while (elem.length && elem[0] !== document) {
                    // Ignore z-index if position is set to a value where z-index is ignored by the browser
                    // This makes behavior of this function consistent across browsers
                    // WebKit always returns auto if the element is positioned
                    position = elem.css("position");
                    if (position === "absolute" || position === "relative" || position === "fixed") {
                        // IE returns 0 when zIndex is not specified
                        // other browsers return a string
                        // we ignore the case of nested elements with an explicit value of 0
                        // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
                        value = parseInt(elem.css("zIndex"), 10);
                        if (!isNaN(value) && value !== 0) {
                            return value;
                        }
                    }
                    elem = elem.parent();
                }
            }

            return 0;
        }
    });

    // $.ui.plugin is deprecated. Use $.widget() extensions instead.
    $.ui.plugin = {
        add: function (module, option, set) {
            var i,
                proto = $.ui[module].prototype;
            for (i in set) {
                proto.plugins[i] = proto.plugins[i] || [];
                proto.plugins[i].push([option, set [i]]);
            }
        },
        call: function (instance, name, args, allowDisconnected) {
            var i,
                set = instance.plugins[name];

            if (!set) {
                return;
            }

            if (!allowDisconnected && (!instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11)) {
                return;
            }

            for (i = 0; i < set.length; i++) {
                if (instance.options[set [i][0]]) {
                    set [i][1].apply(instance.element, args);
                }
            }
        }
    };

})(jQuery);

//以下为dui部分
//原生对象扩展
(function () {
    //字符串utf-8字节长度
    String.prototype.lengthB = function () {
        var i,
            total = 0,
            charCode,
            len = this.length;

        for (i = len; i--;) {
            charCode = this.charCodeAt(i);
            if (charCode <= 0x007f) {
                total += 1;
            } else if (charCode <= 0x07ff) {
                total += 2;
            } else if (charCode <= 0xffff) {
                total += 3;
            } else {
                total += 4
            }
        }

        return total;
    };
    if (String.prototype.toInt === undefined) {
        String.prototype.toInt = function (base) {
            return parseInt(this, base || 10);
        }
    }
    if (String.prototype.toFloat === undefined) {
        String.prototype.toFloat = function () {
            return parseFloat(this);
        }
    }
    if (String.prototype.contains === undefined) {
        String.prototype.contains = function (string, separator) {
            return (separator) ?
                (separator + this + separator).indexOf(separator + string + separator) > -1 :
                String(this).indexOf(string) > -1;
        }
    }

    //function bind扩展
    if (Function.prototype.bind === undefined) {
        Function.prototype.bind = function (context) {
            if (arguments.length < 2 && context == void 0) {
                return this;
            }
            var __method = this,
                args = [].slice.call(arguments, 1);
            return function () {
                return __method.apply(context, args.concat.apply(args, arguments));
            }
        }
    }

    //Number
    if (Number.prototype.limit === undefined) {
        Number.prototype.limit = function (min, max) {
            return Math.min(max, Math.max(min, this));
        }
    }
    if (Number.prototype.toInt === undefined) {
        Number.prototype.toInt = function (base) {
            return parseInt(this, base || 10);
        }
    }
    if (Number.prototype.toFloat === undefined) {
        Number.prototype.toFloat = function () {
            return parseFloat(this);
        }
    }

    /**
     * [addDays description]添加秒
     * @param {[type]} num [description]整数
     */
    Date.prototype.addSeconds = function (num) {
        this.setSeconds(this.getSeconds() + num);
        return this;
    };
    /**
     * [addDays description]添加天数
     * @param {[type]} num [description]整数
     */
    Date.prototype.addDays = function (num) {
        this.setDate(this.getDate() + num);
        return this;
    };
    /**
     * [addWeeks description]添加周
     * @param {[type]} num [description]
     */
    Date.prototype.addWeeks = function (num) {
        this.setDate(this.addDays(num * 7));
        return this;
    };

    /**
     * [addMonths description]添加加月
     * @param {[type]} num [description]
     */
    Date.prototype.addMonths = function (num) {
        var d = this.getDate();
        this.setMonth(this.getMonth() + num);
        if (this.getDate() < d)
            this.setDate(0);
        return this;
    };
    /**
     * [addYears description]添加年
     * @param {[type]} num [description]
     */
    Date.prototype.addYears = function (num) {
        this.setFullYear(this.getFullYear() + num);
        return this;
    };

})();

//浏览器检测
(function ($) {

    /**
     * 浏览器判断
     * @type {Object}
     * @example
     *
     * // 是否为 ie
     * Browser.ie
     *
     * // 是否为 chrome
     * Browser.chrome
     *
     * // 是否为 firefox
     * Browser.firefox
     *
     * // 是否为 ie7, ie8, ie9 等等，chrome和firefox也可以这样用
     * Browser.ie7
     * Browser.ie8
     * Browser.ie9
     *
     * // 是否为 win
     * Browser.Platform.win
     *
     * // 是否为 mac
     * Browser.Platform.mac
     *
     * // 是否为 linux
     * Browser.Platform.linux
     *
     */

    var browser = (function () {

        var ua = navigator.userAgent.toLowerCase(),
            platform = navigator.platform.toLowerCase(),
            UA = ua.match(/(opera|ie|trident|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|rv:(\d.?)|$)/) || [null, 'unknown', 0],
            mode = (UA[1] == 'ie' || UA[1] == 'trident') && document.documentMode;

        var Browser = {
            name: (UA[1] == 'version') ? UA[3] : (UA[1] == 'trident' ? 'ie' : UA[1]),
            version: mode || parseFloat((UA[1] == 'opera' && UA[4]) ? UA[4] : ((UA[1] == 'trident' && UA[5]) ? UA[5] : UA[2])),
            Platform: {
                name: ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0]
            }
        };

        Browser[Browser.name] = true;
        Browser[Browser.name + parseInt(Browser.version, 10)] = true;
        Browser.Platform[Browser.Platform.name] = true;

        if (Browser.Platform.ios) Browser.Platform.ipod = true;

        Browser.Engine = {};

        var setEngine = function (name, version) {
            Browser.Engine.name = name;
            Browser.Engine[name + version] = true;
            Browser.Engine.version = version;
        };

        if (Browser.ie) {
            Browser.Engine.trident = true;

            switch (Browser.version) {
            case 6:
                setEngine('trident', 4);
                break;
            case 7:
                setEngine('trident', 5);
                break;
            case 8:
                setEngine('trident', 6);
            }
        }

        if (Browser.firefox) {
            Browser.Engine.gecko = true;

            if (Browser.version >= 3) setEngine('gecko', 19);
            else setEngine('gecko', 18);
        }

        if (Browser.safari || Browser.chrome) {
            Browser.Engine.webkit = true;

            switch (Browser.version) {
            case 2:
                setEngine('webkit', 419);
                break;
            case 3:
                setEngine('webkit', 420);
                break;
            case 4:
                setEngine('webkit', 525);
            }
        }

        if (Browser.opera) {
            Browser.Engine.presto = true;

            if (Browser.version >= 9.6) setEngine('presto', 960);
            else if (Browser.version >= 9.5) setEngine('presto', 950);
            else setEngine('presto', 925);
        }

        if (Browser.name == 'unknown') {
            switch ((ua.match(/(?:webkit|khtml|gecko)/) || [])[0]) {
            case 'webkit':
            case 'khtml':
                Browser.Engine.webkit = true;
                break;
            case 'gecko':
                Browser.Engine.gecko = true;
            }
        }

        return Browser;
    })();

    $.browser = browser;

})(jQuery);

//$.masker
(function ($) {
    var cache = {};

    function getResizeSize(el) {
        var width, height;
        if (el.parent('body').length) {
            width = el.width();
            height = el.height();
        } else {
            var doc = document.documentElement;
            width = Math.max(doc.scrollWidth, doc.clientWidth);
            height = Math.max(doc.scrollHeight, doc.clientHeight);
        }
        return {
            width: width,
            height: height
        }
    }

    $.mask = function (el) {
        if (cache[el.id]) {
            return;
        }
        el = $.type(el) === 'string' ? $(el) : el;
        el.uniqueId();
        var masker = $('<div class="u-mask"></div>');
        var wrap, size, pos = el.position();
        wrap = el.parent('body').length ? el.parent() : el;
        if (wrap.css('position') !== 'static') {
            pos = {
                left: 0,
                top: 0
            };
        }
        size = getResizeSize(el);
        $(window).on('resize.' + el.id, function () {
            var size = getResizeSize(el);
            masker.css({
                width: size.width,
                height: size.height
            });
            var size = getResizeSize(el);
            masker.css({
                width: size.width,
                height: size.height
            });
        });

        wrap.append(masker);
        masker.zIndex(1000);
        masker.disableSelection().css({
            width: size.width,
            height: size.height,
            left: pos.left,
            top: pos.top
        });
        cache[el.id] = masker;
        return masker;
    }
    $.unmask = function (el) {
        if (cache[el.id]) {
            cache[el.id].remove();
            cache[el.id] = null;
            delete cache[el.id];
            $(window).off('resize.' + el.id);
        }
        return el;
    }
})(jQuery);
/**
 * 扩展jQuery下的工具方法
 */
(function ($) {

    $.extend({
        /**
         * [pad description]格式化数值，
         * @param  {[type]} str [description]
         * @param  {[type]} n   [description]位数。
         * @return {[type]}     [description]$.pad(2,2) === '02'
         */
        pad: function (str, n) {
            return ((1 << n).toString(2) + str).slice(-n);
        },
        /**
         * 判断指定参数是否为jquery的延迟对象
         * @param obj {object} 判断参数
         * @returns {boolean} true 是延迟对象 false 非延迟对象
         */
        isDeferred: function (obj) {
            return obj ? $.isFunction(obj.promise) : false;
        },
        /**
         * 返回一个新的延迟对象 done回调： 传入的参数延迟对象其中一个被解决
         *                      fail回调： 传入的参数延迟对象全部失败
         * @param waite {[boolean]} 可选 是否等待所有的延迟对象全部完成后触发回调, 默认为false 不等待
         *                         true 等待完成， false 不等待（一个延迟对象解决 新的对象即触发回调）
         * @param subordinate {object} 需要监听的延迟对象
         */
        succeedOne: function (waite /* subordinate, ..., subordinateN */ ) {
            var def = $.Deferred(), // 新的延迟对象
                arg = $.makeArray(arguments),
                // 对可选参数waite的处理
                subordinate = (typeof waite === 'boolean') ? arg.slice(1) : arg,
                waite = (typeof waite === 'boolean') ? waite : false,
                len = subordinate.length,
                successValues = [],
                failedValues = [],
                succed = function (i, defVal) {
                    successValues[i] = defVal;
                    if (!--len || !waite) {
                        def.resolve.apply(def, successValues);
                    }
                },
                failed = function (i, defVal) {
                    failedValues[i] = defVal;
                    if (!--len) {
                        // 有一个成功就是成功
                        if (successValues.length) {
                            def.resolve.apply(def, successValues);
                        } else {
                            def.reject.apply(def, failedValues);
                        }
                    }
                };
            $.each(subordinate, function (i, item) {
                (function (i, def) {
                    if ($.isDeferred(def)) {
                        def.done(function (val) {
                            succed(i, val);
                        }).fail(function (val) {
                            failed(i, val);
                        });
                    } else {
                        succed(i, def);
                    }
                })(i, item);
            });
            return def.promise();
        },
        /**
         * 所有延迟对象全部解决后回调
         * @returns {*}
         */
        end: function ( /*deferred , ..., deferredN */ ) {
            var def = $.Deferred(),
                len = arguments.length,
                processValues = [],
                // 处理每个延迟对象的回调 记录次数和保存数据
                processFun = function (i, val) {
                    processValues[i] = val;
                    if (!--len) {
                        // 完成所有请求后 触发回调
                        def.resolve.apply(def, processValues);
                    }
                }
            $.each(arguments, function (i, item) {
                (function (i, def) {
                    if($.isDeferred(def)){
                        def.always(function (val) {
                            processFun(i, val);
                        });
                    }else{
                        processFun(i,def);
                    }
                })(i, item);
            });
            if(arguments.length === 0){
                def.resolve();
            }
            return def;
        },
        deferredAnd: function ( /*deferred , ..., deferredN */ ) {
            return $.when.apply(null, $.makeArray(arguments)).then(function () {
                return $.inArray(false, arguments) === -1;
            });
        },
        deferredOr: function ( /*deferred , ..., deferredN */ ) {
            return $.when.apply(null, $.makeArray(arguments)).then(function () {
                return $.inArray(true, arguments) === -1;
            });
        }
    });

    $.extend($.fn, {

        /**
         *
         * @param disabled {boolean} 是否禁用元素
         * @returns {*}
         */
        disabled: function (disabled) {
            return $.access(this, $.prop, 'disabled', disabled, arguments.length > 0);
        },
        /**
         *
         * @param checked 是否勾选
         * @returns {*}
         */
        checked: function (checked) {
            return $.access(this, $.prop, 'checked', checked, arguments.length > 0);
        }
    });

})(jQuery);

//template
(function ($) {
    $.template = function (text, data, settings) {
        // By default, Underscore uses ERB-style template delimiters, change the
        // following template settings to use alternative delimiters.
        var templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };

        // When customizing `templateSettings`, if you don't want to define an
        // interpolation, evaluation or escaping regex, we need one that is
        // guaranteed not to match.
        var noMatch = /(.)^/;

        // Certain characters need to be escaped so that they can be put into a
        // string literal.
        var escapes = {
            "'": "'",
            '\\': '\\',
            '\r': 'r',
            '\n': 'n',
            '\t': 't',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        };

        var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;


        // JavaScript micro-templating, similar to John Resig's implementation.
        // Underscore templating handles arbitrary delimiters, preserves whitespace,
        // and correctly escapes quotes within interpolated code.
        var render;
        settings = $.extend({}, templateSettings, settings);

        // Combine delimiters into one regular expression via alternation.
        var matcher = new RegExp([
            (settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');

        // Compile the template source, escaping string literals appropriately.
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset)
                .replace(escaper, function (match) {
                    return '\\' + escapes[match];
                });

            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            }
            if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            }
            if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }
            index = offset + match.length;
            return match;
        });
        source += "';\n";

        // If a variable is not specified, place data values in local scope.
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

        source = "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + "return __p;\n";

        try {
            render = new Function(settings.variable || 'obj', '$', source);
        } catch (e) {
            e.source = source;
            throw e;
        }

        if (data) return render(data, $);
        var template = function (data) {
            return render.call(this, data, $);
        };

        // Provide the compiled function source as a convenience for precompilation.
        template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

        return template;
    }
})(jQuery);

(function ($) {
    /**
     * [description]组件的翻译
     * @param  {[type]} $ [description]
     * @return {[type]}   [description]
     */
    var currentLang = 'SimpChinese';
    var lang = {
        'SimpChinese': {
            "Yes": "确定",
            "No": "取消",
            "Sun": "日",
            "Mon": "一",
            "Tue": "二",
            "Wen": "三",
            "Thu": "四",
            "Fri": "五",
            "Sat": "六",
            "Jan": "一月",
            "Feb": "二月",
            "Mar": "三月",
            "Apr": "四月",
            "May": "五月",
            "Jun": "六月",
            "Jul": "七月",
            "Aug": "八月",
            "Sep": "九月",
            "Oct": "十月",
            "Nov": "十一月",
            "Dec": "十二月",
            "Hour": "时",
            "Min": "分",
            "Sec": "秒",
            "Current": "当前时间"
        },
        'English': {
            "Yes": "OK",
            "No": "Cancel",
            "Sun": "Sun",
            "Mon": "Mon",
            "Tue": "Tue",
            "Wen": "Wen",
            "Thu": "Thu",
            "Fri": "Fri",
            "Sat": "Sat",
            "Jan": "Jan",
            "Feb": "Feb",
            "Mar": "Mar",
            "Apr": "Apr",
            "May": "May",
            "Jun": "Jun",
            "Jul": "Jul",
            "Aug": "Aug",
            "Sep": "Sep",
            "Oct": "Oct",
            "Nov": "Nov",
            "Dec": "Dec",
            "Hour": "H",
            "Min": "M",
            "Sec": "S",
            "Current": "Now"
        },
        'Spanish': {
            "Yes": "Aceptar",
            "No": "Cancelar",
            "Sun": "Dom",
            "Mon": "Lun",
            "Tue": "Mar",
            "Wen": "Mié",
            "Thu": "Jue",
            "Fri": "Vie",
            "Sat": "Sab",
            "Jan": "Ene",
            "Feb": "Feb",
            "Mar": "Mar",
            "Apr": "Abr",
            "May": "May",
            "Jun": "Jun",
            "Jul": "Jul",
            "Aug": "Ago",
            "Sep": "Sep",
            "Oct": "Oct",
            "Nov": "Nov",
            "Dec": "Dic",
            "Hour": "H",
            "Min": "M",
            "Sec": "S",
            "Current": "Now"
        }
    };
    /**
     *  翻译HMTL节点元素, 翻译文件的key不得出现以下字符 ::(双冒号) +(加号)
     *  如:
     *     <label wgt="username"></label>    => <label>用户名</label>
     *     <span wgt="keyword+1"></span> => <span>关键字1</span>
     *     <span wgt="1+keyword"></span> => <span>1关键字</span>
     *     <a wgt="login;title::clkLogin"></a> => <a title="点击登录">登录</a>
     *
     * 使用方法：
     *     $('#id').trans_wgt('SimpChinese');可不传参，使用默认语言。
     *     在获取语言文件后以及切换语言时，由上层调用$(document.body).trans_wgt(langName)
     */
    $.fn.trans_wgt = function (name, customLang) {

        if (name && lang[name]) currentLang = name; //如果翻译存在就切换当前翻译
        if (customLang) $.extend(true, lang[currentLang], customLang);

        return this.each(function () {
            translateDom($(this));
        });

        function translateDom(element) {
            element.find('[wgt]').each(function () {
                var $me = $(this),
                    l = $me.attr('wgt');
                if (l) {
                    $.each(l.split(';'), function (index, attr) {
                        var arr = attr.split('::'),
                            text = '';
                        if (arr.length === 1) {
                            $.each(arr[0].split('+'), function (index, val) {
                                text += lang[currentLang][val];
                            });
                            $me.text(text);
                        } else {
                            $.each(arr[1].split('+'), function (index, val) {
                                text += lang[currentLang][val];
                            });
                            $me.attr(arr[0], text);
                        }
                    });
                }
            });
        }
    };
})(jQuery);