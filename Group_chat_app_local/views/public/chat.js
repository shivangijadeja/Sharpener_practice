const send_button=document.querySelector('.send_btn')
const msg_input=document.querySelector('#message_box')
const msg_table=document.querySelector('.msg_table')
const user_list=document.querySelector('.user_list')
const create_group_form =document.querySelector('.create_group')
const list_of_groups=document.querySelector('.list_of_groups')

list_of_groups.addEventListener("click",onSelectGroup)

send_button.addEventListener("click",onSendMessage)

user_list.addEventListener("click",setUserChecked)

create_group_form.addEventListener("submit",addGroup)

async function onSendMessage(e){
    const token = localStorage.getItem('token');
    const decoded = parseJwt(token);
    const input_val=msg_input.value
    const user_id=decoded.user_id
    const selected_grp=document.querySelector('#selected_grp_name').value
    let chatHis;
    if(selected_grp==='Common-chats'){
        chatHis={
            "message":input_val,
            "user_id":user_id
        }
        try{
            const post_msg=await axios.post('/post-common-meesage',chatHis)
        }
        catch(err){
            alert(err)
        }
    }
    else{
        chatHis={
            "message":input_val,
            "user_id":user_id,
            "group_name":selected_grp
        }
        try{
            const post_msg=await axios.post('/post-meesage',chatHis)
        }
        catch(err){
            alert(err)
        }
    }

}

async function addGroup(e){
    const token = localStorage.getItem('token');
    const decoded = parseJwt(token);
    const admin_user_id=decoded.user_id
    e.preventDefault();
    const group_name=document.querySelector('.grp_name').value;
    const selected_users=[]
    const users=Array.from(user_list.querySelectorAll('input'))
    users.forEach(element => {
        if(element.getAttribute('is_checked')==='true'){
            selected_users.push(element.getAttribute('id'))
        }
    });
    const grp={
        "name":group_name,
        "users":selected_users,
        "admin_id":admin_user_id
    }
    try{
        const add_group=await axios.post('/add-group',grp)
        alert("group created successfully")
    }
    catch(err){
        console.log(err)
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
    const selected_grp=document.querySelector('#selected_grp_name').value
    const token = localStorage.getItem('token');
    const fetch_all_msgs=await axios.get(`/get-all-messages`,{headers:{'Authorization':token}})
    display_messages(fetch_all_msgs.data.messages)
    try{
        const get_users=await axios.get('/user/all-users')
        if(get_users.data.users.length>0){
            for(let i=0;i<get_users.data.users.length;i++){
                const li=document.createElement('li')
                const check_box=document.createElement('INPUT')
                check_box.setAttribute("type", "checkbox")
                check_box.setAttribute("value", get_users.data.users[i].user_name)
                check_box.setAttribute("id", get_users.data.users[i].id)
                check_box.setAttribute("is_checked", false)
                const u_name=document.createTextNode(get_users.data.users[i].user_name)
                li.appendChild(check_box)
                li.appendChild(u_name)
                user_list.appendChild(li)
            }
        }
        const get_all_groups=await axios.get('/get-all-groups',{headers:{'Authorization':token}})
        display_groups(get_all_groups.data.groups)
    }
    catch(err){
        console.error(err)
    }
    
})

async function display_groups(arr_of_grps){
    arr_of_grps.forEach(element=>{
        const tr=document.createElement('tr')
        const td=document.createElement('td')
        var add_text=document.createTextNode(element.name)
        td.appendChild(add_text)
        tr.appendChild(td)
        list_of_groups.appendChild(tr)
    })
}

async function display_messages(arr_of_msgs){
    while (msg_table.firstChild) {
        msg_table.removeChild(msg_table.lastChild);
    }
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

async function onSelectGroup(e){
    const token = localStorage.getItem('token');
    while (msg_table.firstChild) {
        msg_table.removeChild(msg_table.lastChild);
    }
    const selected_grp=e.srcElement.innerText
    document.querySelector('#selected_grp_name').value=selected_grp
    try{
        if(selected_grp==='Common-chats'){
            const fetch_all_msgs=await axios.get(`/get-all-messages`,{headers:{'Authorization':token}})
            display_messages(fetch_all_msgs.data.messages)
        }
        else{
            const fetch_grp_msgs=await axios.get(`/get-group-messages?group=${selected_grp}`)
            display_messages(fetch_grp_msgs.data.messages)
        }
        
    }
    catch(err){
        console.log(err)
    }
}