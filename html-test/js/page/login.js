/**
 * Created by 随心 on 2018/6/14 0014.
 */




// 发送 post 请求
function post(url, data = {}) {
    return $.ajax({
        type: 'post',
        url,
        data: JSON.stringify(data),
        contentType: "application/json",
    })
}


$('.user_login_btn').click(function () {
    var username = $('#account-number').val();
    var password = $('#password').val();
    localStorage.setItem('username', username);


    const url = '/api/user/login'
    const data = {
        username,
        password
    }
    post(url, data).then(res => {
        if (res.errno === 0) {
            // 登录成功
            location.href = 'admin.html'
        } else {
            // 登录失败
            alert(res.message)
        }
    })


});
