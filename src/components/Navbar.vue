<template>
  <div class="navbar">
    <div class="logo">
      <img src="@/assets/book.jpg" />
    </div>
    <div class="nav">
      <ul>
        <li v-for="(item, i) in navbarList" :key="i" @click="changeStyle(i)" :class="{change: i == current}">
          <router-link :to="`/${item.id}`" style="padding: 20px 0">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
    <div class="search">
      <el-input placeholder="search..." v-model="search">
        <el-button slot="append" icon="el-icon-search" style="padding-left: 10px"></el-button>
      </el-input>
    </div>
    <div class="avatar">
      <img src="@/assets/hua.png" />
    </div>
    <div class="signin">
      <div class="login">登录</div>
      <div class="signup">注册</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      current: 0,
      navbarList: [
        { id: 'masterpiece', name: '名著' },
        { id: 'story', name: '小说' },
        { id: 'children', name: '儿童' },
        { id: 'life', name: '生活' },
        { id: 'science', name: '科普' }
      ],
      search: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    changeStyle (index) {
      this.current = index
      console.log(this.$route)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
.navbar {
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  background: url(../assets/bg.png) 5px;
  .logo {
    width: 300px;
    height: 50px;
    margin: 0 50px 0 50px;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  .nav ul li{
    float: left;
    list-style: none;
    font-size: 16px;
    line-height: 50px;
    margin: 0 20px;
    padding-bottom: 2px;
    cursor: pointer;
    .change {
      color: plum;
      border-bottom: 4px solid plum;
    }
  }
  .nav ul li:hover {
    border-bottom: 4px solid plum;
  }
  .search {
    margin: 5px 250px 0 50px;
    font-size: 18px;
  }
  .avatar {
    margin-top: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 30px;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  .signin {
    display: flex;
    margin-top: 5px;
    .login,
    .signup {
      width: 60px;
      height: 40px;
      border: 1px solid plum;
      text-align: center;
      line-height: 40px;
      color: plum;
      cursor: pointer;
    }
    .login {
      border-radius: 22px 0 0 22px;
    }
    .signup {
      border-radius: 0 22px 22px 0;
    }
    .login:hover,
    .signup:hover {
      color: #F5F7FA;
      background-color: plum;
    }
  }
}
</style>
