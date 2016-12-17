 /**
  * 根地址
  * @returns {String}
  */
 var hostUrl = function () {
     return location.protocol + '//' + location.host;
 }
 
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
             
             $('form.home-search').on('submit',function(e){ //表单提交
            	 
            	 var wo = $('input[name=keyword]').val()
        	     if (wo == null || wo == "") {
        	        alert("请输入关键字");
        	        //return false;
        	     }
             })
             
             lazyload({
                 defObj: "#lazy"
             });
             
         },
         init: function () {
             home.index();
         }
 }
 
 jQuery(function () {
	 
     home.init();
 })