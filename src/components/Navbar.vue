<template>
    <div class="navbar">
        <i class="smallNavBtn" :class="[showNav ? unfold : fold]" @click="showNav = !showNav" width="30"></i>
        <div class="smallNav" v-show="showNav">
            <el-input placeholder="search..." v-model="search" class="navSearch">
                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
            <el-menu :default-active="activeIndex" class="navMenu">
                <el-menu-item index="1">
                    <router-link :to="{ path: '/masterpiece' }">名著阅读</router-link>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <span>小说阅读</span>
                    </template>
                    <el-menu-item index="item.name" v-for="(item, index) in storyList" :key="index" @click="changeNav(item.id)">
                        {{item.name}}
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="3">
                    <router-link :to="{ path: '/children' }">儿童阅读</router-link>
                </el-menu-item>
                <el-menu-item index="4">
                    <router-link :to="{ path: '/science' }">科普阅读</router-link>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="logo">
            <img src="@/assets/public/logo.png" @click="toHome" />
        </div>
        <el-menu :default-active="activeIndex" class="nav" mode="horizontal">
            <el-menu-item index="1">
                <router-link :to="{ path: '/masterpiece' }">名著</router-link>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    小说
                </template>
                <el-menu-item index="item.name" v-for="(item, index) in storyList" :key="index" @click="changeNav(item.id)">
                    {{item.name}}
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
                <router-link :to="{ path: '/children' }">儿童</router-link>
            </el-menu-item>
            <el-menu-item index="4">
                <router-link :to="{ path: '/science' }">科普</router-link>
            </el-menu-item>
        </el-menu>
        <div class="search">
            <el-input placeholder="search..." v-model="search">
                <el-button slot="append" icon="el-icon-search" style="padding-left: 10px" @click="handleSearch"></el-button>
            </el-input>
        </div>
        <div class="userStatus">
            <div class="user" v-if="!isLogin">
                <img :src="user_avatar" class="avatar" @click="toReader" />
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
    data () {
        return {
            current: 0,
            smallNavbarList: [
                { id: 'masterpiece', name: '名著阅读' },
                { id: 'story', name: '小说阅读' },
                { id: 'children', name: '儿童阅读' },
                { id: 'science', name: '科普阅读' }
            ],
            storyList: [
                { id: 'story', name: '小说首页' },
                { id: 'classical', name: '古典小说' },
                { id: 'suspense', name: '悬疑小说' },
                { id: 'inferential', name: '推理小说' },
                { id: 'history', name: '历史小说' },
                { id: 'scienceFiction', name: '科幻小说' },
                { id: 'fantasy', name: '玄幻小说' },
                { id: 'romantic', name: '言情小说' },
                { id: 'supernatural', name: '仙侠小说' },
                { id: 'martial', name: '武侠小说' }
            ],
            activeIndex: '',
            search: '',
            isLogin: true,
            showNav: false,
            fold: 'el-icon-s-fold',
            unfold: 'el-icon-s-unfold',
            user_avatar: 'https://cdn.jsdelivr.net/gh/chen-lifei/reading@master/src/assets/public/avatar.png'
        }
    },
    watch: {
        userInfo (newVal) {
            if (newVal.user_id) {
                this.isLogin = false
                this.user_avatar = newVal.user_avatar || this.user_avatar
            }
        }
    },
    computed: {
        userInfo () {
            return this.$store.state.userInfo
        }
    },
    methods: {
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
        },
        toHome () {
            this.$router.push({ name: 'home' })
        },
        getLoginStatus () {
            let localUserInfo = JSON.parse(localStorage.getItem('reading_user_info'))
            if (localUserInfo) {
                this.isLogin = false
                this.user_avatar = localUserInfo.user_avatar || this.user_avatar
            }
        },
        changeNav (category) {
            if (this.$route.name !== category) {
                this.$router.push({
                    path:
                        category === 'story' ? '/story' : `/story/${category}`
                })
            }
        },
        getActiveIndex () {
            let current = this.$route.name
            switch (current) {
                case 'masterpiece':
                    this.activeIndex = '1'
                    break
                case 'story':
                    this.activeIndex = '2'
                    break
                case 'children':
                    this.activeIndex = '3'
                    break
                case 'science':
                    this.activeIndex = '4'
                    break
            }
        },
        handleSearch () {
            if (this.search) {
                this.$router.push({ name: 'booklist', query: { search: this.search } })
                this.search = ''
            }
        },
        toReader () {
            this.$router.push({ path: '/reader' })
        }
    },
    mounted () {
        this.getNavStatus()
        this.getLoginStatus()
        this.getActiveIndex()
    }
}
</script>

<style lang="less" scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #dddddd;
    background-color: #ffffff;
    opacity: 0.8;
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
        background-color: lightsteelblue;
        z-index: 8;
        padding: 0 20px;
        .navSearch {
            margin: 20px 0;
        }
        .navMenu {
            border-radius: 8px;
            margin-bottom: 20px;
            a {
                display: inline-block;
                width: 100%;
                height: 100%;
                color: #5c5c5c;
            }
        }
        /deep/ .el-input-group__append {
            margin: 0;
            padding: 0;
        }
        /deep/ .el-button,
        .el-button--default {
            padding: 0;
            margin: 0 10px;
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
    .nav {
        a {
            display: inline-block;
            height: 60px;
            line-height: 60px;
        }
        /deep/ .is-active,
        /deep/ .is-active .el-submenu__title {
            border-bottom: 2px solid plum;
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
    @media (max-width: 1000px) {
        opacity: 1;
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
