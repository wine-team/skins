
function url() {
	return location.protocol+'//'+location.host;
}

var ucenter = {
		
		/** 
		 * 微信扫码支付
		 * */
		order_weixin_pay : function(){
			if($('#weixinzhifu').size() > 0){
				var order_sn = $('#weixinzhifu').data('order_id');
				var ip = "127.0.0.1";
				var total = parseFloat($('#weixinzhifu').data('total'));
				total = Math.round(total*100);
				$.ajax({
					url : url()+'/Ucenter/get_wxpay_code',
					data : {
						'out_trade_no' : order_sn,
						'body' : "妙网商城-购物消费",
						'total_fee' : total,
						'mch_create_ip' : ip
					},
					dataType : "json",
					type : "POST",
					success : function(res) {
						if (typeof (res) === 'string') {
							res = JSON.parse(res);
						}
						if (res.status === false) {
							if (res.data){
								alert(res.msg);
								window.location.href = res.data;
							}else{
								_content = res.msg;
								$('#codeimg').popUpWin({
									content : res.msg
								});
							}
						} else {
							/**获取扫码支付结果*/
							var get_trade_state = function(){
								$.post(url()+'/Ucenter/get_trade_state',{out_trade_no:res.data},function(json){
									if(json.status){
										clearTimeout(t_out);
										alert(json.msg);
										window.location.href = json.data;
									}
								},'json');
								var t_out = setTimeout(get_trade_state,3000);
							}
							get_trade_state();
							
							$('#codeimg').html('');
							$('#codeimg').popUpWin({
								content : function() {
									return '<img width="230" src="'+res.code_img_url+'" />';
								},
								closeCallback : function() {
									self.popWin = undefined;
									self.opts.qrCodeClose = true;
								}
							});
							
						}
					}
				});
			}
		},
		
}

jQuery(function(){
	ucenter.order_weixin_pay();
});