const debounce = (fn, delay) => {
    let timer
    return function(){
        const context = this
        const args = arguments
        clearTimeout(timer)

        timer = setTimeout(() => {
            fn.call(context, ...args)
        }, delay)
    }
}

const ajax = (e) => {
    console.log(`send ajax request ${new Date()} ${e.target.value}`)
}