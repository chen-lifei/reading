<template>
    <div class="masterpieceContent">
        <SecondNav :navList="navList" type="masterpiece" @changeNav="changeNav" />
        <div class="wrapper">
            <div class="homeContent" v-if="isHome">
                <Slider :sliderImage="images"></Slider>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import SecondNav from '@/components/SecondNav'
import Slider from '@/components/Slider.vue'

export default {
    components: {
        SecondNav,
        Slider
    },
    props: {},
    data () {
        return {
            navList: [
                { id: 'masterpiece', label: '名著首页' },
                { id: 'masPoem', label: '诗歌类' },
                { id: 'masProse', label: '散文类' },
                { id: 'masStory', label: '小说类' }
            ],
            images: [
                require('@/assets/banner1.png'),
                require('@/assets/banner2.png')
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
            isHome: false
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

<style lang="less" src="./index.less"></style>
