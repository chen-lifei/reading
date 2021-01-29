<template>
    <div class="recommend">
        <div class="top">
            <h3>推荐书籍</h3>
            <div class="change">
                <i class="el-icon-refresh-right"></i>
                换一换
            </div>
        </div>
        <div class="recommend_books">
            <div class="book" v-for="(item, i) in recommendList" :key="i">
                <div class="img">
                    <img :src="item.img" alt />
                </div>
                <div class="info">
                    <div class="name">{{item.name}} - {{item.author}}</div>
                    <div class="detail">{{item.detail}}</div>
                    <a href="#" class="more">点击查看</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        recommendList: {
            type: Array,
            default: () => {}
        }
    },
    data () {
        return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.recommend {
    margin: 0 50px;
    .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .change {
            color: #666;
            cursor: pointer;
        }
        .change:hover {
            color: #409eff;
        }
    }
    .recommend_books {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 250px;
        .book {
            position: relative;
            box-sizing: border-box;
            width: 250px;
            cursor: pointer;
            .img,
            .img img {
                width: 100%;
                height: 100%;
            }
            .info {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                width: 100%;
                font-size: 12px;
                background-color: rgba(0, 0, 0, 0.2);
                color: #fdfdfd;
                height: 100%;
                visibility: hidden;
                overflow: hidden;
                .name {
                    padding: 10px;
                    margin: 0;
                    font-size: 14px;
                    background-color: rgba(0, 0, 0, 0.3);
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                }
                .detail {
                    padding: 10px 8px;
                    letter-spacing: 2px;
                    padding: 8px 10px;
                    line-height: 1.5em;
                    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
                }
                .more {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    font-size: 12px;
                    color: #fff;
                    padding: 5px;
                    background-color: rgba(0, 0, 0, 0.5);
                    border-radius: 4px 0 0 0;
                    text-decoration: none;
                }
            }
        }
        .book:hover {
            .info {
                visibility: visible;
            }
            .name {
                animation: fadeInDown 0.6s;
            }
            .detail {
                animation: fadeInUp 0.6s;
            }
            .more {
                animation: fadeInRight 0.6s;
            }
        }
    }
}
@keyframes fadeInDown {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes fadeInRight {
    0% {
        opacity: 0;
        transform: translateX(100%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
