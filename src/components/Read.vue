<template>
    <div class="readPage">
        <el-breadcrumb separator="/" class="breadcrumb">
            <span style="float: left;">当前位置：</span>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/${bookInfo.book_category}` }">{{bookCategory}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/${bookInfo.book_category}/${bookInfo.book_type}` }" v-if="bookInfo.book_type">{{bookType}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{bookInfo.book_name}}</el-breadcrumb-item>
        </el-breadcrumb>
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
        getBookContent () {
            this.axios.get('http://localhost:3000/get_book_content?book_id=' + this.bookId + '&chapter=' + this.chapter).then(res => {
                this.bookContent = res.data[0]
            })
        }
    },
    mounted () {
        this.bookId = this.$route.query.book_id
        this.chapter = this.$route.query.chapter
        this.getBookInfo()
        this.getBookContent()
    }
}
</script>

<style lang="less" scoped>
.readPage {
    width: 1000px;
    padding-top: 60px;
    margin: 0 auto;
    .breadcrumb {
        margin: 20px 0;
        /deep/ .el-breadcrumb__inner {
            transition: all .2s ease;
            font-weight: 400;
            &:hover {
                color: plum;
            }
        }
    }
    .default {}
}
</style>
