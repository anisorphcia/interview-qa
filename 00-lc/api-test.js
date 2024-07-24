let handler = {
    set: function (target, property, value, receiver) {
        console.log('----set-----')
        console.log('target', target)
        console.log('property', property)
        console.log('value', value)
        console.log('receiver', receiver)
        return Reflect.set(target, property, value, receiver)
    },
    get: function (target, property, receiver) {
        console.log('----get-----')
        console.log('target', target)
        console.log('property', property)
        console.log('receiver', receiver)
        return Reflect.get(target, property, receiver);
    }
}

let person = { name: 'asakao' }
let proxy = new Proxy(person, handler)
// proxy.name = 'sakamoto'
// console.log(person.name)
let derived = Object.create(proxy)
console.log(derived.name)