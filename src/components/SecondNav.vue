<template>
    <div class="secondNav" :class="[ type ]">
        <ul>
            <li v-for="(item, index) in navList" :key="index" :class="{ active: index === currentIndex }"
                @click="changeNavStyle(index, item.id)">
                {{ item.name }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        navList: {
            type: Array,
            default: () => []
        },
        type: {
            type: String,
            default: 'story'
        }
    },
    data () {
        return {
            currentIndex: 0
        }
    },
    methods: {
        changeNavStyle (index, category) {
            this.currentIndex = index
            this.$emit('changeNav', category)
        }
    },
    watch: {
        $route (to, from) {
            const index = this.navList.findIndex((item) => item.id === to.name)
            this.changeNavStyle(index, to.name)
        }
    },
    mounted () {
        const index = this.navList.findIndex(
            (item) => item.id === this.$route.name
        )
        this.changeNavStyle(index, this.$route.name)
    }
}
</script>

<style lang="less" scoped>
.secondNav {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: 40px;
    z-index: 999;
    ul {
        box-sizing: border-box;
        height: 100%;
        width: max-content;
        margin: 0 auto;
        padding: 5px 0;
        line-height: 30px;
        li {
            float: left;
            margin: 0 10px;
            padding: 0 10px;
            list-style: none;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
    }
}
.story {
    background-color: #fdeca1;
    opacity: 0.8;
    li {
        &:hover {
            background-color: #fc873d;
            border-radius: 20px;
            color: #ffffff;
        }
    }
    .active {
        background-color: #fc873d;
        border-radius: 20px;
        color: #ffffff;
    }
}
</style>
