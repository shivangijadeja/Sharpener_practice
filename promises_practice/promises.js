console.log("Person1: Shows ticket");
console.log("Person2: Shows ticket");

const PreMovie=async()=>{
    const promiseWifeBringingTickets=new Promise((resolve,reject)=>{
        setTimeout(()=>resolve('Ticket'),3000)
    });

    const getPopcorn=new Promise((resolve,reject)=>resolve("popcorn"));

    const getColdDrink=new Promise((resolve,reject)=>resolve("Cold drinks"));

    const getCandy=new Promise((resolve,reject)=>resolve("Candy"));

    let ticket=await promiseWifeBringingTickets;
    // console.log("Wife: I have tickets");
    // console.log("Husband: We sholud go in");
    // console.log("Wife: No I am hungry");

    // let popcorn=await getPopcorn;
    // console.log("Husband: I got some popcorn");
    // console.log("Husband: We sholud go in");
    // console.log("Wife: I need butter on my popcorn");
    // console.log("Husband: We sholud go in");
    // console.log("Wife: I need cold drinks with popcorn");

    // let colddrinks=await getColdDrink;
    // console.log("Husband: I got cold drinks");
    // console.log("Husband: We sholud go in");
    // console.log("Wife: Yes....");

    // let candy=await getCandy;

    let [popcorn,colddrinks,candy]=await Promise.all([getPopcorn,getColdDrink,getCandy])

    console.log(`${popcorn},${colddrinks},${candy}`);

    return ticket;

}
PreMovie().then((m)=>console.log(`Person3: Shows ${m}`))

console.log("Person4: Shows ticket");
console.log("Person5: Shows ticket");
