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

 var validEmail = function (email){
     var reg = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
     return reg.test(email);
 }

 var alertMessage = function (msg) {
     if ($('#timing-msg').size() == 0) {
         var tag = '<div class="am-modal am-modal-no-btn pahod-alert am-modal-active" tabindex="-1" id="timing-msg">' + msg + '</div>';
         $('body').append(tag);
     }
     setTimeout(function () {
         $('#timing-msg').remove();
     }, 2000);
 }

 var myalert = function (msg) {
     $('#my-alert').remove();
     var confirm = arguments[1] ? arguments[1] : '知道了';
     var tag = '<div class="alert-explain am-modal" tabindex="-1" id="my-alert"><p>' + msg + '</p><div class="am-modal-footer"><span class="am-modal-btn">' + confirm + '</span></div></div>';
     $('body').append(tag);
     $('#my-alert').modal({'closeViaDimmer': false});
 }

 $(document).ready(function(){
     //登录提交页面
     if ($('#login').size() > 0) {
         $('#login').submit(function(e) {
             var verify = $.trim($('input[name=verify]').val());
             var username = $.trim($('input[name=username]').val());
             var password = $.trim($('input[name=password]').val());
             if (!validMobile(username) || !validEmail(username)) {
                 alertMessage('请输入手机号或邮箱');
                 return;
             }
             if (!password) {
                 alertMessage('请输入密码');
                 return;
             }
             if (password.length < 6 || password.length > 18) {
                 alertMessage('密码为6-18位数字和字母组合');
                 return;
             }
             
             $.ajax({
                 type: 'POST',
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
             e.preventDefault();
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