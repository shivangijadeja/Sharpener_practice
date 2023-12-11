const num1Ele=document.querySelector('#num1') as HTMLInputElement
const num2Ele=document.querySelector('#num2') as HTMLInputElement
const btnEle=document.querySelector('button')!

const numResult : Array<number>=[]
const strResult: string[]=[]

function add(num1:any,num2:any){
    return num1+num2;
}

type numOrString=number | string

// That means num1 can be either string or number 
// function add(num1:numOrString,num2:number | string){
    // if(typeof num1==='number' && typeof num2==='number'){
        //     return num1+num2;
    // }
// }

type Result={val:number;timestamp:Date}

// inferface resultObj{
//     val:number;
//     timestamp:Date;
// }

function printResult(resultobj:Result){
    console.log(resultobj.val)
}

btnEle.addEventListener('click',()=>{
    const num1=num1Ele.value;
    const num2=num2Ele.value;
    const result=add(+num1,+num2);
    const stringResult=add(num1,num2)
    console.log(result)
    numResult.push(result as number)
    console.log(stringResult);
    strResult.push(stringResult as string)
    console.log(add(true,false))
    console.log(printResult({val:result,timestamp:new Date()}))
    console.log("numResult=",numResult,"strResult=",strResult)
}) 


const myPromise=new Promise<string>((res,rej)=>{
    setTimeout(()=>{
        res('It worked!')
    })
})
myPromise.then((res)=>{
    console.log(res.split('o'))
})