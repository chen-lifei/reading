<template>
    <div class="secondNav" :class="[ type ]">
        <ul>
            <li v-for="item in navList" :key="item.id">{{ item.name }}</li>
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
    }
}
</script>

<style lang="less" scoped>
.secondNav {
    width: 100%;
    height: 40px;
    background-color: palegreen;
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
            margin: 0 auto;
            list-style: none;
            font-size: 14px;
            cursor: pointer;
            text-align: center;
        }
    }
}
.story {

}
</style>
