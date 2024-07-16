var sumOfTheDigitsOfHarshadNumber = function (x) {
    return x % getSum(x) === 0 ? getSum(x) : -1
};

var getSum = function (x) {
    let sum = 0
    while (x) {
        sum += x % 10
        console.log(sum)
        x = x / 10
    }
    console.log(sum)
    return sum
}

console.log(sumOfTheDigitsOfHarshadNumber(18))

