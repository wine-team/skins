/**
 * 
 */
function url() {
	return location.protocol+'//'+location.host;
}

var ucenter = {
		images_url:function(){
			return 'http://images.localhost/';
		},
		isMobile : function(mob){
			var mobile = /^(13|14|15|17|18)+[0-9]{9}$/;
			return mobile.test(mob);
		},
		isEmail :function(ema){
			var email = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
			return email.test(ema);
		},
		isCode :function(cod){
			var code = /^[0-9]{6}$/;
			return code.test(cod);
		},
		/**
		 * 收货地址
		 * */
		address : function(){
			if ($('form#con').size() > 0) { 
				$('form#con').submit(function(e) {
					var input1 = $('input[name="receiver_name"]').val();
					var input2 = $('input[name="detailed"]').val();
					var input3 = $('input[name="tel"]').val();
					var input4 = $('input[name="code"]').val();
					if(input1.length < 2){
				        alert("收货人姓名不得少于2个字");
				        return false;
				    }
				    if(input2.length<4 || input2.length>50){
				        alert("请填写收货地址4-60个字");
				        return false;
				    }
				    if(!ucenter.isMobile(input3)){ 
				        alert("请填写正确的手机号码！");
				        return false;
				    }
				    if(input4.length > 0){
					    if(!ucenter.isCode(input4)){
					        alert("请填写正确的邮编！");
					        return false;
					    }
				    }
				    $.ajax({
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
		        })
			}
		},
		
		/**
		 * 猜你喜欢
		 * */
		getMaybeLike:function(){
			if ($('.ubgw .dn_aw').size() > 0) {
				$.post(url()+'/Ucenter/get_maybe_like', {}, function(json){
					if(json.length>0) {
						var cont = '';
						for(var i=0;i<json.length;i++) {
							cont += '<a class="dn_au" title="'+json[i].goods_name+'" target="_blank" href="'+json[i].goods_id+'">';
							var img_arr = json[i].goods_img.split('|'); 
							cont += '<img width="200" height="200" src="'+this.images_url()+img_arr[0]+''+'">';
							cont += '<p>'+json[i].goods_name+'</p>';
							cont += '<p class="xj"> ¥'+json[i].market_price+'</p>';
							cont += '</a>';
						}
						$('.ubgw .dn_aw').html(cont);
					} else {
						$('.ubgw .dn_aw').html('您还未浏览过任何产品，<a target="_blank" href="http://miaow.localhost/">马上去逛逛</a>');
					}
				}, 'json');
			}
		},
		
	
		
		/**
		 * 修改用户信息
		 * */
		editUser:function(){
			if ($('#user_info').size() > 0) {
				//默认头像
				$('.togava').click(function(){$("#avatar").stop().slideToggle(300);});
				//生日
				$("#birthday").date_input();
				//选中头像
				$("#mgul").delegate("li", "click", function() {
					if ($(this).hasClass("on")) {
						$(this).removeClass("on");
						$("#avatarImg").val("mobile");
						return;
					}
					$(this).addClass("on").siblings("li").removeClass("on");
					var v = $(this).find("img").attr("path");
					$("#avatarImg").val(v);
				});
				
				$('#user_info').submit(function(e) {
					var input1 = $('input[name="alias_name"]').val();
					var input2 = $('input[name="phone"]').val();
					var input3 = $('input[name="email"]').val();
					if(input1.length < 2){
				        alert("用户名不得少于2个字");
				        return false;
				    }
				    if(!ucenter.isMobile(input2)){ 
				        alert("请填写正确的手机号码！");
				        return false;
				    }
				    if(!ucenter.isEmail(input3)){
				        alert("请填写正确的邮箱！");
				        return false;
				    }
					$.ajax({
				        type:"POST",
				        beforeSend: function() {
	                        $('#user_info input[type=submit]').val('正在提交...').attr('disabled', true);
	                    },
				        dataType:'json',
				        async: false,
				        url: url()+'/Ucenter/edit_user_info',
	                    data: $('#user_info').serialize(),
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
		        });
			}
		},
		
		/**
		 * 修改密码
		 * */
		editPass:function(){
			if ($('#formPassword').size() > 0) {
				$('#formPassword').submit(function(e) {
					var input1 = $('input[name="old_password"]').val();
					var input2 = $('input[name="new_password"]').val();
					var input3 = $('input[name="comfirm_password"]').val();
					if(input1.length<6 || input1.length>20){
				        alert("原密码为6-20位");
				        return false;
				    }
					if(input2.length<6 || input2.length>20){
				        alert("新密码为6-20位");
				        return false;
				    }
					if(input1.trim() == input2.trim()){
						alert("新密码与原密码相同");
				        return false;
					}
					if(input2.trim() != input3.trim()){
						alert("两次输入的新密码不一致");
				        return false;
					}
					$.ajax({
				        type:"POST",
				        beforeSend: function() {
	                        $('#formPassword input[type=submit]').val('正在提交...').attr('disabled', true);
	                    },
				        dataType:'json',
				        async: false,
				        url: url()+'/Ucenter/reset_password',
	                    data: $('#formPassword').serialize(),
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
		        });
			}
		},
		
		
}

jQuery(function(){
	ucenter.getMaybeLike();
	ucenter.address();
	ucenter.editUser();
	ucenter.editPass();
})


