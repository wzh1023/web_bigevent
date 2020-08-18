$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称必须在 1~6个字符之间！'
            }
        }
    })

    initUserInfo()
        //初始化用户的基本信息

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }
                // console.log(res);
                form.val('formUserInfo', res.data);
            }
        })
    }
    //重置表单数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    //监听表单提交事件，发起ajax请求
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败!')
                }
                layer.msg('更新用户信息成功！')

                window.parent.getUserInfo()
            }
        })
    })
})