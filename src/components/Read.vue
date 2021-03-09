<template>
    <div class="readPage default">
        <div class="readContent">
            <el-breadcrumb separator="/" class="breadcrumb">
                <span style="float: left;">当前位置：</span>
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/${bookInfo.book_category}` }">{{bookCategory}}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/${bookInfo.book_category}/${bookInfo.book_type}` }" v-if="bookInfo.book_type">
                    {{bookType}}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/book', query: { id: bookId } }">{{bookInfo.book_name}}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/book', query: { id: bookId } }">目录</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="contentBox">
                <div class="chapterName">第{{bookContent.chapter}}章 {{bookContent.chapter_name}}</div>
                <div class="info">
                    <span>书籍：{{bookInfo.book_name}}</span>
                    <span>作者：{{bookInfo.book_writer}}</span>
                    <span>出版时间：{{bookInfo.book_publish_time}}</span>
                </div>
                <div class="content" v-html="bookContent.chapter_content"></div>
            </div>
            <div class="readNext">
                <!-- <router-link class="previous" :to="{ path: '/read', query: { book_id: bookId, chapter: Number(this.chapter) - 1 } }" v-if="this.chapter > 1">
                    <i class="el-icon-back"></i>上一篇
                </router-link>
                <router-link class="next" :to="{ path: '/read', query: { book_id: bookId, chapter: Number(this.chapter) + 1 } }" v-if="this.chapter < chapterNum">
                    下一篇<i class="el-icon-right"></i>
                </router-link> -->
                <div class="previous" v-if="this.chapter > 1" @click="toNextOrPre(1)">
                    <i class="el-icon-back"></i>上一篇
                </div>
                <div class="next" v-if="this.chapter < chapterNum" @click="toNextOrPre(0)">
                    下一篇<i class="el-icon-right"></i>
                </div>
            </div>
            <el-backtop>UP</el-backtop>

        </div>

    </div>
</template>

<script>
import { getTranslate } from '@/constants/common.js'

export default {
    data () {
        return {
            bookId: '',
            bookType: '',
            bookCategory: '',
            chapter: '',
            chapterNum: '',
            bookInfo: {},
            bookContent: {}
        }
    },
    methods: {
        getBookInfo () {
            this.axios
                .get('http://localhost:3000/get_book?id=' + this.bookId)
                .then((res) => {
                    this.bookInfo = res.data[0]
                    this.chapterNum = this.bookInfo.book_chapter
                    if (this.bookInfo.book_type) {
                        this.bookType = getTranslate(this.bookInfo.book_type)
                    } else {
                        this.bookType = getTranslate(
                            this.bookInfo.book_category
                        )
                    }
                    this.bookCategory = getTranslate(
                        this.bookInfo.book_category
                    )
                })
        },
        getBookContent () {
            this.axios
                .get(
                    'http://localhost:3000/get_book_content?book_id=' +
                        this.bookId +
                        '&chapter=' +
                        this.chapter
                )
                .then((res) => {
                    this.bookContent = res.data[0]
                })
        },
        toNextOrPre (value) {
            console.log(value)
            if (value) {
                this.$router.push({ name: 'read', query: { book_id: this.bookId, chapter: Number(this.chapter) - 1 } })
            } else {
                this.$router.push({ name: 'read', query: { book_id: this.bookId, chapter: Number(this.chapter) + 1 } })
            }
        }
    },
    mounted () {
        this.bookId = this.$route.query.book_id
        this.chapter = this.$route.query.chapter
        this.getBookInfo()
        this.getBookContent()
        this.$store.commit('getActiveIndex', '2')
    },
    watch: {
        $route (newVal, oldValue) {
            this.chapter = newVal.query.chapter
            this.getBookContent()
        }
    }
}
</script>

<style lang="less" scoped>
.readPage {
    padding: 60px 40px;
    width: 100%;
    .readContent {
        width: 1000px;
        margin: 0 auto;
        .breadcrumb {
            padding: 20px 0;
            /deep/ .el-breadcrumb__inner {
                transition: all 0.2s ease;
                font-weight: 400;
            }
            /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
                color: #303133;
                cursor: pointer;
            }
        }
    }
    .contentBox {
        width: 100%;
        height: auto;
        padding: 20px 60px;
        .chapterName {
            text-align: center;
            font-size: 24px;
            padding: 20px 0;
        }
        .info {
            text-align: center;
            margin-bottom: 5px;
            span {
                color: #909399;
                padding: 0 10px;
                border-right: 1px solid #909399;
                font-size: 10px;
                &:last-child {
                    border: none;
                }
            }
        }
        .content {
            letter-spacing: 1px;
            line-height: 40px;
            img {
                margin-left: 50%;
                transform: translateX(-50%);
            }
            span {
                display: block;
                font-size: 12px;
                text-align: center;
            }
        }
    }
    .readNext {
        position: relative;
        margin-top: 30px;
        height: 40px;
        .previous,
        .next {
            position: absolute;
            width: 200px;
            line-height: 40px;
            font-size: 16px;
            cursor: pointer;
            text-align: center;
            i {
                font-size: 16px;
            }
        }
        .next {
            right: 0;
        }
    }
}
.default {
    background-color: #eed8cb;
    .readContent {
        /deep/ .el-breadcrumb__inner:hover,
        /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
            color: #dbbeac;
        }
    }
    .contentBox,
    .previous,
    .next {
        background-color: #dbbeac;
        color: #656565;
    }
    .el-backtop {
        color: #dbbeac;
    }
}
.pink {
    background-color: #fde1dd;
    .readContent {
        /deep/ .el-breadcrumb__inner:hover,
        /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
            color: #b87656;
        }
    }
    .contentBox,
    .previous,
    .next {
        background-color: #f9beb6;
        color: #b87656;
    }
    .el-backtop {
        color: #f9beb6;
    }
}
.raspberry {
    background-color: #f3d1d0;
    .readContent {
        /deep/ .el-breadcrumb__inner:hover,
        /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
            color: #d1abaa;
        }
    }
    .contentBox,
    .previous,
    .next {
        background-color: #d1abaa;
        color: #eae8da;
        .info span{
            color: #f3d1d0;
            border-right: 1px solid #f3d1d0;
        }
    }
    .el-backtop {
        color: #d1abaa;
    }
}
.orange {
    background-color: #ffe8c3;
    .readContent {
        /deep/ .el-breadcrumb__inner:hover,
        /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
            color: #ce782d;
        }
    }
    .contentBox,
    .previous,
    .next {
        background-color: #ffdea9;
        color: #ce782d;
        .info span{
            color: #383838;
            border-right: 1px solid #383838;
        }
    }
    .el-backtop {
        color: #ffdea9;
    }
}
.brown {
    background-color: #cfbeb5;
    .readContent {
        /deep/ .el-breadcrumb__inner:hover,
        /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
            color: #a7958b;
        }
    }
    .contentBox,
    .previous,
    .next {
        background-color: #a7958b;
        color: #e7e0d5;
        .info span{
            color: #cfbeb5;
            border-right: 1px solid #cfbeb5;
        }
    }
    .el-backtop {
        color: #a7958b;
    }
}
.green {
    background-color: #E3EDCD;
    .readContent {
        /deep/ .el-breadcrumb__inner:hover,
        /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
            color: #76e987;
        }
    }
    .contentBox,
    .previous,
    .next {
        background-color: #c7edcc;
        color: #656565;
        .info span{
            color: #666666;
            border-right: 1px solid #666666;
        }
    }
    .el-backtop {
        color: #c7edcc;
    }
}
.black {
    background-color: #1b1b1b;
    .readContent {
        .breadcrumb {
            span,
            /deep/ .el-breadcrumb__inner,
            /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
                color: #c2c2c2;
            }
            /deep/ .el-breadcrumb__inner:hover,
            /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
                color: #a7958b;
            }
        }
    }
    .contentBox,
    .previous,
    .next {
        background-color: #373737;
        color: #c2c2c2;
        .info span{
            color: #c2c2c2;
            border-right: 1px solid #c2c2c2;
        }
    }
    .el-backtop {
        color: #373737;
    }
}
</style>
