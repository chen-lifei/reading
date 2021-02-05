<template>
    <div id="app">
        <!-- <Navbar v-if="needRender" />
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
        <Footer v-if="needRender" /> -->
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
    data () {
        return {
            needRender: true,
            noNeedHeaderPage: ['', 'login']
        }
    },
    watch: {
        $route (to, from) {
            if (this.noNeedHeaderPage.includes(to.name) || to.name === null) {
                this.needRender = false
            } else {
                this.needRender = true
            }
        }
    },
    mounted () {
        if (this.$route.name === 'login') {
            this.needRender = false
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 14px;
}
a {
    text-decoration: none;
}
</style>
