$(function() {
    var form = layui.form

    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格！'
            ],
            samePwd: function(value) {
                var opwd = $('[name=oldPwd]').val()
                if (value === opwd) {
                    return '新密码不能与原密码相同！'
                }
            },
            rePwd: function(value) {

                if (value !== $('[name=newPwd]').val()) {
                    return '两次输入密码不一致！'
                }
            }
        })
        //监听form表单的post请求
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('重置密码失败！')
                }
                layer.msg('重置密码成功！')
                $('.layui-form')[0].reset()
            }
        })
    })

})