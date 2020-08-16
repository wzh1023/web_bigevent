$(function() {
    //点击去注册链接
    $('#link-reg').on('click', function() {
            $('.reg-Box').show()
            $('.login-Box').hide()
        })
        // 点击去登录链接
    $('#link-login').on('click', function() {
            $('.reg-Box').hide()
            $('.login-Box').show()
        })
        // 从layui中导入form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify（）函数自定义校验规则
    form.verify({
        // 自定义一个pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须为6-12位，且不能包含空格'],
        //自定义一个校对密码的规则
        repwd: function(value) {
            var pwd = $('.reg-Box [name=password]').val()
            if (pwd !== value) {
                return '两次输入密码不一致'
            }
        }
    })

    // 监听注册表单的提交请求
    $('#reg_Box').on('submit', function(e) {
        // 1.阻止默认提交行为
        e.preventDefault()
            //2.发起Ajax请求
        var data = {
            username: $('#reg_Box [name=username]').val(),
            password: $('#reg_Box [name=password]').val(),
        }
        $.post('/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功,请登录");
                //模拟鼠标点击登录事件
                $('#link-login').click()

            }
        )
    });
    //监听登录表单的提交请求
    $('#login_Box').submit(function(e) {
        //阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) { return layer.msg('登陆失败!') }
                layer.msg('登陆成功！')
                    // 将登录成功得到的token字符存储到localStorage中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'

            }
        })

    })
})