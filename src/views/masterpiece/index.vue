<template>
    <div class="masterpieceContent">
        <div class="homeContent" v-if="isHome">
            <div class="topContent">
                <img src="@/assets/masterpiece/bg3.png" class="title" />
                <img class="banner" src="@/assets/masterpiece/1.png" />
                <div class="secondNav">
                    <ul>
                        <li v-for="(item, index) in navList" :key="index" @click="changeNav(item.id)">
                            <img src="@/assets/masterpiece/bg2.png" />
                            <span class="text">{{item.label}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <router-view></router-view>
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
            books: [
                // detail限制50个字
                {
                    img: require('@/assets/hua.png'),
                    name: '追风筝的人',
                    author: '不知道',
                    detail:
                        '时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠...'
                },
                {
                    img: require('@/assets/hua.png'),
                    name: '追风筝的人',
                    author: '不知道',
                    detail:
                        '时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠...'
                },
                {
                    img: require('@/assets/hua.png'),
                    name: '追风筝的人',
                    author: '不知道',
                    detail:
                        '时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠...'
                },
                {
                    img: require('@/assets/hua.png'),
                    name: '追风筝的人',
                    author: '不知道',
                    detail:
                        '时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠...'
                },
                {
                    img: require('@/assets/hua.png'),
                    name: 'Guess me',
                    author: 'hahaah',
                    detail:
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text.'
                }
            ],
            isHome: true
        }
    },
    watch: {},
    computed: {},
    methods: {
        changeNav (category) {
            if (this.$route.name !== category) {
                this.$router.push({ name: category })
            }
            this.getHome()
        },
        getHome () {
            if (this.$route.name === 'masterpiece') {
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

<style lang="less" src="./index.less">
@import "/src/common/fonts/font.css";
</style>
