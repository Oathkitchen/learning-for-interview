// export default function allSettled(promises) {
//   return new Promise((resolve) => {
//     let resultCount = 0
//     const result = Array(promises.length).fill({ status: "" });
//     for (let i = 0; i < promises.length; i++) {
//       const p = promises[i];
//       p.then((value) => {
//         result[i].status = 'fulfilled'
//         result[i].value = value
//         resultCount++
//         if(resultCount === promises.length) {
//           resolve(result)
//         }
//       }, (reason) => {
//         result[i] = {
//           status: 'rejected',
//           reason
//         }
//         resultCount++
//         if(resultCount === promises.length) {
//           resolve(result)
//         }
//       })
//     }
//   });
// }

export default function allSettled(items) {
  const onFulFilled = (value) => ({
    status: "fulfilled",
    value,
  });
  const onRejected = (reason) => ({
    status: "rejected",
    reason,
  });
  return Promise.all(
    items.map((item) => {
      return Promise.resolve(item).then(onFulFilled, onRejected);
    })
  );
}
