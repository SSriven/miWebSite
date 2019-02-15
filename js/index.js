(function () {
    //1.页眉购物车特效
    shopCar();

    //2.搜索特效
    search();

    //3.导航选项卡特效
    headNavTab();


    //4.轮播图特效
    sliderAutoPlay();
    
    //5.闪购倒计时
    countDown();

    //6.小米闪购轮播图
    shanShopPlay();

})();

/**
 * 页眉购物车特效
 */
function shopCar() {
    var shopCar = $("#header_shoppingCar");
    var shopDetials = $("#shoppingDetials");
    var flag1 = false,flag2 = false;
    shopCar.onmouseover = function () {
        flag1 = true;
        isShow();
    };
    shopCar.onmouseout = function () {
        flag1 = false;
        isShow();
    };
    shopDetials.onmouseover = function () {
        flag2 = true;
        isShow();
    };
    shopDetials.onmouseout = function () {
        flag2 = false;
        isShow();
    };

    function isShow() {
        //只有当鼠标在购物车上时才显示出来
        if(flag1 || flag2){
            setStyle(shopCar,"background","#fff");
            setStyle(shopCar,"color","#ff6700");
            buffer(shopDetials,{height:100});
        }else{
            setStyle(shopCar,"background","#424242");
            setStyle(shopCar,"color","#b0b0b0");
            buffer(shopDetials,{height:0});
        }
    }
}

/**
 * 搜索特效
 */
function search() {
    var head_nav_search = $("#head_nav_search");
    var search = $("#search");
    var lable_search = $("#lable_search");
    var lable = $("#lable");
    var flag = true;
    head_nav_search.onmouseover = function () {
        if(flag){
            setStyle(search,"border-color","#444");
            setStyle(lable_search,"border-color","#444");
        }

    };
    head_nav_search.onmouseout = function () {
        if(flag){
            setStyle(search,"border-color","#e0e0e0");
            setStyle(lable_search,"border-color","#e0e0e0");
        }

    };
    lable.children[0].onmouseover = function () {
        setStyle(this,"background","#ff6700");
        setStyle(this,"color","#fff")

    };
    lable.children[0].onmouseout = function () {
        setStyle(this,"background","#eee");
        setStyle(this,"color","#757575");

    };
    lable.children[1].onmouseover = function () {
        setStyle(this,"background","#ff6700");
        setStyle(this,"color","#fff")

    };
    lable.children[1].onmouseout = function () {
        setStyle(this,"background","#eee");
        setStyle(this,"color","#757575");


    };
    search.onmousedown = function () {
        this.focus();
        // buffer(lable,{opacity:0});
    };
    search.onfocus = function () {
        setStyle(this,"border-color","#ff6700");
        setStyle(lable_search,"border-color","#ff6700");
        buffer(lable,{opacity:0},null);
        setTimeout(function () {
            setStyle(lable,"display","none");
        },100);
        flag = false;
    };
    search.onblur = function () {
        setStyle(lable,"display","block");
        setStyle(this,"border-color","#e0e0e0");
        setStyle(lable_search,"border-color","#e0e0e0");
        buffer(lable,{opacity:1},null);
        flag = true;
    };
}

/**
 * 导航选项卡特效
 */
function headNavTab() {
    var nav_ulLis = $(".nav-ul-li");
    var nav_uls = $(".head-nav-tab-content-ul");
    var head_nav_tab = $("#head_nav_tab");
    var lastone = 0;
    var navIsOnmouseover = false,tabIsOnmouseover = false;
    for(var i = 0; i < nav_ulLis.length; i++){
        (function (index) {
            nav_ulLis[index].onmouseover = function () {
                setStyle(this.children[0],"color","#ff6700");
                if(index < nav_ulLis.length-2){
                    navIsOnmouseover = true;
                    setStyle(nav_uls[lastone],"display","none");
                    setStyle(nav_uls[index],"display","block");
                    lastone = index;
                }else{
                    navIsOnmouseover = false;
                }
                isUpOrDpwn();
            };
            nav_ulLis[index].onmouseout = function () {
                setStyle(this.children[0],"color","#333");
                navIsOnmouseover = false;
                isUpOrDpwn();
            };
            head_nav_tab.onmouseover = function () {
                tabIsOnmouseover = true;
                isUpOrDpwn();
            };
            head_nav_tab.onmouseout = function () {
                tabIsOnmouseover = false;
                isUpOrDpwn();
            };

        })(i);
    }
    /**
     * 判断选项卡是否出现
     */
    function isUpOrDpwn() {
        var timer1 = null,timer2 = null;
        if(navIsOnmouseover || tabIsOnmouseover){
            clearTimeout(timer1);
            timer1 = setTimeout(function () {
                setStyle(head_nav_tab,"box-shadow","0 3px 4px rgba(0,0,0,0.18)");
                setStyle(head_nav_tab,"border-top","1px solid #e0e0e0");
                buffer(head_nav_tab,{height:229},null);
            },200);
        }else{
            clearTimeout(timer2);
            timer2 = setTimeout(function () {
                setStyle(head_nav_tab,"box-shadow","none");
                setStyle(head_nav_tab,"border-top","none");
                buffer(head_nav_tab,{height:0},null);
            },200);
        }
    }
}

/**
 * 自动轮播
 */
function sliderAutoPlay() {
    //1.获取需要的标签
    var slider_img = $("#slider_img");
    var sliderImgs = slider_img.children;
    var slider_prev = $("#slider_prev");
    var slider_next = $("#slider_next");
    var slider_point = $("#slider_point");
    //2.创建指示点
    var ul,li;
    ul = document.createElement("ul");
    slider_point.appendChild(ul);
    for(var j = 0; j < sliderImgs.length; j++){
        li = document.createElement("li");
        li.className = "pointer";
        ul.appendChild(li);
    }
    var pointerLis = ul.children; //获取所有的指示点标签
    pointerLis[0].className += " current";//默认第一个被选中
    var currentIndex = 0;//当前图片和指示点的下标
    var lastone = 0;//上一个指示点和图片的下标
    var sliderTimer = null;//定时器变量

    //首先把所有图片的透明度置为0
    for(var i = 0; i < sliderImgs.length; i++){
        var img = sliderImgs[i];
        buffer(img,{opacity:0},null);
    }
    //将第一张图片显示
    buffer(sliderImgs[0],{opacity:1},null);
    //开启定时器无限自动播放
    sliderTimer = setInterval(autoPlay,4000);

    //监听指示点的点击事件
    for(var k = 0; k < pointerLis.length; k++){
        (function (index) {
            //监听指示点的点击事件
            pointerLis[index].onclick = function () {
                pointerLis[lastone].className = "pointer";//改变上一个被选中样式
                this.className = "pointer current";
                //图片切换
                buffer(sliderImgs[lastone],{opacity:0},null);
                buffer(sliderImgs[index],{opacity:1},null);
                lastone = index;
                currentIndex = index;
            };
            //鼠标在指示点上悬浮时改变该指示点的样式
            pointerLis[index].onmouseover = function () {
                this.className = "pointer current";
            };
            pointerLis[index].onmouseout = function () {
                if(index !== currentIndex)
                    this.className = "pointer";
            }
        })(k);
    }
    //鼠标在指示点上悬浮时清掉定时器
    ul.onmouseover = function () {
        clearInterval(sliderTimer);
    };
    //开启定时器
    ul.onmouseout = function () {
        sliderTimer = setInterval(autoPlay,4000);
    };
    //监听上一个按钮的鼠标的按下和抬起事件
    slider_prev.onmousedown = function () {
        //清除定时器
        clearInterval(sliderTimer);
        //索引--
        currentIndex--;
        if(currentIndex < 0){
            currentIndex = sliderImgs.length - 1;
        }
        //切换图片
        play();
    };
    slider_prev.onmouseup = function () {
        sliderTimer = setInterval(autoPlay,4000);
    };
    //监听下一个按钮的鼠标的按下和抬起事件
    slider_next.onmousedown = function () {
        //清除定时器
        clearInterval(sliderTimer);
        currentIndex++;
        if(currentIndex > sliderImgs.length - 1){
            currentIndex = 0;
        }
        //切换图片
        play();
    };
    slider_next.onmouseup = function () {
        sliderTimer = setInterval(autoPlay,4000);
    };

    /**
     * 自动播放
     */
    function autoPlay() {
        currentIndex++;
        if(currentIndex >= sliderImgs.length){
            currentIndex = 0;
        }
        //开始轮播
        play();
    }

    /**
     * 切换图片和改变指示点的样式
     */
    function play() {
        //上一个显示的图片隐藏
        buffer(sliderImgs[lastone],{opacity:0},null);
        //当前索引值的图片显示
        buffer(sliderImgs[currentIndex],{opacity:1},null);
        //指示点滚动
        pointerLis[lastone].className = "pointer";
        pointerLis[currentIndex].className = "pointer current";
        lastone = currentIndex;
    }
}

/**
 * 闪购倒计时
 */
function countDown() {
    //1.获取需要的标签 time stamp
    var nextHour = $("#shanShop_detailTime").children[0].innerText;
    var hour = $("#hour");
    var minute = $("#minute");
    var second = $("#second");
    var nextTime = new Date("2019/02/25 " + nextHour);
    var h,m,s,currentTime,nextTimestamp,currentTimestamp,timestamp;
    var timer = setInterval(function () {
        currentTime = new Date();//获取现在的时间
        nextTimestamp = nextTime.getTime();//获取将来的时间戳
        currentTimestamp = currentTime.getTime();//获取现在的时间戳
        timestamp = nextTimestamp - currentTimestamp;//获取时间戳之差
        var secondTimestamp = Math.floor(timestamp / 1000);//把毫秒转成秒
        if(secondTimestamp <= 0){
            clearInterval(timer);
        }
        h = Math.floor(secondTimestamp/3600);//小时
        m = Math.floor(secondTimestamp/60%60);//分钟
        s = Math.floor(secondTimestamp%60);//秒数
        hour.innerText = h >= 10 ? h : "0"+h;
        minute.innerText = m >= 10 ? m : "0"+m;
        second.innerText = s >= 10 ? s : "0"+s;
    },1000);

};

/**
 * 小米闪购轮播图
 */
function shanShopPlay() {
    //1.获取需要的标签
    var ul = $("#shanShop_slider_ul");
    var allLis = ul.children;
    var liMargin = 10.25;
    var parantWidth = $("#shanShop_slider").offsetWidth;
    var prev = $("#shanShop_prev");
    var next = $("#shanShop_next");
    var page = Math.ceil(allLis.length / 4);
    var prevIsOk = false,nextIsOk = true;
    var surplus = allLis.length % 4;

    //2.设置ul的宽度
    setStyle(ul,"width",allLis.length*(allLis[0].offsetWidth + liMargin) + "px");
    console.log(ul.offsetWidth);

    //3.监听按钮的事件
    var index = 0,step = 0;
    var t = false;
    next.onclick = function () {
        index++;
        step = -index * parantWidth;
        if(index > page-1){
            nextIsOk = false;
            index--;
            step = -index * parantWidth;
            if(surplus !== 0){
                step = ul.offsetLeft;
            }
        }else if(index === page-1){
            nextIsOk = false;
            if(surplus !== 0){
                step = ul.offsetLeft - surplus*(allLis[0].offsetWidth + liMargin);
                t = true;
            }
        } else {
            nextIsOk = true;
        }
        prevIsOk = true;
        buffer(ul,{left:step},null);
        isClick();
    };
    prev.onclick = function () {
        index--;
        step = -index * parantWidth;
        if(t){
            step = -index * parantWidth + (4-surplus)*(allLis[0].offsetWidth + liMargin);
        }
        if(index < 0){
            prevIsOk = false;
            index++;
            step = -index * parantWidth;
            if(surplus !== 0){
                step = ul.offsetLeft;
            }
        }else if(index === 0){
            prevIsOk = false;
            if(surplus !== 0){
                step = 0;
            }
        } else{
            prevIsOk = true;
        }
        nextIsOk = true;
        buffer(ul,{left:step},null);
        isClick();
    };
    next.onmouseover = function () {
        if(nextIsOk){
            setStyle(next,"color","#ff6700");
        }
    };
    next.onmouseout = function () {
        if(nextIsOk){
            setStyle(next,"color","#b0b0b0");
        }
    };
    prev.onmouseover = function () {
        if(prevIsOk){
            setStyle(prev,"color","#ff6700");
        }
    };
    prev.onmouseout = function () {
        if(prevIsOk){
            setStyle(prev,"color","#b0b0b0");
        }
    };

    /**
     * 判断按钮是否可以点击
     */
    function isClick() {
        if(nextIsOk){
            setStyle(next,"color","#b0b0b0");
            setStyle(next,"cursor","pointer");
        }else{
            setStyle(next,"color","#e0e0e0");
            setStyle(next,"cursor","auto");
        }

        if(prevIsOk){
            setStyle(prev,"color","#b0b0b0");
            setStyle(prev,"cursor","pointer");
        }else{
            setStyle(prev,"color","#e0e0e0");
            setStyle(prev,"cursor","auto");
        }
    }

}