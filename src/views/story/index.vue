<template>
    <div class="storyContent">
        <SecondNav :navList="navList" />
        <div class="wrap">

        </div>
    </div>
</template>

<script>
import SecondNav from '@/components/SecondNav'
export default {
    components: {
        SecondNav
    },
    props: {},
    data () {
        return {
            navList: [
                { id: 'martialArts', name: '武侠' },
                { id: 'inferential ', name: '推理' },
                { id: 'suspense', name: '悬疑' },
                { id: 'historical', name: '历史' },
                { id: 'military', name: '军事' },
                { id: 'romantic', name: '言情' },
                { id: 'science', name: '科幻' },
                { id: 'fantasy', name: '玄幻' },
                { id: 'timeTravel', name: '穿越' }
            ]
        }
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {}
}
</script>
<style lang="less" scoped>
.storyContent {
    background: url('../../assets/spring.png') top 60px left no-repeat fixed, #fffbf3;
    .wrap {
        padding-top: 100px;
        height: 200px;
    }
}
</style>
