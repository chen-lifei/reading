<template>
    <div class="secondNav" :class="[ type ]">
        <ul>
            <li v-for="(item, index) in navList" :key="index" :class="{ active: index === currentIndex }" @click="changeNavStyle(index)">{{ item.name }}</li>
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
        changeNavStyle (index) {
            this.currentIndex = index
        }
    }
}
</script>

<style lang="less" scoped>
.secondNav {
    height: 40px;
    ul {
        box-sizing: border-box;
        height: 100%;
        width: max-content;
        margin: 0 auto;
        padding: 5px 0;
        line-height: 30px;
        li {
            width: 60px;
            float: left;
            margin: 0 10px;
            list-style: none;
            font-size: 14px;
            cursor: pointer;
            text-align: center;
            transition: all .2s ease;

            &:hover {
                background-color: #fcecbf;
                border-radius: 20px;
            }
        }
        .active {
            background-color: #fc873d !important;
            border-radius: 20px;
            color: #ffffff;
        }
    }
}
.story {
    // background-color: #fffbf3;
}
</style>
