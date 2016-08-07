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
			 
			 if ($('.header-advert').size()>0) {
				 
				  $(".header-advert").image_slider();// 轮廓图
			 }
			 
			 if ($('.top-active').size()>0) { //头部广告图
				 
				 $('.top-active').delegate('.btn-close','click',function(e){
				 	 $('.top-active').hide();
				     if (window.sessionStorage) {
				     	 sessionStorage.setItem('black','hide');
				     }
				 })
				 if (window.sessionStorage && sessionStorage.getItem('black')==='hide') {
				 	 $('.top-active').hide();
				 }
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
		 
		 goodsType: function(){ //女性
			 
			 if ($('.goods-advert').size()>0) {
				 $('.goods-advert').image_slider();// 轮廓图
			 }
			 
			 $('.wbox').find('.dn_a').hover(function(){
				  $(this).addClass("hov");
			 	},function() {
			 	  $(this).removeClass("hov");
			 });
			 
			 $(".bdls").find(".gl").hover(function(){
					$(this).addClass("hov");
				 },function() {
					$(this).removeClass("hov");
			 });
			 
			 $("#gdls").delegate(".lwen","hover",function(event){
				 
				 var wenv = $(this).parent().parent().find(".b_h4");
				 var did = Number($(this).attr("data-id"))-2;
				 if (event.type == 'mouseenter') {
					 var tx = wenv.html();
					 if(tx.indexOf("<!--") > 0 ){
						 tx = tx.replace("<!--","");
						 tx = tx.replace("-->","");
						 wenv.text(tx);
					 }
					 wenv.show();
				 } else {
				 	 wenv.hide();
				 }
			});
			
			if ($('#bignav').size()>0) {
				var has_nav = false;
				var nav_top = 600;
				var $blnav = $("#nav");
				$(window).scroll(function(){
					 var ns_top = $(window).scrollTop();
					 if ( ns_top>nav_top ) {
						 if (!has_nav) {
							 $blnav.addClass("ccat");
							 $("#konav").show();
							 has_nav = true;
					 	}
					 }else{
					 	if (has_nav) {
					 		$blnav.removeClass("ccat");
					 		$("#konav").hide();
					 		has_nav	= false;
					 	}
					 }
				});
			}
		 },
		 
		 'goodsDetail':function(){  //产品详情页
			
			 $('.goods-pic').delegate('li','mouseenter',function(){
			 	 var n = $(this).attr('data-src');
			 	 $(this).addClass('on').siblings('li').removeClass('on');
			 	 $('.goods-main-pic').attr('src',n);
		     });
			 
			 $('.region').delegate("li","click",function(){
			 	 var i = $(this).index();
			 	 $(this).addClass("on").siblings().removeClass("on");
			 	 $("#pes_z").find(".pes_o").eq(i).show().siblings().hide();
		     });

			 $('.gdl .pes').hover(function(){ //头部样式效果
				 	$(this).addClass("pes_on");
			     },function(){
					$(this).removeClass("pes_on");
			 });
			 
			 $('.additive').delegate('.catt a','click',function(e){ //属性选择 
				 $(this).addClass('hover').siblings('a').removeClass('hover');
				 e.stopPropagation();
			 });
			 
			 $('.dx_tip').hover(function(){  // 短信订购
			 	 $('.dx_d').stop().fadeIn(200);
			  },function(){
			 	 $('.dx_d').stop().fadeOut(200);
			 });
			 
			 $('.jbars').delegate('li','click',function(){  //滚动条的点击
				 $(this).addClass('on').siblings('li').removeClass('on');
		     });
			 
			 $(".comment-type").delegate("li","click",function(){ //评论筛选
			 	 
			 	 var cId = $(this).attr("data-id");
			 	 var c_s = $(this).attr("data-s");
			 	 var ctop = $("#comment").offset().top;
			     var hs = $(this).hasClass("on");
			     if (hs||c_s==0) {return;}
			     $(this).addClass("on").siblings().removeClass("on");
			     var wc_top = $(document).scrollTop();
		 		 if(wc_top>ctop){
		 			$("html,body").animate({scrollTop:ctop},300)
		 		 }
			 });
			 
			 $('.glb').delegate('.nua','click',function(event){ //顶部 公用函数
				 $('html,body').stop().animate({scrollTop:'0px'},600);
				 event.preventDefault();
			 });

			 var jtop = $("#jbar").offset().top;
			 var r_top = $("#goodsrm").offset().top;
			 var isf = 0;
			 var isrf = false;
			 $(window).scroll(function(){
				 var s = $(window).scrollTop() - jtop;
				 var dmtop = $(document).scrollTop();
				 if (dmtop>jtop) {
					 if (isf==0) {
						 $("#jbar").addClass("dheng");
				     }
					 isf = 1;
					 if (isIE6) {
						 $("#jbar").css("top",s);
					 }
				 }else{
					 if (isf==1) {
						 $("#jbar").removeClass("dheng");
						 if (isIE6) {
							 $("#jbar").css("top","0");
						 }
					 }
					 isf = 0;
				 }

				 if (dmtop>r_top) {
				 	if (!isrf) {
				 		$("#goodsrm").addClass("rfix");
				 		isrf=true;
				 	}
				 }else{
				 	if (isrf) {
				 		$("#goodsrm").removeClass("rfix");
				 		isrf=false;
				 	}
				 }
			 });
		 },
		 
		 'initial':function(){
			 home.cartLoad();
			 home.headRightMenu();
			 home.cart();
			 home.search(); 
			 if(location.href.indexOf('detail')>-1){
				 home.goodsDetail();
			 }
			 if(location.href.indexOf('femal')>-1){
				 home.goodsType();
			 }
			 
		 }
}

jQuery(function(){
	home.initial();
})

var ac = 1;

function pnav(i){
	$("#pes_z").find(".pes_o").eq(i).show().siblings().hide();
}

function cadd(){
	
	var nb = $("#number");
	var n_b = parseInt(nb.val());
	if (!isNaN(n_b)){
		if (n_b<50){
			nb.attr("value",n_b+1);
		}
	}else{
		nb.attr("value",1);
	}
}
function cdec(){
	
	var nb = $("#number");
	var n_b = parseInt(nb.val());
	if (!isNaN(n_b)){
		if(n_b>1){
			nb.attr("value",n_b-1);
		}
	 }else{
		    nb.attr("value",1);
		}
}

function tobuy(gid){
	
	var wrap = $("#wrap");
	var lep = wrap.length;
	if (lep>0) {
		var clep = wrap.find(".hover").length;
		if (clep<1) {
			gopen(1);
			return;
		}
	}
	if(ac!=1){return;}
	addToCart(gid,0,0,1);
}

function gopen(i){
	var k_s = 1;
	k_s = i;
	var ohtml = $("#wrap").html();
	$("#wrapg").html(ohtml);
	$("#pbox").show();
	$("#mask").show();
}

function fbuy(gid){
	var wrap = $("#wrap");
	var lep = wrap.length;
	if (lep>0) {
		var clep=wrap.find(".hover").length;
		if(clep<1){
			gopen(0);
			return;
		}
	}
	addToCart(gid,0,0,0);
}
