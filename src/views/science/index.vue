<template>
    <div class="children">
        <div class="homeContent">
            <div class="topContent">
                <img src="@/assets/public/backgroundImg/scienceBg.png" />
                <div class="carousel">
                    <el-carousel :interval="2000" type="card" height="250px">
                        <el-carousel-item v-for="(item, index) in banners" :key="index">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="recommend p40">
                <div class="title">推荐专区</div>
                <div class="change">
                    <i class="el-icon-refresh-right" style="padding-right: 5px"></i>换一换
                </div>
                <div class="recommendContent">
                    <div class="contentBox" v-for="(item, index) in recommendBooks" :key="index">
                        <img :src="item.book_cover" alt="">
                        <div class="info">
                            <div class="name textLimit">{{item.book_name}}</div>
                            <div class="intro textLimit" v-html="item.book_introduction"></div>
                            <div class="author textLimit"><i class="el-icon-orange"></i>{{item.book_writer}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hot p40">
                <div class="title">最热专区</div>
                <div class="hotContent">
                    <div class="contentBox" v-for="(item, index) in books" :key="index">
                        <img :src="item.book_cover" alt="">
                        <div class="info">
                            <router-link class="name textLimit" :to="{ name: 'book', query: {id: item.book_id} }">{{item.book_name}}</router-link>
                            <div class="intro textLimit" v-html="item.book_introduction"></div>
                            <div class="author textLimit"><i class="el-icon-orange"></i>{{item.book_writer}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            banners: [
                'https://cdn.jsdelivr.net/gh/chen-lifei/reading@master/src/assets/scienceImages/banner1.png',
                'https://cdn.jsdelivr.net/gh/chen-lifei/reading@master/src/assets/scienceImages/banner2.png',
                'https://cdn.jsdelivr.net/gh/chen-lifei/reading@master/src/assets/scienceImages/banner3.png'
            ],
            recommendBooks: [],
            books: []
        }
    },
    methods: {
        getBooks () {
            this.axios.get('http://localhost:3000/get_science').then(res => {
                this.books = res.data
            })
        }
    },
    mounted () {
        this.getBooks()
    }
}
</script>

<style lang="less" scoped>
.children {
    .homeContent {
        width: 100%;
        .topContent {
            position: relative;
            background-color: #475e86;
            img {
                width: 100%;
                height: 520px;
            }
            .carousel {
                position: absolute;
                width: 600px;
                right: 100px;
                top: 50%;
                transform: translateY(-50%);
                .el-carousel__item {
                    .bordered();
                }
            }
            @media (max-width: 1000px) {
                img {
                    height: 400px;
                    object-fit: cover;
                }
                .carousel {
                    width: 450px;
                    right: 50%;
                    top: 60%;
                    transform: translateX(50%) translateY(-50%);
                    /deep/ .el-carousel__container {
                        height: 200px!important;
                    }
                }
            }
            @media (max-width: 700px) {
                img {
                    height: 300px;
                    object-fit: cover;
                }
                .carousel {
                    width: 280px;
                    top: 60%;
                    /deep/ .el-carousel__container {
                        height: 120px!important;
                    }
                }
            }
        }
        .hot,
        .recommend {
            display: inline-block;
            width: 100%;
            padding: 0 60px;
            padding-bottom: 30px;
            background-color: #d2afab;
            .title {
                color: #ffffff;
            }
            .hotContent,
            .recommendContent {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                width: 100%;
                .contentBox {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 31%;
                    height: 180px;
                    background-color: #836468;
                    overflow: hidden;
                    border-radius: 10px;
                    margin-bottom: 30px;
                    padding: 0 20px;
                    img {
                        width: 100px;
                        height: 100px;
                        border-radius: 100%;
                        cursor: pointer;
                    }
                    .info {
                        margin-left: 20px;
                        width: calc(100% - 100px);
                        cursor: default;
                        .name {
                            cursor: pointer;
                            color: #ffffff;
                            -webkit-line-clamp: 1;
                            transition: all .4s ease;
                            &:hover {
                                color: #6d94c9;
                            }
                        }
                        .intro {
                            color: rgba(255, 255, 255, .7);
                            margin: 8px 0;
                            -webkit-line-clamp: 5;
                        }
                        .author {
                            font-size: 12px;
                            color: #6d94c9;
                            -webkit-line-clamp: 1;
                            i {
                                margin-right: 5px;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
            @media (max-width: 1250px) {
                padding: 0 10px;
            }
            @media (max-width: 1000px) {
                .hotContent,
                .recommendContent {
                    .contentBox {
                        width: 48%;
                    }
                }
            }
            @media (max-width: 600px) {
                padding: 0 20px;
                .hotContent,
                .recommendContent {
                    .contentBox {
                        width: 100%;
                    }
                }
            }
        }
        .recommend {
            position: relative;
            background-color: #475e86;
            .title {
                color: #ffffff;
            }
            .change {
                float: right;
                color: #ffffff;
                cursor: pointer;
            }
            .recommendContent {
                .contentBox {
                    background-color: #ffffff;
                    .info {
                        .name {
                            color: #264070;
                            font-weight: 600;
                        }
                        .intro {
                            color: #264070;
                        }
                    }
                }
            }
        }
    }
    .title {
        position: relative;
        text-align: center;
        font-size: 20px;
        padding: 30px 0 10px 0;
        letter-spacing: 2px;
        margin-bottom: 30px;
        color: #0d263b;
        &::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: calc(50% - 20px);
            width: 40px;
            height: 1px;
            background-color: #0d263b;
        }
    }
    .bordered {
        border-radius: 20px;
    }
    .p40 {
        padding: 40px 0;
    }
    .textLimit {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }
}
</style>
