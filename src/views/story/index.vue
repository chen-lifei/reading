<template>
    <div class="storyContent">
        <SecondNav :navList="navList" @changeNav="changeNav" />
        <div class="wrapper">
            <div class="homeContent" v-if="isHome">
                <div class="topContent">
                    <el-carousel class="banner" height="400px">
                        <el-carousel-item v-for="item in images" :key="item">
                            <img :src="item" width="100%" height="100%" />
                        </el-carousel-item>
                    </el-carousel>
                    <!-- <div class="rightContent" :class="[ authorInfo ? 'rotateToBack' : 'rotateToFront' ]">
                        <div class="front">
                            <div class="title">精选语录</div>
                            <div class="quotes">
                                <div class="quote margin20">慧极必伤，情深不寿，强极则辱，谦谦君子，温润如玉。
                                    <div class="source">&laquo;书剑恩仇录&raquo;--金庸</div>
                                </div>
                                <div class="quote margin20">情不知所起，一往情深 ，恨不知所终，一笑而泯。
                                    <div class="source">&laquo;笑傲江湖&raquo;--金庸</div>
                                </div>
                                <div class="quote margin20">红颜弹指老，刹那芳华，与其天涯思君，恋恋不舍，莫若相忘于江湖。
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
                    </div> -->
                </div>
                <div class="main">
                    <div class="classical margin20">
                        <div class="title mainTitle">
                            <p class="mainText">经典小说</p>
                        </div>
                        <div class="classicalContent margin20">
                            <div class="contentBox mb30" v-for="(item, index) in classicalList" :key="index">
                                <img :src="item.image" />
                                <div class="info">
                                    <div class="name">{{item.name}} ({{item.author}})</div>
                                    <div class="intro wordLimit">{{item.intro}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="moreClassical" @click="moreStory">{{seeMore}}</div>
                    </div>
                    <div class="recommend margin20">
                        <div class="title mainTitle">
                            <p class="mainText">推荐专区</p>
                        </div>
                        <div class="recommendContent margin20">
                            <div class="contentBox border8 mb30 shadow" v-for="(item, index) in classicalList" :key="index">
                                <img :src="item.image" class="border8" />
                                <div class="info">
                                    <div class="name">{{item.name}} ({{item.author}})</div>
                                    <div class="intro wordLimit">{{item.intro}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="change" @click="changeRecommend">换一换<i class="el-icon-refresh-right" style="padding-left: 5px"></i></div>
                    </div>
                    <div class="hot margin20">
                        <div class="title mainTitle">
                            <p class="mainText">最热小说</p>
                        </div>
                        <div class="hotContent margin20">
                            <div class="contentBox border8 mb30 shadow" v-for="(item, index) in classicalList" :key="index">
                                <img :src="item.image" class="border8" />
                                <div class="info">
                                    <div class="name">{{item.name}} ({{item.author}})</div>
                                    <div class="intro wordLimit">{{item.intro}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="classification margin20">
                        <div class="title mainTitle">
                            <p class="mainText">分类专区</p>
                        </div>
                        <div class="classificationContent margin20">
                            <div class="contentBox mb30">
                                <div class="listContent border8 shadow">
                                    <div class="listTitle">
                                        最新榜单
                                    </div>
                                    <div class="listItem" v-for="(item, index) in classicalList" :key="index">
                                        <span>{{index+1}}.</span>
                                        <div class="name">{{item.name}}</div>
                                        <div class="author">{{item.author}}</div>
                                    </div>
                                </div>
                                <div class="categoryContent border8">
                                    <div class="categoryBox border8 shadow" v-for="item in categoryNav" :key="item.id">
                                        <div class="categoryTitle">{{item.label}}</div>
                                        <div class="categoryList" v-for="(list, index) in classicalList" :key="index" :class="{ categoryItem: index !== 0 }">
                                            <div class="first" v-if="index === 0">
                                                <img :src="list.image" />
                                                <div>
                                                    <p>{{list.name}}({{list.author}})</p>
                                                    <div class="intro wordLimit">{{list.intro}}</div>
                                                </div>
                                            </div>
                                            <div class="all" v-if="index !== 0">
                                                <div class="info">{{list.name}}
                                                    <span>/ {{list.author}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <router-view :currentModule="currentModule"></router-view>
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
                { id: 'story', label: '小说首页' },
                { id: 'classical', label: '古典小说' },
                { id: 'suspense', label: '悬疑小说' },
                { id: 'inferential', label: '推理小说' },
                { id: 'history', label: '历史小说' },
                { id: 'scienceFiction', label: '科幻小说' },
                { id: 'fantasy', label: '玄幻小说' },
                { id: 'romantic', label: '言情小说' },
                { id: 'supernatural', label: '仙侠小说' },
                { id: 'martial', label: '武侠小说' },
                { id: 'other', label: '其他小说' }
            ],
            isHome: false,
            images: [
                require('@/assets/banner1.png'),
                require('@/assets/banner2.png')
            ],
            authorInfo: false,
            // 需要5的倍数
            classicalList: [
                {
                    name: '红楼梦',
                    author: '曹雪芹',
                    intro: '《红楼梦》，中国古代章回体长篇小说，中国古典四大名著之一，一般认为是清代作家曹雪芹所著。小说以贾、史、王、薛四大家族的兴衰为背景，以富贵公子贾宝玉为视角，以贾宝玉与林黛玉、薛宝钗的爱情婚姻悲剧为主线，描绘了一批举止见识出于须眉之上的闺阁佳人的人生百态.',
                    image: require('@/assets/hongloumeng.jpg')
                },
                {
                    name: '西游记',
                    author: '吴承恩',
                    intro: '《西游记》是中国古代第一部浪漫主义章回体长篇神魔小说。现存明刊百回本《西游记》均无作者署名。清代学者吴玉搢等首先提出《西游记》作者是明代吴承恩。',
                    image: require('@/assets/xiyouji.jpg')
                },
                {
                    name: '水浒传',
                    author: '施耐庵',
                    intro: '《中国古典小说:水浒传(青少版)》是一部英雄书，讲述的是英雄生命的传奇。历来对此书的评价，褒贬互见，但近代以来，认为此书为中国古典传统小说中不可多得的名著',
                    image: require('@/assets/shuihuzhuan.jpg')
                },
                {
                    name: '三国演义',
                    author: '罗贯中',
                    intro: '《三国演义》（全名为《三国志通俗演义》，又称《三国志演义》）是元末明初小说家罗贯中根据陈寿《三国志》和裴松之注解以及民间三国故事传说经过艺术加工创作',
                    image: require('@/assets/sanguoyanyi.jpg')
                },
                {
                    name: '白夜行',
                    author: '东野圭吾',
                    intro: '《白夜行》是日本作家东野圭吾创作的长篇小说，也是其代表作。该小说于1997年1月至1999年1月间连载于期刊，单行本1999年8月在日本发行。',
                    image: require('@/assets/baiyexing.jpg')
                }
            ],
            seeMore: '查看更多',
            // 需要3的倍数
            recommendList: [],
            categoryNav: [],
            // 分类专区，最多只能显示十一本小说，记得进行控制啊！！
            classifyList: [],
            currentModule: ''
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
            this.currentModule = category
        },
        getHome () {
            if (this.$route.name === 'story') {
                this.isHome = true
            } else {
                this.isHome = false
            }
        },
        moreStory () {
            if (this.classicalList.length < 10) {
                this.classicalList = this.classicalList.concat(this.classicalList)
            }
            if (this.classicalList.length === 10) {
                this.seeMore = '最多查看10本经典小说哦~'
            }
        },
        changeRecommend () {
            console.log(88)
        }
    },
    created () {},
    mounted () {
        this.getHome()
        this.categoryNav = this.navList.slice(1, this.navList.length - 1)
    }
}
</script>

<style lang="less" src="./index.less" scoped></style>
