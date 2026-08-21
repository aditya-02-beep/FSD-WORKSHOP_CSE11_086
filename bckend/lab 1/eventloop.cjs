console.log("This is the starting point of my code");
process.nextTick(()=>{
    console.log("This process.nextTick operation");
})
setTimeout(() => {
    console.log("This is first timeout operation");
}, 9000);
setTimeout(() => {
    console.log("This is second timeout operation");
}, 6000);
setImmediate(()=>{
    console.log("this is setimmediate operation");
})
new Promise((resolve, reject)=>{
    let success = false;
    if(success) resolve("Data loaded successfully");
    else reject("Data loading failed");
})
    .then((message) => {
    console.log(message);
})
    .catch((message) => {
    console.error(message);
});
console.log("This is the end point of my code");