var closedIsland = function (grid) {
    let res = 0
    let row = grid.length
    let col = grid[0].length
    let direction = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    var bfs = function (i, j) {
        // 标记为水
        grid[i][j] = 1
        let queue = [[i, j]]
        while (queue.length) {
            let [x, y] = queue.shift()
            for (let [dx, dy] of direction) {
                let fx = dx + x
                let fy = dy + y
                if (fx >= 0 && fx < row && fy >= 0 && fy < col && grid[fx][fy] === 0) {
                    queue.push([fx, fy])
                    grid[fx][fy] = 1
                }
            }
        }
        console.log('while', grid)
    }
    // 标记 西边 还有 东边 的大陆
    for (let i = 0; i < row; ++i) {
        // bfs(i, 0)
        // bfs(i, col - 1)
        if (grid[i][0] === 0) bfs(i, 0)
        if (grid[i][col - 1] === 0) bfs(i, col - 1)
    }

    // 标记 北边 还有 南边 的大陆
    for (let i = 0; i < col; ++i) {
        if (grid[0][i] === 0) bfs(0, i)
        if (grid[row - 1][i] === 0) bfs(row - 1, i)
    }
    for (let i = 0; i < row; ++i) {
        for (let j = 0; j < col; ++j) {
            if (grid[i][j] === 0) {
                res++
                bfs(i, j)
            }
        }
    }
    console.log('grid', grid)
    return res
};

let data = [
    [1, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0]
]
console.log(closedIsland(data))