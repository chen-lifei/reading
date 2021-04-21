<template>
    <div id="app">
        <Navbar />
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
        <Footer />
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
    name: 'App',
    components: {
        Navbar,
        Footer
    },
    watch: {
        $route (to, from) {
            // 路由变化时，页面滚动到顶部
            document.body.scrollTop = 0 // chrome
            document.documentElement.scrollTop = 0 // firefox
            window.pageYOffset = 0 // safari
        }
    }
}
</script>

<style lang="css">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 14px;
}
a {
    text-decoration: none;
}
::selection {
    background-color: plum;
    color: #fff;
}
</style>
