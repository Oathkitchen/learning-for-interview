// [1, 2, 3, 4, [5, 6]]
console.log(flatten([1, 2, 3, [4, [5, 6]]]));

// [1, 2, 3, 4, 5, 6]
console.log(flatten([1, 2, 3, [4, [5, 6]]], 2));

function flatten(array, depth = 1) {
  if (depth === 0) return array;
  return array.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flatten(cur, depth - 1) : cur);
  }, []);
}
