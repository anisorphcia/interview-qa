// new Promise 会立即执行

console.log("script start");    // 1

setTimeout(function () {
  console.log("timeout1");  // 5
}, 10);

new Promise((resolve) => {
  console.log("promise1");  // 2
  resolve();
  setTimeout(() => console.log("timeout2"), 10);    // 6
}).then(function () {
  console.log("then1"); // 4
});

console.log("script end");  // 3

/**
 * 1.执行整体代码，输出 - script start
 * 2.遇到 setTimeout 加入 宏任务队列 [timeout1]
 * 3.new Promise 立即执行，输出 - promise1
 * 4.执行 resolve ，将 then 加入微任务队列 [then1]
 * 5.遇到第二个 setTimeout 加入 宏任务队列 [timeout1, timeout2]
 * 6.输出 script end
 * 7.执行微任务队列，输出   - then1
 * 8.执行宏任务队列，输出   - timeout1, timeout2
 */
