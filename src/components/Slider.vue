<template>
    <div>
        <el-carousel indicator-position="outside" style="width: 100%; margin: 0 auto">
            <el-carousel-item v-for="item in sliderImage" :key="item">
                <img :src="item" width="100%" height="100%" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
  components: {},
  props: {
    sliderImage: Array
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
<style lang="css" scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
