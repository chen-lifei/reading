<template>
    <div class="readPage" :class=themeList[currentThemeIndex]>
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
            <div class="contentBox" :class=setting.font>
                <div class="chapterName">{{bookContent.chapter_name ? bookContent.chapter_name : `Chapter ${chapter}`}}</div>
                <div class="info">
                    <span>书籍：{{bookInfo.book_name}}</span>
                    <span>作者：{{bookInfo.book_writer}}</span>
                    <span>出版时间：{{bookInfo.book_publish_time}}</span>
                </div>
                <div class="content" v-html="bookContent.chapter_content" :style="{ fontSize: setting.fontSize + 'px' }"></div>
            </div>
            <div class="readNext">
                <div class="previous" v-if="this.chapter > 1" @click="toNextOrPre(1)">
                    <i class="el-icon-back"></i>上一篇
                </div>
                <div class="next" v-if="this.chapter < chapterNum" @click="toNextOrPre(0)">
                    下一篇<i class="el-icon-right"></i>
                </div>
            </div>
            <el-backtop>UP</el-backtop>
            <div @click="dialogFormVisible = true" class="setting">设置</div>
            <div class="bookmark" @click="handleBookmark">{{isBookmark}}</div>
            <el-dialog title="阅读设置" :visible.sync="dialogFormVisible" class="settingBox">
                <el-form :model="setting">
                    <el-form-item label="主题" label-width="120px" class="theme">
                        <el-button :class="[item, { active: index === currentThemeIndex }]" circle v-for="(item, index) in themeList" :key="index" @click="changeTheme(index)">
                            <i class="el-icon-check"></i>
                        </el-button>
                    </el-form-item>
                    <el-form-item label="字体" label-width="120px">
                        <el-radio-group v-model="setting.font">
                            <el-radio-button label="defaultFont">雅黑</el-radio-button>
                            <el-radio-button label="songFont">宋体</el-radio-button>
                            <el-radio-button label="regularFont">楷体</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="字体大小" label-width="120px">
                        <el-radio-group v-model="setting.fontSize">
                            <el-button @click="changeFontSize(0)">A-</el-button>
                            <el-radio-button :label="setting.fontSize" disabled></el-radio-button>
                            <el-button @click="changeFontSize(1)">A+</el-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
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
            bookContent: {},
            dialogFormVisible: false,
            setting: {
                font: 'defaultFont',
                fontSize: 14
            },
            themeList: ['default', 'pink', 'raspberry', 'orange', 'brown', 'green', 'black'],
            currentThemeIndex: 0,
            isBookmark: '添加书签'
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
            if (value) {
                this.$router.push({ name: 'read', query: { book_id: this.bookId, chapter: Number(this.chapter) - 1 } })
            } else {
                this.$router.push({ name: 'read', query: { book_id: this.bookId, chapter: Number(this.chapter) + 1 } })
            }
        },
        changeTheme (index) {
            this.currentThemeIndex = index
        },
        changeFontSize (status) {
            console.log(this.setting.fontSize)
            if (status) {
                if (this.setting.fontSize < 24) {
                    this.setting.fontSize += 2
                }
            } else {
                if (this.setting.fontSize > 12) {
                    this.setting.fontSize -= 2
                }
            }
        },
        handleBookmark () {
            let userId = this.$store.state.userInfo.user_id || JSON.parse(localStorage.getItem('reading_user_info')).user_id
            let data = {
                userId,
                bookId: this.bookId,
                chapterId: this.chapter
            }
            this.axios.post('http://localhost:3000/bookmark', data).then(res => {
                console.log(res)
            })
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
        position: relative;
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
            /deep/ p {
                font-size: inherit;
            }
        }
    }
    .defaultFont {
        font-family: Microsoft YaHei,微软雅黑,SimSun,tahoma,arial;
    }
    @font-face {
        font-family: Song;
        src: url('../assets/fonts/Song.ttf')
    }
    .songFont {
        font-family: Song;
    }
    @font-face {
        font-family: Regular;
        src: url('../assets/fonts/Regular.ttf')
    }
    .regularFont {
        font-family: Regular;
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
    .setting,
    .bookmark {
        position: fixed;
        background-color: #fff;
        right: 40px;
        bottom: 160px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        box-shadow: 0 0 6px rgba(31, 45, 61, 0.2);
        &:hover {
            background-color: #f2f6fc;
        }
    }
    .bookmark {
        bottom: 100px;
        line-height: 20px;
        font-size: 14px;
        padding: 0 5px;
    }
    .settingBox {
        display: flex;
        height: 550px;
        .theme {
            button {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
            i {
                text-align: center;
                color: #F56C6C;
                font-weight: 500;
                opacity: 0;
            }
            .default {
                background-color: #dbbeac;
            }
            .pink {
                background-color: #f9beb6;
            }
            .raspberry {
                background-color: #d1abaa;
            }
            .orange {
                background-color: #ffdea9;
            }
            .brown {
                background-color: #a7958b;
            }
            .green {
                background-color: #c7edcc;
            }
            .black {
                background-color: #373737;
            }
            .active {
                border: 1px solid #F56C6C;
                i {
                    opacity: 1;
                }
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
    .contentBox,
    .previous,
    .next {
        background-color: #dbbeac;
        color: #656565;
    }
    .setting,
    .bookmark,
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
    .setting,
    .bookmark,
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
    .setting,
    .bookmark,
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
    .setting,
    .bookmark,
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
    .setting,
    .bookmark,
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
    .setting,
    .bookmark,
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
    .setting,
    .bookmark,
    .el-backtop {
        color: #373737;
    }
}
</style>
