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