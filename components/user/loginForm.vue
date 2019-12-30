<template>
  <el-form :model="form" ref="form" :rules="rules" lass="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // rule：定义校验规则
    // value：表单输入框的值
    // callback：回调函数，可以接受错误的提示，如果验证通过callback就不用传递参数，callback必须调用
    const validateUsername = (rule, value, callback) => {
      const reg = /^1[3-9][0-9]{9}$/;
      // 正则表达式判断返回的布尔类型的true和false
      // 如果是true就代表验证通过，如果是false接受验证失败
      if (reg.test(value)) {
        // 验证通过
        callback();
      } else {
        // 验证失败提示
        callback("手机号码格式错误");
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      // 验证用户信息是否正确
      // validate方法是elementui给el-form表单提供验证的函数
      this.$refs["form"].validate(valid => {
        // valid代表验证是否通过
        if (!valid) return;
        // dispatch是store中的方法， 调用user中的login方法
        this.$store.dispatch('user/login', this.form).then(res=>{
          if(res=== true){
            // 登录成功提示用户
            this.$message.success('登录成功，返回上一页')
          }
        })
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  margin: 25px;
  box-sizing: border-box;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
.el-form {
  padding: 15px;
}
</style>
