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
                require('@/assets/public/storyBanner1.png'),
                require('@/assets/public/storyBanner2.png')
            ],
            authorInfo: false,
            // 需要5的倍数
            classicalList: [],
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
