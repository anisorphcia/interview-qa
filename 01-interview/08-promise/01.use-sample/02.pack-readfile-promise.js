function readFilePromise(path) {
    return new Promise((resolve, reject) => {
        require('fs').readFile(path, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

readFilePromise('./resource/content.txt').then(value => {
    console.log(value.toString())
}, err => {
    console.log(err)
})