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
                                    <span class="number">{{bookInfo.book_collection}}</span>次收藏
                                </div>
                            </div>
                        </div>
                        <div class="rate">
                            <div>平均评分：（已有{{bookInfo.book_rate_time}}人进行评分）</div>
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
                        <div class="collect" @click="collect">
                            <i class="el-icon-star-off"></i>加入书架
                        </div>
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
                                <p>{{item.chapter_name ? item.chapter_name : `Chapter ${index+1}`}}</p>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="comment" v-show="activeIndex === '3'">
                    <div class="addComment">
                        <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="发表评论"
                            v-model="comment">
                        </el-input>
                        <div class="submitCommit" @click="submitComment">评论</div>
                    </div>
                    <div class="commentBox" v-for="(item, index) in commentList" :key="index">
                        <div class="leftAvatar">
                            <img :src="`http://localhost:3000/avatar/${item.user_avatar}`">
                        </div>
                        <div class="rightContent">
                            <div class="info">
                                <span class="name">{{item.user_name}}：</span>
                                <span class="content">{{item.comment_content}}</span>
                            </div>
                            <div class="commentBottom">
                                <div>{{item.comment_date}}</div>
                                <div class="reply" @click="displayReply(item.comment_id)">回复</div>
                            </div>
                        </div>
                        <div class="replyBox">
                            <div class="replyContent" v-for="(reply, index) in replyList.filter(reply => reply.to_comment_id === item.comment_id)" :key="index">
                                <img :src="`http://localhost:3000/avatar/${reply.user_avatar}`">
                                <div class="rightContent">
                                    <div class="info">
                                        <span class="name">{{reply.user_name}}：</span>
                                        <span class="content">{{reply.comment_content}}</span>
                                    </div>
                                    <div class="date">{{getCommentTime(reply.comment_date)}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-dialog
                    title="回复"
                    :visible.sync="isReply"
                    width="30%"
                    :before-close="closeReply">
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="回复评论"
                        v-model="reply">
                    </el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="isReply = false">取 消</el-button>
                        <el-button type="primary" @click="commitReply()">回 复</el-button>
                    </span>
                </el-dialog>
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
            userId: '',
            bookInfo: {},
            chapterList: [],
            commentList: [],
            comment: '',
            reply: '',
            isReply: false,
            replyId: '', // 回复评论的id,别人的id
            replyList: []
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
        },
        submitComment () {
            let commentInfo = {
                comment_book_id: this.bookId,
                comment_content: this.comment,
                from_uid: this.userId
            }
            if (this.comment) {
                this.axios.post('http://localhost:3000/comment', commentInfo).then(res => {
                    if (res.status === 200) {
                        this.$message({
                            message: '评论成功！',
                            type: 'success',
                            duration: 1000
                        })
                        this.comment = ''
                        this.getComment()
                    }
                })
            }
        },
        getComment () {
            this.axios.get('http://localhost:3000/comment?id=' + this.bookId).then(res => {
                this.commentList = res.data
                this.commentList.forEach(item => {
                    item.comment_date = this.getCommentTime(item.comment_date)
                })
            })
        },
        getCommentTime (date) {
            let newDate = new Date(Number(date))
            let month = newDate.getMonth() + 1
            return newDate.getFullYear() + '-' + month + '-' + newDate.getDate() + ' ' + newDate.getHours() + ':' + newDate.getMinutes()
        },
        collect () {
            let data = {
                userId: this.userId,
                bookId: this.bookId
            }
            this.axios.post('http://localhost:3000/collect', data).then(res => {
                this.$message({
                    message: '加入书架成功！',
                    type: 'success',
                    duration: 1000
                })
            })
        },
        closeReply () {
            this.isReply = false
        },
        commitReply () {
            if (this.reply) {
                let replyInfo = {
                    comment_book_id: this.bookId,
                    comment_content: this.reply,
                    from_uid: this.userId,
                    to_comment_id: this.replyId
                }
                this.axios.post('http://localhost:3000/reply', replyInfo).then(res => {
                    if (res.status === 200) {
                        this.$message({
                            message: '回复评论成功！',
                            type: 'success',
                            duration: 1000
                        })
                        this.reply = ''
                        this.getReplyList()
                    }
                })
            }
            this.isReply = false
        },
        displayReply (id) {
            this.replyId = id
            this.isReply = true
        },
        getReplyList () {
            this.axios.get('http://localhost:3000/reply?bookId=' + this.bookId).then(res => {
                this.replyList = res.data
            })
        }
    },
    mounted () {
        this.bookId = this.$route.query.id
        this.userId = this.$store.state.userInfo.user_id || JSON.parse(localStorage.getItem('reading_user_info')).user_id
        this.getBookInfo()
        this.getBookChapter()
        this.getComment()
        this.getReplyList()
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
                padding: 10px 0;
                .addComment {
                    padding: 0 40px;
                    margin-bottom: 20px;
                    .submitCommit {
                        margin-top: 20px;
                        margin-left: calc(100% - 100px);
                        width: 100px;
                        height: 40px;
                        background-color: plum;
                        color: #ffffff;
                        border-radius: 5px;
                        text-align: center;
                        line-height: 40px;
                        cursor: pointer;
                    }
                }
                .commentBox {
                    padding: 20px 40px;
                    border-bottom: 1px solid #e6e6e6;
                    .leftAvatar {
                        float: left;
                        margin-right: 10px;
                        img {
                            .avatarImg();
                        }
                    }
                    .rightContent {
                        margin-left: 20px;
                        width: 100%;
                        padding-top: 8px;
                        .info {
                            .name {
                                color: #5984b3;
                                cursor: default;
                            }
                        }
                        .commentBottom {
                            display: flex;
                            justify-content: space-between;
                            div {
                                .dateStyle();
                            }
                            .reply {
                                color: #5984b3;
                                cursor: pointer;
                            }
                        }
                    }
                    .replyBox {
                        margin: 10px 0 0 60px;
                        .replyContent {
                            display: flex;
                            padding: 15px 0;
                            img {
                                .avatarImg();
                            }
                            .rightContent {
                                margin-left: 20px;
                                width: 100%;
                                padding-top: 8px;
                                .info {
                                    .name {
                                        color: #5984b3;
                                        cursor: default;
                                    }
                                    .content {
                                        line-height: 22px;
                                    }
                                }
                                .date {
                                    .dateStyle();
                                }
                            }
                        }
                    }
                }
                .avatarImg {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .dateStyle {
                    font-size: 12px;
                    color: #999999;
                    margin-top: 8px;
                }
            }
        }
    }
}
</style>
