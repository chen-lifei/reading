<template>
    <div class="category">
        <div class="sortBox">
            <div>
                <div class="title">排序</div>
                <div class="label" :class="{ active: index === sortIndex}" v-for="(item, index) in sortItem" :key="index" @click="changeSortIndex(index)">{{item.label}}</div>
            </div>
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
                    <img :src="item.image" />
                    <div class="mask">
                        424
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
            sortList: [
                {
                    name: '红楼梦',
                    author: '曹雪芹',
                    intro: '《红楼梦》，中国古代章回体长篇小说，中国古典四大名著之一，一般认为是清代作家曹雪芹所著。小说以贾、史、王、薛四大家族的兴衰为背景，以富贵公子贾宝玉为视角，以贾宝玉与林黛玉、薛宝钗的爱情婚姻悲剧为主线，描绘了一批举止见识出于须眉之上的闺阁佳人的人生百态.',
                    image: require('@/assets/hongloumeng.jpg')
                },
                {
                    name: '西游记',
                    author: '吴承恩',
                    intro: '《西游记》是中国古代第一部浪漫主义章回体长篇神魔小说。现存明刊百回本《西游记》均无作者署名。清代学者吴玉搢等首先提出《西游记》作者是明代吴承恩。',
                    image: require('@/assets/xiyouji.jpg')
                },
                {
                    name: '水浒传',
                    author: '施耐庵',
                    intro: '《中国古典小说:水浒传(青少版)》是一部英雄书，讲述的是英雄生命的传奇。历来对此书的评价，褒贬互见，但近代以来，认为此书为中国古典传统小说中不可多得的名著',
                    image: require('@/assets/shuihuzhuan.jpg')
                },
                {
                    name: '三国演义',
                    author: '罗贯中',
                    intro: '《三国演义》（全名为《三国志通俗演义》，又称《三国志演义》）是元末明初小说家罗贯中根据陈寿《三国志》和裴松之注解以及民间三国故事传说经过艺术加工创作',
                    image: require('@/assets/sanguoyanyi.jpg')
                },
                {
                    name: '白夜行',
                    author: '东野圭吾',
                    intro: '《白夜行》是日本作家东野圭吾创作的长篇小说，也是其代表作。该小说于1997年1月至1999年1月间连载于期刊，单行本1999年8月在日本发行。',
                    image: require('@/assets/baiyexing.jpg')
                }
            ]
        }
    },
    watch: {
        currentModule (val) {
            // 进行数据的渲染之类...
        }
    },
    mounted () {
        // console.log(this.currentModule)
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
        }
    }
}
</script>

<style lang="less" scoped>
.category {
    .sortBox {
        width: 100%;
        border-radius: 8px;
        padding: 40px;
        background-color: #f8f8f8;
        .title {
            display: inline-block;
            padding: 6px 15px;
            margin-right: 30px;
            color: rgba(255, 255, 255, .9);
            border-radius: 16px 0 16px 16px;
            background-color: #7f7f8c;
        }
        .region {
            margin: 30px 0;
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
        width: 100%;
        margin: 40px 0;
        .contentBox {
            width: 20%;
            margin: 0 30px 30px 0;
            cursor: pointer;
            border-radius: 8px;
            .all {
                position: relative;
                width: 100%;
                img {
                    width: 100%;
                    height: 250px;
                    border-radius: 8px;
                    object-fit: fill;
                }
                .mask {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    // opacity: 0;
                    perspective: 2000px;
                    background-color: #ffffff;
                    &:hover {
                        transform: scale(1.3);
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
        .contentBox:nth-child(5n) {
            margin-right: 0;
        }
    }
}
</style>
