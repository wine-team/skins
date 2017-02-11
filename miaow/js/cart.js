
var hostUrl = function() {
	
    return location.protocol+'//'+location.host;
}

var cartQtyUpdate = function(kind, obj) {
	
	var qtyObj = obj.parents('.cart-solve').find('.number');
    var limit_num =  qtyObj.attr('limit-num');
    var goods_id = qtyObj.attr('goods-id');
    var n = qtyObj.attr('goods-num');
    var c = qtyObj.val();
    if (kind == "up") {
        c++;
    } else if (kind == "down") {
        if (c > 1) c--;
    }
    if (limit_num>0) {
    	if (c>limit_num) {
    		layer.msg('限购'+limit_num+'件');
    		c = limit_num ;
    	}
    } else{
    	if (c > n) {
            layer.msg('库存不足,只能购买'+n+'件');
            c = n;
        }
    }
    qtyObj.val(parseInt(c));
    ajaxGoods(goods_id,c);
}

var cartQtyChange = function(obj) {
	
	var c = obj.val();
    var n = obj.attr('goods-num');
    var goods_id = obj.attr('goods-id');
    var limit_num =  obj.attr('limit-num');
    c = parseInt(c);
    n = parseInt(n);
    if (isNaN(c) || c==0) {
        c = 1;
    }
    if (limit_num>0) {
    	if (c>limit_num) {
    		layer.msg('限购'+limit_num+'件');
    		c = limit_num ;
    	}
    } else{
	    if (c > n) {
	    	layer.msg('库存不足,只能购买'+n+'件');
	        c = n;
	    }
    }
    obj.val(c);
    ajaxGoods(goods_id,c);
}

var ajaxGoods = function(goods_id,qty) {
	
	$.ajax({
        type: 'post',
        async: false,
        dataType : 'json',
        url: hostUrl()+'/cart/ajaxGoods',
        data:{goods_id:goods_id,qty:qty},
        success: function(json) {
            if (json.status) {
            	carLoad();
            } else {
            	layer.msg(json.message);
            }
        }
    });
}

var carLoad = function() {
	
	$.ajax({
		type: 'post',
        async: false,
        dataType : 'json',
        url: hostUrl()+'/cart/main',
        success: function(json) {
           $('.pay-order').html(json.amount);
           $('.cart-content').html(json.html);
           $('img.lazy').lazyload();
        }
	})
}

var cart = function() {
	
	var payChose = function() {
		
		$('.pay-type').on('click','.zfu',function(e){
			$(this).parent().children('.pay').prop('checked',false);
			$(this).children('.pay').prop('checked',true);
			$(this).addClass('zon').siblings().removeClass('zon');
			e.preventDefault();
		})
	} 

    var cartSubmit = function() {
    	
    	$('.cart').on('submit','form.order-form',function(e){ // 购物车提交
    		
    		var mobile = /^(13|14|15|17|18)+[0-9]{9}$/;
    	    var receiver_name = $('input[name="receiver_name"]').val();
    	    var tel = $('input[name="tel"]').val();
    	    var district_id = $('select[name="district_id"]').val();
    	    var detailed = $('input[name="detailed"]').val();
    	    var pay_bank = $('input[name="pay_bank"]').val();
    	    if (receiver_name.length<=0) {
    	        layer.msg('请填写收货人');
    	        return false;
    	    }
    	    if (tel.length<=0) {
    	    	layer.msg('请填联系方式');
    	    	return false;
    	    }
    	    if (!mobile.test(tel)){ 
    	    	layer.msg("请填写正确的手机号码！");
    	        return false;
    	    }
    	    if (district_id.length<=0) {
    	    	layer.msg('请选择地区');
    	    	return false;
    	    }
    	    if (detailed.length<=0) {
    	    	layer.msg('请填详细地址');
    	    	return false;
    	    }
    	    if (pay_bank.length<=0) {
    	    	layer.msg('请选择支付方式');
    	    	return false;
    	    }
    	    $.ajax({
    	    	type:'post',
    	        dataType:'json',
    	        async: false,
    	        url: hostUrl()+'/payment/create_order',
    	        data: $('form.order-form').serialize(),
    	        beforeSend: function() {
    	            $('.order-form input[type="submit"]').val('正在提交').attr('disabled', true);
    	        },
    	        success: function(json) {
    	            
    	            if (json.status) {
    	                window.location.href = json.message;
    	            } else {
    	            	layer.msg(json.message);
    	                $('.order-form input[type="submit"]').val('提交订单').removeAttr('disabled');
    	            }
    	        }
    	    })
    		e.preventDefault();
    		return false;
    	})
    }
    
    return {
    	
	   	init: function () {
	   		cartSubmit();
	   		payChose();
	   	}
    }
}();

jQuery(function(){
	
	cart.init();
	carLoad();
})


