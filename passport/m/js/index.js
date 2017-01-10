 /**
  * 根地址
  * @returns {String}
  */
 var hostUrl = function () {
     return location.protocol + '//' + location.host;
 }

 /**
  * 返回历史记录上一页，如果没有则指定返回页面
  * @param redirect 指定返回页面
  */
 var goback = function (redirect) {
     if (history.length > 1) {
         javascript:history.go(-1);
     } else {
         window.location.href = redirect;
     }
 }

 var validMobile = function (tel) {
     var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
     return reg.test(tel);
 }

 var validEmail = function (email) {
     var reg = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
     return reg.test(email);
 }

 $(document).ready(function(){
     //登录提交页面
     if ($('form.login').size() > 0) {
         $('form.login').submit(function(event) {
             //var verify = $.trim($('input[name=verify]').val());
             var username = $.trim($('input[name=username]').val());
             var password = $.trim($('input[name=password]').val());
             if (!username) {
                 layer.msg('请输入手机号或邮箱', {time: 1000});
                 return false;
             }
             if (!validMobile(username) && !validEmail(password)) {
                 layer.msg('手机号或邮箱格式不对', {time: 1000});
                 return false;
             }
             if (!password) {
                 layer.msg('请输入密码', {time: 1000});
                 return false;
             }
             if (password.length < 6 || password.length > 18) {
                 layer.msg('密码为6-18位数字和字母组合', {time: 1000});
                 return false;
             }
             $(this).ajaxSubmit({
                 type: 'post',
                 async: false,
                 dataType : 'json',
                 url: hostUrl()+'/m/login/loginPost',
                 data: $('#login').serialize(),
                 beforeSend: function() {
                     $('[type=submit]').text('正在登录...').attr('disabled', true);
                 },
                 success: function(json) {
                     if (json.status) {
                         window.location.href = json.messages;
                     } else {
                         $('[type=submit]').text('登 录').removeAttr('disabled');
                     }
                 }
             });
             event.preventDefault();
         });
     }

     /*注册提交*/
     if ($('form.register').size() > 0) {
         $('form.register').submit(function(event) {
             //var verify = $.trim($('input[name=verify]').val());
             var username = $.trim($('input[name=username]').val());
             var password = $.trim($('input[name=password]').val());
             if (!username) {
                 layer.msg('请输入手机号或邮箱', {time: 1000});
                 return false;
             }
             if (!validMobile(username) && !validEmail(password)) {
                 layer.msg('手机号或邮箱格式不对', {time: 1000});
                 return false;
             }
             if (!password) {
                 layer.msg('请输入密码', {time: 1000});
                 return false;
             }
             if (password.length < 6 || password.length > 18) {
                 layer.msg('密码为6-18位数字和字母组合', {time: 1000});
                 return false;
             }
             $(this).ajaxSubmit({
                 type: 'post',
                 async: false,
                 dataType : 'json',
                 url: hostUrl()+'/m/register/doRegister',
                 data: $('#login').serialize(),
                 beforeSend: function() {
                     $('[type=submit]').text('正在注册...').attr('disabled', true);
                 },
                 success: function(json) {
                     if (json.status) {
                         window.location.href = json.messages;
                     } else {
                         $('[type=submit]').text('注 册').removeAttr('disabled');
                     }
                 }
             });
             event.preventDefault();
         });
     }

     function jump(obj, count) {
         obj.text(count+'秒');
         window.setTimeout(function(){
             count--;
             if(count > 0) {
                 obj.text(count+'秒');
                 jump(obj, count);
             } else {
                 obj.text('重新发送').removeAttr('disabled');
             }
         }, 1000);
     }
 });