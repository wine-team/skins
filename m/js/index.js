 /**
  * 根地址
  * @returns {String}
  */
 var hostUrl = function () {
     return location.protocol + '//' + location.host;
 }
 
 var home = {

     index: function () {

             var a_on = true;
             var hometop = $("#hometop");
             window.onscroll = function () {
                 var sTop = document.documentElement.scrollTop + document.body.scrollTop;
                 if (sTop > 100) {
                     if (a_on) {
                         hometop.removeClass("homehd");
                         a_on = false;
                     }
                 } else {
                     if (!a_on) {
                         hometop.addClass("homehd");
                         a_on = true;
                     }
                 }
             };

             $('.home-top').on('focus', '.t_sl', function (event) {

                 var w = $(this).attr("placeholder");
                 var v = $(this).val();
                 if (v == w) {
                     $(this).val("");
                 }
                 $('.sebg').show();
                 event.stopPropagation();
             });

             $('.home-top').on('blur', '.t_sl', function (event) {
                 setTimeout(function () {
                     $('.sebg').hide()
                 }, 500);
                 event.stopPropagation();
             });

             $('.sebg').on('click', '.right', function (event) {
                 $('.sebg').hide();
                 event.stopPropagation();
             });


             $(".hslider").vganswiper({
                 bi: 0.484
             });
             
             $('form.home-search').on('submit',function(e){ //表单提交
            	 
            	 var wo = $('input[name=keyword]').val()
        	     if (wo == null || wo == "") {
        	        alert("请输入关键字");
        	        //return false;
        	     }
             })
             
             lazyload({
                 defObj: "#lazy"
             });
             
         },
         init: function () {
             home.index();
         }
 }
 
 var cart = {
		 
		 index: function () {
			 
			 var $gnum = $("#gm").find(".gnum");
			 $gnum.change(function () {
			     var obj = $(this);
			     var val = obj.val();
			     if (Validator.isNumber(val) && val > 0) {
			         if (val > 50) {
			             obj.val(50);
			         }
			     } else {
			         obj.val(1);
			     }
			     $.getJSON('car.php?act=price&goods_id=' + obj.attr('id') + '&number=' + obj.val(), function (a) {
			         if (a.code) {
			             alert(a.msg);
			             obj.val(5);
			         } else {
			             $('#count').text(a.data.goods_price_formated);
			         }
			     });
			 });

			 function delGoods(id) {
			     if (confirm("您确实要把该商品移出购物车吗？")) {
			         location.href = 'car.php?goods_id=' + id + '&act=del';
			     }
			 }
		 }, 
		 init: function () {
			 cart.index();
         }
 }
 
 var buy = {
		 index:function() {
			 
			 var tmo;
			 var lm = 60;
			 var xm = 60;
			 var mb=$("#mobile_phone");
			 var cd=$('#code');
			 var dx=$("#dx");
			 var fa=0;
			 var qx=$("#cancelOrder");
			 var order="2016121412142293283";
			 var tag = 1;
			 function tm(){
			     lm--;
			     if(lm < 1) {
			         dx.removeAttr("disabled").removeClass("dsbtn").val("重新发送验证码");
			         clearTimeout(tmo);
			         lm = xm;
			         return;
			     }
			     dx.val(lm + "秒后可重发");
			     tmo = setTimeout("tm()",1000);

			 }
			 dx.bind("click", function(){
			 	var il=$(this).prop("disabled");
			 	var mbv=mb.val();
			 	if(!Validator.isMobile(mbv)){
			 	 alert("请输入正确的手机号码");
			 	 return false;
			 	}
			     if(!il){
			         $(this).prop("disabled",true).addClass("dsbtn");
			         $.getJSON('flow.php?step=sendNum&t=' + new Date().valueOf(), {
			         	phone:mb.val(),order_sn:order,token:'ec51672bd3cafade7a0671011c462eca'
			         },
			         function(data) {
			             if(data.code==2){
			 				alert("已超发送限制，若无法获取验证码，请拨打400-660-0606确认订单");
			 				dx.val("3次机会已用完").prop("disabled",true).addClass("dsbtn");
			 				}else{
			 			tm();		
			 			}
			         });
			     } else {
			       alert("请等待倒计时结束后重新发送");
			     }

			 });

			 function qxdd(obj){
			 	var a=$(obj);
			 	$.getJSON('flow.php?step=orderCancel&t=' + new Date().valueOf(),{
			 		order_sn:order
			     },function(data){
			     	if (data.code==0) {
			            alert(data.msg);
			            a.html('<b class="red">订单已取消</b>');
			        	   a.removeAttr("onclick");
			         }else{
			            alert('取消失败，请联系客服');
			         }
			     });
			 }
			  
			 function yz() {
			     var c=$('#code').val();
			 	if(fa==1){
			 		return false;
			 		}
			     if(c.length < 4){
			 		alert("请输入4位完整验证码");
			         return false;
			     }
			 	fa=1;
			     $.getJSON('flow.php?step=orderConfirm&t=' + new Date().valueOf(),{
			 		captcha:c,order_sn:order
			     },
			     function(data) {
			         if(data.code==0) {
			             //alert(data.msg);
			             $("#yzt").remove();
			             $("#yzs").show();
			         } else {
			             alert("验证码错误！");
			         }
			 		fa=0;
			     });
			 }
			 function send(url){
			 	if(tag && url){
			 		tag = 0;
			 		window.location.href = url;
			 	} else {
			 		return false;
			 	}
			 }
			 var default_time = '12月16日(周五)';
			 getSfexpress('QZ9361','QZ9361-4','浙江省','杭州市','1');
		 },
		 init:function() {
			 buy.index();
		 }
 }
 
 jQuery(function () {
	 
     home.init();
     cart.init();
     buy.init();
 })