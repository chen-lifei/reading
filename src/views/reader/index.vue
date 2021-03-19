<template>
    <div class="reader">
        <el-row class="content">
            <el-col :span="4" class="leftMenu">
                <el-menu :default-active="activeIndex" @select="handleSelect">
                    <el-menu-item index="1">
                        <i class="el-icon-user"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-notebook-2"></i>
                        <span slot="title">我的书架</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-magic-stick"></i>
                        <span slot="title">我的书签</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20" class="rightContent">
                <div class="user" v-show="activeIndex === '1'">
                    <el-form label-position="left">
                        <el-form-item label-width="120px" label="头像">
                            <img :src="user_avatar" />
                        </el-form-item>
                        <el-form-item label-width="120px" label="用户名">
                            <span class="name">{{userInfo.user_name}}</span>
                        </el-form-item>
                        <el-form-item label-width="120px" label="邮箱">
                            <span class="email">{{userInfo.user_email}}</span>
                        </el-form-item>
                        <el-form-item label-width="120px" label="手机号码">
                            <span class="phone">{{userInfo.user_phone}}</span>
                        </el-form-item>
                        <el-form-item label-width="120px" label="地区">
                            <span class="region">{{userInfo.user_region}}</span>
                        </el-form-item>
                        <el-button type="info" class="logout" @click="logout">退出登录</el-button>
                    </el-form>
                </div>
                <div class="bookshelf" v-show="activeIndex === '2'">
                    <el-table :data="collectData" style="width: 100%">
                        <el-table-column prop="image" width="60">
                            <template slot-scope="scope">
                                <img :src="scope.row.book_cover" style="width: 100%; height: 50px; object-fit: cover;">
                            </template>
                        </el-table-column>
                        <el-table-column prop="book_name" label="书籍名称" width="180"></el-table-column>
                        <el-table-column prop="book_writer" label="书籍作者" width="180"></el-table-column>
                        <el-table-column prop="collect_time" label="收藏时间"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">开始阅读</el-button>
                                <el-button size="mini" type="danger" @click="removeCollect(scope.$index, scope.row)">移出书架</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="bookmark" v-show="activeIndex === '3'">
                    <el-table :data="bookmarkData" style="width: 100%">
                        <el-table-column prop="image" width="60">
                            <template slot-scope="scope">
                                <img :src="scope.row.book_cover" style="width: 100%; height: 50px; object-fit: cover;">
                            </template>
                        </el-table-column>
                        <el-table-column prop="book_name" label="书籍名称" width="180"></el-table-column>
                        <el-table-column prop="book_writer" label="书籍作者" width="180"></el-table-column>
                        <el-table-column prop="chapter_id" label="书签所在章节"></el-table-column>
                        <el-table-column prop="bookmark_time" label="添加时间"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" @click="continueRead(scope.$index, scope.row)">继续阅读</el-button>
                                <el-button size="mini" type="danger" @click="removeBookmark(scope.$index, scope.row)">移出书签</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activeIndex: '1',
            bookmarkData: [],
            collectData: [],
            userInfo: {},
            user_avatar: 'https://cdn.jsdelivr.net/gh/chen-lifei/reading@master/src/assets/public/avatar.png'
        }
    },
    methods: {
        handleSelect (index) {
            this.activeIndex = index
        },
        continueRead (index, row) {
            this.$router.push({ path: '/read', query: { book_id: row.book_id, chapter: row.chapter_id } })
        },
        removeBookmark (index, row) {
            let userId = this.$store.state.userInfo.user_id || JSON.parse(localStorage.getItem('reading_user_info')).user_id
            let data = {
                userId,
                bookId: row.book_id,
                chapterId: row.chapter_id
            }
            this.axios.post('http://localhost:3000/remove_bookmark', data).then(res => {
                this.$message({
                    message: '移出书签成功！',
                    type: 'success',
                    duration: 1000
                })
                this.getBookmark()
            })
        },
        removeCollect (index, row) {
            let userId = this.$store.state.userInfo.user_id || JSON.parse(localStorage.getItem('reading_user_info')).user_id
            let data = {
                userId,
                bookId: row.book_id
            }
            this.axios.post('http://localhost:3000/remove_collect', data).then(res => {
                this.$message({
                    message: '移出书架成功！',
                    type: 'success',
                    duration: 1000
                })
                this.getCollect()
            })
        },
        logout () {
            localStorage.removeItem('reading_user_info')
            this.$store.commit('getUserInfo', '')
            this.$message({
                message: '退出登录成功！',
                type: 'success',
                duration: 1000
            })
            this.$router.push({ name: 'login' })
        },
        getCollect () {
            let userId = this.$store.state.userInfo.user_id || JSON.parse(localStorage.getItem('reading_user_info')).user_id
            this.axios.get('http://localhost:3000/collect?id=' + userId).then(res => {
                this.collectData = res.data
                this.collectData.forEach(item => {
                    item.collect_time = this.changeTime(item.collect_time)
                })
            })
        },
        getBookmark () {
            let userId = this.$store.state.userInfo.user_id || JSON.parse(localStorage.getItem('reading_user_info')).user_id
            this.axios.get('http://localhost:3000/bookmark?id=' + userId).then(res => {
                this.bookmarkData = res.data
                this.bookmarkData.forEach(item => {
                    item.bookmark_time = this.changeTime(item.bookmark_time)
                })
            })
        },
        changeTime (str) {
            let date = new Date(Number(str))
            let month = date.getMonth() + 1
            return date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes().toString().padStart(2, 0)
        }
    },
    mounted () {
        this.userInfo = this.$store.state.userInfo || JSON.parse(localStorage.getItem('reading_user_info'))
        this.user_avatar = this.userInfo.user_avatar || this.user_avatar
        this.getCollect()
        this.getBookmark()
    }
}
</script>

<style lang="less" scoped>
.reader {
    padding: 60px 50px 0;
    .content {
        .leftMenu {
            border-right: solid 1px #e6e6e6;
            min-height: 600px;
            /deep/ .el-menu {
                border-right: none;
            }
        }
        .rightContent {
            padding: 20px 60px;
            .bookshelf,
            .bookmark {
                @media (max-width: 1500px) {
                    button:last-child {
                        margin-left: 0;
                        margin-top: 10px;
                    }
                }
            }
            .user {
                /deep/ .el-form-item__label {
                    color: #909399;
                }
                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                }
                .name,
                .phone,
                .email,
                .region {
                    display: inline-block;
                    width: 60%;
                    border-bottom: 1px solid #e6e6e6;
                }
                .logout {
                    margin-top: 20px;
                    margin-left: 30%;
                }
            }
        }
    }
    @media (max-width: 1100px) {
        padding: 60px 20px;
    }
    @media (max-width: 990px) {
        padding: 60px 0;
        .content .rightContent {
            padding: 20px 0;
            .user {
                padding-left: 40px;
            }
        }
    }
    @media (max-width: 700px) {
        .leftMenu {
            /deep/ .el-menu-item {
                padding: 0;
            }
            li {
                padding: 0!important;
                text-align: center;
            }
            i {
                display: none;
            }
        }
    }
}
</style>
