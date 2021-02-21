<template>
    <div class="children">
        <div class="homeContent">
            <div class="topContent">
                <img src="@/assets/children/banner.png" />
                <div class="carousel">
                    <el-carousel :interval="2000" type="card" height="250px">
                        <el-carousel-item v-for="item in 6" :key="item">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="recommend p40">
                <div class="title">推荐专区</div>
                <div class="change">
                    <i class="el-icon-refresh-right"></i>换一换
                </div>
                <div class="recommendContent">
                    <div class="contentBox" v-for="(item, index) in books" :key="index">
                        <img :src="item.img" alt="">
                        <div class="info">
                            <div class="name textLimit">{{item.name}}</div>
                            <div class="intro textLimit">{{item.detail}}</div>
                            <div class="author textLimit"><i class="el-icon-orange"></i>{{item.author}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hot p40">
                <div class="title">最热专区</div>
                <div class="hotContent">
                    <div class="contentBox" v-for="(item, index) in books" :key="index">
                        <img :src="item.img" alt="">
                        <div class="info">
                            <div class="name textLimit">{{item.name}}</div>
                            <div class="intro textLimit">{{item.detail}}</div>
                            <div class="author textLimit"><i class="el-icon-orange"></i>{{item.author}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data () {
        return {
            books: [
                // detail限制50个字
                {
                    img: require('@/assets/elk.png'),
                    name: '追风筝的人',
                    author: '不知道',
                    detail:
                        '时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠...'
                },
                {
                    img: require('@/assets/baiyexing.jpg'),
                    name: '追风筝的人',
                    author: '不知道',
                    detail:
                        '时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠...'
                },
                {
                    img: require('@/assets/elk.png'),
                    name: '追风筝的人',
                    author: '不知道',
                    detail:
                        '时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠...'
                },
                {
                    img: require('@/assets/elk.png'),
                    name: '追风筝的人',
                    author: '不知道',
                    detail:
                        '时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠...'
                },
                {
                    img: require('@/assets/baiyexing.jpg'),
                    name: '追风筝的人',
                    author: '不知道',
                    detail:
                        '时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠...'
                },
                {
                    img: require('@/assets/elk.png'),
                    name: '追风筝的人',
                    author: '不知道',
                    detail:
                        '时雍上辈子为了男人肝脑涂地，最后得了个“女魔头”的恶名惨死诏狱，这才明白穿越必有爱情是个笑话。重生到阿拾身上，她决定做个平平无奇的女差役混吃等死。可从此以后，锦衣卫大都督靠...'
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

<style lang="less" scoped>
.children {
    /*
        深蓝：#264070
        浅蓝：#6d94c9
        蓝白：#e8f0f7
    */
    .homeContent {
        width: 100%;
        .topContent {
            position: relative;
            background-color: #264070;
            img {
                width: 100%;
            }
            .carousel {
                position: absolute;
                width: 600px;
                right: 100px;
                top: 50%;
                transform: translateY(-50%);
                .el-carousel__item {
                    .bordered();
                    &:nth-child(2n) {
                        background-color: #99a9bf;
                    }
                    &:nth-child(2n+1) {
                        background-color: #d3dce6;
                    }
                }
            }
        }
        .hot,
        .recommend {
            background-color: #264070;
            .title {
                color: #ffffff;
            }
            .hotContent,
            .recommendContent {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                width: 1300px;
                margin: 0 auto;
                .contentBox {
                    display: flex;
                    align-items: center;
                    width: 31%;
                    height: 180px;
                    background-color: #1d3256;
                    overflow: hidden;
                    border-radius: 10px;
                    margin-bottom: 30px;
                    img {
                        width: 100px;
                        height: 100px;
                        border-radius: 100%;
                        margin: 0 20px;
                        cursor: pointer;
                    }
                    .info {
                        width: 60%;
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
        }
        .recommend {
            position: relative;
            background-color: #e8f0f7;
            .title {
                color: #0d263b;
            }
            .change {
                position: absolute;
                color: #0d263b;
                top: 50px;
                right: 100px;
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
        padding-bottom: 10px;
        letter-spacing: 2px;
        margin-bottom: 30px;
        &::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: calc(50% - 20px);
            width: 40px;
            height: 1px;
            background-color: #a4b5bd;
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
