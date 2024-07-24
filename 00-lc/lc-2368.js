// 不能 ac
var reachableNodesCANNOTAC = function (n, edges, restricted) {
    let res = []
    let queue = []
    let visited = new Set()
    edges.forEach(el => {
        if (el.indexOf(0) > -1) {
            let index = el.indexOf(0) === 0 ? 1 : 0
            queue.push(el[index])
            visited.add(el)
        }
    })
    while (queue.length) {
        let size = queue.length
        for (let i = 0; i < size; ++i) {
            let node = queue.shift()
            if (!restricted.includes(node)) {
                res.push(node)
                for (let edge of edges) {
                    if (edge.includes(node) && !visited.has(edge)) {
                        let index = edge.indexOf(node) === 0 ? 1 : 0
                        queue.push(edge[index])
                        visited.add(edge)
                    }
                }
            }
        }
    }
    return res.length + 1
};

var reachableNodes = function (n, edges, restricted) {
    let res = 0
    let visited = new Set()
    let restrict = new Set(restricted)
    let graph = new Map()
    for (let [u, v] of edges) {
        if (!graph.has(u)) graph.set(u, [])
        if (!graph.has(v)) graph.set(v, [])
        graph.get(u).push(v)
        graph.get(v).push(u)
    }
    let queue = []
    queue.push(0)
    visited.add(0)
    while (queue.length) {
        let node = queue.shift()
        res++
        for (let g of graph.get(node)) {
            if (!visited.has(g) && !restrict.has(g)) {
                queue.push(g)
                visited.add(g)
            }
        }
    }
    return res
};

let res = reachableNodes(7, [[0, 1], [0, 2], [0, 5], [0, 4], [3, 2], [6, 5]], [4, 2, 1])
console.log(res)