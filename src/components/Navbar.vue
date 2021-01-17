<template>
  <div class="navbar">
    <div class="logo">
      <img src="@/assets/book.jpg" />
    </div>
    <div class="nav">
      <ul>
        <li v-for="(item, i) in navbarList" :key="i" @click="changeStyle(i)">
          <router-link :to="`/${item.id}`" :class="{change: i == current}">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
    <div class="search">
      <el-input placeholder="search..." v-model="search">
        <el-button slot="append" icon="el-icon-search" style="padding-left: 10px"></el-button>
      </el-input>
    </div>
    <div class="userStatus">
      <img src="@/assets/hua.png" class="avatar" v-if="!isLogin" />
      <router-link to="/login" class="login" v-else>登录</router-link>
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
      search: '',
      isLogin: false
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
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
    margin: 0 20px;
    padding-bottom: 2px;
    cursor: pointer;
    .change {
      color: plum;
    }
  }
  .search {
    margin-top: 5px;
    font-size: 18px;
  }
  .userStatus {
    width: 40px;
    height: 40px;
    margin-right: 20px;
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .login {
      line-height: 40px;
    }
  }
}
</style>
