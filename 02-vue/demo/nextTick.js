let uid = 0
class Watcher {
    constructor() {
        this.id = ++uid
    }

    update() {
        console.log('watch ' + this.id + ' update')
        queueWatcher(this)
    }

    run() {
        console.log('watch ' + this.id + ' view is updating')
    }
}


let callbacks = []
let pending = false

function nextTick(cb) {
    callbacks.push(cb)

    if (!pending) {
        pending = true
        setTimeout(flushCallbacks, 0)
    }
}

function flushCallbacks() {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; ++i) {
        copies[i]()
    }
}

let has = {}
let queue = []
let waiting = false

function flushScheduleQueue() {
    let watcher, id
    for (let index = 0; index < queue.length; index++) {
        watcher = queue[index]
        id = watcher.id
        has[id] = null
        watcher.run()
    }
    waiting = false
}

function queueWatcher(watcher) {
    const id = watcher.id
    // 防止重复
    if (has[id] == null) {
        has[id] = true
        queue.push(watcher)
        if (!waiting) {
            waiting = true
            nextTick(flushScheduleQueue)
        }
    }
}

(function () {
    let watch1 = new Watcher()
    let watch2 = new Watcher()

    watch1.update()
    watch1.update()
    watch2.update()
})()