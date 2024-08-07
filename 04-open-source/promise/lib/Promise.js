/**
 * 自定义Promise函数模块：IIFE
 */
(function (window) {
  const PENDING = "pending";
  const RESOLVED = "resolved";
  const REJECTED = "rejected";

  function Promise(executor) {
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
            callback.onRejected(value);
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
  Promise.prototype.then = function (onResolved, onRejected) {

    onRejected = typeof onResolved === 'function' ? onResolved : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

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

  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
  };

  Promise.resolve = function (value) {};

  Promise.reject = function (value) {};

  Promise.all = function (promises) {};

  Promise.race = function (promises) {};

  window.Promise = Promise;
})();
