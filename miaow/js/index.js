var home = {//首页js
		'url':function(){
			return location.protocol+'//'+location.host;
		 },
		 'cartLoad':function(){
			 if ($('#tcar').size()>0) {
				 var cart_flag = 0;  //购物车状态位 
				 $("#tcar").hover(function() { //购物车效果 
						$(this).addClass("hv");
						if (cart_flag == 0) {
							$.ajax({
								url:home.url()+'/home/home/getCart',
								type:'post',
								dataType:'json',
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
		 'initial':function(){
			 home.cartLoad();
			 home.headRightMenu();
		 }
}

jQuery(function(){
	home.initial();
})