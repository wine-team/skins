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

 $(document).ready(function(){

     //登录提交页面
     if ($('.normal-login').size() > 0) {
         $('.normal-login').submit(function(e) {
             e.preventDefault();
         }).validate({
             errorPlacement: function(e, el) {
                 if ($(el).hasClass('error')) {
                     if ($('#username').val() == '' && $('#password').val() == '' ) {
                         $(el).parents('.normal-login').find('.remind').children('p').text('请输入您的用户名');
                     } else {
                         $(el).parents('.normal-login').find('.remind').children('p').text(e.text());
                     }
                 }
             },
             success: function(e, el) {
                 if ($(el).hasClass('error')) {
                     $(el).parents('.normal-login').find('.remind').children('p').text('公共场所不建议自动登录，以防账号丢失');
                 }
             },
             rules: {
                 username: {
                     required: true,
                 },
                 password: {
                     required: true,
                     rangelength:[6,20]
                 },
             },
             messages: {
                 username: {
                     required: '请输入您的用户名',
                 },
                 password: {
                     required: '请输入您的密码',
                     rangelength: '密码长度只能在6-20位字符之间'
                 },
             },
             submitHandler: function(f) {
                 $.ajax({
                     type: 'post',
                     async: false,
                     dataType : 'json',
                     url: hostUrl()+'/pc/login/loginPost',
                     data: $('.login-form-validate').serialize(),
                     beforeSend: function() {
                         $('.d-login').text('正在登录...').attr('disabled', true);
                     },
                     success: function(json) {
                         if (json.status) {
                             window.location.href = json.messages;
                         } else {
                             $('.d-login').text('正在登录...').attr('disabled', true);
                             if (json.data >= 3) {
                                 $('.forget-form-account').css('display', 'block');
                                 if (!$('.d-captcha').val()) {
                                     $('.login-form-validate').find('.remind').children('p').text('必选字段');
                                 }
                             }
                             if (json.input == 'captcha') {
                                 $('.d-captcha').focus();
                             }
                             $('.login-form-validate').find('.remind').children('p').text(json.messages);
                             $('.d-login').animate({'top':'+=0'}, 200, function(){
                                 $(this).text('登 录').removeAttr('disabled');
                             });
                         }
                     }
                 });
                 return false;
             }
         });
     }

     /*注册提交*/
     if ($('.register-form-validate').size() > 0) {
         $('.register-form-validate').submit(function(e) {
             e.preventDefault();
         }).validate({
             rules: {
                 phone: {
                     required: true,
                     mobile:true,
                     remote: {
                         url:hostUrl()+'/pc/register/validatePhone',
                         type: 'post',
                         dataType: 'json',
                         data: {
                             phone:function(json) {
                                 return $('input[name=phone]').val();
                             }
                         }
                     }
                 },
                 password: {
                     required: true,
                     rangelength:[6,20]
                 },
                 confirm_password: {
                     required: true,
                     equalTo: '#password'
                 },
                 verify: {
                     required: true,
                     remote: {
                         url:hostUrl()+'/pc/register/validateVerify',
                         type: 'post',
                         dataType: 'json',
                         data: {
                             phone:function(json) {
                                 return $('input[name=phone]').val();
                             },
                             verify:function(json) {
                                 return $('input[name=verify]').val();
                             }
                         }
                     }
                 },
                 parent_id: {
                     remote: {
                         url:hostUrl()+'/pc/register/validateParentId',
                         type: 'post',
                         dataType: 'json',
                         data: {
                             username:function(json) {
                                 return $('input[name=parent_id]').val();
                             }
                         }
                     }
                 }
             },
             messages: {
                 phone: {
                     required: '请输入您的手机号码',
                     mobile: '手机号码格式有误',
                     remote: '手机号已注册'
                 },
                 password: {
                     required: '请输入您的密码',
                     rangelength: '密码长度只能在6-20位字符之间'
                 },
                 confirm_password: {
                     required: '请再次输入密码',
                     equalTo: '输入密码与原来不相同'
                 },
                 captcha: {
                     required: '请输入验证码',
                 },
                 verify: {
                     required: '请输入动态密码',
                     remote: '动态密码无效'
                 },
                 parent_id: {
                     remote: '当前推荐人无效'
                 }
             },
             submitHandler: function(f) {
                 $.ajax({
                     type: 'post',
                     async: false,
                     dataType : 'json',
                     url: hostUrl()+'/pc/register/doRegister',
                     data: $('.register-form-validate').serialize(),
                     beforeSend: function() {
                         $('button[type=submit]').text('正在注册...').attr('disabled', true);
                     },
                     success: function(json) {
                         if (json.status) {
                             window.location.href = json.messages;
                         } else {
                             alert(json.messages);
                             $('button[type=submit]').text('立即注册').removeAttr('disabled');
                         }
                     }
                 });
                 return false;
             }
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