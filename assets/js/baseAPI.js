// 每次调用$.post 或$.get 或$.Ajax 的时候，会先调用ajaxPrefilter这个函式，在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);

})