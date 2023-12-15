const send_button=document.querySelector('.send_btn')
const msg_input=document.querySelector('#message_box')
const msg_table=document.querySelector('.msg_table')

send_button.addEventListener("click",onSendMessage)

async function onSendMessage(e){
    const token = localStorage.getItem('token');
    const decoded = parseJwt(token);
    const input_val=msg_input.value
    const user_id=decoded.user_id
    const chatHis={
        "message":input_val,
        "user_id":user_id
    }
    try{
        const post_msg=await axios.post('/post-meesage',chatHis)
        location.reload()
    }
    catch(err){
        alert(err)
    }

}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.addEventListener("DOMContentLoaded" , async()=>{
    const token = localStorage.getItem('token');
    const fetch_all_msgs=await axios.get('/get-all-messages',{headers:{'Authorization':token}})
    display_messages(fetch_all_msgs.data.messages)
})

async function display_messages(arr_of_msgs){
    arr_of_msgs.forEach(element => {
        const tr=document.createElement('tr')
        const td=document.createElement('td')
        console.log(element)
        var add_text=document.createTextNode(element.name.concat("  :  ",element.message))
        td.appendChild(add_text)
        tr.appendChild(td)
        msg_table.appendChild(tr)
    });

}