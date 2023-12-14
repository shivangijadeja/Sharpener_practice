const send_button=document.querySelector('.send_btn')
const msg_input=document.querySelector('#message_box')

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
    const post_msg=await axios.post('/post-meesage',chatHis)
    console.log(post_msg)
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}