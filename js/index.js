$(function () {

//判断是否有登陆缓存
    if($.cookie('user'))
    {
        $("#login,#reg").hide();
        $("#user_name,#logout").show();
        $("#user_name").html($.cookie('user'));
    }
    else
    {
        $("#login,#reg").show();
        $("#user_name,#logout").hide();
        $("#user_name").html('用户');
    }




    //确定本地时间
    var time=new Date();
    var time_num=Math.floor(time.getHours()/4);
    //确定折扣时间范围
    if(time_num<2)
        $("#time1").css("color","red");
    else if(time_num<3)
        $("#time2").css("color","red");
    else if(time_num<4)
        $("#time3").css("color","red");
    else if(time_num<5)
        $("#time4").css("color","red");
    else
        $("#time5").css("color","red");




    //注册页面控制以及注册ajax
    $('.reg').dialog({
        autoOpen:false,
        modal:true,
        resizable:false,
        buttons: {
            '提交': function () {
                if($("#reg_yzm").val()==$(".reg_yzm_num").html())
                {
                    $.ajax({
                        url:'',
                        type:'POST',
                        data:{
                            user:$("#user").val(),
                            pass:$("#pass").val(),
                            email:$("#email").val(),
                            birthday:$("#birthday").val(),
                        },
                        success:function () {
                            alert("注册成功！");
                        },
                        error:function () {
                            alert("注册失败！");
                        }

                    })

                }
                else
                {
                    alert("验证码输入错误！");
                    $(".reg_yzm_num").html(random_num());
                }

            }
        } });

    //邮箱自动补全
    $("#email").autocomplete({
        delay:0,
        source:function (request,response) {
            var hosts=['163.com','qq.com','sina.com','gmail.com ','sohu.com'],
                term=request.term,
                name=term,//邮箱名
                ix=term.indexOf('@'),//@的位置
                host='',//邮箱后缀名
                result=[];//最后返回的正确邮箱格式
            if(ix>-1)
            {
                name=term.slice(0,ix);
                host=term.slice(ix+1);
            }
            if(name)
            {
                var findHost=[];
                if(host)
                {
                    findHost= $.grep(hosts,function (value,index) {
                        return value.indexOf(host)>-1;
                    })
                }
                else
                    findHost=hosts;
            }
            var findResult=$.map(findHost,function (value,index) {
                return name+'@'+value;
            })
            result=findResult;
            response(result);
        }
    })


    //登陆页面控制以及登陆ajax
    $('.login').dialog({
        autoOpen:false,
        modal:true,
        resizable:false,
        buttons:{
            '登陆':function () {
                if($("#login_yzm").val()==$(".reg_yzm_num").html())
                {
                    $.ajax({
                        url:'add.php',
                        type:'POST',
                        data: {
                            user: $("#login_user").val(),
                            pass: $("#login_pass").val(),
                        },
                        success:function () {
                            $.cookie('user',$("#login_user").val());
                            $("#login,#reg").hide();
                            $("#user_name,#logout").show();
                            $("#user_name").html($.cookie('user'));

                        },
                        error:function () {
                            alert("用户名或密码错误！")
                        }
                    })

                }
                else{
                    alert("验证码输入错误！");
                    $(".reg_yzm_num").html(random_num());
                }

            }
        }

    });


    //退出
    $("#logout").click(function () {
        $.removeCookie('user');
        $("#login,#reg").show();
        $("#user_name,#logout").hide();
        $("#user_name").html("用户");
    })


    $(".reg_p input[title]").tooltip;


    //历史订单
    $("#his_order").dialog({
        autoOpen:false,
        modal:true,
        resizable:false,
    })
    $(".nav_bg_gwc_2").click(function () {
        $("#his_order").dialog('open');
    })


    //联系客服
    $("#contact_service_con").dialog({
        autoOpen:false,
        modal:true,
        resizable:false,
        buttons:{
            '提交':function () {

                $.ajax({
                    url:'',
                    type:'POST',
                    data:{
                        question_num:$("#question").val(),
                        question_dec:$('#question_dec').val(),
                    },
                    success:function () {
                        alert("问题提交成功，客服处理完毕后将与您联系");
                    },
                    error:function () {
                        alert("问题提交失败，请稍后再试！");
                    }
                })
            }
        },
    })
    $("#contact_service").click(function () {
        $("#contact_service_con").dialog("open");
    })







    //登陆注册按钮事件
    $('#login').click(function () {
        $('.login').dialog('open');
    })
    $('#reg').click(function () {
        $('.reg').dialog('open');
    })
    $("#reg_button").button();
    $("#login_button").button();
    $("#nav_search").button();


    //获取验证码
    function random_num() {
        var random_num=Math.floor(10000*Math.random());
        if(random_num>1000)
            return random_num;
        else
            random_num();
    }
    $(".reg_yzm_num").html(random_num());
    $(".reg_yzm").click(function () {
        $(".reg_yzm_num").html(random_num());

    })





    //图书搜索
    $("#nav_search").click(function () {
        var sbook=$(".nav_bg_search_ipt").val();
        $.ajax({
            url:'',
            type:'',
            data:{
                bookname:sbook,
            },
            success:function () {

            },
            error:function () {
                alert("你搜索的书籍为"+sbook+",但未连接数据库");
            }
        })
    })














//设置自动切图
    //=========设置参数==========
    //图片统一高度：
    var images_height = '350px';
    //图片路径/链接(数组形式):
    var images_url = [
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg'
    ];
    var images_count = images_url.length;
    //console.log(images_count);

    //创建节点
    //图片列表节点
    for(var j=0;j<images_count+1;j++){
        $('.banner ul').append('<li></li>')
    }
    //轮播圆点按钮节点
    for(var j=0;j<images_count;j++){//几张图几点轮播圆点
        if(j==0){
            $('.banner ol').append('<li class="current"></li>')
        }else{
            $('.banner ol').append('<li></li>')
        }
    }



    //载入图片
    $('.banner ul li').css('background-image','url('+images_url[0]+')');
    $.each(images_url,function(key,value){
        $('.banner ul li').eq(key).css('background-image','url('+value+')');
    });

    $('.banner').css('height',images_height);

    $('.banner ul').css('width',(images_count+1)*100+'%');

    $('.banner ol').css('width',images_count*20+'px');
    $('.banner ol').css('margin-left',-images_count*20*0.5-10+'px');

    //=========================

    var num = 0;
    //获取窗口宽度
    var window_width = $(window).width()-719;
    $(window).resize(function(){
        //window_width = $(window).width();
        // $('.banner ul li').css({width:window_width});
        clearInterval(timer);
        nextPlay();
        timer = setInterval(nextPlay,2000);
    });
    //console.log(window_width);
    $('.banner ul li').width(window_width);
    //轮播圆点
    $('.banner ol li').mouseover(function(){
        $(this).addClass('current').siblings().removeClass('current');
        //第一张图： 0 * window_width
        //第二张图： 1 * window_width
        //第三张图： 2 * window_width
        //获取当前编号
        var i = $(this).index();
        //console.log(i);
        $('.banner ul').stop().animate({left:-i*window_width},500);
        num = i;
    });
    //自动播放
    var timer = null;
    function prevPlay(){
        num--;
        if(num<0){
            //悄悄把图片跳到最后一张图(复制页,与第一张图相同),然后做出图片播放动画，left参数是定位而不是移动的长度
            $('.banner ul').css({left:-window_width*images_count}).stop().animate({left:-window_width*(images_count-1)},500);
            num=images_count-1;
        }else{
            //console.log(num);
            $('.banner ul').stop().animate({left:-num*window_width},500);
        }
        if(num==images_count-1){
            $('.banner ol li').eq(images_count-1).addClass('current').siblings().removeClass('current');
        }else{
            $('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');

        }
    }
    function nextPlay(){
        num++;
        if(num>images_count){
            //播放到最后一张(复制页)后,悄悄地把图片跳到第一张,因为和第一张相同,所以难以发觉,
            $('.banner ul').css({left:0}).stop().animate({left:-window_width},500);
            //css({left:0})是直接悄悄改变位置，animate({left:-window_width},500)是做出移动动画
            //随后要把指针指向第二张图片,表示已经播放至第二张了。
            num=1;
        }else{
            //在最后面加入一张和第一张相同的图片，如果播放到最后一张，继续往下播，悄悄回到第一张(肉眼看不见)，从第一张播放到第二张
            //console.log(num);
            $('.banner ul').stop().animate({left:-num*window_width},500);
        }
        if(num==images_count){
            $('.banner ol li').eq(0).addClass('current').siblings().removeClass('current');
        }else{
            $('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');

        }
    }
    timer = setInterval(nextPlay,2000);
    //鼠标经过banner，停止定时器,离开则继续播放
    $('.banner').mouseenter(function(){
        clearInterval(timer);
        //左右箭头显示(淡入)
        $('.banner i').fadeIn();
    }).mouseleave(function(){
        timer = setInterval(nextPlay,2000);
        //左右箭头隐藏(淡出)
        $('.banner i').fadeOut();
    });
    //播放下一张
    $('.banner .right').click(function(){
        nextPlay();
    });
    //返回上一张
    $('.banner .left').click(function(){
        prevPlay();
    })









})