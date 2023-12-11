"use strict";
const num1Ele = document.querySelector('#num1');
const num2Ele = document.querySelector('#num2');
const btnEle = document.querySelector('button');
const numResult = [];
const strResult = [];
function add(num1, num2) {
    return num1 + num2;
}
// inferface resultObj{
//     val:number;
//     timestamp:Date;
// }
function printResult(resultobj) {
    console.log(resultobj.val);
}
btnEle.addEventListener('click', () => {
    const num1 = num1Ele.value;
    const num2 = num2Ele.value;
    const result = add(+num1, +num2);
    const stringResult = add(num1, num2);
    console.log(result);
    numResult.push(result);
    console.log(stringResult);
    strResult.push(stringResult);
    console.log(add(true, false));
    console.log(printResult({ val: result, timestamp: new Date() }));
    console.log("numResult=", numResult, "strResult=", strResult);
});
const myPromise = new Promise((res, rej) => {
    setTimeout(() => {
        res('It worked!');
    });
});
myPromise.then((res) => {
    console.log(res.split('o'));
});
