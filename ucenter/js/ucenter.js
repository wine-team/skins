/**
 * 
 */
var ucenter = {// 首页js
		'images_url':function(){
			return 'http://images.localhost/';
		},
		'getMaybeLike':function(){
			if ($('.ubgw .dn_aw').size() > 0) {
				$.post(url()+'/Ucenter/get_maybe_like', {}, function(json){
					if(json.length>0) {
						var cont = '';
						for(var i=0;i<json.length;i++) {
							cont += '<a class="dn_au" title="'+json[i].goods_name+'" target="_blank" href="'+json[i].goods_id+'">';
							var img_arr = json[i].goods_img.split('|'); 
							cont += '<img width="200" height="200" src="'+images_url()+img_arr[0]+''+'">';
							cont += '<p>'+json[i].goods_name+'</p>';
							cont += '<p class="xj"> ¥145.04</p>';
							cont += '</a>';
						}
						$('.ubgw .dn_aw').html(cont);
					} else {
						$('.ubgw .dn_aw').html('您还未浏览过任何产品，<a target="_blank" href="http://miaow.localhost/">马上去逛逛</a>');
					}
				}, 'json');
			}
		},
		
		initial:function(){
			ucenter.getMaybeLike();
		}
}

jQuery(function(){
	ucenter.initial();
})