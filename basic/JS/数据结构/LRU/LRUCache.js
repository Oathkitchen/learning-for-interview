export class LRUCache {
  constructor(capacity) {
    this.map = new Map();
    this.head = null;
    this.tail = null;
    this.capacity = capacity;
  }

  #creatNode(key, value) {
    return {
      key,
      value,
      pre: null,
      next: null,
    };
  }

  #log() {
    console.log(this.head);
    console.log(this.map);
  }

  get(key) {
    let value = -1;
    if (this.map.has(key)) {
      const node = this.map.get(key);
      // 把该节点拿出来，然后放在头部
      value = node.value;
      if (node !== this.head) {
        if (node.next) {
          node.next.pre = node.pre;
        } else {
          // node 是 tail
          this.tail = node.pre
        }
        node.pre.next = node.next;

        node.pre = null;
        node.next = this.head;
        this.head.pre = node
        this.head = node;
      }
    }
    this.#log();
    return value;
  }

  put(key, value) {
    let node = null;
    if (!this.map.has(key)) {
      node = this.#creatNode(key, value);
      this.map.set(key, node);
    } else {
      node = this.map.get(key);
      node.value = value;
    }
    // 放在头部
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.pre = node;
      this.head = node;
    }

    // 如果超标了，删除 tail
    if (this.map.size > this.capacity) {
      const last = this.tail;
      this.map.delete(last.key);
      this.tail = this.tail.pre;
      this.tail.next = null;
    }
    this.#log();
  }
}
