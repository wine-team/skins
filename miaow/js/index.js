/**
 * 根地址
 * @returns {String}
 */
function hostUrl() {
	return location.protocol+'//'+location.host;
}

var home = {
		
		 'cartLoad':function(){
			 if ($('#tcar').size()>0) {
				 var cart_flag = 0;  //购物车状态位 
				 $("#tcar").hover(function() { //购物车效果 
						$(this).addClass("hv");
						if (cart_flag == 0) {
							$.ajax({
								url:hostUrl()+'/home/getCart',
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
							url:hostUrl()+'/home/getCart',
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
							  url:hostUrl()+'/home/getHistory',
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
		 
		 'search':function(){
			 			 
			 $('.simg').on('mouseenter','img',function(event){
			 	 var m = $(this).parents('.gl').find(".sbm");
			 	 var g = $(this).attr("data-s");
			 	 $(this).addClass("on").siblings("img").removeClass("on");
			 	 m.attr("src",g);
			 	 m.attr("data-original",g);
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
				 var did = Number($(this).attr("data-id")) - 2;
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
					 } else {
					 	if (has_nav) {
					 		$blnav.removeClass("ccat");
					 		$("#konav").hide();
					 		has_nav	= false;
					 	}
					 }
				});
			}
		 },
		 'goodsRecommed':function(type){
			 
			 var cat = $('.same-hot').attr('cat');
			 $.ajax({
				 type:'post',
				 data:{cat:cat},
				 dataType:'json',
				 url:hostUrl()+'/goods/getHot',
				 success:function(data){
					 $('.same-hot').html(data.same);
					 $('.all-hot').html(data.all);
				 }
			 })
		 },
		 'goodsDetail':function(){  //产品详情页
			
			 ajaxRecommend(1,$('.change').attr('from'));
			 
			 $('.goods-pic').delegate('li','mouseenter',function(){
			 	 var n = $(this).attr('data-src');
			 	 $(this).addClass('on').siblings('li').removeClass('on');
			 	 $('.goods-main-pic').attr('src',n);
		     });
			 
			 $('.region').delegate("li","click",function(){ // 地区
			 	 var i = $(this).index();
			 	 $(this).addClass("on").siblings().removeClass("on");
			 	 $("#pes_z").find(".pes_o").eq(i).removeClass('hid').siblings().addClass('hid');
		     });
			 
			 $('.goods-image').on('click','.hand',function(){// 收藏
				 
				 var _this = $(this);
				 var goods_id = $(this).attr('goods-id');
				 $.ajax({
					 type:'post',
					 data:{goods_id:goods_id},
					 dataType:'json',
					 url:hostUrl()+'/goods/enshrine',
					 success:function(data){
						 if(data.status){
							 layer.msg(data.message);
							 data.isShrine ?  _this.addClass('active') : _this.removeClass('active')
						 } else {
							 if(data.message.indexOf('passport')>-1){
								 $('.denglu').removeClass('hid');
			                     $('.mask').removeClass('hid');
							 } else {
								layer.msg(data.message);
							 }
						 }
					 }
				 })
			 });
			 
			 $('.gdl').on('click','.review-count',function(){
				 $('html, body').animate({scrollTop:$('.comment-type').offset().top-50},400);
			 });
			 
			 $('.kan').on('click','.change',function(e){ //查看更多
				   
				  var from = $(this).attr('from');
				  var pg = parseInt($(this).attr('pg')) + 1;
				  ajaxRecommend(pg,from);
				  e.preventDefault();
			 });
			 
			 if ($('.product-review').size()>0) {
				 
				   $.ajax({
			            type: 'get',
			            async: true,
			            dataType: 'json',
			            data: {goods_id: $('.goods-image .hand').attr('goods-id')},
			            url: hostUrl() + '/reviews/getReviews',
			            success: function (data) {
			                $('.product-review').html(data.html);
			            }
			       });
				   
				   $('.product-review').on('click', '.page a', function (eve) {
			            var url = $(this).attr('href');
			            $.ajax({
			                type: 'get',
			                async: true,
			                dataType: 'json',
			                url: url,
			                success: function (data) {
			                    $('.product-review').html(data.html);
			                    $('html, body').scrollTop($('.comment-type').offset().top-50);
			                }
			            });
			            eve.preventDefault();
			            return false;
			       });
			 }		 

			 $('.gdl .pes').hover(function(){ //头部样式效果
				 	$(this).addClass("pes_on");
			     },function(){
					$(this).removeClass("pes_on");
			 });
			 
			 $('.additive').delegate('.catt a','click',function(e){ //属性选择 
				 
				 $(this).parent().children('.spec').prop('checked',false);
				 $(this).addClass('hover').siblings('a').removeClass('hover');
				 $(this).children('.spec').prop('checked',true);
				 e.stopPropagation();
			 });
			 
			 $('.dx_tip').hover(function(){  // 短信订购
			 	 $('.dx_d').stop().fadeIn(200);
			  },function(){
			 	 $('.dx_d').stop().fadeOut(200);
			 });
			 
			 $('.jbars').delegate('li','click',function(e){  //滚动条的点击
				 var rel = $(this).attr('rel');
				 $(this).addClass('on').siblings('li').removeClass('on');
				 $('html, body').animate({scrollTop:$('#'+rel).offset().top-50},300);
				 e.stopPropagation();
		     });
			 
			 $(".comment-type").delegate("li","click",function(){ //评论筛选
			 	 
			 	 var cId = $(this).attr("data-id");
			 	 var c_s = $(this).attr("data-s");
			 	 var ctop = $("#comment").offset().top;
			     var hs = $(this).hasClass("on");
			     if (hs||c_s==0) {return;}
			     $(this).addClass("on").siblings().removeClass("on");
			     var wc_top = $(document).scrollTop();
		 		 if (wc_top>ctop) {
		 			$("html,body").animate({scrollTop:ctop},300)
		 		 }
			 });
			 
			 $('.glb').delegate('.nua','click',function(event){ //顶部 公用函数
				 $('html,body').stop().animate({scrollTop:'0px'},600);
				 event.preventDefault();
			 });
           
			 var jtop = $("#jbar").offset().top;
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
				 } else {
					 if (isf==1) {
						 $("#jbar").removeClass("dheng");
						 if (isIE6) {
							 $("#jbar").css("top","0");
						 }
					 }
					 isf = 0;
				 }
			 });
			 
			 if ($('.add_to_cart').size() > 0) { // 加入购物车
			        $('body').on('click', '.add_to_cart', function () {
			        	var spec = new Array();
			            var qty = parseInt($('.number').val());
			            var goods_id = $('.goods-image .hand').attr('goods-id');
			            $('.catt  input:checked').each(function(i){
			                spec[i] = $(this).val();
			            })
			            $.ajax({
			                type: 'get',
			                dataType: 'jsonp',
			                jsonCallback: 'jsonCallback',
			                url:  hostUrl() + '/home/addToCart',
			                data: {goods_id: goods_id, qty: qty,spec:spec},
			                success: function (data) {
			                	if (data.status == 0) {
			                		layer.msg(data.msg);
			                	}
			                	if (data.status == 1) {
			                        $('.denglu').removeClass('hid');
			                        $('.mask').removeClass('hid');
			                    } 
			                	if (data.status == 2) {
			                		$.ajax({
			                			type: 'post',
			                			url:  hostUrl() + '/home/getCartInfor',
			                			dataType : 'json',
			                			success : function(data) {
			                				if (data.status) {
			                					$('.tishi').removeClass('hid');
			                					$('.tishi .cat-infor').text('您的购物车中有'+data.num+'件商品，总计￥'+data.sum)
			                				}
			                			}
			                		})
			                	}
			                }
			            });
			        });
			    }
			 
			    if ($('.shopping-s-submit').size() > 0) { //商品详情-立即购买
			    	
			        $('body').on('click', '.shopping-s-submit', function () {
			        	
			        	var spec = new Array();
			            var qty = parseInt($('.number').val());
			            var goods_id = $('.goods-image .hand').attr('goods-id');
			            $('.catt  input:checked').each(function(i){
			                spec[i] = $(this).val();
			            })
			            $.ajax({
			                type: 'post',
			                async: false,
			                dataType: 'json',
			                url: hostUrl() + '/goods/purchase_confirm',
			                data: {qty: qty, goods_id: goods_id,spec:spec},
			                success: function (data) {
			                	if (data.status == 0) {
			                		layer.msg(data.msg);
			                	}
			                	if (data.status == 1) {
			                        $('.denglu').removeClass('hid');
			                        $('.mask').removeClass('hid');
			                    } 
			                	if (data.status == 2) {
			                		window.location.href=data.msg;
			                	}
			                }
			            });
			        });
			    }
			    
			    $('.denglu').on('click','.close',function(e){  //login close
			    	$('.denglu').addClass('hid');
			        $('.mask').addClass('hid');
			        e.stopPropagation();
			    })
			    
			    $('.tishi').on('click','.close',function(e){
			    	$('.tishi').addClass('hid');
			    	e.stopPropagation();
			    })
			    
			    $('.jba').on('click','.rbuy',function(e){
			    	$('.shopping-s-submit').trigger('click');
			    	e.stopPropagation();
			    })
			    
			    $('.p-list').on('click','li a',function(e){ //省 份
			    	 var region_name = $(this).text();
			    	 var region_id = $(this).attr('region-id');
			    	 $('.region .province').text(region_name);
			    	 $(this).parents('.p-list').addClass('hid').siblings('.c-list').removeClass('hid');
			    	 $('.region li').removeClass('on').eq(1).addClass('on');
			    	 home.ajaxRegion(region_id,'2','c-list');
			    })
			    
			    $('.c-list').on('click','li a',function(e){ //市 份
			    	
			    	 var region_name = $(this).text();
			    	 var region_id = $(this).attr('region-id');
			    	 $('.region .city').text(region_name);
			    	 $(this).parents('.c-list').addClass('hid').siblings('.a-list').removeClass('hid');
			    	 $('.region li').removeClass('on').eq(2).addClass('on');
			    	 home.ajaxRegion(region_id,'3','a-list');
			    })
			    
			    $('.a-list').on('click','li a',function(e){ //区份
			    	
			    	var region_name = $(this).text(),
			    	code = [
    						$('.province').text(),
    						$('.city').text()
    					],
    					name = '';
			    	if( code[0]===code[1] ){
    					name = code[0]+region_name;
    				}else{
    					name = code[0]+code[1]+region_name;
    				}
			    	$('.region .area').text(region_name);
			    	$('.gdl .pes').removeClass("pes_on");
			    	$('.address').text(name);
			    	ajaxFreight();
			    })
			    
			    if ($('.loginform').size() > 0) { //登录提交页面
			        $('.loginform').submit(function(e) {
			            e.preventDefault();
			        }).validate({
			            errorPlacement: function(e, el) {
			            	if ($(el).hasClass('error')) {
				            	if ($('#username').val() == '' && $('#password').val() == '' ) {
				            		$(el).parents('.loginform').find('.goods-error').removeClass('hid').text('请输入您的用户名');
				            	}else{
				            		$(el).parents('.loginform').find('.goods-error').removeClass('hid').text(e.text());
				            	}
			            	}
			            },
			            success: function(e, el) {
			                if ($(el).hasClass('error')) {
			                    $(el).parents('.loginform').find('.goods-error').addClass('hid');
			                }
			            },
			        	rules: {
			                 username: {
			                     required: true,
			                 },
			                 password: {
			                     required: true,
			                 },
			            },
			            messages: {
			                username: {
			                	required: '请输入您的用户名',
			                },
			                password: {
			                    required: '请输入您的密码',
			                },
			            },
			            submitHandler: function(f) {
			                $.ajax({
			                    type: 'post',
			                    async: false,
			                    dataType : 'json',
			                    url: hostUrl()+'/login/loginPost',
			                    data: $('.loginform').serialize(),
			                    beforeSend: function() {
			                        $('.d-login').val('正在登录').attr('disabled', true);
			                    },
			                    success: function(json) {
			                        if (json.status) {
			                            window.location.href = location.href;
			                        } else {
			                        	$('.loginform').find('.goods-error').removeClass('hid').text(json.messages);
			                        	$('.d-login').val('登 录').removeAttr('disabled');
			                        }
			                    }
			                });
			                return false;
			            }
			        });
			    }
			    
			    ajaxFreight()// 运费计算
		 },
		 
		 ajaxRegion : function(regionId,regionType,type){
         	$.ajax({
				type:'post',
				async:false,
		 		dataType:'json',
				data:{parent_id:regionId,region_type:regionType},
				url:hostUrl()+'/region/ajaxRegion',
				success:function(data){
					if( data.status ){
						$('.'+type).html(data.html);
					}
				}
			})
	     },

		 'initial':function(){
			 home.cartLoad();
			 home.headRightMenu();
			 home.search(); 
			 if (location.href.indexOf('detail')>-1) {
				 home.goodsDetail();
				 home.goodsRecommed();
			 }
			 if (location.href.indexOf('femal')>-1) {
				 home.goodsType();
			 }
			 $('img.lazy').lazyload();
		 }
}

jQuery(function(){
	home.initial();
})

var ac = 1;

function pnav(i){
	$("#pes_z").find(".pes_o").eq(i).show().siblings().hide();
}

function goodsQtyUpdate(kind, obj) {
    var qtyObj = obj.parents('.purchase').find('.number');
    var limit_num =  qtyObj.attr('limit-num');
    var n = qtyObj.attr('goods-num');
    var c = qtyObj.val();
    if (kind == "up") {
        c++;
    } else if (kind == "down") {
        if (c > 1) c--;
    }
    if (limit_num>0) {
    	if (c>limit_num) {
    		layer.msg('限购'+limit_num+'件');
    		c = limit_num ;
    	}
    } else{
    	if (c > n) {
            layer.msg('库存不足,只能购买'+n+'件');
            c = n;
        }
    }
    qtyObj.val(parseInt(c));
}
function goodsQtyChange(obj) {
	
    var c = obj.val();
    var n = obj.attr('goods-num');
    var limit_num =  obj.attr('limit-num');
    c = parseInt(c);
    n = parseInt(n);
    if (isNaN(c) || c==0) {
        c = 1;
    }
    if (limit_num>0) {
    	if (c>limit_num) {
    		layer.msg('限购'+limit_num+'件');
    		c = limit_num ;
    	}
    } else{
	    if (c > n) {
	    	layer.msg('库存不足,只能购买'+n+'件');
	        c = n;
	    }
    }
    obj.val(c);
}

function zom(obj){

	var mg = $(obj);
	var bg = mg.attr("data-b");
	var ia = mg.attr("data-n");
	var box = mg.parent().parent().find(".s_db");
	mg.toggleClass("on").siblings("img").removeClass("on");
	if(ia==0){
		box.hide();
		mg.attr("data-n","1").siblings("img").removeAttr("data-n");
	}else{
		box.html("<img src='"+bg+"' >").show();
		mg.attr("data-n","0").siblings("img").removeAttr("data-n");
	}
}

/**
 *计算运费
 */
function ajaxFreight(){
	
	var province = $.trim($('.province').text());
	var qty = $('input[name="number"]').val();
	var goodsId = $('.number').attr('goods-id');
	$.ajax({
		type:'post',
		async:false,
 		dataType:'json',
		data:{province:province,qty:qty,goods_id:goodsId},
		url:hostUrl()+'/goods/ajaxFreight',
		success:function(data){
			if (data.status) {
				$('.freight .cost').text(data.message);
			}
		}
	})
}

 /**
 * ajax 刷新推荐产品
 * @param pg
 * @param from
 */
function ajaxRecommend(pg,from) {
	
   $.ajax({
		 type:'post',
		 data:{from:from,pg:pg},
		 dataType:'json',
		 async:false,
		 url:hostUrl()+'/goods/ajaxMoreSee',
		 success:function(data){
			 if (data.status) {
				 $('.kan .change').attr('pg',data.pg);
				 $('.kan .recommend').html(data.html);
				 $('img.lazy').lazyload();
			 }
		 }
   })
}
