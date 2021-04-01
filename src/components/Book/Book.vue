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
                                    <span class="number">{{bookCollectTime}}</span>次收藏
                                </div>
                            </div>
                        </div>
                        <div class="rate">
                            <div>平均评分：（已有{{rateTime}}人评分）</div>
                            <el-rate
                                v-model="avarage"
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
                        <div class="rate" @click="getRateVisible">
                            <i class="el-icon-sunny"></i>{{ isRate ? '评分' : '已评分' }}
                        </div>
                    </div>
                    <el-dialog
                        title="评分"
                        :visible.sync="rateVisible"
                        width="30%">
                        <el-rate
                            v-model="rateValue"
                            show-text
                            :texts="rateText">
                        </el-rate>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="rateVisible = false">取 消</el-button>
                            <el-button type="primary" @click="handleRate">确 定</el-button>
                        </span>
                    </el-dialog>
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
                                    <div class="date">{{reply.comment_date}}</div>
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

<script src="./index.js"></script>

<style lang="less" scoped src="./index.less"></style>
