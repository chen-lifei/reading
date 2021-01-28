<template>
    <div class="login">
        <div class="title">登录</div>
        <div class="loginContent">
            <div class="leftCode">

            </div>
            <div class="rightLogin">
                <div class="selectLogin">
                    <span :class="{ active: passwordLogin }" @click="selectLogin(0)">密码登录</span>
                    <span :class="{ active: !passwordLogin }" @click="selectLogin(1)">短信登录</span>
                </div>
                <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" class="loginForm">
                    <el-form-item prop="account">
                        <el-input type="text" v-model="ruleForm.account" autocomplete="off" placeholder="请输入手机号/邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <div class="remember">
                        <el-checkbox label="记住我" name="type"></el-checkbox><span>不是自己的电脑上不要勾选此项</span>
                        <a class="forget">忘记密码?</a>
                    </div>
                    <div class="formBottom">
                        <div class="submit" @click="submitForm('ruleForm')">登录</div>
                        <div class="signup">注册</div>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号！'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码！'))
      }
    }
    return {
      ruleForm: {
        account: '',
        pass: ''
      },
      rules: {
        account: [{ validator: validateAccount, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }]
      },
      passwordLogin: true
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    selectLogin (status) {
      if (status === 0) {
        this.passwordLogin = true
      } else {
        this.passwordLogin = false
      }
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
.login {
    width: 900px;
    margin: 0 auto;
    .title {
        text-align: center;
        font-size: 24px;
        margin: 30px 0;
    }
    .loginContent {
        display: flex;
        width: 100%;
        height: auto;
        border-top: 1px solid #dddddd;
        padding-top: 30px;
        .leftCode {
            width: 50%;
            border-right: 1px solid #dddddd;
        }
        .rightLogin {
            width: 50%;
            padding: 0 20px;
            box-sizing: border-box;
            .selectLogin {
                margin: 20px 0;
                span {
                    cursor: pointer;
                    margin-right: 20px;
                }
            }
            .loginForm {
                margin-bottom: 20px;
                .el-form-item {
                  margin-bottom: 30px;
                }
                .remember {
                    font-size: 14px;
                    span {
                        padding-left: 20px;
                        color: #bbbbbb;
                    }
                    a {
                        float: right;
                        color: #00a1d6;
                        cursor: pointer;
                    }
                }
                .formBottom {
                    display: flex;
                    width: 100%;
                    margin-top: 20px;
                    box-sizing: border-box;
                    .submit,
                    .signup {
                        width: 50%;
                        height: 40px;
                        border-radius: 5px;
                        border: 1px solid #bbbbbb;
                        cursor: pointer;
                        text-align: center;
                        line-height: 40px;
                    }
                    .submit {
                      color: #fff;
                      margin-right: 20px;
                      background-color: plum;
                    }
                }
            }
        }
    }
    .active {
      color: plum;
    }
}
</style>
