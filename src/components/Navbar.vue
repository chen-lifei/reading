<template>
    <div class="navbar">
        <i class="smallNavBtn" :class="[showNav ? unfold : fold]" @click="showNav = !showNav" width="30"></i>
        <div class="smallNav" v-show="showNav">
            <el-input placeholder="search..." v-model="search" class="navSearch">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <ul>
                <li v-for="(item, i) in smallNavbarList" :key="i" @click="hiddenNav">
                    <router-link :to="`/${item.id}`">{{item.name}}</router-link>
                </li>
            </ul>
        </div>
        <div class="logo">
            <img src="@/assets/logo.png" />
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
            <div class="user" v-if="isLogin">
                <router-link to="/" class="bookShelf">我的书架</router-link>
                <img src="@/assets/hua.png" class="avatar" />
            </div>
            <div v-else class="toLogin">
                <router-link to="/login" class="login">登录</router-link>
                <router-link to="/signup" class="signup">注册</router-link>
            </div>
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
      smallNavbarList: [
        { id: 'masterpiece', name: '名著阅读' },
        { id: 'story', name: '小说阅读' },
        { id: 'children', name: '儿童阅读' },
        { id: 'life', name: '生活阅读' },
        { id: 'science', name: '科普阅读' }
      ],
      search: '',
      isLogin: false,
      showNav: false,
      fold: 'el-icon-s-fold',
      unfold: 'el-icon-s-unfold'
    }
  },
  watch: {
  },
  computed: {},
  methods: {
    changeStyle (index) {
      this.current = index
    },
    hiddenNav () {
      this.showNav = false
    },
    getNavStatus () {
      window.onresize = () => {
        const width = window.innerWidth
        if (width >= 800) {
          this.showNav = false
        }
      }
    }
  },
  created () {},
  mounted () {
    this.getNavStatus()
  }
}
</script>
<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
a {
    text-decoration: none;
}
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #dddddd;
    .smallNavBtn {
        display: none;
        font-size: 24px;
        margin-left: 20px;
        cursor: pointer;
    }
    .smallNav {
        position: absolute;
        width: 100%;
        left: 0;
        top: 60px;
        padding: 0 5px;
        background-color: #dddddd;
        z-index: 8;
        .navSearch,
        ul {
            margin-bottom: 10px;
        }
        li {
            height: 35px;
            line-height: 35px;
            color: white;
            border-top: 1px solid #eee;
            padding-left: 10px;
            a {
                color: #ffffff;
            }
        }
        li:last-child {
            border-bottom: 1px solid #eee;
        }
    }
    .logo {
        width: 50px;
        height: 50px;
        margin-left: 20px;
        img {
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    }
    .nav ul li {
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
        font-size: 18px;
    }
    .userStatus {
        margin-right: 20px;
        .user {
            display: flex;
            align-items: center;
            height: 100%;
            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-left: 20px;
                cursor: pointer;
            }
        }
        .toLogin {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 80px;
            height: 100%;
        }
    }
}
@media (max-width: 800px) {
    .navbar {
        .smallNavBtn {
            display: inline-block;
        }
        .nav,
        .search {
            display: none;
        }
    }
}
</style>
