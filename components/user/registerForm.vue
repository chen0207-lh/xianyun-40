<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input v-model="form.captcha" placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input v-model="form.checkPassword" placeholder="确认密码" type="password"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // rule：定义校验规则
    // value：表单输入框的值
    // callback：回调函数，可以接受错误的提示，如果验证通过callback就不用传递参数，callback必须调用
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        // 密码为空时提示
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        // 密码和第一次输入的密码不一样提示
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        // 手机号码
        username: "",
        // 昵称
        nickname: "",
        // 手机验证码
        captcha: "",
        // 密码
        password: "",
        // 第二次输入的密码
        checkPassword: ""
      },
      // 表单规则
      rules: {
        //   手机号码
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        // 昵称
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [
          { required: true, message: "请输入手机验证码", trigger: "blur" }
        ],
        // 密码
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // 第二次输入的密码
        checkPassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      // 判断用户有没有输入手机号码，如果没有提示用户
      if (!this.form.username) {
        // $confirm 是 Element-ui中的MessageBox 弹框组件
        this.$confirm("手机号码不能为空", "提示", {
          // confirmButtonText：确定按钮的文本内容
          confirmButtonText: "确定",
          // showCancelButton： 是否显示取消按钮
          showCancelButton: false,
          // type：消息类型，用于显示图标 分别有：success/info/warning/error
          type: "warning"
        });
        return;
      }
      // 判断用户输入的手机号码有没有十一位或有没有符合规则，如果没有提示用户
      const reg = /^1[3-9][0-9]{9}$/;
      // this.form.username.length !== 11
      if (reg.test(this.form.username) === false) {
        this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }

      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        const { code } = res.data;
        this.$confirm(`验证码为${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "success"
        });
      });
    },

    // 注册
    handleRegSubmit() {
      console.log(this.form);
      this.$axios({
        url: "/accounts/register",
        method: "POST",
        data: this.form
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
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
</style>