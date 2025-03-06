export class MinHeap {
  constructor() {
    this.heap = [];
  }

  // return the min element
  peek() {
    return this.heap[0];
  }

  // extract the min element
  pop() {
    if (this.size() === 0) return null;
    const min = this.heap[0];
    // 交换 0 和 最后一位
    this.heap[0] = this.heap[this.size() - 1];
    // 删除多余的最后一位
    this.heap.pop();
    // 从 0 开始递归向下整备最小堆
    this.#heapifyDown(0);
    return min;
  }

  // add a new element to the heap
  push(num) {
    this.heap.push(num);
    // 从最后一位开始向上整备最小堆
    this.#heapifyUp(this.heap.length - 1);
  }

  // Return the size of the heap
  size() {
    return this.heap.length;
  }

  #heapifyUp(index) {
    if (index === 0) return;
    // 跟父节点比大小
    const parentIndex = this.#parent(index);
    if (this.heap[index] < this.heap[parentIndex]) {
      this.#swap(index, parentIndex);
      this.#heapifyUp(parentIndex);
    }
  }

  #heapifyDown(parentIndex) {
    let smallIndex = parentIndex;
    const maxIndex = this.size() - 1;
    if (parentIndex === maxIndex) return;
    // 跟最小的子节点交换位置
    const leftIndex = this.#left(parentIndex);
    const rightIndex = this.#right(parentIndex);
    // 在子节点没超出 heap 范围的情况下，找到三个元素里最小元素的索引
    if (leftIndex <= maxIndex && this.heap[leftIndex] < this.heap[smallIndex]) smallIndex = leftIndex;
    if (rightIndex <= maxIndex && this.heap[rightIndex] < this.heap[smallIndex]) smallIndex = rightIndex;

    // 如果父节点不是最小值，则开始整备
    if (smallIndex !== parentIndex) {
      this.#swap(smallIndex, parentIndex);
      this.#heapifyDown(smallIndex);
    }
  }

  // 交换位置
  #swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  // 找到父节点的索引
  #parent(index) {
    return (index - 1) >> 1;
  }

  // 找到左子节点的索引
  #left(index) {
    return index * 2 + 1;
  }

  // 找到右子节点的索引
  #right(index) {
    return index * 2 + 2;
  }
}
