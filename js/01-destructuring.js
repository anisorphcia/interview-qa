// 正常的 解构赋值
function test() {
    let { a, b } = { a: 1, b: 2 }
    console.log('test', a, b)
}

// make it happened
// let [a, b] = { a: 1, b: 2 }
function destructuringSample() {
    let [a, b] = { a: 1, b: 2 }
    // console.log(a, b) // {(intermediate value)(intermediate value)} is not iterable

    // 需要让对象能够迭代
    console.log('destructuringSample', a, b)
}

// 01 Result of the Symbol.iterator method is not an object
// Object.prototype[Symbol.iterator] = function () { }

// 02 成功
// Object.prototype[Symbol.iterator] = function () {
//     return Object.values(this)[Symbol.iterator]()
// }

// step 1
// 看下数组上的迭代器是怎样的
let arr = [1, 2, 3]
console.log('arr', arr) // Symbol(Symbol.iterator)
// step 2
// 所以把 Symbol(Symbol.iterator) 这玩意放在 object 的原型链上就好了
console.log('arr Symbol.iterator', arr.__proto__[Symbol.iterator]())

// 看下Object 隐式原型链有啥东西
console.log('Object.prototype', Object.prototype)

// 把数组上的迭代器给 Object 
Object.prototype[Symbol.iterator] = function () {
    // this -> 对象本身 { a: 1, b: 2 }
    // Object.values(this) -> [1, 2]
    return Object.values(this)[Symbol.iterator]()
}
