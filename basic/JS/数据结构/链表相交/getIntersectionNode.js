export function getIntersectionNode(listA, listB){
  const headA = listA
  const headB = listB
  while(listA !== listB){
    listA = listA === null ? headB : listA.next
    listB = listB === null ? headA : listB.next
  }
  return listA

}

// var getIntersectionNode = function(headA, headB) {
//   let a = headA
//   let b = headB
//   while(a !== b){
//       a = a.next ? a.next : headB
//       b = b.next ? b.next : headA
//   }
//   return a
// }