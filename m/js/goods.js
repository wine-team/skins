﻿var goods_id="5503";
var wifi='1';
var vtotal="304";
var rmin="2";
var time="";
var gis_pro = "0";
var hasp = 0;
var lzid = "pic_b";
var picb, pics;
var is_new = 0;
var lzs = 0;
var lzb = 0;
var picm = 1;
var cimg = 0;
var sview = 0;
var apos = [0, 0, 0];
var ks = false;
var conty = $("#pagebox").find(".content");
var sep = $("#se_p");
var vpage = "0";
var $num = $("#num");
var viewport = document.querySelector("meta[name=viewport]");
var selc = $("#se_p").find("select");
var gslider = $("#gslider");
var ppicli = $("#ppic").children();
var notop = $("#nok").offset().top;
var isgtn = false;
var sbaa = $("#sbar").find("p");
var Media;

var ktop = $("#glazy").offset().top;
var gzmg = $("#glazy").find("img");
var gon = true;

var winw = 0;

function goodsinit() {
    winw = $(window).width();
    if (winw > 300 && winw < 640) {
        gslider.css("height", winw);
        gslider.find("img").css({
            "width": winw,
            "height": winw
        });
    } else if (winw > 640) {
        gslider.css("height", "640px");
        gslider.find("img").css({
            "width": "640px",
            "height": "640px"
        });
    }
}

$(window).resize(function () {
    goodsinit();
});

goodsinit();

gslider.vganswiper({
    auto: false,
    bi: 1
});

function gclose() {
	
    $("#cok").hide();
    $("#nok").show();
    $num.val(1);
}

function nclose() {
	
    $num.val(1);
    $("#nosf").hide();
}

function tclose() {
    $("#shxs").hide();
    $("#sx").show();
}


$("#sx").delegate("label", "click", function (event) {
    
	var p = $(this).attr("data-p");
    var h = $(this).attr("data-h");
    $(this).addClass("on").siblings("label").removeClass("on");
    $(this).find("input").prop("checked", "true");
    $('#gprice').text(p);
    $('#sku').text(h);
    event.preventDefault();
    event.stopPropagation();
});

$("#shx").delegate("label", "click", function (event) {
    
	var i = $(this).index();
    $(this).addClass("on").siblings("label").removeClass("on");
    $("#sx").find("label").eq(i).trigger("click");
    event.preventDefault();
    event.stopPropagation();
});


function shuxing() {
    
	var sxhtml = $("#sx").html();
    $("#shx").html(sxhtml);
    $("#shx").find("input").remove();
    $("#sx").hide();
    $("#shxs").show();
}

function okcar() {
    
	var attr = "";
    var attr = getAttr("sx");
    if (attr == "" || attr == null) {
        alert("请选择产品规格,如颜色、尺寸等");
        return;
    }
    $("#sx").show();
    $("#shxs").hide();
    if (ks) {
        sbs();
    } else {
        addCar(goods_id, is_new);
    }
}

 /**
  * 立即购买
 */
function sbs(id) {
    
	var spec = new Array();
    var qty = parseInt($num.val());
    $('.catt  input:checked').each(function(i){
        spec[i] = $(this).val();
    })
    $.ajax({
        type: 'post',
        url:  hostUrl() + '/sex/home/addToCart',
        dataType: 'json',
        data: {goods_id: id, qty: qty,spec:spec},
        success: function (data) {
        	if (data.status) {
        		window.location.href = hostUrl() + '/sex/cart/buy.html';
        	} else {
        		layer.msg(data.msg);
        	}
        }
    });
}

/**
 * 加入购物车
 * @param id
 * @param is_zhu
 * @returns {Boolean}
 */
function addCar(id) {
	
	var spec = new Array();
    var qty = parseInt($num.val());
    $('.catt  input:checked').each(function(i){
        spec[i] = $(this).val();
    })
    $.ajax({
        type: 'post',
        url:  hostUrl() + '/sex/home/addToCart',
        dataType: 'json',
        beforeSend:function() {
        	$(".lr10 .add-cart").text("正在加入...").attr("disabled",true);
        },
        data: {goods_id: id, qty: qty,spec:spec},
        success: function (data) {
        	if (data.status) {
        		$.ajax({
        			type: 'post',
        			url:  hostUrl() + '/sex/home/getCartInfor',
        			async : false,
        			dataType : 'json',
        			success : function(data) {
        				if (data.status) {
        					 $("#rnum").text(data.num);
        		             $("#rsum").text("￥" + data.sum.toFixed(2));
        		             $("#cok").show();
        	                 $("#nok").hide();
        				}
        			}
        		})
        	} else {
        		layer.msg(data.msg);
        	}
        	$(".lr10 .add-cart").text("加入购物车").attr("disabled",false);
        }
    });
}



function casm() {
    var cp = $("#cas").find("p");
    cp.show();
    $("#gbar").hide();
}


function gtns() {
    if (isgtn) {
        $("#gtn").hide();
        isgtn = false;
    } else {
        $("#gtn").show();
        isgtn = true;
    }
}
$("#gtn").bind("click", function () {
    $(this).hide();
    isgtn = false;
});

function fav(gid) {
    $.getJSON("collect.php?act=collect&id=" + gid, function (data) {
        if (data.error == 0) {
            alert("收藏成功!");
            $("#scx").text("已收藏");
            $("#fav").attr("href", "collect.php");
        } else {
            alert(data.message);
        }
    });
}

/**
 * 购买数量的加减
 * @param i
 */
function jia(i) {
	
    var n = parseInt($num.val());
    var limit_num = $num.attr('limit-num');
    var in_stock = $num.attr('in-stock');
    if (i == '1') {
        n++;
    } else {
        if (n >1)  n--;
    }
    if (limit_num>0) {
    	if (n>limit_num) {
    		layer.msg('限购'+limit_num+'件');
    		n = limit_num ;
    	}
    } else{
    	if (n > in_stock) {
            layer.msg('库存不足,只能购买'+in_stock+'件');
            n = in_stock;
        }
    }
    $num.val(n);
}

//new
if (wifi == 0) {
    lzid = "pic_s";
    picm = 0;
}

$("#gul").delegate("a", "click", function (event) {
    var i = $(this).attr("data-id");
    if (i != vpage) {
        loadp(i);
    }
    event.preventDefault();
    event.stopPropagation();
});

$("#gslider").delegate("li", "click", function (event) {
    loadp(1);
    event.preventDefault();
    event.stopPropagation();
});


sbaa.bind("click", function (event) {
    var i = $(this).attr("data-id");
    if (i != vpage) {
        loadp(i);
    }
    event.preventDefault();
    event.stopPropagation();
});

function loadp(i) {
    //apos[vpage]=document.documentElement.scrollTop+document.body.scrollTop;
    conty.eq(i).show().siblings().hide();
    sbaa.eq(i).addClass("on").siblings().removeClass("on");
    //window.scrollTo(0,apos[i]);
    vpage = i;
    sview = 0;
    if (i == "1") {
        if (hasp == 0) {
            loadpic();
            window.scrollTo(0, 0);
        }
        sview = 1;
    }
    if (i == "2" && cimg == 0) {
        commentimg();
        cimg = 1;
    }
    setView(sview);
    if (isgtn) {
        $("#gtn").hide();
        isgtn = false;
    }
    if (i != 0) {
        $("#nos").show();
    } else {
        $("#nos").hide();
    }
}

function commentimg() {
    var ava = $("#comments").find("img");
    ava.each(function (index, element) {
        var msrc = $(this).attr("src2");
        $(this).attr("src", msrc);
    });
}

var is_ok = true;

function loadpic() {
	
        $.getJSON("detail.php?act=pic&id=" + goods_id, function (data) {
            $("#loadf").hide();
            $("#bfload").show();
            $("#pic_b").html(data.gbig);
            $("#pic_s").html(data.gsmall);
            picb = $("#pic_b").find("img");
            pics = $("#pic_s").find("img");
            if (data.video) {
                $("#video").html('<video id="media" controls width="100%" src="http://s.qw.cc/mv/' + data.video + '.mp4" ></video>');
                Media = document.getElementById("media");
                Media.addEventListener('play', video_click, false);
                $("#videos").show();
            }
            hasp = 1;
            if (picm == 1) {
                firstload(picb);
                lzb = 1;
            } else {
                firstload(pics);
                lzs = 1;
            }
        });
    }
    //video

function video_click() {
	
    $.ajax({
        url: "goods.php",
        type: "POST",
        data: {
            act: "video_click",
            goods_id: goods_id
        },
        dataType: "json",
        success: function (result) {
            if (result.code == 0) {
                Media.removeEventListener('play', video_click, false);
            }
        }
    });
}

function setView(i) {
	
    if (i == 1) {
        viewport.setAttribute('content', 'width=device-width,initial-scale=1,maximum-scale=5,user-scalable=yes');
    } else {
        viewport.setAttribute('content', 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0');
    }
}

function setCookie(name, value) {
    expires = new Date();
    expires.setTime(expires.getTime() + (1000 * 86400 * 365));
    document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString() + "; path=/";
}

function inm(k) {
	
    ppicli.eq(k).addClass("on").siblings().removeClass("on");
    if (k == 1) {
        $("#pic_b").show();
        $("#pic_s").hide();
        picm = 1;
        if (lzb == 0) {
            firstload(picb);
            lzb = 1;
        }
    } else {
        $("#pic_b").hide();
        $("#pic_s").show();
        picm = 0;
        if (lzs == 0) {
            firstload(pics);
            lzs = 1;
        }
    }
    setCookie("wifi", k);
}

window.onscroll = function () {
	
    if (vpage == 0 && gon) {
        var sTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        if (sTop >= 300) {
            gzmg.each(function (index, element) {
                var d = $(this).attr("src2");
                $(this).attr("src", d).removeAttr("src2");
                gon = false;
            });
        }
    }
    if (vpage == 1 && hasp == 1) {
        if (picm == 1) {
            firstload(picb);
        } else {
            firstload(pics);
        }
    }
}

function firstload(ele) {
	
        var sxop = document.documentElement.clientHeight + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        ele.each(function () {
            var mftop = $(this).offset().top;
            if (mftop <= sxop) {
                var src2 = $(this).attr("src2");
                if (src2) {
                    $(this).attr("src", src2).removeAttr("src2");
                }
            }
        });
    }
    //comment
$('#ajax').click(function () {
    $.getJSON('comment.php', {
        act: 'ajax',
        'goods_id': goods_id,
        'min': rmin
    }, function (data) {
        $("#comments").append(data.text);
        rmin = data.min;
        comment();
    })
});

function comment() {
    var len = $("#comments li").length;
    var number = vtotal - len;
    if (number) {
        $('#ajax strong').text(number);
    } else {
        $('#ajax').hide();
    }
}

//region
function pes() {
    sep.toggle();
}
var pe1, pe2, pe3;

function cpg(obj, type, id) {
    var index = obj.selectedIndex;
    var opv = obj.options[index].text;
    var parent = obj.options[index].value;
    if (parent == "") {
        return;
    }
    if (type == 2) {
        selc.eq(2).hide();
        pe1 = opv;
        pe2 = "";
        pe3 = "";
    } else if (type == 3) {
        pe2 = opv;
        pe3 = "";
    } else if (type == 4) {
        pe3 = opv;
        cpk();
        return;

    }
    var sel = selc.eq(id);
    $.ajax({
        url: 'region.php?type=' + type + "&target=" + id + "&parent=" + parent,
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            var len = result.regions.length;
            sel.css("display", (len == 0 && result.type == 3) ? "none" : 'block');
            sel.empty();
            if (type == 3 && len == 0) {
                selc.eq(2).hide();
            } else if (type == 3 && len > 0) {
                selc.eq(2).show();
            }
            if (len > 0) {
                sel.append('<option value="">请选择</option>');
                for (i = 0; i < len; i++) {
                    sel.append('<option value="' + result.regions[i].region_id + '">' + result.regions[i].region_name + '</option>');
                }
            } else {
                cpk();
            }
        }
    });
}

function cpk() {
	
    var ctid = selc.eq(1).val();
    var strs = pe1 + pe2 + pe3;
    var slen = strs.length;
    var str = strs.substr(0, 8);
    if (slen > 8) {
        str += "...";
    }
    $.ajax({
        url: "region.php?act=get_delivery_times&region_id=" + ctid,
        type: 'GET',
        dataType: 'text',
        success: function (result) {
            $("#yuji").text(result);
        }
    });
    $("#pes_id").text(str);
    sep.hide();
}

//晒单
function zom(obj) {
	
    var mg = $(obj);
    var bg = mg.attr("data-b");
    var ia = mg.attr("data-n");
    var box = mg.parent().parent().find(".s_db");
    mg.addClass("on").siblings("img").removeClass("on");
    if (ia == 0) {
        box.hide();
        mg.removeClass("on");
        mg.attr("data-n", "1").siblings("img").removeAttr("data-n");
    } else {
        box.html("<img class='sd_m' src='" + bg + "' >").show();
        mg.attr("data-n", "0").siblings("img").removeAttr("data-n");
    }
}