class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    sayHello() {
        console.log('Hello I am ' + this.name)
    }
}

class Student extends Person {
    constructor(name, age, grade) {
        super(name, age)
        this.grade = grade
    }
    sayHello() {
        super.sayHello()
        console.log(`I am in grade ${this.grade}`)
    }
    study() {
        console.log(`${this.name} is studying.`);
    }
}

const student = new Student('Alice', 20, 'A');
student.sayHello();

student.study();


/**
 * 使用 webpack babel 将其转换成了 es5 的代码
 * 可以看到，主要还是 使用的 function 来实现
 */