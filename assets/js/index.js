$(function() {
    // 获取用户基本信息,调用getUserInfo函数
    getUserInfo()
        // 点击退出按钮的提示框
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
                // 2.重新跳转到登陆页面
            location.href = '/login.html'

            layer.close(index); //关闭layer提示框
        });
    })

})

//获取用户基本信息的函数
function getUserInfo() {
    $.ajax({
        method: "get",
        url: "/my/userinfo",
        // headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用渲染用户头像函数
            renderAvater(res.data)
        },
        // complete: function(res) {
        //     console.log(res);

        //     //在complete回调函数中，可以使用res.responseJOSN拿到在服务器相应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //强制清空token
        //         localStorage.removeItem('token')
        //             //强制跳转页面
        //         location.href = '/login.html'

        //     }


        // }
    })
}
//渲染用户头像函数
function renderAvater(user) {
    // 1.获取用户昵称
    var name = user.nickname || user.username
        // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
        // 3.渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        //渲染文本头像
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
        $('.layui-nav-img').hide()
    }
}