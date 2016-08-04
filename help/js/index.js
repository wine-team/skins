
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
			 
			 if ($('#racar').size() > 0) {
				 var flag = 0;
				 $("#minarg").bind("mouseenter",function(){
					 if (flag == 0) {
						$.ajax({
							url:help.url()+'/Home/getCart',
							type: 'get',
							jsonCallback: 'jsonCallback',
							dataType:'jsonp',
							beforeSend:function(){
								$("#rxcar").html('<p class="alC c3 lh30">正在加载中...</p>');
							},
							success:function(data){
								   $("#rxcar").html(data.html);
								   flag = 1;
							}
						});
					 }
				 });
			 }
			 if ($("#rhist").size() > 0){
				 var hflag = 0;
				 $("#rhist").bind("mouseenter",function(){
					   if (hflag==0) {
					   	  $.ajax({
							  url:help.url()+'/Home/getHistory',
							  type:'post',
							  dataType:'jsonp',
							  beforeSend:function(){
								 $("#hibx").html('<p class="alC">正在加载中...</p>');
							  },
							  success:function(data){
				 				 $("#hibx").html(data.html);
								 hflag = 1;
							  }
				 		  });
					   }
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
			 
			 $("#minbar").on("mouseover",".m_li",function(event){  // 右边黑蓝公用的效果
			     $(this).addClass("m_lion");
			     $(this).find(".r_av").show().stop().animate({opacity:1,right:"35px"},300);
			 }).on("mouseout",'.m_li',function(){
				 $(this).removeClass("m_lion");
				 $(this).find(".r_av").stop().animate({opacity:0,right:"70px"},300,function(){$(this).hide()});
			 });
			 
			 $("#bignav").hover(function(){ // 帮助中心菜单栏放进去的效果
				 $("#lnav").show();
		     },function() {
		    	 $("#lnav").hide();
		     });
			 
			 $('.m_tops').delegate('.top','click',function(event){ //顶部 公用函数
				 $('html,body').stop().animate({scrollTop:'0px'},600);
				 event.preventDefault();
			 });
			 
			 if ($('.miao-header').size()>0) {
				 var nav_top = 850;
				 var has_nav = false;
				 $(window).scroll(function(){
			         var ns_top = $(window).scrollTop();
					 if (ns_top>nav_top) {
					     if (!has_nav) {
					    	 $("#home_top").addClass("hs_fix");
					         has_nav = true;
					     }
					 }else{
					     if (has_nav) {
					    	 $("#home_top").removeClass("hs_fix");
				             has_nav = false;
					     }
					 }
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
			            url: help.hostUrl()+'/User_feedback/ajax_captcha',
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
		        		return false;
		        	},
		        	focusInvalid:true,
		        })
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