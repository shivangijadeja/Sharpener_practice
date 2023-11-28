var my_form=document.querySelector('#addForm');
var item_list=document.getElementById('todos_remaining');
var done_item_list=document.getElementById('todos_done');

my_form.addEventListener('submit',addbook);

item_list.addEventListener('click',returnBook);

function addbook(e){
    e.preventDefault();
    var name=document.querySelector('.name').value;
    if(name===''){
        alert("Add Proper details")
    }
    else{
        const book={
            'name':name,
            'taken_on':new Date(),
            'return_on':new Date(Date.now() + 1 * (60 * 60 * 1000) ),
            'book_fine':0,
            'is_return':false
        }
        console.log(book)

        axios.post('http://localhost:9999/add-book',
            book).then((res)=>console.log(res))
            .catch((err)=>console.log(err))
        
        var name=name;
        var taken_on=new Date();
        var return_on=new Date(Date.now() + 1 * (60 * 60 * 1000) );
        var book_fine=0
        var create_item=document.createElement('li')
        create_item.innerHTML=`
        <h6>Book Name: ${name}</h6>
        <h6>Book taken on: ${taken_on}</h6>
        <h6>Book return on: ${return_on}</h6>
        <h6>Book fine: ${book_fine}</h6>
        `
        create_item.className='list-group-item'
        var btn_edit=document.createElement('button');
        var btn_pay=document.createElement('button');
        var add_text=document.createTextNode('Return Book')
        var pay_text=document.createTextNode('Pay fine');
        btn_edit.appendChild(add_text)
        btn_pay.appendChild(pay_text)
        btn_edit.className='btn btn-info btn-sm mr-2 float-right icon-check-sign done'
        btn_pay.className='btn btn-danger btn-sm mr-2 float-right icon-check-sign invisible pay_fine'
        create_item.appendChild(btn_pay)
        create_item.appendChild(btn_edit)
        item_list.appendChild(create_item)
    }
}

function returnBook(e){
    var li=e.target.parentElement;
    var selected_name=li.innerText.split('\n')[0].split(':')[1];
    var id=0
    var displayed_fine=0
    const book={
        "name":selected_name,
        "is_return":true
    }
    if(e.target.classList.contains('done')){
        axios.get('http://localhost:9999/get-all-books').then((res)=>{
            for(var i=0;i<res.data.books.length;i++){
                if(res.data.books[i]['name']==selected_name.trim()){
                    id=res.data.books[i]['id']
                    displayed_fine=res.data.books[i]['book_fine']
                }
            }
        })
        .then(()=>{
            if(displayed_fine>0){
                var btn_add=li.querySelector('.done')
                li.removeChild(btn_add)
                var pay_fine=li.querySelector('.pay_fine')
                pay_fine.classList='btn btn-danger btn-sm mr-2 float-right icon-check-sign pay_fine'
                li.appendChild(pay_fine)
            }
            else{
                axios.get('http://localhost:9999/get-all-books').then((res)=>{
                    for(var i=0;i<res.data.books.length;i++){
                        if(res.data.books[i]['name']==selected_name.trim()){
                            id=res.data.books[i]['id']
                            displayed_fine=res.data.books[i]['book_fine']
                        }
                    }
                })
                .then(()=>{
                    axios.put(`http://localhost:9999/update-product/${id}`,book).then((res)=>{
                    console.log(res)
                    }).catch((er)=>{
                        console.log(er)
                    })
                })
                .catch((er)=>{
                    console.log(er)
                })

                item_list.removeChild(li);
                var btn_add=li.querySelector('.done')
                li.removeChild(btn_add)
                done_item_list.appendChild(li);

            }
        })
    }
    if(e.target.classList.contains('pay_fine')){
        axios.get('http://localhost:9999/get-all-books').then((res)=>{
            for(var i=0;i<res.data.books.length;i++){
                if(res.data.books[i]['name']==selected_name.trim()){
                    id=res.data.books[i]['id']
                    displayed_fine=res.data.books[i]['book_fine']
                }
            }
        })
        .then(()=>{
            axios.put(`http://localhost:9999/update-product/${id}`,book).then((res)=>{
            console.log(res)
            }).catch((er)=>{
                console.log(er)
            })
        })
        .catch((er)=>{
            console.log(er)
        })

        item_list.removeChild(li);
        var btn_add=li.querySelector('.pay_fine')
        li.removeChild(btn_add)
        done_item_list.appendChild(li); 
    }
    
}


window.onload = (event) => {
    const loadData=async()=>{
        try{
            let data=axios.get('http://localhost:9999/get-all-books')
            let final_data=await data
            for(var i=0;i<final_data.data.books.length;i++){
                show_books(final_data.data.books[i])
            }
        }
        catch(err){
            console.error(err)
        }
    }
    loadData();
    
};

function show_books(book){
    var name=book['name'];
    var taken_on=book['taken_on'];
    var return_on=book['taken_on'];
    var is_return=book['is_return'];
    var book_fine=book['book_fine']
    var create_item=document.createElement('li')
    create_item.innerHTML=`
    <h6>Book Name: ${name}</h6>
    <h6>Book taken on: ${taken_on}</h6>
    <h6>Book return on: ${return_on}</h6>
    <h6>Book fine: ${book_fine}</h6>
    `
    create_item.className='list-group-item'

    
        
    if(is_return===false){
        var btn_edit=document.createElement('button');
        var btn_pay=document.createElement('button');
        var add_text=document.createTextNode('Return Book')
        var pay_text=document.createTextNode('Pay fine');
        btn_edit.appendChild(add_text)
        btn_pay.appendChild(pay_text)
        btn_edit.className='btn btn-info btn-sm mr-2 float-right icon-check-sign done'
        btn_pay.className='btn btn-danger btn-sm mr-2 float-right icon-check-sign invisible pay_fine'
        create_item.appendChild(btn_pay)
        create_item.appendChild(btn_edit)

        item_list.appendChild(create_item);
    }
    else{
        done_item_list.appendChild(create_item);
    }
       
}