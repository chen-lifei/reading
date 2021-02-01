<template>
    <div class="signup">
        <div class="title">注册</div>
        <el-form :model="ruleForm" :rules="rules" label-width="80px" ref="ruleForm" class="signupForm">
            <el-form-item label="用户名" prop="name" required>
                <el-input type="text" v-model="ruleForm.name" autocomplete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="ruleForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass" required>
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码（6-16个字符组成，区分大小写）"></el-input>
            </el-form-item>
            <el-form-item label="阅读倾向" prop="favor" class="favor">
                <el-input v-model="favor" @change="handleKeyDown">
                    <el-button type="primary" slot="append" @click="addLabel(favor)">添加此标签</el-button>
                </el-input>
                <div class="labels">
                    <el-tag v-for="item in userLabels" :key="item" type="success" closable @close="handleClose(item)">{{ item }}</el-tag>
                </div>
                <div class="selectLabel">
                    <div class="select">
                        <i class="el-icon-reading"></i>
                        <span>示例标签，可点击进行选择</span>
                    </div>
                    <el-tag v-for="item in typicalLables" :key="item" @click="addLabel(item)" :type="hasLabel(item) ? 'info' : ''">{{ item }}</el-tag>
                </div>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile" required>
                <el-input placeholder="请填写手机号码" v-model="ruleForm.mobile">
                    <el-select v-model="selectCountry" slot="prepend" placeholder="中国大陆" style="width: 110px">
                        <el-option v-for="item in country" :label="item.cname" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item prop="code" required class="code">
                <el-input placeholder="请输入短信验证码" v-model="ruleForm.code">
                    <el-button type="primary" slot="append">获取验证码</el-button>
                </el-input>
            </el-form-item>
            <div class="submit" @click="submitForm(ruleaForm)">注册</div>
            <router-link class="login" to="/login">已有账号，直接登录&gt;</router-link>
        </el-form>
    </div>
</template>

<script>
import { COUNTRY } from '@/constants/common.js'

export default {
    components: {},
    props: {},
    data () {
        var validateMobile = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入手机号码！'))
            }
            var phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
            if (!phone.test(value)) {
                return callback(new Error('请输入正确的手机号码！'))
            }
        }
        var validateEmail = (rule, value, callback) => {
            var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if (!email.test(value)) {
                callback(new Error('请输入正确的邮箱！'))
            }
        }
        var validateName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入用户名！'))
            }
        }
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码！'))
            }
        }
        var validateCode = (rule, value, callback) => {
            if (!/\d{6}/.test(value)) {
                callback(new Error('请输入正确的6位验证码！'))
            }
        }
        return {
            ruleForm: {
                name: '',
                mobile: '',
                email: '',
                pass: '',
                code: ''
            },
            rules: {
                mobile: [{ validator: validateMobile, trigger: 'blur' }],
                email: [{ validator: validateEmail, trigger: 'blur' }],
                pass: [{ validator: validatePass, trigger: 'blur' }],
                name: [{ validator: validateName, trigger: 'blur' }],
                code: [{ validator: validateCode, trigger: 'blur' }]
            },
            country: COUNTRY,
            selectCountry: '',
            favor: '',
            userLabels: [],
            typicalLables: [
                '耽美', '经典', '都市', '流行', '骨科', '国内', '宗教', '莎士比亚', '青春文学', '散文', '诗歌', '游记'
            ]
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
        handleClose (label) {
            this.userLabels.splice(this.userLabels.indexOf(label), 1)
        },
        addLabel (label) {
            if (!this.userLabels.includes(label)) {
                this.userLabels.push(label)
                this.favor = ''
            }
        },
        hasLabel (label) {
            if (this.userLabels.includes(label)) {
                return true
            }
            return false
        },
        handleKeyDown (value) {
            this.addLabel(value)
        }
    },
    created () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.signup {
    max-width: 900px;
    margin: 100px auto;
    .title {
        text-align: center;
        font-size: 24px;
        padding-bottom: 40px;
        margin-bottom: 30px;
        border-bottom: 1px solid #dddddd;
    }
    .signupForm {
        width: 500px;
        margin: 0 auto;
        .el-form-item {
            margin-bottom: 30px;
        }
        .favor,
        .code {
            /deep/ .el-input-group__append,
            /deep/ .el-input-group__prepend {
                background-color: plum;
                color: #fff;
            }
        }
        .favor {
            .labels {
                margin: 10px 0;
            }
            .selectLabel {
                .select {
                    color: #00a1d6;
                    font-size: 12px;
                    margin-left: 10px;
                }
                width: 100%;
                border: 1px solid #dcdfe6;
            }
            .el-tag {
                margin: 10px;
                cursor: pointer;
            }
        }
        .submit {
            width: 200px;
            height: 40px;
            border-radius: 5px;
            border: 1px solid #bbbbbb;
            cursor: pointer;
            text-align: center;
            line-height: 40px;
            color: #fff;
            margin: 0 auto;
            background-color: plum;
            margin-bottom: 10px;
        }
        .login {
            float: right;
            color: #00a1d6;
            cursor: pointer;
            text-decoration: none;
            font-size: 12px;
        }
    }
}
</style>
