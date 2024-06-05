class Vnode {
    constructor(tag, data, children, text, ele) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.ele = ele
    }
}

function createEmptyVnode() {
    const node = new Vnode()
    node.text = ''
    return node
}

function cloneVnode(node) {
    const cloneVnode = new Vnode(
        node.tag,
        node.data,
        node.children,
        node.text,
        node.ele
    )
    return cloneVnode
}