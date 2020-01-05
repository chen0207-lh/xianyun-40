// 保存user下的数据
export const state = () => ({
  userInfo: {}
})
// 同步修改state的数据
export const mutations = {
  // 自定义一个函数修改state里面的数据
  // mutations函数第一个参数是state，state就是上面的state对象
  setUserInfo(state, data) {
    // 函数的修改方式是为了方便修改其他逻辑
    state.userInfo = data
  }
}
// 异步修改state的数据
// 存放公共的请求函数，并且该函数可能会修改state的数据(不需要修改的也可以)
export const actions = {
  login(store, data) {
    // console.log(store)
    // store中的参数有dispatch commit getters rootGetters rootState
    // 发送请求获取用户信息
    // return需要返回登录成功的结果回去并在loginForm页面做出提示用户已经登录成功
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data
    }).then(res => {
      //   console.log(res);
      // 登录成功后返回上一个页面
      this.$router.back()
      // 调用user下的commit的方法
      store.commit('setUserInfo', res.data)
      return true
    });
  },
  // 获取验证码
  setCaptcha(store, data) {
    return this.$axios({
      url: "/captchas",
      method: "POST",
      data: {
        tel: data
      }
    })
  },
  // 注册
  registerForm(store, data) {
    return this.$axios({
      url: "/accounts/register",
      method: "POST",
      data
    }).then(res => {
      console.log(res)
    });
  }
}
