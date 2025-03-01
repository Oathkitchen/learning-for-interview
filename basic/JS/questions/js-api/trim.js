String.prototype.myTrim = function (){
  return this.replace(/^\s+|\s+$/g, '')
}

console.log('  nihao  '.myTrim().length)

console.log(`  
  
  
    nihao  
  
  
  `.myTrim().length)