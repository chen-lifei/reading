<template>
    <div class="storyContent">
        <SecondNav :navList="navList" @changeNav="changeNav" />
        <div class="wrapper">
            <div class="homeContent" v-if="isHome">
                <div class="topContent">
                    <img src="@/assets/public/story/storyBg.png" />
                    <div class="carousel">
                        <el-carousel :interval="2000" type="card" height="250px">
                            <el-carousel-item v-for="item in 6" :key="item">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
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
