<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" status-icon label-position="top" ref="ruleForm" class="loginForm">
            <el-form-item label="账号" prop="account">
                <el-input type="text" v-model="ruleForm.account" autocomplete="off" size="small" placeholder="请输入手机号/邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" size="small" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" size="small" class="submit">登录</el-button>
            </el-form-item>
        </el-form>
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
      }
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
.submit {
    background-color: plum;
    border-color: plum;
    width: 50%;
    border-radius: 20px;
    margin-top: 20px;
    margin-left: 50%;
    transform: translateX(-50%);
}
</style>
