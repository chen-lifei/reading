<template>
    <div class="hot">
        <h3>最热书籍</h3>
        <div class="hot_books">
            <div class="book" v-for="(item, i) in hotList" :key="i">
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
        hotList: {
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
.hot {
    margin: 0 50px;
    .hot_books {
        display: flex;
        .book {
            width: 20%;
            margin: 0 20px;
            text-align: center;
            cursor: pointer;
            .img {
                height: 250px;
                margin-bottom: 5px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .author {
                font-size: 12px;
                color: rgb(163, 189, 236);
            }
        }
    }
}
</style>
