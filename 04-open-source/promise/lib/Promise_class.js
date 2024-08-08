/**
 * 自定义Promise函数模块：IIFE
 */
(function (window) {
  const PENDING = "pending";
  const RESOLVED = "resolved";
  const REJECTED = "rejected";

  class Promise {
    constructor(executor) {
      const self = this;
      self.status = PENDING;
      self.data = undefined;
      self.callbacks = [];

      function resolve(value) {
        if (self.status !== PENDING) return;

        self.status = RESOLVED;
        self.data = value;
        if (self.callbacks.length) {
          setTimeout(() => {
            self.callbacks.forEach((callback) => {
              callback.onResolved(value);
            });
          });
        }
      }

      function reject(reason) {
        if (self.status !== PENDING) return;
        self.status = REJECTED;
        self.data = reason;
        if (self.callbacks.length) {
          setTimeout(() => {
            self.callbacks.forEach((callback) => {
              callback.onRejected(reason);
            });
          });
        }
      }

      try {
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }
      /**
   *
   * @param {*} onResolved
   * @param {*} onRejected
   *
   * return promise object
   */
  then(onResolved, onRejected) {
    onResolved =
      typeof onResolved === "function" ? onResolved : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const self = this;

    return new Promise((resolve, reject) => {
      function handle(callback) {
        try {
          const result = callback(self.data);
          if (result instanceof Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      }

      if (self.status === PENDING) {
        self.callbacks.push({
          onResolved() {
            handle(onResolved);
          },
          onRejected() {
            handle(onRejected);
          },
        });
      } else if (self.status === RESOLVED) {
        setTimeout(() => {
          handle(onResolved);
        });
      } else {
        // rejected
        setTimeout(() => {
          handle(onRejected);
        });
      }
    });
  };

  catch(onRejected) {
    return this.then(undefined, onRejected);
  };

  static resolve = function (value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  };

  static reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  };

  static all = function (promises) {
    return new Promise((resolve, reject) => {
      let values = new Array(promises.length);
      let cnt = 0;
      promises.forEach((p, index) => {
        // Promise.resolve(p) 用来防止数组中出现非 promise 对象
        Promise.resolve(p).then(
          (value) => {
            cnt++;
            values[index] = value;
            if (cnt === promises.length) {
              resolve(values);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  };

  static race = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((p, index) => {
        Promise.resolve(p).then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  };

  // 在指定的事件后才开始运行
  static resolveDelay = function (value, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value instanceof Promise) {
          value.then(resolve, reject);
        } else {
          resolve(value);
        }
      }, time);
    });
  };

  static rejectDelay = function (reason, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason);
      }, time);
    });
  };
  }

  window.Promise = Promise;
})(window);
