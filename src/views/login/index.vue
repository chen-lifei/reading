<template>
    <div class="content">
        <div class="login" v-if="login">
            <div class="title">
                Log In
            </div>
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="50px"
                class="demo-ruleForm"
            >
                <el-form-item label="账号" prop="id">
                    <el-input type="text" v-model="ruleForm.id" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" size="small" class="submit">提交</el-button>
                </el-form-item>
            </el-form>
            <div class="bottom" @click="changeLogin">立即注册</div>
        </div>
        <div class="signup" v-else>
          <div class="title">
                Sign Up
            </div>
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  props: {},
  watch: {},
  computed: {},
  data () {
    var validateId = (rule, value, callback) => {
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
        id: '',
        pass: ''
      },
      rules: {
        id: [
          { validator: validateId, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      login: true
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
    changeLogin () {
      this.login = false
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped src="./login.less">
