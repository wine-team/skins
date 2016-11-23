var v_h = $(window).height();
var v_w = $(window).width();
var page_h = document.domain;
var page_t = $(document).attr("title");
var kword = "";
var isIE6 = navigator.appVersion.indexOf("MSIE 6")>-1;
if( isIE6 ){
	document.execCommand("BackgroundImageCache",false,true);
}
var pez="top=100,left=100,width=890,height=615,location=yes,menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,toolbar=no";
(function($){
	var ajax=$.ajax;
	var pendingRequests={};
	var synced=[];
	var syncedData=[];
	$.ajax=function(settings){
		settings=jQuery.extend(settings,jQuery.extend({},jQuery.ajaxSettings,settings));
	    var port=settings.port;
	    switch(settings.mode){
	       case "abort":
	    	     if(pendingRequests[port]){
	    	    	 pendingRequests[port].abort();
	    	     }
	    	     return pendingRequests[port]=ajax.apply(this,arguments);
	    	 }
	    return ajax.apply(this,arguments);};})
(jQuery);

(function($){
	$.fn.vganload = function(options){
		
		 var dft = {author:"vganchou",timew:50,threshold:100};
		 var ops = $.extend(dft,options);
		 var mb  = this;
		 var m_l = mb.length;
		 var mlen = m_l;
		 var poll;
		 var tm_w = ops.timew;
		 var thre = ops.threshold;
		 var vlazy = {};
		 if( m_l<1 ){return;}
		 
		 function getClient(){
			 var l,t,w,h,
			 dd = document.documentElement,bb=document.body;
			 l = dd.scrollLeft||bb.scrollLeft;
			 t = dd.scrollTop||bb.scrollTop;
			 w = dd.clientWidth;
			 h = dd.clientHeight;
			 return{left:l,top:t,width:w,height:h}
		}
		 
		function getSubClient(p){
			var l=0,t=0,w,h;
			w = p.offsetWidth;
			h = p.offsetHeight;
			while(p.offsetParent){
				l += p.offsetLeft;
				t += p.offsetTop;
				p = p.offsetParent
			}
			return{left:l,top:t,width:w,height:h}
		}
		function intens(w,p){
			
			var lc1,lc2,tc1,tc2,w1,h1;
			lc1 = w.left+w.width/2;
			lc2 = p.left+p.width/2;
			tc1 = w.top+w.height/2;
			tc2 = p.top+p.height/2;
			w1 = (w.width+p.width)/2;
			h1 = (w.height+p.height)/2;
			return Math.abs(lc1-lc2)<w1+thre&&Math.abs(tc1-tc2)<h1+thre
		}
		var vbone = function(){
			clearTimeout(poll);
			poll = setTimeout(vlazy.render,tm_w)
		}; 
		$(window).bind("scroll",vbone).bind("resize",vbone);
		vlazy.detach = function(){
			$(window).unbind("scroll",vbone).unbind("resize",vbone);
			clearTimeout(poll);
		};
		vlazy.render=function(){
			
			if(mlen<1){
				 vlazy.detach();return
			}
			var prec1 = getClient();
			mb = mb.filter(function(){
				return $(this).attr("src2")
			});
			$.each(mb,function(){
				var b = $(this).attr("src2");
				if(b){
					var prec2 = getSubClient(this);
					var inv = intens(prec1,prec2);
					if(inv){
						$(this).attr("src",b).removeAttr("src2");
						mlen--;
					}
				}
			})
		};
		vlazy.render()
	}
})(jQuery);


function addcollect(){
	
	var ctrl=(navigator.userAgent.toLowerCase()).indexOf('mac')!=-1?'Command/Cmd':'CTRL';
	if(document.all)
	 {window.external.addFavorite('http://www.qu.cn','趣网商城')}
	else if(window.sidebar){
		window.sidebar.addPanel('趣网商城','http://www.qu.cn',"")
	}else{alert('您可以尝试通过快捷键'+ctrl+' + D 加入到收藏夹~')}
}

function obj2str(o){
	
	var r=[];
	if(typeof o=="string"){
		return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
	}
	if(typeof o=="undefined"){
		return "undefined";
	}
	if(typeof o=="object"){
		if(o===null){
			return "null";
		}else if(!o.sort){
			for(var i in o){
				if (i!="toJSONString"){
					r.push("\"" + i + "\"" + ":" + obj2str(o[i]));
				}
			}
			r="{"+r.join()+"}";
		  }else{
			  for(var i= 0;i<o.length;i++) 
				  r.push(obj2str(o[i]));r="["+r.join()+"]";
			}
		  return r;
	 }
	      return o.toString();

	}

function sendHashMail(){
	
	$.ajax({
		 url:'user.php?act=send_hash_mail',
		 type:'GET',
		 dataType:'json',
		 error:function(){alert('Error')},
		 success:function(data){
			 alert(data.message)
		 }
	})
}
  
function getradio(id){
	
	 var spec_arr = new Array();
	 var r_adio = $("#"+id).find("input[type='radio']:checked");
	 var r_len = r_adio.length;
	 if( r_len>0 ){
		 for(var i=0;i<r_len;i++){
			 spec_arr[i]=r_adio.eq(i).val();
		 }
	 }
	 return spec_arr;
}

var quval={
		
	 isMobile:function(s){
		 return this.test(s,/(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/)
	 },
	 isEmail:function(a){
		 var b ="^[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+@[-!#$%&'*+\\/0-9=?A-Z^_`a-z{|}~]+.[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+$";
		 return this.test(a, b);
     },
     isNumber:function(s,d){
    	 return !isNaN(s.nodeType==1?s.value:s)&&(!d||!this.test(s,"^-?[0-9]*\\.[0-9]*$"))
     },
     isEmpty:function(s){
    	 return !jQuery.isEmptyObject(s)
     },
     test:function(s,p){
    	 s=s.nodeType==1?s.value:s;
    	 return new RegExp(p).test(s)
     }
};

function addToCart(goodsId,parentId,one,isgo){
	
	var goods = new Object();
	var spec_arr = new Array();
	var fittings_arr = new Array();
	var number = 1;
	var formBuy = document.forms['ECS_FORMBUY'];
	var quick = 0;
	if(formBuy){
		spec_arr = getradio("wrap");
        if(formBuy.elements['number']){
    	   number = formBuy.elements['number'].value
    	}
        quick = 1
     }
	goods.quick = quick;
	goods.spec = spec_arr;
	goods.goods_id = goodsId;
	goods.number = number;
	goods.isgo = (isgo)?"1":"0";
	goods.parent = (typeof(parentId)=="undefined")?0:parseInt(parentId);
	$.post( 
			'/flow.php',
			{step:'add_to_cart',one:one,goods:obj2str(goods)},
			function(res){
				if(res.error>0){
					if(res.error==2){
						if(confirm(res.message)){
							alert("对不起该商品缺货，敬请等待...")
						}
					}else if(res.error==6){
						alert("请选择商品规格")
					}else{
						alert(res.message)
					}
				}else{
					if(isgo){
						qwToCart()
					}else{
						cart_url='/flow.php';
						location.href=cart_url
						}
				}
			},'JSON');}
function myklk(){
	$("#yqlk").css("height","auto");$("#yq_r").hide();
}
function pclose(){
	$("#pbox").hide();$("#mask").hide();
}

function addPackageToCart(packageId){
	var package_info = new Object();
	var number = 1;
	package_info.package_id = packageId;
	package_info.number = number;
    $.post( '/flow.php',
    		{step:'add_package_to_cart',package_info:obj2str(package_info)},
    		function(result){
               if(result.error > 0){
            	   if(result.error == 2){
            		    if(confirm(result.message)){
            		    	location.href='user.php?act=add_booking&id=' + result.goods_id;
            		    }
            		}else{
            			alert(result.message);
            			}
            	}else{
            		var cart_url ='/flow.php';
            		location.href = cart_url;
            		}
             },'JSON');}

function lgout(){  
	$.get( 'user.php',
		   {
	         act:'ajax_logout'
		   },
		   function(data){
			   if(data=="TRUE"){
				   location.reload();
				   }
		   },
		 'TEXT');
}

    var $bs_urls=$("base");
    var $yvv = $("#keywords");
	var $r_id=$("#s_box");
	var keyi=-1;
	var key_l=0;
	var keya;
	var qu_int=true;

	var $minbar = $("#minbar");
	var $minar = $("#minar");
	var $minarg = $("#minarg");
	
	var w_pin = false;
	var is_r = 0;
	var is_hi = false,is_carr = false;
	var rbtime;
	var $lnav = $("#lnav");
	var $lnavli = $lnav.children();
	var $hist = $("#rhist");
	
	
	


		
$yvv.bind("focus", 
    function() {
        var v=$(this).val();
        var preh=$(this).attr("data-w");
        if (v==preh) {
            $(this).val("");
			$(this).addClass("c3");
        }
		
    }).bind("blur", 
    function(){
        var v = $(this).val();
        var preh = $(this).attr("data-w");
        if(v == "") {
            $(this).val(preh);
			$(this).removeClass("c3");
        }
		 var h = setTimeout(function() {
            $r_id.hide();
			keyi=-1;
        },
        500);
    }).bind('keydown',function(e){
    	var key = e.which || e.keyCode || 0;
    	keya = $r_id.find("a");
    	key_l = keya.length-1;
    	var eqkey;
    	switch(key){
    		case 40:
    			keyi++;
    			if(keyi>key_l){
    				keyi=0;	
    			}
    			eqkey = keya.eq(keyi);
    			eqkey.addClass("on").siblings().removeClass("on");
    			$yvv.val(eqkey.text());
    			break;
    		case 38:
    			keyi--;
    			if(keyi<0){
    				keyi = key_l;
    			}
    			eqkey = keya.eq(keyi);
    			eqkey.addClass("on").siblings().removeClass("on");
    			$yvv.val(eqkey.text());
    			e.preventDefault();
    			e.stopPropagation();
    			break;
    	}
    }).bind("keyup",function(e) {
        var v = $(this).val().replace(/(^\s*)|(\s*$)/g, "");
		var key = e.which || e.keyCode || 0;
        if (v == "" || v == kword) {
            $r_id.hide();
            return;
        }
        if(key == 40 || key == 38){
            return;
        }
        var t = setTimeout(function(){
            $.ajax({
                url: 'search.php?act=q&w=' + v,
                type: 'GET',
                dataType: 'html',
                success: function(data) {
                    if (data != "") {
                        $r_id.show().html(data);
                        kword = v;
                    } else {
                        $r_id.hide()
                    }
                },
                mode: 'abort'
            });
        },
        500);
    });

$r_id.delegate("a","mouseenter",function(){
	$(this).addClass("on").siblings().removeClass("on");
	keyi=$(this).index();
});
	


	
function initbar(){
	clearTimeout(rbtime);
    rbtime=setTimeout(function(){
	v_w=$(window).width();
	if(v_w<1260){
		w_pin=true;
		$minbar.addClass("zpin");
	}else{
		 w_pin=false;
		 $minbar.removeClass("zpin");
	}
	if(qu_int){
		$minbar.removeClass("hid");
		qu_int=false;	
		}
	},200);
}
	
$minbar.bind("mouseenter",function(){
	if(w_pin){
		if(is_r==0){
			$minbar.removeClass("zpin");
			is_r=1;
		}
	}
});

$minbar.bind("mouseleave",function(){
	if(w_pin){
		if(is_r==1){	
			$minbar.addClass("zpin");
			is_r=0;	
		}
	}
});


$(window).bind("resize",initbar);

initbar();

$("img[src2]").vganload();

if(!navigator.cookieEnabled){
    $("body").prepend(
		 "<p style='background-color:#ffa627' class='alC lh30 c3 hand' onclick=\"window.open('http://www.qu.cn/article.php?id=877')\">您的浏览器禁用了cookie，会导致购物车、登录等操作异常,点击查看启用cookie操作步骤</p>"
	);
}

