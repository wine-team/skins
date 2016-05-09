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

	var Validator= {
			
		    isEmail:function(a) {
		        var b = "^[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+@[-!#$%&'*+\\/0-9=?A-Z^_`a-z{|}~]+.[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+$";
		        return this.test(a, b);
		    },
		    isMobile:function(a) {
		        return this.test(a, /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/);
		    },
		    isPhone:function(a) {
		        return this.test(a, /^[0-9]{3,4}\-[0-9]{7,8}$/);
		    },
		    isNumber:function(a, b) {
		        return !isNaN(a.nodeType == 1 ? a.value :a) && (!b || !this.test(a, "^-?[0-9]*\\.[0-9]*$"));
		    },
		    isEmpty:function(a) {
		        return !jQuery.isEmptyObject(a);
		    },
		    test:function(a, b) {
		        a = a.nodeType == 1 ? a.value :a;
		        return new RegExp(b).test(a);
		    }
	};
	$("#loginform").bind("submit",function(){
		
		var a = $("#username").val();
		var b = $("#password").val();
		var c = $('#remember').is(':checked') ? 1 : 0;
		var t = $('#token').val();
		if(	a.length<2||a.length>30	){
			alert("请准确填写登陆帐号,2-30位之间");
			$("#username").focus();
			return false;
		}
		if(	b.length<5||b.length>30	){
			alert("请准确填写登陆密码,5-30位之间");
			$("#password").focus();
			return false;
		}
		$.ajax({url:'user.php', 
			type:'POST', 
			data:{act:"ajax_login",username:a,password:b,remember:c,token:t},
			dataType:'TEXT',
			error: function(){
				alert('Error');
			},
			success:function(result){
				if( result==1){
					$("#loginform").hide();
					$("#lok").show();
					dj();
				}else{
					alert("您输入的用户名或密码有误，请重新输入！");	
				}
			}
		});
		return false;
	});
	
	
	
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

function submitPwd(){
		
	var b = $("#new_password").val();
	var a = $("#confirm_password").val();
	var c = $("#old_password").val();
	if( b==""||b==""||c=="" ){
		alert("原始密码、新密码和确认密码不能为空");
		return false;
	}
	if( a.length<6 ){
		alert("密码不能少于6位");
		return false;
	}
	if( a!=b ){
		alert("两次输入的密码不一致！");
		return false;
	}
}	

function submitPwdInfo(){
		
	var a = $("#account").val();
	var b = $("#captcha").val();
	if( a.length<4 ){
		alert("帐号不能少于4位！");
		return false;
	}
	if(!Validator.isEmail(a)&&!Validator.isMobile(a)){
		alert("请填写正确的手机号码/邮箱");
		return false;
	}
	if( b.length<4 ){
		alert("请输入4位验证码!");
		return false;
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

function yzm(){
	
	var a = $("#yzm").val();
	if( a=="" || a.length<4 ){
		 alert("请输入不少于4位的验证码!");
	     return false;
	}
}