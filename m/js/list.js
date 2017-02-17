var jian = 100;
var page = 1;
var total = parseInt($('.pg-infor .pg-total').text());
var nurl = location.origin+'/sex/home/ajaxSeach?pg=';
var cvon = 0;
var mo = 0;
var isf = 0;
var s_x = $("#sha");
var cv = $("#c_v");
var mods = $("#mode");
var glist = $("#glist");
var lod = $("#lod");
var pg = $("#pgnum");
var gl = $("#glist");
var npage = parseInt(page) + 1;
var yem = $("#yem");
var hpy = true;
var t_sl = $("#t_sl");
lazy();
if (t_sl.length > 1) {
    t_sl.focus(function () {
        $("#qxs").show();
    }).blur(function () {
        setTimeout(cans, 500);
    });
}

function cans() {
    $("#qxs").hide();
}

function sha() {
    if (cvon == 0) {
        s_x.text("收起");
        cv.show();
        cvon = 1;
    } else {
        s_x.text("筛选");
        cv.hide()
        cvon = 0;
    }
}

cv.click(function () {
    s_x.text("筛选");
    cv.hide()
    cvon = 0;
});

cv.delegate("a", "click", function (event) {
    event.stopPropagation();
});

function mod() {
	
    mods.toggleClass("von")
    glist.toggleClass("bigm");
}

window.onscroll = function () {
    if (isf == 0 && npage <= total) {
        var sTop = document.documentElement.scrollTop + document.body.scrollTop + $(window).height();
        var sHeight = document.body.scrollHeight - 320 - jian;
        if (sTop >= sHeight) {
            loadData();
        }
    }
}

function loadData() {
    if (npage > total) {
        return;
    }
    isf = 1;
    $.ajax({
        url: nurl + npage,
        async: false,
        dataType: "html",
        beforeSend:function(){
        	lod.show();
        },
        success: function (c) {
            lod.hide();
            gl.append(c);
            isf = 0;
            yem.text(npage + "/" + total);
            npage++;
            lazy();
        }
    });
}

yem.click(function () {
    $("#pgl").show();
})

function gxl() {
    $("#pgl").hide();
}

function gtns(){
	$("#gtn").toggle();
}