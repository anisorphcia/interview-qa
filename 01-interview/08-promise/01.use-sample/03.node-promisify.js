const fs = require('fs')
const util = require('util')

let readFileNode = util.promisify(fs.readFile)

readFileNode('./resource/content.txt').then(value => {
    console.log(value.toString())
}, err => {
    console.log(err)
})