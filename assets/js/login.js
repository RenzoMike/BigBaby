
$(function () {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })


  //layui表单验证
  let form = layui.form
  let layer = layui.layer
  form.verify({
    pwd: [
      /^[\S]{6,12}$/,
      '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      // 确认密码框
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致!'
      }
    }
  })



  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {

    e.preventDefault()
    // 发送请求
    // $.post('http://big-event-vue-api-t.itheima.net/api/reg', {
    //   "username": $('#form_reg[name=username]').val(),
    //   "password": $('#form_reg[name=password]').val(),
    // }, function (res) {
    //   // 如果返回的数据等于0就注册失败
    //   if (res.code !== 0) {
    //     return layer.msg('注册成功')
    //   } else {
    //     console.log('注册成功')
    //   }
    // })

    const data = {
      "username": $('#form_reg[name=username]').val(),
      "password": $('#form_reg[name=password]').val(),
      "repassword": $('#form_reg[name=password]').val()
    }

    fetch('http://big-event-vue-api-t.itheima.net/api/reg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "User-Agent": "apifox/1.0.0 (https://www.apifox.cn)"
      },
      //注册的用户信息
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        layer.msg('注册成功', { time: 1000, icon: 6 }, () => {
          setTimeout(() => {
            $('#link_login').click()
          }, 1000)
        })
      })
      .catch((error) => {
        layer.msg(error, { time: 1000 })
      })
  })

  // 监听登录表单的提交事件
  $('#form_login').on('click', function (e) {


    // 阻止默认提交行为 
    // e.preventDefault()

    // /*
    const data = {
      "username": $('#form_login[name=username]').val(),
      "password": $('#form_login[name=password]').val(),
      "repassword": $('#form_login[name=password]').val()
    }
    $.ajax({
      url: 'http://big-event-api-t.itheima.net/api/login',
      method: 'POST',
      // 传的是data而不是body。传数据请求验证,
      // data: {
      //   "username": "lidongxu",
      //   "password": "888888"
      // },
      // data: JSON.stringify(data),
      data: $(this).serialize(),
      headers: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        console.log(res)
        if (res.code !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        // 将登录成功的字符串保存到localStorage中
        // localStorage.serItem(键,值)
        localStorage.serItem('token', res.token)
        // 成功后跳转页面
        setInterval(() => {
          location.href = '/index.html'
        }, 1000)
      }
    })
    // */
  })
})


