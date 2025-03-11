 export function bigNumberAdd(a, b) {
  const alist = a.split('').reverse()
  const blist = b.split('').reverse()
  let carry = 0 
  const maxLength = alist.length > blist.length ? alist.length : blist.length
  const result = []
  for(let i = 0; i < maxLength; i++){
    const anum = alist[i] ? alist[i] : 0
    const bnum = blist[i] ? blist[i] : 0
    const sum = Number(anum) + Number(bnum) + carry
    result.push(sum % 10)
    carry = Math.floor(sum / 10)
  }

  if(carry > 0) {
    result.push(carry)
  }

  return result.reverse().join('')
 }


 