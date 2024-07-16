var paintWalls = function (cost, time) {
    let pair = []
    let res = 0

    for (let i = 0; i < cost.length; ++i) {
        let tmp = [cost[i], time[i]]
        pair.push(tmp)
    }
    pair.sort((a, b) => a[0] - b[0])
    let len = pair.length
    let times = 0
    let total_time = pair.reduce((acc, curr) => acc + curr[1], 0);
    console.log('total_time', total_time)
    for (let i = 0; i < len; ++i) {
        res += pair[i][0]
        times += pair[i][1]
        console.log(res, times)
        if(times >= Math.ceil(total_time / 2)){
            console.log('i', i)
            return res
        }
    }
};

cost = [8,7,5,15], time =[1,1,2,1]

console.log(Math.ceil(4 / 2))
console.log(paintWalls(cost, time))