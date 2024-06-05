const obj = {
    name: 'asakao',
    getName() {
        return this.name
    },
    getName1: () => {
        return this.name
    }
}

obj.__proto__.getName2 = function () {
    return this.name
}

obj.__proto__.getName3 = () => {
    return this.name
}

console.log(obj.getName()) // asakao
console.log(obj.getName1()) // 
console.log(obj.getName2()) // asakao
console.log(obj.getName3()) // 