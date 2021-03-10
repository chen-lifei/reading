<template>
    <div class="content">
        <div class="footer">
            <div class="foot-item">
                <dl>
                    <dt>合作出版社</dt>
                    <dd>
                        <a href="#">AA出版社</a>
                    </dd>
                    <dd>
                        <a href="#">BB红出版社</a>
                    </dd>
                </dl>
            </div>
            <div class="foot-item">
                <dl>
                    <dt>特色服务</dt>
                    <dd>
                        <a href="#">夺宝岛</a>
                    </dd>
                    <dd>
                        <a href="#">探险岛</a>
                    </dd>
                    <dd>
                        <a href="#">祈福庙</a>
                    </dd>
                    <dd>
                        <a href="#">钢琴船</a>
                    </dd>
                </dl>
            </div>
            <div class="foot-item">
                <dl>
                    <dt>友情链接</dt>
                    <dd>
                        <a href="#">没头脑</a>
                    </dd>
                    <dd>
                        <a href="#">不高兴</a>
                    </dd>
                </dl>
            </div>
            <div class="foot-item">
                <dl>
                    <dt>联系我们</dt>
                    <dd>
                        <a href="#">官方微信</a>
                    </dd>
                    <dd>
                        <a href="#">官方微博</a>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="copyright">
            Copyright © 2020 feifei 版权所有
        </div>
    </div>
</template>

<style lang="less" scoped>
.content {
    width: 100%;
    background-color: #f5f5f5;
    .footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding-top: 20px;
        border-top: 1px solid #dedede;
        .foot-item {
            margin: 0 25px 20px 25px;
            dl {
                dt {
                    margin: 0 0 5px;
                    font-weight: bold;
                    color: #666;
                    font-size: 14px;
                }
                dd {
                    margin: 0;
                    font-size: 12px;
                    a {
                        text-decoration: none;
                        color: #666;
                        &:hover {
                            color: plum;
                        }
                    }
                }
            }
        }
    }
    .copyright {
        color: #666;
        font-size: 14px;
        text-align: center;
        padding-bottom: 20px;
    }
}
</style>
