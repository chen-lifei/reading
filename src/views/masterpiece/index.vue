<template>
    <div class="masterpieceContent">
        <div class="homeContent" v-if="isHome">
            <img src="@/assets/public/masterpiece/decorate1.png" class="decorate1" />
            <img src="@/assets/public/masterpiece/decorate2.png" class="decorate2" />
            <img src="@/assets/public/masterpiece/decorate3.png" class="decorate3" />
            <img src="@/assets/public/masterpiece/decorate4.png" class="decorate4" />
            <div class="topContent">
                <img src="@/assets/public/masterpiece/title.png" class="topTitle" />
                <img class="banner" src="@/assets/public/masterpiece/masterpieceBg.png" />
                <div class="secondNav">
                    <ul>
                        <li v-for="(item, index) in navList" :key="index" @click="changeNav(item.id)">
                            <img src="@/assets/public/masterpiece/navBg.png" />
                            <span class="text">{{item.label}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="recommend">
                <div class="title">推荐专区</div>
                <div class="change">换一换<i class="el-icon-refresh-right" style="padding-left: 5px"></i></div>
                <div class="recommendContent mt20">
                    <div class="contentBox" v-for="(item, index) in recommendBook" :key="index">
                        <img :src="item.img" />
                        <div class="detail wordLimit">{{item.detail}}</div>
                        <div class="info">
                            <div class="name">{{item.name}}</div>
                            <div class="author">{{item.author}}</div>
                        </div>
                        <div class="read">阅读</div>
                    </div>
                </div>
            </div>
            <div class="hot">
                <div class="title">最热专区</div>
                <div class="hotContent mt20">
                    <div class="series">
                        <div class="hotTitle">系列最热</div>
                        <div class="seriesContent" v-for="(item, index) in seriesBook" :key="index">
                            <img :src="item.book_cover" />
                            <div class="info">
                                <div class="name wordLimit">{{item.book_name}}({{item.book_writer}})</div>
                                <div class="intro wordLimit" v-html="item.book_introduction"></div>
                            </div>
                        </div>
                    </div>
                    <div class="all">
                        <div class="poem">
                            <div class="hotTitle">诗歌最热</div>
                            <div class="poemContent">
                                <div class="contentBox" v-for="(item, index) in hotPoem" :key="index">
                                    <img :src="item.book_cover" />
                                    <div class="name">{{item.book_name}}</div>
                                    <div class="author">{{item.book_writer}}</div>
                                    <div class="intro wordLimit" v-html="item.book_introduction"></div>
                                </div>
                            </div>
                        </div>
                        <div class="prose mt20">
                            <div class="hotTitle">散文最热</div>
                            <div class="proseContent">
                                <div class="contentBox" v-for="(item, index) in hotProse" :key="index">
                                    <img :src="item.book_cover" />
                                    <div class="name">{{item.book_name}}</div>
                                    <div class="author">{{item.book_writer}}</div>
                                    <div class="intro wordLimit">{{item.book_introduction}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="story mt20">
                            <div class="hotTitle">故事最热</div>
                            <div class="storyContent">
                                <div class="contentBox" v-for="(item, index) in hotStory" :key="index">
                                    <img :src="item.book_cover" />
                                    <div class="name">{{item.book_name}}</div>
                                    <div class="author">{{item.book_writer}}</div>
                                    <div class="intro wordLimit">{{item.book_introduction}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <router-view :currentModule="currentModule" style="padding-top: 60px"></router-view>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data () {
        return {
            navList: [
                { id: 'masPoem', label: '诗歌类' },
                { id: 'masProse', label: '散文类' },
                { id: 'masStory', label: '小说类' }
            ],
            isHome: true,
            recommendBook: [],
            seriesBook: [],
            currentModule: '',
            hotPoem: [],
            hotProse: [],
            hotStory: []
        }
    },
    watch: {
        $route () {
            this.getHome()
        }
    },
    computed: {},
    methods: {
        changeNav (category) {
            if (this.$route.name !== category) {
                this.$router.push({ name: category })
            }
            this.getHome()
            this.currentModule = category
        },
        getHome () {
            if (this.$route.name === 'masterpiece') {
                this.isHome = true
            } else {
                this.isHome = false
            }
        },
        getSeries () {
            this.axios.get('http://localhost:3000/get_masterpiece').then(res => {
                this.seriesBook = res.data
            })
        },
        getHotStory () {
            this.axios.get('http://localhost:3000/get_masterpiece/story/hot').then(res => {
                this.hotStory = res.data
            })
        },
        getHotPoem () {
            this.axios.get('http://localhost:3000/get_masterpiece/poem/hot').then(res => {
                this.hotPoem = res.data
            })
        },
        getHotProse () {
            this.axios.get('http://localhost:3000/get_masterpiece/prose/hot').then(res => {
                this.hotProse = res.data
            })
        }
    },
    created () {},
    mounted () {
        this.getHome()
        this.getSeries()
        this.getHotStory()
        this.getHotPoem()
        this.getHotProse()
    }
}
</script>

<style lang="less" src="./index.less" scoped></style>
