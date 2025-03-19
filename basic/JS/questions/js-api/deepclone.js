function deepClone(originalObj, hasMap = new WeakMap()) {
  if(originalObj === null || typeof originalObj !== 'object') return originalObj

  if(hasMap.has(originalObj)) return hasMap.get(originalObj)

  let clone  = undefined

  if(originalObj instanceof RegExp){
    clone = new RegExp(originalObj)
  } else if(originalObj instanceof Date) {
    clone = new Date(originalObj)
  } else if(originalObj instanceof Map){
    clone = new Map(...originalObj)
  } else if (Array.isArray(originalObj)){
    clone = []
  } else {
    clone = Object.create(Object.getPrototypeOf(originalObj))
  }

  hasMap.set(originalObj, clone)

  for (const key of Reflect.ownKeys(originalObj)){
    const value = originalObj[key]
    clone[key] = deepClone(value, hasMap)
  }

  return clone
 
}

export default deepClone