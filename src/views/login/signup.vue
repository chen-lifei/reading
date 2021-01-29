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
            <el-form-item label="手机号" prop="mobile" required>
                <el-input placeholder="请填写手机号码" v-model="ruleForm.mobile">
                    <el-select v-model="selectCountry" slot="prepend" placeholder="中国大陆" style="width: 110px">
                        <el-option v-for="item in country" :label="item.cname" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <div class="submit" @click="submitForm(ruleForm)">注册</div>
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
            if (!/^1\d{10}$/.test(value)) {
                return callback(new Error('请输入正确的手机号码！'))
            }
        }
        var validateEmail = (rule, value, callback) => {
            var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if (!email.test(value)) {
                callback(new Error('请输入正确的账号！'))
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
        return {
            ruleForm: {
                name: '',
                mobile: '',
                email: '',
                pass: ''
            },
            rules: {
                mobile: [{ validator: validateMobile, trigger: 'blur' }],
                email: [{ validator: validateEmail, trigger: 'blur' }],
                pass: [{ validator: validatePass, trigger: 'blur' }],
                name: [{ validator: validateName, trigger: 'blur' }]
            },
            country: COUNTRY
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
        }
    },
    created () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.signup {
    width: 900px;
    margin: 0 auto;
    .title {
        text-align: center;
        font-size: 24px;
        padding: 30px 0;
        margin-bottom: 30px;
        border-bottom: 1px solid #dddddd;
    }
    .signupForm {
        width: 500px;
        margin: 0 auto;
        .el-form-item {
            margin-bottom: 30px;
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
        }
    }
}
</style>
