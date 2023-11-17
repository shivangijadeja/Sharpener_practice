const productOfTwoNumbers=(a,b)=>a*b;
console.log(productOfTwoNumbers(5,6))


const student={
    name:'Shivangi',
    age:25,
    // greet:()=>{
    //     console.log('Hi, I am '+this.name)
    // }     
    // Arrow function It will return undefined because this.name indicated the global variable
    greet:function(){
        console.log('Hi, I am '+this.name)
    }
}
student.greet()


const array = ['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon']
// for(let arr of array){
    // console.log(arr)
// }
let ans=array.map((arr)=>{
    if(arr===' '){
        arr='empty string'
    }
    return arr
})
console.log(ans)