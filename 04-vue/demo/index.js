function cb(val) {
    console.log('update view:', val)
}

function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reavtiveGetter() {
            return val
        },
        set: function reactiveSetter(newVal) {
            if (newVal === val) return
            cb(newVal)
        }
    })
}

function observer(value) {
    if (!value || (typeof value !== 'object')) {
        return
    }

    Object.keys(value).forEach(key => {
        defineReactive(value, key, value[key])
    })
}

class Vue {
    constructor(options) {
        console.log('this', this)
        this._data = options.data
        observer(this._data)
    }
}