/**
 * 
 */
function url() {
	return location.protocol+'//'+location.host;
}

var address = {// 首页js
		'checkCon':function(){
			if ($('form#con').size() > 0) {
				$('form#con').submit(function(e) {//e.preventDefault();
					if (!$(this).valid()) return false; 
					var validForm = $(this).validate({
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
			                tel:{mobile:true,
			                	required: true,
			                	
			                },
			                code:{
			                	zipCode:true,
			                },
			        	},
					});//console.log(validForm.valid());
					return false; 
				    $('.error').html('');
				    $(this).ajaxSubmit({
				        type:"POST",
				        beforeSubmit: function() {
	                        $('input[type=submit]').val('正在提交...').attr('disabled', true);
	                    },
				        dataType:'json',
				        async: false,
	                    url: url()+'/Address/addPost',
	                    data: $('#con').serialize(),
				        success: function(json) {
	                        if (json.status) {
	                        	alert('操作成功');
	                            window.location.href = json.messages;
	                        } else {
	                            alert(json.messages);
	                            $('input[type=submit]').val('确认提交').removeAttr('disabled');
	                        }
	                    }
				    });
				    return false;
		        })
			}
		},
		initial:function(){
			address.checkCon();
		}
}

jQuery(function(){
	address.initial();
})


