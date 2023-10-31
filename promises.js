const posts =[];
function createPost(post) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            posts.push({title: post});
            resolve(post);
        },1000)
    }) 
}
function updateLastUserActivityTime(){
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            const currentDate = new Date();
            let timestamp = currentDate.getTime()
            resolve(timestamp)
        }, 1000)
    })
}
function deletePost(){
    return new Promise((resolve,reject)=>{
        if(posts.length>0){
            deleted_ele=posts.pop()
            resolve(deleted_ele)
        }
        else{
            reject("ERROR")
        }
    })
}
createPost('POST1').then(updateLastUserActivityTime).then(values=>console.log(values));
createPost('POST2').then(updateLastUserActivityTime).then(values=>console.log(values));
console.log("Before deleting post",posts)
deletePost().then(console.log("After deleting post",posts))
createPost('POST3').then(updateLastUserActivityTime).then(values=>console.log(values));
console.log("After added new post",posts)