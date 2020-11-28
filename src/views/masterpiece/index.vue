<template>
  <div>
      <Slider :sliderImage="images"></Slider>
      <div class="content">
        <h3>古籍一览</h3>
        <div class="bookshelf">
          <div class="book" v-for="(item, i) in bookList" :key="i">
            <div class="name">{{item.name}}</div>
            <div class="author">{{item.author}}著</div>
          </div>
        </div>
      </div>
      <div class="recommend">
        <div class="top">
          <h3>推荐书籍</h3>
          <div class="change">
            <i class="el-icon-refresh-right"></i>
            换一换
          </div>
        </div>
        <div class="recommend_books">
          <div class="book" v-for="(item, i) in hotList" :key="i">
            <div class="img">
              <img :src="item.img" alt="">
            </div>
            <div class="info">
              <div class="name">
                {{item.name}} - {{item.author}}
              </div>
              <div class="detail">{{item.detail}}</div>
            </div>
            <div class="more">点击查看</div>
          </div>
        </div>
      </div>
      <div class="new">
        <h3>最新书籍</h3>
        <div class="new_books">
          <div class="book" v-for="(item, i) in hotList" :key="i">
            <div class="img">
              <img :src="item.img" alt="">
            </div>
            <div class="name">{{item.name}}</div>
            <div class="author">{{item.author}} / 著</div>
          </div>
        </div>
      </div>
      <div class="hot">
        <h3>最热书籍</h3>
        <div class="hot_books">
          <div class="book" v-for="(item, i) in hotList" :key="i">
            <div class="img">
              <img :src="item.img" alt="">
            </div>
            <div class="name">{{item.name}}</div>
            <div class="author">{{item.author}} / 著</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Slider from '@/components/Slider.vue'

export default {
  components: {
    Slider
  },
  props: {},
  data () {
    return {
      images: [require('@/assets/banner1.png'), require('@/assets/banner2.png')],
      bookList: [
        {name: '西游记', author: '吴承恩'},
        {name: '水浒传', author: '施耐庵'},
        {name: '三国演义', author: '罗贯中'},
        {name: '红楼梦', author: '曹雪芹'},
        {name: '西游记', author: '吴承恩'},
        {name: '水浒传', author: '施耐庵'},
        {name: '三国演义', author: '罗贯中'},
        {name: '红楼梦', author: '曹雪芹'},
        {name: '西游记', author: '吴承恩'},
        {name: '水浒传', author: '施耐庵'},
        {name: '三国演义', author: '罗贯中'},
        {name: '红楼梦', author: '曹雪芹'},
        {name: '西游记', author: '吴承恩'},
        {name: '水浒传', author: '施耐庵'},
        {name: '三国演义', author: '罗贯中'},
        {name: '红楼梦', author: '曹雪芹'},
        {name: '西游记', author: '吴承恩'},
        {name: '水浒传', author: '施耐庵'},
        {name: '三国演义', author: '罗贯中'},
        {name: '红楼梦', author: '曹雪芹'}
      ],
      hotList: [
        // detail限制50个字
        {img: require('@/assets/hua.png'), name: '追风筝的人', author: '不知道', detail: '时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠...'},
        {img: require('@/assets/hua.png'), name: '追风筝的人', author: '不知道', detail: '时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠...'},
        {img: require('@/assets/hua.png'), name: '追风筝的人', author: '不知道', detail: '时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠...'},
        {img: require('@/assets/hua.png'), name: '追风筝的人', author: '不知道', detail: '时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠...'},
        {img: require('@/assets/hua.png'), name: '追风筝的人', author: '不知道'}
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
<style scoped lang="less" src="./masterpiece.module.less">
