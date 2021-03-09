<template>
    <div class="book">
        <el-breadcrumb separator="/" class="breadcrumb">
            <span style="float: left;">当前位置：</span>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/${bookInfo.book_category}` }">{{bookCategory}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/${bookInfo.book_category}/${bookInfo.book_type}` }" v-if="bookInfo.book_type">{{bookType}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{bookInfo.book_name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="bookContent">
            <section class="mainContent">
                <img :src="bookInfo.book_cover" alt="">
                <div class="info">
                    <div class="name">
                        {{bookInfo.book_name}}
                        <span class="author">作者 / {{bookInfo.book_writer}}</span>
                    </div>
                    <div class="detail">
                        <div class="detailBox">
                            <div class="type">
                                <span>类别：{{bookType}}</span>
                                <span>完成时间：{{bookInfo.book_finish_time || '未知'}}</span>
                                <span>出版社：{{bookInfo.book_publisher || '未知'}}</span>
                                <span>出版时间：{{bookInfo.book_publish_time || '未知'}}</span>
                            </div>
                            <div class="read">
                                <div>
                                    <span class="number">{{bookInfo.book_read_time}}</span>次阅读
                                </div>
                                <div>
                                    <span class="number">666</span>次收藏
                                </div>
                            </div>
                        </div>
                        <div class="rate">
                            <div>平均评分：（已有50人进行评分）</div>
                            <el-rate
                                v-model="bookInfo.book_rate"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                            </el-rate>
                        </div>
                    </div>
                    <div class="readBtn">
                        <router-link :to="{ path: '/read', query: { book_id: bookId, chapter: 1 } }">
                            <div class="read">开始阅读</div>
                        </router-link>
                        <div class="collect"><i class="el-icon-star-off"></i>加入书架</div>
                    </div>
                </div>
            </section>
            <section class="allContent">
                <el-menu :default-active="activeIndex" class="littleMenu" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">书籍简介</el-menu-item>
                    <el-menu-item index="2">书籍目录</el-menu-item>
                    <el-menu-item index="3">书籍讨论区</el-menu-item>
                </el-menu>
                <div class="intro" v-html="bookInfo.book_introduction" v-show="activeIndex === '1'"></div>
                <div class="catalog" v-show="activeIndex === '2'">
                    <div class="catalogBox">
                        <div class="catalogContent" v-for="(item, index) in chapterList" :key="index">
                            <router-link :to="{ path: '/read', query: { book_id: item.book_id, chapter: item.chapter } }">
                                <p>{{item.chapter_name ? `第${index+1}章：${item.chapter_name}` : `Chapter ${index+1}`}}</p>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="comment" v-show="activeIndex === '3'">
                    讨论区
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { getTranslate } from '@/constants/common.js'

export default {
    data () {
        return {
            activeIndex: this.$store.state.activeIndex,
            bookId: '',
            bookType: '',
            bookCategory: '',
            bookInfo: {},
            chapterList: {}
        }
    },
    methods: {
        getBookInfo () {
            this.axios.get('http://localhost:3000/get_book?id=' + this.bookId).then(res => {
                this.bookInfo = res.data[0]
                if (this.bookInfo.book_type) {
                    this.bookType = getTranslate(this.bookInfo.book_type)
                } else {
                    this.bookType = getTranslate(this.bookInfo.book_category)
                }
                this.bookCategory = getTranslate(this.bookInfo.book_category)
            })
        },
        getBookChapter () {
            this.axios.get('http://localhost:3000/get_chapter?id=' + this.bookId).then(res => {
                this.chapterList = res.data
            })
        },
        handleSelect (key) {
            this.activeIndex = key
            this.$store.state.activeIndex = key
        }
    },
    mounted () {
        this.bookId = this.$route.query.id
        this.getBookInfo()
        this.getBookChapter()
    }
}
</script>

<style lang="less" scoped>
.book {
    max-width: 1100px;
    padding-top: 60px;
    margin: 20px auto;
    .breadcrumb {
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 15px;
        /deep/ .el-breadcrumb__inner {
            transition: all .2s ease;
            font-weight: 400;
            &:hover {
                color: plum;
            }
        }
    }
    .bookContent {
        .mainContent {
            display: flex;
            margin: 30px 0;
            height: 260px;
            img {
                width: 200px;
                height: 100%;
                object-fit: cover;
            }
            .info {
                position: relative;
                width: 100%;
                margin: 0 30px;
                .name {
                    padding: 15px 0;
                    font-size: 30px;
                    border-bottom: 1px solid #e6e6e6;
                    .author {
                        margin-left: 10px;
                        color: #5c5c5c;
                    }
                }
                .detail {
                    display: flex;
                    padding: 15px 0;
                    .detailBox {
                        width: 80%;
                        .type {
                            padding-right: 50px;
                            line-height: 30px;
                            span {
                                color: #5c5c5c;
                                padding: 0 10px;
                                border-right: 1px solid #ccc;
                            }
                        }
                        .read {
                            display: flex;
                            margin-top: 20px;
                            div {
                                padding: 0 10px;
                                color: #5c5c5c;
                                .number {
                                    font-size: 20px;
                                    color: #444;
                                    font-weight: 500;
                                }
                            }
                        }
                    }
                    .rate {
                        height: 20%;
                        div {
                            color: #5c5c5c;
                            margin-bottom: 15px;
                        }
                        /deep/ .el-rate__icon {
                            font-size: 24px;
                        }
                    }
                }
                .readBtn {
                    display: flex;
                    position: absolute;
                    bottom: 0;
                    .read,
                    .collect {
                        margin: 0 15px;
                        width: 100px;
                        height: 40px;
                        background-color: plum;
                        color: #ffffff;
                        border-radius: 5px;
                        text-align: center;
                        line-height: 40px;
                        cursor: pointer;
                        border: 1px solid plum;
                    }
                    .collect {
                        background-color: #ffffff;
                        color: plum;
                        transition: all .2s ease;
                        i {
                            padding-right: 5px;
                        }
                        &:hover {
                            color: #ffffff;
                            background-color: plum;
                        }
                    }
                }
            }
        }
        .allContent {
            /deep/ .el-menu--horizontal>.el-menu-item.is-active {
                border-bottom: 2px solid plum;
            }
            .intro {
                line-height: 30px;
                padding: 20px 40px;
            }
            .catalog {
                padding: 20px 40px;
                .catalogBox {
                    display: flex;
                    flex-wrap: wrap;
                    width: 100%;
                    height: auto;
                    .catalogContent {
                        overflow: hidden;
                        width: 25%;
                        border-bottom: 1px solid #e6e6e6;
                        cursor: pointer;
                        a {
                            color: #303133;
                            &:hover {
                                color: plum;
                                transition: all .2s ease;
                            }
                        }
                        p {
                            line-height: 40px;
                            height: 40px;
                            padding-right: 10px;
                        }
                    }
                }
            }
            .comment {
                padding: 20px 40px;
            }
        }
    }
}
</style>
