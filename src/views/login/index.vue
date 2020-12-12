<template>
  <div class="content">
    <div class="bg">
      <img src="@/assets/leftBg.png" />
    </div>
    <div class="info">
      <div class="infoBox">
        <div class="title">
          <span :class="{ active: islogin }" @click="toLogin">Log In</span>
          <span :class="{ active: !islogin }" @click="toSignup">Sign Up</span>
        </div>
        <div class="login" v-if="islogin">
          <Login />
        </div>
        <div class="signup" v-else>
          <Signup />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './login'
import Signup from './signup'

export default {
  components: {
    Login,
    Signup
  },
  props: {},
  watch: {},
  computed: {},
  data () {
    return {
      islogin: true
    }
  },
  methods: {
    toLogin () {
      this.islogin = true
    },
    toSignup () {
      this.islogin = false
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped src="./login.less">
