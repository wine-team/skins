
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
		
		isMobile : function(mob){
			var mobile = /^(13|14|15|17|18)+[0-9]{9}$/;
			return mobile.test(mob);
		},
		
		feedback : function(){
			if( $('#feedback_form').size()>0 ){
				$('#feedback_form').submit(function(e){
					
					var input1 = $('textarea[name="ms_content"]').val();
					var input2 = $('input[name="ms_tel"]').val();
					var input3 = $('input[name="captcha"]').val();
					if(input1.length<10 || input1.length>1000){
				        alert("意见反馈在10-1000字内");
				        return false;
				    }
					if(!help.isMobile(input2)){ 
				        alert("请填写正确的手机号码！");
				        return false;
				    }
					if(input3.length!=4){
						alert("请填写正确的验证码！");
				        return false;
					}
					$.ajax({
	                    type: 'post',
	                    async: false,
	                    dataType : 'json',
	                    url: help.hostUrl()+'/User_feedback/feedback_post',
	                    data: $('#feedback_form').serialize(),
	                    beforeSend: function() {
	                        $('input[type=submit]').val('正在提交...').attr('disabled', true);
	                    },
	                    success: function(json) {
	                        if (json.status) {
	                        	alert('感谢你宝贵的意见');
	                            window.location.href = json.messages;
	                        } else {
	                            alert(json.messages);
	                            $('input[type=submit]').val('提交').removeAttr('disabled');
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
			help.captcha();
			help.feedback();
		}
}



jQuery(function(){
	help.initial();
})