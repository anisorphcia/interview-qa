const s = new Date().getSeconds();
console.log("script start");    // 1
new Promise((resolve) => {
    console.log("promise"); // 2
    resolve();
}).then(() => {
    console.log("then1");   // 4
    while (true) {
        if (new Date().getSeconds() - s >= 4) {
            console.log("while");   // 5
            break;
        }
    }
});
setTimeout(() => {
    console.log("timeout"); // 6
}, 2000);
console.log("script end");  // 3

/**
 * 1.顺序执行输出   - script start
 * 2.遇到 promise，输出  - promise
 * 3.执行resolve，将 then1 放入微任务队列 [then1]
 * 4.时间没到 4 ms，无法进入 if
 * 5.遇到 setTimeout，加入 宏任务队列 [timeout]
 * 6.顺序执行，输出 - script end
 * 7.执行 微任务队列 ，输出 - then1
 * 8.执行 if 条件语句，输出 - while
 * 9.执行 宏任务队列， 输出 - timeout
 */