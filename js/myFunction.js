/**
 * 获取id或class
 * @param str
 * @returns {any}
 */
function $(str) {
    if(str[0] === "#"){
        return typeof str === "string" ? document.getElementById(str.substring(1)) : null;
    }else if(str[0] === "."){
        return typeof str === "string" ? document.getElementsByClassName(str.substring(1)) : null;
    }
    return null;
}

/**
 * 获取浏览器滚动距离
 * @returns {*}
 */
function getScroll() {
    if (window.pageYOffset) {
        return{
            top : window.pageYOffset,
            left : window.pageXOffset
        }
    }
    else if (document.compatMode && document.compatMode !== 'BackCompat'){
        return{
            top : document.documentElement.scrollTop,
            left : document.documentElement.scrollLeft
        }
    }
    else if (document.body) {
        return{
            top : document.body.scrollTop,
            left : document.body.scrollLeft
        }
    }
}


/**
 * 匀速动画
 * @param {object}obj
 * @param {number}target
 * @param {number}speed
 */
function constant(obj,target,speed) {

    clearInterval(obj.timer);

    //判别方向
    var dir = obj.offsetLeft < target ? speed : -speed;

    //设置定时器

    obj.timer = setInterval(function () {

        obj.style.left = obj.offsetLeft + dir + "px";

        if(Math.abs(obj.offsetLeft - target) < Math.abs(dir)){

            clearInterval(obj.timer);
            obj.style.left = target + "px";

        }

    },20);

}


/**
 * element:需要获取样式的目标元素;name:样式属性
 * @param element
 * @param name
 * @returns {*}
 */
function getStyle(element, name) {
    var computedStyle;
    try {
        computedStyle = document.defaultView.getComputedStyle(element, null);
    } catch (e) {
        computedStyle = element.currentStyle;
    }
    if (name !== "float") {
        return computedStyle[name];
    } else {
        return computedStyle["cssFloat"] || computedStyle["styleFloat"];
    }
}

/**
 * element:需要设置样式的目标元素;name:样式属性;value:设置值
 * @param element
 * @param name
 * @param value
 */
function setStyle(element, name, value) {
    if (name !== "float") {
        element.style[name] = value;
    } else {
        element.style["cssFloat"] = value;
        element.style["styleFloat"] = value;
    }
}

/**
 * 缓动动画
 * @param obj
 * @param json
 * @param fun
 */
function buffer(obj,json,fun) {
    //清楚定时器
    clearInterval(obj.timer);

    var begin = 0,target = 0,speed = 0;

    obj.timer = setInterval(function () {
        var flag = true;
        for(var k in json){
            if(k === "opacity"){
                begin = Math.round(parseFloat(getStyle(obj,k)) * 100);
                target = parseInt(parseFloat(json[k])*100);
            }else if(k === "scrollTop"){
                begin = Math.ceil(getScroll().top);
                target = parseInt(json[k]);
                console.log(begin,target);
            }else{
                begin = parseInt(getStyle(obj,k)) || 0;
                target = parseInt(json[k]);
            }
            //获取步长
            speed = (target - begin) * 0.2;
            //判断是向下还是向上取整
            speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);
            //运动
            if(k === "opacity"){
                setStyle(obj,k,(begin+speed)/100);
                setStyle(obj,"filter","alpha(opacity:"+(begin + speed)+ ")");
            }else if(k === "scrollTop"){
                obj.scrollTop = begin + speed;
                console.log(begin+speed);
            } else{
                setStyle(obj,k,begin + speed + "px");
            }

            // console.log(begin,target);
            //清除定时器
            if(begin !== target){
                flag = false;
            }
        }
        if(flag){
            clearInterval(obj.timer);
            if(fun){
                fun();
            }
        }

    },20);
}