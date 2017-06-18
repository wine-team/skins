var home = {
		
	scroll:function(){
		var nav_top = 124;
		var has_nav = false;
		$(window).scroll(function(){
	         var ns_top = $(window).scrollTop();
			 if (ns_top>nav_top) {
			     if (!has_nav) {
			    	 $("#header-banner").hide();
			    	 $("#header-nav").addClass("has-fix").removeClass("has-top-fix");
			    	 $(".header-margin-fix").css({"padding-top":"124px"})
			    	 $(".nav-searchbox").show();
			         has_nav = true;
			     }
			 }else{
			     if (has_nav) {
			    	 $("#header-banner").show();
			    	 $("#header-nav").removeClass("has-fix").addClass("has-top-fix");
			    	 $(".header-margin-fix").css({"padding-top":"0px"})
			    	 $(".nav-searchbox").hide();
		             has_nav = false;
			     }
			 }
		});
	},
	init:function() {
		home.scroll();
	}
}
$(function(){
	home.init();
})