/**
 * 
 */
var address = {// 首页js
		'checkCon':function(){
			if ($('form#con').size() > 0) {
				$('form#con').submit(function(e) {
					 e.preventDefault();
		        }).validate({
		        	rules:{
		        		receiver_name: {
		                    required: true,
		                    minlength:2,
		                    maxlength:20
		                },
		                detailed:{
		                	required: true,
		                	maxlength:50
		                },
		                tel:{
		                	required: true,
		                	mobile:true,
		                },
		                email: {
		                	chkemail:true,
		                },
		                code:{
		                	zipCode:true,
		                },
		        	},
		        	messages:{
		        		province_id:'',
		        		city_id:'',
		        	},
		        	submitHandler: function(f) {
		        		$.ajax({
		                    type: 'post',
		                    async: false,
		                    dataType : 'json',
		                    url: url()+'/Address/addPost',
		                    data: $('#con').serialize(),
		                    beforeSend: function() {
		                        $('input[type=submit]').val('正在提交...').attr('disabled', true);
		                    },
		                    success: function(json) {
		                        if (json.status) {
		                        	alert('新增成功');
		                            window.location.href = json.messages;
		                        } else {
		                            alert(json.messages);
		                            $('input[type=submit]').val('确认提交').removeAttr('disabled');
		                        }
		                    }
		                });
		        		return false;
		        	},
		        	focusInvalid:true,
		        	
		        });
				
			}
		},
		initial:function(){
			address.checkCon();
		}
}

jQuery(function(){
	address.initial();
})
