function cb(val) {
  console.log("cb update view:", val);
}

function defineReactive(obj, key, val) {
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      dep.addSubs(Dep.target);
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      cb(newVal)
      dep.notify();
    },
  });
}

function observer(value) {
  if (!value || typeof value !== "object") {
    return;
  }

  Object.keys(value).forEach((key) => {
    defineReactive(value, key, value[key]);
  });
}

class Dep {
  constructor() {
    this.subs = [];
  }

  addSubs(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}

class Watcher {
  constructor() {
    Dep.target = this;
  }

  update() {
    console.log("Watcher, update view");
  }
}

Dep.target = null;

class Vue {
  constructor(options) {
    this._data = options.data;
    observer(this._data);
    new Watcher();
    console.log("render :", this._data);
  }
}

// https://juejin.cn/post/6844903882208837640?searchId=2024060514263743744290161AD07BB279
