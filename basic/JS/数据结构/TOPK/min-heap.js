export class MinHeap {
  constructor() {
    this.heap = [];
  }

  peek(){
    return this.heap[0]
  }

  size(){
    return this.heap.length
  }

  push(num){
    this.heap.push(num)
    this.#heapifyUp(this.heap[this.size() - 1])
  }

  pop(){
    const min = this.heap[0]
    this.#swap(0, this.size() - 1)
    this.heap.pop()
    this.#heapifyDown(0)
    return min
  }

  #heapifyUp(index) {
    if(index === 0) return 
    let parentIndex = this.#parentIndex(index)
    while(this.heap[index] < this.heap[parentIndex]) {
      this.#swap(index, parentIndex)
      index = parentIndex
      parentIndex = this.#parentIndex(index)
    }
  }

  #heapifyDown(index) {
    const leftChildIndex = this.#leftChildIndex(index)
    const rightChildIndex = this.#rightChildIndex(index)
    let maxIndex = index
    const size = this.size()

    if(leftChildIndex <= size && this.heap[leftChildIndex] < this.heap[index]) maxIndex = leftChildIndex
    if(rightChildIndex <= size && this.heap[rightChildIndex] < this.heap[index]) maxIndex = rightChildIndex

    if(maxIndex !== index){
      this.#swap(maxIndex, index)
      this.#heapifyDown(maxIndex)
    }

  }

  #leftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }

  #rightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
  }

  #parentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  #swap(a,b){
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
  }
}
