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
                        <i class="el-icon-s-flag"></i>
                        <span slot="title">我的书签</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-magic-stick"></i>
                        <span slot="title">我的摘录</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20" class="rightContent">
                <div class="user" v-show="activeIndex === '1'">
                    <el-form label-position="left">
                        <el-form-item label-width="120px" label="头像">
                            <div class="avatar">
                                <img :src="user_avatar" />
                                <i class="el-icon-edit-outline editAvatar"></i>
                                <input type="file" @change="changeAvatar">
                            </div>
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
                                <BookCover :imgSrc="scope.row.book_cover" style="width: 100%; height: 50px; object-fit: cover;" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="book_name" label="书籍名称" width="180"></el-table-column>
                        <el-table-column prop="book_writer" label="书籍作者" width="180"></el-table-column>
                        <el-table-column prop="collect_time" label="收藏时间"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" @click="startReading(scope.$index, scope.row)">开始阅读</el-button>
                                <el-button size="mini" type="danger" @click="removeCollect(scope.$index, scope.row)">移出书架</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="bookmark" v-show="activeIndex === '3'">
                    <el-table :data="bookmarkData" style="width: 100%">
                        <el-table-column prop="image" width="60">
                            <template slot-scope="scope">
                                <BookCover :imgSrc="scope.row.book_cover" style="width: 100%; height: 50px; object-fit: cover;" />
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
                <div class="extract" v-show="activeIndex === '4'">
                    <div v-if="hasExtract" class="noExtract">暂无摘录</div>
                    <div class="contentBox" v-for="(item, index) in extractList" :key="index" :style="{ backgroundColor: colorSelect[Math.floor(Math.random() * colorSelect.length)] }">
                        <div class="name">
                            <p>{{item.book_name}}</p>
                            <el-button type="danger" icon="el-icon-delete" circle plain class="delete" size="mini" @click="removeExtract(item.extract_id)"></el-button>
                        </div>
                        <div class="content">{{item.extract_content}}</div>
                        <div class="date">{{item.extract_time}}</div>

                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import BookCover from '@/components/BookCover.vue'
import { getDate } from '@/utils'

export default {
    components: {
        BookCover
    },
    data () {
        return {
            activeIndex: '1',
            bookmarkData: [],
            collectData: [],
            userInfo: {},
            user_avatar: 'https://cdn.jsdelivr.net/gh/chen-lifei/reading@master/src/assets/public/avatar.png',
            user_id: '',
            colorSelect: ['#e7f3f3', '#e6e6f0', '#e5ecf4', '#e4e8f1', '#f5e7e7', '#e8f0f2'],
            extractList: [],
            hasExtract: true
        }
    },
    methods: {
        getLoginStatus () {
            let token = localStorage.getItem('readingToken')
            this.user_id = localStorage.getItem('readerId')
            if (token) {
                this.$store.dispatch('getUserInfo', this.user_id)
                this.userInfo = this.$store.state.userInfo
                this.user_avatar = this.userInfo.user_avatar ? `http://localhost:3000/avatar/${this.userInfo.user_avatar}` : this.user_avatar
            }
        },
        handleSelect (index) {
            this.activeIndex = index
        },
        continueRead (index, row) {
            this.$router.push({ path: '/read', query: { book_id: row.book_id, chapter: row.chapter_id } })
        },
        removeBookmark (index, row) {
            let data = {
                userId: this.user_id,
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
            let data = {
                userId: this.user_id,
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
        startReading (index, row) {
            this.$router.push({ path: '/read', query: { book_id: row.book_id, chapter: 1 } })
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
            this.axios.get('http://localhost:3000/collect?id=' + this.user_id).then(res => {
                this.collectData = res.data
                this.collectData.forEach(item => {
                    item.collect_time = getDate(item.collect_time)
                })
            })
        },
        getBookmark () {
            this.axios.get('http://localhost:3000/bookmark?id=' + this.user_id).then(res => {
                this.bookmarkData = res.data
                this.bookmarkData.forEach(item => {
                    item.bookmark_time = getDate(item.bookmark_time)
                })
            })
        },
        changeAvatar (e) {
            let formData = new FormData()
            formData.append('avatar', e.target.files[0])
            formData.append('userId', this.user_id)
            this.axios({
                url: 'http://localhost:3000/uploadAvatar',
                method: 'post',
                headers: { 'content-type': 'multipart-formdata' },
                data: formData
            }).then(res => {
                if (res.status === 200) {
                    this.$message({
                        message: '修改头像成功！',
                        type: 'success',
                        duration: 1000
                    })
                    this.getUserInfo()
                }
            })
        },
        getUserInfo () {
            this.axios.get('http://localhost:3000/get_user').then(res => {
                this.userInfo = res.data.find(item => item.user_id === this.user_id)
                this.user_avatar = `http://localhost:3000/avatar/${this.userInfo.user_avatar}`
                this.$store.commit('getUserInfo', this.userInfo)
                if (localStorage.getItem('reading_user_info')) {
                    localStorage.setItem('reading_user_info', JSON.stringify(this.userInfo))
                }
            })
        },
        getExtractlist () {
            this.axios.get('http://localhost:3000/get_extract?userId=' + this.user_id).then(res => {
                if (res.status === 200) {
                    this.extractList = res.data
                    this.extractList.forEach(item => {
                        item.extract_time = getDate(item.extract_time)
                    })
                    if (this.extractList.length !== 0) {
                        this.hasExtract = false
                    }
                }
            })
        },
        removeExtract (extractId) {
            this.axios.post('http://localhost:3000/remove_extract', { extractId }).then(res => {
                if (res.status === 200) {
                    this.$message({
                        message: '删除语录成功！',
                        type: 'success',
                        duration: 1000
                    })
                    this.getExtractlist()
                }
            })
        }
    },
    mounted () {
        this.getLoginStatus()
        this.getCollect()
        this.getBookmark()
        this.getExtractlist()
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
                .avatar {
                    position: relative;
                    width: 60px;
                    height: 60px;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 50%;
                    }
                    input {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                        cursor: pointer;
                    }
                    .editAvatar {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        font-size: 20px;
                        top: 0;
                        left: 0;
                        line-height: 60px;
                        text-align: center;
                        opacity: 0;
                        font-weight: 700;
                        color: #ffffff;
                        transition: all .2s ease;
                    }
                    &:hover {
                        .editAvatar {
                            opacity: 1;
                        }
                        .mask {
                            opacity: 1;
                        }
                    }
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
            .extract {
                .noExtract {
                    text-align: center;
                    padding-top: 20px;
                    color: #909399;
                }
                .contentBox {
                    position: relative;
                    background-color: #f5e7e7;
                    padding: 20px;
                    border-radius: 10px;
                    cursor: default;
                    margin-bottom: 20px;
                    .name {
                        display: flex;
                        justify-content: space-between;
                        p {
                            color: #211718;
                            font-weight: 600;
                            font-size: 16px;
                            line-height: 30px;
                        }
                    }
                    .content {
                        margin: 10px 0;
                        color: #726d6a;
                        line-height: 24px;
                        letter-spacing: 1px;
                    }
                    .date {
                        color: rgba(114, 109, 106, .6);
                        text-align: right;
                        font-size: 10px;
                    }
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
