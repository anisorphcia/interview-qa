async function async1() {
    console.log("async1 start");    // 1
    await async2();
    console.log("async1 end");  // 5
}
async function async2() {
    console.log("async2");  // 2
}

async1(); // start 0

setTimeout(() => {
    console.log("timeout");     // 7
}, 0);
new Promise(function (resolve) {
    console.log("promise1");    // 3
    resolve();
}).then(function () {
    console.log("promise2");    // 6
});
console.log("script end");  // 4

/**
 * 0. async1() 执行
 * 1.执行整体代码 输出  - script start
 * 2.async1 内部 函数async2 执行，输出  - async2
 * 3.顺序执行，将 async1 end加入 微任务队列 [async1 end]
 * 4.setTimeout 加入宏任务队列 [timeout]
 * 5.执行 promise 输出  - promise1
 * 6.执行 resolve，将 promise2 加入 微任务队列 [async1 end, promise2]
 * 7.顺序执行，输出 - script end
 * 8.执行 微任务队列 [async1 end, promise2]，顺序输出
 * 9.执行 宏任务队列 [timeout]
 */