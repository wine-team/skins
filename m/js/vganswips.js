(function ($) {
    $.fn.vganswiper = function (q) {
        q = $.extend({
            srcs: "lazy",
            auto: true,
            btn: "btn",
            bi: 0,
            showbtn: true,
            author: "vganchou",
            delay: 4000
        }, q || {});
        return this.each(function () {
            var start, isScrolling, deltaX, interval;
            var boxs = this;
            var ul = boxs.children[0];
            var li = $(ul).children();
            var len = li.length;
            var index = 1;
            var speed = 300;
            var btn;
            var pw = Math.ceil(("getBoundingClientRect" in boxs) ? boxs.getBoundingClientRect().width : boxs.offsetWidth);
            var hhw = pw > 640 ? 640 : pw * q.bi;
            if (len > 1) {
                init()
            } else {
                return;
            }

            function init() {
                var alen = len;
                while (alen--) {
                    li.eq(alen).css("width", pw + "px")
                }
                ul.style.width = pw * (len + 2) + "px";
                if (q.bi != 0) {
                    ul.style.height = hhw + "px";
                }
                var btns = "";
                for (var i = 0; i < len; i++) {
                    if (i == 0) {
                        btns += '<i class="on"></i>'
                    } else {
                        btns += "<i></i>"
                    }
                }
                var cd1 = li.eq(0).clone();
                var cd2 = li.eq(len - 1).clone();
                $(ul).append(cd1);
                $(ul).prepend(cd2);
                li = $(ul).children();
                if (q.showbtn) {
                    $("#" + q.btn).append(btns);
                }
                btn = $("#" + q.btn).children();
                ul.style.MozTransform = ul.style.webkitTransform = "translate3d(" + -pw + "px,0,0)";
                ul.style.msTransform = ul.style.OTransform = "translateX(" + -pw + "px)";
                if (q.auto) {
                    sbegins()
                }
            }
            ul.addEventListener("touchstart", function (e) {
                start = {
                    pageX: e.touches[0].pageX,
                    pageY: e.touches[0].pageY,
                    time: Number(new Date())
                };
                isScrolling = undefined;
                deltaX = 0;
                var b = ul.style;
                b.webkitTransitionDuration = b.MozTransitionDuration = b.msTransitionDuration = b.OTransitionDuration = b.transitionDuration = "0ms";
                if (index >= len + 1) {
                    b.MozTransform = b.webkitTransform = "translate3d(" + -pw + "px,0,0)";
                    b.msTransform = b.OTransform = "translateX(" + -pw + "px)";
                    index = 1
                }
                if (index == 0) {
                    b.MozTransform = b.webkitTransform = "translate3d(" + -pw * len + "px,0,0)";
                    b.msTransform = b.OTransform = "translateX(" + -pw * len + "px)";
                    index = len
                }
                e.stopPropagation()
            }, false);
            ul.addEventListener("touchmove", function (e) {
                if (e.touches.length > 1 || e.scale && e.scale !== 1) {
                    return
                }
                deltaX = e.touches[0].pageX - start.pageX;
                if (typeof isScrolling == "undefined") {
                    isScrolling = !!(isScrolling || Math.abs(deltaX) < Math.abs(e.touches[0].pageY - start.pageY))
                }
                if (!isScrolling) {
                    if (q.auto) {
                        clearTimeout(interval);
                    }
                    ul.style.MozTransform = ul.style.webkitTransform = "translate3d(" + (deltaX - index * pw) + "px,0,0)";
                    ul.style.msTransform = ul.style.OTransform = "translateX(" + (deltaX - index * pw) + "px)";
                    e.preventDefault();
                    e.stopPropagation()
                }
            }, false);
            ul.addEventListener("touchend", function (e) {
                var b = Number(new Date()) - start.time < 250 && Math.abs(deltaX) > 20 || Math.abs(deltaX) > 80;
                if (!isScrolling) {
                    slide(index + (b ? (deltaX < 0 ? 1 : -1) : 0), speed)
                }
                e.stopPropagation()
            }, false);
            window.addEventListener("resize", function () {
                var xpw = Math.ceil(("getBoundingClientRect" in boxs) ? boxs.getBoundingClientRect().width : boxs.offsetWidth);
                if (xpw < 1) {
                    return false;
                } else {
                    pw = xpw;
                }
                hhw = pw > 640 ? 640 : pw * q.bi;
                var klen = len + 2;
                while (klen--) {
                    li.eq(klen).css("width", pw + "px")
                }
                ul.style.width = pw * (len + 2) + "px";
                if (q.bi != 0) {
                    ul.style.height = hhw + "px";
                }
                ul.style.MozTransform = ul.style.webkitTransform = "translate3d(" + -index * pw + "px,0,0)";
                ul.style.msTransform = ul.style.OTransform = "translateX(" + -index * pw + "px)"
            }, false);
            ul.addEventListener("webkitTransitionEnd", function () {
                transitionEnd()
            }, false);
            ul.addEventListener("msTransitionEnd", function () {
                transitionEnd()
            }, false);
            ul.addEventListener("oTransitionEnd", function () {
                transitionEnd()
            }, false);
            ul.addEventListener("transitionend", function () {
                transitionEnd()
            }, false);

            function transitionEnd(a) {
                if (q.auto) {
                    sbegins()
                }
            }

            function slide(a, c) {
                if (a > len + 1) {
                    a = len;
                }
                var b = ul.style;
                b.webkitTransitionDuration = b.MozTransitionDuration = b.msTransitionDuration = b.OTransitionDuration = b.transitionDuration = c + "ms";
                b.MozTransform = b.webkitTransform = "translate3d(" + -(a * pw) + "px,0,0)";
                b.msTransform = b.OTransform = "translateX(" + -(a * pw) + "px)";
                index = a;
                var ix;
                if (index == 1 || index >= len + 1) {
                    ix = 0
                } else {
                    if (index == 0) {
                        ix = len - 1
                    } else {
                        ix = index - 1
                    }
                }
                btn.eq(ix).addClass("on").siblings().removeClass("on");
                var lvm = li.eq(index).find("img");
                var lv = lvm.attr(q.srcs);
                if (lv) {
                    lvm.attr("src", lv).removeAttr(q.srcs)
                }
            }

            function snext() {
                clearTimeout(interval);
                var cur = index + 1;
                if (cur == len + 1) {
                    cur = 1
                }
                slide(cur, speed)
            }

            function sbegins() {
                interval = (q.auto) ? setTimeout(function () {
                    snext()
                }, q.delay) : 0
            }
        })
    }
})(jQuery);