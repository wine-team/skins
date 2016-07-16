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
			 
			 if ($('#racar').size() > 0) {
				 var flag = 0;
				 $("#minarg").bind("mouseenter",function(){
					 if (flag == 0) {
						$.ajax({
							url:home.url()+'/Home/getCart',
							type: 'get',
							jsonCallback: 'jsonCallback',
							dataType:'jsonp',
							beforeSend:function(){
								$("#rxcar").html('<p class="alC c3 lh30">正在加载中...</p>');
							},
							success:function(data){
								   $("#rxcar").html(data.html);
								   flag = 1;
							}
						});
					 }
				 });
			 }
			 if ($("#rhist").size() > 0){
				 var hflag = 0;
				 $("#rhist").bind("mouseenter",function(){
					   if (hflag==0) {
					   	  $.ajax({
							  url:home.url()+'/Home/getHistory',
							  type:'post',
							  dataType:'jsonp',
							  beforeSend:function(){
								 $("#hibx").html('<p class="alC">正在加载中...</p>');
							  },
							  success:function(data){
				 				 $("#hibx").html(data.html);
								 hflag = 1;
							  }
				 		  });
					   }
				 });
			 }
		 },

		 'headRightMenu':function(){
			 
			 $("#lnav").children().hover(function() { //菜单显示效果
				  $(this).addClass("con");
			 }, function() {
				  $(this).removeClass("con");
			 });
			 
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
			 
			 $("#bignav").hover(function(){ // 帮助中心菜单栏放进去的效果
				 $("#lnav").show();
		     },function() {
		    	 $("#lnav").hide();
		     });
			 
			 $('.m_tops').delegate('.top','click',function(event){ //顶部 公用函数
				 $('html,body').stop().animate({scrollTop:'0px'},600);
				 event.preventDefault();
			 });
			 
			 if ($('.miao-header').size()>0) {
				 var nav_top = 850;
				 var has_nav = false;
				 $(window).scroll(function(){
			         var ns_top = $(window).scrollTop();
					 if (ns_top>nav_top) {
					     if (!has_nav) {
					    	 $("#home_top").addClass("hs_fix");
					         has_nav = true;
					     }
					 }else{
					     if (has_nav) {
					    	 $("#home_top").removeClass("hs_fix");
				             has_nav = false;
					     }
					 }
				 });
			 }
		 },
		 
		 'headerAdvert':function(){
			 if ($('.header-advert').size()>0) {
				  $(".header-advert").image_slider();// 轮廓图
			 }
		 },
		 
		 'cart':function(){ // 购物车
			 
			 $('.pay-type').on('click','.zfu',function(e){
				 $(this).addClass('zon').siblings().removeClass('zon');
				 e.preventDefault();
			 })
			 
			 $('.free').on('click','.youhuiquan',function(e){ //优惠券
				 
				 var selectFlag = $(this).parents('.free').find('.select-free');
			     if ($(this).is(':checked')) {
			    	 selectFlag.removeClass('hid');
			     } else {
			    	 selectFlag.addClass('hid'); 
			     }
				 e.stopPragination();
			 })
		 },
		 'search':function(){
			 
			 var ac = 1;
			 var gdls = $("#gdls");
			 var gddl = gdls.find(".gl");
			 var lz_k = gdls.find(".simg");
			 var lz_r = lz_k.children();
			 var ls_cat = $("#ls_cat");
			 
			 $('.simg').on('mouseenter','img',function(event){
			 	 var m = $(this).parents('.gl').find(".sbm");
			 	 var g = $(this).attr("data-s");
			 	 $(this).addClass("on").siblings("img").removeClass("on");
			 	 m.attr("src",g);
			 	 event.preventDefault();
			 });
			 
			 $(".ls_cat").delegate(".ls_lab input","click",function(e){
				 var cup = $(this).parent().attr("href");
				 window.location.href = cup;
			 });
			 
			 $(".gdls").find(".gl").hover(function(){
				$(this).addClass("hov");
			 },function() {
				$(this).removeClass("hov");
			 });
			 
			 $('.sdl').on('click','.b_rmo',function(){
				$(".brand_dl").toggleClass("h_auto");
				$(".b_rmo").toggleClass("b_rmon");
			 })
			 
			 if ($('.goods-list').size()>0) {
				 
				 var isf = 0;
				 var ntop = $(".ls_cat").offset().top;
				 $(window).scroll(function(){
					 var scrolls = $(window).scrollTop()-ntop;
				 	 if ( $(document).scrollTop()>ntop ){
					 	if (isf==0) {
					 		$(".ls_cat").addClass("ccat");
				 	 	}
					 	isf = 1;
				     } else {
			    	 	if (isf==1){
			    	 		$(".ls_cat").removeClass("ccat");
			    	 	}
			    	 	isf = 0;
				     }
					 return false;
				 });
			 }
		 },
		 
		 'initial':function(){
			 home.cartLoad();
			 home.headRightMenu();
			 home.headerAdvert();
			 home.cart();
			 home.search();
		 }
}

jQuery(function(){
	home.initial();
})