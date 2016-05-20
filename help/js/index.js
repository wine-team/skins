/**
 * 获取host域名
 * @returns
 */
function hostUrl() {
    return location.protocol+'//'+location.host;
}

jQuery(function(){
	
	//验证码刷新
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
	
	//意见反馈
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
	
})