<template>
    <div class="children">
        <div class="homeContent">
            <div class="topContent">
                <img src="@/assets/children/banner.png" />
            </div>
            <div class="book"></div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data () {
        return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {}
}
</script>
<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
}
.children {
    /*
        深蓝：#264070
        浅蓝：#6d94c9
        蓝白：#e8f0f7
    */
    .homeContent {
        width: 100%;
        background-color: #e8f0f7;
        .topContent {
            img {
                width: 100%;
            }
        }
        .book {
            height: 500px;
        }
    }
}
</style>
