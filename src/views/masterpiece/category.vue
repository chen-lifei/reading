<template>
    <div class="category">
        <div class="sortBox">
            <div class="region">
                <div class="title">地区</div>
                <div class="label" :class="{ active: index === regionIndex}" v-for="(item, index) in regionItem" :key="index"
                    @click="changeRegion(item.id, index)">{{item.label}}</div>
            </div>
            <div>
                <div class="title">时间</div>
                <div class="label" :class="{ active: index === timeIndex}" v-for="(item, index) in timeItem" :key="index"
                    @click="changeTime(item.id, index)">{{item.label}}</div>
            </div>
        </div>
        <BookList :sortList="sortList" />
        <div v-if="sortList.length === 0" class="noBook">暂无书籍</div>
    </div>
</template>

<script>
import BookList from '@/components/Booklist.vue'

export default {
    components: {
        BookList
    },
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
                { id: 'ancient', label: '古代' }, // 1840之前
                { id: 'recent', label: '近代' }, // 1840-1919
                { id: 'modern', label: '现代' } // 1919之后
            ],
            region: 'all',
            time: 'all',
            regionIndex: 0,
            timeIndex: 0,
            sortList: [],
            module: this.currentModule
        }
    },
    watch: {
        currentModule (val) {
            this.module = val
            this.getBookList()
        }
    },
    mounted () {
        this.module = this.$route.name
        this.getBookList()
    },
    methods: {
        changeRegion (key, index) {
            this.region = key
            this.regionIndex = index
            this.getSortList()
        },
        changeTime (key, index) {
            this.time = key
            this.timeIndex = index
            this.getSortList()
        },
        getBookList () {
            this.axios.get(`http://localhost:3000/get_masterpiece/${this.module}`).then((res, err) => {
                this.sortList = res.data
            })
        },
        getSortList () {
            let data = {
                category: 'masterpiece',
                module: this.module.slice(3).toLowerCase(),
                region: this.region,
                time: this.time
            }
            this.axios.post('http://localhost:3000/get_sort_list', data).then(res => {
                this.sortList = res.data
            })
        }
    }
}
</script>

<style lang="less" scoped>
.category {
    margin: 20px 100px;
    padding-top: 60px;
    .sortBox {
        width: 100%;
        border-radius: 8px;
        padding: 40px;
        background-color: rgba(255, 255, 255, 0.5);
        .title {
            display: inline-block;
            padding: 6px 15px;
            margin-right: 30px;
            color: rgba(255, 255, 255, 0.9);
            border-radius: 16px 0 16px 16px;
            background-color: #7f7f8c;
        }
        .region {
            margin-bottom: 20px;
        }
        .masRegion {
            margin: 30px 0;
        }
        .label {
            display: inline-block;
            margin: 0 10px 10px 0;
            color: #475669;
            cursor: pointer;
            padding: 4px 10px;
            transition: all 0.2s ease;
            &:hover {
                color: #ff7648;
            }
            &:last-child {
                margin-right: 0;
            }
        }
        .active {
            border-radius: 16px;
            color: #ff7648;
            background-color: #f7eae8;
        }
    }
    .noBook {
        text-align: center;
        margin-bottom: 80px;
        font-size: 18px;
    }
    @media (max-width: 1350px) {
        margin: 20px;
    }
    @media (max-width: 780px) {
        .sortBox {
            padding: 20px;
            .masRegion {
                margin: 15px 0;
            }
        }
    }
}
</style>
