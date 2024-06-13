// n 秒内，只能执行一次函数


// version 1.0 时间戳版
// 再时间段内开始的时候触发
function throttle(fn, delay) {
    let args
    let lastTime = 0

    return function () {
        const current = new Date().getTime()
        args = arguments
        if (current - lastTime > delay) {
            fn.call(this, ...args)
            lastTime = current
        }
    }
}

// version 2.0 定时器版
// 再时间段内结束的时候触发
function throttleTimer(fn, delay) {
    let timer
    return function () {
        let args = arguments
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
                fn.call(this, ...args)
            }, delay)
        }
    }
}