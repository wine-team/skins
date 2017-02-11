var ck = 1;
var sck = $("#sck");
var ci = $("#ci").val();
var $gnum = $("#hcar").find(".gnum");
$("#fukuan").delegate(".pmz", "click", function () {
    $(this).addClass("pmon").siblings().removeClass("pmon")
});


function scks() {
    if (ci == 1) {
        $("#hcar").show();
        sck.addClass("sckt");
        $("#sall").html("隐藏");
        ci = 0;
    } else {
        $("#hcar").hide();
        sck.removeClass("sckt");
        $("#sall").html("展开");
        ci = 1;
    }
}


$gnum.change(function () {
    var obj = $(this);
    var val = obj.val();
    var oid = obj.attr("id");
    if (Validator.isNumber(val) && val > 0) {
        if (val > 50) {
            obj.val(50);
            val = 50;
        }
    } else {
        obj.val(1);
        val = 1;
    }
    $.ajax({
        type: 'post',
        url: 'car.php',
        data: {
            act: "price",
            goods_id: oid,
            number: val
        },
        dataType: 'json',
        success: function (result) {
            if (result.code == 0) {
                setw(result, 1);
            } else {
                alert(result.msg);
                obj.val(5);
            }
        }
    });
});

function fee(pay_id) {
    $('#payment').val(pay_id);
    $.ajax({
        type: 'POST',
        url: 'car.php',
        data: {
            act: "payment",
            pay_id: pay_id
        },
        dataType: 'json',
        success: function (result) {
            if (result.code == 0) {
                setw(result, 0);
            } else {
                alert(result.msg);
            }
        }
    });

}

function carb() {
    if (ck > 1) {
        alert("您的订单正在提交中....");
        return false;
    }
    var con = $("#consignee").val();
    var mobile = $("#mobile").val();
    var address = $("#address").val();
    var $pr = $("#selProvinces");
    var $pc = $("#selCities");
    var $pd = $("#selDistricts");
    if (trim(con).length < 2 || trim(con).length > 8) {
        alert("收货人姓名2-8位");
        return false
    }
    if (!Validator.isMobile(mobile)) {
        alert("请填写正确的手机号码");
        return false
    }
    if ($pr.val() == "") {
        alert("请选择您的所在省份");
        return false
    }
    if ($pc.val() == "") {
        alert("请选择您的所在地区");
        return false
    }
    if ($pd.children().length > 1) {
        if ($pd.val() == "") {
            alert("请选择您的所在区县");
            return false
        }
    }
    if (trim(address).length < 3) {
        alert("收货地址不得少于3位");
        return false
    }
    ck++;
    $("#tijiao").val("订单正在提交中...");
}

function trim(str) {
    return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
}

function changeBonus(id) {
    $.ajax({
        type: 'POST',
        url: 'flow.php',
        data: {
            step: "change_bonus",
            bonus: id
        },
        dataType: 'json',
        success: function (result) {
            if (result.code == 0) {
                setw(result, 0);
            } else {
                alert(result.msg);
            }
        }
    });
    //var obj = $.parseJSON(result);
}

function validate_bonus(bonus_sn) {
    $.ajax({
        type: 'POST',
        url: 'flow.php',
        data: {
            step: "validate_bonus",
            bonus_sn: bonus_sn
        },
        dataType: 'json',
        success: function (result) {
            if (result.code == 0) {
                setw(result, 0);
            } else {
                alert(result.msg);
            }
        }
    });
}

function setw(result, i) {
	
    $('#goods_price').text(result.data.goods_price_formated);
    $('#shipping_fee').text(result.data.shipping_fee_formated);
    $('#bonus').text(result.data.bonus_formated);
    $('#amount').text(result.data.amount_formated);
    if (i == 1) {
        $('#discount').text(result.data.discount_formated);
    }
    $('#gift').text('交易完成后您将获得价值' + result.data.will_get_bonus + '元的优惠券和' + result.data.will_get_integral + '个积分');

    if (result.data.discount > 0) {
        $('#computer').removeClass('hid');
        $('#favourable').addClass('hid');
        $('#computer_discount').text(result.data.discount_format);
    } else {
        $('#computer').addClass('hid');
        $('#favourable').removeClass('hid');
        $('#computer_discount').text('');
    }

}

function delGoods(id) {
    if (confirm("您确实要把该商品移出购物车吗？")) {
        location.href = 'car.php?goods_id=' + id + '&act=del&fdel=buy';
    }
}

changeBonus(0);
