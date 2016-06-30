
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
				 
			 $('.m_tops').delegate('.top','click',function(){ //顶部 公用函数
				 $('html,body').stop().animate({scrollTop:'0px'},600);
			 })
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
			help.captcha();
			help.feedback();
		}
}



jQuery(function(){
	help.initial();
})