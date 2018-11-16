var promise = new Promise((resolve, reject) => {
  //resolve("Resolve");
  setTimeout( () => {
    reject("Rejected");
  }, 2000);
})

promise.then( (message) => {
  console.log("Success: ", message);
}, (error) => {
  console.log("Error: ", error);
} )

var assyncAdd = (a, b) => {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      if(typeof a === 'number' && typeof b === 'number'){
        resolve(a+b);
      }else{
        reject("Arguments Must Be Numbers");
      }
    }, 2000);

  } )
}

assyncAdd(12, "shalva").then( (success) => {
  console.log("Sum is: ", success);
}, (error) => {
  console.log("Error is: ", error);
});
