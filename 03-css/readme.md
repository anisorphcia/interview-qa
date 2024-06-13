## **回流-layout、重绘-painting**

1.回流：想起来android里面的各种layout布局，这里的回流指的是根据**渲染树**计算得到节点的大小以及位置信息。

2.重绘：根据渲染树以及回流得到的几何信息，得到节点的绝对像素。

### **简单的说明何时触发**

当浏览器的大小改变导致dom中的节点大小位置改变，会触发回流 layout（需要重新计算节点的位置信息以及大小）

当节点的背景色发生改变时、文本方向改变、阴影修改，会触发重绘 painting。（在这里直接看英文就更容易理解一些）

触发**回流**一定会触发**重绘**，反之则不然。

### 浏览器优化机制

每次重排都会造成额外的计算消耗，因此大多数浏览器都会通过**队列化**修改并**批量执行**来优化重排过程。

设置一个存放操作的队列，当队列中的操作达到某个阈值的时候，浏览器一次性执行改队列中的所有操作，清空队列。

### 如何减少回流、重绘

例如下面这块代码，每一行都会触发（新浏览器不会），我们可以直接写在class中来合并操作

```
const container = document.getElementById('container')
container.style.width = '100px'
container.style.height = '200px'
container.style.border = '10px solid red'
container.style.color = 'red'
```

1. 避免过多的内联样式
2. 应用元素的动画，使用position属性的fixed或者absolute
3. 避免使用table布局，table中的每个元素的改变，都会导致整个table重新计算
4. 对于复杂的动画，设置position:fixed/absolute，使其脱离文档流，减少对其他元素的影响
5. 使用css3硬件加速，可以让 transform、opacity、filters 这些动画不会引起回流重绘
6. 避免使用css的javascript表达式
