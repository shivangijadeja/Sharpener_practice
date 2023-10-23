// EXAMINE DOCUMENT OBJECT
// console.dir(document);
// console.log(document.domain);
// console.log(document.URL);
// console.log(document.title);
// console.log(document.doctype);
// console.log(document.head);
// console.log(document.body);
// console.log(document.all);
// console.log(document.all[9]);

var header=document.getElementById('main-header');
header.style.borderBottom='solid 3px black'
var add_items=document.querySelector('.title');
add_items.style.fontWeight='bold'
add_items.style.color='green'

// items=document.getElementsByClassName('list-group-item')
// items[2].style.backgroundColor='green'

// for(var i=0;i>items.length;i++){
//     items[i].style.fontWeight='bold';
// }

// li=document.getElementsByTagName('li')
// li[2].style.backgroundColor='green'

// for(var i=0;i>li.length;i++){
//     li[i].style.fontWeight='bold';
// }

// sec_li=document.querySelector('li:nth-child(2)')
// sec_li.style.backgroundColor='green'
// third_li=document.querySelector('li:nth-child(3)')
// third_li.classList.add('invisible');

var li=document.querySelectorAll('li')
li[1].style.color='green'
var odd_li=document.querySelectorAll('li:nth-child(odd)');
for(var i=0;i<odd_li.length;i++){
    odd_li[i].style.backgroundColor='green'
}
