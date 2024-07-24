var isValid = function (s) {
    let stack = []
    let hash = new Map()
    hash.set('(', ')')
    hash.set('{', '}')
    hash.set('[', ']')
    for (let i = 0; i < s.length; ++i) {
        console.log('s[i]', i, s[i])
        if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
            stack.push(s[i])
            console.log('push', stack)
        } else {
            let top = stack[stack.length - 1]
            console.log('top', top)
            console.log('hash.get(top)', hash.get(top))
            if (hash.get(top) === s[i]) {
                stack.pop()
                console.log('pop', stack)
            } else {
                return false
            }
        }
    }
    return stack.length === 0
};

isValid('()[]{}')