Function.prototype.myCall = function (thisArg, ...args) {
  const key = Symbol("key");
  thisArg[key] = this;
  const result = thisArg[key](...args);
  delete thisArg[key];
  return result;
};

const person = { name: "zz", age: 18 };

function hello(text1, text2) {
  console.log(`hello my name is ${this.name}, and my age is ${this.age}`);
  console.log(text1);
  console.log(text2);
}

// hello.myCall(person, "你好", "mic check one two");

Function.prototype.myApply = function (thisArg, argsArray) {
  const key = Symbol("key");
  thisArg[key] = this;
  const result = thisArg[key](...argsArray);
  delete thisArg[key];
  return result;
};

// hello.myApply(person, ["你好", "mic check one two"]);

Function.prototype.myBind = function(thisArg, ...args){
  const originalFn = this
  function bound(){
    const combinedArgs = args.concat(Array.from(arguments));
    // 保留函数 new 的权利
    if(this instanceof bound){
      return new originalFn(combinedArgs)
    } else {
      return originalFn.apply(thisArg, combinedArgs)
    }
  }

  bound.prototype = Object.create(originalFn.prototype)
  return bound
}

const module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.myBind(module);
console.log(boundGetX());
// Expected output: 42

function log(...args) {
  console.log(this, ...args);
}
const boundLog = log.myBind("this value", 1, 2);
const boundLog2 = boundLog.myBind("new this value", 3, 4);
boundLog2(5, 6); // "this value", 1, 2, 3, 4, 5, 6

class Base {
  constructor(...args) {
    console.log(new.target === Base);
    console.log(args);
  }
}

const BoundBase = Base.myBind(null, 1, 2);

new BoundBase(3, 4); // true, [1, 2, 3, 4]