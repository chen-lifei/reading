<template>
    <div class="booklist" :class="{ searchBox: isSearch }">
        <div class="title" v-if="isSearch">{{resStatus}}</div>
        <div class="categoryContent">
            <div class="contentBox" v-for="(item, index) in sortList ? sortList: list" :key="index">
                <div class="all">
                    <img :src="item.book_cover" />
                    <div class="mask">
                        <img :src="item.book_cover" />
                        <div class="info">
                            <router-link class="infoName wordLimit" :to="{ name: 'book', query: {id: item.book_id} }">
                                {{item.book_name}}({{item.book_writer}})</router-link>
                            <div class="infoName wordLimit"></div>
                            <div class="intro wordLimit" v-html="item.book_introduction"></div>
                        </div>
                    </div>
                </div>
                <div class="name">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        sortList: {
            type: Array,
            default: () => {}
        }
    },
    data () {
        return {
            isSearch: false,
            list: [],
            resStatus: '搜索结果：'
        }
    },
    watch: {
        $route (newVal) {
            this.getBookList()
        }
    },
    methods: {
        getBookList () {
            let searchParams = this.$route.query.search
            if (searchParams) {
                this.isSearch = true
                this.axios.get('http://localhost:3000/search?search=' + searchParams).then(res => {
                    this.resStatus = '搜索结果：'
                    this.list = res.data
                    if (!this.list.length) {
                        this.resStatus = `抱歉，没有搜索到 ${searchParams} 的有关书籍`
                    }
                })
            }
        }
    },
    mounted () {
        this.getBookList()
    }
}
</script>

<style lang="less" scoped>
.booklist {
    margin: 40px 0;
    .title {
        margin-bottom: 20px;
    }
    .categoryContent {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .title {
            margin-top: 40px;
        }
        .contentBox {
            width: 18%;
            margin-bottom: 30px;
            cursor: pointer;
            border-radius: 8px;
            margin-right: 20px;
            .all {
                position: relative;
                width: 100%;
                img {
                    width: 100%;
                    height: 250px;
                    border-radius: 8px;
                    object-fit: cover;
                    box-shadow: 0px 5px 5px rgba(31, 45, 61, 0.4);
                }
                .mask {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    opacity: 0;
                    z-index: 8;
                    transition: all 0.2s ease;
                    background-color: #ffffff;
                    &:hover {
                        transform: translateY(15px) scale(1.2);
                        opacity: 1;
                        box-shadow: 0px 10px 20px rgba(31, 45, 61, 0.4);
                    }
                    img {
                        width: 100%;
                        height: 50%;
                        border-radius: 8px 8px 0 0;
                        box-shadow: none;
                        object-fit: cover;
                    }
                    .info {
                        padding: 5px 10px;
                        a {
                            color: #000000;
                        }
                        .infoName {
                            -webkit-line-clamp: 1;
                            font-weight: 600;
                            transition: all 0.2s ease;
                            &:hover {
                                color: #ff7648;
                            }
                        }
                        .intro {
                            font-size: 12px;
                            margin-top: 5px;
                            color: #475669;
                            -webkit-line-clamp: 5;
                        }
                    }
                }
            }
            .name {
                margin: 10px 0 0 5px;
                font-weight: 600;
                font-size: 16px;
                transition: all 0.2s ease;
                &:hover {
                    color: #ff7648;
                }
            }
        }
        .contentBox:nth-child(6n) {
            margin-right: 0;
        }
        @media (max-width: 1100px) {
            .contentBox {
                width: 22%;
            }
        }
        @media (max-width: 850px) {
            .contentBox {
                width: 30%;
            }
        }
        @media (max-width: 660px) {
            .contentBox {
                width: 44%;
            }
        }
    }
}
.searchBox {
    margin: 80px 100px 20px 100px;
}

.wordLimit {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
</style>
