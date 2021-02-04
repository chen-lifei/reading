<template>
    <div class="storyContent">
        <SecondNav :navList="navList" @changeNav="changeNav" />
        <div class="wrapper">
            <div class="homeContent" v-if="isHome">
                <div class="topContent">
                    <Slider :sliderImage="images" class="banner" />
                    <div class="rightContent" :class="[ authorInfo ? 'rotateToBack' : 'rotateToFront' ]">
                        <div class="front">
                            <div class="title">精选语录</div>
                            <div class="quotes">
                                <div class="quote">慧极必伤，情深不寿，强极则辱，谦谦君子，温润如玉。
                                    <div class="source">&laquo;书剑恩仇录&raquo;--金庸</div>
                                </div>
                                <div class="quote">情不知所起，一往情深 ，恨不知所终，一笑而泯。
                                    <div class="source">&laquo;笑傲江湖&raquo;--金庸</div>
                                </div>
                                <div class="quote">红颜弹指老，刹那芳华，与其天涯思君，恋恋不舍，莫若相忘于江湖。
                                    <div class="source">&laquo;天龙八部&raquo;--金庸</div>
                                </div>
                            </div>
                            <div class="rotate" @click="authorInfo = !authorInfo">
                                查看资料卡片
                            </div>
                        </div>
                        <div class="back">
                            <div class="title">资料卡片</div>
                            <div class="info">
                                金庸小说主要是指金庸的武侠小说，共计，十五部，它们可以由这几句话描述："飞雪连天射白鹿，笑书神侠倚碧鸳。"
                                <div>
                                    他们分别是&laquo;飞狐外传&raquo;、&laquo;雪山飞狐&raquo;、&laquo;连城诀&raquo;、&laquo;天龙八部&raquo;、&laquo;射雕英雄传&raquo;、&laquo;白马啸西风、&laquo;鹿鼎记&raquo;、&laquo;笑傲江湖&raquo;、&laquo;书剑恩仇录&raquo;、&laquo;神雕侠侣&raquo;、&laquo;侠客行&raquo;、&laquo;倚天屠龙记&raquo;、&laquo;碧血剑&raquo;、&laquo;鸳鸯刀&raquo;、&laquo;越女剑&raquo;。
                                </div>
                                <div>金庸所创作的小说中无处不体现了对历史意义及价值的探寻。</div>
                            </div>
                            <div class="rotate" @click="authorInfo = !authorInfo">
                                查看精选语录
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main">
                    <div class="classical">
                        <div class="title">
                            <p>经典小说</p>
                        </div>
                    </div>
                </div>
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
            ],
            authorInfo: false
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

<style lang="less" src="./index.less"></style>
