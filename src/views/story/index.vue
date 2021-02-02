<template>
    <div class="storyContent">
        <SecondNav :navList="navList" @changeNav="changeNav" />
        <div class="wrapper">
            <div class="homeContent" v-if="isHome">
                <div class="topContent">
                    <Slider :sliderImage="images" class="banner" />
                    <div class="quotes">
                        55555
                    </div>
                </div>
                <div style="height: 500px">5586868</div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import SecondNav from '@/components/SecondNav'
import Slider from '@/components/Slider'
export default {
    components: {
        SecondNav,
        Slider
    },
    props: {},
    data () {
        return {
            navList: [
                { id: 'story', name: '小说首页' },
                { id: 'martialArts', name: '武侠' },
                { id: 'inferential', name: '推理' },
                { id: 'suspense', name: '悬疑' },
                { id: 'historical', name: '历史' },
                { id: 'military', name: '军事' },
                { id: 'romantic', name: '言情' },
                { id: 'scienceFiction', name: '科幻' },
                { id: 'fantasy', name: '玄幻' },
                { id: 'timeTravel', name: '穿越' }
            ],
            isHome: false,
            images: [
                require('@/assets/banner1.png'),
                require('@/assets/banner2.png')
            ]
        }
    },
    watch: {},
    computed: {},
    methods: {
        changeNav (category) {
            if (this.$route.name !== category) {
                this.$router.push({
                    path:
                        category === 'story' ? '/story' : `/story/${category}`
                })
            }
            this.getHome()
        },
        getHome () {
            if (this.$route.name === 'story') {
                this.isHome = true
            } else {
                this.isHome = false
            }
        }
    },
    created () {},
    mounted () {
        this.getHome()
    }
}
</script>
<style lang="less" scoped>
.storyContent {
    background: url("../../assets/spring.png") top 60px right no-repeat fixed,
        #fffbf3;
    padding-top: 100px;
    width: 100%;
    .wrapper {
        max-width: 1100px;
        height: auto;
        margin: 0 auto;
        .homeContent {
            .topContent {
                display: flex;
                box-sizing: border-box;
                margin: 20px 0;
                .banner {
                    width: 70%;
                    margin-right: 20px;
                }
                .quotes {
                    width: 30%;
                    background-color: peachpuff;
                }
            }
        }
    }
}
</style>
