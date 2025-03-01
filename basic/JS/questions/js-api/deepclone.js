 // JS 深克隆时如何处理循环引用
//  function deepClone(obj, hash = new WeakMap()) {
//   // 处理基本类型和 null/undefined
//   if (obj === null || typeof obj !== "object") {
//     return obj;
//   }

//   // 处理循环引用：若已克隆过，直接返回克隆副本
//   if (hash.has(obj)) {
//     return hash.get(obj);
//   }

//   // 处理特殊对象类型
//   let clone;
//   if (obj instanceof Date) {
//     clone = new Date(obj);
//   } else if (obj instanceof RegExp) {
//     clone = new RegExp(obj);
//   } else if (obj instanceof Map) {
//     clone = new Map([...obj]);
//   } else if (obj instanceof Set) {
//     clone = new Set([...obj]);
//   } else if (Array.isArray(obj)) {
//     clone = [];
//   } else {
//     clone = Object.create(Object.getPrototypeOf(obj));
//   }

//   // 记录当前对象和克隆对象的映射关系
//   hash.set(obj, clone);

//   // 递归克隆所有属性
//   for (const key of Reflect.ownKeys(obj)) {
//     // 包含 Symbol 属性
//     const value = obj[key];
//     clone[key] = deepClone(value, hash);
//   }

//   return clone;
// }


function deepClone(oriObj, hash = new WeakMap()){
  if(oriObj === null || typeof oriObj !== 'object') return oriObj

  if(hash.has(oriObj)) return hash.get(oriObj)

  let clone = null
  if(oriObj instanceof RegExp){
    clone = new RegExp(oriObj)
  } else if(oriObj instanceof Date){
    clone = new Date(oriObj)
  } else if(oriObj instanceof Map){
    clone = new Map(...oriObj)
  } else if(oriObj instanceof Set){
    clone = new Set(...oriObj)
  } else if(Array.isArray(oriObj)) {
    clone = []
  } else {
    clone = Object.create(Object.getPrototypeOf(oriObj))
  }

  hash.set(oriObj, clone)

  for(const key of Reflect.ownKeys(oriObj)) {
    const value = oriObj[key]
    clone[key] = deepClone(value, hash)
  }

  return clone 

}

export default deepClone