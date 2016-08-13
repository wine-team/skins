var home = {
		
		'url':function(){
			 return $('.url').attr('base-href');
		 },
		 
		 'hostUrl':function(){
			 return location.protocol+'//'+location.host;
		 },
		 
		 'cartLoad':function(){
			 if ($('#tcar').size()>0) {
				 var cart_flag = 0;  //购物车状态位 
				 $("#tcar").hover(function() { //购物车效果 
						$(this).addClass("hv");
						if (cart_flag == 0) {
							$.ajax({
								url:home.url()+'/Home/getCart',
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
		 },

		 'headRightMenu':function(){

			 $("#tul").on("mouseover",".nbt",function(event){ //头部样式效果
				$(this).addClass("on");
			 }).on("mouseout",'.nbt',function(){
				$(this).removeClass("on");
			 });
			 
			 $("#bignav").hover(function(){ //帮助中心菜单栏放进去的效果
				$("#lnav").show();
		     },function() {
		    	$("#lnav").hide();
		     });
		 },

		 'initial':function(){
			 home.cartLoad();
			 home.headRightMenu();
		 }
}

var ucenterH = {
		
	'address' : function(){ //收货地址
		if ($('form.address-form').size() > 0) { 
			$('form.address-form').submit(function(e) {
				var mobile = /^(13|14|15|17|18)+[0-9]{9}$/;
				var codeT = /^[0-9]{6}$/;
				var receiver_name = $('input[name="receiver_name"]').val();
				var detailed = $('input[name="detailed"]').val();
				var tel = $('input[name="tel"]').val();
				var code = $('input[name="code"]').val();
				if (receiver_name.length < 2) {
					layer.msg("收货人姓名不得少于2个字！");
			        return false;
			    }
			    if(detailed.length<4 || detailed.length>50){
			    	layer.msg("请填写收货地址4-50个字！");
			        return false;
			    }
			    if(!mobile.test(tel)){ 
			    	layer.msg("请填写正确的手机号码！");
			        return false;
			    }
			    if(code.length > 0){
				    if(!codeT.test(code)){
				    	layer.msg("请填写正确的邮编！");
				        return false;
				    }
			    }
			    $.ajax({
			        type:"POST",
			        dataType:'json',
			        async: false,
                    url: home.hostUrl()+'/Address/addPost',
                    data: $('form.address-form').serialize(),
                    beforeSend: function() {
                        $('.address-form input[type="submit"]').val('正在保存').attr('disabled', true);
                    },
			        success: function(json) {
                        if (json.status) {
                        	layer.msg('操作成功,在刷新中');
                            window.location.href = json.messages;
                        } else {
                        	layer.msg(json.messages);
                            $('.address-form input[type="submit"]').val('确认提交').removeAttr('disabled');
                        }
                    }
			    });
			    e.preventDefault();
	        })
		}
	},
	'initial':function(){
		ucenterH.address();
	}
}
jQuery(function(){
	home.initial();
	ucenterH.initial();
})