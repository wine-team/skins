
var passport = {
		
		url : function(){
			 return location.protocol+'//'+location.host;
		},
		
		unkonw : function(){
			$(".rtext").keyup(function(){
				var a=$(this).val();
				var s=$(this).parent().find("label");	
				if(a==""){
					s.show();
				}else{
					s.hide();	
				}
			});
		},
		
		headRightMenu : function(){
		 
			 $(".lha").delegate("h2","click",function(e){
				 var i = $(this).index();
				 $(this).addClass("on").siblings().removeClass("on");
				 $("#lzone").children(".lfmo").eq(i).show().siblings().hide();
				 e.preventDefault();
			 });
		},
		captcha : function(){
			if( $('.captcha').size()>0 ){  //验证码刷新
				
				$('.captcha').delegate('img','click',function(){
					$.ajax({
			            type: 'get',
			            async: false,
			            dataType : 'json',
			            url: hostUrl()+'/forget/ajaxJsonCaptcha',
			            success: function(json) {
			                $('.captcha').html(json.image);
			            }
			        });
				})
			}
		},
		loginForm : function(){
			if( $('#loginform').size()>0 ){   //登陆使用
				$('#loginform').submit(function(e) {
					 e.preventDefault();
		        }).validate({
		        	errorPlacement: function(e, el) {  
		            	if ($(el).hasClass('error')) {
			            	if ($('#username').val() == '' && $('#password').val() == '' ) {
			            		$(el).parents('.normal-login').find('.remind').children('p').text('请输入您的用户名或密码');
			            	}else{
			            		$(el).parents('.normal-login').find('.remind').children('p').text(e.text());
			            	}
		            	}
		            },
		            success: function(e, el) {
		                if ($(el).hasClass('error')) {
		                    $(el).parents('.normal-login').find('.remind').children('p').text('公共场所不建议自动登录，以防账号丢失');
		                }
		            },
		        	submitHandler: function(f) {
		        		$.ajax({
		                    type: 'post',
		                    async: false,
		                    dataType : 'json',
		                    url: passport.url()+'/login/loginPost',
		                    data: $('#loginform').serialize(),
		                    beforeSend: function() {
		                        $('#loginform input[type=submit]').val('正在登陆...').attr('disabled', true);
		                    },
		                    success: function(json) {
		                        if (json.status) {
		                            window.location.href = json.messages;
		                        } else {
		                            alert(json.messages);
		                            $('#loginform input[type=submit]').val('登陆').removeAttr('disabled');
		                        }
		                    }
		                });
		        		return false;
		        	}
		        })
			}
		},
		forgetForm : function(){
			if( $('.forget-form').size()>0 ){  //验证用户忘记密码
				$('.forget-form').submit(function(e) {
		            e.preventDefault();
		        }).validate({
		            rules: {
		                username: {
		                    required: true,
		                    remote: {
		                        url:passport.url()+'/forget/validateName',
		                        type: 'post',
		                        dataType: 'json',
		                        data: {
		                            username:function(json) {
		                                return $('input[name=username]').val();
		                            }
		                        }
		                    }
		                },
		               
		            },
		            messages: {
		                username: {
		                    required: '',
		                    remote: '用户名不存在'
		                },
		            },
		            submitHandler: function(f) {
		                $.ajax({
		                    type: 'post',
		                    async: false,
		                    dataType : 'json',
		                    url: passport.url()+'/forget/validateUser',
		                    data: $('.forget-form').serialize(),
		                    beforeSend: function() {
		                        $('input[type=submit]').text('正在提交...').attr('disabled', true);
		                    },
		                    success: function(json) {
		                        if (json.status) {
		                            window.location.href = json.messages;
		                        } else {
		                            alert(json.messages);
		                            $('input[type=submit]').text('确认提交').removeAttr('disabled');
		                        }
		                    }
		                });
		                return false;
		            }
		        });
			}
		},
		regForm : function(){
			if( $('#regform').size()>0 ){ 
				
				$('#regform').delegate('.register-type','click',function(){
					
					 var flag = $(this).attr('flag');
					 var type = (flag==1) ? '2' : '1';// 1手机 2邮箱
					 var typeName = ( type==1 ) ? '手机注册' : '邮箱注册';
					 var typeNameOne = ( type==1 ) ? '邮箱注册' : '手机注册';
				     var attrName = ( type==1 ) ? 'phone'  : 'email';
				     $(this).attr('flag',type).text(typeNameOne);
				     $('#zlab').text(typeName+'：');
				     $('input[name="type"]').val(type);
				})
				
				$('#regform').submit(function(e) {//注册
		            e.preventDefault();
		        }).validate({
		        	errorPlacement: function(e, el) {  
		        		if ($('#username').val() == '' && $('#password').val() == '' ) {
		            		$(el).parents('#regform').find('.error-infor').show().text('请输入您的用户名或密码');
		            	}else{
			            	$(el).parents('#regform').find('.error-infor').show().text(e.text());
		            	}
		            },
		            success: function(e, el) {
		                if ($(el).hasClass('error')) {
		                    $(el).parents('#regform').find('.error-infor').hide();
		                }
		            },
		            rules: {
		            	username: {
		            		required : true,
		            	},
		            	password: {
		                    required: true,
		                    rangelength:[6,20]
		                },  
		                confirm_password: {
		                    required: true,
		                    equalTo: '#password'
		                }
		            },
		            messages: {
		            	username: {
		            		required: '请输入用户名',
		            	},
		            	password: {
		                    required: '请输入您的密码',
		                    rangelength: '密码只能在6-20位字符之间'
		                },
		                confirm_password: {
		                    required: '请再次输入密码',
		                    equalTo: '输入密码与原来不相同'
		                }
		            },
		            submitHandler: function(f) {
		                $.ajax({
		                    type: 'post',
		                    async: false,
		                    dataType : 'json',
		                    url: passport.url()+'/register/doRegister',
		                    data: $('#regform').serialize(),
		                    beforeSend: function() {
		                        $('#regform input[type=submit]').val('正在注册...').attr('disabled', true);
		                    },
		                    success: function(json) {
		                        if (json.status) {
		                            window.location.href = json.messages;
		                        } else {
		                        	$('#regform').find('.error-infor').show().text(json.messages);
		                            $('#regform input[type=submit]').val('立即注册').removeAttr('disabled');
		                        }
		                    }
		                });
		                return false;
		            }
		        });
			}
		},
		initial:function(){
			passport.headRightMenu();
			passport.captcha();
			passport.loginForm();
			passport.forgetForm();
			passport.regForm();
		}
}

jQuery(function(){
	passport.initial();
})

