function curry(fn, len = fn.length) {
  return _curry.call(this, fn, len);
}

function _curry(fn, len, ...args) {
  const inner = (...params) => {
      let _args = [...args, ...params];

      // 如果没有传入参数，返回0
      if (_args.length === 0) {
          return 0;
      }

      // 当参数长度达到或超过期望长度时返回结果
      if (_args.length >= len) {
          return fn.apply(this, _args);
      } else {
          // 继续累加参数
          return _curry.call(this, fn, len, ..._args);
      }
  };

  // 重写 toString 方法以便于输出结果
  inner.toString = () => fn.apply(this, args);
  
  return inner;
}

// 创建一个累加函数
let _fn = curry(function (...args) {
  return args.reduce((a, b) => a + b, 0);
});

// 测试
console.log(_fn(1)(2)(3)(4)); // 输出 10
console.log(_fn(1)(2)(3)); // 输出 6
console.log(_fn()); // 输出 0
