<template>
    <div class="login">
        <div class="title">登录</div>
        <div class="loginContent">
            <div class="leftCode">
                <div class="code"></div>
                <p>...</p>
            </div>
            <div class="rightLogin">
                <div class="selectLogin">
                    <span :class="{ active: passwordLogin }" @click="selectLogin(0)">密码登录</span>
                    <span :class="{ active: !passwordLogin }" @click="selectLogin(1)">短信登录</span>
                </div>
                <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" class="loginForm password" v-show="passwordLogin">
                    <el-form-item prop="account">
                        <el-input type="text" v-model="ruleForm1.account" autocomplete="off" placeholder="请输入手机号/邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input type="password" v-model="ruleForm1.pass" autocomplete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" class="loginForm message" v-show="!passwordLogin">
                    <el-form-item prop="phone">
                        <el-input placeholder="请填写手机号码" v-model="ruleForm2.phone">
                            <el-select v-model="selectCountry" slot="prepend" placeholder="中国大陆" style="width: 110px">
                                <el-option v-for="item in country" :label="item.cname" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input placeholder="请输入短信验证码" v-model="ruleForm2.code" class="code">
                            <el-button type="primary" slot="append">获取验证码</el-button>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div class="remember">
                    <el-checkbox label="记住我" name="remember" v-model="remember"></el-checkbox><span>谨慎勾选哦！</span>
                    <span class="forget">忘记密码?</span>
                </div>
                <div class="formBottom">
                    <el-button :plain="true" class="submit" @click="submitForm">登录</el-button>
                    <div class="signup" @click="toSignup">注册</div>
                </div>
                <div class="otherLogin">
                    <div class="quickLogin">
                        <img src="@/assets/public/qq.svg" alt="">QQ
                    </div>
                    <div class="quickLogin">
                        <img src="@/assets/public/wechat.svg" alt="">微信
                    </div>
                    <div class="quickLogin">
                        <img src="@/assets/public/weibo.svg" alt="">新浪微博
                    </div>
                </div>
                <p class="qucikMethod">可选择快捷登录方式</p>
            </div>
        </div>
    </div>
</template>

<script>
import { COUNTRY } from '@/constants/common.js'

export default {
    components: {},
    props: {},
    data () {
        var validateAccount = (rule, value, callback) => {
            var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            var phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
            if (!email.test(value) && !phone.test(value)) {
                callback(new Error('请输入正确的账号！'))
            } else {
                callback()
            }
        }
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码！'))
            } else {
                callback()
            }
        }
        var validatePhone = (rule, value, callback) => {
            var phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
            if (!phone.test(value)) {
                callback(new Error('请输入正确的手机号码！'))
            } else {
                callback()
            }
        }
        var validateCode = (rule, value, callback) => {
            if (!/\d{6}/.test(value)) {
                callback(new Error('请输入正确的6位验证码！'))
            } else {
                callback()
            }
        }
        return {
            ruleForm1: {
                account: '',
                pass: ''
            },
            ruleForm2: {
                phone: '',
                code: ''
            },
            rules: {
                account: [{ validator: validateAccount, trigger: 'blur' }],
                pass: [{ validator: validatePass, trigger: 'blur' }],
                phone: [{ validator: validatePhone, trigger: 'blur' }],
                code: [{ validator: validateCode, trigger: 'blur' }]
            },
            passwordLogin: true,
            country: COUNTRY,
            selectCountry: '',
            userInfo: [],
            remember: false
        }
    },
    methods: {
        submitForm () {
            let formName = ''
            if (this.passwordLogin) {
                formName = 'ruleForm1'
            } else {
                formName = 'ruleForm2'
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.axios.get('http://localhost:3000/get_user').then((res) => {
                        let account = this.ruleForm1.account
                        this.userInfo = res.data.find(item => item.user_email === account || item.user_phone === account)
                        if (!this.userInfo) {
                            this.$message.error('密码或账号输入错误，登录失败！')
                        } else {
                            if (this.userInfo.user_password === this.ruleForm1.pass) {
                                this.$store.commit('getUserInfo', this.userInfo)
                                this.rememberLogin()
                                this.$message({
                                    message: '登录成功！',
                                    type: 'success',
                                    duration: 1000
                                })
                                this.$router.push({ name: 'home' })
                            } else {
                                this.$message.error('密码或账号输入错误，登录失败！')
                            }
                        }
                    })
                } else {
                    console.log('error submit!!')
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
        },
        /** 点击[记住我]时，把用户的Id存储到localStorage中 */
        rememberLogin () {
            if (this.remember) {
                localStorage.setItem('reading_user_info', JSON.stringify(this.$store.state.userInfo))
            }
        }
    },
    created () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    margin: 100px auto;
    padding: 0 20%;
    .title {
        text-align: center;
        font-size: 24px;
        margin-bottom: 40px;
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
            padding: 60px 0;
            box-sizing: border-box;
            .code {
                margin: 0 auto;
                width: 200px;
                height: 200px;
                background-color: palegreen;
                margin-bottom: 15px;
            }
            p {
                text-align: center;
                color: #222;
                font-size: 18px;
                letter-spacing: 3px;
                margin: 5px 0;
            }
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
            }
            .message {
                .code {
                    /deep/ .el-input-group__append,
                    /deep/ .el-input-group__prepend {
                        background-color: plum;
                        color: #fff;
                    }
                }
            }
            .remember {
                width: 100%;
                font-size: 12px;
                height: 20px;
                line-height: 20px;
                span {
                    padding-left: 20px;
                    color: #bbbbbb;
                }
                .forget {
                    float: right;
                    color: #00a1d6;
                    cursor: pointer;
                }
            }
            .formBottom {
                display: flex;
                width: 100%;
                margin: 20px 0 30px 0;
                box-sizing: border-box;
                .submit,
                .signup {
                    width: 50%;
                    height: 40px;
                    border-radius: 5px;
                    border: 1px solid #bbbbbb;
                    cursor: pointer;
                    text-align: center;
                }
                .submit {
                    color: #fff;
                    margin-right: 20px;
                    background-color: plum;
                }
                .signup {
                    line-height: 40px;
                }
            }
            .otherLogin {
                display: flex;
                justify-content: space-around;
                .quickLogin {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: 12px;
                    img {
                        width: 32px;
                        height: 32px;
                        margin-bottom: 6px;
                        cursor: pointer;
                    }
                }
            }
            .qucikMethod {
                font-size: 10px;
                color: #bbbbbb;
                text-align: center;
                padding: 10px 0 20px 0;
            }
        }
        @media (max-width: 850px) {
            flex-direction: column;
            .leftCode {
                width: 100%;
                border-right: 0;
                padding: 40px 0;
                border-bottom: 1px solid #dddddd;
            }
            .rightLogin {
                padding: 0 10%;
                width: 100%;
            }
        }
    }
    .active {
        color: plum;
    }
    @media (max-width: 1200px) {
        padding: 0 10%;
    }
    @media (max-width: 1050px) {
        padding: 0;
    }
}
</style>
