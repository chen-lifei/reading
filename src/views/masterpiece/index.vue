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
<style lang="less" scoped>
// webpack@3.12.0
// webpack@4.36.0
.bookshelf {
  display: flex;
  align-items: flex-end;
  height: 600px;
  width: 1200px;
  border: 20px solid #562c1a;
  margin: 0 auto;
  cursor: pointer;
}
.bookshelf .book {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60px;
  height: 600px;
  border: 1px solid #333;
  border-radius: 8px;
  background: url(../../assets/book_cover.png);
}
.bookshelf .book:hover {
  transform: rotate(1deg);
}
.bookshelf .book:nth-child(n+8) {
  height: 500px;
}
.bookshelf .book:nth-child(n+16) {
  height: 400px;
  border-radius: 6px;
}
.bookshelf .book .name {
  width: 30px;
  font-size: 30px;
  text-align: center;
  margin: 0 auto;
  line-height: 60px;
  padding-bottom: 10px;
}
.bookshelf .book .author {
  width: 14px;
  font-size: 14px;
  margin: 0 auto;
}
.recommend,
.new,
.hot {
  margin: 0 50px;
}
.recommend_books,
.new_books,
.hot_books {
  display: flex;
}
.recommend_books .book,
.new_books .book {
  width: 20%;
  margin: 0 20px;
  text-align: center;
}
.recommend_books .img,
.new_books .img {
  height: 250px;
  margin-bottom: 5px;
}
.recommend_books .img img,
.new_books .img img {
  width: 100%;
  height: 100%;
}
.recommend_books .book .author {
  font-size: 12px;
  color: rgb(163, 189, 236);
}
.new_books .name {
  display: none;
}
.new_books .author {
  display: none;
  font-size: 12px;
  color: rgb(163, 189, 236);
}
.new_books:hover .new_books .name {
  display: inline;
  transform: translateY(50px);
}
h3:hover .name {
  display: block;
}
</style>
