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
        <h3>推荐书籍</h3>
        <div class="recommend_books">
          <div class="book" v-for="(item, i) in hotList" :key="i">
            <div class="img">
              <img :src="item.img" alt="">
            </div>
            <div class="name">{{item.name}}</div>
            <div class="author">{{item.author}} / 著</div>
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
        {img: require('@/assets/hua.png'), name: '追风筝的人', author: '不知道'},
        {img: require('@/assets/hua.png'), name: '追风筝的人', author: '不知道'},
        {img: require('@/assets/hua.png'), name: '追风筝的人', author: '不知道'},
        {img: require('@/assets/hua.png'), name: '追风筝的人', author: '不知道'},
        {img: require('@/assets/hua.png'), name: '追风筝的人', author: '不知道'},
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
