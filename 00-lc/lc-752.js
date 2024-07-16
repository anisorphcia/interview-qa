var openLockBFS = function (deadends, target) {
    let visited = new Set(deadends)
    if (visited.has('0000')) {
        // 因为初始条件就是 lock = '0000'
        // 如果此时在 deadens里面就遇到，那就直接 return -1
        return -1
    }
    visited.add('0000')
    // ['xxxx', 得到'xxxx'所需要的步数]
    let queue = [['0000', 0]]
    while (queue.length) {
        let [node, step] = queue.shift()
        // 如果此时拿到的 node 就是target 直接 return
        if (node === target) {
            return step
        }
        // 获取 node只用一步就可以获取的所有 lock 组合
        let nexts = getNextLock(node)
        for (let next of nexts) {
            // 剪枝，visited 里面是访问过，以及不符合条件的 deadends 组合
            // 不符合条件则 到 nexts 里面再拿出一个来进行判断
            if (!visited.has(next)) {
                // 标记访问过的节点
                visited.add(next)
                // 添加到 queue 里面，并且表明 步数
                queue.push([next, step + 1])
            }
        }
    }
    return -1
};
var openLockDFS = function (deadends, target) {
    let visited = new Set(deadends)
    if (visited.has('0000')) {
        // 因为初始条件就是 lock = '0000'
        // 如果此时在 deadens里面就遇到，那就直接 return -1
        return -1
    }
    visited.add('0000')
    var dfs = function (current, step) {
        if (current === target) {
            return step
        }
        let minSteps = Infinity
        for (let next of getNextLock(current)) {
            if (!visited.has(next)) {
                visited.add(next)
                minSteps = Math.min(minSteps, dfs(next, step + 1))
                visited.delete(next)
            }
        }
    }
    let res = dfs('0000', 0)
    return res === Infinity ? -1 : res
};

var getNextLock = function (current) {
    let allLock = []
    for (let i = 0; i < 4; ++i) {
        let up = current.substring(0, i) + (current[i] === '9' ? 0 : Number(current[i]) + 1) + current.substring(i + 1)
        let down = current.substring(0, i) + (current[i] === '0' ? 9 : Number(current[i]) - 1) + current.substring(i + 1)
        allLock.push(up)
        allLock.push(down)
    }
    // console.log(allLock)
    return allLock
}
// openLockDFS('0000')
console.log(openLockDFS(["0201", "0101", "0102", "1212", "2002"], "0202"))