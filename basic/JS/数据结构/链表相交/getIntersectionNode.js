export function getIntersectionNode(listA, listB){
  const headA = listA
  const headB = listB
  while(listA !== listB){
    listA = listA === null ? headB : listA.next
    listB = listB === null ? headA : listB.next
  }
  return listA

}