const btn=document.querySelector('button')
btn.addEventListener('click',onsubmit);
function onsubmit(e){
    e.preventDefault();
    if(document.querySelector('.nameInput').value==='' || document.querySelector('.pwdInput').value===''){
        alert("Please enter every values");
    }
    else{
        console.log("Success")
    }
}
btn.addEventListener('mouseover',onmouseover);
function onmouseover(e){
    btn.style.background='white'
}
btn.addEventListener('mouseout',onmouseout);
function onmouseout(e){
    btn.style.background='gray'
}
