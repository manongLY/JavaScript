### stack （栈）
栈内存主要用于存储各种基本类型的变量，包括Boolean、Number、String、Undefined、Null，**以及对象变量的指针，这时候栈内存给人的感觉就像一个线性排列的空间，每个小单元大小基本相等。

- I/O
- UI 交互事件
- setInterval
- setTimeout
- setImmediate(Node)
- requestAnimationFrame(浏览器)
### heap （堆）
堆内存主要负责像对象Object这种变量类型的存储

栈内存中的变量一般都是已知大小或者有范围上限的，算作一种简单存储。而堆内存存储的对象类型数据对于大小这方面，一般都是未知的。个人认为，这也是为什么null作为一个object类型的变量却存储在栈内存中的原因。

- Object.observe
- Promise.then catch finally
- process.nextTick(Node)
- MutationObserver(浏览器)

### 深拷贝和浅拷贝