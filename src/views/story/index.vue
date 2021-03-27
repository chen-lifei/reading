<template>
    <div class="storyContent">
        <div class="wrapper">
            <div class="homeContent" v-if="isHome">
                <div class="topContent">
                    <img src="@/assets/public/story/storyBg.png" />
                    <div class="carousel">
                        <el-carousel :interval="2000" type="card" height="250px">
                            <el-carousel-item v-for="(item, index) in banners" :key="index">
                                <img :src="item" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <div class="main">
                    <div class="classical margin20">
                        <div class="title mainTitle">
                            <p class="mainText">经典小说</p>
                        </div>
                        <div class="classicalContent margin20" >
                            <router-link class="contentBox mb30" v-for="(item, index) in classicalList" :key="index" :to="{ name: 'book', query: {id: item.book_id} }">
                                <img :src="item.book_cover" />
                                <div class="info">
                                    <div class="name wordLimit">{{item.book_name}} ({{item.book_writer}})</div>
                                    <div class="intro wordLimit" v-html="item.book_introduction"></div>
                                </div>
                            </router-link>
                        </div>
                        <div class="moreClassical" @click="moreStory">{{seeMore}}</div>
                    </div>
                    <div class="recommend margin20">
                        <div class="title mainTitle">
                            <p class="mainText">推荐专区</p>
                        </div>
                        <div class="recommendContent margin20">
                            <router-link class="contentBox border8 mb30 shadow" v-for="(item, index) in recommendList" :key="index" :to="{ name: 'book', query: {id: item.book_id} }">
                                <img :src="item.book_cover" class="border8" />
                                <div class="info">
                                    <div class="name wordLimit">{{item.book_name}} ({{item.book_writer}})</div>
                                    <div class="intro wordLimit" v-html="item.book_introduction"></div>
                                </div>
                            </router-link>
                        </div>
                        <div class="change" @click="changeRecommend">换一换<i class="el-icon-refresh-right" style="padding-left: 5px"></i></div>
                    </div>
                    <div class="hot margin20">
                        <div class="title mainTitle">
                            <p class="mainText">最热小说</p>
                        </div>
                        <div class="hotContent margin20">
                            <router-link class="contentBox border8 mb30 shadow" v-for="(item, index) in hotList" :key="index" :to="{ name: 'book', query: {id: item.book_id} }">
                                <img :src="item.book_cover" class="border8" />
                                <div class="info">
                                    <div class="name wordLimit">{{item.book_name}} ({{item.book_writer}})</div>
                                    <div class="intro wordLimit" v-html="item.book_introduction"></div>
                                </div>
                            </router-link>
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
                                    <router-link class="listItem" v-for="(item, index) in classicalList" :key="index" :to="{ name: 'book', query: {id: item.book_id} }">
                                        <span>{{index+1}}.</span>
                                        <div class="name wordLimit">{{item.book_name}}</div>
                                        <div class="author">{{item.book_writer}}</div>
                                    </router-link>
                                </div>
                                <div class="categoryContent border8">
                                    <div class="categoryBox border8 shadow" v-for="item in categoryNav" :key="item.id">
                                        <div class="categoryTitle">{{item.label}}</div>
                                        <router-link class="categoryList" v-for="(list, index) in classifyList[item.id]" :key="index" :class="{ categoryItem: index !== 0 }" :to="{ name: 'book', query: {id: list.book_id} }">
                                            <div class="first" v-if="index === 0">
                                                <img :src="list.book_cover" />
                                                <div>
                                                    <p class="wordLimit">{{list.book_name}}({{list.book_writer}})</p>
                                                    <div class="intro wordLimit" v-html="list.book_introduction"></div>
                                                </div>
                                            </div>
                                            <div class="all" v-if="index !== 0">
                                                <div class="info wordLimit">{{list.book_name}}
                                                    <span>/ {{list.book_writer}}</span>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data () {
        return {
            banners: [
                'https://cdn.jsdelivr.net/gh/chen-lifei/reading@master/src/assets/storyImages/banner1.png',
                'https://cdn.jsdelivr.net/gh/chen-lifei/reading@master/src/assets/storyImages/banner2.png',
                'https://cdn.jsdelivr.net/gh/chen-lifei/reading@master/src/assets/storyImages/banner3.png'
            ],
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
            hotList: [],
            categoryNav: [],
            // 分类专区，最多只能显示十一本小说，记得进行控制啊！！
            classifyList: {}
        }
    },
    methods: {
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
        },
        getBookList () {
            this.axios.get('http://localhost:3000/get_story/classical').then((res) => {
                this.classicalList = res.data
            })
        },
        getClassifyList () {
            this.categoryNav.forEach((item, index) => {
                this.axios.get('http://localhost:3000/get_story/' + item.id).then((res) => {
                    this.classifyList[item.id] = res.data
                })
            })
        }
    },
    watch: {
        $route () {
            this.getHome()
        }
    },
    mounted () {
        this.getHome()
        this.categoryNav = this.navList.slice(1, this.navList.length - 1)
        this.getBookList()
        this.getClassifyList()
    }
}
</script>

<style lang="less" src="./index.less" scoped></style>
