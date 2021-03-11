<template>
    <div class="category">
        <div class="sortBox">
            <div>
                <div class="title">排序</div>
                <div class="label" :class="{ active: index === sortIndex}" v-for="(item, index) in sortItem" :key="index" @click="changeSortIndex(index)">{{item.label}}</div>
            </div>
            <div class="masRegion">
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
                            <router-link class="infoName wordLimit" :to="{ name: 'book', query: {id: item.book_id} }">{{item.book_name}}({{item.book_writer}})</router-link>
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
    data () {
        return {
            sortItem: [
                { id: 'new', label: '最新' },
                { id: 'hot', label: '最热' },
                { id: 'good', label: '好评' },
                { id: 'rate', label: '高分好评' }
            ],
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
                { id: 'modern', label: '现代' },
                { id: '2020', label: '2020' },
                { id: '2019', label: '2019' },
                { id: '2018', label: '2018' },
                { id: '2017', label: '2017' },
                { id: 'other', label: '其他' }
            ],
            sortIndex: 0,
            regionIndex: 0,
            timeIndex: 0,
            sortList: [],
            module: ''
        }
    },
    mounted () {
        this.module = this.$route.name
        this.getBookList()
    },
    watch: {
        $route (newVal, oldVal) {
            this.module = newVal.name
            this.getBookList()
        }
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
            this.axios.get(`http://localhost:3000/get_story/${this.module}`).then((res) => {
                this.sortList = res.data
            })
        }
    }
}
</script>

<style lang="less" scoped src="../masterpiece/category.less"></style>
