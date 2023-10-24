// PARENT NODE

items_list=document.querySelector('#items');
// items_list.parentNode.style.backgroundColor='lightgray'
// we can access div which has id main like items_list.parentNode.parentNode 


// PARENT ELEMENT

// items_list.parentElement.style.backgroundColor='gray'
// we can access div which has id main like items_list.parentElement.parentElement 

// CHILD NODES

// console.log(items_list.childNodes) 
// It will return node list and also including white spaces 


// CHILDREN

// console.log(items_list.children);
// items_list.children[1].style.color='red'
// It will return HTML collection of the output nodes and not including white space

// FIRST CHILD

// console.log(items_list.firstChild)

// FIRST ELEMENT CHILD

// items_list.firstElementChild.textContent="Hello 1"

// LAST CHILD

// console.log(items_list.lastChild)

// LAST ELEMENT CHILD

// items_list.lastElementChild.textContent="Hello 4"

// NEXT SIBLING

// console.log(items_list.nextSibling);

// NEXT ELEMENT SIBLING

// console.log(items_list.nextElementSibling);

// PREVIOUS SIBLING

// console.log(items_list.previousSibling);

// PREVIOUS ELEMENT SIBLING

// items_list.previousElementSibling.style.color="Blue"

// CREATE ELEMENT

var newDiv=document.createElement('div');
newDiv.className='new_div_class'; // add class to the new created div
newDiv.id='new_div_id'; // add id to the new created div
newDiv.setAttribute('title','new_div_tile') // add title to the new created div
var new_div_text=document.createTextNode("Hello World") // Created text node
newDiv.appendChild(new_div_text); //Added new text node to the div
var container=document.querySelector('header .container');
var h1=document.querySelector('header h1')
newDiv.style.fontSize="20px"
container.insertBefore(newDiv, h1) // Inserting new div header of DOM

var ul=document.querySelector('ul')
var div_container=document.querySelector('#main')
div_container.insertBefore(newDiv,ul) // Inserting new div before item 1