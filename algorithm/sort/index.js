// 还需要测试性能
// 冒泡性能一般

// 冒泡排序
let bubbleArr = [11, 4, 2, 35]
console.log(bubbleArr)
for (let i = 0; i < bubbleArr.length - 1; i++) {
  for (let j = 0; j < bubbleArr.length - 1; j++) {
    if (bubbleArr[j] > bubbleArr[j + 1]) {
      let temp = bubbleArr[j]
      bubbleArr[j] = bubbleArr[j + 1]
      bubbleArr[j + 1] = temp
    }
  }
}
console.log(bubbleArr)

// 快速排序  -- 不稳定算法
let quickArr = [10, 2, 2, 2, 2, 2, 9]
var quickSort = function (arr) {
  if (arr.length <= 1) return arr
  var centerIndex = Math.floor(arr.length / 2)
  // 找到中间位置的元素
  let centerValue = arr.splice(centerIndex, 1)[0]
  // 原数组中比中间值小的部分
  let leftArr = []
  // 原数组中比中间值大的部分
  let rightArr = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < centerValue) {
      leftArr.push(arr[i])
    } else {
      rightArr.push(arr[i])
    }
  }
  return quickSort(leftArr).concat([centerValue], quickSort(rightArr))
};
console.log(quickSort(quickArr))



// 插入排序 
