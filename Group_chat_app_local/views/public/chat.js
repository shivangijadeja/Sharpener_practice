const send_button=document.querySelector('.send_btn')
const msg_input=document.querySelector('#message_box')
const msg_table=document.querySelector('.msg_table')
const user_list=document.querySelector('.user_list')

send_button.addEventListener("click",onSendMessage)

user_list.addEventListener("click",setUserChecked)

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
    const local_storage_msgs=localStorage.getItem("chatHistory")
    if(local_storage_msgs.length>1){
        const parsedChatHistory = JSON.parse(local_storage_msgs);
        const lastMessageId = parsedChatHistory[parsedChatHistory.length - 1].messageId;
        const fetch_all_msgs=await axios.get(`/get-all-messages?lastMessageId=${lastMessageId}`,{headers:{'Authorization':token}})
        const mergedChats = [...parsedChatHistory, ...fetch_all_msgs.data.messages];
        const savingChats=mergedChats.slice(-1000)
        localStorage.setItem("chatHistory",JSON.stringify(savingChats))
        display_messages(savingChats)
    }
    else{
        const fetch_all_msgs=await axios.get(`/get-all-messages?lastMessageId=0`,{headers:{'Authorization':token}})
        const msgs=fetch_all_msgs.data.messages
        const savingChats=msgs.slice(-1000)
        localStorage.setItem("chatHistory",JSON.stringify(savingChats))
        display_messages(savingChats)
    }
    try{
        const get_users=await axios.get('/user/all-users')
        if(get_users.data.users.length>0){
            for(let i=0;i<get_users.data.users.length;i++){
                const li=document.createElement('li')
                const check_box=document.createElement('INPUT')
                check_box.setAttribute("type", "checkbox")
                check_box.setAttribute("value", get_users.data.users[i].user_name)
                check_box.setAttribute("id", get_users.data.users[i].user_name)
                check_box.setAttribute("is_checked", false)
                const u_name=document.createTextNode(get_users.data.users[i].user_name)
                li.appendChild(check_box)
                li.appendChild(u_name)
                user_list.appendChild(li)
            }
        }
    }
    catch(err){
        console.error(err)
    }
    
})

async function display_messages(arr_of_msgs){
    arr_of_msgs.forEach(element => {
        const tr=document.createElement('tr')
        const td=document.createElement('td')
        var add_text=document.createTextNode(element.name.concat("  :  ",element.message))
        td.appendChild(add_text)
        tr.appendChild(td)
        msg_table.appendChild(tr)
    });

}

function setUserChecked(e){
    const selected_ele=e.srcElement
    if(selected_ele.getAttribute('is_checked')==="false"){
        selected_ele.setAttribute('is_checked',true)
    }
    else{
        selected_ele.setAttribute('is_checked',false)
    }
    
}