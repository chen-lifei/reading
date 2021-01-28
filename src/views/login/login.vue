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
                    <div class="password" v-if="passwordLogin">
                        <el-form-item prop="account">
                            <el-input type="text" v-model="ruleForm.account" autocomplete="off" placeholder="请输入手机号/邮箱"></el-input>
                        </el-form-item>
                        <el-form-item prop="pass">
                            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
                        </el-form-item>
                    </div>
                    <div class="message" v-else>
                        <el-input placeholder="请填写手机号码" v-model="input3" class="input-with-select">
                            <el-select v-model="select" slot="prepend" placeholder="中国大陆">
                                <el-option label="餐厅名" value="1"></el-option>
                                <el-option label="订单号" value="2"></el-option>
                                <el-option label="用户电话" value="3"></el-option>
                            </el-select>
                        </el-input>
                        <el-input placeholder="请输入短信验证码" v-model="input2" class="code">
                            <el-button type="primary" slot="append">获取验证码</el-button>
                        </el-input>
                    </div>
                    <div class="remember">
                        <el-checkbox label="记住我" name="type"></el-checkbox><span>不是自己的电脑上不要勾选此项</span>
                        <a class="forget">忘记密码?</a>
                    </div>
                    <div class="formBottom">
                        <div class="submit" @click="submitForm('ruleForm')">登录</div>
                        <div class="signup" @click="toSignup">注册</div>
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
    },
    toSignup () {
      this.$router.push({ name: 'signup' })
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
                .password {
                    .el-form-item {
                        margin-bottom: 30px;
                    }
                }
                .message {
                    .el-input {
                        margin-bottom: 30px;
                    }
                    .code {
                        /deep/ .el-input-group__append,
                        /deep/ .el-input-group__prepend {
                            background-color: plum;
                            color: #fff;
                        }
                    }
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
