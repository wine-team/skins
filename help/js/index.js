
var help = {
		
		url : function(){
			 return location.protocol+'//'+location.host;
		},
		
		headRightMenu : function(){
			
			 $("#lnav").children().hover(function() { //菜单显示效果
				  $(this).addClass("con");
			 }, function() {
				  $(this).removeClass("con");
			 });
			 
			 $("#bignav").hover(function(){ // 帮助中心菜单栏放进去的效果
				 $("#lnav").show();
		     },function() {
		    	 $("#lnav").hide();
		     });
			 
			 $("#tul").on("mouseover",".nbt",function(event){ //头部样式效果
				 $(this).addClass("on");
		     }).on("mouseout",'.nbt',function(){
				 $(this).removeClass("on");
			 });
				 				 
			 $('.m_tops').delegate('.top','click',function(){ //顶部 公用函数
				 $('html,body').stop().animate({scrollTop:'0px'},600);
			 });
			 
		},
		
		getCart : function(){
			
			if ($('.help-tcar').size()>0) {
				 var cart_flag = 0;  //购物车状态位 
				 $(".help-tcar").hover(function() { //购物车效果 
						$(this).addClass("hv");
						var url = $(this).attr('main-url');
						if (cart_flag == 0) {
							$.ajax({
								url:url+'home/getCart',
								type: 'get',
								dataType:'jsonp',
								jsonCallback: 'jsonCallback',
								beforeSend:function(){
								    $(".help-acar").html("<p class='alC lh35'>加载中，请稍后...</p>");
							    },
								success:function(data){
									$(".help-acar").html(data.html);
									cart_flag = 1;
								}
							})
						}
				},function(){
						$(this).removeClass("hv");
				});
			 }
		},
		
		captcha : function(){
			if( $('.captcha').size()>0 ){  
				$('.captcha').parent().delegate('.captcha','click',function(){
					$.ajax({
			            type: 'get',
			            async: false,
			            dataType : 'json',
			            url: hostUrl()+'/User_feedback/ajax_captcha',
			            success: function(json) {
			                $('.captcha').html(json.image+'看不清点我');
			            }
			        });
				})
			}
		},
		feedback : function(){
			if( $('#feedback_form').size()>0 ){   
				$('#feedback_form').submit(function(e) {
					 e.preventDefault();
		        }).validate({
		        	rules:{
		        		ms_content: {
		                    required: true,
		                    minlength:10,
		                    maxlength:1000
		                },
		                ms_tel:{
		                	mobile:true,
		                },
		                captcha: {
		                    required: true,
		                    minlength:4,
		                },
		        	},
		            messages:{
		            	ms_content:{
		            		required:'',
		            		minlength:'',
		                },
		                captcha:{
		                	required:'',
		                	minlength:''
		                }
		            },
		        	submitHandler: function(f) {
		        		$.ajax({
		                    type: 'post',
		                    async: false,
		                    dataType : 'json',
		                    url: hostUrl()+'/User_feedback/feedback_post',
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
		        		return false;
		        	},
		        	focusInvalid:true,
		        })
			}
		},
		initial:function(){
			help.headRightMenu();
			help.getCart();
			help.captcha();
			help.feedback();
		}
}



jQuery(function(){
	help.initial();
})