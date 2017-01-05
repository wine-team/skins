var SlideVganChou = function () {
    var b = function () {
        return new a();
    };

    function a() {
        this.fContainer = document.getElementById("fixed-nav");
        this.container = document.getElementById("nav-wrap");
        this.arrLi = this.container.children;
    }
    a.prototype = {
        init: function (c) {
            var c = c || {};
            this.defaults = {
                startIndex: 0,
                autoScroll: false,
                callback: null,
                swipendfn: null,
                defualtFontSize: 16,
                showLen: 4.5
            };
            a.extend(this.defaults, c);
            this.clientW = document.documentElement.clientWidth || document.body.clientWidth;
            this.setLiWidth();
            this.makeItemsMove();
            this.swipMove(this.defaults.startIndex, false);
        }, addClick: function (d, c) {
            var e = this;
            d.addEventListener("click", function (f) {
                return function () {
                    e.swipMove(f, false);
                };
            }(c));
        }, registerEvent: function () {
            var e = this;
            var d = e.arrLi;
            for (var c = 0; c < d.length - 1; c++) {
                e.addClick(d[c], c);
            }
        }, setMoveDistance: function (c, f) {
            var e = this.container.getBoundingClientRect().width || this.container.offsetWidth;
            var g = this.clientW;
            var d = Math.ceil(e - g);
            if (c > 0) {
                c = 0;
            }
            if (c <= d * -1) {
                c = d * -1;
            }
            this.container.style.WebkitTransform = "translateX(" + c + "px)";
            this.container.style.transform = "translateX(" + c + "px)";
            this.container.style.transition = f + " all ease-out";
            this.container.style.WebkitTransition = f + " all ease-out";
        }, makeItemsMove: function () {
            var e = this;
            var c = this.container.getBoundingClientRect().width || this.container.offsetWidth;
            var d = document.documentElement.clientWidth || document.body.clientWidth;
            if (c <= d) {
                return;
            }
            this.container.addEventListener("touchstart", function (o) {
                var j = +new Date(),
                    m;
                var r = e.container.style.MozTransform || e.container.style.MsTransform || e.container.style.WebkitTransform || e.container.style.transform;
                var n = /\d+(\.)?(\d+)?/;
                var s = r.match(n)[0];
                var i = s ? -1 * parseInt(s) : 0,
                    k, q, g, f, l = i;
                k = g = o.changedTouches[0].clientX;
                e.container.addEventListener("touchmove", p, false);
                e.container.addEventListener("touchend", h, false);

                function p(t) {
                    t.preventDefault();
                    f = t.changedTouches[0].clientX;
                    l += f - g;
                    g = f;
                    e.setMoveDistance(l, "0s");
                }

                function h(v) {
                    m = +new Date();
                    q = v.changedTouches[0].clientX;
                    var u = q - k;
                    var t = m - j;
                    i += u * 2;
                    e.setMoveDistance(i, "0.5s");
                    if (u > 1 || u < -1) {
                        if (e.defaults.swipendfn) {
                            e.defaults.swipendfn();
                        }
                    }
                    e.container.removeEventListener("touchmove", p, false);
                    e.container.removeEventListener("touchend", h, false);
                }
            }, false);
            e.registerEvent();
        }, remToPx: function (c) {
            return this.clientW / 320 * this.defaults.defualtFontSize * c;
        }, pxToRem: function (c) {
            return parseFloat(c) / parseFloat(this.clientW / 320 * this.defaults.defualtFontSize);
        }, setLiWidth: function () {
            var c = this.arrLi;
            this.liW = Math.ceil(parseFloat(this.fContainer.offsetWidth - 8) / this.defaults.showLen);
            for (var d = 0; d < c.length; d++) {
                c[d].style.width = this.liW + "px";
            }
        }, swipMove: function (k, e, f) {
            var m = this.arrLi;
            var d = this.liW;
            var l = d * k;
            var g = this.fContainer.offsetWidth;
            var c = this.container.style.webkitTransform || this.container.style.transform;
            var h = parseFloat(c.match(/[0-9]+/)[0]);
            if (this.defaults.autoScroll || h > l || e) {
                this.setMoveDistance(-l, "500ms");
            } else {
                if (l + d + 2 > h + g) {
                    this.setMoveDistance(-(l + d + 2 - g), "500ms");
                }
            }
            $("#nvbg").css({
                "-webkit-transform": "translate3d(" + (l + 1) + "px,0,0)",
                "-webkit-transition": "500ms"
            });
            for (var i = 0; i < this.arrLi.length; i++) {
                if (k == i) {
                    this.arrLi[i].className = "hnli active";
                } else {
                    $(this.arrLi[i]).removeClass("active");
                }
            }
            this.defaults.callback({
                index: k,
                maxNum: m.length,
                actionType: f
            });
        }
    };
    a.extend = function (e, d) {
        for (var c in d) {
            if (d[c] !== undefined) {
                e[c] = d[c];
            }
        }
    };
    return b;
}();