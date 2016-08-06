
var help = {
		
		url:function(){
			return 'http://miaow.localhost';
		},
		hostUrl:function(){
			return location.protocol+'//'+location.host;
		},
		cartLoad:function(){
			 if ($('#tcar').size()>0) {
				 var cart_flag = 0;  //购物车状态位 
				 $("#tcar").hover(function() { //购物车效果 
						$(this).addClass("hv");
						if (cart_flag == 0) {
							$.ajax({
								url:help.url()+'/Home/getCart',
								type: 'get',
								dataType:'jsonp',
								jsonCallback: 'jsonCallback',
								beforeSend:function(){
								    $("#acar").html("<p class='alC lh35'>加载中，请稍后...</p>");
							    },
								success:function(data){
									$("#acar").html(data.html);
									cart_flag = 1;
								}
							})
						}
				},function(){
						$(this).removeClass("hv");
				});
			 }
		},
		
		headRightMenu : function(){
			
			$("#lnav").children().hover(function() { //菜单显示效果
				  $(this).addClass("con");
			 }, function() {
				  $(this).removeClass("con");
			 });
			 
			 $("#tul").on("mouseover",".nbt",function(event){ //头部样式效果
				$(this).addClass("on");
			 }).on("mouseout",'.nbt',function(){
				$(this).removeClass("on");
			 });
			 			 
			 $("#bignav").hover(function(){ // 帮助中心菜单栏放进去的效果
				 $("#lnav").show();
		     },function() {
		    	 $("#lnav").hide();
		     });
		},
		
		captcha : function(){
			if( $('.captcha').size()>0 ){  
				$('.captcha').parent().delegate('.captcha','click',function(){
					$.ajax({
			            type: 'get',
			            async: false,
			            dataType : 'json',
			            url: help.hostUrl()+'/User_feedback/ajax_captcha',
			            success: function(json) {
			                $('.captcha').html(json.image+'看不清点我');
			            }
			        });
				})
			}
		},
		feedback : function(){
			if( $('.feedback-form').size()>0 ){
				$('.feedback-form').submit(function(e){
					var mobile = /^1[34578]\d{9}$/;
					var content = $('.text-area').val();
					var tel = $.trim($('.cover-input').val());
					if (content.length < 6 || content.length >100) {
						layer.msg('意见字数在6到100个字');
						return false;
					}
					if ( !(tel.length==11 &&　mobile.test(tel)) ) {
						layer.msg('请输入正确的手机号码');
						return false;
					}
					$.ajax({
	                    type: 'post',
	                    async: false,
	                    dataType : 'json',
	                    url: help.hostUrl()+'/User_feedback/feedback',
	                    data: $('.feedback-form').serialize(),
	                    beforeSend: function() {
	                        $('button[type=submit]').text('正在提交').attr('disabled', true);
	                    },
	                    success: function(json) {
	                        if (json.status) {
	                        	layer.msg('提交成功,页面跳转中,谢谢反馈!');
	                        	setTimeout(function(){
	                        		window.location.href = json.messages;
	                        	},3000);
	                        } else {
	                        	layer.msg(json.messages);
	                            $('button[type=submit]').text('提交').removeAttr('disabled');
	                        }
	                    }
	                });
					e.preventDefault();
				});
			}
		},
		initial:function(){
			help.cartLoad();
			help.headRightMenu();
			help.feedback();
		}
}
jQuery(function(){
	help.initial();
})