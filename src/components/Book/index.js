import { getTranslate, getDate } from '@/utils'

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
            comment: '', // 评论的内容
            reply: '', // 进行回复评论的内容
            isReply: false, // 是否显示进行回复的对话框
            replyId: '', // 回复评论的id,别人的id
            replyList: [], // 评论下的回复列表
            bookCollectTime: '', // 书籍收藏的次数
            rateVisible: false, // 是否显示进行评分的对话框
            rateValue: null, // 进行评分的分数
            rateText: [1, 2, 3, 4, 5],
            isRate: false, // 判断是否可以进行评分
            avarage: 0, // 该书籍评分的平均分
            rateTime: 0 // 该书籍评分的次数
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
                let reg = /^upload/
                if (reg.test(this.bookInfo.book_cover)) {
                    this.bookInfo.book_cover = 'http://localhost:8888/image/' + this.bookInfo.book_cover
                }
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
                    item.comment_date = getDate(item.comment_date)
                })
            })
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
                this.replyList.forEach(item => {
                    item.comment_date = getDate(item.comment_date)
                })
            })
        },
        getCollectTime () {
            this.axios.get('http://localhost:3000/getCollect?bookId=' + this.bookId).then(res => {
                this.bookCollectTime = res.data[0].collectTime
            })
        },
        handleRate () {
            this.rateVisible = false
            if (this.rateValue) {
                let data = {
                    bookId: this.bookId,
                    userId: this.userId,
                    rate: this.rateValue
                }
                this.axios.post('http://localhost:3000/rate', data).then(res => {
                    if (res.status === 200 && res.data) {
                        this.$message({
                            message: '评分成功！',
                            type: 'success',
                            duration: 1000
                        })
                        this.rateValue = null
                    } else if (res.data === 0) {
                        this.isRate = false
                    } else {
                        this.$message({
                            message: '评分失败！',
                            type: 'warning',
                            duration: 1000
                        })
                    }
                })
            }
        },
        getRate () {
            this.isRate = true
            this.axios.get('http://localhost:3000/rate?bookId=' + this.bookId + '&userId=' + this.userId).then(res => {
                if (res.status === 200 && res.data) {
                    this.isRate = true
                } else if (res.status === 200 && res.data === 0) {
                    this.isRate = false
                }
            })
        },
        getRateVisible () {
            if (this.isRate) {
                this.rateVisible = true
            } else {
                this.rateVisible = false
            }
        },
        getRateAvarage () {
            this.axios.get('http://localhost:3000/averageRate?bookId=' + this.bookId).then(res => {
                this.avarage = res.data[0].avarage ? res.data[0].avarage : 0
                this.rateTime = res.data[0].rateTime ? res.data[0].rateTime : 0
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
        this.getCollectTime()
        this.getRate()
        this.getRateAvarage()
    }
}
