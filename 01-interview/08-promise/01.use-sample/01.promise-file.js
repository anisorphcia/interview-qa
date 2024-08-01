
const fs = require('fs');

// fs.readFile('./resource/content.txt', (err, data) => {
//     if(err) throw err;
//     console.log('data', data.toString())
// })

// Promise
// run in terminal ---> node filename
let p = new Promise((resolve, reject) => {
    fs.readFile('./resource/content.txt', (err, data) => {
        if(err) reject(err);
        resolve(data)
    })
})

p.then(value => {
    console.log(value.toString())
}, err => {
    console.log(err)
})