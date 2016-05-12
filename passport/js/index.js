/**
 * 获取host域名
 * @returns
 */
function hostUrl() {
    return location.protocol+'//'+location.host;
}

jQuery(function(){
	
	var time = "3";
	var istel = 1;
	
	$("#minbar").on("mouseover",".m_li",function(event){
		
	     $(this).addClass("m_lion");
	     $(this).find(".r_av").show().stop().animate({opacity:1,right:"35px"},300);
	}).on("mouseout",'.m_li',function(){
		
		 $(this).removeClass("m_lion");
		 $(this).find(".r_av").stop().animate({opacity:0,right:"70px"},300,function(){$(this).hide()});
	})

	$('.m_tops').delegate('.top','click',function(){ 
		$('html,body').stop().animate({scrollTop:'0px'},600)
	})
	
	$(".lha").delegate("h2","mouseenter",function(){
		
		var i = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$("#lzone").children(".lfmo").eq(i).show().siblings().hide();
	});
	
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
                    url: hostUrl()+'/login/loginPost',
                    data: $('#loginform').serialize(),
                    beforeSend: function() {
                        $('input[type=submit]').val('正在登陆...').attr('disabled', true);
                    },
                    success: function(json) {
                        if (json.status) {
                            window.location.href = json.messages;
                        } else {
                            alert(json.messages);
                            $('input[type=submit]').val('登陆').removeAttr('disabled');
                        }
                    }
                });
        		return false;
        	}
        })
	}
	
	if( $('.forget-form').size()>0 ){  // 验证用户忘记密码
		$('.forget-form').submit(function(e) {
            e.preventDefault();
        }).validate({
            rules: {
                username: {
                    required: true,
                    remote: {
                        url:hostUrl()+'/forget/validateName',
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
                    url: hostUrl()+'/forget/validateUser',
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
	

	
	
	
	
	
	$(".rtext").keyup(function(){
		
		var a=$(this).val();
		var s=$(this).parent().find("label");	
		if(a==""){
			s.show();
		}else{
			s.hide();	
		}
	});
	
	$("#telform").bind("submit",function(){
		
		var a='';
		var b=$("#tpas").val();
		var c=$("#cpas").val();
		if( istel==1 ){
			a = $("#mobile_phone").val();
			if( a.length<4||!Validator.isMobile(a) ){
				alert("请填写正确的手机号码");
				$("#mobile_phone").focus();
				return false;
			}
		}else{
			a = $("#email").val();	
			if( a.length<4||!Validator.isEmail(a) ){
				alert("请填写正确的邮箱地址");
				$("#email").focus();
				return false;
			}
		}

		if( b.length<5||b.length>30 ){
			alert("请准确填写登陆密码,5-30位之间");
			$("#tpas").focus();
			return false;
		}
		if(b=='123456'){
			alert("密码过于简单！");
			return false;
		}
		if(b!=c){
			alert("两次输入密码不一致，请重新输入");
			$("#cpas").focus();
			return false;
		}
		regs(a,b);
		return false;
	});
	
	$("#telform").delegate("#email","blur",function(){
		
		var a=$(this).val();
		if(a.length<4||!Validator.isEmail(a)){
			return false;
		}
		$.ajax({
			url:'user.php?act=check_email',
			type:'POST',
			data:{'email':a},
	        dataType:'text',
	        error:function() {
	            alert('Error');
	        },
	        success:function(res) {
	         if(res!="y"){
	        	 $("#t_ts").show();
	         }else{
	        	 $("#t_ts").hide();
	         }
	        }
	    });
	});

	$("#telform").delegate("#mobile_phone","blur",function(){
		var a=$(this).val();
		if( a.length<10||!Validator.isMobile(a) ){
			return false;
		}
		$.ajax({
	        url:'user.php?act=check_phone',
	        type:'POST',
	        data:{'mobile_phone':a},
	        dataType:'text',
	        error:function() {
	            alert('Error');
	        },
	        success:function(res) {
	        	if(res!="y"){
	        		$("#t_ts").show();
	        	}else{
	        		$("#t_ts").hide();
	        	}
	        }
	    });
	});

})

function dj(){
		
	setTimeout("dj()",1000);
	$("#miao").text(time); 
	time--;
	if( time<1 ){
		window.location.href=document.referrer;
	}
}

//regist
function qieh(obj){  
	
	var t = obj.innerHTML;
	if( t=="使用邮箱注册" ){
		$("#email").show();
		$("#mobile_phone").hide();
		$("#zlab").text("邮箱注册：").show();
		$("#email").val("");
		obj.innerHTML="使用手机注册";
		istel = 0;
	}else{
		$("#email").hide();
		$("#mobile_phone").show();
		$("#zlab").text("手机号注册：").show();
		$("#mobile_phone").val("");
		obj.innerHTML="使用邮箱注册";
		istel = 1;	
	}
}

function regs(u,p){
	
	var token = $("#token").val();
	$.ajax({url:'user.php', 
			type:'POST', 
			data:{
				act:"ajax_regist",
				username:u,
				password:p,
				token:token
			},
			dataType:'text',
			error:function(){
				alert('Error');
			},
			success: function(result){
				if(result==1){
					$("#telform").hide();
					$("#rok").show();
				}else{
					alert("您的输入有错，请重新输入！");	
				}
		   }
	});	
}
