/**
 * 获取host域名
 * @returns
 */
function hostUrl() {
    return location.protocol+'//'+location.host;
}
$(document).ready(function(){
    if ($('.hover-trigger').size()>0) {
        $('.hover-trigger,.hover-accept').hover(function () {
            if ($(this).is('.hover-trigger')) {
                $(this).next('.hover-accept').show();
                $(this).addClass('hover-change');
            } else {
                 $(this).show();
                 $(this).prev('.hover-trigger').addClass('hover-change');
            }
        }, function () {
            if ($(this).is('.hover-trigger')) {
                $(this).next('.hover-accept').hide();
                $(this).removeClass('hover-change');
            } else {
                $(this).hide();
                $(this).prev('.hover-trigger').removeClass('hover-change');
            }
        });
    }

    //注册验证码
    if ($('#ajaxJsonCaptcha').size() > 0) {
        $('.forget-form-account').on('click', '#ajaxJsonCaptcha', function(){
            $.ajax({
                type: 'get',
                async: false,
                dataType : 'json',
                url: location.origin+'/forget/ajaxJsonCaptcha',
                success: function(json) {
                    $('#ajaxJsonCaptcha').html(json.image);
                }
            });
        });
    }
    
    if ($('.login').size()>0) { // 点击快捷和会员登陆的切换
        $('.login').on('click','.hd',function(){
            $('.normal-login').toggle();
            $('.quick-login').toggle();
        });
    }
    
    //登录验证码
    if ($('.ajaxJsonCaptcha').size() > 0) {
        $('.fast-login').on('click', '.ajaxJsonCaptcha', function(){
            $.ajax({
                type: 'get',
                async: false,
                dataType : 'json',
                url: location.origin+'/forget/ajaxJsonCaptcha',
                success: function(json) {
                    $('.ajaxJsonCaptcha').html(json.image);
                }
            });
        });
    }
    
    //注册页发送短信
    if ($('.btnsend').size() > 0) {
        $('.register-form-validate').on('click', '.btnsend', function(event){
            var obj = $(this);
            obj.attr('disabled', 'true');
            var phone = $.trim($('input[name=phone]').val());
            var captcha = $.trim($('input[name=captcha]').val());
            var mobile = /^1[34578]\d{9}$/
            if (!phone || !mobile.test(phone)) {
                if (!$('input[name=phone]').hasClass('error')) {
                    $('input[name=phone]').addClass('error').after('<label for="phone" class="error">手机号码格式有误</label>');
                } else {
                    $('input[name=phone]').focus();
                }
                obj.removeAttr('disabled');
                return;
            } else if( !captcha ) {
                if (!$('input[name=captcha]').hasClass('error')) {
                    $('input[name=captcha]').addClass('error').after('<label for="captcha" class="error">请输入验证码</label>');
                } else {
                    $('input[name=captcha]').focus();
                }
                obj.removeAttr('disabled');
                return;
            } else {
                $.ajax({
                    url:hostUrl()+'/register/checkPhone',
                    type:'post',
                    data:{phone:phone, captcha:captcha},
                    dataType:'json',
                    success:function(data) {
                        if (data.status) {
                            jump(obj, 60);
                        } else {
                            if (!$('input[name=captcha]').hasClass('error')) {
                                $('input[name=captcha]').next('label.error').text(data.messages).show();
                            } else {
                                $('input[name=captcha]').addClass('error').after('<label for="verify" class="error">'+data.messages+'</label>');
                            }
                            obj.removeAttr('disabled');
                        }
                    }
                });
            }
            event.preventDefault();
        });
    }
    
    //登录页发送短信
    if ($('.getpwd').size() > 0) {
        $('.fast-code').on('click', '.getpwd', function(event){
            var obj = $(this);
            obj.attr('disabled', 'true');
            var phone = $.trim($('input[name=phone]').val());
            var captcha = $.trim($('.e-captcha').val());
            var mobile = /^1[34578]\d{9}$/
            if (!phone || !mobile.test(phone)) {
                if (!$('input[name=phone]').hasClass('error')) {
                    $('input[name=phone]').parents('.quick-login').find('.remind').children('p').text('手机号码格式有误');
                }
                $('input[name=phone]').focus();
                obj.removeAttr('disabled');
                return false;
            }
            if( !captcha ) {
                if (!$('input[name=captcha]').hasClass('error')) {
                    $('input[name=phone]').parents('.quick-login').find('.remind').children('p').text('请输入验证码');
                } 
                $('input[name=captcha]').focus();
                obj.removeAttr('disabled');
                return false;
            }
            $.ajax({
                url:hostUrl()+'/login/checkPhone',
                type:'post',
                data:{phone:phone, captcha:captcha},
                dataType:'json',
                success:function(data) {
                    if (data.status) {
                        $('.quick-login').find('.remind').children('p').text('公共场所不建议自动登录，以防账号丢失');
                        jump(obj, 60);
                    } else {
                        $('input[name=phone]').parents('.quick-login').find('.remind').children('p').text(data.messages);
                        obj.removeAttr('disabled');
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
                        url:hostUrl()+'/register/validatePhone',
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
                        url:hostUrl()+'/register/validateVerify',
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
                        url:hostUrl()+'/register/validateParentId',
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
                    url: hostUrl()+'/register/doRegister',
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
    
    //登录提交页面
    if ($('.normal-login').size() > 0) {
        $('.normal-login').submit(function(e) {
            e.preventDefault();
        }).validate({
            errorPlacement: function(e, el) {
                if ($(el).hasClass('error')) {
                    if ($('#username').val() == '' && $('#password').val() == '' ) {
                        $(el).parents('.normal-login').find('.remind').children('p').text('请输入您的用户名');
                    }else{
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
                    url: hostUrl()+'/login/loginPost',
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
    
    //快速登录提交页
    if ($('.quick-login').size() > 0) {
        $('.quick-login').submit(function(e) {
            e.preventDefault();
        }).validate({
            errorPlacement: function(e, el) {
                if ($(el).hasClass('error')) {
                    if ($('#phone').val() == '' && $('#captcha').val() == '' && $('#verify').val() == '' ) {
                        $(el).parents('.quick-login').find('.remind').children('p').text('请输入您的手机号码');
                    }else if ($('#captcha').val() == '' && $('#verify').val() == '' ){
                        $(el).parents('.quick-login').find('.remind').children('p').text('请输入验证码');
                    }else {
                        $(el).parents('.quick-login').find('.remind').children('p').text(e.text());
                    }
                }
            },
            success: function(e, el) {
                if ($(el).hasClass('error')) {
                    $(el).parents('.quick-login').find('.remind').children('p').text('公共场所不建议自动登录，以防账号丢失');
                }
            },
            rules: {
                phone: {
                    required: true,
                },
                captcha: {
                    required: true
                },
                verify: {
                    required: true,
                },
            },
            messages: {
                phone: {
                    required: '请输入您的手机号码',
                },
                captcha: {
                    required: '请输入验证码',
                },
                verify: {
                    required: '请输入动态密码',
                },
            },
            submitHandler: function(f) {
                $.ajax({
                    type: 'post',
                    async: false,
                    dataType : 'json',
                    url: hostUrl()+'/login/loginPost',
                    data: $('.quick-login').serialize(),
                    beforeSend: function() {
                        $('.e-login').text('正在登录...').attr('disabled', true);
                    },
                    success: function(json) {
                        if (json.status) {
                            window.location.href = json.messages;
                        } else {
                            $('.quick-login').find('.remind').children('p').text(json.messages);
                            $('button[type=submit]').text('登 录').removeAttr('disabled');
                        }
                    }
                });
                return false;
            }
        });
    }
    
    //填写账户名提交页面
    if ($('.forget-form-account').size() > 0) {
        $('.forget-form-account').submit(function(e) {
            e.preventDefault();
        }).validate({
            errorPlacement: function(e, el) {
                $(el).next().text(e.text());
            },
            success: function(e, el) {
                $(el).next().text(e.text());
            },
            submitHandler: function(f) {
                $.ajax({
                    type: 'post',
                    async: false,
                    dataType : 'json',
                    url: hostUrl()+'/forget/alidateUser',
                    data: $('.forget-form-account').serialize(),
                    beforeSend: function() {
                        $('button[type=submit]').text('加载中...').attr('disabled', true);
                    },
                    success: function(json) {
                        if (json.status) {
                            window.location.href = json.messages;
                        } else {
                            alert(json.messages);
                            $('button[type=submit]').text('下一步').removeAttr('disabled');
                        }
                    }
                });
                return false;
            }
        });
    }
    
    //找回密码操作
    if ($('.forget-form-mobile').size() > 0) {
        $('.forget-form-mobile').on('click', '.btnsend', function(event){
            var obj = $(this);
            obj.attr('disabled', 'true');
            $.ajax({
                url:hostUrl()+'/forget/checkPhone',
                type:'post',
                data:{phone:$('button.btnsend').attr('data-attr')},
                dataType:'json',
                success:function(data) {
                    if (data.status) {
                        jump(obj, 60);
                    } else {
                        if (!$('input[name=verify]').hasClass('error')) {
                            $('input[name=verify]').next('span.error').text(data.message);
                        } else {
                            $('input[name=verify]').addClass('error').after('<span class="error">'+data.message+'</span>');
                        }
                    }
                }
            });
            event.preventDefault();
        });
        
        $('.forget-form-mobile').submit(function(e) {
            e.preventDefault();
        }).validate({
            errorPlacement: function(e, el) {
                $(el).next().text(e.text());
            },
            success: function(e, el) {
                $(el).next().text(e.text());
            },
            submitHandler: function(f) {
                $.ajax({
                    type: 'post',
                    async: false,
                    dataType : 'json',
                    url: hostUrl()+'/forget/confirmValidate',
                    data: {username:$('input[name=username]').val(), verify:$('input[name=verify]').val(), phone:$('button.btnsend').attr('data-attr')},
                    beforeSend: function() {
                        $('button[type=submit]').text('加载中...').attr('disabled', true);
                    },
                    success: function(json) {
                        if (json.status) {
                            window.location.href = json.messages;
                        } else {
                            alert(json.messages);
                            $('button[type=submit]').text('下一步').removeAttr('disabled');
                        }
                    }
                });
                return false;
            }
        });
    }
    
    //修改密码操作
    if ($('.forget-modify-password').size() > 0) {
        $('.forget-modify-password').submit(function(e) {
            e.preventDefault();
        }).validate({
            rules: {
                password: {
                    minlength: 6,
                    required: true
                },
                confirm_password: {
                    required: true,
                    equalTo: '#password'
                }
            },
            messages: {
                password: {
                    required: '请输入您的密码',
                    minlength: '密码长度不能少于6位字符'
                },
                confirm_password: {
                    required: '请再次输入密码',
                    equalTo: '输入密码与原来不相同'
                }
            },
            errorPlacement: function(e, el) {
                $(el).next().text(e.text());
            },
            success: function(e, el) {
                $(el).next().text(e.text());
            },
            submitHandler: function(f) {
                $.ajax({
                    type: 'post',
                    async: false,
                    dataType : 'json',
                    url: hostUrl()+'/forget/modifyValidate',
                    data: $('.forget-modify-password').serialize(),
                    beforeSend: function() {
                        $('button[type=submit]').text('加载中...').attr('disabled', true);
                    },
                    success: function(json) {
                        if (json.status) {
                            window.location.href = json.messages;
                        } else {
                            alert(json.messages);
                            $('button[type=submit]').text('修改密码').removeAttr('disabled');
                        }
                    }
                });
                return false;
            }
        });
    }
});