﻿/*
 @vganchou
*/
if (!window.af || "function" !== typeof af) {
    var af = function (g) {
        function B(a, c, b) {
            var d = h.createDocumentFragment();
            if (b) {
                for (b = a.length - 1; 0 <= b; b--) d.insertBefore(a[b], d.firstChild);
                c.insertBefore(d, c.firstChild)
            } else {
                for (b = 0; b < a.length; b++) d.appendChild(a[b]);
                c.appendChild(d)
            }
        }

        function y(a) {
            return a in z ? z[a] : z[a] = RegExp("(^|\\s)" + a + "(\\s|$)")
        }

        function u(a) {
            for (var c = 0; c < a.length; c++) a.indexOf(a[c]) != c && (a.splice(c, 1), c--);
            return a
        }

        function C(a, c) {
            var b = [];
            if (a == f) return b;
            for (; a; a = a.nextSibling) 1 == a.nodeType &&
                a !== c && b.push(a);
            return b
        }

        function D(a, c) {
            try {
                return c.querySelectorAll(a)
            } catch (b) {
                return []
            }
        }

        function s(a, c) {
            if (a)
                if (a.nodeType) c[c.length++] = a;
                else
                    for (var b = 0, d = a.length; b < d; b++) c[c.length++] = a[b]
        }

        function t() {}

        function E(a, c) {
            a.os = {};
            a.os.webkit = c.match(/WebKit\/([\d.]+)/) ? !0 : !1;
            a.os.android = c.match(/(Android)\s+([\d.]+)/) || c.match(/Silk-Accelerated/) ? !0 : !1;
            a.os.androidICS = a.os.android && c.match(/(Android)\s4/) ? !0 : !1;
            a.os.ipad = c.match(/(iPad).*OS\s([\d_]+)/) ? !0 : !1;
            a.os.iphone = !a.os.ipad && c.match(/(iPhone\sOS)\s([\d_]+)/) ?
                !0 : !1;
            a.os.ios7 = c.match(/(iPhone\sOS)\s([7_]+)/) ? !0 : !1;
            a.os.webos = c.match(/(webOS|hpwOS)[\s\/]([\d.]+)/) ? !0 : !1;
            a.os.touchpad = a.os.webos && c.match(/TouchPad/) ? !0 : !1;
            a.os.ios = a.os.ipad || a.os.iphone;
            a.os.playbook = c.match(/PlayBook/) ? !0 : !1;
            a.os.blackberry = a.os.playbook || c.match(/BlackBerry/) ? !0 : !1;
            a.os.blackberry10 = a.os.blackberry && c.match(/Safari\/536/) ? !0 : !1;
            a.os.chrome = c.match(/Chrome/) ? !0 : !1;
            a.os.opera = c.match(/Opera/) ? !0 : !1;
            a.os.fennec = c.match(/fennec/i) ? !0 : c.match(/Firefox/) ? !0 : !1;
            a.os.ie = c.match(/MSIE 10.0/i) ?
                !0 : !1;
            a.os.ieTouch = a.os.ie && c.toLowerCase().match(/touch/i) ? !0 : !1;
            a.os.supportsTouch = g.DocumentTouch && h instanceof g.DocumentTouch || "ontouchstart" in g;
            a.feat = {};
            var b = h.documentElement.getElementsByTagName("head")[0];
            a.feat.nativeTouchScroll = "undefined" !== typeof b.style["-webkit-overflow-scrolling"] && a.os.ios;
            a.feat.cssPrefix = a.os.webkit ? "Webkit" : a.os.fennec ? "Moz" : a.os.ie ? "ms" : a.os.opera ? "O" : "";
            a.feat.cssTransformStart = !a.os.opera ? "3d(" : "(";
            a.feat.cssTransformEnd = !a.os.opera ? ",0)" : ")";
            a.os.android &&
                !a.os.webkit && (a.os.android = !1)
        }

        function v(a) {
            return a._afmid || (a._afmid = O++)
        }

        function P(a, c, b, d) {
            c = F(c);
            if (c.ns) var e = RegExp("(?:^| )" + c.ns.replace(" ", " .* ?") + "(?: |$)");
            return (m[v(a)] || []).filter(function (a) {
                return a && (!c.e || a.e == c.e) && (!c.ns || e.test(a.ns)) && (!b || a.fn == b || "function" === typeof a.fn && "function" === typeof b && "" + a.fn === "" + b) && (!d || a.sel == d)
            })
        }

        function F(a) {
            a = ("" + a).split(".");
            return {
                e: a[0],
                ns: a.slice(1).sort().join(" ")
            }
        }

        function G(a, c, b) {
            e.isObject(a) ? e.each(a, b) : a.split(/\s/).forEach(function (a) {
                b(a,
                    c)
            })
        }

        function w(a, c, b, d, k) {
            var f = v(a),
                g = m[f] || (m[f] = []);
            G(c, b, function (b, c) {
                var f = k && k(c, b),
                    Q = f || c,
                    h = function (b) {
                        var c = Q.apply(a, [b].concat(b.data));
                        !1 === c && b.preventDefault();
                        return c
                    },
                    f = e.extend(F(b), {
                        fn: c,
                        proxy: h,
                        sel: d,
                        del: f,
                        i: g.length
                    });
                g.push(f);
                a.addEventListener(f.e, h, !1)
            })
        }

        function x(a, c, b, d) {
            var e = v(a);
            G(c || "", b, function (b, c) {
                P(a, b, c, d).forEach(function (b) {
                    delete m[e][b.i];
                    a.removeEventListener(b.e, b.proxy, !1)
                })
            })
        }

        function R(a) {
            var c = e.extend({
                originalEvent: a
            }, a);
            e.each(S, function (b, d) {
                c[b] =
                    function () {
                        this[d] = T;
                        if ("stopImmediatePropagation" == b || "stopPropagation" == b)
                            if (a.cancelBubble = !0, !a[b]) return;
                        return a[b].apply(a, arguments)
                    };
                c[d] = U
            });
            return c
        }

        function H(a, c) {
            if (c && a.dispatchEvent) {
                var b = e.Event("destroy", {
                    bubbles: !1
                });
                a.dispatchEvent(b)
            }
            if ((b = v(a)) && m[b]) {
                for (var d in m[b]) a.removeEventListener(m[b][d].e, m[b][d].proxy, !1);
                delete m[b]
            }
        }

        function I(a, c) {
            if (a) {
                var b = a.childNodes;
                if (b && 0 < b.length)
                    for (var d; d < b.length; d++) I(b[d], c);
                H(a, c)
            }
        }
        var f, h = g.document,
            p = [],
            J = p.slice,
            z = {},
            V = 1,
            W =
            /^\s*<(\w+)[^>]*>/,
            n = {},
            q = {},
            K = {
                columncount: !0,
                fontweight: !0,
                lineheight: !0,
                "column-count": !0,
                "font-weight": !0,
                "line-height": !0,
                opacity: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                "z-index": !0,
                zoom: !0
            },
            r = "object" === typeof MSApp,
            l = function (a, c) {
                this.length = 0;
                if (a) {
                    if (a instanceof l && c == f) return a;
                    if (af.isFunction(a)) return af(h).ready(a);
                    if (af.isArray(a) && a.length != f) {
                        for (var b = 0; b < a.length; b++) this[this.length++] = a[b];
                        return this
                    }
                    if (af.isObject(a) && af.isObject(c)) {
                        if (a.length == f) a.parentNode == c && (this[this.length++] =
                            a);
                        else
                            for (b = 0; b < a.length; b++) a[b].parentNode == c && (this[this.length++] = a[b]);
                        return this
                    }
                    if (af.isObject(a) && c == f) return this[this.length++] = a, this;
                    if (c !== f) {
                        if (c instanceof l) return c.find(a)
                    } else c = h
                } else return this;
                return this.selector(a, c)
            },
            e = function (a, c) {
                return new l(a, c)
            };
        e.is$ = function (a) {
            return a instanceof l
        };
        e.map = function (a, c) {
            var b, d = [],
                k;
            if (e.isArray(a))
                for (k = 0; k < a.length; k++) b = c(a[k], k), b !== f && d.push(b);
            else if (e.isObject(a))
                for (k in a) a.hasOwnProperty(k) && (b = c(a[k], k), b !== f && d.push(b));
            return af([d])
        };
        e.each = function (a, c) {
            var b;
            if (e.isArray(a))
                for (b = 0; b < a.length && !1 !== c(b, a[b]); b++);
            else if (e.isObject(a))
                for (b in a)
                    if (a.hasOwnProperty(b) && !1 === c(b, a[b])) break;
            return a
        };
        e.extend = function (a) {
            a == f && (a = this);
            if (1 === arguments.length) {
                for (var c in a) this[c] = a[c];
                return this
            }
            J.call(arguments, 1).forEach(function (b) {
                for (var c in b) a[c] = b[c]
            });
            return a
        };
        e.isArray = function (a) {
            return a instanceof Array && a.push != f
        };
        e.isFunction = function (a) {
            return "function" === typeof a && !(a instanceof RegExp)
        };
        e.isObject = function (a) {
            return "object" === typeof a
        };
        e.fn = l.prototype = {
            constructor: l,
            forEach: p.forEach,
            reduce: p.reduce,
            push: p.push,
            indexOf: p.indexOf,
            concat: p.concat,
            selector: function (a, c) {
                a = a.trim();
                if ("#" === a[0] && -1 == a.indexOf(".") && -1 === a.indexOf(" ") && -1 === a.indexOf(">")) c == h ? s(c.getElementById(a.replace("#", "")), this) : s(D(a, c), this);
                else if ("<" === a[0] && ">" === a[a.length - 1] || -1 !== a.indexOf("<") && -1 !== a.indexOf(">")) {
                    var b = h.createElement("div");
                    r ? MSApp.execUnsafeLocalFunction(function () {
                        b.innerHTML =
                            a.trim()
                    }) : b.innerHTML = a.trim();
                    s(b.childNodes, this)
                } else s(D(a, c), this);
                return this
            }, oldElement: void 0,
            slice: p.slice,
            length: 0,
            setupOld: function (a) {
                    if (a == f) return e();
                    a.oldElement = this;
                    return a
                }, map: function (a) {
                    var c, b = [],
                        d;
                    for (d = 0; d < this.length; d++) c = a(d, this[d]), c !== f && b.push(c);
                    return e([b])
                }, each: function (a) {
                    this.forEach(function (c, b) {
                        a.call(c, b, c)
                    });
                    return this
                }, ready: function (a) {
                    "complete" === h.readyState || "loaded" === h.readyState || !e.os.ie && "interactive" === h.readyState ? a() : h.addEventListener("DOMContentLoaded",
                        a, !1);
                    return this
                }, find: function (a) {
                    if (0 === this.length) return this;
                    for (var c = [], b, d = 0; d < this.length; d++) {
                        b = e(a, this[d]);
                        for (var k = 0; k < b.length; k++) c.push(b[k])
                    }
                    return e(u(c))
                }, html: function (a, c) {
                    if (0 === this.length) return this;
                    if (a === f) return this[0].innerHTML;
                    for (var b = 0; b < this.length; b++)
                        if (!1 !== c && e.cleanUpContent(this[b], !1, !0), r) {
                            var d = this[b];
                            MSApp.execUnsafeLocalFunction(function () {
                                d.innerHTML = a
                            })
                        } else this[b].innerHTML = a;
                    return this
                }, text: function (a) {
                    if (0 === this.length) return this;
                    if (a === f) return this[0].textContent;
                    for (var c = 0; c < this.length; c++) this[c].textContent = a;
                    return this
                }, css: function (a, c, b) {
                    b = b != f ? b : this[0];
                    if (0 === this.length) return this;
                    if (c == f && "string" === typeof a) return g.getComputedStyle(b), b.style[a] ? b.style[a] : g.getComputedStyle(b)[a];
                    for (b = 0; b < this.length; b++)
                        if (e.isObject(a))
                            for (var d in a) this[b].style[d] = "number" === typeof a[d] && !K[d.toLowerCase()] ? a[d] + "px" : a[d];
                        else this[b].style[a] = "number" === typeof c && !K[a.toLowerCase()] ? c + "px" : c;
                    return this
                }, vendorCss: function (a, c, b) {
                    return this.css(e.feat.cssPrefix +
                        a, c, b)
                }, cssTranslate: function (a) {
                    return this.vendorCss("Transform", "translate" + e.feat.cssTransformStart + a + e.feat.cssTransformEnd)
                }, computedStyle: function (a) {
                    if (!(0 === this.length || a == f)) return g.getComputedStyle(this[0], "")[a]
                }, empty: function () {
                    for (var a = 0; a < this.length; a++) e.cleanUpContent(this[a], !1, !0), this[a].textContent = "";
                    return this
                }, hide: function () {
                    if (0 === this.length) return this;
                    for (var a = 0; a < this.length; a++) "none" != this.css("display", null, this[a]) && (this[a].setAttribute("afmOldStyle", this.css("display",
                        null, this[a])), this[a].style.display = "none");
                    return this
                }, show: function () {
                    if (0 === this.length) return this;
                    for (var a = 0; a < this.length; a++) "none" == this.css("display", null, this[a]) && (this[a].style.display = this[a].getAttribute("afmOldStyle") ? this[a].getAttribute("afmOldStyle") : "block", this[a].removeAttribute("afmOldStyle"));
                    return this
                }, toggle: function (a) {
                    for (var c = !0 === a ? !0 : !1, b = 0; b < this.length; b++) "none" !== g.getComputedStyle(this[b]).display || a != f && !1 === c ? (this[b].setAttribute("afmOldStyle", this[b].style.display),
                        this[b].style.display = "none") : (this[b].style.display = this[b].getAttribute("afmOldStyle") != f ? this[b].getAttribute("afmOldStyle") : "block", this[b].removeAttribute("afmOldStyle"));
                    return this
                }, val: function (a) {
                    if (0 === this.length) return a === f ? void 0 : this;
                    if (a == f) return this[0].value;
                    for (var c = 0; c < this.length; c++) this[c].value = a;
                    return this
                }, attr: function (a, c) {
                    if (0 === this.length) return c === f ? void 0 : this;
                    if (c === f && !e.isObject(a)) return this[0].afmCacheId && n[this[0].afmCacheId][a] ? this[0].afmCacheId && n[this[0].afmCacheId][a] :
                        this[0].getAttribute(a);
                    for (var b = 0; b < this.length; b++)
                        if (e.isObject(a))
                            for (var d in a) e(this[b]).attr(d, a[d]);
                        else e.isArray(c) || e.isObject(c) || e.isFunction(c) ? (this[b].afmCacheId || (this[b].afmCacheId = e.uuid()), n[this[b].afmCacheId] || (n[this[b].afmCacheId] = {}), n[this[b].afmCacheId][a] = c) : null === c && c != f ? (this[b].removeAttribute(a), this[b].afmCacheId && n[this[b].afmCacheId][a] && delete n[this[b].afmCacheId][a]) : this[b].setAttribute(a, c);
                    return this
                }, removeAttr: function (a) {
                    for (var c = this, b = 0; b < this.length; b++) a.split(/\s+/g).forEach(function (d) {
                        c[b].removeAttribute(d);
                        c[b].afmCacheId && n[c[b].afmCacheId][a] && delete n[c[b].afmCacheId][a]
                    });
                    return this
                }, prop: function (a, c) {
                    if (0 === this.length) return c === f ? void 0 : this;
                    if (c === f && !e.isObject(a)) {
                        var b;
                        return this[0].afmCacheId && q[this[0].afmCacheId][a] ? this[0].afmCacheId && q[this[0].afmCacheId][a] : !(b = this[0][a]) && a in this[0] ? this[0][a] : b
                    }
                    for (b = 0; b < this.length; b++)
                        if (e.isObject(a))
                            for (var d in a) e(this[b]).prop(d, a[d]);
                        else e.isArray(c) || e.isObject(c) || e.isFunction(c) ? (this[b].afmCacheId || (this[b].afmCacheId = e.uuid()),
                            q[this[b].afmCacheId] || (q[this[b].afmCacheId] = {}), q[this[b].afmCacheId][a] = c) : null === c && void 0 !== c ? e(this[b]).removeProp(a) : this[b][a] = c;
                    return this
                }, removeProp: function (a) {
                    for (var c = this, b = 0; b < this.length; b++) a.split(/\s+/g).forEach(function (d) {
                        c[b][d] && (c[b][d] = void 0);
                        c[b].afmCacheId && q[c[b].afmCacheId][a] && delete q[c[b].afmCacheId][a]
                    });
                    return this
                }, remove: function (a) {
                    a = e(this).filter(a);
                    if (a == f) return this;
                    for (var c = 0; c < a.length; c++) e.cleanUpContent(a[c], !0, !0), a[c].parentNode.removeChild(a[c]);
                    return this
                }, addClass: function (a) {
                    if (a == f) return this;
                    for (var c = 0; c < this.length; c++) {
                        var b = this[c].className,
                            d = [],
                            e = this;
                        a.split(/\s+/g).forEach(function (a) {
                            e.hasClass(a, e[c]) || d.push(a)
                        });
                        this[c].className += (b ? " " : "") + d.join(" ");
                        this[c].className = this[c].className.trim()
                    }
                    return this
                }, removeClass: function (a) {
                    if (a == f) return this;
                    for (var c = 0; c < this.length; c++) {
                        if (a == f) {
                            this[c].className = "";
                            break
                        }
                        var b = this[c].className;
                        a.split(/\s+/g).forEach(function (a) {
                            b = b.replace(y(a), " ")
                        });
                        this[c].className = 0 <
                            b.length ? b.trim() : ""
                    }
                    return this
                }, replaceClass: function (a, c) {
                    if (a == f || c == f) return this;
                    for (var b = 0; b < this.length; b++)
                        if (a == f) this[b].className = c;
                        else {
                            var d = this[b].className;
                            a.split(/\s+/g).concat(c.split(/\s+/g)).forEach(function (a) {
                                d = d.replace(y(a), " ")
                            });
                            d = d.trim();
                            this[b].className = 0 < d.length ? (d + " " + c).trim() : c
                        }
                    return this
                }, hasClass: function (a, c) {
                    if (0 === this.length) return !1;
                    c || (c = this[0]);
                    return y(a).test(c.className)
                }, append: function (a, c) {
                    if (a && a.length != f && 0 === a.length) return this;
                    if (e.isArray(a) ||
                        e.isObject(a)) a = e(a);
                    var b;
                    for (b = 0; b < this.length; b++)
                        if (a.length && "string" != typeof a) a = e(a), B(a, this[b], c);
                        else {
                            var d = W.test(a) ? e(a) : void 0;
                            if (d == f || 0 === d.length) d = h.createTextNode(a);
                            d.nodeName != f && "script" == d.nodeName.toLowerCase() && (!d.type || "text/javascript" === d.type.toLowerCase()) ? g.eval(d.innerHTML) : d instanceof l ? B(d, this[b], c) : c != f ? this[b].insertBefore(d, this[b].firstChild) : this[b].appendChild(d)
                        }
                    return this
                }, appendTo: function (a, c) {
                    e(a).append(this);
                    return this
                }, prependTo: function (a) {
                    e(a).append(this, !0);
                    return this
                }, prepend: function (a) {
                    return this.append(a, 1)
                }, insertBefore: function (a, c) {
                    if (0 === this.length) return this;
                    a = e(a).get(0);
                    if (!a) return this;
                    for (var b = 0; b < this.length; b++) c ? a.parentNode.insertBefore(this[b], a.nextSibling) : a.parentNode.insertBefore(this[b], a);
                    return this
                }, insertAfter: function (a) {
                    this.insertBefore(a, !0)
                }, get: function (a) {
                    a = a == f ? 0 : a;
                    0 > a && (a += this.length);
                    return this[a] ? this[a] : void 0
                }, offset: function () {
                    var a;
                    if (0 === this.length) return this;
                    if (this[0] == g) return {
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: g.innerWidth,
                        height: g.innerHeight
                    };
                    a = this[0].getBoundingClientRect();
                    return {
                        left: a.left + g.pageXOffset,
                        top: a.top + g.pageYOffset,
                        right: a.right + g.pageXOffset,
                        bottom: a.bottom + g.pageYOffset,
                        width: a.right - a.left,
                        height: a.bottom - a.top
                    }
                }, height: function (a) {
                    return 0 === this.length ? this : a != f ? this.css("height", a) : this[0] == this[0].window ? g.innerHeight : this[0].nodeType == this[0].DOCUMENT_NODE ? this[0].documentElement.offsetheight : (a = this.css("height").replace("px", "")) ? a : this.offset().height
                },
                width: function (a) {
                    return 0 === this.length ? this : a != f ? this.css("width", a) : this[0] == this[0].window ? g.innerWidth : this[0].nodeType == this[0].DOCUMENT_NODE ? this[0].documentElement.offsetwidth : (a = this.css("width").replace("px", "")) ? a : this.offset().width
                }, parent: function (a, c) {
                    if (0 === this.length) return this;
                    for (var b = [], d = 0; d < this.length; d++)
                        for (var k = this[d]; k.parentNode && k.parentNode != h && !(b.push(k.parentNode), k.parentNode && (k = k.parentNode), !c););
                    return this.setupOld(e(u(b)).filter(a))
                }, parents: function (a) {
                    return this.parent(a, !0)
                }, children: function (a) {
                    if (0 === this.length) return this;
                    for (var c = [], b = 0; b < this.length; b++) c = c.concat(C(this[b].firstChild));
                    return this.setupOld(e(c).filter(a))
                }, siblings: function (a) {
                    if (0 === this.length) return this;
                    for (var c = [], b = 0; b < this.length; b++) this[b].parentNode && (c = c.concat(C(this[b].parentNode.firstChild, this[b])));
                    return this.setupOld(e(c).filter(a))
                }, closest: function (a, c) {
                    if (0 === this.length) return this;
                    var b = this[0],
                        d = e(a, c);
                    if (0 === d.length) return e();
                    for (; b && -1 == d.indexOf(b);) b = b !== c &&
                        b !== h && b.parentNode;
                    return e(b)
                }, filter: function (a) {
                    if (0 === this.length || a == f) return this;
                    for (var c = [], b = 0; b < this.length; b++) {
                        var d = this[b];
                        d.parentNode && 0 <= e(a, d.parentNode).indexOf(d) && c.push(d)
                    }
                    return this.setupOld(e(u(c)))
                }, not: function (a) {
                    if (0 === this.length) return this;
                    for (var c = [], b = 0; b < this.length; b++) {
                        var d = this[b];
                        d.parentNode && -1 == e(a, d.parentNode).indexOf(d) && c.push(d)
                    }
                    return this.setupOld(e(u(c)))
                }, data: function (a, c) {
                    return this.attr("data-" + a, c)
                }, end: function () {
                    return this.oldElement !=
                        f ? this.oldElement : e()
                }, clone: function (a) {
                    a = !1 === a ? !1 : !0;
                    if (0 === this.length) return this;
                    for (var c = [], b = 0; b < this.length; b++) c.push(this[b].cloneNode(a));
                    return e(c)
                }, size: function () {
                    return this.length
                }, serialize: function () {
                    if (0 === this.length) return "";
                    for (var a = [], c = 0; c < this.length; c++) this.slice.call(this[c].elements).forEach(function (b) {
                        var c = b.getAttribute("type");
                        if ("fieldset" != b.nodeName.toLowerCase() && (!b.disabled && "submit" != c && "reset" != c && "button" != c && ("radio" != c && "checkbox" != c || b.checked)) &&
                            b.getAttribute("name"))
                            if ("select-multiple" == b.type)
                                for (c = 0; c < b.options.length; c++) b.options[c].selected && a.push(b.getAttribute("name") + "=" + encodeURIComponent(b.options[c].value));
                            else a.push(b.getAttribute("name") + "=" + encodeURIComponent(b.value))
                    });
                    return a.join("&")
                }, eq: function (a) {
                    return e(this.get(a))
                }, index: function (a) {
                    return a ? this.indexOf(e(a)[0]) : this.parent().children().indexOf(this[0])
                }, is: function (a) {
                    return !!a && 0 < this.filter(a).length
                }
        };
        e.ajaxSettings = {
            type: "GET",
            beforeSend: t,
            success: t,
            error: t,
            complete: t,
            context: void 0,
            timeout: 0,
            crossDomain: null
        };
        e.jsonP = function (a) {
            if (r) return a.type = "get", a.dataType = null, e.get(a);
            var c = "jsonp_callback" + ++V,
                b = "",
                d = h.createElement("script");
            g[c] = function (k) {
                clearTimeout(b);
                e(d).remove();
                delete g[c];
                a.success.call(void 0, k)
            };
            d.src = a.url.replace(/=\?/, "=" + c);
            a.error && (d.onerror = function () {
                clearTimeout(b);
                a.error.call(void 0, "", "error")
            });
            e("head").append(d);
            0 < a.timeout && (b = setTimeout(function () {
                a.error.call(void 0, "", "timeout")
            }, a.timeout));
            return {}
        };
        e.ajax = function (a) {
            var c;
            try {
                var b = a || {},
                    d;
                for (d in e.ajaxSettings) "undefined" == typeof b[d] && (b[d] = e.ajaxSettings[d]);
                b.url || (b.url = g.location);
                b.contentType || (b.contentType = "application/x-www-form-urlencoded");
                b.headers || (b.headers = {});
                if (!("async" in b) || !1 !== b.async) b.async = !0;
                if (b.dataType) switch (b.dataType) {
                case "script":
                    b.dataType = "text/javascript, application/javascript";
                    break;
                case "json":
                    b.dataType = "application/json";
                    break;
                case "xml":
                    b.dataType = "application/xml, text/xml";
                    break;
                case "html":
                    b.dataType =
                        "text/html";
                    break;
                case "text":
                    b.dataType = "text/plain";
                    break;
                default:
                    b.dataType = "text/html";
                    break;
                case "jsonp":
                    return e.jsonP(a)
                } else b.dataType = "text/html";
                e.isObject(b.data) && (b.data = e.param(b.data));
                "get" === b.type.toLowerCase() && b.data && (-1 === b.url.indexOf("?") ? b.url += "?" + b.data : b.url += "&" + b.data);
                if (/=\?/.test(b.url)) return e.jsonP(b);
                null === b.crossDomain && (b.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(b.url) && RegExp.$2 != g.location.host);
                b.crossDomain || (b.headers = e.extend({
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    b.headers));
                var k, f = b.context,
                    h = /^([\w-]+:)\/\//.test(b.url) ? RegExp.$1 : g.location.protocol;
                c = new g.XMLHttpRequest;
                c.onreadystatechange = function () {
                    var a = b.dataType;
                    if (4 === c.readyState) {
                        clearTimeout(k);
                        var d, g = !1;
                        if (200 <= c.status && 300 > c.status || 0 === c.status && "file:" == h) {
                            if ("application/json" === a && !/^\s*$/.test(c.responseText)) try {
                                d = JSON.parse(c.responseText)
                            } catch (l) {
                                g = l
                            } else "application/xml, text/xml" === a ? d = c.responseXML : "text/html" == a ? (d = c.responseText, e.parseJS(d)) : d = c.responseText;
                            0 === c.status &&
                                0 === d.length && (g = !0);
                            g ? b.error.call(f, c, "parsererror", g) : b.success.call(f, d, "success", c)
                        } else g = !0, b.error.call(f, c, "error");
                        b.complete.call(f, c, g ? "error" : "success")
                    }
                };
                c.open(b.type, b.url, b.async);
                b.withCredentials && (c.withCredentials = !0);
                b.contentType && (b.headers["Content-Type"] = b.contentType);
                for (var l in b.headers) "string" === typeof b.headers[l] && c.setRequestHeader(l, b.headers[l]);
                if (!1 === b.beforeSend.call(f, c, b)) return c.abort(), !1;
                0 < b.timeout && (k = setTimeout(function () {
                    c.onreadystatechange = t;
                    c.abort();
                    b.error.call(f, c, "timeout")
                }, b.timeout));
                c.send(b.data)
            } catch (m) {
                console.log(m), b.error.call(f, c, "error", m)
            }
            return c
        };
        e.get = function (a, c) {
            return this.ajax({
                url: a,
                success: c
            })
        };
        e.post = function (a, c, b, d) {
            "function" === typeof c && (b = c, c = {});
            d === f && (d = "html");
            return this.ajax({
                url: a,
                type: "POST",
                data: c,
                dataType: d,
                success: b
            })
        };
        e.getJSON = function (a, c, b) {
            "function" === typeof c && (b = c, c = {});
            return this.ajax({
                url: a,
                data: c,
                success: b,
                dataType: "json"
            })
        };
        e.param = function (a, c) {
            var b = [];
            if (a instanceof l) a.each(function () {
                b.push((c ?
                    c + "[" + this.id + "]" : this.id) + "=" + encodeURIComponent(this.value))
            });
            else
                for (var d in a)
                    if (!e.isFunction(a[d])) {
                        var f = c ? c + "[" + d + "]" : d,
                            g = a[d];
                        b.push(e.isObject(g) ? e.param(g, f) : f + "=" + encodeURIComponent(g))
                    } return b.join("&")
        };
        e.parseJSON = function (a) {
            return JSON.parse(a)
        };
        e.parseXML = function (a) {
            if (r) MSApp.execUnsafeLocalFunction(function () {
                return (new DOMParser).parseFromString(a, "text/xml")
            });
            else return (new DOMParser).parseFromString(a, "text/xml")
        };
        E(e, navigator.userAgent);
        e.__detectUA = E;
        e.uuid = function () {
            var a =
                function () {
                    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
                };
            return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
        };
        e.getCssMatrix = function (a) {
            e.is$(a) && (a = a.get(0));
            if (a == f) return g.WebKitCSSMatrix || g.MSCSSMatrix || {
                a: 0,
                b: 0,
                c: 0,
                d: 0,
                e: 0,
                f: 0
            };
            try {
                if (g.WebKitCSSMatrix) return new WebKitCSSMatrix(g.getComputedStyle(a).webkitTransform);
                if (g.MSCSSMatrix) return new MSCSSMatrix(g.getComputedStyle(a).transform);
                var c = g.getComputedStyle(a)[e.feat.cssPrefix + "Transform"].replace(/[^0-9\-.,]/g, "").split(",");
                return {
                    a: +c[0],
                    b: +c[1],
                    c: +c[2],
                    d: +c[3],
                    e: +c[4],
                    f: +c[5]
                }
            } catch (b) {
                return {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                    e: 0,
                    f: 0
                }
            }
        };
        e.create = function (a, c) {
            var b, d = new l;
            if (c || "<" !== a[0]) {
                c.html && (c.innerHTML = c.html, delete c.html);
                b = h.createElement(a);
                for (var e in c) b[e] = c[e];
                d[d.length++] = b
            } else b = h.createElement("div"), r ? MSApp.execUnsafeLocalFunction(function () {
                b.innerHTML = selector.trim()
            }) : b.innerHTML = a, s(b.childNodes, d);
            return d
        };
        e.query = function (a, c) {
            if (!a) return new l;
            c = c || h;
            return (new l).selector(a, c)
        };
        var m = {},
            O = 1;
        e.event = {
            add: w,
            remove: x
        };
        e.fn.bind = function (a, c) {
            for (var b = 0; b < this.length; b++) w(this[b], a, c);
            return this
        };
        e.fn.unbind = function (a, c) {
            for (var b = 0; b < this.length; b++) x(this[b], a, c);
            return this
        };
        e.fn.one = function (a, c) {
            return this.each(function (b, d) {
                w(this, a, c, null, function (a, b) {
                    return function () {
                        var c = a.apply(d, arguments);
                        x(d, b, a);
                        return c
                    }
                })
            })
        };
        var T = function () {
                return !0
            },
            U = function () {
                return !1
            },
            S = {
                preventDefault: "isDefaultPrevented",
                stopImmediatePropagation: "isImmediatePropagationStopped",
                stopPropagation: "isPropagationStopped"
            };
        e.fn.delegate = function (a, c, b) {
            for (var d = 0; d < this.length; d++) {
                var f = this[d];
                w(f, c, b, a, function (b) {
                    return function (c) {
                        var d, g = e(c.target).closest(a, f).get(0);
                        if (g) return d = e.extend(R(c), {
                            currentTarget: g,
                            liveFired: f
                        }), b.apply(g, [d].concat([].slice.call(arguments, 1)))
                    }
                })
            }
            return this
        };
        e.fn.undelegate = function (a, c, b) {
            for (var d = 0; d < this.length; d++) x(this[d], c, b, a);
            return this
        };
        e.fn.on = function (a, c, b) {
            return c === f || e.isFunction(c) ? this.bind(a, c) : this.delegate(c, a, b)
        };
        e.fn.off = function (a, c, b) {
            return c === f ||
                e.isFunction(c) ? this.unbind(a, c) : this.undelegate(c, a, b)
        };
        e.fn.trigger = function (a, c, b) {
            "string" == typeof a && (a = e.Event(a, b));
            a.data = c;
            for (c = 0; c < this.length; c++) this[c].dispatchEvent(a);
            return this
        };
        e.Event = function (a, c) {
            var b = h.createEvent("Events"),
                d = !0;
            if (c)
                for (var e in c) "bubbles" == e ? d = !!c[e] : b[e] = c[e];
            b.initEvent(a, d, !0, null, null, null, null, null, null, null, null, null, null, null, null);
            return b
        };
        e.bind = function (a, c, b) {
            if (a) {
                a.__events || (a.__events = {});
                e.isArray(c) || (c = [c]);
                for (var d = 0; d < c.length; d++) a.__events[c[d]] ||
                    (a.__events[c[d]] = []), a.__events[c[d]].push(b)
            }
        };
        e.trigger = function (a, c, b) {
            if (a) {
                var d = !0;
                if (!a.__events) return d;
                e.isArray(c) || (c = [c]);
                e.isArray(b) || (b = []);
                for (var f = 0; f < c.length; f++)
                    if (a.__events[c[f]])
                        for (var g = a.__events[c[f]], h = 0; h < g.length; h++) e.isFunction(g[h]) && !1 === g[h].apply(a, b) && (d = !1);
                return d
            }
        };
        e.unbind = function (a, c, b) {
            if (a.__events) {
                e.isArray(c) || (c = [c]);
                for (var d = 0; d < c.length; d++)
                    if (a.__events[c[d]])
                        for (var g = a.__events[c[d]], h = 0; h < g.length; h++)
                            if (b == f && delete g[h], g[h] == b) {
                                g.splice(h,
                                    1);
                                break
                            }
            }
        };
        e.proxy = function (a, c, b) {
            return function () {
                return b ? a.apply(c, b) : a.apply(c, arguments)
            }
        };
        var X = function (a, c) {
            for (var b = 0; b < a.length; b++) I(a[b], c)
        };
        e.cleanUpContent = function (a, c, b) {
            if (a) {
                var d = a.childNodes;
                d && 0 < d.length && e.asap(X, {}, [J.apply(d, [0]), b]);
                c && H(a, b)
            }
        };
        var A = [],
            L = [],
            M = [];
        e.asap = function (a, c, b) {
            if (!e.isFunction(a)) throw "$.asap - argument is not a valid function";
            A.push(a);
            L.push(c ? c : {});
            M.push(b ? b : []);
            g.postMessage("afm-asap", "*")
        };
        g.addEventListener("message", function (a) {
            a.source ==
                g && "afm-asap" == a.data && (a.stopPropagation(), 0 < A.length && A.shift().apply(L.shift(), M.shift()))
        }, !0);
        var N = {};
        e.parseJS = function (a) {
            if (a) {
                if ("string" == typeof a) {
                    var c = h.createElement("div");
                    r ? MSApp.execUnsafeLocalFunction(function () {
                        c.innerHTML = a
                    }) : c.innerHTML = a;
                    a = c
                }
                var b = a.getElementsByTagName("script");
                a = null;
                for (var d = 0; d < b.length; d++)
                    if (0 < b[d].src.length && !N[b[d].src] && !r) {
                        var e = h.createElement("script");
                        e.type = b[d].type;
                        e.src = b[d].src;
                        h.getElementsByTagName("head")[0].appendChild(e);
                        N[b[d].src] =
                            1;
                        e = null
                    } else g.eval(b[d].innerHTML)
            }
        };
        "click keydown keyup keypress submit load resize change select error".split(" ").forEach(function (a) {
            e.fn[a] = function (c) {
                return c ? this.bind(a, c) : this.trigger(a)
            }
        });
        ["focus", "blur"].forEach(function (a) {
            e.fn[a] = function (c) {
                if (0 !== this.length) {
                    if (c) this.bind(a, c);
                    else
                        for (c = 0; c < this.length; c++) try {
                            this[c][a]()
                        } catch (b) {}
                    return this
                }
            }
        });
        return e
    }(window);
    window.jq = af;
    "$" in window || (window.$ = af);
    "function" === typeof define && define.amd ? define("appframework", [], function () {
            return af
        }) :
        "undefined" !== typeof module && module.exports && (module.exports.af = af, module.exports.$ = af);
    window.numOnly || (window.numOnly = function (g) {
        if (void 0 === g || "" === g) return 0;
        if (isNaN(parseFloat(g)))
            if (g.replace) g = g.replace(/[^0-9.-]/g, "");
            else return 0;
        return parseFloat(g)
    })
};

function se(obj) {
    var wo = obj.keyword.value;
    if (wo == null || wo == "") {
        alert("请输入关键字");
        return false;
    }
};

function getAttr(id) {
    var fipt = $("#" + id).find("input");
    var ilen = fipt.length;
    var spec_arr = new Array();
    var jo = 0;
    for (i = 0; i < ilen; i++) {
        var fppt = fipt.eq(i);
        if (fppt.prop("checked")) {
            spec_arr[jo] = fppt.val();
            jo++
        }
    }
    return spec_arr
}
var Validator = {
    isMobile: function (s) {
        return this.test(s, /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/)
    }, isEmail: function (a) {
        var b = "^[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+@[-!#$%&'*+\\/0-9=?A-Z^_`a-z{|}~]+.[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+$";
        return this.test(a, b);
    }, isNumber: function (s, d) {
        return !isNaN(s.nodeType == 1 ? s.value : s) && (!d || !this.test(s, "^-?[0-9]*\\.[0-9]*$"))
    }, isEmpty: function (s) {
        return !jQuery.isEmptyObject(s)
    }, test: function (s, p) {
        s = s.nodeType == 1 ? s.value : s;
        return new RegExp(p).test(s)
    }
};
var ref = document.referrer;
var seo = ["baidu.com", "sogou.com", "so.com", "sm.cn"];
for (s = 0; s < 4; s++) {
    if (ref.indexOf(seo[s]) != -1) {
        ref = false;
        break;
    }
}

function pageJump() {
    location.href = $("#pageIndex").val()
}

function goback() {
    if (ref) {
        history.go(-1);
    } else {
        window.location.href = "http://m.miaocw.com/";
    }
}

function gotop() {
	$('html,body').stop().animate({scrollTop:'0px'},300);
}

function hostUrl() {
	return location.protocol+'//'+location.host;
}

function lazyload(option) {
    var iom = 0;
    var settings = {
        defObj: null,
        defHeight: 0
    };
    settings = $.extend(settings, option || {});
    var defHeight = settings.defHeight,
        defObj = (typeof settings.defObj == "object") ? settings.defObj.find("img") : $(settings.defObj).find("img");
    var pageTop = function () {
        return document.documentElement.clientHeight + Math.max(document.documentElement.scrollTop, document.body.scrollTop) - settings.defHeight;
    };
    var removeL = function () {
        $(window).unbind("scroll", imgLoad);
    }
    var mL = defObj.length;
    var imgLoad = function () {
        defObj.each(function () {
            var tmtop = $(this).offset().top;
            if (tmtop <= pageTop()) {
                var src2 = $(this).attr("src2");
                if (src2) {
                    $(this).attr("src", src2).removeAttr("src2");
                    iom++;
                    if (iom >= mL) {
                        removeL();
                    }
                }
            }
        });
    };
    imgLoad();
    $(window).bind("scroll", imgLoad);
}
if (!navigator.cookieEnabled) {
    $("body").prepend("<p style='background-color:#ffa627' class='alC lh30 c3'>您的浏览器禁用了cookie，会导致购物车、登录等操作异常,请启用cookie或更换浏览器</p>");
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return '';
}

function getSfexpress(goods_sn, sku_sn, province, city, num) {
    
	var goods_sn = goods_sn ? goods_sn : '';
    var sku_sn = sku_sn ? sku_sn : '';
    var province = province ? province : '';
    var city = city ? city : '';
    var num = num ? num : 1;

    $.ajax({
        url: "/!asyncexpress/sfexpress/",
        data: {
            'g': goods_sn,
            's': sku_sn,
            'v': province,
            'y': city,
            'n': num
        },
        dataType: "json",
        success: function (data) {
            if (data.t != '') {
                $('#yuji').html('由 <span class="red">' + data.warehouse_province_name.replace('市', '仓').replace('省', '仓') + '</span> 发货，预计' + data.t + '送达');
                $('.yuji').html('由 <span class="red">' + data.warehouse_province_name.replace('市', '仓').replace('省', '仓') + '</span> 发货，预计' + data.t + '送达');
            } else {
                $('#yuji').html('由 <span class="red">' + data.warehouse_province_name.replace('市', '仓').replace('省', '仓') + '</span> 发货，预计' + default_time + '送达');
                $('.yuji').html('由 <span class="red">' + data.warehouse_province_name.replace('市', '仓').replace('省', '仓') + '</span> 发货，预计' + default_time + '送达');
            }
        }
    })
}