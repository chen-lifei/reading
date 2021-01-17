<template>
    <div>
        <Slider :sliderImage="images"></Slider>
        <Recommend :recommendList="books" />
        <Hot :hotList="books" />
        <New :newList="books" />
    </div>
</template>

<script>
import Slider from '@/components/Slider.vue'
import Recommend from '@/components/RecommendBooks.vue'
import Hot from '@/components/HotBooks.vue'
import New from '@/components/NewBooks.vue'

export default {
  components: {
    Slider,
    Recommend,
    Hot,
    New
  },
  props: {},
  data () {
    return {
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
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style scoped lang="less">
</style>
