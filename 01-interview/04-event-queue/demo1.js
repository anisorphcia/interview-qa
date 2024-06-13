console.log("script start");    // 1 整体代码

// 加入宏任务队列
setTimeout(function () {
  console.log("setTimeout");    // 5
}, 0);

// 加入微任务队列
Promise.resolve()
  .then(function () {
    console.log("promise1");    // 3
  })
  .then(function () {
    console.log("promise2");    // 4
  });

console.log("script end");  // 2


/**
 * 1.执行整体代码 输出  - script start
 * 2.遇到 setTimeout 加入 宏任务队列
 * 3.遇到 Promise 加入微任务队列
 * 4.执行整体代码 输出  - script end
 * 5.执行微任务队列 输出  - promise1 promise2
 * 6.** 执行渲染操作，更新界面
 * 7.执行宏任务 setTimeout
 */