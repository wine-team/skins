/**
 * 
 */
var user_info = {// 首页js
		'editUser':function(){
			if ($('#user_info').size() > 0) {
				$('#user_info').submit(function(e) {
					 e.preventDefault();
		        }).validate({
		        	rules:{
		        		alias_name: {
		                    required: true,
		                    minlength:2,
		                    maxlength:20
		                },
		                phone:{
		                	required: true,
		                	mobile:true,
		                },
		                email: {
		                	chkemail:true,
		                },
		        	},
		        	submitHandler: function(f) {
		        		$.ajax({
		                    type: 'post',
		                    async: false,
		                    dataType : 'json',
		                    url: url()+'/Ucenter/edit_user_info',
		                    data: $('#user_info').serialize(),
		                    beforeSend: function() {
		                        $('#user_info input[type=submit]').val('正在提交...').attr('disabled', true);
		                    },
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
		        		return false;
		        	},
		        	focusInvalid:true,
		        	
		        });
			}
		},
		'editPass':function(){
			if ($('#formPassword').size() > 0) {
				$('#formPassword').submit(function(e) {
					 e.preventDefault();
		        }).validate({
		        	rules:{
		        		old_password: {
		                    required: true,
		                },
		                new_password:{
		                	minlength:6,
		                	maxlength:20,
		                	required: true,
		                },
		                comfirm_password:{
		                	equalTo:'#pas2',
		                }
		        	},
		        	submitHandler: function(f) {
		        		$.ajax({
		                    type: 'post',
		                    async: false,
		                    dataType : 'json',
		                    url: url()+'/Ucenter/reset_password',
		                    data: $('#user_info').serialize(),
		                    beforeSend: function() {
		                        $('#formPassword input[type=submit]').val('正在提交...').attr('disabled', true);
		                    },
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
		        		return false;
		        	},
		        	focusInvalid:true,
		        	
		        });
			}
		},
		initial:function(){
			user_info.editUser();
			user_info.editPass();
		}
}

jQuery(function(){
	user_info.initial();
})
