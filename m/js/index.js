
 var home = {

     index: function () {

             var a_on = true;
             var hometop = $("#hometop");
             window.onscroll = function () {
                 var sTop = document.documentElement.scrollTop + document.body.scrollTop;
                 if (sTop > 100) {
                     if (a_on) {
                         hometop.removeClass("homehd");
                         a_on = false;
                     }
                 } else {
                     if (!a_on) {
                         hometop.addClass("homehd");
                         a_on = true;
                     }
                 }
             };

             $('.home-top').on('focus', '.t_sl', function (event) {

                 var w = $(this).attr("placeholder");
                 var v = $(this).val();
                 if (v == w) {
                     $(this).val("");
                 }
                 $('.sebg').show();
                 event.stopPropagation();
             });

             $('.home-top').on('blur', '.t_sl', function (event) {
                 setTimeout(function () {
                     $('.sebg').hide()
                 }, 500);
                 event.stopPropagation();
             });

             $('.sebg').on('click', '.right', function (event) {
                 $('.sebg').hide();
                 event.stopPropagation();
             });

             $(".hslider").vganswiper({
                 bi: 0.484
             });
             
         },
         
         catInit: function() {
        	 var wh = $(window).height();
 		     var th = $("#top").height();
 		     c_l.css("height", wh - th);
 		     c_r.css("height", wh - th);
 		     $(".category").css("height", wh)
         },
         
         category: function() {
        	 
        	var chongzhi = false;
    		var c_l = $("#c_l");
    		var c_r = $("#c_r");
    		var cbox = $("#cbox");
    		var cr = cbox.children();
    		var clp = $("#c_lul").children();

    		clp.click(function (e) {
    		    var i = $(this).attr("data-id");
    		    $(this).addClass("on").siblings().removeClass("on");
    		    var m = cr.eq(i);
    		    var mg = m.find("img[src]");
    		    if (mg.length > 0) {
    		        mg.each(function (index, element) {
    		            var u = $(this).attr("src");
    		            $(this).attr("src", u).removeAttr("src2");
    		        });
    		    }
    		    chongzhi = true;
    		    m.show().siblings().hide();
    		    cbox[0].style.MozTransform = cbox[0].style.webkitTransform = "translate3d(0,0,0)";
    		    cbox[0].style.msTransform = cbox[0].style.OTransform = "translateY(0)";
    		    e.preventDefault();
    		    e.stopPropagation();
    		});
    		$(window).resize(function () {
    			home.catInit();
    		});
    		c_l.vganvswiper();
    		c_r.vganvswiper({
    		    "cool": 1
    		});
         },
         
         init: function () {
             home.index();
             if (location.href.indexOf('category')>0) {
            	 home.category();
            	 home.catInit();
             }
         }
 }
 
jQuery(function () {
     home.init();
     lazy();
})