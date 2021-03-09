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
        }
    },
    mounted () {
        this.bookId = this.$route.query.book_id
        this.chapter = this.$route.query.chapter
        this.getBookInfo()
        this.getBookContent()
        this.$store.commit('getActiveIndex', '2')
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
}
.default {
    background-color: #eed8cb;
    .readContent {
        /deep/ .el-breadcrumb__inner:hover,
        /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
            color: #dbbeac;
        }
    }
    .contentBox {
        background-color: #dbbeac;
        color: #656565;
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
    .contentBox {
        background-color: #f9beb6;
        color: #b87656;
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
    .contentBox {
        background-color: #d1abaa;
        color: #eae8da;
        .info span{
            color: #f3d1d0;
            border-right: 1px solid #f3d1d0;
        }
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
    .contentBox {
        background-color: #ffdea9;
        color: #ce782d;
        .info span{
            color: #383838;
            border-right: 1px solid #383838;
        }
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
    .contentBox {
        background-color: #a7958b;
        color: #e7e0d5;
        .info span{
            color: #cfbeb5;
            border-right: 1px solid #cfbeb5;
        }
    }
}
</style>
