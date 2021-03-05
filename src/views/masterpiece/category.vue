<template>
    <div class="category">
        <div class="sortBox">
            <div class="region">
                <div class="title">地区</div>
                <div class="label" :class="{ active: index === regionIndex}" v-for="(item, index) in regionItem" :key="index" @click="changeRegionIndex(index)">{{item.label}}</div>
            </div>
            <div>
                <div class="title">时间</div>
                <div class="label" :class="{ active: index === timeIndex}" v-for="(item, index) in timeItem" :key="index" @click="changeTimeIndex(index)">{{item.label}}</div>
            </div>
        </div>
        <div class="categoryContent">
            <div class="contentBox" v-for="(item, index) in sortList" :key="index">
                <div class="all">
                    <img :src="item.book_cover" />
                    <div class="mask">
                        <img :src="item.book_cover" />
                        <div class="info">
                            <div class="infoName wordLimit">{{item.book_name}}({{item.book_writer}})</div>
                            <div class="intro wordLimit" v-html="item.book_introduction"></div>
                        </div>
                    </div>
                </div>
                <div class="name">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        currentModule: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            regionItem: [
                { id: 'all', label: '全部' },
                { id: 'china', label: '中国' },
                { id: 'america', label: '美国' },
                { id: 'england', label: '英国' },
                { id: 'korea', label: '韩国' },
                { id: 'japan', label: '日本' },
                { id: 'france', label: '法国' },
                { id: 'other', label: '其他' }
            ],
            timeItem: [
                { id: 'all', label: '全部' },
                { id: 'ancient', label: '古代' },
                { id: 'rencent', label: '近代' },
                { id: 'modern', label: '现代' }
            ],
            sortIndex: 0,
            regionIndex: 0,
            timeIndex: 0,
            sortList: [],
            module: this.currentModule
        }
    },
    watch: {
        currentModule (val) {
            this.getBookList()
        }
    },
    mounted () {
        this.module = this.$route.name
        this.getBookList()
    },
    methods: {
        changeSortIndex (index) {
            this.sortIndex = index
        },
        changeRegionIndex (index) {
            this.regionIndex = index
        },
        changeTimeIndex (index) {
            this.timeIndex = index
        },
        getBookList () {
            this.axios.get(`http://localhost:3000/get_masterpiece/${this.module}`).then((res) => {
                this.sortList = res.data
            })
        }
    }
}
</script>

<style lang="less" scoped>
.category {
    margin: 20px 100px;
    .sortBox {
        width: 100%;
        border-radius: 8px;
        padding: 40px;
        background-color: rgba(255, 255, 255, .5);
        .title {
            display: inline-block;
            padding: 6px 15px;
            margin-right: 30px;
            color: rgba(255, 255, 255, .9);
            border-radius: 16px 0 16px 16px;
            background-color: #7f7f8c;
        }
        .region {
            margin-bottom: 30px;
        }
        .label {
            display: inline-block;
            margin-right: 20px;
            color: #475669;
            cursor: pointer;
            padding: 4px 10px;
            transition: all .2s ease;
            &:hover {
                color: #ff7648;
            }
        }
        .active {
            border-radius: 16px;
            color: #ff7648;
            background-color: #f7eae8;
        }
    }
    .categoryContent {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        margin: 40px 0;
        .contentBox {
            width: 15.5%;
            margin-bottom: 30px;
            cursor: pointer;
            border-radius: 8px;
            .all {
                position: relative;
                width: 100%;
                img {
                    width: 100%;
                    height: 250px;
                    border-radius: 8px;
                    object-fit: cover;
                    box-shadow: 0px 5px 5px rgba(31, 45, 61, 0.4);
                }
                .mask {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    opacity: 0;
                    z-index: 8;
                    transition: all .1s ease;
                    background-color: #ffffff;
                    &:hover {
                        transform: translateY(15px) scale(1.2);
                        opacity: 1;
                        box-shadow: 0px 10px 20px rgba(31, 45, 61, 0.4);
                    }
                    img {
                        width: 100%;
                        height: 50%;
                        border-radius: 8px 8px 0 0;
                        box-shadow: none;
                        object-fit: cover;
                    }
                    .info {
                        padding: 5px 10px;
                        .infoName {
                            -webkit-line-clamp: 1;
                            font-weight: 600;
                            transition: all .2s ease;
                            &:hover {
                                color: #ff7648;
                            }
                        }
                        .intro {
                            font-size: 12px;
                            margin-top: 5px;
                            color: #475669;
                            -webkit-line-clamp: 5;
                        }
                    }
                }
            }
            .name {
                margin: 10px 0 0 5px;
                font-weight: 600;
                font-size: 16px;
                transition: all .2s ease;
                &:hover {
                    color: #ff7648;
                }
            }
        }
        .contentBox:nth-child(6n) {
            margin-right: 0;
        }
    }
    .wordLimit {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }
}
</style>
