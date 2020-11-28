<template>
  <div class="content">
    <div class="footer">
      <div class="foot-item">
        <dl>
          <dt class="bold">合作出版社</dt>
          <dd>
            <a href="#">新华出版社</a>
          </dd>
          <dd>
            <a href="#">东方红出版社</a>
          </dd>
        </dl>
      </div>
      <div class="foot-item">
        <dl>
          <dt class="bold">特色服务</dt>
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
          <dt class="bold">友情链接</dt>
          <dd>
            <a href="#">嘻嘻嘻嘻嘻</a>
          </dd>
          <dd>
            <a href="#">哈哈哈哈哈</a>
          </dd>
        </dl>
      </div>
      <div class="foot-item">
        <dl>
          <dt class="bold">友情链接</dt>
          <dd>
            <a href="#">嘻嘻嘻嘻嘻</a>
          </dd>
          <dd>
            <a href="#">哈哈哈哈哈</a>
          </dd>
        </dl>
      </div>
      <div class="foot-item">
        <dl>
          <dt class="bold">联系我们</dt>
          <dd>
            <a href="#">官方微信 / 公众号</a>
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
  margin-top: 40px;
  background-color: #f5f5f5;
}
.footer {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  width: 100%;
  border-top: 1px solid #dedede;
  .foot-item {
    margin: 0 40px;
    dl {
      dt.bold {
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
        }
      }
      dd:hover a {
        color: red;
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
</style>
