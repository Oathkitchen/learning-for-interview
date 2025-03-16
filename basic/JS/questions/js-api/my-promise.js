MyPromise.resolve(10)
  .then((o) => o * 10)
  .then((o) => o + 10)
  .then((o) => {
    console.log(o);
  });
 
new MyPromise((resolve, reject) => reject("Error")).catch((e) => {
  console.log("Error", e);
});

const p = MyPromise.resolve(123)
p.then((value) => {
  console.log(`first call then${value}`)
})

p.then((value) => {
  console.log(`second call then${value}`)
})

class MyPromise {
  static resolve(value){
    if(value && value.then){
      return value
    }
    return new MyPromise((resolve) => {
      resolve(value)
    })
  }

  constructor(callback){
    this.value = undefined
    this.status = 'pending'
    this.callback = callback
    this.resolveCallbackList = []
    this.rejectCallbackList = []
  }

  then(callback){
    if(this.status === 'pending'){
      
    }
  }

}