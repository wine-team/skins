
function url() {
	return location.protocol+'//'+location.host;
}

var ucenter = {
		images_url:function(){
			return 'http://images.localhost/';
		},
		isMobile : function(mob){
			var mobile = /^(13|14|15|17|18)+[0-9]{9}$/;
			return mobile.test(mob);
		},
		isEmail :function(ema){
			var email = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
			return email.test(ema);
		},
		isCode :function(cod){
			var code = /^[0-9]{6}$/;
			return code.test(cod);
		},
		
		
		/**
		 * 修改用户信息
		 * */
		editUser:function(){
			if ($('#user_info').size() > 0) {
				//默认头像
				$('.togava').click(function(){$("#avatar").stop().slideToggle(300);});
				//生日
				$("#birthday").date_input();
				//选中头像
				$("#mgul").delegate("li", "click", function() {
					if ($(this).hasClass("on")) {
						$(this).removeClass("on");
						$("#avatarImg").val("mobile");
						return;
					}
					$(this).addClass("on").siblings("li").removeClass("on");
					var v = $(this).find("img").attr("path");
					$("#avatarImg").val(v);
				});
				
				$('#user_info').submit(function(e) {
					var input1 = $('input[name="alias_name"]').val();
					var input2 = $('input[name="phone"]').val();
					var input3 = $('input[name="email"]').val();
					if(input1.length < 2){
				        alert("用户名不得少于2个字");
				        return false;
				    }
				    if(!ucenter.isMobile(input2)){ 
				        alert("请填写正确的手机号码！");
				        return false;
				    }
				    if(!ucenter.isEmail(input3)){
				        alert("请填写正确的邮箱！");
				        return false;
				    }
					$.ajax({
				        type:"POST",
				        beforeSend: function() {
	                        $('#user_info input[type=submit]').val('正在提交...').attr('disabled', true);
	                    },
				        dataType:'json',
				        async: false,
				        url: url()+'/Ucenter/edit_user_info',
	                    data: $('#user_info').serialize(),
	                    success: function(json) {
	                        if (json.status) {
	                        	alert('修改成功');
	                            window.location.href = json.messages;
	                        } else {
	                            alert(json.messages);
	                            $('#user_info input[type=submit]').val('确认修改').removeAttr('disabled');
	                        }
	                    }
				    });
					e.preventDefault();
		        });
			}
		},
		
		/**
		 * 修改密码
		 * */
		editPass:function(){
			if ($('#formPassword').size() > 0) {
				$('#formPassword').submit(function(e) {
					var input1 = $('input[name="old_password"]').val();
					var input2 = $('input[name="new_password"]').val();
					var input3 = $('input[name="comfirm_password"]').val();
					if(input1.length<6 || input1.length>20){
				        alert("原密码为6-20位");
				        return false;
				    }
					if(input2.length<6 || input2.length>20){
				        alert("新密码为6-20位");
				        return false;
				    }
					if(input1.trim() == input2.trim()){
						alert("新密码与原密码相同");
				        return false;
					}
					if(input2.trim() != input3.trim()){
						alert("两次输入的新密码不一致");
				        return false;
					}
					$.ajax({
				        type:"POST",
				        beforeSend: function() {
	                        $('#formPassword input[type=submit]').val('正在提交...').attr('disabled', true);
	                    },
				        dataType:'json',
				        async: false,
				        url: url()+'/Ucenter/reset_password',
	                    data: $('#formPassword').serialize(),
	                    success: function(json) {
	                        if (json.status) {
	                        	alert('修改成功，请重新登录');
	                            window.location.href = json.messages;
	                        } else {
	                            alert(json.messages);
	                            $('#formPassword input[type=submit]').val('确认修改').removeAttr('disabled');
	                        }
	                    }
				    });
					e.preventDefault();
		        });
			}
		},
		
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
	ucenter.editUser();
	ucenter.editPass();
	ucenter.order_weixin_pay();
});

(function($){
    var PopUpWin = function(ele,opts){
        opts = $.extend({
            id:'',
            content:undefined,//内容
            closeCallback:undefined//关闭时调用的方法
        },opts);
        this.init(ele,opts);
    }

    PopUpWin.prototype = {

        template:'{content}',
        init:function(ele,opts){
            this.render(ele,opts);
            this.initEvent(ele,opts);
        },
        initEvent:function(ele,opts){
            var self = this;
            ele.find('.btn_cancel').click(function(){
                ele.find('#'+self.id).remove();
                if(opts.closeCallback !== undefined && $.isFunction(opts.closeCallback)){
                    opts.closeCallback();
                }
            });
        },
        elId:function(){//自动生成7位8进制DOM元素ID
            return 'win-xxx'.replace(/[x]/g,function(c){
                var r = Math.random() * 16|0, v = c === 'x' ? r : (r&0x3|0x8);
                return v.toString(8);
            }).toLocaleLowerCase();
        },
        render:function(ele,opts){
            if(ele === undefined){
                ele = $('body');
            }
            
            var content = opts.content;
            this.id = this.elId();
            
            if($.isFunction(content)){
                content  = content(this);
            }
                tpl = this.template.replace(/\{id\}/,this.id).replace(/\{content\}/,content);
            ele.append(tpl);
        }
    };

    $.fn.popUpWin = function(opts){
        return this.each(function(){
             var that = $(this);
             var popUp = new PopUpWin(that,opts);
        });
    };

})(jQuery);

