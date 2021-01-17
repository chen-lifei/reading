<template>
    <div class="new">
        <h3>最新书籍</h3>
        <div class="new_books">
            <div class="book" v-for="(item, i) in newList" :key="i">
                <div class="img">
                    <img :src="item.img" alt />
                </div>
                <div class="name">{{item.name}}</div>
                <div class="author">{{item.author}} / 著</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  props: {
    newList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
.new {
    margin: 0 50px;
    .new_books {
        display: flex;
        .book {
            position: relative;
            width: 20%;
            height: 250px;
            margin: 0 20px;
            text-align: center;
            cursor: pointer;
            overflow: hidden;
            .img {
                height: 250px;
                margin-bottom: 5px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .name {
                position: absolute;
                bottom: 40px;
                left: 10px;
                transition: all 0.4s ease-in-out;
                transform: translateY(80px);
            }
            .author {
                position: absolute;
                bottom: 20px;
                left: 10px;
                font-size: 12px;
                color: rgb(163, 189, 236);
                transition: all 0.5s ease-in-out;
                transform: translateY(80px);
            }
        }

        .book:hover .name,
        .book:hover .author {
            display: inline-block;
            transform: translateY(0);
        }
    }
}
</style>
