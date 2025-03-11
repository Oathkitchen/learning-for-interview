export function bigNumberMultiply(a, b) {
  const alist = a.split("").reverse();
  const blist = b.split("").reverse();
  const result = new Array(alist.length + blist.length).fill(0);

  for (let i = 0; i < alist.length; i++) {
    for (let j = 0; j < blist.length; j++) {
      const product = Number(alist[i]) * Number(blist[j]);
      const temp = result[i + j] + product
      result[i + j] = temp % 10; // 这里要包含之前的进位
      result[i + j + 1] = Math.floor(temp / 10) + result[i + j + 1]
    }
  }

  return result.reverse().join('').replace(/^0+/, '')
}
