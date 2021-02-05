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
                        <div class="classicalContent">
                            <div class="contentBox" v-for="item in classicalList" :key="item.name">
                                <img :src="item.image" />
                                <div class="info">
                                    <div class="name">{{item.name}} ({{item.author}})</div>
                                    <div class="intro">{{item.intro}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="moreClassical" @click="moreStory">{{seeMore}}</div>
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
            authorInfo: false,
            classicalList: [
                {
                    name: '红楼梦',
                    author: '曹雪芹',
                    intro: '《红楼梦》，中国古代章回体长篇小说，中国古典四大名著之一，一般认为是清代作家曹雪芹所著。小说以贾、史、王、薛四大家族的兴衰为背景，以富贵公子贾宝玉为视角，以贾宝玉与林黛玉、薛宝钗的爱情婚姻悲剧为主线，描绘了一批举止见识出于须眉之上的闺阁佳人的人生百态.',
                    image: 'https://bkimg.cdn.bcebos.com/pic/4d086e061d950a7bd8283f8c09d162d9f2d3c95d?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5/format,f_auto'
                },
                {
                    name: '西游记',
                    author: '吴承恩',
                    intro: '《西游记》是中国古代第一部浪漫主义章回体长篇神魔小说。现存明刊百回本《西游记》均无作者署名。清代学者吴玉搢等首先提出《西游记》作者是明代吴承恩。',
                    image: 'https://bkimg.cdn.bcebos.com/pic/b7fd5266d01609248d763e43db0735fae6cd3412?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UxMTY=,g_7,xp_5,yp_5/format,f_auto'
                },
                {
                    name: '水浒传',
                    author: '施耐庵',
                    intro: '《中国古典小说:水浒传(青少版)》是一部英雄书，讲述的是英雄生命的传奇。历来对此书的评价，褒贬互见，但近代以来，认为此书为中国古典传统小说中不可多得的名著',
                    image: 'https://bkimg.cdn.bcebos.com/pic/b21c8701a18b87d6e920daa0040828381f30fd2b?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U3Mg==,g_7,xp_5,yp_5/format,f_auto'
                },
                {
                    name: '三国演义',
                    author: '罗贯中',
                    intro: '《三国演义》（全名为《三国志通俗演义》，又称《三国志演义》）是元末明初小说家罗贯中根据陈寿《三国志》和裴松之注解以及民间三国故事传说经过艺术加工创作',
                    image: 'https://bkimg.cdn.bcebos.com/pic/42a98226cffc1e170717d0ea4190f603728de945?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UxMTY=,g_7,xp_5,yp_5/format,f_auto'
                },
                {
                    name: '白夜行',
                    author: '东野圭吾',
                    intro: '《白夜行》是日本作家东野圭吾创作的长篇小说，也是其代表作。该小说于1997年1月至1999年1月间连载于期刊，单行本1999年8月在日本发行。',
                    image: 'https://bkimg.cdn.bcebos.com/pic/d1160924ab18972b901da998e6cd7b899e510ab8?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5/format,f_auto'
                }
            ],
            seeMore: '查看更多'
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
        },
        moreStory () {
            this.classicalList = this.classicalList.concat(this.classicalList)
            if (this.classicalList.length === 10) {
                this.seeMore = '最多查看10本经典小说哦~'
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
