<template>
  <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        status-icon
        label-position="top"
        ref="ruleForm"
    >
        <el-form-item label="用户名" prop="name" >
          <el-input type="text" v-model="ruleForm.name" autocomplete="off" size="small" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile" >
          <el-input type="text" v-model="ruleForm.mobile" autocomplete="off" size="small" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" >
          <el-input type="email" v-model="ruleForm.email" autocomplete="off" size="small" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" size="small" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" size="small" class="submit">注册</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    var validateMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入手机号码！'))
      }
      if (!(/^1\d{10}$/.test(value))) {
        return callback(new Error('请输入正确的手机号码！'))
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱！'))
      }
      // eslint-disable-next-line
      if (!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value))) {
        return callback(new Error('请输入正确的邮箱！'))
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
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        name: [
          { validator: validateName, trigger: 'blur' }
        ]
      },
      islogin: true
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
