// 双指针法通过 路径长度的强制对齐，确保两指针在相交时必然同步到达交点，而在不相交时同步到达末尾。
// 这种设计巧妙地利用遍历路径的对称性，以最小的时间和空间成本解决问题，是链表相交问题的经典最优解。

export function getIntersectionNode(headA, headB) {
  let pA = headA
  let pB = headB

  while(pA !== pB){
    pA = pA === null ? headB : pA.next
    pB = pB === null ? headA : pB.next
  }

  return pA
}