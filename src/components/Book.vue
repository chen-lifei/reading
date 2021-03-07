<template>
    <div class="book">
        <el-breadcrumb separator="/" class="breadcrumb">
            <span class="position">当前位置：</span>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/${book_info.book_category}` }">{{book_info.book_category}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/${book_info.book_category}/${book_info.book_type}` }" v-if="book_info.book_type">{{book_info.book_type}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{book_info.book_name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="bookContent">
            <section class="mainContent">
                <img :src="book_info.book_cover" alt="">
                <div class="info">
                    <div class="name">
                        {{book_info.book_name}}
                        <span class="author">作者 / {{book_info.book_writer}}</span>
                    </div>
                    <div class="detail">
                        <div class="detailBox">
                            <div class="type">
                                <span>类别：{{book_type}}</span>
                                <span>发布时间：{{book_info.finish_time || '未知'}}</span>
                                <span>出版社：{{book_info.publisher || '未知'}}</span>
                                <span>出版时间：{{book_info.publish_time || '未知'}}</span>
                            </div>
                            <div class="read">
                                <div>
                                    <span class="number">{{book_info.book_read_time}}</span>次阅读
                                </div>
                                <div>
                                    <span class="number">666</span>次收藏
                                </div>
                            </div>
                        </div>
                        <div class="rate">
                            <div>平均评分：（已有50人进行评分）</div>
                            <el-rate
                                v-model="book_info.book_rate"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                            </el-rate>
                        </div>
                    </div>
                    <div class="readBtn">
                        <div class="read">开始阅读</div>
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
                <div class="intro" v-html="book_info.book_introduction" v-show="activeIndex === '1'"></div>
                <div class="catalog" v-show="activeIndex === '2'">
                    目录
                </div>
                <div class="comment" v-show="activeIndex === '3'">
                    讨论区
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            book_id: '',
            book_info: {},
            book_content: [],
            breadcrumblist: [],
            book_type: '',
            activeIndex: '1'
        }
    },
    methods: {
        getBookInfo () {
            this.axios.get('http://localhost:3000/get_book?id=' + this.book_id).then(res => {
                this.book_info = res.data[0]
                this.book_content = res.data
                if (this.book_info.book_type) {
                    this.book_type = this.book_info.book_type
                } else {
                    this.book_type = this.book_info.book_category
                }
            })
        },
        handleSelect (key) {
            this.activeIndex = key
        }
    },
    mounted () {
        this.book_id = this.$route.query.id
        this.getBookInfo()
    }
}
</script>

<style lang="less" scoped>
.book {
    max-width: 1300px;
    padding-top: 60px;
    margin: 20px auto;
    .breadcrumb {
        .position {
            float: left;
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
                            span {
                                color: #5c5c5c;
                                padding: 0 10px;
                                border-right: 1px solid #ccc;
                            }
                        }
                        .read {
                            display: flex;
                            margin: 20px 0;
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
        }
    }
    /deep/ .el-breadcrumb__inner a,
    /deep/ .el-breadcrumb__inner .is-link {
        font-weight: 400;
    }
}
</style>
