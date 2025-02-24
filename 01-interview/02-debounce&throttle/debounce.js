/**
 * v1 初级防抖
 * v2 可以在最开始就立即request，比如搜索框，刚刚输入就可以请求一次
 */

// 最后一次触发之后，过 n 秒再执行函数


var debounce1 = function (fn, delay) {
    let timer
    return function (...arg) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(this, ...arg)
        }, delay)
    }
}




















// version 1.0
const debounce = (fn, delay) => {
    let timer
    return function () {
        const args = arguments
        // 取消setTimeout
        clearTimeout(timer)
        timer = setTimeout(() => {
            // 箭头函数 this 是继承父执行上下文里面的this
            fn.call(this, ...args)
        }, delay)
    }
}

// version 2.0
// immediate send request
const debounceImmediate = (fn, delay, immediate) => {
    let timer
    return function () {
        const args = arguments
        clearTimeout(timer)

        if (immediate) {
            let startNow = !timer

            timer = setTimeout(() => {
                console.log('if', new Date())
                fn.call(this, ...args)
            }, delay)

            if (startNow) {
                console.log('first', new Date())
                fn.call(this, ...args)
            }
        } else {
            timer = setTimeout(() => {
                console.log('else', new Date())
                fn.call(this, ...args)
            }, delay)
        }
    }
}

// version 3.0
// cancel debounce
const debounceCancel = (fn, delay, immediate) => {
    let timer, debounce
    debounce = function () {
        const args = arguments
        clearTimeout(timer)

        if (immediate) {
            let startNow = !timer

            setTimeout(() => {
                fn.call(this, ...args)
            }, delay)

            if (startNow) {
                fn.call(this, ...args)
            }
        } else {
            setTimeout(() => {
                fn.call(this, ...args)
            }, delay)
        }
    }

    // 给 debounce 增加了一个 cancel 方法
    debounce.cancel = function () {
        setTimeout(timer)
        timer = null    // debounce 内部形成了 闭包 ，避免造成内存泄漏
    }
    return debounce
}

const ajax = (e) => {
    console.log(`send ajax request ${new Date()} ${e.target.value}`)
}