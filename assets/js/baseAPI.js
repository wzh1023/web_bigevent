// 每次调用$.post 或$.get 或$.Ajax 的时候，会先调用ajaxPrefilter这个函式，在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
        //统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my/') !== 0) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }

    }
    //全局统一挂载complete函数
    options.complete = function(res) {
        //在complete回调函数中，可以使用res.responseJOSN拿到在服务器相应回来的数据
        // console.log(res);

        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空token
            localStorage.removeItem('token')
                //强制跳转页面
            location.href = '/login.html'

        }


    }


})